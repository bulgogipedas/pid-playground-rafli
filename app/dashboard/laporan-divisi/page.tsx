"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  TrendingDown,
  Download,
  Search,
  Calendar,
  CheckCircle,
  AlertCircle,
  Target,
  BarChart3,
  FileText,
} from "lucide-react"
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
  LineChart,
  Line,
  Legend,
} from "recharts"

// Dummy data for division report
const divisionStats = {
  totalKaryawan: 45,
  kursusAktif: 12,
  rataRataProgress: 72,
  totalJamBelajar: 1250,
  sertifikatDiterbitkan: 89,
  kepatuhanWajib: 85,
}

const employeeProgress = [
  {
    id: "EMP001",
    nama: "Budi Santoso",
    nip: "1990001",
    jabatan: "Staff IT",
    kursusAktif: 3,
    kursusSelesai: 8,
    jamBelajar: 42.5,
    progress: 85,
    kepatuhanWajib: 100,
    status: "on_track",
  },
  {
    id: "EMP002",
    nama: "Fajar Rahman",
    nip: "1994010",
    jabatan: "Software Developer",
    kursusAktif: 2,
    kursusSelesai: 5,
    jamBelajar: 28.0,
    progress: 65,
    kepatuhanWajib: 75,
    status: "behind",
  },
  {
    id: "EMP003",
    nama: "Dian Pratiwi",
    nip: "1992015",
    jabatan: "System Analyst",
    kursusAktif: 4,
    kursusSelesai: 12,
    jamBelajar: 58.5,
    progress: 92,
    kepatuhanWajib: 100,
    status: "on_track",
  },
  {
    id: "EMP004",
    nama: "Rizky Aditya",
    nip: "1995020",
    jabatan: "Network Admin",
    kursusAktif: 1,
    kursusSelesai: 3,
    jamBelajar: 18.0,
    progress: 45,
    kepatuhanWajib: 50,
    status: "at_risk",
  },
  {
    id: "EMP005",
    nama: "Sari Wulandari",
    nip: "1993025",
    jabatan: "Database Admin",
    kursusAktif: 2,
    kursusSelesai: 7,
    jamBelajar: 35.5,
    progress: 78,
    kepatuhanWajib: 100,
    status: "on_track",
  },
  {
    id: "EMP006",
    nama: "Andi Wijaya",
    nip: "1991030",
    jabatan: "IT Support",
    kursusAktif: 2,
    kursusSelesai: 4,
    jamBelajar: 22.0,
    progress: 55,
    kepatuhanWajib: 75,
    status: "behind",
  },
]

const monthlyTrend = [
  { bulan: "Jan", jamBelajar: 180, kursusSelesai: 12 },
  { bulan: "Feb", jamBelajar: 220, kursusSelesai: 15 },
  { bulan: "Mar", jamBelajar: 195, kursusSelesai: 14 },
  { bulan: "Apr", jamBelajar: 250, kursusSelesai: 18 },
  { bulan: "Mei", jamBelajar: 210, kursusSelesai: 16 },
  { bulan: "Jun", jamBelajar: 195, kursusSelesai: 14 },
]

const trainingByCategory = [
  { name: "Technical Skills", value: 45, color: "#2A438A" },
  { name: "Soft Skills", value: 25, color: "#059669" },
  { name: "Compliance", value: 20, color: "#D97706" },
  { name: "Leadership", value: 10, color: "#233873" },
]

const pendingRequests = [
  {
    id: "TRQ-2024-015",
    karyawan: "Budi Santoso",
    pelatihan: "AWS Cloud Practitioner",
    tanggalPengajuan: "2024-01-10",
    estimasiBiaya: 5000000,
    status: "menunggu_manager",
  },
  {
    id: "TRQ-2024-016",
    karyawan: "Fajar Rahman",
    pelatihan: "React Advanced Patterns",
    tanggalPengajuan: "2024-01-12",
    estimasiBiaya: 3500000,
    status: "menunggu_manager",
  },
  {
    id: "TRQ-2024-017",
    karyawan: "Dian Pratiwi",
    pelatihan: "Certified Scrum Master",
    tanggalPengajuan: "2024-01-14",
    estimasiBiaya: 8000000,
    status: "menunggu_sdm",
  },
]

const upcomingDeadlines = [
  {
    karyawan: "Rizky Aditya",
    pelatihan: "Keamanan Informasi Dasar",
    deadline: "2024-01-20",
    progress: 45,
    sisa: 5,
  },
  {
    karyawan: "Andi Wijaya",
    pelatihan: "Etika Kerja & Integritas",
    deadline: "2024-01-22",
    progress: 60,
    sisa: 7,
  },
  {
    karyawan: "Fajar Rahman",
    pelatihan: "Pengenalan K3",
    deadline: "2024-01-25",
    progress: 30,
    sisa: 10,
  },
]

export default function LaporanDivisiPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [periodFilter, setPeriodFilter] = useState("2024")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredEmployees = employeeProgress.filter((emp) => {
    const matchesSearch =
      emp.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nip.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on_track":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Sesuai Target
          </Badge>
        )
      case "behind":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            Perlu Perhatian
          </Badge>
        )
      case "at_risk":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Berisiko
          </Badge>
        )
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const getRequestStatusBadge = (status: string) => {
    switch (status) {
      case "menunggu_manager":
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            Menunggu Manager
          </Badge>
        )
      case "menunggu_sdm":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Menunggu SDM
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#233873]">
            Laporan Divisi
          </h1>
          <p className="text-muted-foreground">
            Divisi: {user?.division || "Teknologi Informasi"} | Periode: {periodFilter}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Users className="w-5 h-5 text-[#2A438A]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#233873]">
                  {divisionStats.totalKaryawan}
                </p>
                <p className="text-xs text-muted-foreground">Total Karyawan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#233873]">
                  {divisionStats.kursusAktif}
                </p>
                <p className="text-xs text-muted-foreground">Kursus Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#233873]">
                  {divisionStats.rataRataProgress}%
                </p>
                <p className="text-xs text-muted-foreground">Rata-rata Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#233873]">
                  {divisionStats.totalJamBelajar}
                </p>
                <p className="text-xs text-muted-foreground">Total Jam Belajar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100">
                <Award className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#233873]">
                  {divisionStats.sertifikatDiterbitkan}
                </p>
                <p className="text-xs text-muted-foreground">Sertifikat</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#233873]">
                  {divisionStats.kepatuhanWajib}%
                </p>
                <p className="text-xs text-muted-foreground">Kepatuhan Wajib</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="employees">Progress Karyawan</TabsTrigger>
          <TabsTrigger value="requests">Pengajuan</TabsTrigger>
          <TabsTrigger value="deadlines">Deadline</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Monthly Trend Chart */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Tren Bulanan</CardTitle>
                <CardDescription>Jam belajar dan kursus selesai per bulan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bulan" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="jamBelajar"
                        stroke="#2A438A"
                        strokeWidth={2}
                        name="Jam Belajar"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="kursusSelesai"
                        stroke="#059669"
                        strokeWidth={2}
                        name="Kursus Selesai"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Training by Category */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Distribusi Pelatihan</CardTitle>
                <CardDescription>Berdasarkan kategori pelatihan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trainingByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {trainingByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top & Bottom Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employeeProgress
                    .sort((a, b) => b.jamBelajar - a.jamBelajar)
                    .slice(0, 3)
                    .map((emp, index) => (
                      <div
                        key={emp.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-emerald-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{emp.nama}</p>
                            <p className="text-sm text-muted-foreground">{emp.jabatan}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-600">{emp.jamBelajar} jam</p>
                          <p className="text-xs text-muted-foreground">
                            {emp.kursusSelesai} kursus selesai
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Perlu Perhatian
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employeeProgress
                    .filter((emp) => emp.status === "at_risk" || emp.status === "behind")
                    .slice(0, 3)
                    .map((emp) => (
                      <div
                        key={emp.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-red-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium">{emp.nama}</p>
                            <p className="text-sm text-muted-foreground">{emp.jabatan}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">{emp.kepatuhanWajib}%</p>
                          <p className="text-xs text-muted-foreground">Kepatuhan Wajib</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-lg font-serif">Progress Karyawan</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari nama atau NIP..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-[250px]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="on_track">Sesuai Target</SelectItem>
                      <SelectItem value="behind">Perlu Perhatian</SelectItem>
                      <SelectItem value="at_risk">Berisiko</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Karyawan</TableHead>
                    <TableHead className="text-center">Kursus Aktif</TableHead>
                    <TableHead className="text-center">Kursus Selesai</TableHead>
                    <TableHead className="text-center">Jam Belajar</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-center">Kepatuhan Wajib</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((emp) => (
                    <TableRow key={emp.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{emp.nama}</p>
                          <p className="text-sm text-muted-foreground">
                            {emp.nip} - {emp.jabatan}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{emp.kursusAktif}</TableCell>
                      <TableCell className="text-center">{emp.kursusSelesai}</TableCell>
                      <TableCell className="text-center">{emp.jamBelajar}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={emp.progress} className="w-20 h-2" />
                          <span className="text-sm">{emp.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`font-medium ${
                            emp.kepatuhanWajib === 100
                              ? "text-emerald-600"
                              : emp.kepatuhanWajib >= 75
                              ? "text-amber-600"
                              : "text-red-600"
                          }`}
                        >
                          {emp.kepatuhanWajib}%
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(emp.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Pengajuan Pelatihan Divisi</CardTitle>
              <CardDescription>
                Daftar pengajuan pelatihan dari karyawan di divisi Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Pengajuan</TableHead>
                    <TableHead>Karyawan</TableHead>
                    <TableHead>Pelatihan</TableHead>
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead className="text-right">Estimasi Biaya</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-mono text-sm">{req.id}</TableCell>
                      <TableCell className="font-medium">{req.karyawan}</TableCell>
                      <TableCell>{req.pelatihan}</TableCell>
                      <TableCell>
                        {new Date(req.tanggalPengajuan).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell className="text-right">
                        {req.estimasiBiaya.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        })}
                      </TableCell>
                      <TableCell>{getRequestStatusBadge(req.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deadlines Tab */}
        <TabsContent value="deadlines" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Deadline Mendekati</CardTitle>
              <CardDescription>
                Karyawan dengan deadline pelatihan dalam 14 hari ke depan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      item.sisa <= 5
                        ? "border-red-200 bg-red-50"
                        : item.sisa <= 10
                        ? "border-amber-200 bg-amber-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium">{item.karyawan}</p>
                        <p className="text-sm text-muted-foreground">{item.pelatihan}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            item.sisa <= 5
                              ? "bg-red-100 text-red-700"
                              : item.sisa <= 10
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.sisa} hari lagi
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Deadline: {new Date(item.deadline).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={item.progress}
                        className={`h-2 flex-1 ${
                          item.progress < 50 ? "[&>div]:bg-red-500" : ""
                        }`}
                      />
                      <span className="text-sm font-medium">{item.progress}%</span>
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
