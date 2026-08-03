"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Download,
  FileText,
  Video,
  FileIcon,
  Star,
  Eye,
  Play,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Dummy content analytics data
const contentStats = {
  totalCourses: 45,
  totalMaterials: 328,
  totalViews: 15420,
  avgRating: 4.6,
  totalLearningHours: 1250,
  completionRate: 72,
}

// Monthly content views
const monthlyViews = [
  { month: "Jan", views: 1200, completions: 85 },
  { month: "Feb", views: 1450, completions: 98 },
  { month: "Mar", views: 1380, completions: 92 },
  { month: "Apr", views: 1620, completions: 110 },
  { month: "Mei", views: 1890, completions: 125 },
  { month: "Jun", views: 2100, completions: 145 },
]

// Content by format
const contentByFormat = [
  { name: "Video", value: 45, color: "#0879B5" },
  { name: "PDF", value: 35, color: "#059669" },
  { name: "SCORM", value: 15, color: "#D97706" },
  { name: "Quiz", value: 5, color: "#DC2626" },
]

// Top performing courses
const topCourses = [
  {
    id: "CRS001",
    title: "Kepemimpinan Efektif",
    trainer: "Dewi Lestari",
    views: 1250,
    completions: 89,
    rating: 4.9,
    avgTime: "4.5 jam",
  },
  {
    id: "CRS002",
    title: "Manajemen Proyek TI",
    trainer: "Agus Prasetyo",
    views: 1120,
    completions: 76,
    rating: 4.8,
    avgTime: "6.0 jam",
  },
  {
    id: "CRS003",
    title: "Digital Marketing Dasar",
    trainer: "PT Edukasi Digital",
    views: 980,
    completions: 65,
    rating: 4.7,
    avgTime: "3.5 jam",
  },
  {
    id: "CRS004",
    title: "Etika Bisnis dan Kepatuhan",
    trainer: "Sinta Maharani",
    views: 890,
    completions: 82,
    rating: 4.6,
    avgTime: "2.0 jam",
  },
  {
    id: "CRS005",
    title: "Keamanan Siber Dasar",
    trainer: "Agus Prasetyo",
    views: 850,
    completions: 58,
    rating: 4.5,
    avgTime: "5.0 jam",
  },
]

// Content quality metrics
const qualityMetrics = [
  {
    id: "CRS001",
    title: "Kepemimpinan Efektif",
    completionRate: 92,
    avgScore: 85,
    feedbackScore: 4.8,
    dropoffRate: 8,
  },
  {
    id: "CRS002",
    title: "Manajemen Proyek TI",
    completionRate: 78,
    avgScore: 82,
    feedbackScore: 4.6,
    dropoffRate: 15,
  },
  {
    id: "CRS003",
    title: "Digital Marketing Dasar",
    completionRate: 85,
    avgScore: 88,
    feedbackScore: 4.7,
    dropoffRate: 12,
  },
  {
    id: "CRS004",
    title: "Etika Bisnis dan Kepatuhan",
    completionRate: 95,
    avgScore: 90,
    feedbackScore: 4.5,
    dropoffRate: 5,
  },
  {
    id: "CRS005",
    title: "Keamanan Siber Dasar",
    completionRate: 68,
    avgScore: 75,
    feedbackScore: 4.3,
    dropoffRate: 22,
  },
]

// Materials needing attention
const materialsAttention = [
  {
    id: "MAT001",
    title: "Video: Pengantar Keamanan Siber",
    course: "Keamanan Siber Dasar",
    issue: "Tingkat drop-off tinggi (35%)",
    severity: "high",
  },
  {
    id: "MAT002",
    title: "Quiz: Manajemen Risiko",
    course: "Manajemen Proyek TI",
    issue: "Rata-rata skor rendah (62%)",
    severity: "medium",
  },
  {
    id: "MAT003",
    title: "PDF: Panduan Compliance",
    course: "Etika Bisnis dan Kepatuhan",
    issue: "Sedikit views (45)",
    severity: "low",
  },
]

export default function LaporanKontenPage() {
  const [periodFilter, setPeriodFilter] = useState("6months")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">Laporan Konten</h1>
          <p className="text-muted-foreground">
            Analisis performa dan kualitas konten pelatihan
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Bulan</SelectItem>
              <SelectItem value="3months">3 Bulan</SelectItem>
              <SelectItem value="6months">6 Bulan</SelectItem>
              <SelectItem value="1year">1 Tahun</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">Kursus</span>
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{contentStats.totalCourses}</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-muted-foreground">Materi</span>
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{contentStats.totalMaterials}</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-muted-foreground">Views</span>
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{contentStats.totalViews.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-muted-foreground">Rating</span>
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{contentStats.avgRating}</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-muted-foreground">Jam Belajar</span>
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{contentStats.totalLearningHours}</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-muted-foreground">Completion</span>
            </div>
            <p className="text-2xl font-bold text-primary mt-1">{contentStats.completionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="courses">Performa Kursus</TabsTrigger>
          <TabsTrigger value="quality">Kualitas Konten</TabsTrigger>
          <TabsTrigger value="attention">Perlu Perhatian</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Views Trend */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Tren Views & Completions</CardTitle>
                <CardDescription>Jumlah views dan penyelesaian per bulan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyViews}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#0879B5" />
                      <YAxis yAxisId="right" orientation="right" stroke="#059669" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="views" stroke="#0879B5" strokeWidth={2} name="Views" />
                      <Line yAxisId="right" type="monotone" dataKey="completions" stroke="#059669" strokeWidth={2} name="Completions" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Content by Format */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Distribusi Format Konten</CardTitle>
                <CardDescription>Persentase materi berdasarkan format</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contentByFormat}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {contentByFormat.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {contentByFormat.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Courses */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Kursus Terpopuler</CardTitle>
              <CardDescription>5 kursus dengan views tertinggi</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul Kursus</TableHead>
                    <TableHead>Trainer</TableHead>
                    <TableHead className="text-center">Views</TableHead>
                    <TableHead className="text-center">Completions</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-center">Rata-rata Waktu</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCourses.map((course, index) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0 ? "bg-amber-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-amber-700" : "bg-gray-300"
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-medium">{course.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{course.trainer}</TableCell>
                      <TableCell className="text-center">{course.views.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{course.completions}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{course.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{course.avgTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Performa Semua Kursus</CardTitle>
              <CardDescription>Metrik performa untuk setiap kursus</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul Kursus</TableHead>
                    <TableHead>Trainer</TableHead>
                    <TableHead className="text-center">Views</TableHead>
                    <TableHead className="text-center">Completions</TableHead>
                    <TableHead className="text-center">Rating</TableHead>
                    <TableHead className="text-center">Rata-rata Waktu</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.trainer}</TableCell>
                      <TableCell className="text-center">{course.views.toLocaleString()}</TableCell>
                      <TableCell className="text-center">{course.completions}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{course.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{course.avgTime}</TableCell>
                      <TableCell className="text-center">
                        <Button size="sm" variant="outline">
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Metrik Kualitas Konten</CardTitle>
              <CardDescription>Analisis kualitas berdasarkan completion rate, skor, dan feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualityMetrics.map((metric) => (
                  <div key={metric.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{metric.title}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold">{metric.feedbackScore}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Completion Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={metric.completionRate} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{metric.completionRate}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Rata-rata Skor</p>
                        <div className="flex items-center gap-2">
                          <Progress value={metric.avgScore} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{metric.avgScore}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Drop-off Rate</p>
                        <div className="flex items-center gap-2">
                          <Progress value={metric.dropoffRate} className="flex-1 h-2 [&>div]:bg-red-500" />
                          <span className="text-sm font-medium text-red-600">{metric.dropoffRate}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <Badge className={
                          metric.completionRate >= 90 ? "bg-emerald-100 text-emerald-700" :
                          metric.completionRate >= 75 ? "bg-blue-100 text-blue-700" :
                          metric.completionRate >= 60 ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }>
                          {metric.completionRate >= 90 ? "Sangat Baik" :
                           metric.completionRate >= 75 ? "Baik" :
                           metric.completionRate >= 60 ? "Cukup" : "Perlu Perbaikan"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attention" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Konten Perlu Perhatian</CardTitle>
              <CardDescription>Materi yang memerlukan review atau perbaikan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {materialsAttention.map((material) => (
                  <div key={material.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border-l-4 border-l-amber-500">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      material.severity === "high" ? "bg-red-100" :
                      material.severity === "medium" ? "bg-amber-100" : "bg-blue-100"
                    }`}>
                      {material.title.includes("Video") ? (
                        <Video className={`w-5 h-5 ${
                          material.severity === "high" ? "text-red-600" :
                          material.severity === "medium" ? "text-amber-600" : "text-blue-600"
                        }`} />
                      ) : material.title.includes("Quiz") ? (
                        <Play className={`w-5 h-5 ${
                          material.severity === "high" ? "text-red-600" :
                          material.severity === "medium" ? "text-amber-600" : "text-blue-600"
                        }`} />
                      ) : (
                        <FileIcon className={`w-5 h-5 ${
                          material.severity === "high" ? "text-red-600" :
                          material.severity === "medium" ? "text-amber-600" : "text-blue-600"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{material.title}</p>
                      <p className="text-sm text-muted-foreground">{material.course}</p>
                      <p className="text-sm mt-1">
                        <span className={
                          material.severity === "high" ? "text-red-600" :
                          material.severity === "medium" ? "text-amber-600" : "text-blue-600"
                        }>
                          {material.issue}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        material.severity === "high" ? "bg-red-100 text-red-700" :
                        material.severity === "medium" ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }>
                        {material.severity === "high" ? "Prioritas Tinggi" :
                         material.severity === "medium" ? "Prioritas Sedang" : "Prioritas Rendah"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
