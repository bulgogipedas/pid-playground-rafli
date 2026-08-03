"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Users,
  Target,
  ChevronRight,
  FileSpreadsheet,
  FileText,
  Building2,
  Briefcase,
  BarChart3,
  PieChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  dummyCompetencyGaps, 
  divisionGapSummaries, 
  jobFamilyGapSummaries,
  mandatoryTrainingAssignments,
  priorityLabels,
  categoryLabels,
} from "@/lib/data/tna"
import { divisions, jobFamilies } from "@/lib/data/users"

export default function TNAPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [divisionFilter, setDivisionFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isSyncing, setIsSyncing] = useState(false)

  // Stats
  const totalGaps = dummyCompetencyGaps.length
  const criticalGaps = dummyCompetencyGaps.filter(g => g.priority === "tinggi").length
  const employeesWithGap = new Set(dummyCompetencyGaps.map(g => g.userId)).size

  // Filter gaps
  const filteredGaps = dummyCompetencyGaps.filter(gap => {
    const matchesSearch = 
      gap.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gap.competency.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDivision = divisionFilter === "all" || gap.division === divisionFilter
    const matchesPriority = priorityFilter === "all" || gap.priority === priorityFilter
    return matchesSearch && matchesDivision && matchesPriority
  })

  const handleSync = async () => {
    setIsSyncing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSyncing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#102F49]">
            Training Needs Analysis (TNA)
          </h1>
          <p className="text-muted-foreground">
            Analisis kebutuhan pelatihan berdasarkan gap kompetensi dari HCIS
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={isSyncing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Sinkronisasi...' : 'Sinkronisasi HCIS'}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export Excel
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Gap Kompetensi
            </CardTitle>
            <Target className="w-4 h-4 text-[#0879B5]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#102F49]">{totalGaps}</div>
            <p className="text-xs text-muted-foreground">Teridentifikasi dari HCIS</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gap Prioritas Tinggi
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#DC2626]">{criticalGaps}</div>
            <p className="text-xs text-muted-foreground">Perlu penanganan segera</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Karyawan dengan Gap
            </CardTitle>
            <Users className="w-4 h-4 text-[#D97706]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#D97706]">{employeesWithGap}</div>
            <p className="text-xs text-muted-foreground">Membutuhkan pelatihan</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pelatihan Wajib Aktif
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-[#059669]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#059669]">
              {mandatoryTrainingAssignments.length}
            </div>
            <p className="text-xs text-muted-foreground">Program berjalan</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Ringkasan
          </TabsTrigger>
          <TabsTrigger value="division" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Per Divisi
          </TabsTrigger>
          <TabsTrigger value="jobfamily" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Per Job Family
          </TabsTrigger>
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Per Individu
          </TabsTrigger>
          <TabsTrigger value="mandatory" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Pelatihan Wajib
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Division Summary */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-[#102F49]">
                  Gap per Divisi
                </CardTitle>
                <CardDescription>
                  Distribusi gap kompetensi berdasarkan divisi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {divisionGapSummaries.map((div) => (
                    <div key={div.division} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{div.division}</span>
                        <span className="text-sm text-muted-foreground">
                          {div.employeesWithGap} / {div.totalEmployees} karyawan
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(div.employeesWithGap / div.totalEmployees) * 100} 
                          className="h-2 flex-1"
                        />
                        <Badge 
                          variant="outline" 
                          className={
                            div.criticalGaps > 10 
                              ? 'text-[#DC2626] border-[#DC2626]' 
                              : div.criticalGaps > 5 
                              ? 'text-[#D97706] border-[#D97706]'
                              : 'text-[#059669] border-[#059669]'
                          }
                        >
                          {div.criticalGaps} kritis
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Competency Gaps */}
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-[#102F49]">
                  Top Gap Kompetensi
                </CardTitle>
                <CardDescription>
                  Kompetensi dengan gap tertinggi secara organisasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { competency: "Cloud Computing", avgGap: 2.1, affected: 27, category: "technical" },
                    { competency: "Digital Marketing", avgGap: 2.0, affected: 12, category: "hard_skill" },
                    { competency: "Lean Management", avgGap: 1.9, affected: 40, category: "hard_skill" },
                    { competency: "Manajemen Proyek TI", avgGap: 1.8, affected: 18, category: "hard_skill" },
                    { competency: "Kepatuhan Regulasi", avgGap: 1.8, affected: 12, category: "technical" },
                  ].map((item, index) => (
                    <div key={item.competency} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#102F49] text-white flex items-center justify-center text-sm font-medium shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{item.competency}</span>
                          <Badge variant="outline" className="text-xs">
                            {categoryLabels[item.category]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>Gap rata-rata: {item.avgGap}</span>
                          <span>•</span>
                          <span>{item.affected} karyawan</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mandatory Training Progress */}
            <Card className="rounded-lg border border-gray-100 shadow-sm lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-serif text-[#102F49]">
                  Progres Pelatihan Wajib
                </CardTitle>
                <CardDescription>
                  Status penyelesaian pelatihan wajib yang sedang berjalan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mandatoryTrainingAssignments.map((training) => {
                    const completionRate = (training.completed / training.totalAssigned) * 100
                    return (
                      <div key={training.id} className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-[#102F49]">
                              {training.trainingName}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Deadline: {new Date(training.deadline).toLocaleDateString('id-ID', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                          <Badge 
                            className={
                              completionRate >= 80 
                                ? 'bg-[#059669]/10 text-[#059669]' 
                                : completionRate >= 50 
                                ? 'bg-[#D97706]/10 text-[#D97706]'
                                : 'bg-[#DC2626]/10 text-[#DC2626]'
                            }
                          >
                            {completionRate.toFixed(0)}% Selesai
                          </Badge>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#059669]" />
                            Selesai: {training.completed}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                            Berjalan: {training.inProgress}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-gray-300" />
                            Belum Mulai: {training.notStarted}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Division Tab */}
        <TabsContent value="division" className="mt-6">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Divisi</TableHead>
                    <TableHead className="text-center">Total Karyawan</TableHead>
                    <TableHead className="text-center">Karyawan dengan Gap</TableHead>
                    <TableHead className="text-center">Gap Rata-rata</TableHead>
                    <TableHead className="text-center">Gap Kritis</TableHead>
                    <TableHead>Top Kompetensi Gap</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {divisionGapSummaries.map((div) => (
                    <TableRow key={div.division}>
                      <TableCell className="font-medium text-[#102F49]">
                        {div.division}
                      </TableCell>
                      <TableCell className="text-center">{div.totalEmployees}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">{div.employeesWithGap}</span>
                        <span className="text-muted-foreground text-xs ml-1">
                          ({((div.employeesWithGap / div.totalEmployees) * 100).toFixed(0)}%)
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline"
                          className={
                            div.averageGap >= 1.8 
                              ? 'text-[#DC2626] border-[#DC2626]' 
                              : div.averageGap >= 1.4 
                              ? 'text-[#D97706] border-[#D97706]'
                              : 'text-[#059669] border-[#059669]'
                          }
                        >
                          {div.averageGap.toFixed(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-[#DC2626]/10 text-[#DC2626]">
                          {div.criticalGaps}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {div.competencies.slice(0, 2).map(comp => (
                            <Badge key={comp.competency} variant="outline" className="text-xs">
                              {comp.competency}
                            </Badge>
                          ))}
                          {div.competencies.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{div.competencies.length - 2} lainnya
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Family Tab */}
        <TabsContent value="jobfamily" className="mt-6">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Family</TableHead>
                    <TableHead className="text-center">Total Karyawan</TableHead>
                    <TableHead className="text-center">Karyawan dengan Gap</TableHead>
                    <TableHead className="text-center">Gap Rata-rata</TableHead>
                    <TableHead>Top Gap Kompetensi</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobFamilyGapSummaries.map((jf) => (
                    <TableRow key={jf.jobFamily}>
                      <TableCell className="font-medium text-[#102F49]">
                        {jf.jobFamily}
                      </TableCell>
                      <TableCell className="text-center">{jf.totalEmployees}</TableCell>
                      <TableCell className="text-center">
                        <span className="font-medium">{jf.employeesWithGap}</span>
                        <span className="text-muted-foreground text-xs ml-1">
                          ({((jf.employeesWithGap / jf.totalEmployees) * 100).toFixed(0)}%)
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline"
                          className={
                            jf.averageGap >= 1.8 
                              ? 'text-[#DC2626] border-[#DC2626]' 
                              : jf.averageGap >= 1.4 
                              ? 'text-[#D97706] border-[#D97706]'
                              : 'text-[#059669] border-[#059669]'
                          }
                        >
                          {jf.averageGap.toFixed(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {jf.topGaps.map(gap => (
                            <Badge key={gap} variant="outline" className="text-xs">
                              {gap}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual Tab */}
        <TabsContent value="individual" className="mt-6">
          <Card className="rounded-lg border border-gray-100 shadow-sm mb-4">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama atau kompetensi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select value={divisionFilter} onValueChange={setDivisionFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Semua Divisi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Divisi</SelectItem>
                      {divisions.map(div => (
                        <SelectItem key={div} value={div}>{div}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Semua Prioritas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Prioritas</SelectItem>
                      <SelectItem value="tinggi">Tinggi</SelectItem>
                      <SelectItem value="sedang">Sedang</SelectItem>
                      <SelectItem value="rendah">Rendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Karyawan</TableHead>
                    <TableHead>Kompetensi</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-center">Level Saat Ini</TableHead>
                    <TableHead className="text-center">Level Dibutuhkan</TableHead>
                    <TableHead className="text-center">Gap</TableHead>
                    <TableHead>Prioritas</TableHead>
                    <TableHead>Rekomendasi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGaps.map((gap) => (
                    <TableRow key={gap.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-[#102F49]">{gap.userName}</div>
                          <div className="text-xs text-muted-foreground">{gap.division}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{gap.competency}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {categoryLabels[gap.competencyCategory]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{gap.currentLevel}</TableCell>
                      <TableCell className="text-center">{gap.requiredLevel}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          className={
                            gap.gap >= 2 
                              ? 'bg-[#DC2626] text-white' 
                              : gap.gap >= 1 
                              ? 'bg-[#D97706] text-white'
                              : 'bg-[#059669] text-white'
                          }
                        >
                          {gap.gap}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            gap.priority === 'tinggi' 
                              ? 'bg-[#DC2626]/10 text-[#DC2626]' 
                              : gap.priority === 'sedang' 
                              ? 'bg-[#D97706]/10 text-[#D97706]'
                              : 'bg-[#059669]/10 text-[#059669]'
                          }
                        >
                          {priorityLabels[gap.priority]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {gap.recommendedTraining.slice(0, 1).map(training => (
                            <Badge key={training} variant="outline" className="text-xs">
                              {training}
                            </Badge>
                          ))}
                          {gap.recommendedTraining.length > 1 && (
                            <Badge variant="outline" className="text-xs">
                              +{gap.recommendedTraining.length - 1}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mandatory Training Tab */}
        <TabsContent value="mandatory" className="mt-6">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Pelatihan</TableHead>
                    <TableHead>Job Families</TableHead>
                    <TableHead className="text-center">Total Peserta</TableHead>
                    <TableHead className="text-center">Selesai</TableHead>
                    <TableHead className="text-center">Berjalan</TableHead>
                    <TableHead className="text-center">Belum Mulai</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Progres</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mandatoryTrainingAssignments.map((training) => {
                    const completionRate = (training.completed / training.totalAssigned) * 100
                    return (
                      <TableRow key={training.id}>
                        <TableCell>
                          <div className="font-medium text-[#102F49] max-w-[250px]">
                            {training.trainingName}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Dibuat oleh: {training.createdBy}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {training.jobFamilies.slice(0, 2).map(jf => (
                              <Badge key={jf} variant="outline" className="text-xs">
                                {jf}
                              </Badge>
                            ))}
                            {training.jobFamilies.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{training.jobFamilies.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {training.totalAssigned}
                        </TableCell>
                        <TableCell className="text-center text-[#059669] font-medium">
                          {training.completed}
                        </TableCell>
                        <TableCell className="text-center text-[#D97706] font-medium">
                          {training.inProgress}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {training.notStarted}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {new Date(training.deadline).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 min-w-[100px]">
                            <Progress value={completionRate} className="h-2 flex-1" />
                            <span className="text-xs font-medium">
                              {completionRate.toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
