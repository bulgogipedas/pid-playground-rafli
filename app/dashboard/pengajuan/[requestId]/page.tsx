"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  Hash,
  UserRound,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import {
  dummyTrainingRequests,
  formatCurrency,
  formatDate,
  formatDateTime,
  levelLabels,
  skillTypeLabels,
  statusColors,
  statusLabels,
  trainingTypeLabels,
  type ApprovalLevel,
  type RequestStatus,
  type TrainingRequest,
} from "@/lib/data/training-requests"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

type Decision = "approve" | "revision" | "reject"

const approvalSteps: ApprovalLevel[] = ["atasan_langsung", "kepala_divisi", "sdm_admin"]

function loadRequests() {
  if (typeof window === "undefined") return dummyTrainingRequests
  try {
    const stored = window.localStorage.getItem("lms_pid_training_requests")
    const saved = stored ? (JSON.parse(stored) as TrainingRequest[]) : []
    const savedIds = new Set(saved.map((item) => item.id))
    return [...saved, ...dummyTrainingRequests.filter((item) => !savedIds.has(item.id))]
  } catch {
    return dummyTrainingRequests
  }
}

function approvalLevelForRole(role?: string): ApprovalLevel | null {
  if (role === "manager") return "atasan_langsung"
  if (role === "admin_divisi") return "kepala_divisi"
  if (role === "admin_sdm") return "sdm_admin"
  return null
}

function pendingStatusForLevel(level: ApprovalLevel): RequestStatus {
  if (level === "atasan_langsung") return "pending_l1"
  if (level === "kepala_divisi") return "pending_l2"
  return "pending_l3"
}

function nextApprovalState(level: ApprovalLevel) {
  if (level === "atasan_langsung") return { status: "pending_l2" as RequestStatus, currentLevel: "kepala_divisi" as ApprovalLevel }
  if (level === "kepala_divisi") return { status: "pending_l3" as RequestStatus, currentLevel: "sdm_admin" as ApprovalLevel }
  return { status: "approved" as RequestStatus, currentLevel: "sdm_admin" as ApprovalLevel }
}

function InfoItem({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon: typeof CalendarDays }) {
  return (
    <div className="flex gap-3 border-b py-4 last:border-b-0">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <div className="mt-1 text-sm font-semibold leading-5 text-foreground">{value}</div>
      </div>
    </div>
  )
}

export default function TrainingRequestDetailPage() {
  const params = useParams<{ requestId: string }>()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [requests, setRequests] = useState<TrainingRequest[]>(loadRequests)
  const [comment, setComment] = useState("")
  const [pendingDecision, setPendingDecision] = useState<Decision | null>(null)

  const request = requests.find((item) => item.id === params.requestId)
  const returnTo = searchParams.get("from") === "persetujuan" ? "/dashboard/persetujuan" : "/dashboard/pengajuan"
  const approvalLevel = approvalLevelForRole(user?.role)
  const canDecide = Boolean(request && approvalLevel && request.status === pendingStatusForLevel(approvalLevel))

  const approvalProgress = useMemo(() => {
    if (!request) return 0
    if (request.status === "approved") return 100
    if (request.status === "rejected" || request.status === "revision") return 0
    return Math.round((request.approvals.filter((approval) => approval.action === "approve").length / approvalSteps.length) * 100)
  }, [request])

  if (!request) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
        <h1 className="mt-4 text-xl font-semibold">Pengajuan tidak ditemukan</h1>
        <p className="mt-2 text-sm text-muted-foreground">Data mungkin telah dihapus atau tautannya sudah tidak berlaku.</p>
        <Button asChild className="mt-6"><Link href={returnTo}>Kembali</Link></Button>
      </div>
    )
  }

  const confirmDecision = () => {
    if (!pendingDecision || !approvalLevel) return
    if (pendingDecision !== "approve" && !comment.trim()) {
      toast.error("Catatan wajib diisi untuk revisi atau penolakan")
      return
    }

    const next = pendingDecision === "approve"
      ? nextApprovalState(approvalLevel)
      : {
          status: pendingDecision === "revision" ? "revision" as RequestStatus : "rejected" as RequestStatus,
          currentLevel: pendingDecision === "revision" ? "atasan_langsung" as ApprovalLevel : request.currentLevel,
        }

    const updatedRequest: TrainingRequest = {
      ...request,
      ...next,
      approvals: [
        ...request.approvals,
        {
          id: `APR${Date.now()}`,
          level: approvalLevel,
          approverId: user?.id ?? "DEMO",
          approverName: user?.name ?? levelLabels[approvalLevel],
          action: pendingDecision,
          comment: comment.trim() || "Disetujui sesuai kebutuhan pengembangan kompetensi.",
          timestamp: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    }

    const updatedRequests = requests.map((item) => item.id === request.id ? updatedRequest : item)
    setRequests(updatedRequests)
    window.localStorage.setItem("lms_pid_training_requests", JSON.stringify(updatedRequests))
    setPendingDecision(null)
    setComment("")
    toast.success(
      pendingDecision === "approve" ? "Pengajuan disetujui" : pendingDecision === "revision" ? "Pengajuan dikembalikan untuk revisi" : "Pengajuan ditolak",
    )
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">
      <div>
        <Button asChild variant="ghost" className="-ml-3 mb-3">
          <Link href={returnTo}><ArrowLeft className="mr-2 h-4 w-4" />Kembali ke {returnTo.includes("persetujuan") ? "persetujuan" : "daftar pengajuan"}</Link>
        </Button>
        <div className="flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={cn("rounded-full px-3 py-1", statusColors[request.status])}>{statusLabels[request.status]}</Badge>
              <span className="text-sm text-muted-foreground">{request.id}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">Diajukan {formatDateTime(request.createdAt)}</span>
            </div>
            <h1 className="mt-3 max-w-4xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{request.trainingName}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{request.vendor} · {trainingTypeLabels[request.trainingType]} · {skillTypeLabels[request.skillType]}</p>
          </div>
          {request.status === "approved" && request.id === "REQ-PY-001" && (
            <Button asChild><Link href="/dashboard/belajar/python-basic-001"><BookOpen className="mr-2 h-4 w-4" />Buka pelatihan</Link></Button>
          )}
        </div>
      </div>

      <section aria-labelledby="approval-heading" className="rounded-lg border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Alur persetujuan</p>
            <h2 id="approval-heading" className="mt-1 text-lg font-semibold">Status keputusan</h2>
          </div>
          <span className="text-sm font-semibold">{approvalProgress}% selesai</span>
        </div>
        <Progress value={approvalProgress} className="mt-4 h-2" />
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {approvalSteps.map((level, index) => {
            const record = request.approvals.find((approval) => approval.level === level)
            const isCurrent = request.status.startsWith("pending") && request.currentLevel === level
            const approved = record?.action === "approve"
            return (
              <div key={level} className={cn("rounded-md border p-4", approved && "border-emerald-200 bg-emerald-50", isCurrent && "border-primary bg-primary/[0.04]") }>
                <div className="flex items-center gap-3">
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold", approved && "border-emerald-600 bg-emerald-600 text-white", isCurrent && "border-primary text-primary")}>{approved ? <Check className="h-4 w-4" /> : index + 1}</span>
                  <div><p className="text-sm font-semibold">{levelLabels[level]}</p><p className="text-xs text-muted-foreground">{approved ? "Disetujui" : isCurrent ? "Menunggu keputusan" : "Belum diproses"}</p></div>
                </div>
                {record && <div className="mt-3 border-t pt-3 text-xs text-muted-foreground"><p className="font-medium text-foreground">{record.approverName}</p><p className="mt-1">{formatDateTime(record.timestamp)}</p><p className="mt-2 leading-5">{record.comment}</p></div>}
              </div>
            )
          })}
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="rounded-lg border bg-card p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Informasi pelatihan</h2>
            <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
              <InfoItem icon={Building2} label="Penyelenggara" value={request.vendor} />
              <InfoItem icon={GraduationCap} label="Jenis kompetensi" value={skillTypeLabels[request.skillType]} />
              <InfoItem icon={CalendarDays} label="Jadwal" value={`${formatDate(request.startDate)} – ${formatDate(request.endDate)}`} />
              <InfoItem icon={Clock3} label="Durasi belajar" value={`${request.learningHours} jam`} />
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Konteks pengajuan</h2>
            <div className="mt-5 space-y-6 text-sm leading-7">
              <div><p className="font-semibold">Deskripsi pelatihan</p><p className="mt-1 text-muted-foreground">{request.trainingDescription}</p></div>
              <div><p className="font-semibold">Alasan dan justifikasi</p><p className="mt-1 text-muted-foreground">{request.rationale}</p></div>
              {request.competencyGap && <div><p className="font-semibold">Gap kompetensi dari TNA</p><Badge variant="outline" className="mt-2 border-primary/30 text-primary">{request.competencyGap}</Badge></div>}
            </div>
          </section>

          <section className="rounded-lg border bg-card p-5 sm:p-6">
            <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Lampiran</h2><span className="text-sm text-muted-foreground">{request.attachments.length} file</span></div>
            {request.attachments.length ? <div className="mt-4 divide-y rounded-md border">{request.attachments.map((attachment) => <div key={attachment.id} className="flex items-center gap-3 p-4"><FileText className="h-5 w-5 text-primary" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{attachment.name}</p><p className="text-xs text-muted-foreground">{(attachment.size / 1000).toFixed(1)} KB</p></div><Button variant="ghost" size="icon" aria-label={`Unduh ${attachment.name}`} onClick={() => toast.info("File demo belum memiliki dokumen fisik")}><Download className="h-4 w-4" /></Button></div>)}</div> : <div className="mt-4 rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">Tidak ada lampiran pada pengajuan ini.</div>}
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <Card className="gap-0 overflow-hidden py-0">
            <CardHeader className="border-b bg-muted/40 py-5"><CardTitle className="text-base">Ringkasan pengaju</CardTitle></CardHeader>
            <CardContent className="divide-y p-5">
              <InfoItem icon={UserRound} label="Nama karyawan" value={request.employeeName} />
              <InfoItem icon={Hash} label="NIK" value={request.employeeNik} />
              <InfoItem icon={BriefcaseBusiness} label="Divisi" value={`${request.division} · ${request.jobFamily}`} />
              <InfoItem icon={Building2} label="Estimasi biaya" value={<span className="text-primary">{formatCurrency(request.estimatedCost)}</span>} />
            </CardContent>
          </Card>

          {canDecide && (
            <Card className="gap-0 py-0">
              <CardHeader className="border-b py-5"><CardTitle className="text-base">Ambil keputusan</CardTitle><p className="text-sm text-muted-foreground">Kamu bertindak sebagai {approvalLevel ? levelLabels[approvalLevel] : "approver"}.</p></CardHeader>
              <CardContent className="space-y-4 p-5">
                <div className="space-y-2"><Label htmlFor="decision-comment">Catatan keputusan</Label><Textarea id="decision-comment" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Tuliskan pertimbangan atau arahan revisi..." rows={4} /></div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setPendingDecision("approve")}><CheckCircle2 className="mr-2 h-4 w-4" />Setujui pengajuan</Button>
                <div className="grid grid-cols-2 gap-2"><Button variant="outline" onClick={() => setPendingDecision("revision")}><AlertCircle className="mr-2 h-4 w-4" />Revisi</Button><Button variant="destructive" onClick={() => setPendingDecision("reject")}><XCircle className="mr-2 h-4 w-4" />Tolak</Button></div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>

      <AlertDialog open={Boolean(pendingDecision)} onOpenChange={(open) => !open && setPendingDecision(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>{pendingDecision === "approve" ? "Setujui pengajuan ini?" : pendingDecision === "revision" ? "Kembalikan untuk revisi?" : "Tolak pengajuan ini?"}</AlertDialogTitle><AlertDialogDescription>{pendingDecision === "approve" ? "Pengajuan akan diteruskan ke tahap berikutnya." : "Keputusan dan catatanmu akan langsung tersimpan pada riwayat pengajuan."}</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Batal</AlertDialogCancel><AlertDialogAction onClick={confirmDecision} className={pendingDecision === "reject" ? "bg-destructive hover:bg-destructive/90" : ""}>Konfirmasi</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
