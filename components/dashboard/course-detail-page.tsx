"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Layers3,
  Play,
  Star,
  UserRound,
  Users,
  Video,
} from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"
import { dummyEnrollments, methodLabels, typeLabels, type ContentType, type Course } from "@/lib/data/courses"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  if (!hours) return `${remainder} menit`
  return remainder ? `${hours} jam ${remainder} menit` : `${hours} jam`
}

function MaterialIcon({ type }: { type: ContentType }) {
  if (type === "video") return <Video className="h-4 w-4" />
  if (type === "pdf") return <FileText className="h-4 w-4" />
  if (type === "quiz") return <CheckCircle2 className="h-4 w-4" />
  return <BookOpen className="h-4 w-4" />
}

export function CourseDetailPage({ course }: { course: Course }) {
  const { user } = useAuth()
  const [registeredInSession, setRegisteredInSession] = useState(false)
  const enrollment = dummyEnrollments.find((item) => item.courseId === course.id && item.userId === user?.id)
  const isEnrolled = Boolean(enrollment) || registeredInSession
  const totalMaterials = course.sections.reduce((total, section) => total + section.items.length, 0)
  const quizCount = course.sections.reduce((total, section) => total + section.items.filter((item) => item.type === "quiz").length, 0)

  const register = () => {
    setRegisteredInSession(true)
    toast.success("Berhasil terdaftar", {
      description: `${course.title} sudah ditambahkan ke pelatihan Anda.`,
    })
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground hover:text-white">
        <Link href="/dashboard/katalog"><ArrowLeft />Kembali ke katalog</Link>
      </Button>

      <section className="overflow-hidden rounded-[28px] border border-white/10 bg-card shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
          <div
            role="img"
            aria-label={`Sampul ${course.title}`}
            className="relative min-h-[260px] bg-cover bg-center sm:min-h-[360px] lg:min-h-[520px]"
            style={{ backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.5)),url(${course.thumbnail})` }}
          >
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-5 sm:p-7 lg:hidden">
              <Badge className={cn("border-0", course.type === "wajib" ? "bg-red-500 text-white" : "bg-blue-500 text-white")}>{typeLabels[course.type]}</Badge>
              <Badge className="border-white/20 bg-black/55 text-white backdrop-blur-sm">{course.category}</Badge>
            </div>
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
            <div className="mb-5 hidden flex-wrap gap-2 lg:flex">
              <Badge className={cn("border-0", course.type === "wajib" ? "bg-red-500 text-white" : "bg-blue-500 text-white")}>{typeLabels[course.type]}</Badge>
              <Badge variant="outline">{course.category}</Badge>
              <Badge variant="outline">{methodLabels[course.method]}</Badge>
            </div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Pyridam Learning</p>
            <h1 className="text-balance font-serif text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-white sm:text-4xl lg:text-[44px]">{course.title}</h1>
            <p className="mt-5 text-pretty text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{course.description}</p>

            <div className="mt-6 grid grid-cols-3 gap-2">
              <div className="rounded-[14px] border border-white/[0.07] bg-white/[0.04] p-3"><Clock className="mb-2 h-4 w-4 text-sky-300" /><p className="text-sm font-medium text-white">{formatDuration(course.duration)}</p><p className="mt-0.5 text-[11px] text-muted-foreground">Durasi</p></div>
              <div className="rounded-[14px] border border-white/[0.07] bg-white/[0.04] p-3"><Users className="mb-2 h-4 w-4 text-emerald-300" /><p className="text-sm font-medium text-white">{course.enrollmentCount}</p><p className="mt-0.5 text-[11px] text-muted-foreground">Peserta</p></div>
              <div className="rounded-[14px] border border-white/[0.07] bg-white/[0.04] p-3"><Star className="mb-2 h-4 w-4 fill-amber-300 text-amber-300" /><p className="text-sm font-medium text-white">{course.rating}</p><p className="mt-0.5 text-[11px] text-muted-foreground">Rating</p></div>
            </div>

            {enrollment && (
              <div className="mt-5 rounded-[16px] border border-emerald-400/15 bg-emerald-400/[0.07] p-4">
                <div className="mb-2 flex items-center justify-between text-sm"><span className="text-emerald-200">Progress Anda</span><span className="font-medium text-white">{enrollment.progress}%</span></div>
                <Progress value={enrollment.progress} className="h-2" />
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              {isEnrolled ? (
                <Button asChild size="lg" className="sm:min-w-48"><Link href={`/dashboard/belajar/${course.id}`}><Play />{enrollment?.progress ? "Lanjutkan belajar" : "Mulai belajar"}</Link></Button>
              ) : (
                <Button size="lg" className="sm:min-w-48" onClick={register}><GraduationCap />Daftar pelatihan</Button>
              )}
              <Button asChild size="lg" variant="outline"><a href="#kurikulum">Lihat kurikulum</a></Button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card className="border-white/10 bg-card py-0"><CardContent className="p-5 sm:p-7">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Tentang pelatihan</p>
            <h2 className="mt-2 font-serif text-2xl font-medium tracking-[-0.035em]">Kompetensi praktis untuk pekerjaan sehari-hari</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{course.description} Materi disusun bertahap agar peserta memahami konteks, mempelajari konsep inti, lalu menguji pemahaman melalui aktivitas yang tersedia.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[16px] border border-white/[0.07] bg-white/[0.03] p-4"><Layers3 className="mb-3 h-5 w-5 text-fuchsia-300" /><p className="font-medium">{course.sections.length} bagian</p><p className="mt-1 text-xs text-muted-foreground">Urutan belajar terstruktur</p></div>
              <div className="rounded-[16px] border border-white/[0.07] bg-white/[0.03] p-4"><BookOpen className="mb-3 h-5 w-5 text-sky-300" /><p className="font-medium">{totalMaterials} materi</p><p className="mt-1 text-xs text-muted-foreground">Video, bacaan, dan aktivitas</p></div>
              <div className="rounded-[16px] border border-white/[0.07] bg-white/[0.03] p-4"><CheckCircle2 className="mb-3 h-5 w-5 text-emerald-300" /><p className="font-medium">{course.completionRate}%</p><p className="mt-1 text-xs text-muted-foreground">Tingkat penyelesaian</p></div>
            </div>
          </CardContent></Card>

          <Card id="kurikulum" className="scroll-mt-24 border-white/10 bg-card py-0"><CardContent className="p-5 sm:p-7">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Kurikulum</p><h2 className="mt-2 font-serif text-2xl font-medium tracking-[-0.035em]">Materi yang akan dipelajari</h2></div>
              <p className="text-sm text-muted-foreground">{course.sections.length} bagian · {totalMaterials} materi</p>
            </div>
            <div className="divide-y divide-white/10">
              {course.sections.map((section, sectionIndex) => {
                const sectionDuration = section.items.reduce((total, item) => total + item.duration, 0)
                return (
                  <section key={section.id} className="py-6 first:pt-5 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">{String(sectionIndex + 1).padStart(2, "0")}</span>
                      <div className="min-w-0 flex-1"><div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"><h3 className="font-medium text-white">{section.title}</h3><span className="shrink-0 text-xs text-muted-foreground">{formatDuration(sectionDuration)}</span></div>
                        <div className="mt-4 grid gap-2">
                          {section.items.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-[12px] bg-white/[0.035] px-3 py-2.5 text-sm"><span className="text-muted-foreground"><MaterialIcon type={item.type} /></span><span className="min-w-0 flex-1 text-foreground">{item.title}</span><span className="shrink-0 text-xs text-muted-foreground">{item.duration} mnt</span></div>)}
                        </div>
                      </div>
                    </div>
                  </section>
                )
              })}
            </div>
          </CardContent></Card>

          <Card className="overflow-hidden border-emerald-300/15 bg-[linear-gradient(135deg,rgba(16,185,129,.12),rgba(255,255,255,.02))] py-0"><CardContent className="p-5 sm:p-7">
            <CheckCircle2 className="h-7 w-7 text-emerald-300" />
            <h2 className="mt-4 font-serif text-2xl font-medium tracking-[-0.035em]">Penyelesaian pelatihan</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Selesaikan seluruh materi wajib{quizCount ? ` dan ${quizCount} quiz` : ""}. Progress akan tersimpan otomatis sehingga pembelajaran dapat dilanjutkan dari aktivitas terakhir.</p>
          </CardContent></Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card className="border-white/10 bg-card py-0"><CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Informasi kelas</p>
            <dl className="mt-5 divide-y divide-white/10">
              <div className="flex gap-3 py-3 first:pt-0"><UserRound className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><dt className="text-xs text-muted-foreground">Instruktur</dt><dd className="mt-1 text-sm font-medium">{course.instructor}</dd></div></div>
              <div className="flex gap-3 py-3"><BookOpen className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><dt className="text-xs text-muted-foreground">Metode</dt><dd className="mt-1 text-sm font-medium">{methodLabels[course.method]}</dd></div></div>
              <div className="flex gap-3 py-3"><Clock className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><dt className="text-xs text-muted-foreground">Total durasi</dt><dd className="mt-1 text-sm font-medium">{formatDuration(course.duration)}</dd></div></div>
              <div className="flex gap-3 py-3 last:pb-0"><GraduationCap className="mt-0.5 h-4 w-4 text-muted-foreground" /><div><dt className="text-xs text-muted-foreground">Akses</dt><dd className="mt-1 text-sm font-medium">{course.licenseType === "beli_putus" ? "Akses internal" : "Berlangganan"}</dd></div></div>
            </dl>
          </CardContent></Card>

          <Card className="border-white/10 bg-card py-0"><CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Cocok untuk</p>
            <div className="mt-4 flex flex-wrap gap-2">{course.jobFamilies.map((jobFamily) => <Badge key={jobFamily} variant="outline" className="whitespace-normal text-left leading-5">{jobFamily}</Badge>)}</div>
          </CardContent></Card>
        </aside>
      </div>
    </div>
  )
}
