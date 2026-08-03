"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  dummyCourses,
  dummyEnrollments,
  methodLabels,
  typeLabels,
  type Course,
  type CourseType,
  type TrainingMethod,
} from "@/lib/data/courses"
import { jobFamilies } from "@/lib/data/users"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  BookOpen,
  GraduationCap,
  Play,
  CheckCircle,
  Video,
  FileText,
  Grid3X3,
  List,
  Calendar,
  Tag,
  ChevronRight,
  PlayCircle,
  Lock,
  Unlock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/dashboard/page-header"
import { pythonCourse } from "@/lib/learning/seed"

function FeaturedLearningPath() {
  return (
    <Card className="overflow-hidden border-primary/20 bg-white shadow-sm">
      <CardContent className="p-0">
        <div className="grid gap-0 lg:grid-cols-[1.3fr_1fr]">
          <div className="bg-[#233873] p-6 text-white sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge className="border-0 bg-cyan-400/15 text-cyan-100">Learning path baru</Badge>
              <Badge variant="outline" className="border-white/20 text-white/80">Pemula</Badge>
            </div>
            <h2 className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">{pythonCourse.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">{pythonCourse.shortDescription}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-300" />{pythonCourse.estimatedHours} jam</span>
              <span className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-cyan-300" />{pythonCourse.modules.length} modul</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-300 text-amber-300" />{pythonCourse.rating} ({pythonCourse.ratingCount})</span>
            </div>
            <Link href={`/dashboard/belajar/${pythonCourse.id}`} className="mt-6 inline-flex">
              <Button className="bg-white text-primary hover:bg-blue-50"><Play className="mr-2 h-4 w-4" />Mulai learning path</Button>
            </Link>
          </div>
          <div className="flex flex-col justify-between gap-5 p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Yang akan kamu kuasai</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {pythonCourse.learningOutcomes.slice(0, 4).map((outcome) => <div key={outcome} className="flex gap-2 text-sm text-muted-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span>{outcome}</span></div>)}
              </div>
            </div>
            <div className="rounded-lg bg-muted/60 p-4 text-sm"><p className="font-semibold">Termasuk di dalamnya</p><p className="mt-1 text-muted-foreground">Video playlist, quiz per modul, mini project, post-test, feedback, dan sertifikat.</p></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Course detail sheet
function CourseDetailSheet({ 
  course, 
  isEnrolled,
  enrollment,
  onEnroll 
}: { 
  course: Course
  isEnrolled: boolean
  enrollment?: typeof dummyEnrollments[0]
  onEnroll: () => void
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          Lihat Detail
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              course.type === "wajib" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
            )}>
              {typeLabels[course.type]}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {methodLabels[course.method]}
            </Badge>
          </div>
          <SheetTitle className="font-serif text-xl">{course.title}</SheetTitle>
          <SheetDescription>{course.description}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Course Image */}
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
            <PlayCircle className="w-16 h-16 text-primary/50" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
              <p className="font-medium">{Math.floor(course.duration / 60)} Jam</p>
              <p className="text-xs text-muted-foreground">Durasi</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
              <p className="font-medium">{course.enrollmentCount}</p>
              <p className="text-xs text-muted-foreground">Peserta</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Star className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <p className="font-medium">{course.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>

          {/* Progress if enrolled */}
          {isEnrolled && enrollment && (
            <div className="space-y-2 p-4 bg-emerald-50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-700 font-medium">Progress Anda</span>
                <span className="font-medium">{enrollment.progress}%</span>
              </div>
              <Progress value={enrollment.progress} className="h-2" />
            </div>
          )}

          {/* Details */}
          <div className="space-y-3">
            <h4 className="font-medium font-serif">Informasi Pelatihan</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Instruktur</span>
                <p className="font-medium">{course.instructor}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Kategori</span>
                <p className="font-medium">{course.category}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Tingkat Penyelesaian</span>
                <p className="font-medium">{course.completionRate}%</p>
              </div>
              <div>
                <span className="text-muted-foreground">Lisensi</span>
                <p className="font-medium flex items-center gap-1">
                  {course.licenseType === "beli_putus" ? (
                    <>
                      <Unlock className="w-3 h-3" />
                      Beli Putus
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3" />
                      Langganan
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Job Families */}
          <div className="space-y-2">
            <h4 className="font-medium font-serif">Target Job Family</h4>
            <div className="flex flex-wrap gap-2">
              {course.jobFamilies.map((jf) => (
                <Badge key={jf} variant="outline" className="text-xs">
                  {jf}
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Path */}
          <div className="space-y-3">
            <h4 className="font-medium font-serif">Learning Path</h4>
            <div className="relative p-4 bg-blue-50 rounded-lg">
              <div className="space-y-3">
                {course.sections.map((section, idx) => (
                  <div key={section.id} className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold">
                        {idx + 1}
                      </div>
                      {idx < course.sections.length - 1 && (
                        <div className="w-0.5 h-8 bg-blue-300 mt-2" />
                      )}
                    </div>
                    <div className="pb-3">
                      <p className="font-medium text-sm">{section.title}</p>
                      <p className="text-xs text-muted-foreground">{section.items.length} materi</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="space-y-3">
            <h4 className="font-medium font-serif">Materi Pelatihan</h4>
            <div className="space-y-2">
              {course.sections.map((section, index) => (
                <div key={section.id} className="border rounded-lg overflow-hidden">
                  <div className="p-3 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="font-medium text-sm">{section.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {section.items.length} materi
                    </span>
                  </div>
                  <div className="p-3 space-y-2">
                    {section.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-sm">
                        {item.type === "video" && <Video className="w-4 h-4 text-secondary" />}
                        {item.type === "pdf" && <FileText className="w-4 h-4 text-red-500" />}
                        {item.type === "quiz" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                        {item.type === "scorm" && <BookOpen className="w-4 h-4 text-amber-500" />}
                        <span className="flex-1">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.duration} menit</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Training */}
          <div className="space-y-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h4 className="font-medium font-serif flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-orange-600" />
              Assessment Pelatihan
            </h4>
            <p className="text-sm text-muted-foreground">
              Peserta akan mengikuti evaluasi formatif dan sumatif untuk mengukur pemahaman materi pelatihan. Assessment terdiri dari kuis interaktif, studi kasus, dan ujian akhir.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Pre-Assessment (0-10%)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Mid-Assessment (40-50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Final Assessment (80-90%)</span>
              </div>
            </div>
          </div>

          {/* Final Project */}
          <div className="space-y-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium font-serif flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              Final Project
            </h4>
            <p className="text-sm text-muted-foreground">
              Sebagai bagian dari penutupan pelatihan, peserta akan mengerjakan proyek praktis yang menerapkan semua konsep dan keterampilan yang telah dipelajari. Proyek akan dievaluasi oleh instruktur dan tim peninjau.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-700">Tipe</Badge>
                <span>Proyek Individu / Kelompok</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-700">Durasi</Badge>
                <span>2-4 minggu</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-700">Bobot</Badge>
                <span>30% dari nilai akhir</span>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6">
          {isEnrolled ? (
            <Link href={`/dashboard/belajar/${course.id}`} className="w-full">
              <Button className="w-full">
                <Play className="w-4 h-4 mr-2" />
                Lanjutkan Belajar
              </Button>
            </Link>
          ) : (
            <Button className="w-full" onClick={onEnroll}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Daftar Pelatihan
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// Course card component
function CourseCard({ 
  course, 
  isEnrolled, 
  enrollment,
  onEnroll 
}: { 
  course: Course
  isEnrolled: boolean
  enrollment?: typeof dummyEnrollments[0]
  onEnroll: () => void
}) {
  return (
    <Card className="border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-primary/30" />
        </div>
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium shadow-sm",
            course.type === "wajib" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          )}>
            {typeLabels[course.type]}
          </Badge>
        </div>
        {isEnrolled && enrollment && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-emerald-500 transition-all" 
              style={{ width: `${enrollment.progress}%` }}
            />
          </div>
        )}
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {methodLabels[course.method]}
          </Badge>
        </div>
        <h3 className="font-medium font-serif line-clamp-2 mb-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
          {course.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {Math.floor(course.duration / 60)} Jam
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.enrollmentCount}
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500" />
            {course.rating}
          </span>
        </div>
        
        {isEnrolled ? (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span className="font-medium">{enrollment?.progress || 0}%</span>
            </div>
            <Progress value={enrollment?.progress || 0} className="h-1.5" />
            <Link href={`/dashboard/belajar/${course.id}`}>
              <Button size="sm" className="w-full mt-2">
                <Play className="w-4 h-4 mr-2" />
                Lanjutkan
              </Button>
            </Link>
          </div>
        ) : (
          <CourseDetailSheet 
            course={course} 
            isEnrolled={isEnrolled}
            enrollment={enrollment}
            onEnroll={onEnroll}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default function KatalogPage() {
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") ?? "")
  const [typeFilter, setTypeFilter] = useState<CourseType | "all">("all")
  const [methodFilter, setMethodFilter] = useState<TrainingMethod | "all">("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [enrollments, setEnrollments] = useState(dummyEnrollments)

  useEffect(() => {
    setSearchQuery(searchParams.get("search") ?? "")
  }, [searchParams])

  // Get unique categories
  const categories = Array.from(new Set(dummyCourses.map(c => c.category)))

  // Filter courses
  const filteredCourses = dummyCourses.filter(course => {
    // Only show published courses
    if (course.status !== "published") return false
    
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || course.type === typeFilter
    const matchesMethod = methodFilter === "all" || course.method === methodFilter
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    
    return matchesSearch && matchesType && matchesMethod && matchesCategory
  })

  // Group courses
  const mandatoryCourses = filteredCourses.filter(c => c.type === "wajib")
  const optionalCourses = filteredCourses.filter(c => c.type === "pilihan")

  // Check enrollment status
  const isEnrolled = (courseId: string) => enrollments.some(e => e.courseId === courseId && e.userId === user?.id)
  const getEnrollment = (courseId: string) => enrollments.find(e => e.courseId === courseId && e.userId === user?.id)

  // Handle enrollment
  const handleEnroll = (courseId: string) => {
    const newEnrollment = {
      id: `ENR${Date.now()}`,
      courseId,
      userId: user?.id || "",
      progress: 0,
      status: "belum_mulai" as const,
      startedAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
      sectionsProgress: {},
    }
    setEnrollments([...enrollments, newEnrollment])
  }

  // Stats
  const stats = {
    total: dummyCourses.filter(c => c.status === "published").length,
    mandatory: dummyCourses.filter(c => c.status === "published" && c.type === "wajib").length,
    optional: dummyCourses.filter(c => c.status === "published" && c.type === "pilihan").length,
    enrolled: enrollments.filter(e => e.userId === user?.id).length,
  }

  return (
    <div className="space-y-6">
      <PageHeader
        className="mb-0"
        title="Katalog Pelatihan"
        description="Jelajahi dan daftar pelatihan untuk mengembangkan kompetensi Anda"
      />

      <FeaturedLearningPath />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Pelatihan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.mandatory}</p>
                <p className="text-xs text-muted-foreground">Wajib</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.optional}</p>
                <p className="text-xs text-muted-foreground">Pilihan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{stats.enrolled}</p>
                <p className="text-xs text-muted-foreground">Terdaftar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari pelatihan, instruktur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as CourseType | "all")}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="wajib">Wajib</SelectItem>
                  <SelectItem value="pilihan">Pilihan</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={(v) => setMethodFilter(v as TrainingMethod | "all")}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Metode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Metode</SelectItem>
                  <SelectItem value="e_learning">E-Learning</SelectItem>
                  <SelectItem value="in_house">In-House</SelectItem>
                  <SelectItem value="public_online">Public Online</SelectItem>
                  <SelectItem value="public_offline">Public Offline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex rounded-md border">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  aria-label="Tampilan grid"
                  aria-pressed={viewMode === "grid"}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="icon"
                  onClick={() => setViewMode("list")}
                  aria-label="Tampilan daftar"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Semua ({filteredCourses.length})</TabsTrigger>
          <TabsTrigger value="wajib">Wajib ({mandatoryCourses.length})</TabsTrigger>
          <TabsTrigger value="pilihan">Pilihan ({optionalCourses.length})</TabsTrigger>
        </TabsList>

        {["all", "wajib", "pilihan"].map((tab) => {
          const tabCourses = tab === "all" ? filteredCourses :
            tab === "wajib" ? mandatoryCourses : optionalCourses

          return (
            <TabsContent key={tab} value={tab}>
              {tabCourses.length === 0 ? (
                <Card className="border-gray-100 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Tidak ada pelatihan ditemukan</p>
                  </CardContent>
                </Card>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tabCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isEnrolled={isEnrolled(course.id)}
                      enrollment={getEnrollment(course.id)}
                      onEnroll={() => handleEnroll(course.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {tabCourses.map((course) => {
                    const enrolled = isEnrolled(course.id)
                    const enrollment = getEnrollment(course.id)
                    
                    return (
                      <Card key={course.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            {/* Thumbnail */}
                            <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                              <PlayCircle className="w-8 h-8 text-primary/30" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={cn(
                                  "rounded-full px-2 py-0.5 text-xs font-medium",
                                  course.type === "wajib" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                                )}>
                                  {typeLabels[course.type]}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {course.category}
                                </Badge>
                              </div>
                              <h3 className="font-medium font-serif line-clamp-1">{course.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                                {course.instructor}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {Math.floor(course.duration / 60)} Jam
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {course.enrollmentCount}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-500" />
                                  {course.rating}
                                </span>
                                {enrolled && enrollment && (
                                  <span className="flex items-center gap-1 text-emerald-600">
                                    <CheckCircle className="w-3 h-3" />
                                    {enrollment.progress}%
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center shrink-0">
                              {enrolled ? (
                                <Button size="sm">
                                  <Play className="w-4 h-4 mr-2" />
                                  Lanjutkan
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" onClick={() => handleEnroll(course.id)}>
                                  <GraduationCap className="w-4 h-4 mr-2" />
                                  Daftar
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
