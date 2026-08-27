"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  ArrowUpRight, BookOpen, CheckCircle, Clock, GraduationCap, Grid3X3,
  List, Play, Search, Star, Users, Youtube,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  dummyCourses, dummyEnrollments, methodLabels, typeLabels,
  type Course, type CourseType, type TrainingMethod,
} from "@/lib/data/courses"
import { pythonCourse } from "@/lib/learning/seed"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/dashboard/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function FeaturedLearningPath() {
  const videoCount = pythonCourse.modules.flatMap((module) => module.materials).filter((material) => material.type === "video").length
  const activityCount = pythonCourse.modules.reduce((total, module) => total + module.materials.length, 0)

  return (
    <Card className="featured-course-shell overflow-hidden rounded-[26px] border-white/10 bg-card py-0 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div className="featured-course-grid grid gap-0">
        <div className="featured-course-copy relative flex min-h-[420px] flex-col justify-center overflow-hidden bg-[radial-gradient(circle_at_18%_8%,rgba(236,72,153,0.78),transparent_30%),radial-gradient(circle_at_90%_100%,rgba(37,99,235,0.7),transparent_43%),linear-gradient(135deg,#6D28D9,#24123D_58%,#111)] p-6 text-white sm:p-8 lg:p-10">
          <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border border-white/15" />
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge className="border-white/15 bg-white/15 text-white"><Youtube /> Open class · YouTube</Badge>
            <Badge variant="outline" className="border-white/20 text-white/80">Gratis</Badge>
            <Badge variant="outline" className="border-white/20 text-white/80">Pemula</Badge>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/55">Pilihan editor</p>
          <h2 className="mt-3 max-w-xl text-4xl font-medium leading-[0.94] tracking-[-0.055em] sm:text-[44px] lg:text-5xl">{pythonCourse.title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">{pythonCourse.shortDescription}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{pythonCourse.estimatedHours} jam</span>
            <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />{pythonCourse.modules.length} modul</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-300 text-amber-300" />{pythonCourse.rating} ({pythonCourse.ratingCount})</span>
          </div>
          <div className="relative z-10 mt-7 flex flex-wrap gap-2">
            <Button asChild><Link href={`/dashboard/belajar/${pythonCourse.id}`}><Play />Coba kelas sekarang</Link></Button>
            <Button asChild variant="secondary"><a href={`https://www.youtube.com/playlist?list=${pythonCourse.youtubePlaylistId}`} target="_blank" rel="noreferrer">Lihat playlist <ArrowUpRight /></a></Button>
          </div>
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-4 bg-[#111] p-4 sm:p-5 lg:p-6">
          <div className="overflow-hidden rounded-[20px] border border-white/10 bg-black shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3"><span className="h-2 w-2 rounded-full bg-white/25" /><span className="h-2 w-2 rounded-full bg-white/15" /><span className="h-2 w-2 rounded-full bg-white/10" /><span className="ml-2 text-[11px] text-white/40">youtube.com · kelas terbuka</span></div>
            <div className="aspect-video w-full"><iframe className="h-full w-full" src={`https://www.youtube.com/embed/iA8lLwmtKQM?list=${pythonCourse.youtubePlaylistId}&rel=0`} title={`Preview ${pythonCourse.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.05] p-3"><p className="text-lg font-medium">{pythonCourse.modules.length}</p><p className="text-[11px] text-muted-foreground">Tahap</p></div>
            <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.05] p-3"><p className="text-lg font-medium">{videoCount}</p><p className="text-[11px] text-muted-foreground">Video</p></div>
            <div className="rounded-[14px] border border-white/[0.06] bg-white/[0.05] p-3"><p className="text-lg font-medium">{activityCount}</p><p className="text-[11px] text-muted-foreground">Aktivitas</p></div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">Learning path lengkap dengan quiz, project CRUD, post-test, progress tersimpan, feedback, dan sertifikat.</p>
        </div>
      </div>
    </Card>
  )
}

function CourseCard({ course, isEnrolled, enrollment }: {
  course: Course
  isEnrolled: boolean
  enrollment?: typeof dummyEnrollments[number]
}) {
  const detailHref = `/dashboard/katalog/${course.id}`

  return (
    <Card className="group flex flex-col overflow-hidden border-white/10 bg-card transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_22px_55px_rgba(0,0,0,0.28)]">
      <Link href={detailHref} aria-label={`Lihat detail ${course.title}`} className="relative block aspect-video overflow-hidden bg-cover bg-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring" style={{ backgroundImage: `linear-gradient(180deg, transparent 45%, rgba(0,0,0,.72)), url(${course.thumbnail})` }}>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
        <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-110"><ArrowUpRight className="h-4 w-4" /></div>
        <div className="absolute left-3 top-3"><Badge className={cn("shadow-sm", course.type === "wajib" ? "bg-red-500 text-white" : "bg-blue-500 text-white")}>{typeLabels[course.type]}</Badge></div>
        {isEnrolled && enrollment && <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15"><div className="h-full bg-emerald-400" style={{ width: `${enrollment.progress}%` }} /></div>}
      </Link>

      <CardContent className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2"><Badge variant="outline">{course.category}</Badge><Badge variant="outline">{methodLabels[course.method]}</Badge></div>
        <Link href={detailHref} className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><h3 className="line-clamp-2 min-h-12 text-base font-medium leading-6 tracking-[-0.02em] transition-colors group-hover:text-white">{course.title}</h3></Link>
        <p className="mb-4 mt-2 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">{course.description}</p>
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{Math.max(1, Math.round(course.duration / 60))} jam</span>
          <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{course.enrollmentCount}</span>
          <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-amber-400" />{course.rating}</span>
        </div>
        {isEnrolled && enrollment && <div className="mb-3 space-y-2 rounded-[14px] bg-white/[0.04] p-3"><div className="flex justify-between text-xs"><span className="text-muted-foreground">Progress Anda</span><span className="font-medium">{enrollment.progress}%</span></div><Progress value={enrollment.progress} className="h-1.5" /></div>}
        <div className={cn("grid gap-2", isEnrolled && "grid-cols-2")}>
          <Button asChild size="sm" variant="outline"><Link href={detailHref}>Lihat detail <ArrowUpRight /></Link></Button>
          {isEnrolled && <Button asChild size="sm"><Link href={`/dashboard/belajar/${course.id}`}><Play />Lanjutkan</Link></Button>}
        </div>
      </CardContent>
    </Card>
  )
}

function CourseListItem({ course, isEnrolled, progress }: { course: Course; isEnrolled: boolean; progress?: number }) {
  const detailHref = `/dashboard/katalog/${course.id}`
  return (
    <Card className="border-white/10 bg-card transition duration-300 hover:border-white/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
      <CardContent className="p-4"><div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link href={detailHref} aria-label={`Lihat detail ${course.title}`} className="aspect-video w-full shrink-0 overflow-hidden rounded-[14px] bg-cover bg-center transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-24 sm:w-40" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,.45)), url(${course.thumbnail})` }} />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2"><Badge className={cn(course.type === "wajib" ? "bg-rose-400/15 text-rose-200" : "bg-sky-400/15 text-sky-200")}>{typeLabels[course.type]}</Badge><Badge variant="outline">{course.category}</Badge></div>
          <Link href={detailHref} className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><h3 className="line-clamp-1 font-medium tracking-[-0.02em] hover:text-white">{course.title}</h3></Link>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{course.instructor}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Clock className="h-3 w-3" />{Math.max(1, Math.round(course.duration / 60))} jam</span><span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.enrollmentCount}</span><span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-400" />{course.rating}</span>{isEnrolled && <span className="flex items-center gap-1 text-emerald-300"><CheckCircle className="h-3 w-3" />{progress ?? 0}% selesai</span>}</div>
        </div>
        <div className="grid w-full shrink-0 grid-cols-2 gap-2 sm:flex sm:w-auto"><Button asChild size="sm" variant="outline"><Link href={detailHref}>Lihat detail</Link></Button>{isEnrolled && <Button asChild size="sm"><Link href={`/dashboard/belajar/${course.id}`}><Play />Lanjutkan</Link></Button>}</div>
      </div></CardContent>
    </Card>
  )
}

export default function KatalogPage() {
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") ?? "")
  const [typeFilter, setTypeFilter] = useState<CourseType | "all">("all")
  const [methodFilter, setMethodFilter] = useState<TrainingMethod | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => setSearchQuery(searchParams.get("search") ?? ""), [searchParams])

  const categories = Array.from(new Set(dummyCourses.map((course) => course.category)))
  const filteredCourses = dummyCourses.filter((course) => {
    if (course.status !== "published") return false
    const query = searchQuery.toLowerCase()
    return (course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query)) && (typeFilter === "all" || course.type === typeFilter) && (methodFilter === "all" || course.method === methodFilter) && (categoryFilter === "all" || course.category === categoryFilter)
  })
  const mandatoryCourses = filteredCourses.filter((course) => course.type === "wajib")
  const optionalCourses = filteredCourses.filter((course) => course.type === "pilihan")
  const getEnrollment = (courseId: string) => dummyEnrollments.find((enrollment) => enrollment.courseId === courseId && enrollment.userId === user?.id)
  const stats = {
    total: dummyCourses.filter((course) => course.status === "published").length + 1,
    mandatory: dummyCourses.filter((course) => course.status === "published" && course.type === "wajib").length,
    optional: dummyCourses.filter((course) => course.status === "published" && course.type === "pilihan").length,
    enrolled: dummyEnrollments.filter((enrollment) => enrollment.userId === user?.id).length,
  }
  const statItems = [
    { label: "Total Pelatihan", value: stats.total, icon: BookOpen, className: "bg-white/10 text-white" },
    { label: "Wajib", value: stats.mandatory, icon: GraduationCap, className: "bg-rose-400/10 text-rose-300" },
    { label: "Pilihan", value: stats.optional, icon: BookOpen, className: "bg-sky-400/10 text-sky-300" },
    { label: "Terdaftar", value: stats.enrolled, icon: CheckCircle, className: "bg-emerald-400/10 text-emerald-300" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader className="mb-0" title="Katalog Pelatihan" description="Jelajahi dan daftar pelatihan untuk mengembangkan kompetensi Anda" />
      <FeaturedLearningPath />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{statItems.map((item) => { const Icon = item.icon; return <Card key={item.label} className="border-white/10 bg-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className={cn("flex h-10 w-10 items-center justify-center rounded-[12px]", item.className)}><Icon className="h-5 w-5" /></div><div><p className="text-2xl font-semibold">{item.value}</p><p className="text-xs text-muted-foreground">{item.label}</p></div></div></CardContent></Card> })}</div>

      <Card className="border-white/10 bg-card"><CardContent className="p-4"><div className="flex flex-col gap-4 lg:flex-row">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Cari pelatihan, instruktur..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="pl-10" /></div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as CourseType | "all")}><SelectTrigger className="w-full sm:w-32"><SelectValue placeholder="Tipe" /></SelectTrigger><SelectContent><SelectItem value="all">Semua Tipe</SelectItem><SelectItem value="wajib">Wajib</SelectItem><SelectItem value="pilihan">Pilihan</SelectItem></SelectContent></Select>
          <Select value={methodFilter} onValueChange={(value) => setMethodFilter(value as TrainingMethod | "all")}><SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Metode" /></SelectTrigger><SelectContent><SelectItem value="all">Semua Metode</SelectItem><SelectItem value="e_learning">E-Learning</SelectItem><SelectItem value="in_house">In-House</SelectItem><SelectItem value="public_online">Public Online</SelectItem><SelectItem value="public_offline">Public Offline</SelectItem></SelectContent></Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}><SelectTrigger className="w-full sm:w-40"><SelectValue placeholder="Kategori" /></SelectTrigger><SelectContent><SelectItem value="all">Semua Kategori</SelectItem>{categories.map((category) => <SelectItem key={category} value={category}>{category}</SelectItem>)}</SelectContent></Select>
          <div className="flex justify-self-start rounded-full border border-white/10 p-0.5"><Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")} aria-label="Tampilan grid" aria-pressed={viewMode === "grid"}><Grid3X3 /></Button><Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")} aria-label="Tampilan daftar" aria-pressed={viewMode === "list"}><List /></Button></div>
        </div>
      </div></CardContent></Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="max-w-full overflow-x-auto"><TabsTrigger value="all">Semua ({filteredCourses.length})</TabsTrigger><TabsTrigger value="wajib">Wajib ({mandatoryCourses.length})</TabsTrigger><TabsTrigger value="pilihan">Pilihan ({optionalCourses.length})</TabsTrigger></TabsList>
        {["all", "wajib", "pilihan"].map((tab) => {
          const courses = tab === "all" ? filteredCourses : tab === "wajib" ? mandatoryCourses : optionalCourses
          return <TabsContent key={tab} value={tab}>{courses.length === 0 ? <Card className="border-white/10 bg-card"><CardContent className="p-10 text-center"><BookOpen className="mx-auto mb-3 h-12 w-12 text-muted-foreground" /><p className="text-muted-foreground">Tidak ada pelatihan ditemukan</p></CardContent></Card> : viewMode === "grid" ? <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{courses.map((course) => { const enrollment = getEnrollment(course.id); return <CourseCard key={course.id} course={course} isEnrolled={Boolean(enrollment)} enrollment={enrollment} /> })}</div> : <div className="space-y-3">{courses.map((course) => { const enrollment = getEnrollment(course.id); return <CourseListItem key={course.id} course={course} isEnrolled={Boolean(enrollment)} progress={enrollment?.progress} /> })}</div>}</TabsContent>
        })}
      </Tabs>
    </div>
  )
}
