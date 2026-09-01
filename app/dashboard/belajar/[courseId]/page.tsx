"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileText,
  Flag,
  FolderUp,
  HelpCircle,
  Lock,
  PlayCircle,
  Send,
  Star,
  Video,
} from "lucide-react"
import { allCourses, pythonAssessments, pythonAssignment } from "@/lib/learning/seed"
import { dummyCourses, type Course as CatalogCourse } from "@/lib/data/courses"
import type { Assessment, Course as LearningCourse, CourseMaterial } from "@/lib/learning/types"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

type PlayerState = {
  completed: string[]
  scores: Record<string, number>
  assignmentSubmitted: boolean
  assignmentApproved: boolean
  feedbackSubmitted: boolean
  certificateIssued: boolean
  certificateNumber?: string
}

const initialState: PlayerState = {
  completed: [],
  scores: {},
  assignmentSubmitted: false,
  assignmentApproved: false,
  feedbackSubmitted: false,
  certificateIssued: false,
}

const materialIcon: Record<CourseMaterial["type"], typeof Video> = {
  video: Video,
  artikel: FileText,
  pdf: FileText,
  quiz: HelpCircle,
  pretest: ClipboardCheck,
  posttest: Flag,
  assignment: FolderUp,
  feedback: Star,
}

function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} menit`
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return remainder ? `${hours} jam ${remainder} menit` : `${hours} jam`
}

function readPlayerState(courseId: string): PlayerState {
  if (typeof window === "undefined") return initialState
  try {
    const saved = window.localStorage.getItem(`pyfa_lms_player_${courseId}`) || window.localStorage.getItem(`pyridam_learning_player_${courseId}`)
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState
  } catch {
    return initialState
  }
}

function getAssessment(material: CourseMaterial): Assessment | undefined {
  return material.assessmentId ? pythonAssessments.find((assessment) => assessment.id === material.assessmentId) : undefined
}

function adaptCatalogCourse(course: CatalogCourse): LearningCourse {
  return {
    id: course.id,
    slug: course.id.toLowerCase(),
    title: course.title,
    category: course.category,
    kind: course.type,
    level: "pemula",
    method: course.method,
    format: course.method === "e_learning" ? "Online Mandiri" : "Kelas Terjadwal",
    language: "Bahasa Indonesia",
    provider: "Pyridam Learning",
    instructor: course.instructor,
    shortDescription: course.description,
    about: course.description,
    targetAudience: course.jobFamilies,
    learningOutcomes: ["Memahami konsep utama pelatihan", "Menerapkan materi dalam aktivitas kerja", "Menyelesaikan latihan singkat di setiap bagian"],
    prerequisites: ["Terdaftar sebagai peserta Pyridam Learning"],
    competencies: [course.category],
    faq: [],
    estimatedHours: Math.max(1, Math.round(course.duration / 60)),
    accessDays: 30,
    passingGrade: 70,
    maxPostTestAttempts: 3,
    coolingOffMinutes: 10,
    certificateEnabled: false,
    feedbackRequired: false,
    requiresSuratTugas: false,
    cost: 0,
    thumbnail: course.thumbnail,
    createdAt: course.createdAt,
    status: course.status,
    rating: course.rating,
    ratingCount: course.enrollmentCount,
    modules: course.sections.map((section, moduleIndex) => ({
      id: section.id,
      slug: section.id.toLowerCase(),
      title: `${String(moduleIndex + 1).padStart(2, "0")} · ${section.title}`,
      estimatedMinutes: section.items.reduce((total, item) => total + item.duration, 0),
      materials: section.items.map((item) => ({
        id: item.id,
        slug: item.id.toLowerCase(),
        title: item.title.replace(/^(Video|PDF|Quiz):\s*/i, ""),
        type: "artikel" as const,
        duration: item.duration,
        countsTowardProgress: true,
        required: true,
        body: `Materi demo ${item.title.toLowerCase()} membantu peserta memahami konteks, contoh penerapan, dan checklist praktik yang relevan dengan pekerjaan di Pyridam Farma. Gunakan bagian ini untuk meninjau poin utama sebelum melanjutkan ke aktivitas berikutnya.`,
      })),
    })),
  }
}

function AssessmentPanel({
  assessment,
  onPassed,
  onClose,
}: {
  assessment: Assessment
  onPassed: (score: number) => void
  onClose: () => void
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const submit = () => {
    const correct = assessment.questions.filter((question) => answers[question.id] === question.correctOptionId).length
    const result = Math.round((correct / assessment.questions.length) * 100)
    setScore(result)
    setSubmitted(true)
    if (result >= assessment.passingGrade) onPassed(result)
  }

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardHeader className="border-b bg-primary/[0.03]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge variant="outline" className="mb-2">Assessment</Badge>
            <CardTitle className="text-xl">{assessment.title}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              {assessment.questions.length} pertanyaan · {assessment.durationMinutes} menit · Lulus minimal {assessment.passingGrade}%
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>Tutup</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-5 sm:p-7">
        {submitted && (
          <div className={cn("rounded-lg border p-4", score >= assessment.passingGrade ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50")}>
            <p className="font-semibold">Nilai kamu {score}%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {score >= assessment.passingGrade ? "Lulus. Materi ini sudah ditandai selesai." : "Belum lulus. Tinjau pembahasan, lalu coba lagi."}
            </p>
          </div>
        )}

        {assessment.questions.map((question, index) => (
          <fieldset key={question.id} className="space-y-3 border-b pb-5 last:border-b-0 last:pb-0">
            <legend className="font-medium leading-6">{index + 1}. {question.question}</legend>
            <div className="grid gap-2">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.id
                const correct = submitted && option.id === question.correctOptionId
                return (
                  <label key={option.id} className={cn("flex cursor-pointer gap-3 rounded-lg border p-3 text-sm transition-colors", selected && "border-primary bg-primary/[0.04]", correct && "border-emerald-400 bg-emerald-50") }>
                    <input
                      type="radio"
                      name={question.id}
                      value={option.id}
                      checked={selected}
                      disabled={submitted}
                      onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))}
                      className="mt-0.5 accent-primary"
                    />
                    <span>{option.text}</span>
                  </label>
                )
              })}
            </div>
            {submitted && <p className="text-xs text-muted-foreground">Pembahasan: {question.explanation}</p>}
          </fieldset>
        ))}

        <div className="flex flex-wrap justify-end gap-2 border-t pt-5">
          {!submitted ? (
            <Button onClick={submit} disabled={Object.keys(answers).length !== assessment.questions.length}>
              <Send className="mr-2 h-4 w-4" /> Kumpulkan jawaban
            </Button>
          ) : score < assessment.passingGrade ? (
            <Button variant="outline" onClick={() => { setAnswers({}); setSubmitted(false); setScore(0) }}>Coba lagi</Button>
          ) : (
            <Button onClick={onClose}>Lanjutkan materi</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function LearningPlayerPage() {
  const params = useParams<{ courseId: string }>()
  const router = useRouter()
  const { user } = useAuth()
  const sourceCourse = dummyCourses.find((item) => item.id === params.courseId)
  const course = allCourses.find((item) => item.id === params.courseId) ?? (sourceCourse ? adaptCatalogCourse(sourceCourse) : undefined)
  const [state, setState] = useState<PlayerState>(() => readPlayerState(params.courseId))
  const [activeModuleId, setActiveModuleId] = useState(course?.modules[0]?.id ?? "")
  const [activeMaterialId, setActiveMaterialId] = useState(course?.modules[0]?.materials[0]?.id ?? "")
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null)
  const [assignmentNote, setAssignmentNote] = useState("")
  const [assignmentLink, setAssignmentLink] = useState("")
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" })

  useEffect(() => {
    window.localStorage.setItem(`pyfa_lms_player_${params.courseId}`, JSON.stringify(state))
    window.localStorage.removeItem(`pyridam_learning_player_${params.courseId}`)
  }, [params.courseId, state])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [params.courseId])

  const allMaterials = useMemo(() => course?.modules.flatMap((module) => module.materials) ?? [], [course])
  const progressMaterials = allMaterials.filter((material) => material.countsTowardProgress && material.type !== "posttest")
  const progress = progressMaterials.length ? Math.round((state.completed.filter((id) => progressMaterials.some((material) => material.id === id)).length / progressMaterials.length) * 100) : 0
  const activeModule = course?.modules.find((module) => module.id === activeModuleId) ?? course?.modules[0]
  const activeMaterial = activeModule?.materials.find((material) => material.id === activeMaterialId) ?? activeModule?.materials[0]
  const activeAssessmentForMaterial = activeMaterial ? getAssessment(activeMaterial) : undefined
  const hasAssignment = allMaterials.some((material) => material.type === "assignment")
  const postTest = allMaterials.find((material) => material.type === "posttest")
  const hasFeedback = allMaterials.some((material) => material.type === "feedback")
  const assignmentReady = state.assignmentApproved || state.assignmentSubmitted
  const postTestReady = !postTest || Boolean(postTest.assessmentId && state.scores[postTest.assessmentId] >= (course?.passingGrade ?? 70))
  const completionReady = progress === 100 && (!hasAssignment || assignmentReady) && postTestReady

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
        <Card className="max-w-md"><CardContent className="space-y-4 p-6"><p className="font-semibold">Pelatihan tidak ditemukan</p><p className="text-sm text-muted-foreground">Course ini belum tersedia atau link-nya sudah berubah.</p><Button onClick={() => router.push("/dashboard/katalog")}>Kembali ke katalog</Button></CardContent></Card>
      </div>
    )
  }

  const markComplete = () => {
    if (!activeMaterial || state.completed.includes(activeMaterial.id)) return
    setState((current) => ({ ...current, completed: [...current.completed, activeMaterial.id] }))
    toast.success("Materi selesai", { description: "Progress kamu sudah tersimpan." })
  }

  const selectMaterial = (moduleId: string, material: CourseMaterial) => {
    setActiveModuleId(moduleId)
    setActiveMaterialId(material.id)
    setActiveAssessment(null)
  }

  const submitAssignment = () => {
    if (!assignmentNote.trim() && !assignmentLink.trim()) {
      toast.error("Lengkapi submission", { description: "Tambahkan catatan atau tautan repository terlebih dahulu." })
      return
    }
    setState((current) => ({ ...current, assignmentSubmitted: true, assignmentApproved: true, completed: current.completed.includes(activeMaterialId) ? current.completed : [...current.completed, activeMaterialId] }))
    toast.success("Assignment terkirim", { description: "Submission diterima dan berstatus Lulus untuk demo." })
  }

  const submitFeedback = () => {
    if (!feedback.rating || !feedback.comment.trim()) {
      toast.error("Feedback belum lengkap", { description: "Berikan rating dan komentar singkat." })
      return
    }
    setState((current) => ({ ...current, feedbackSubmitted: true, completed: current.completed.includes(activeMaterialId) ? current.completed : [...current.completed, activeMaterialId] }))
    toast.success("Feedback tersimpan")
  }

  const issueCertificate = () => {
    const certificateNumber = `PYFA-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`
    setState((current) => ({ ...current, certificateIssued: true, certificateNumber }))
    toast.success("Sertifikat diterbitkan", { description: certificateNumber })
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/dashboard/pelatihan" aria-label="Kembali ke Pelatihan Saya"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium sm:text-base">{course.title}</p><p className="text-xs text-muted-foreground">{course.youtubePlaylistId ? "Open class · YouTube" : course.format} · {user?.name ?? "Peserta"}</p></div>
          <div className="hidden min-w-[180px] items-center gap-3 sm:flex"><div className="flex-1"><Progress value={progress} className="h-2" /></div><span className="text-sm font-semibold">{progress}%</span></div>
          {course.certificateEnabled && <Link href="/dashboard/sertifikat"><Button variant="outline" size="sm"><Award className="mr-2 h-4 w-4" />Sertifikat</Button></Link>}
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <main className="min-w-0 space-y-5">
          <div className="flex items-center justify-between gap-3"><div><p className="text-sm text-muted-foreground">Sedang dipelajari</p><h1 className="mt-2 text-3xl font-medium leading-none tracking-[-0.045em]">{activeMaterial?.title}</h1></div>{activeMaterial && <Badge variant="outline"><Clock3 className="mr-1 h-3.5 w-3.5" />{formatMinutes(activeMaterial.duration)}</Badge>}</div>

          {activeAssessment ? (
            <AssessmentPanel assessment={activeAssessment} onClose={() => setActiveAssessment(null)} onPassed={(score) => {
              if (!activeMaterial) return
              setState((current) => ({ ...current, scores: { ...current.scores, [activeAssessment.id]: score }, completed: current.completed.includes(activeMaterial.id) ? current.completed : [...current.completed, activeMaterial.id] }))
            }} />
          ) : activeMaterial?.type === "video" ? (
            <Card className="overflow-hidden border-0 bg-slate-950 shadow-sm">
              <div className="aspect-video w-full"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/${activeMaterial.youtubeId}?list=${course.youtubePlaylistId}&rel=0`} title={activeMaterial.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-sm text-white"><span className="flex items-center gap-2 text-white/75"><PlayCircle className="h-4 w-4" />Episode ini sesuai tahap learning path</span><a className="inline-flex cursor-pointer items-center gap-1 font-medium text-cyan-300 transition-colors hover:text-white hover:underline" href={`https://www.youtube.com/watch?v=${activeMaterial.youtubeId}&list=${course.youtubePlaylistId}`} target="_blank" rel="noreferrer">Buka di YouTube <ExternalLink className="h-3.5 w-3.5" /></a></div>
            </Card>
          ) : activeMaterial?.type === "artikel" ? (
            <Card><CardContent className="max-w-none p-6 text-foreground sm:p-8"><div className="mb-5 flex items-center gap-3 rounded-[14px] bg-muted p-4"><FileText className="h-5 w-5 text-foreground" /><p className="text-sm font-medium">Baca materi ini sampai selesai sebelum lanjut.</p></div><p className="whitespace-pre-line leading-8 text-muted-foreground">{activeMaterial.body}</p></CardContent></Card>
          ) : activeMaterial?.type === "assignment" ? (
            <Card><CardHeader><Badge variant="outline" className="w-fit">Final project</Badge><CardTitle>{pythonAssignment.title}</CardTitle><p className="text-sm text-muted-foreground">{pythonAssignment.brief}</p></CardHeader><CardContent className="space-y-5"><div className="rounded-lg border bg-muted/30 p-4 text-sm"><p className="font-medium">Output yang diharapkan</p><p className="mt-1 text-muted-foreground">{pythonAssignment.expectedOutput}</p><p className="mt-3 font-medium">Aturan submission</p><p className="mt-1 text-muted-foreground">{pythonAssignment.submissionRules}</p></div><div className="space-y-2"><Label htmlFor="assignment-note">Catatan submission</Label><Textarea id="assignment-note" value={assignmentNote} onChange={(event) => setAssignmentNote(event.target.value)} placeholder="Jelaskan solusi atau cara menjalankan program..." rows={4} /></div><div className="space-y-2"><Label htmlFor="assignment-link">Link repository atau file</Label><Input id="assignment-link" value={assignmentLink} onChange={(event) => setAssignmentLink(event.target.value)} placeholder="https://github.com/..." /></div>{state.assignmentSubmitted && <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"><CheckCircle2 className="h-4 w-4" />Submission diterima · status Lulus untuk demo</div>}<Button onClick={submitAssignment} disabled={state.assignmentSubmitted}><Send className="mr-2 h-4 w-4" />{state.assignmentSubmitted ? "Sudah dikirim" : "Kirim submission"}</Button></CardContent></Card>
          ) : activeMaterial?.type === "feedback" ? (
            <Card><CardHeader><CardTitle>Bagikan pengalaman belajar</CardTitle><p className="text-sm text-muted-foreground">Feedback diperlukan sebelum sertifikat bisa diterbitkan.</p></CardHeader><CardContent className="space-y-5"><div><Label>Rating pelatihan</Label><div className="mt-2 flex gap-2" role="radiogroup" aria-label="Rating pelatihan">{[1, 2, 3, 4, 5].map((rating) => <button key={rating} type="button" onClick={() => setFeedback((current) => ({ ...current, rating }))} aria-label={`${rating} bintang`} className={cn("rounded-md p-2", rating <= feedback.rating ? "text-amber-500" : "text-muted-foreground/35")}><Star className="h-6 w-6 fill-current" /></button>)}</div></div><div className="space-y-2"><Label htmlFor="feedback-comment">Komentar</Label><Textarea id="feedback-comment" value={feedback.comment} onChange={(event) => setFeedback((current) => ({ ...current, comment: event.target.value }))} placeholder="Apa yang paling membantu dari pelatihan ini?" rows={4} /></div>{state.feedbackSubmitted && <p className="text-sm text-emerald-700">Feedback sudah tersimpan.</p>}<Button onClick={submitFeedback} disabled={state.feedbackSubmitted}><Send className="mr-2 h-4 w-4" />Kirim feedback</Button></CardContent></Card>
          ) : (
            <Card><CardContent className="space-y-4 p-8 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"><ClipboardCheck className="h-8 w-8" /></div><h2 className="text-xl font-semibold">Siap mengukur pemahaman?</h2><p className="mx-auto max-w-md text-sm text-muted-foreground">Kerjakan assessment ini setelah mempelajari materi terkait. Kamu akan melihat nilai dan pembahasan setelah mengumpulkan jawaban.</p><Button onClick={() => activeAssessmentForMaterial && setActiveAssessment(activeAssessmentForMaterial)} disabled={!activeAssessmentForMaterial}>{activeAssessmentForMaterial ? "Mulai assessment" : "Materi belum tersedia"}</Button></CardContent></Card>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-sm">{activeMaterial && state.completed.includes(activeMaterial.id) ? <><CheckCircle2 className="h-5 w-5 text-emerald-600" /><span className="font-medium text-emerald-700">Materi selesai</span></> : <><Lock className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Tandai selesai setelah dipelajari</span></>}</div>
            <Button onClick={markComplete} disabled={!activeMaterial || state.completed.includes(activeMaterial.id) || ["quiz", "pretest", "posttest", "assignment", "feedback"].includes(activeMaterial.type)}>{state.completed.includes(activeMaterial?.id ?? "") ? "Sudah selesai" : "Tandai selesai"}<ChevronRight className="ml-2 h-4 w-4" /></Button>
          </div>

          {course.certificateEnabled && completionReady && hasFeedback && !state.feedbackSubmitted && <Card className="border-amber-400/20 bg-amber-400/10"><CardContent className="flex items-start gap-3 p-4 text-sm"><Award className="mt-0.5 h-5 w-5 text-amber-400" /><div><p className="font-semibold">Hampir selesai</p><p className="mt-1 text-muted-foreground">Selesaikan feedback pelatihan agar sertifikat dapat diterbitkan.</p></div></CardContent></Card>}
          {course.certificateEnabled && completionReady && (!hasFeedback || state.feedbackSubmitted) && !state.certificateIssued && <Card className="border-emerald-400/20 bg-emerald-400/10"><CardContent className="flex flex-wrap items-center justify-between gap-3 p-4"><div className="flex items-start gap-3 text-sm"><Award className="mt-0.5 h-5 w-5 text-emerald-400" /><div><p className="font-semibold">Semua syarat terpenuhi</p><p className="mt-1 text-muted-foreground">Sertifikat siap diterbitkan.</p></div></div><Button onClick={issueCertificate}>Terbitkan sertifikat</Button></CardContent></Card>}
          {course.certificateEnabled && state.certificateIssued && <Card className="border-primary/20 bg-primary/[0.03]"><CardContent className="flex flex-wrap items-center justify-between gap-3 p-4"><div className="flex items-start gap-3 text-sm"><Award className="mt-0.5 h-5 w-5 text-primary" /><div><p className="font-semibold">Sertifikat sudah diterbitkan</p><p className="mt-1 text-muted-foreground">{state.certificateNumber}</p></div></div><Link href="/dashboard/sertifikat"><Button variant="outline">Lihat sertifikat</Button></Link></CardContent></Card>}
        </main>

        <aside className="min-w-0 space-y-4">
          <Card className="overflow-hidden"><CardContent className="p-0"><div className="bg-[radial-gradient(circle_at_90%_0%,rgba(236,72,153,0.58),transparent_42%),linear-gradient(135deg,#5B21B6,#16111F)] p-5 text-white"><p className="text-xs uppercase tracking-[0.14em] text-white/60">Pyridam Learning path</p><h2 className="mt-2 text-lg font-medium tracking-[-0.025em]">{course.title}</h2><div className="mt-4 flex items-center gap-3"><Progress value={progress} className="h-2 bg-white/20" /><span className="text-sm font-semibold">{progress}%</span></div><p className="mt-2 text-xs text-white/70">{state.completed.length} dari {allMaterials.length} aktivitas selesai</p></div><div className="max-h-[calc(100vh-250px)] overflow-y-auto">
            {course.modules.map((module, index) => { const moduleDone = module.materials.filter((material) => material.countsTowardProgress).every((material) => state.completed.includes(material.id)); const open = activeModuleId === module.id; return <div key={module.id} className="border-b last:border-b-0"><button type="button" onClick={() => setActiveModuleId(open ? "" : module.id)} className="flex w-full items-start gap-3 p-4 text-left hover:bg-muted/40"><span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold", moduleDone ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground")}>{moduleDone ? <Check className="h-3.5 w-3.5" /> : index + 1}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{module.title}</span><span className="mt-1 block text-xs text-muted-foreground">{module.materials.length} aktivitas · {formatMinutes(module.estimatedMinutes)}</span></span>{open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}</button>{open && <div className="space-y-1 px-2 pb-3">{module.materials.map((material) => { const Icon = materialIcon[material.type]; const done = state.completed.includes(material.id); const locked = material.type === "posttest" && progress < 100; return <button key={material.id} type="button" disabled={locked} onClick={() => selectMaterial(module.id, material)} className={cn("flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left text-sm hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-50", activeMaterialId === material.id && "bg-primary/10 text-primary") }><span className={cn("mt-0.5 shrink-0", done ? "text-emerald-600" : "text-muted-foreground")}>{done ? <CheckCircle2 className="h-4 w-4" /> : locked ? <Lock className="h-4 w-4" /> : <Icon className="h-4 w-4" />}</span><span className="min-w-0 flex-1"><span className="block leading-5">{material.title}</span><span className="mt-0.5 block text-xs text-muted-foreground">{formatMinutes(material.duration)}{material.required ? " · Wajib" : ""}</span></span></button>})}</div>}</div> })}
          </div></CardContent></Card>

          {course.certificateEnabled && <Card><CardHeader className="pb-3"><CardTitle className="text-base">Syarat sertifikat</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">{[
            ["Materi wajib selesai", progress === 100],
            ...(hasAssignment ? [["Assignment dikumpulkan", state.assignmentSubmitted] as [string, boolean]] : []),
            ...(postTest ? [[`Post-test minimal ${course.passingGrade}%`, postTestReady] as [string, boolean]] : []),
            ...(hasFeedback ? [["Feedback dikirim", state.feedbackSubmitted] as [string, boolean]] : []),
          ].map(([label, done]) => <div key={String(label)} className="flex items-center gap-2">{done ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <span className="h-4 w-4 rounded-full border border-border" />}<span className={cn(done ? "text-foreground" : "text-muted-foreground")}>{label}</span></div>)}</CardContent></Card>}
        </aside>
      </div>
    </div>
  )
}
