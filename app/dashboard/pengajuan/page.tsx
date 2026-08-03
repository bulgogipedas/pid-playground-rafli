"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import {
  dummyTrainingRequests,
  dummyNotifications,
  statusLabels,
  statusColors,
  skillTypeLabels,
  trainingTypeLabels,
  levelLabels,
  formatCurrency,
  formatDate,
  formatDateTime,
  type TrainingRequest,
  type RequestStatus,
  type SkillType,
  type TrainingType,
} from "@/lib/data/training-requests"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Search,
  Filter,
  FileText,
  Calendar,
  Building2,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  ArrowRight,
  Eye,
  Edit,
  Trash2,
  Upload,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Request form component
function RequestForm({ 
  onSubmit, 
  onClose,
  initialData 
}: { 
  onSubmit: (data: Partial<TrainingRequest>) => void
  onClose: () => void
  initialData?: TrainingRequest 
}) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    trainingName: initialData?.trainingName || "",
    trainingDescription: initialData?.trainingDescription || "",
    vendor: initialData?.vendor || "",
    skillType: initialData?.skillType || "hard_skill" as SkillType,
    trainingType: initialData?.trainingType || "external_online" as TrainingType,
    estimatedCost: initialData?.estimatedCost || 0,
    rationale: initialData?.rationale || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    learningHours: initialData?.learningHours || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      employeeId: user?.id,
      employeeName: user?.name,
      employeeNik: user?.nip,
      division: user?.division,
      jobFamily: user?.jobFamily,
      currency: "IDR",
      status: "pending_l1",
      currentLevel: "atasan_langsung",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="trainingName">Nama Pelatihan *</Label>
          <Input
            id="trainingName"
            value={formData.trainingName}
            onChange={(e) => setFormData({ ...formData, trainingName: e.target.value })}
            placeholder="Contoh: AWS Solutions Architect"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor / Penyelenggara *</Label>
          <Input
            id="vendor"
            value={formData.vendor}
            onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
            placeholder="Contoh: Amazon Web Services"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="trainingDescription">Deskripsi Pelatihan *</Label>
        <Textarea
          id="trainingDescription"
          value={formData.trainingDescription}
          onChange={(e) => setFormData({ ...formData, trainingDescription: e.target.value })}
          placeholder="Jelaskan isi dan tujuan pelatihan..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="skillType">Jenis Kompetensi *</Label>
          <Select
            value={formData.skillType}
            onValueChange={(value: SkillType) => setFormData({ ...formData, skillType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis kompetensi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hard_skill">Hard Skill</SelectItem>
              <SelectItem value="soft_skill">Soft Skill</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="trainingType">Jenis Pelatihan *</Label>
          <Select
            value={formData.trainingType}
            onValueChange={(value: TrainingType) => setFormData({ ...formData, trainingType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis pelatihan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="internal">Internal</SelectItem>
              <SelectItem value="external_online">Eksternal Online</SelectItem>
              <SelectItem value="external_offline">Eksternal Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Tanggal Mulai *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Tanggal Selesai *</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="learningHours">Jam Pembelajaran *</Label>
          <Input
            id="learningHours"
            type="number"
            min="1"
            value={formData.learningHours}
            onChange={(e) => setFormData({ ...formData, learningHours: parseInt(e.target.value) })}
            placeholder="24"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimatedCost">Estimasi Biaya (IDR) *</Label>
        <Input
          id="estimatedCost"
          type="number"
          min="0"
          step="100000"
          value={formData.estimatedCost}
          onChange={(e) => setFormData({ ...formData, estimatedCost: parseInt(e.target.value) })}
          placeholder="15000000"
          required
        />
        <p className="text-xs text-muted-foreground">
          {formData.estimatedCost > 0 && formatCurrency(formData.estimatedCost)}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rationale">Alasan / Justifikasi *</Label>
        <Textarea
          id="rationale"
          value={formData.rationale}
          onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
          placeholder="Jelaskan mengapa pelatihan ini diperlukan dan bagaimana manfaatnya bagi pekerjaan Anda..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Lampiran (Opsional)</Label>
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Seret file ke sini atau klik untuk upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, DOC, DOCX (Maks. 10MB)
          </p>
          <Button type="button" variant="outline" size="sm" className="mt-3">
            Pilih File
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit">
          Ajukan Pelatihan
        </Button>
      </div>
    </form>
  )
}

// Notifications panel
function NotificationsPanel() {
  const { user } = useAuth()
  const userNotifications = dummyNotifications.filter(n => n.userId === user?.id)
  const unreadCount = userNotifications.filter(n => !n.isRead).length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Bell className="w-4 h-4 mr-2" />
          Notifikasi
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif">Notifikasi</SheetTitle>
          <SheetDescription>
            {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Tidak ada notifikasi baru"}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-3">
          {userNotifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Tidak ada notifikasi</p>
          ) : (
            userNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={cn(
                  "p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors",
                  !notif.isRead && "bg-blue-50 border-blue-200"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    notif.type === "approval" && "bg-emerald-100 text-emerald-600",
                    notif.type === "rejection" && "bg-red-100 text-red-600",
                    notif.type === "revision" && "bg-blue-100 text-blue-600",
                    notif.type === "reminder" && "bg-amber-100 text-amber-600",
                    notif.type === "info" && "bg-gray-100 text-gray-600"
                  )}>
                    {notif.type === "approval" && <CheckCircle2 className="w-4 h-4" />}
                    {notif.type === "rejection" && <XCircle className="w-4 h-4" />}
                    {notif.type === "revision" && <AlertCircle className="w-4 h-4" />}
                    {notif.type === "reminder" && <Clock className="w-4 h-4" />}
                    {notif.type === "info" && <Bell className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{notif.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{formatDateTime(notif.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function PengajuanPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [requests, setRequests] = useState<TrainingRequest[]>(() => {
    if (typeof window === "undefined") return dummyTrainingRequests
    try {
      const saved = window.localStorage.getItem("lms_pid_training_requests")
      return saved ? JSON.parse(saved) : dummyTrainingRequests
    } catch {
      return dummyTrainingRequests
    }
  })

  useEffect(() => {
    window.localStorage.setItem("lms_pid_training_requests", JSON.stringify(requests))
  }, [requests])

  // Filter requests based on user role
  const userRequests = user?.role === "admin_sdm" 
    ? requests 
    : requests.filter(r => r.employeeId === user?.id)

  // Apply filters
  const filteredRequests = userRequests.filter(r => {
    const matchesSearch = r.trainingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Group by status for tabs
  const pendingRequests = filteredRequests.filter(r => r.status.startsWith("pending"))
  const approvedRequests = filteredRequests.filter(r => r.status === "approved")
  const rejectedRequests = filteredRequests.filter(r => r.status === "rejected")
  const revisionRequests = filteredRequests.filter(r => r.status === "revision")

  const handleSubmitRequest = (data: Partial<TrainingRequest>) => {
    const newRequest: TrainingRequest = {
      id: `REQ${String(requests.length + 1).padStart(3, '0')}`,
      employeeId: user?.id || "",
      employeeName: user?.name || "",
      employeeNik: user?.nip || "",
      division: user?.division || "",
      jobFamily: user?.jobFamily || "",
      trainingName: data.trainingName || "",
      trainingDescription: data.trainingDescription || "",
      vendor: data.vendor || "",
      skillType: data.skillType || "hard_skill",
      trainingType: data.trainingType || "external_online",
      estimatedCost: data.estimatedCost || 0,
      currency: "IDR",
      rationale: data.rationale || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      duration: 0,
      learningHours: data.learningHours || 0,
      status: "pending_l1",
      currentLevel: "atasan_langsung",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      approvals: [],
      attachments: [],
    }
    setRequests([newRequest, ...requests])
    setIsFormOpen(false)
  }

  // Stats
  const stats = {
    total: userRequests.length,
    pending: userRequests.filter(r => r.status.startsWith("pending")).length,
    approved: userRequests.filter(r => r.status === "approved").length,
    rejected: userRequests.filter(r => r.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">Pengajuan Pelatihan</h1>
          <p className="text-muted-foreground">
            {user?.role === "admin_sdm" 
              ? "Kelola semua pengajuan pelatihan karyawan"
              : "Ajukan dan pantau status pengajuan pelatihan Anda"
            }
          </p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationsPanel />
          {user?.role === "peserta" && (
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajukan Pelatihan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-serif text-xl">Pengajuan Pelatihan Baru</DialogTitle>
                  <DialogDescription>
                    Lengkapi form berikut untuk mengajukan pelatihan hard skill.
                  </DialogDescription>
                </DialogHeader>
                <RequestForm 
                  onSubmit={handleSubmitRequest} 
                  onClose={() => setIsFormOpen(false)} 
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Pengajuan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Menunggu</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{stats.approved}</p>
                <p className="text-xs text-muted-foreground">Disetujui</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-xs text-muted-foreground">Ditolak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama pelatihan atau vendor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as RequestStatus | "all")}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending_l1">Menunggu L1</SelectItem>
                <SelectItem value="pending_l2">Menunggu L2</SelectItem>
                <SelectItem value="pending_l3">Menunggu L3</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
                <SelectItem value="revision">Perlu Revisi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Semua ({filteredRequests.length})</TabsTrigger>
          <TabsTrigger value="pending">Menunggu ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="approved">Disetujui ({approvedRequests.length})</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak ({rejectedRequests.length})</TabsTrigger>
          {revisionRequests.length > 0 && (
            <TabsTrigger value="revision">Perlu Revisi ({revisionRequests.length})</TabsTrigger>
          )}
        </TabsList>

        {["all", "pending", "approved", "rejected", "revision"].map((tab) => {
          const tabRequests = tab === "all" ? filteredRequests :
            tab === "pending" ? pendingRequests :
            tab === "approved" ? approvedRequests :
            tab === "rejected" ? rejectedRequests :
            revisionRequests

          return (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {tabRequests.length === 0 ? (
                <Card className="border-gray-100 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Tidak ada pengajuan</p>
                  </CardContent>
                </Card>
              ) : (
                tabRequests.map((request) => (
                  <Card key={request.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={cn("rounded-full px-2 py-1 text-xs font-medium", statusColors[request.status])}>
                              {statusLabels[request.status]}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{request.id}</span>
                          </div>
                          <h3 className="font-medium font-serif text-lg truncate">{request.trainingName}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {request.vendor}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(request.startDate)}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {formatCurrency(request.estimatedCost)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {request.learningHours} Jam
                            </span>
                          </div>
                          {user?.role === "admin_sdm" && (
                            <p className="text-sm text-muted-foreground mt-2">
                              Pengaju: <span className="font-medium">{request.employeeName}</span> - {request.division}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/dashboard/pengajuan/${request.id}`}>
                              <Eye className="mr-1 h-4 w-4" />
                              Detail
                            </Link>
                          </Button>
                          {request.status === "revision" && (
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Revisi
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
