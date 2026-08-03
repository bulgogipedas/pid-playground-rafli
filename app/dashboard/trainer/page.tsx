"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Plus,
  Search,
  MoreHorizontal,
  BookOpen,
  Star,
  Calendar,
  Mail,
  Phone,
  Building2,
  Edit,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dummy trainers data
const trainers = [
  {
    id: "TR001",
    name: "Dewi Lestari",
    email: "dewi.lestari@pelniservices.co.id",
    phone: "081234567893",
    type: "internal",
    specialization: ["Leadership", "Soft Skills", "Communication"],
    totalCourses: 8,
    totalHours: 120,
    rating: 4.8,
    status: "active",
    joinDate: "2019-08-20",
    lastActive: "2024-01-15",
  },
  {
    id: "TR002",
    name: "Agus Prasetyo",
    email: "agus.prasetyo@pelniservices.co.id",
    phone: "081234567901",
    type: "internal",
    specialization: ["Technical Training", "IT Skills", "Project Management"],
    totalCourses: 12,
    totalHours: 180,
    rating: 4.9,
    status: "active",
    joinDate: "2018-03-15",
    lastActive: "2024-01-14",
  },
  {
    id: "TR003",
    name: "PT Edukasi Digital Indonesia",
    email: "contact@edukasi-digital.co.id",
    phone: "02150123456",
    type: "external",
    specialization: ["Digital Marketing", "E-Commerce", "Data Analytics"],
    totalCourses: 5,
    totalHours: 75,
    rating: 4.6,
    status: "active",
    joinDate: "2023-01-10",
    lastActive: "2024-01-10",
  },
  {
    id: "TR004",
    name: "Dr. Bambang Hermawan",
    email: "b.hermawan@konsultan-hr.com",
    phone: "081298765432",
    type: "external",
    specialization: ["HR Management", "Organizational Development", "Talent Management"],
    totalCourses: 6,
    totalHours: 90,
    rating: 4.7,
    status: "active",
    joinDate: "2022-06-01",
    lastActive: "2024-01-12",
  },
  {
    id: "TR005",
    name: "Lembaga Sertifikasi Profesi Indonesia",
    email: "info@lspi.or.id",
    phone: "02175123456",
    type: "external",
    specialization: ["Professional Certification", "Competency Assessment"],
    totalCourses: 3,
    totalHours: 45,
    rating: 4.5,
    status: "inactive",
    joinDate: "2021-09-15",
    lastActive: "2023-12-20",
  },
  {
    id: "TR006",
    name: "Sinta Maharani",
    email: "sinta.maharani@pelniservices.co.id",
    phone: "081234567950",
    type: "internal",
    specialization: ["Customer Service", "Business Ethics", "Compliance"],
    totalCourses: 4,
    totalHours: 60,
    rating: 4.4,
    status: "active",
    joinDate: "2020-11-01",
    lastActive: "2024-01-13",
  },
]

// Pending trainer requests
const pendingRequests = [
  {
    id: "REQ001",
    name: "CV Teknologi Cerdas",
    email: "info@teknologi-cerdas.com",
    type: "external",
    specialization: ["AI & Machine Learning", "Python Programming"],
    requestDate: "2024-01-14",
    status: "pending",
  },
  {
    id: "REQ002",
    name: "Rudi Hartono",
    email: "rudi.hartono@pelniservices.co.id",
    type: "internal",
    specialization: ["Safety Training", "Risk Management"],
    requestDate: "2024-01-13",
    status: "pending",
  },
]

export default function TrainerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === "all" || trainer.type === typeFilter
    const matchesStatus = statusFilter === "all" || trainer.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const internalCount = trainers.filter(t => t.type === "internal").length
  const externalCount = trainers.filter(t => t.type === "external").length
  const activeCount = trainers.filter(t => t.status === "active").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">Kelola Trainer</h1>
          <p className="text-muted-foreground">
            Kelola trainer internal dan eksternal untuk pelatihan
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Trainer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Tambah Trainer Baru</DialogTitle>
              <DialogDescription>
                Daftarkan trainer baru untuk mengelola konten pelatihan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipe Trainer</Label>
                <Select defaultValue="internal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Internal (Karyawan)</SelectItem>
                    <SelectItem value="external">Eksternal (Vendor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nama</Label>
                <Input placeholder="Masukkan nama trainer/vendor" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Nomor Telepon</Label>
                <Input placeholder="081234567890" />
              </div>
              <div className="space-y-2">
                <Label>Spesialisasi</Label>
                <Textarea placeholder="Masukkan spesialisasi (pisahkan dengan koma)" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Trainer</p>
                <p className="text-2xl font-bold text-primary">{trainers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Internal</p>
                <p className="text-2xl font-bold text-primary">{internalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Eksternal</p>
                <p className="text-2xl font-bold text-primary">{externalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aktif</p>
                <p className="text-2xl font-bold text-primary">{activeCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trainers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trainers">Daftar Trainer</TabsTrigger>
          <TabsTrigger value="requests">
            Permintaan Baru
            {pendingRequests.length > 0 && (
              <Badge className="ml-2 bg-amber-500">{pendingRequests.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trainers" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold">Daftar Trainer</CardTitle>
                  <CardDescription>Trainer yang terdaftar dalam sistem</CardDescription>
                </div>
                <div className="flex w-full flex-wrap gap-2 md:w-auto">
                  <div className="relative min-w-0 flex-1 md:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari trainer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 md:w-64"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Tipe</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="external">Eksternal</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Nonaktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTrainers.map((trainer) => (
                  <div key={trainer.id} className="flex min-w-0 flex-col gap-4 rounded-lg bg-muted/30 p-4 md:flex-row md:items-center">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-secondary text-white">
                        {trainer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="min-w-0 max-w-full truncate font-medium">{trainer.name}</p>
                        <Badge className={trainer.type === "internal" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}>
                          {trainer.type === "internal" ? "Internal" : "Eksternal"}
                        </Badge>
                        <Badge className={trainer.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}>
                          {trainer.status === "active" ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {trainer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {trainer.phone}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {trainer.specialization.map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right hidden md:block">
                      <div className="flex items-center gap-1 justify-end">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold">{trainer.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{trainer.totalCourses} kursus</p>
                      <p className="text-xs text-muted-foreground">{trainer.totalHours} jam</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Lihat Kursus
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Permintaan Trainer Baru</CardTitle>
              <CardDescription>Permintaan pendaftaran trainer yang perlu disetujui</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Spesialisasi</TableHead>
                      <TableHead>Tanggal Request</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>
                          <Badge className={request.type === "internal" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}>
                            {request.type === "internal" ? "Internal" : "Eksternal"}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {request.specialization.map((spec) => (
                              <Badge key={spec} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(request.requestDate).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            <Button size="sm" variant="success">
                              <UserCheck className="w-4 h-4 mr-1" />
                              Setujui
                            </Button>
                            <Button size="sm" variant="destructive">
                              <UserX className="w-4 h-4 mr-1" />
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
                  <UserCheck className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
                  <p>Tidak ada permintaan trainer baru</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
