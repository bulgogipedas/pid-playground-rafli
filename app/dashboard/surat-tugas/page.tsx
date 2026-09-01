"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { suratTugasList, suratTugasStatuses, type SuratTugas } from "@/lib/data/surat-tugas"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  AlertCircle,
  Plus,
  Download,
  Filter,
  Search,
  FileText,
  CheckCircle,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { downloadCsv } from "@/lib/client-actions"
import { toast } from "sonner"

export default function SuratTugasPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [letters, setLetters] = useState<SuratTugas[]>(suratTugasList)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState<SuratTugas | null>(null)
  const [newLetter, setNewLetter] = useState({ employeeName: "", nip: "", division: "", courseName: "", startDate: "", endDate: "", cost: "" })

  // Check access - only Admin SDM
  const hasAccess = user?.role === "admin_sdm"

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="font-serif text-xl font-medium mb-2">Akses Terbatas</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Halaman ini hanya dapat diakses oleh Admin SDM.
        </p>
      </div>
    )
  }

  // Filter data
  const filteredData = letters.filter(st => {
    const matchSearch = st.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        st.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        st.number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === "all" || st.status === statusFilter
    return matchSearch && matchStatus
  })

  // Stats
  const totalSurat = letters.length
  const completedCount = letters.filter(st => st.status === "completed").length
  const pendingCount = letters.filter(st => st.status === "pending" || st.status === "draft").length
  const totalCost = letters.reduce((sum, st) => sum + st.cost, 0)

  const createLetter = () => {
    if (!newLetter.employeeName || !newLetter.nip || !newLetter.courseName || !newLetter.startDate || !newLetter.endDate) {
      toast.error("Lengkapi data wajib surat tugas")
      return
    }
    const letter: SuratTugas = {
      id: `ST${Date.now()}`,
      number: `ST/HCS/${String(letters.length + 1).padStart(3, "0")}/${new Date().getFullYear()}`,
      date: new Date().toISOString().split("T")[0],
      employeeId: "manual",
      employeeName: newLetter.employeeName,
      nip: newLetter.nip,
      position: "Karyawan",
      division: newLetter.division || "-",
      courseId: "manual",
      courseName: newLetter.courseName,
      trainingStartDate: newLetter.startDate,
      trainingEndDate: newLetter.endDate,
      venue: "Menunggu konfirmasi",
      cost: Number(newLetter.cost) || 0,
      status: "draft",
      createdBy: user?.name || "Admin SDM",
      createdDate: new Date().toISOString().split("T")[0],
    }
    setLetters((current) => [letter, ...current])
    setNewLetter({ employeeName: "", nip: "", division: "", courseName: "", startDate: "", endDate: "", cost: "" })
    setIsCreating(false)
    toast.success("Draf surat tugas dibuat", { description: letter.number })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Kelola Surat Tugas</h1>
          <p className="text-muted-foreground mt-1">Integrasi dengan HC System (Sistem Informasi Sumber Daya Manusia)</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => { downloadCsv("surat-tugas", filteredData); toast.success("Daftar surat tugas diekspor") }}>
            <Download className="w-4 h-4 mr-2" />
            Ekspor
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Buat Surat Tugas
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Surat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSurat}</div>
            <p className="text-xs text-muted-foreground mt-1">Tahun 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{completedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">{((completedCount / totalSurat) * 100).toFixed(0)}% selesai</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Membutuhkan aksi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Biaya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {(totalCost / 1000000).toFixed(0)}M</div>
            <p className="text-xs text-muted-foreground mt-1">Alokasi pelatihan</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama karyawan, pelatihan, atau nomor surat..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Surat Tugas</CardTitle>
          <CardDescription>Total {filteredData.length} surat tugas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomor Surat</TableHead>
                  <TableHead>Karyawan</TableHead>
                  <TableHead>Pelatihan</TableHead>
                  <TableHead>Divisi</TableHead>
                  <TableHead>Tanggal Pelatihan</TableHead>
                  <TableHead className="text-right">Biaya</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((st) => (
                    <TableRow key={st.id}>
                      <TableCell className="font-medium text-blue-600">{st.number}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{st.employeeName}</div>
                          <div className="text-xs text-muted-foreground">{st.nip}</div>
                        </div>
                      </TableCell>
                      <TableCell>{st.courseName}</TableCell>
                      <TableCell>{st.division}</TableCell>
                      <TableCell className="text-sm">
                        {new Date(st.trainingStartDate).toLocaleDateString('id-ID')} - {new Date(st.trainingEndDate).toLocaleDateString('id-ID')}
                      </TableCell>
                      <TableCell className="text-right font-medium">Rp {(st.cost / 1000000).toFixed(1)}M</TableCell>
                      <TableCell>
                        <Badge className={cn(
                          "rounded-full px-2 py-1 text-xs",
                          suratTugasStatuses[st.status as keyof typeof suratTugasStatuses]?.color
                        )}>
                          {suratTugasStatuses[st.status as keyof typeof suratTugasStatuses]?.label || st.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" aria-label={`Lihat ${st.number}`} onClick={() => setSelectedLetter(st)}>
                          <FileText className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Tidak ada data ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Buat Surat Tugas</DialogTitle>
            <DialogDescription>Surat baru disimpan sebagai draf sebelum proses persetujuan.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2 sm:grid-cols-2">
            <div className="space-y-2"><Label>Nama Karyawan *</Label><Input value={newLetter.employeeName} onChange={(event) => setNewLetter({ ...newLetter, employeeName: event.target.value })} /></div>
            <div className="space-y-2"><Label>NIP *</Label><Input value={newLetter.nip} onChange={(event) => setNewLetter({ ...newLetter, nip: event.target.value })} /></div>
            <div className="space-y-2"><Label>Divisi</Label><Input value={newLetter.division} onChange={(event) => setNewLetter({ ...newLetter, division: event.target.value })} /></div>
            <div className="space-y-2"><Label>Pelatihan *</Label><Input value={newLetter.courseName} onChange={(event) => setNewLetter({ ...newLetter, courseName: event.target.value })} /></div>
            <div className="space-y-2"><Label>Tanggal Mulai *</Label><Input type="date" value={newLetter.startDate} onChange={(event) => setNewLetter({ ...newLetter, startDate: event.target.value })} /></div>
            <div className="space-y-2"><Label>Tanggal Selesai *</Label><Input type="date" value={newLetter.endDate} onChange={(event) => setNewLetter({ ...newLetter, endDate: event.target.value })} /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Biaya (IDR)</Label><Input type="number" min="0" value={newLetter.cost} onChange={(event) => setNewLetter({ ...newLetter, cost: event.target.value })} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsCreating(false)}>Batal</Button><Button onClick={createLetter}>Simpan Draf</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedLetter} onOpenChange={(open) => !open && setSelectedLetter(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selectedLetter?.number}</DialogTitle><DialogDescription>Detail surat tugas pembelajaran</DialogDescription></DialogHeader>
          {selectedLetter && <div className="space-y-3 text-sm">
            <p><span className="text-muted-foreground">Karyawan:</span> {selectedLetter.employeeName} ({selectedLetter.nip})</p>
            <p><span className="text-muted-foreground">Pelatihan:</span> {selectedLetter.courseName}</p>
            <p><span className="text-muted-foreground">Jadwal:</span> {new Date(selectedLetter.trainingStartDate).toLocaleDateString("id-ID")} – {new Date(selectedLetter.trainingEndDate).toLocaleDateString("id-ID")}</p>
            <p><span className="text-muted-foreground">Lokasi:</span> {selectedLetter.venue}</p>
          </div>}
          <DialogFooter><Button onClick={() => setSelectedLetter(null)}>Tutup</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
