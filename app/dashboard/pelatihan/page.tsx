"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Filter, 
  Clock, 
  Calendar,
  Play,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Award,
  TrendingUp,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  dummyCourses, 
  dummyEnrollments, 
  Course, 
  Enrollment,
  methodLabels,
  typeLabels,
  statusLabels,
  CourseStatus,
} from "@/lib/data/courses"
import { useAuth } from "@/lib/auth-context"
import { PageHeader } from "@/components/dashboard/page-header"

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0 && mins > 0) {
    return `${hours} jam ${mins} menit`
  } else if (hours > 0) {
    return `${hours} jam`
  }
  return `${mins} menit`
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getDaysRemaining(deadline: string): number {
  const today = new Date()
  const deadlineDate = new Date(deadline)
  const diffTime = deadlineDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

interface EnrolledCourseCardProps {
  enrollment: Enrollment
  course: Course
}

function EnrolledCourseCard({ enrollment, course }: EnrolledCourseCardProps) {
  const daysRemaining = enrollment.deadline ? getDaysRemaining(enrollment.deadline) : null
  const isUrgent = daysRemaining !== null && daysRemaining <= 7 && daysRemaining > 0
  const isOverdue = daysRemaining !== null && daysRemaining < 0

  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Thumbnail */}
          <div className="w-full md:w-48 h-32 md:h-auto bg-gradient-to-br from-[#233873] to-[#2A438A] rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center shrink-0">
            <BookOpen className="w-12 h-12 text-white/80" />
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    className={
                      course.type === 'wajib' 
                        ? 'bg-[#D97706]/10 text-warning' 
                        : 'bg-blue-600/10 text-primary'
                    }
                  >
                    {typeLabels[course.type]}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {methodLabels[course.method]}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {course.description}
                </p>
                
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Instruktur: {course.instructor}</span>
                  </div>
                </div>
              </div>
              
              {/* Status & Action */}
              <div className="text-right shrink-0">
                {enrollment.status === 'selesai' ? (
                  <Badge className="bg-success text-white mb-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Selesai
                  </Badge>
                ) : enrollment.status === 'sedang_berjalan' ? (
                  <Badge className="bg-blue-600 text-white mb-2">
                    <Play className="w-3 h-3 mr-1" />
                    Sedang Berjalan
                  </Badge>
                ) : (
                  <Badge variant="outline" className="mb-2">
                    Belum Mulai
                  </Badge>
                )}
                
                {enrollment.deadline && enrollment.status !== 'selesai' && (
                  <div className={`text-xs mt-1 ${isOverdue ? 'text-destructive' : isUrgent ? 'text-warning' : 'text-muted-foreground'}`}>
                    {isOverdue ? (
                      <span className="flex items-center gap-1 justify-end">
                        <AlertTriangle className="w-3 h-3" />
                        Terlambat {Math.abs(daysRemaining!)} hari
                      </span>
                    ) : (
                      <span>
                        {daysRemaining} hari lagi
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress */}
            {enrollment.status !== 'belum_mulai' && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progres</span>
                  <span className="font-medium text-foreground">{enrollment.progress}%</span>
                </div>
                <Progress value={enrollment.progress} className="h-2" />
              </div>
            )}
            
            {/* Action Button */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Terakhir diakses: {formatDate(enrollment.lastAccessedAt)}
              </span>
              <Link href={enrollment.status === 'selesai' ? `/dashboard/sertifikat` : `/dashboard/belajar/${course.id}`}>
                <Button 
                  size="sm" 
                  className={
                    enrollment.status === 'selesai'
                      ? 'bg-success hover:bg-[#047857]'
                      : enrollment.status === 'sedang_berjalan'
                      ? 'bg-blue-600 hover:bg-blue-600'
                      : 'bg-blue-600 hover:bg-[#1D305F]'
                  }
                >
                  {enrollment.status === 'selesai' ? 'Lihat Sertifikat' : 
                   enrollment.status === 'sedang_berjalan' ? 'Lanjutkan' : 'Mulai Belajar'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PelatihanSayaPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("semua")

  // Get enrollments for current user
  const userEnrollments = dummyEnrollments.filter(e => e.userId === (user?.id || "USR001"))
  
  // Join with course data
  const enrolledCourses = userEnrollments.map(enrollment => {
    const course = dummyCourses.find(c => c.id === enrollment.courseId)
    return { enrollment, course: course! }
  }).filter(item => item.course)

  // Filter based on search and filters
  const filteredCourses = enrolledCourses.filter(({ enrollment, course }) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter
    const matchesType = typeFilter === "all" || course.type === typeFilter
    const matchesTab = activeTab === "semua" || 
      (activeTab === "sedang" && enrollment.status === "sedang_berjalan") ||
      (activeTab === "selesai" && enrollment.status === "selesai") ||
      (activeTab === "belum" && enrollment.status === "belum_mulai")
    return matchesSearch && matchesStatus && matchesType && matchesTab
  })

  // Stats
  const totalEnrolled = userEnrollments.length
  const inProgress = userEnrollments.filter(e => e.status === "sedang_berjalan").length
  const completed = userEnrollments.filter(e => e.status === "selesai").length
  const totalLearningHours = userEnrollments
    .filter(e => e.status === "selesai")
    .reduce((acc, e) => {
      const course = dummyCourses.find(c => c.id === e.courseId)
      return acc + (course?.duration || 0) / 60
    }, 0)

  return (
    <div className="space-y-6">
      <PageHeader
        className="mb-0"
        title="Pelatihan Saya"
        description="Kelola dan pantau progres pelatihan Anda"
        actions={
          <Link href="/dashboard/katalog">
            <Button>
              <BookOpen className="mr-2 h-4 w-4" />
              Jelajahi Katalog
            </Button>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Pelatihan
            </CardTitle>
            <BookOpen className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalEnrolled}</div>
            <p className="text-xs text-muted-foreground">Terdaftar</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sedang Berjalan
            </CardTitle>
            <Play className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{inProgress}</div>
            <p className="text-xs text-muted-foreground">Perlu dilanjutkan</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Selesai
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{completed}</div>
            <p className="text-xs text-muted-foreground">Pelatihan</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Jam Belajar
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalLearningHours.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Total jam</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Filters */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="sedang">Sedang Berjalan</TabsTrigger>
            <TabsTrigger value="selesai">Selesai</TabsTrigger>
            <TabsTrigger value="belum">Belum Mulai</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari pelatihan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Semua Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="wajib">Wajib</SelectItem>
                <SelectItem value="pilihan">Pilihan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Course List */}
        <TabsContent value={activeTab} className="mt-6">
          {filteredCourses.length > 0 ? (
            <div className="space-y-4">
              {filteredCourses.map(({ enrollment, course }) => (
                <EnrolledCourseCard
                  key={enrollment.id}
                  enrollment={enrollment}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardContent className="py-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  Tidak ada pelatihan ditemukan
                </h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "semua" 
                    ? "Anda belum terdaftar di pelatihan manapun."
                    : `Tidak ada pelatihan dengan status "${activeTab}".`}
                </p>
                <Link href="/dashboard/katalog">
                  <Button>
                    Jelajahi Katalog Pelatihan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
