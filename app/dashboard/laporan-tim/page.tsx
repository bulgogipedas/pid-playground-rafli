"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Users,
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  FileText,
  CheckCircle,
  AlertTriangle,
  Calendar,
  BarChart3,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Dummy data for team members
const teamMembers = [
  {
    id: "TM001",
    name: "Budi Santoso",
    position: "Staff IT",
    enrolledCourses: 5,
    completedCourses: 3,
    inProgressCourses: 2,
    learningHours: 24.5,
    certificates: 3,
    complianceStatus: "compliant",
    lastActivity: "2024-01-15",
  },
  {
    id: "TM002",
    name: "Rina Permata",
    position: "Staff Akuntansi",
    enrolledCourses: 4,
    completedCourses: 4,
    inProgressCourses: 0,
    learningHours: 32.0,
    certificates: 4,
    complianceStatus: "compliant",
    lastActivity: "2024-01-14",
  },
  {
    id: "TM003",
    name: "Fajar Rahman",
    position: "Software Developer",
    enrolledCourses: 6,
    completedCourses: 2,
    inProgressCourses: 4,
    learningHours: 18.5,
    certificates: 2,
    complianceStatus: "at_risk",
    lastActivity: "2024-01-10",
  },
  {
    id: "TM004",
    name: "Dewi Anggraini",
    position: "Business Analyst",
    enrolledCourses: 3,
    completedCourses: 1,
    inProgressCourses: 2,
    learningHours: 12.0,
    certificates: 1,
    complianceStatus: "non_compliant",
    lastActivity: "2024-01-05",
  },
  {
    id: "TM005",
    name: "Arief Wicaksono",
    position: "System Administrator",
    enrolledCourses: 4,
    completedCourses: 3,
    inProgressCourses: 1,
    learningHours: 28.0,
    certificates: 3,
    complianceStatus: "compliant",
    lastActivity: "2024-01-15",
  },
]

// Monthly learning data
const monthlyData = [
  { month: "Jan", hours: 45, completed: 8 },
  { month: "Feb", hours: 52, completed: 10 },
  { month: "Mar", hours: 48, completed: 7 },
  { month: "Apr", hours: 61, completed: 12 },
  { month: "Mei", hours: 55, completed: 9 },
  { month: "Jun", hours: 67, completed: 14 },
]

// Training distribution
const trainingDistribution = [
  { name: "Hard Skill", value: 45, color: "#0879B5" },
  { name: "Soft Skill", value: 35, color: "#059669" },
  { name: "Compliance", value: 20, color: "#D97706" },
]

// Pending approvals for manager
const pendingApprovals = [
  {
    id: "REQ001",
    employeeName: "Budi Santoso",
    trainingName: "AWS Solutions Architect",
    vendor: "Amazon Web Services",
    cost: 15000000,
    submittedDate: "2024-01-10",
    status: "pending",
  },
  {
    id: "REQ002",
    employeeName: "Fajar Rahman",
    trainingName: "Certified Kubernetes Administrator",
    vendor: "Linux Foundation",
    cost: 8500000,
    submittedDate: "2024-01-12",
    status: "pending",
  },
  {
    id: "REQ003",
    employeeName: "Dewi Anggraini",
    trainingName: "Project Management Professional",
    vendor: "PMI Indonesia",
    cost: 12000000,
    submittedDate: "2024-01-14",
    status: "pending",
  },
]

// Upcoming deadlines
const upcomingDeadlines = [
  {
    id: "DL001",
    employeeName: "Fajar Rahman",
    courseName: "Keamanan Siber Dasar",
    deadline: "2024-01-20",
    progress: 65,
    daysLeft: 5,
  },
  {
    id: "DL002",
    employeeName: "Dewi Anggraini",
    courseName: "Etika Bisnis dan Kepatuhan",
    deadline: "2024-01-18",
    progress: 30,
    daysLeft: 3,
  },
  {
    id: "DL003",
    employeeName: "Budi Santoso",
    courseName: "Manajemen Proyek TI",
    deadline: "2024-01-25",
    progress: 80,
    daysLeft: 10,
  },
]

export default function LaporanTimPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || member.complianceStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalLearningHours = teamMembers.reduce((sum, m) => sum + m.learningHours, 0)
  const totalCertificates = teamMembers.reduce((sum, m) => sum + m.certificates, 0)
  const compliantCount = teamMembers.filter(m => m.complianceStatus === "compliant").length
  const complianceRate = Math.round((compliantCount / teamMembers.length) * 100)

  const getComplianceBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-emerald-100 text-emerald-700">Patuh</Badge>
      case "at_risk":
        return <Badge className="bg-amber-100 text-amber-700">Berisiko</Badge>
      case "non_compliant":
        return <Badge className="bg-red-100 text-red-700">Tidak Patuh</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">Laporan Tim</h1>
          <p className="text-muted-foreground">
            Pantau progres pembelajaran dan kinerja tim Anda
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Anggota Tim</p>
                <p className="text-2xl font-bold text-primary">{teamMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Jam Belajar</p>
                <p className="text-2xl font-bold text-primary">{totalLearningHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sertifikat</p>
                <p className="text-2xl font-bold text-primary">{totalCertificates}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tingkat Kepatuhan</p>
                <p className="text-2xl font-bold text-primary">{complianceRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="learning-hours">Jam Belajar</TabsTrigger>
          <TabsTrigger value="certification">Sertifikasi</TabsTrigger>
          <TabsTrigger value="statistics">Statistik</TabsTrigger>
          <TabsTrigger value="cost-dashboard">Biaya</TabsTrigger>
          <TabsTrigger value="members">Anggota Tim</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Monthly Learning Trend */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Tren Pembelajaran Bulanan</CardTitle>
                <CardDescription>Jam belajar dan pelatihan selesai per bulan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#0879B5" />
                      <YAxis yAxisId="right" orientation="right" stroke="#059669" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="hours" fill="#0879B5" name="Jam Belajar" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="completed" fill="#059669" name="Selesai" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Training Distribution */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Distribusi Pelatihan</CardTitle>
                <CardDescription>Berdasarkan jenis pelatihan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trainingDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {trainingDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {trainingDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Performers</CardTitle>
              <CardDescription>Anggota tim dengan pencapaian terbaik</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers
                  .sort((a, b) => b.learningHours - a.learningHours)
                  .slice(0, 3)
                  .map((member, index) => (
                    <div key={member.id} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? "bg-amber-500" : index === 1 ? "bg-gray-400" : "bg-amber-700"
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-secondary">{member.learningHours} jam</p>
                        <p className="text-xs text-muted-foreground">{member.certificates} sertifikat</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold">Daftar Anggota Tim</CardTitle>
                  <CardDescription>Progres pembelajaran setiap anggota</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari anggota..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="compliant">Patuh</SelectItem>
                      <SelectItem value="at_risk">Berisiko</SelectItem>
                      <SelectItem value="non_compliant">Tidak Patuh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Posisi</TableHead>
                    <TableHead className="text-center">Kursus</TableHead>
                    <TableHead className="text-center">Jam Belajar</TableHead>
                    <TableHead className="text-center">Sertifikat</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Aktivitas Terakhir</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-emerald-600">{member.completedCourses}</span>
                        <span className="text-muted-foreground">/</span>
                        <span>{member.enrolledCourses}</span>
                      </TableCell>
                      <TableCell className="text-center">{member.learningHours}</TableCell>
                      <TableCell className="text-center">{member.certificates}</TableCell>
                      <TableCell className="text-center">{getComplianceBadge(member.complianceStatus)}</TableCell>
                      <TableCell>{new Date(member.lastActivity).toLocaleDateString("id-ID")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Pengajuan Menunggu Persetujuan</CardTitle>
              <CardDescription>Pengajuan pelatihan dari anggota tim yang perlu Anda setujui</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingApprovals.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Karyawan</TableHead>
                      <TableHead>Nama Pelatihan</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead className="text-right">Biaya</TableHead>
                      <TableHead>Tanggal Pengajuan</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.employeeName}</TableCell>
                        <TableCell>{request.trainingName}</TableCell>
                        <TableCell>{request.vendor}</TableCell>
                        <TableCell className="text-right">
                          Rp {request.cost.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell>{new Date(request.submittedDate).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              Setujui
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                              Tolak
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
                  <p>Tidak ada pengajuan yang menunggu persetujuan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Deadline Pelatihan Mendatang</CardTitle>
              <CardDescription>Pelatihan anggota tim yang mendekati deadline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      item.daysLeft <= 3 ? "bg-red-100" : item.daysLeft <= 7 ? "bg-amber-100" : "bg-blue-100"
                    }`}>
                      <Calendar className={`w-6 h-6 ${
                        item.daysLeft <= 3 ? "text-red-600" : item.daysLeft <= 7 ? "text-amber-600" : "text-blue-600"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.employeeName}</p>
                      <p className="text-sm text-muted-foreground">{item.courseName}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={
                        item.daysLeft <= 3 ? "bg-red-100 text-red-700" :
                        item.daysLeft <= 7 ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      }>
                        {item.daysLeft} hari lagi
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(item.deadline).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Hours Per Division Tab */}
        <TabsContent value="learning-hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jam Belajar Per Divisi/Unit</CardTitle>
              <CardDescription>Total learning hours yang telah dicapai setiap divisi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { division: "Teknologi Informasi", hours: 156, target: 200, percentage: 78 },
                  { division: "Keuangan", hours: 98, target: 120, percentage: 82 },
                  { division: "Operasional", hours: 245, target: 300, percentage: 82 },
                  { division: "Marketing", hours: 68, target: 80, percentage: 85 },
                  { division: "HR", hours: 72, target: 80, percentage: 90 },
                ].map((item) => (
                  <div key={item.division} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{item.division}</span>
                      <span className="text-sm text-muted-foreground">{item.hours} / {item.target} jam</span>
                    </div>
                    <Progress value={item.percentage} />
                    <p className="text-xs text-muted-foreground">{item.percentage}% dari target</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Certification Tab */}
        <TabsContent value="certification" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Jumlah Peserta Pembelajaran</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-secondary mb-2">{teamMembers.length}</p>
                <p className="text-sm text-muted-foreground">Peserta aktif bulan ini</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Aktif belajar:</span>
                    <span className="font-medium">6</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Selesai bulan ini:</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Dalam proses:</span>
                    <span className="font-medium">4</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Jumlah Karyawan Bersertifikat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-amber-600 mb-2">{totalCertificates}</p>
                <p className="text-sm text-muted-foreground">Sertifikat yang telah diterbitkan</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sertifikat internal:</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sertifikat eksternal:</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sedang divalidasi:</span>
                    <span className="font-medium">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Pembelajaran Per Periode</CardTitle>
              <CardDescription>Data pembelajaran per bulan dalam tahun 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#0879B5" name="Jam Belajar" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill="#059669" name="Selesai" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-secondary">4,562</p>
                  <p className="text-xs text-muted-foreground">Total Jam</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">145</p>
                  <p className="text-xs text-muted-foreground">Rata-rata Jam/Orang</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">87.5%</p>
                  <p className="text-xs text-muted-foreground">Compliance Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Dashboard Tab */}
        <TabsContent value="cost-dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Biaya Pembelajaran Per Divisi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { division: "IT", allocated: 150000000, spent: 98000000, remaining: 52000000 },
                    { division: "Finance", allocated: 80000000, spent: 65000000, remaining: 15000000 },
                    { division: "Operations", allocated: 200000000, spent: 145000000, remaining: 55000000 },
                  ].map((item) => (
                    <div key={item.division} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.division}</span>
                        <span className="text-xs text-muted-foreground">
                          Rp {(item.spent / 1000000).toFixed(0)}M / Rp {(item.allocated / 1000000).toFixed(0)}M
                        </span>
                      </div>
                      <Progress value={(item.spent / item.allocated) * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Biaya Terpakai & Tersisa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Biaya Terpakai</p>
                    <p className="text-2xl font-bold text-secondary">Rp 308 Juta</p>
                  </div>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary" style={{ width: "60%" }} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Biaya Tersisa</p>
                    <p className="text-2xl font-bold text-emerald-600">Rp 122 Juta</p>
                  </div>
                  <div className="h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600" style={{ width: "40%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
