"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import {
  dummyTrainingRequests,
  dummyMandatoryPrograms,
  statusLabels,
  statusColors,
  skillTypeLabels,
  trainingTypeLabels,
  levelLabels,
  formatCurrency,
  formatDate,
  formatDateTime,
  type TrainingRequest,
  type RequestStatus,
  type ApprovalLevel,
  type MandatoryProgram,
} from "@/lib/data/training-requests"
import { dummyCourses } from "@/lib/data/courses"
import { dummyUsers, jobFamilies } from "@/lib/data/users"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  FileText,
  Calendar,
  Building2,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Eye,
  Users,
  BookOpen,
  BarChart3,
  Play,
  Pause,
  UserPlus,
  CheckSquare,
  Square,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { PageHeader } from "@/components/dashboard/page-header"

// Approval action dialog
function ApprovalDialog({ 
  request, 
  action, 
  onSubmit 
}: { 
  request: TrainingRequest
  action: "approve" | "reject" | "revision"
  onSubmit: (requestId: string, action: string, comment: string) => void 
}) {
  const [comment, setComment] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    onSubmit(request.id, action, comment)
    setComment("")
    setIsOpen(false)
  }

  const actionConfig = {
    approve: {
      title: "Setujui Pengajuan",
      description: `Anda akan menyetujui pengajuan pelatihan "${request.trainingName}".`,
      buttonText: "Setujui",
      icon: CheckCircle2,
    },
    reject: {
      title: "Tolak Pengajuan",
      description: `Anda akan menolak pengajuan pelatihan "${request.trainingName}".`,
      buttonText: "Tolak",
      icon: XCircle,
    },
    revision: {
      title: "Minta Revisi",
      description: `Pengajuan pelatihan "${request.trainingName}" akan dikembalikan untuk direvisi.`,
      buttonText: "Minta Revisi",
      icon: RotateCcw,
    },
  }

  const config = actionConfig[action]
  const Icon = config.icon

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={action === "approve" ? "success" : action === "reject" ? "destructive" : "outline"}
          size="sm"
          className="w-full"
        >
          <Icon className="w-4 h-4 mr-1" />
          {config.buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif">
            <Icon className={cn("w-5 h-5", action === "approve" ? "text-emerald-600" : action === "reject" ? "text-red-600" : "text-blue-600")} />
            {config.title}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="comment">Komentar {action !== "approve" ? "*" : "(Opsional)"}</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={action === "approve" ? "Tambahkan komentar (opsional)..." : "Berikan alasan..."}
              rows={4}
              required={action !== "approve"}
            />
          </div>
          
          {/* Request Summary */}
          <div className="p-3 bg-gray-50 rounded-lg space-y-2 text-sm">
            <p><span className="text-muted-foreground">Pengaju:</span> {request.employeeName}</p>
            <p><span className="text-muted-foreground">Vendor:</span> {request.vendor}</p>
            <p><span className="text-muted-foreground">Biaya:</span> {formatCurrency(request.estimatedCost)}</p>
            <p><span className="text-muted-foreground">Tanggal:</span> {formatDate(request.startDate)} - {formatDate(request.endDate)}</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant={action === "approve" ? "success" : action === "reject" ? "destructive" : "default"}
            disabled={action !== "approve" && !comment.trim()}
          >
            <Icon className="w-4 h-4 mr-2" />
            {config.buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Heavy request information lives on a dedicated page so the decision context
// is not cramped inside a side sheet.
function RequestDetail({ request }: { request: TrainingRequest }) {
  return (
    <Button asChild variant="ghost" size="sm" className="w-full">
      <Link href={`/dashboard/pengajuan/${request.id}?from=persetujuan`}>
        <Eye className="mr-1 h-4 w-4" />
        Detail
      </Link>
    </Button>
  )
}

// Mandatory program management for Admin SDM
function MandatoryProgramSection() {
  const [programs, setPrograms] = useState(dummyMandatoryPrograms)
  const [isCreating, setIsCreating] = useState(false)
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    courseIds: [] as string[],
    targetJobFamilies: [] as string[],
    startDate: "",
    endDate: "",
  })

  const handleCreateProgram = () => {
    const program: MandatoryProgram = {
      id: `MPR${String(programs.length + 1).padStart(3, '0')}`,
      ...newProgram,
      enrolledCount: 0,
      completedCount: 0,
      status: "scheduled",
    }
    setPrograms([...programs, program])
    setIsCreating(false)
    toast.success("Program pelatihan wajib dibuat", { description: program.name })
    setNewProgram({
      name: "",
      description: "",
      courseIds: [],
      targetJobFamilies: [],
      startDate: "",
      endDate: "",
    })
  }

  const softSkillCourses = dummyCourses.filter(c => c.category === "Soft Skill" || c.type === "wajib")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif font-medium text-lg">Program Pelatihan Wajib</h3>
          <p className="text-sm text-muted-foreground">
            Buat dan kelola program pelatihan wajib soft skill dengan auto-enrollment
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Buat Program Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif">Buat Program Pelatihan Wajib</DialogTitle>
              <DialogDescription>
                Program ini akan secara otomatis mendaftarkan karyawan berdasarkan job family.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nama Program *</Label>
                <Input
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                  placeholder="Contoh: Program Orientasi Karyawan Baru 2024"
                />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi</Label>
                <Textarea
                  value={newProgram.description}
                  onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                  placeholder="Jelaskan tujuan program..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal Mulai *</Label>
                  <Input
                    type="date"
                    value={newProgram.startDate}
                    onChange={(e) => setNewProgram({ ...newProgram, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Berakhir *</Label>
                  <Input
                    type="date"
                    value={newProgram.endDate}
                    onChange={(e) => setNewProgram({ ...newProgram, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Pilih Pelatihan *</Label>
                <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                  {softSkillCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={course.id}
                        checked={newProgram.courseIds.includes(course.id)}
                        onCheckedChange={(checked) => {
                          setNewProgram({
                            ...newProgram,
                            courseIds: checked 
                              ? [...newProgram.courseIds, course.id]
                              : newProgram.courseIds.filter(id => id !== course.id)
                          })
                        }}
                      />
                      <label htmlFor={course.id} className="text-sm cursor-pointer">
                        {course.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Target Job Family *</Label>
                <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
                  {jobFamilies.map((jf) => (
                    <div key={jf} className="flex items-center space-x-2">
                      <Checkbox
                        id={`jf-${jf}`}
                        checked={newProgram.targetJobFamilies.includes(jf)}
                        onCheckedChange={(checked) => {
                          setNewProgram({
                            ...newProgram,
                            targetJobFamilies: checked 
                              ? [...newProgram.targetJobFamilies, jf]
                              : newProgram.targetJobFamilies.filter(f => f !== jf)
                          })
                        }}
                      />
                      <label htmlFor={`jf-${jf}`} className="text-sm cursor-pointer">
                        {jf}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Batal
              </Button>
              <Button
                onClick={handleCreateProgram}
                disabled={!newProgram.name || newProgram.courseIds.length === 0 || newProgram.targetJobFamilies.length === 0}
              >
                Buat Program
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {programs.map((program) => {
          const completionRate = program.enrolledCount > 0 
            ? Math.round((program.completedCount / program.enrolledCount) * 100) 
            : 0

          return (
            <Card key={program.id} className="border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        program.status === "active" && "bg-emerald-100 text-emerald-700",
                        program.status === "scheduled" && "bg-amber-100 text-amber-700",
                        program.status === "completed" && "bg-gray-100 text-gray-700"
                      )}>
                        {program.status === "active" ? "Aktif" : program.status === "scheduled" ? "Terjadwal" : "Selesai"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{program.id}</span>
                    </div>
                    <h4 className="font-medium font-serif">{program.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(program.startDate)} - {formatDate(program.endDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {program.courseIds.length} Pelatihan
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {program.enrolledCount} Peserta
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary">{completionRate}%</p>
                      <p className="text-xs text-muted-foreground">Tingkat Penyelesaian</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                      {program.status === "active" ? (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-1" />
                          Pause
                        </Button>
                      ) : program.status === "scheduled" ? (
                        <Button size="sm" variant="success">
                          <Play className="w-4 h-4 mr-1" />
                          Aktifkan
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// Bulk approval component
function BulkApproval({ 
  requests, 
  selectedIds, 
  onAction 
}: { 
  requests: TrainingRequest[]
  selectedIds: string[]
  onAction: (action: "approve" | "reject", comment: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<"approve" | "reject">("approve")
  const [comment, setComment] = useState("")

  const selectedRequests = requests.filter(r => selectedIds.includes(r.id))
  const totalCost = selectedRequests.reduce((sum, r) => sum + r.estimatedCost, 0)

  const handleSubmit = () => {
    onAction(action, comment)
    setComment("")
    setIsOpen(false)
  }

  if (selectedIds.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <Card className="shadow-lg border-secondary">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-secondary" />
              <span className="font-medium">{selectedIds.length} pengajuan dipilih</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">
                Total: {formatCurrency(totalCost)}
              </span>
            </div>
            <div className="flex gap-2">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="success"
                    onClick={() => setAction("approve")}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Setujui Semua
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-serif">
                      {action === "approve" ? "Setujui" : "Tolak"} {selectedIds.length} Pengajuan
                    </DialogTitle>
                    <DialogDescription>
                      Tindakan ini akan diterapkan ke semua pengajuan yang dipilih.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="font-medium mb-2">Ringkasan:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        {selectedRequests.slice(0, 3).map(r => (
                          <li key={r.id}>- {r.trainingName} ({r.employeeName})</li>
                        ))}
                        {selectedRequests.length > 3 && (
                          <li>... dan {selectedRequests.length - 3} lainnya</li>
                        )}
                      </ul>
                      <p className="mt-2 font-medium">Total Biaya: {formatCurrency(totalCost)}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Komentar {action === "reject" ? "*" : "(Opsional)"}</Label>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tambahkan komentar..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Batal
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant={action === "approve" ? "success" : "destructive"}
                      disabled={action === "reject" && !comment.trim()}
                    >
                      {action === "approve" ? "Setujui Semua" : "Tolak Semua"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={() => {
                  setAction("reject")
                  setIsOpen(true)
                }}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Tolak Semua
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PersetujuanPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [requests, setRequests] = useState<TrainingRequest[]>(() => {
    if (typeof window === "undefined") return dummyTrainingRequests
    try {
      const saved = window.localStorage.getItem("lms_pid_training_requests")
      return saved ? JSON.parse(saved) : dummyTrainingRequests
    } catch {
      return dummyTrainingRequests
    }
  })
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    window.localStorage.setItem("lms_pid_training_requests", JSON.stringify(requests))
  }, [requests])

  // Determine which level this user can approve
  const getApprovalLevel = (): ApprovalLevel | null => {
    if (user?.role === "admin_sdm") return "sdm_admin"
    if (user?.role === "admin_divisi") return "kepala_divisi"
    // For demo, atasan_langsung would be determined by org structure
    return "atasan_langsung"
  }

  const approvalLevel = getApprovalLevel()

  // Get requests pending at this user's level
  const getPendingStatusForLevel = (level: ApprovalLevel): RequestStatus => {
    switch (level) {
      case "atasan_langsung": return "pending_l1"
      case "kepala_divisi": return "pending_l2"
      case "sdm_admin": return "pending_l3"
    }
  }

  const pendingStatus = approvalLevel ? getPendingStatusForLevel(approvalLevel) : null
  
  // Filter requests for approval
  const pendingRequests = requests.filter(r => r.status === pendingStatus)
  const approvedByMe = requests.filter(r => 
    r.approvals.some(a => a.level === approvalLevel && a.action === "approve")
  )
  const rejectedByMe = requests.filter(r => 
    r.approvals.some(a => a.level === approvalLevel && a.action === "reject")
  )

  // Apply search filter
  const filteredPending = pendingRequests.filter(r =>
    r.trainingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApprovalAction = (requestId: string, action: string, comment: string, silent = false) => {
    const target = requests.find(r => r.id === requestId)
    setRequests(prev => prev.map(r => {
      if (r.id !== requestId) return r
      
      const newApproval = {
        id: `APR${Date.now()}`,
        level: approvalLevel!,
        approverId: user?.id || "",
        approverName: user?.name || "",
        action: action as "approve" | "reject" | "revision",
        comment,
        timestamp: new Date().toISOString(),
      }

      let newStatus: RequestStatus = r.status
      let newLevel: ApprovalLevel = r.currentLevel

      if (action === "approve") {
        if (approvalLevel === "atasan_langsung") {
          newStatus = "pending_l2"
          newLevel = "kepala_divisi"
        } else if (approvalLevel === "kepala_divisi") {
          newStatus = "pending_l3"
          newLevel = "sdm_admin"
        } else if (approvalLevel === "sdm_admin") {
          newStatus = "approved"
        }
      } else if (action === "reject") {
        newStatus = "rejected"
      } else if (action === "revision") {
        newStatus = "revision"
        newLevel = "atasan_langsung"
      }

      return {
        ...r,
        status: newStatus,
        currentLevel: newLevel,
        approvals: [...r.approvals, newApproval],
        updatedAt: new Date().toISOString(),
      }
    }))

    if (silent) return
    const name = target?.trainingName ?? "Pengajuan"
    if (action === "approve") {
      toast.success("Pengajuan disetujui", { description: name })
    } else if (action === "reject") {
      toast.error("Pengajuan ditolak", { description: name })
    } else {
      toast.info("Revisi diminta", { description: name })
    }
  }

  const handleBulkAction = (action: "approve" | "reject", comment: string) => {
    const count = selectedIds.length
    selectedIds.forEach(id => {
      handleApprovalAction(id, action, comment, true)
    })
    setSelectedIds([])
    if (count > 0) {
      if (action === "approve") {
        toast.success(`${count} pengajuan disetujui`)
      } else {
        toast.error(`${count} pengajuan ditolak`)
      }
    }
  }

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedIds.length === filteredPending.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredPending.map(r => r.id))
    }
  }

  // Stats
  const stats = {
    pending: pendingRequests.length,
    approved: approvedByMe.length,
    rejected: rejectedByMe.length,
    totalCost: pendingRequests.reduce((sum, r) => sum + r.estimatedCost, 0),
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Persetujuan Pelatihan" },
        ]}
        title="Persetujuan Pelatihan"
        description={
          user?.role === "admin_sdm"
            ? "Persetujuan final dan manajemen program pelatihan wajib"
            : `Kelola persetujuan sebagai ${approvalLevel ? levelLabels[approvalLevel] : "Approver"}`
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Menunggu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{stats.approved}</p>
                <p className="text-xs text-muted-foreground">Disetujui</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-xs text-muted-foreground">Ditolak</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-lg font-bold text-secondary">{formatCurrency(stats.totalCost)}</p>
                <p className="text-xs text-muted-foreground">Total Biaya Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Menunggu Persetujuan ({stats.pending})</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
          {user?.role === "admin_sdm" && (
            <TabsTrigger value="mandatory">Program Wajib</TabsTrigger>
          )}
        </TabsList>

        {/* Pending Tab */}
        <TabsContent value="pending" className="space-y-4">
          {/* Search and Bulk Select */}
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama pelatihan, karyawan, atau vendor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {user?.role === "admin_sdm" && filteredPending.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={selectAll}
                    className="shrink-0"
                  >
                    {selectedIds.length === filteredPending.length ? (
                      <>
                        <CheckSquare className="w-4 h-4 mr-2" />
                        Batal Pilih Semua
                      </>
                    ) : (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        Pilih Semua ({filteredPending.length})
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Requests List */}
          {filteredPending.length === 0 ? (
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
                <p className="font-medium">Tidak ada pengajuan yang perlu disetujui</p>
                <p className="text-sm text-muted-foreground">Semua pengajuan sudah diproses.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPending.map((request) => (
                <Card 
                  key={request.id} 
                  className={cn(
                    "border-gray-100 shadow-sm hover:shadow-md transition-all",
                    selectedIds.includes(request.id) && "border-secondary ring-1 ring-secondary"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Checkbox for bulk select */}
                      {user?.role === "admin_sdm" && (
                        <div className="flex items-start pt-1">
                          <Checkbox
                            checked={selectedIds.includes(request.id)}
                            onCheckedChange={() => toggleSelection(request.id)}
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                          <Badge className={cn("rounded-full px-2 py-1 text-xs font-medium", statusColors[request.status])}>
                            {statusLabels[request.status]}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{request.id}</span>
                          <span className="text-xs text-muted-foreground">|</span>
                          <span className="text-xs text-muted-foreground">{formatDateTime(request.createdAt)}</span>
                        </div>
                        <h3 className="font-medium font-serif text-lg">{request.trainingName}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium text-foreground">{request.employeeName}</span>
                          {" "}- {request.division} ({request.jobFamily})
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {request.vendor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(request.startDate)} - {formatDate(request.endDate)}
                          </span>
                          <span className="flex items-center gap-1 font-medium text-secondary">
                            <DollarSign className="w-4 h-4" />
                            {formatCurrency(request.estimatedCost)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {request.learningHours} Jam
                          </span>
                        </div>
                        {request.competencyGap && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs text-secondary border-secondary">
                              Gap TNA: {request.competencyGap}
                            </Badge>
                          </div>
                        )}
                        {request.approvals.length > 0 && (
                          <div className="mt-3 p-2 bg-emerald-50 rounded-lg text-sm">
                            <p className="text-emerald-700">
                              Disetujui oleh {request.approvals[request.approvals.length - 1].approverName} ({levelLabels[request.approvals[request.approvals.length - 1].level]})
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:min-w-36 shrink-0">
                        <RequestDetail request={request} />
                        <ApprovalDialog 
                          request={request} 
                          action="approve" 
                          onSubmit={handleApprovalAction}
                        />
                        <ApprovalDialog 
                          request={request} 
                          action="revision" 
                          onSubmit={handleApprovalAction}
                        />
                        <ApprovalDialog 
                          request={request} 
                          action="reject" 
                          onSubmit={handleApprovalAction}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4">
            {[...approvedByMe, ...rejectedByMe].sort((a, b) => 
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            ).map((request) => {
              const myApproval = request.approvals.find(a => a.level === approvalLevel)
              
              return (
                <Card key={request.id} className="border-gray-100 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            myApproval?.action === "approve" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          )}>
                            {myApproval?.action === "approve" ? "Disetujui" : "Ditolak"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{request.id}</span>
                        </div>
                        <h4 className="font-medium">{request.trainingName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {request.employeeName} - {request.division}
                        </p>
                        {myApproval?.comment && (
                          <p className="text-sm mt-2 italic">"{myApproval.comment}"</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <p>{myApproval && formatDateTime(myApproval.timestamp)}</p>
                        <p className="font-medium text-secondary">{formatCurrency(request.estimatedCost)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            {approvedByMe.length === 0 && rejectedByMe.length === 0 && (
              <Card className="border-gray-100 shadow-sm">
                <CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Belum ada riwayat persetujuan</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Mandatory Programs Tab (Admin SDM only) */}
        {user?.role === "admin_sdm" && (
          <TabsContent value="mandatory">
            <MandatoryProgramSection />
          </TabsContent>
        )}
      </Tabs>

      {/* Bulk Approval Bar */}
      {user?.role === "admin_sdm" && (
        <BulkApproval 
          requests={requests}
          selectedIds={selectedIds}
          onAction={handleBulkAction}
        />
      )}
    </div>
  )
}
