"use client"

import { useState } from "react"
import { 
  FileText,
  Download,
  Filter,
  Calendar,
  Clock,
  Users,
  Building2,
  Briefcase,
  Search,
  ChevronDown,
  CheckCircle2,
  BarChart3,
  Timer,
  AlertCircle,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { downloadCsv } from "@/lib/client-actions"
import { toast } from "sonner"
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
  Cell
} from "recharts"

// Learning Hours Transcript Data
interface LearningHoursRecord {
  id: string
  employeeId: string
  employeeName: string
  division: string
  jobFamily: string
  courseName: string
  trainingType: "e_learning" | "in_house" | "public_online" | "public_offline"
  hours: number
  completedAt: string
  certificateId?: string
}

const learningHoursData: LearningHoursRecord[] = [
  {
    id: "LH001",
    employeeId: "USR001",
    employeeName: "Budi Santoso",
    division: "IT Operations",
    jobFamily: "IT Operations",
    courseName: "Pengenalan K3",
    trainingType: "e_learning",
    hours: 2,
    completedAt: "2024-01-10",
    certificateId: "CERT001"
  },
  {
    id: "LH002",
    employeeId: "USR001",
    employeeName: "Budi Santoso",
    division: "IT Operations",
    jobFamily: "IT Operations",
    courseName: "AWS Cloud Practitioner",
    trainingType: "public_online",
    hours: 16,
    completedAt: "2023-09-20",
    certificateId: "CERT003"
  },
  {
    id: "LH003",
    employeeId: "USR001",
    employeeName: "Budi Santoso",
    division: "IT Operations",
    jobFamily: "IT Operations",
    courseName: "Kepemimpinan Efektif",
    trainingType: "in_house",
    hours: 4,
    completedAt: "2023-08-30",
    certificateId: "CERT008"
  },
  {
    id: "LH004",
    employeeId: "USR002",
    employeeName: "Dewi Lestari",
    division: "HR",
    jobFamily: "HR Management",
    courseName: "Talent Management",
    trainingType: "public_offline",
    hours: 8,
    completedAt: "2024-01-05"
  },
  {
    id: "LH005",
    employeeId: "USR003",
    employeeName: "Ahmad Wijaya",
    division: "Legal",
    jobFamily: "Legal",
    courseName: "Contract Law Update",
    trainingType: "public_online",
    hours: 6,
    completedAt: "2024-01-12"
  },
  {
    id: "LH006",
    employeeId: "USR004",
    employeeName: "Siti Aminah",
    division: "Finance",
    jobFamily: "Finance",
    courseName: "Financial Reporting",
    trainingType: "e_learning",
    hours: 3,
    completedAt: "2024-01-08"
  },
]

// Approval Workflow Analytics
interface ApprovalMetric {
  level: string
  levelName: string
  avgDays: number
  totalRequests: number
  approved: number
  rejected: number
  pending: number
  bottleneckPercentage: number
}

const approvalMetrics: ApprovalMetric[] = [
  {
    level: "L1",
    levelName: "Atasan Langsung",
    avgDays: 1.5,
    totalRequests: 245,
    approved: 198,
    rejected: 32,
    pending: 15,
    bottleneckPercentage: 12
  },
  {
    level: "L2",
    levelName: "Kepala Divisi",
    avgDays: 2.8,
    totalRequests: 198,
    approved: 156,
    rejected: 28,
    pending: 14,
    bottleneckPercentage: 28
  },
  {
    level: "L3",
    levelName: "Admin SDM",
    avgDays: 1.2,
    totalRequests: 156,
    approved: 145,
    rejected: 8,
    pending: 3,
    bottleneckPercentage: 8
  },
]

const approverPerformance = [
  { name: "Hendra Kusuma", level: "L1", requests: 45, avgDays: 1.2, onTime: 42 },
  { name: "Rina Wulandari", level: "L1", requests: 38, avgDays: 1.8, onTime: 32 },
  { name: "Bambang Suryadi", level: "L2", requests: 52, avgDays: 2.5, onTime: 45 },
  { name: "Siti Rahayu", level: "L3", requests: 156, avgDays: 1.2, onTime: 150 },
]

const monthlyApprovalTrend = [
  { month: "Jan", submitted: 42, approved: 38, avgDays: 4.2 },
  { month: "Feb", submitted: 38, approved: 35, avgDays: 4.5 },
  { month: "Mar", submitted: 45, approved: 40, avgDays: 4.0 },
  { month: "Apr", submitted: 52, approved: 48, avgDays: 3.8 },
  { month: "Mei", submitted: 48, approved: 45, avgDays: 4.1 },
  { month: "Jun", submitted: 56, approved: 52, avgDays: 3.5 },
]

// Division hours summary
const divisionHoursSummary = [
  { division: "IT Operations", total: 756, employees: 85, avgPerEmployee: 8.9 },
  { division: "Finance", total: 498, employees: 62, avgPerEmployee: 8.0 },
  { division: "Operations", total: 1245, employees: 156, avgPerEmployee: 8.0 },
  { division: "Marketing", total: 378, employees: 45, avgPerEmployee: 8.4 },
  { division: "HR", total: 312, employees: 28, avgPerEmployee: 11.1 },
  { division: "Legal", total: 165, employees: 18, avgPerEmployee: 9.2 },
  { division: "Procurement", total: 285, employees: 35, avgPerEmployee: 8.1 },
]

const trainingTypeLabels: Record<string, string> = {
  e_learning: "E-Learning",
  in_house: "In-House",
  public_online: "Public Online",
  public_offline: "Public Offline"
}

export default function LaporanPage() {
  const { user } = useAuth()
  const [selectedPeriod, setSelectedPeriod] = useState("2024")
  const [selectedDivision, setSelectedDivision] = useState("all")
  const [selectedJobFamily, setSelectedJobFamily] = useState("all")
  const [selectedTrainingType, setSelectedTrainingType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null)
  
  const isAdmin = user?.role === 'admin_sdm'
  
  // Filter learning hours data
  const filteredLearningHours = learningHoursData.filter(record => {
    const matchesDivision = selectedDivision === "all" || record.division === selectedDivision
    const matchesJobFamily = selectedJobFamily === "all" || record.jobFamily === selectedJobFamily
    const matchesType = selectedTrainingType === "all" || record.trainingType === selectedTrainingType
    const matchesSearch = record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDivision && matchesJobFamily && matchesType && matchesSearch
  })
  
  // Group by employee
  const employeeHoursSummary = filteredLearningHours.reduce((acc, record) => {
    const key = record.employeeId
    if (!acc[key]) {
      acc[key] = {
        employeeId: record.employeeId,
        employeeName: record.employeeName,
        division: record.division,
        jobFamily: record.jobFamily,
        totalHours: 0,
        courses: [],
      }
    }
    acc[key].totalHours += record.hours
    acc[key].courses.push(record)
    return acc
  }, {} as Record<string, { employeeId: string; employeeName: string; division: string; jobFamily: string; totalHours: number; courses: LearningHoursRecord[] }>)
  
  const totalHours = filteredLearningHours.reduce((sum, r) => sum + r.hours, 0)
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Laporan & Analitik</h1>
          <p className="text-muted-foreground mt-1">
            Transkrip jam belajar dan analitik alur persetujuan
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">Tahun 2024</SelectItem>
              <SelectItem value="2023">Tahun 2023</SelectItem>
              <SelectItem value="q1-2024">Q1 2024</SelectItem>
              <SelectItem value="q4-2023">Q4 2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="transcript" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transcript">Transkrip Jam Belajar</TabsTrigger>
          <TabsTrigger value="approval">Analitik Persetujuan</TabsTrigger>
        </TabsList>
        
        {/* Learning Hours Transcript Tab */}
        <TabsContent value="transcript" className="space-y-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-serif text-foreground">{totalHours}</p>
                    <p className="text-sm text-muted-foreground">Total Jam Belajar</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-serif text-foreground">
                      {Object.keys(employeeHoursSummary).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Karyawan Tercatat</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-serif text-foreground">
                      {filteredLearningHours.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Pelatihan Selesai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-serif text-foreground">
                      {(totalHours / Math.max(Object.keys(employeeHoursSummary).length, 1)).toFixed(1)}
                    </p>
                    <p className="text-sm text-muted-foreground">Rata-rata/Karyawan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Filters */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama karyawan atau pelatihan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedDivision} onValueChange={setSelectedDivision}>
                  <SelectTrigger className="w-[160px]">
                    <Building2 className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Divisi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Divisi</SelectItem>
                    <SelectItem value="IT Operations">IT Operations</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedJobFamily} onValueChange={setSelectedJobFamily}>
                  <SelectTrigger className="w-[160px]">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Job Family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Job Family</SelectItem>
                    <SelectItem value="IT Operations">IT Operations</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="HR Management">HR Management</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedTrainingType} onValueChange={setSelectedTrainingType}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="e_learning">E-Learning</SelectItem>
                    <SelectItem value="in_house">In-House</SelectItem>
                    <SelectItem value="public_online">Public Online</SelectItem>
                    <SelectItem value="public_offline">Public Offline</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => { downloadCsv("transkrip-jam-belajar", filteredLearningHours); toast.success("Transkrip jam belajar diunduh") }}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Division Summary Chart */}
          {isAdmin && (
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-base">Jam Belajar Per Divisi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={divisionHoursSummary}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="division" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white p-3 rounded-lg shadow-lg border">
                                <p className="font-medium">{data.division}</p>
                                <p className="text-sm text-muted-foreground">Total: {data.total} jam</p>
                                <p className="text-sm text-muted-foreground">Karyawan: {data.employees}</p>
                                <p className="text-sm text-muted-foreground">Rata-rata: {data.avgPerEmployee} jam</p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Bar dataKey="total" fill="#2A438A" radius={[4, 4, 0, 0]} name="Total Jam" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Employee Transcript Table */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Transkrip Jam Belajar Individual</CardTitle>
              <CardDescription>
                Klik pada baris karyawan untuk melihat detail pelatihan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.values(employeeHoursSummary).map((employee) => (
                  <Collapsible 
                    key={employee.employeeId}
                    open={expandedEmployee === employee.employeeId}
                    onOpenChange={(open) => setExpandedEmployee(open ? employee.employeeId : null)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{employee.employeeName}</p>
                            <p className="text-sm text-muted-foreground">
                              {employee.division} • {employee.jobFamily}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-lg font-bold font-serif text-secondary">{employee.totalHours} jam</p>
                            <p className="text-xs text-muted-foreground">{employee.courses.length} pelatihan</p>
                          </div>
                          <ChevronDown className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform",
                            expandedEmployee === employee.employeeId && "rotate-180"
                          )} />
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-14 mt-2 mb-4 border-l-2 border-border pl-4 space-y-2">
                        {employee.courses.map((course) => (
                          <div 
                            key={course.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                          >
                            <div>
                              <p className="font-medium text-sm">{course.courseName}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {trainingTypeLabels[course.trainingType]}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(course.completedAt).toLocaleDateString('id-ID')}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-secondary">{course.hours} jam</span>
                              {course.certificateId && (
                                <CheckCircle2 className="w-4 h-4 text-success" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Approval Analytics Tab */}
        <TabsContent value="approval" className="space-y-4">
          {/* Approval Funnel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {approvalMetrics.map((metric) => (
              <Card 
                key={metric.level}
                className={cn(
                  "rounded-lg border shadow-sm",
                  metric.bottleneckPercentage > 20 && "border-accent"
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-base">
                      {metric.level} - {metric.levelName}
                    </CardTitle>
                    {metric.bottleneckPercentage > 20 && (
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Bottleneck
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold font-serif text-foreground">{metric.avgDays}</p>
                      <p className="text-sm text-muted-foreground">Rata-rata hari</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <p className="text-lg font-bold text-success">{metric.approved}</p>
                      <p className="text-xs text-muted-foreground">Disetujui</p>
                    </div>
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <p className="text-lg font-bold text-destructive">{metric.rejected}</p>
                      <p className="text-xs text-muted-foreground">Ditolak</p>
                    </div>
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <p className="text-lg font-bold text-accent">{metric.pending}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Monthly Approval Trend */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-base">Tren Pengajuan & Persetujuan Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyApprovalTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="submitted" fill="#233873" radius={[4, 4, 0, 0]} name="Diajukan" />
                    <Bar dataKey="approved" fill="#059669" radius={[4, 4, 0, 0]} name="Disetujui" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Approver Performance */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Performa Approver</CardTitle>
              <CardDescription>
                Metrik waktu respons dan tingkat penyelesaian per approver
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Approver</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead className="text-center">Total Permintaan</TableHead>
                    <TableHead className="text-center">Rata-rata Hari</TableHead>
                    <TableHead className="text-center">Tepat Waktu</TableHead>
                    <TableHead className="text-center">Persentase</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approverPerformance.map((approver, idx) => {
                    const percentage = Math.round((approver.onTime / approver.requests) * 100)
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{approver.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{approver.level}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{approver.requests}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "font-medium",
                            approver.avgDays <= 2 ? "text-success" : 
                            approver.avgDays <= 3 ? "text-accent" : "text-destructive"
                          )}>
                            {approver.avgDays} hari
                          </span>
                        </TableCell>
                        <TableCell className="text-center">{approver.onTime}</TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "rounded-full px-2 py-1 text-xs font-medium",
                              percentage >= 90 
                                ? "bg-success/10 text-success border-success/30"
                                : percentage >= 80
                                ? "bg-accent/10 text-accent border-accent/30"
                                : "bg-destructive/10 text-destructive border-destructive/30"
                            )}
                          >
                            {percentage}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Time to Approve Analysis */}
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Analisis Bottleneck</CardTitle>
              <CardDescription>
                Identifikasi tahap persetujuan yang membutuhkan waktu paling lama
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalMetrics.map((metric) => (
                  <div key={metric.level} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{metric.levelName}</span>
                      <span className="text-sm text-muted-foreground">
                        {metric.bottleneckPercentage}% keterlambatan
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          metric.bottleneckPercentage > 20 ? "bg-accent" :
                          metric.bottleneckPercentage > 10 ? "bg-secondary" : "bg-success"
                        )}
                        style={{ width: `${Math.min(metric.bottleneckPercentage * 3, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Rata-rata waktu proses: {metric.avgDays} hari | 
                      Pending saat ini: {metric.pending} permintaan
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">Rekomendasi</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Level 2 (Kepala Divisi) menunjukkan bottleneck tertinggi dengan 28% keterlambatan. 
                      Pertimbangkan untuk menambah delegasi persetujuan atau menyederhanakan proses review.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
