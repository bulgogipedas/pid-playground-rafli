"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { useAuth } from "@/lib/auth-context"
import { CheckCircle2, Clock, AlertCircle, Search, FileText, Eye, Check, X } from "lucide-react"
import { toast } from "sonner"

// Dummy data
const certificateSubmissions = [
  {
    id: "SUB001",
    employeeName: "Budi Santoso",
    employeeId: "USR001",
    division: "Teknologi Informasi",
    trainingName: "Advanced Project Management",
    certificateCode: "CERT-2024-001",
    completionDate: "2024-01-15",
    learningHours: 40,
    category: "Project Management",
    submissionDate: "2024-01-20",
    status: "pending",
    hcisIntegration: "Synced",
  },
  {
    id: "SUB002",
    employeeName: "Rina Permata",
    employeeId: "USR005",
    division: "Keuangan",
    trainingName: "Digital Marketing Fundamentals",
    certificateCode: "CERT-2024-002",
    completionDate: "2024-01-10",
    learningHours: 24,
    category: "Marketing",
    submissionDate: "2024-01-18",
    status: "approved",
    hcisIntegration: "Synced",
  },
  {
    id: "SUB003",
    employeeName: "Fajar Rahman",
    employeeId: "USR010",
    division: "Teknologi Informasi",
    trainingName: "Data Analysis with Python",
    certificateCode: "CERT-2024-003",
    completionDate: "2024-01-05",
    learningHours: 32,
    category: "Technical Skills",
    submissionDate: "2024-01-19",
    status: "pending_review",
    hcisIntegration: "Pending",
  },
  {
    id: "SUB004",
    employeeName: "Dewi Anggraini",
    employeeId: "USR011",
    division: "Operasional",
    trainingName: "Leadership Excellence",
    certificateCode: "CERT-2024-004",
    completionDate: "2023-12-20",
    learningHours: 48,
    category: "Management",
    submissionDate: "2024-01-15",
    status: "approved",
    hcisIntegration: "Synced",
  },
]

export default function ValidasiSertifikatPage() {
  const { user } = useAuth()
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSubmissions = certificateSubmissions.filter(sub => {
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter
    const matchesSearch = sub.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.trainingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.certificateCode.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700"
      case "pending":
        return "bg-blue-100 text-blue-700"
      case "pending_review":
        return "bg-yellow-100 text-yellow-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Disetujui"
      case "pending":
        return "Menunggu"
      case "pending_review":
        return "Ditinjau"
      case "rejected":
        return "Ditolak"
      default:
        return status
    }
  }

  // Stats
  const stats = {
    totalSubmissions: certificateSubmissions.length,
    approved: certificateSubmissions.filter(s => s.status === "approved").length,
    pending: certificateSubmissions.filter(s => s.status.includes("pending")).length,
    synced: certificateSubmissions.filter(s => s.hcisIntegration === "Synced").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Validasi Sertifikat</h1>
        <p className="text-muted-foreground mt-2">
          Validasi sertifikat eksternal yang diajukan karyawan. Terintegrasi dengan HCIS untuk sinkronisasi data otomatis.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">{stats.totalSubmissions}</p>
              <p className="text-sm text-muted-foreground">Total Pengajuan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">{stats.approved}</p>
              <p className="text-sm text-muted-foreground">Disetujui</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Menunggu Aksi</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{stats.synced}</p>
              <p className="text-sm text-muted-foreground">HCIS Synced</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengajuan Sertifikat</CardTitle>
          <CardDescription>
            Validasi sertifikat eksternal dan kelola integrasi HCIS
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari berdasarkan nama karyawan, pelatihan, atau kode sertifikat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="pending_review">Ditinjau</SelectItem>
                <SelectItem value="approved">Disetujui</SelectItem>
                <SelectItem value="rejected">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Karyawan</TableHead>
                  <TableHead>Divisi</TableHead>
                  <TableHead>Pelatihan</TableHead>
                  <TableHead>Kode Sertifikat</TableHead>
                  <TableHead>Jam</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>HCIS</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map(sub => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.employeeName}</TableCell>
                    <TableCell className="text-sm">{sub.division}</TableCell>
                    <TableCell className="text-sm">{sub.trainingName}</TableCell>
                    <TableCell className="text-sm font-mono">{sub.certificateCode}</TableCell>
                    <TableCell className="text-sm">{sub.learningHours} jam</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(sub.status)}>
                        {getStatusLabel(sub.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={sub.hcisIntegration === "Synced" ? "default" : "secondary"}>
                        {sub.hcisIntegration}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      {sub.status !== "approved" && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              toast.success("Sertifikat divalidasi", {
                                description: `${sub.trainingName} — ${sub.employeeName}`,
                              })
                            }
                            aria-label={`Setujui sertifikat ${sub.trainingName} milik ${sub.employeeName}`}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                          >
                            <Check aria-hidden="true" className="w-3 h-3" />
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              toast.error("Sertifikat ditolak", {
                                description: `${sub.trainingName} — ${sub.employeeName}`,
                              })
                            }
                            aria-label={`Tolak sertifikat ${sub.trainingName} milik ${sub.employeeName}`}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                          >
                            <X aria-hidden="true" className="w-3 h-3" />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        aria-label={`Lihat detail sertifikat ${sub.trainingName} milik ${sub.employeeName}`}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                      >
                        <Eye aria-hidden="true" className="w-3 h-3" />
                        Detail
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* HCIS Integration Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Integrasi HCIS</p>
              <p className="text-sm text-blue-800">
                Sertifikat yang disetujui akan otomatis disinkronkan dengan HCIS Talent Management Module. Nomor dan kode sertifikat akan tersimpan dalam sistem HR.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
