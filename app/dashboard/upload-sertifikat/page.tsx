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
import { Upload, FileText, CheckCircle, Clock, AlertCircle, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"

// Dummy data
const submittedCertificates = [
  {
    id: "CERT001",
    trainingName: "Advanced Project Management",
    certificateCode: "CERT-2024-001",
    institution: "International Institute",
    completionDate: "2024-01-15",
    learningHours: 40,
    category: "Project Management",
    submissionDate: "2024-01-20",
    status: "pending",
    file: "certificate_001.pdf",
  },
  {
    id: "CERT002",
    trainingName: "Digital Marketing Fundamentals",
    certificateCode: "CERT-2024-002",
    institution: "Online Academy",
    completionDate: "2024-01-10",
    learningHours: 24,
    category: "Marketing",
    submissionDate: "2024-01-18",
    status: "approved",
    file: "certificate_002.pdf",
  },
  {
    id: "CERT003",
    trainingName: "Data Analysis with Python",
    certificateCode: "CERT-2024-003",
    institution: "Tech Training Center",
    completionDate: "2024-01-05",
    learningHours: 32,
    category: "Technical Skills",
    submissionDate: "2024-01-19",
    status: "revision",
    rejectionReason: "Kode sertifikat tidak valid, silahkan perbaiki",
    file: "certificate_003.pdf",
  },
]

export default function UploadSertifikatPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("upload")
  const [formData, setFormData] = useState({
    trainingName: "",
    certificateCode: "",
    institution: "",
    completionDate: "",
    attendanceFile: null,
    assignmentLetterFile: null,
    learningHours: "",
    category: "",
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    toast.success("Sertifikat berhasil diunggah", {
      description: "Sertifikat Anda akan diverifikasi oleh Admin SDM.",
    })
    setFormData({
      trainingName: "",
      certificateCode: "",
      institution: "",
      completionDate: "",
      attendanceFile: null,
      assignmentLetterFile: null,
      learningHours: "",
      category: "",
      notes: "",
    })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700"
      case "pending":
        return "bg-blue-100 text-blue-700"
      case "revision":
        return "bg-orange-100 text-orange-700"
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
      case "revision":
        return "Perlu Perbaikan"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-foreground">Upload Sertifikat</h1>
        <p className="text-muted-foreground mt-2">
          Unggah sertifikat pelatihan eksternal Anda untuk divalidasi oleh Admin SDM
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Sertifikat</TabsTrigger>
          <TabsTrigger value="history">Riwayat Pengajuan</TabsTrigger>
        </TabsList>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Formulir Upload Sertifikat</CardTitle>
              <CardDescription>
                Lengkapi semua field di bawah untuk mengunggah sertifikat pelatihan eksternal Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Scan Sertifikat */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Scan Sertifikat *</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-secondary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag & drop file PDF atau klik untuk upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Format: PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                </div>

                {/* Kode Sertifikat */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kode Sertifikat *</label>
                  <Input
                    type="text"
                    name="certificateCode"
                    placeholder="Contoh: CERT-2024-001"
                    value={formData.certificateCode}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Kode unik sertifikat dari penyedia pelatihan</p>
                </div>

                {/* Materi */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Materi / Nama Pelatihan *</label>
                  <Input
                    type="text"
                    name="trainingName"
                    placeholder="Contoh: Advanced Project Management"
                    value={formData.trainingName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Institusi */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Institusi / Penyedia Pelatihan *</label>
                  <Input
                    type="text"
                    name="institution"
                    placeholder="Contoh: International Institute"
                    value={formData.institution}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Tanggal Selesai */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tanggal Selesai *</label>
                  <Input
                    type="date"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Absensi Pribadi */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Absensi Pribadi</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-secondary transition-colors">
                      <FileText className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Unggah file</p>
                    </div>
                  </div>

                  {/* Surat Tugas Pembelajaran */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Surat Tugas Pembelajaran</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-secondary transition-colors">
                      <FileText className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Unggah file</p>
                    </div>
                  </div>
                </div>

                {/* Learning Hours */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Learning Hours *</label>
                  <Input
                    type="number"
                    name="learningHours"
                    placeholder="Contoh: 40"
                    value={formData.learningHours}
                    onChange={handleInputChange}
                    required
                    min="1"
                  />
                  <p className="text-xs text-muted-foreground">Durasi pelatihan dalam jam</p>
                </div>

                {/* Kategori Pembelajaran */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kategori Pembelajaran *</label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Keterampilan Teknis</SelectItem>
                      <SelectItem value="management">Manajemen & Leadership</SelectItem>
                      <SelectItem value="soft-skills">Soft Skills</SelectItem>
                      <SelectItem value="compliance">Compliance & Regulasi</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Catatan */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catatan Tambahan</label>
                  <textarea
                    name="notes"
                    placeholder="Tambahkan catatan atau informasi penting lainnya"
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Success Message */}
                {submitted && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-900">Pengajuan Berhasil</p>
                      <p className="text-sm text-emerald-800">Sertifikat Anda akan divalidasi oleh Admin SDM dalam 3 hari kerja</p>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Sertifikat
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pengajuan Sertifikat</CardTitle>
              <CardDescription>
                Lihat status pengajuan sertifikat Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Pelatihan</TableHead>
                      <TableHead>Kode Sertifikat</TableHead>
                      <TableHead>Jam</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tanggal Selesai</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submittedCertificates.map(cert => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-medium">{cert.trainingName}</TableCell>
                        <TableCell className="text-sm">{cert.certificateCode}</TableCell>
                        <TableCell className="text-sm">{cert.learningHours} jam</TableCell>
                        <TableCell className="text-sm">{cert.category}</TableCell>
                        <TableCell className="text-sm">{new Date(cert.completionDate).toLocaleDateString("id-ID")}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(cert.status)}>
                            {getStatusLabel(cert.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <button className="text-secondary hover:text-secondary/80 text-sm font-medium">
                            <Eye className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Revision Card */}
              <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-orange-900">Perlu Perbaikan</p>
                    <p className="text-sm text-orange-800 mt-1">
                      Sertifikat "Data Analysis with Python" perlu diperbaiki. {submittedCertificates.find(c => c.status === "revision")?.rejectionReason}
                    </p>
                    <Button size="sm" className="mt-2">
                      Perbaiki Pengajuan
                    </Button>
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
