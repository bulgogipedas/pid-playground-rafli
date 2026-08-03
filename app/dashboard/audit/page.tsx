"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  FileText,
  LogIn,
  CheckCircle,
  XCircle,
  Upload,
  Award,
  Users,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { dummyAuditLogs, AuditLog } from "@/lib/data/users"

const actionIcons: Record<string, React.ReactNode> = {
  LOGIN: <LogIn className="w-4 h-4 text-[#0879B5]" />,
  APPROVE_TRAINING: <CheckCircle className="w-4 h-4 text-[#059669]" />,
  REJECT_TRAINING: <XCircle className="w-4 h-4 text-[#DC2626]" />,
  UPLOAD_CONTENT: <Upload className="w-4 h-4 text-[#D97706]" />,
  COMPLETE_COURSE: <Award className="w-4 h-4 text-[#059669]" />,
  ISSUE_CERTIFICATE: <Award className="w-4 h-4 text-[#0879B5]" />,
  CREATE_USER: <Users className="w-4 h-4 text-[#102F49]" />,
  SUBMIT_REQUEST: <FileText className="w-4 h-4 text-[#D97706]" />,
  SYNC_HCIS: <RefreshCw className="w-4 h-4 text-[#0879B5]" />,
}

const actionLabels: Record<string, string> = {
  LOGIN: "Login",
  APPROVE_TRAINING: "Setujui Pelatihan",
  REJECT_TRAINING: "Tolak Pelatihan",
  UPLOAD_CONTENT: "Upload Konten",
  COMPLETE_COURSE: "Selesaikan Kursus",
  ISSUE_CERTIFICATE: "Terbitkan Sertifikat",
  CREATE_USER: "Buat Pengguna",
  SUBMIT_REQUEST: "Ajukan Pelatihan",
  SYNC_HCIS: "Sinkronisasi HCIS",
}

export default function AuditLogPage() {
  const [logs] = useState<AuditLog[]>(dummyAuditLogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [moduleFilter, setModuleFilter] = useState<string>("all")
  const [actionFilter, setActionFilter] = useState<string>("all")

  // Get unique modules and actions
  const modules = [...new Set(logs.map(log => log.module))]
  const actions = [...new Set(logs.map(log => log.action))]

  // Filter logs
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    return matchesSearch && matchesModule && matchesAction
  })

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#102F49]">Audit Log</h1>
          <p className="text-muted-foreground">
            Rekam jejak semua aktivitas pengguna dalam sistem
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Log
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Aktivitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#102F49]">{logs.length}</div>
            <p className="text-xs text-muted-foreground">Hari ini</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0879B5]">
              {logs.filter(l => l.action === 'LOGIN').length}
            </div>
            <p className="text-xs text-muted-foreground">Sesi aktif</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Persetujuan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#059669]">
              {logs.filter(l => l.action === 'APPROVE_TRAINING').length}
            </div>
            <p className="text-xs text-muted-foreground">Disetujui hari ini</p>
          </CardContent>
        </Card>
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Penolakan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#DC2626]">
              {logs.filter(l => l.action === 'REJECT_TRAINING').length}
            </div>
            <p className="text-xs text-muted-foreground">Ditolak hari ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-lg border border-gray-100 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama pengguna atau detail aktivitas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Modul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Modul</SelectItem>
                  {modules.map(module => (
                    <SelectItem key={module} value={module}>{module}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Semua Aksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Aksi</SelectItem>
                  {actions.map(action => (
                    <SelectItem key={action} value={action}>{actionLabels[action] || action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Pilih Tanggal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card className="rounded-lg border border-gray-100 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Modul</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium text-[#102F49]">{formatDate(log.timestamp)}</div>
                      <div className="text-muted-foreground">{formatTime(log.timestamp)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#0879B5]/10 flex items-center justify-center text-[#0879B5] text-xs font-medium">
                        {log.userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{log.userName}</div>
                        <div className="text-xs text-muted-foreground">{log.userId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {actionIcons[log.action]}
                      <span className="text-sm">{actionLabels[log.action] || log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {log.module}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="text-sm text-muted-foreground truncate">{log.details}</p>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.ipAddress}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
