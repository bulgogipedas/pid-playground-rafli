"use client"

import { useState } from "react"
import { 
  Users, 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Calendar,
  Building2,
  Target,
  Percent
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
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
  LineChart,
  Line,
  Legend
} from "recharts"

// Dashboard data
const overviewStats = {
  totalEmployees: 542,
  activelearners: 423,
  completedCourses: 1847,
  totalLearningHours: 4562,
  certificatesIssued: 1523,
  mandatoryCompliance: 87.5,
}

const divisionStats = [
  { name: "IT Operations", employees: 85, participation: 92, completion: 88, hours: 756, compliance: 95 },
  { name: "Finance", employees: 62, participation: 85, completion: 82, hours: 498, compliance: 90 },
  { name: "Operations", employees: 156, participation: 78, completion: 75, hours: 1245, compliance: 82 },
  { name: "Marketing", employees: 45, participation: 88, completion: 85, hours: 378, compliance: 92 },
  { name: "HR", employees: 28, participation: 95, completion: 92, hours: 312, compliance: 98 },
  { name: "Legal", employees: 18, participation: 82, completion: 80, hours: 165, compliance: 88 },
  { name: "Procurement", employees: 35, participation: 75, completion: 70, hours: 285, compliance: 78 },
]

const monthlyTrends = [
  { month: "Jan", learners: 320, completions: 145, hours: 567 },
  { month: "Feb", learners: 345, completions: 167, hours: 623 },
  { month: "Mar", learners: 378, completions: 189, hours: 702 },
  { month: "Apr", learners: 356, completions: 178, hours: 654 },
  { month: "Mei", learners: 389, completions: 201, hours: 745 },
  { month: "Jun", learners: 412, completions: 223, hours: 812 },
  { month: "Jul", learners: 398, completions: 215, hours: 778 },
  { month: "Aug", learners: 425, completions: 234, hours: 856 },
  { month: "Sep", learners: 438, completions: 245, hours: 892 },
  { month: "Okt", learners: 456, completions: 267, hours: 945 },
  { month: "Nov", learners: 478, completions: 289, hours: 1023 },
  { month: "Des", learners: 423, completions: 256, hours: 867 },
]

const courseCompletionData = [
  { name: "Selesai", value: 1847, color: "#059669" },
  { name: "Sedang Berjalan", value: 523, color: "#2A438A" },
  { name: "Belum Mulai", value: 289, color: "#E2E8F0" },
]

const trainingTypeData = [
  { name: "E-Learning", value: 1245, color: "#2A438A" },
  { name: "In-House", value: 456, color: "#233873" },
  { name: "Public Online", value: 312, color: "#D97706" },
  { name: "Public Offline", value: 178, color: "#059669" },
]

const topPerformers = [
  { rank: 1, name: "Dewi Lestari", division: "HR", hours: 48.5, courses: 12, certificates: 10 },
  { rank: 2, name: "Ahmad Wijaya", division: "IT Operations", hours: 45.2, courses: 11, certificates: 9 },
  { rank: 3, name: "Siti Aminah", division: "Finance", hours: 42.8, courses: 10, certificates: 8 },
  { rank: 4, name: "Budi Santoso", division: "IT Operations", hours: 40.5, courses: 9, certificates: 8 },
  { rank: 5, name: "Rina Wulandari", division: "Marketing", hours: 38.2, courses: 9, certificates: 7 },
]

const bottomPerformers = [
  { rank: 1, name: "Joko Susilo", division: "Operations", hours: 4.5, mandatory: 2, overdue: 3 },
  { rank: 2, name: "Wati Setiawan", division: "Procurement", hours: 5.2, mandatory: 3, overdue: 2 },
  { rank: 3, name: "Rudi Hartono", division: "Operations", hours: 6.8, mandatory: 4, overdue: 2 },
  { rank: 4, name: "Linda Permata", division: "Operations", hours: 7.2, mandatory: 4, overdue: 1 },
  { rank: 5, name: "Hasan Basri", division: "Procurement", hours: 8.5, mandatory: 5, overdue: 1 },
]

const mandatoryTrainingStatus = [
  { name: "K3 Dasar", total: 542, completed: 485, percentage: 89 },
  { name: "Etika Bisnis & Anti Korupsi", total: 542, completed: 512, percentage: 94 },
  { name: "Cybersecurity Awareness", total: 210, completed: 178, percentage: 85 },
  { name: "Kepemimpinan (Supervisor)", total: 120, completed: 98, percentage: 82 },
  { name: "Onboarding Karyawan Baru", total: 45, completed: 45, percentage: 100 },
]

const certificateExpiry = [
  { period: "30 Hari", count: 12, certificates: ["AWS Cloud Practitioner", "ISO 9001 Lead Auditor"] },
  { period: "60 Hari", count: 28, certificates: ["PMP", "ITIL Foundation"] },
  { period: "90 Hari", count: 45, certificates: ["K3 Umum", "First Aid Certification"] },
]

export default function ManajemenDashboardPage() {
  const { user } = useAuth()
  const [period, setPeriod] = useState("2024")
  const [selectedDivision, setSelectedDivision] = useState("all")
  
  const isAuthorized = user?.role === 'admin_sdm' || user?.role === 'manager'
  
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="font-serif text-xl font-semibold mb-2">Akses Terbatas</h2>
          <p className="text-muted-foreground">
            Dashboard manajemen hanya dapat diakses oleh Admin SDM dan Manager.
          </p>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Dashboard Manajemen</h1>
          <p className="text-muted-foreground mt-1">
            Pantau dan analisis kinerja pembelajaran organisasi
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">Tahun 2024</SelectItem>
              <SelectItem value="2023">Tahun 2023</SelectItem>
              <SelectItem value="q4-2024">Q4 2024</SelectItem>
              <SelectItem value="q3-2024">Q3 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-primary" />
              <Badge variant="outline" className="bg-success/10 text-success border-0 text-xs">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +12%
              </Badge>
            </div>
            <p className="text-2xl font-bold font-serif text-foreground">{overviewStats.activelearners}</p>
            <p className="text-xs text-muted-foreground">Peserta Aktif</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              <Badge variant="outline" className="bg-success/10 text-success border-0 text-xs">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +8%
              </Badge>
            </div>
            <p className="text-2xl font-bold font-serif text-foreground">{overviewStats.completedCourses}</p>
            <p className="text-xs text-muted-foreground">Pelatihan Selesai</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-5 h-5 text-accent" />
              <Badge variant="outline" className="bg-success/10 text-success border-0 text-xs">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +15%
              </Badge>
            </div>
            <p className="text-2xl font-bold font-serif text-foreground">{overviewStats.totalLearningHours.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Jam Belajar</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-success" />
              <Badge variant="outline" className="bg-success/10 text-success border-0 text-xs">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +10%
              </Badge>
            </div>
            <p className="text-2xl font-bold font-serif text-foreground">{overviewStats.certificatesIssued}</p>
            <p className="text-xs text-muted-foreground">Sertifikat Terbit</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold font-serif text-foreground">{overviewStats.mandatoryCompliance}%</p>
            <p className="text-xs text-muted-foreground">Kepatuhan Wajib</p>
          </CardContent>
        </Card>
        
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Percent className="w-5 h-5 text-secondary" />
            </div>
            <p className="text-2xl font-bold font-serif text-foreground">78%</p>
            <p className="text-xs text-muted-foreground">Tingkat Partisipasi</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="division">Per Divisi</TabsTrigger>
          <TabsTrigger value="mandatory">Pelatihan Wajib</TabsTrigger>
          <TabsTrigger value="performers">Performa Peserta</TabsTrigger>
          <TabsTrigger value="expiry">Sertifikat Kadaluarsa</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Monthly Trends Chart */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-base">Tren Pembelajaran Bulanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="learners" 
                        stroke="#2A438A"
                        strokeWidth={2}
                        name="Peserta Aktif"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="completions" 
                        stroke="#059669" 
                        strokeWidth={2}
                        name="Penyelesaian"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Course Completion Distribution */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-base">Distribusi Status Pelatihan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={courseCompletionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {courseCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {courseCompletionData.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-medium ml-auto">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Training Type Distribution */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-base">Distribusi Berdasarkan Metode Pelatihan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trainingTypeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {trainingTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Division Tab */}
        <TabsContent value="division" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Performa Per Divisi</CardTitle>
              <CardDescription>
                Ringkasan partisipasi dan penyelesaian pelatihan berdasarkan divisi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Divisi</TableHead>
                    <TableHead className="text-center">Karyawan</TableHead>
                    <TableHead className="text-center">Partisipasi</TableHead>
                    <TableHead className="text-center">Penyelesaian</TableHead>
                    <TableHead className="text-center">Jam Belajar</TableHead>
                    <TableHead className="text-center">Kepatuhan Wajib</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {divisionStats.map((division) => (
                    <TableRow key={division.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          {division.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{division.employees}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Progress value={division.participation} className="w-16 h-2" />
                          <span className="text-sm">{division.participation}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Progress value={division.completion} className="w-16 h-2" />
                          <span className="text-sm">{division.completion}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{division.hours}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            division.compliance >= 90 
                              ? "bg-success/10 text-success border-success/30"
                              : division.compliance >= 80
                              ? "bg-accent/10 text-accent border-accent/30"
                              : "bg-destructive/10 text-destructive border-destructive/30"
                          )}
                        >
                          {division.compliance}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Division Bar Chart */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-base">Perbandingan Jam Belajar Per Divisi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={divisionStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#2A438A" radius={[4, 4, 0, 0]} name="Jam Belajar" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Mandatory Training Tab */}
        <TabsContent value="mandatory" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Status Pelatihan Wajib</CardTitle>
              <CardDescription>
                Tingkat penyelesaian pelatihan wajib untuk seluruh karyawan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mandatoryTrainingStatus.map((training) => (
                  <div key={training.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{training.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {training.completed} / {training.total}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "rounded-full px-2 py-1 text-xs font-medium",
                            training.percentage >= 90 
                              ? "bg-success/10 text-success border-success/30"
                              : training.percentage >= 80
                              ? "bg-accent/10 text-accent border-accent/30"
                              : "bg-destructive/10 text-destructive border-destructive/30"
                          )}
                        >
                          {training.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={training.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Performers Tab */}
        <TabsContent value="performers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Top Performers */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <CardTitle className="font-serif">Top Performers</CardTitle>
                </div>
                <CardDescription>
                  Karyawan dengan performa pembelajaran terbaik
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Divisi</TableHead>
                      <TableHead className="text-right">Jam</TableHead>
                      <TableHead className="text-right">Sertifikat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformers.map((performer) => (
                      <TableRow key={performer.rank}>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center p-0",
                            performer.rank === 1 ? "bg-accent/10 text-accent border-accent" :
                            performer.rank === 2 ? "bg-gray-200 text-gray-600 border-gray-300" :
                            performer.rank === 3 ? "bg-amber-100 text-amber-700 border-amber-300" :
                            "bg-muted text-muted-foreground"
                          )}>
                            {performer.rank}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{performer.name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{performer.division}</TableCell>
                        <TableCell className="text-right">{performer.hours}</TableCell>
                        <TableCell className="text-right">{performer.certificates}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Bottom Performers */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-destructive" />
                  <CardTitle className="font-serif">Perlu Perhatian</CardTitle>
                </div>
                <CardDescription>
                  Karyawan dengan pelatihan tertunda atau overdue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Divisi</TableHead>
                      <TableHead className="text-right">Jam</TableHead>
                      <TableHead className="text-right">Overdue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bottomPerformers.map((performer) => (
                      <TableRow key={performer.rank}>
                        <TableCell>
                          <Badge variant="outline" className="w-6 h-6 rounded-full flex items-center justify-center p-0 bg-destructive/10 text-destructive border-destructive/30">
                            {performer.rank}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{performer.name}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{performer.division}</TableCell>
                        <TableCell className="text-right">{performer.hours}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                            {performer.overdue}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Certificate Expiry Tab */}
        <TabsContent value="expiry" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificateExpiry.map((period) => (
              <Card 
                key={period.period}
                className={cn(
                  "rounded-lg border shadow-sm",
                  period.period === "30 Hari" 
                    ? "border-destructive/50 bg-destructive/5" 
                    : period.period === "60 Hari"
                    ? "border-accent/50 bg-accent/5"
                    : "border-gray-100"
                )}
              >
                <CardHeader>
                  <CardTitle className="font-serif flex items-center justify-between">
                    <span>{period.period}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded-full px-3 py-1",
                        period.period === "30 Hari" 
                          ? "bg-destructive/10 text-destructive border-destructive/30" 
                          : period.period === "60 Hari"
                          ? "bg-accent/10 text-accent border-accent/30"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {period.count} sertifikat
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Sertifikat yang akan kadaluarsa:</p>
                  <div className="space-y-2">
                    {period.certificates.map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className={cn(
                          "w-4 h-4",
                          period.period === "30 Hari" 
                            ? "text-destructive" 
                            : period.period === "60 Hari"
                            ? "text-accent"
                            : "text-muted-foreground"
                        )} />
                        <span>{cert}</span>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground mt-2">
                      + {period.count - period.certificates.length} sertifikat lainnya
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Daftar Lengkap Sertifikat Akan Kadaluarsa</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Karyawan</TableHead>
                    <TableHead>Sertifikat</TableHead>
                    <TableHead>Divisi</TableHead>
                    <TableHead>Tanggal Kadaluarsa</TableHead>
                    <TableHead>Sisa Hari</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Ahmad Wijaya</TableCell>
                    <TableCell>AWS Cloud Practitioner</TableCell>
                    <TableCell>IT Operations</TableCell>
                    <TableCell>15 Feb 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                        25 hari
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Kirim Pengingat
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Siti Aminah</TableCell>
                    <TableCell>ISO 9001 Lead Auditor</TableCell>
                    <TableCell>Finance</TableCell>
                    <TableCell>28 Feb 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                        38 hari
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Kirim Pengingat
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Budi Santoso</TableCell>
                    <TableCell>PMP</TableCell>
                    <TableCell>IT Operations</TableCell>
                    <TableCell>15 Mar 2024</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                        53 hari
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Kirim Pengingat
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
