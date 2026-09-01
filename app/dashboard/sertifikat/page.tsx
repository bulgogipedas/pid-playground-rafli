"use client"

import { useEffect, useState } from "react"
import { 
  Award, 
  Download, 
  ExternalLink, 
  Search, 
  Filter,
  Upload,
  QrCode,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Plus,
  X,
  Building2,
  Briefcase
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
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { dummyCertificates, type Certificate } from "@/lib/data/courses"
import { PageHeader } from "@/components/dashboard/page-header"
import { pythonCourse } from "@/lib/learning/seed"
import { printCurrentPage, shareOrCopy } from "@/lib/client-actions"
import { toast } from "sonner"

// Extended certificates with more data
const allCertificates: Certificate[] = [
  ...dummyCertificates,
  {
    id: "CERT005",
    courseId: "CRS001",
    courseName: "Pengenalan Keselamatan dan Kesehatan Kerja (K3)",
    userId: "USR001",
    userName: "Budi Santoso",
    issuedAt: "2024-01-10",
    certificateNumber: "PYFA-2024-000056",
    qrCode: "https://learning.pyfa.co.id/verify/PYFA-2024-000056",
    digitalSignature: "Siti Rahayu - Kepala Bagian Pengembangan SDM",
    learningHours: 2,
    type: "internal",
  },
  {
    id: "CERT006",
    courseId: "CRS006",
    courseName: "Cybersecurity Awareness",
    userId: "USR001",
    userName: "Budi Santoso",
    issuedAt: "2024-01-05",
    certificateNumber: "PYFA-2024-000045",
    qrCode: "https://learning.pyfa.co.id/verify/PYFA-2024-000045",
    digitalSignature: "Siti Rahayu - Kepala Bagian Pengembangan SDM",
    learningHours: 1.25,
    type: "internal",
  },
  {
    id: "CERT007",
    courseId: "EXT003",
    courseName: "ISO 9001:2015 Lead Auditor",
    userId: "USR001",
    userName: "Budi Santoso",
    issuedAt: "2023-03-15",
    expiresAt: "2026-03-15",
    certificateNumber: "ISO-LA-2023-1234",
    qrCode: "https://irca.org/verify/ISO-LA-2023-1234",
    digitalSignature: "IRCA",
    learningHours: 40,
    type: "external",
    skillType: "Hard Skill",
    trainingMaterial: "ISO 9001 Quality Management System",
  },
  {
    id: "CERT008",
    courseId: "CRS002",
    courseName: "Kepemimpinan Efektif untuk Supervisor",
    userId: "USR001",
    userName: "Budi Santoso",
    issuedAt: "2023-08-30",
    certificateNumber: "PYFA-2023-000892",
    qrCode: "https://learning.pyfa.co.id/verify/PYFA-2023-000892",
    digitalSignature: "Siti Rahayu - Kepala Bagian Pengembangan SDM",
    learningHours: 4,
    type: "internal",
  },
]

// Impact validation data
interface ImpactValidation {
  id: string
  certificateId: string
  courseName: string
  employeeName: string
  validationDays: number
  validatedAt?: string
  validatedBy?: string
  status: "pending" | "validated" | "expired"
  impactScore?: number
  feedback?: string
  criteria: {
    name: string
    score: number
  }[]
}

const impactValidations: ImpactValidation[] = [
  {
    id: "IV001",
    certificateId: "CERT005",
    courseName: "Pengenalan Keselamatan dan Kesehatan Kerja (K3)",
    employeeName: "Budi Santoso",
    validationDays: 30,
    validatedAt: "2024-02-10",
    validatedBy: "Hendra Kusuma",
    status: "validated",
    impactScore: 85,
    feedback: "Karyawan menunjukkan peningkatan signifikan dalam kesadaran K3. Aktif melaporkan potensi bahaya di area kerja.",
    criteria: [
      { name: "Penerapan pengetahuan", score: 90 },
      { name: "Perubahan perilaku", score: 85 },
      { name: "Dampak pada tim", score: 80 },
    ]
  },
  {
    id: "IV002",
    certificateId: "CERT001",
    courseName: "Etika Bisnis dan Anti Korupsi",
    employeeName: "Budi Santoso",
    validationDays: 60,
    validatedAt: "2024-02-15",
    validatedBy: "Hendra Kusuma",
    status: "validated",
    impactScore: 92,
    feedback: "Sangat baik dalam menerapkan prinsip etika bisnis dalam operasional sehari-hari.",
    criteria: [
      { name: "Penerapan pengetahuan", score: 95 },
      { name: "Perubahan perilaku", score: 90 },
      { name: "Dampak pada tim", score: 90 },
    ]
  },
  {
    id: "IV003",
    certificateId: "CERT008",
    courseName: "Kepemimpinan Efektif untuk Supervisor",
    employeeName: "Budi Santoso",
    validationDays: 90,
    status: "pending",
    criteria: []
  },
]

// Satisfaction survey data
interface SatisfactionSurvey {
  id: string
  courseId: string
  courseName: string
  submittedAt: string
  overallRating: number
  responses: {
    question: string
    rating: number
  }[]
  feedback: string
}

const satisfactionSurveys: SatisfactionSurvey[] = [
  {
    id: "SS001",
    courseId: "CRS005",
    courseName: "Pengelolaan Waktu dan Produktivitas",
    submittedAt: "2023-11-25",
    overallRating: 5,
    responses: [
      { question: "Kualitas materi pembelajaran", rating: 5 },
      { question: "Kesesuaian dengan kebutuhan pekerjaan", rating: 5 },
      { question: "Penyampaian instruktur", rating: 4 },
      { question: "Kemudahan akses platform", rating: 5 },
    ],
    feedback: "Pelatihan sangat bermanfaat dan langsung bisa diterapkan dalam pekerjaan sehari-hari."
  },
  {
    id: "SS002",
    courseId: "CRS004",
    courseName: "Etika Bisnis dan Anti Korupsi",
    submittedAt: "2023-12-15",
    overallRating: 4,
    responses: [
      { question: "Kualitas materi pembelajaran", rating: 4 },
      { question: "Kesesuaian dengan kebutuhan pekerjaan", rating: 5 },
      { question: "Penyampaian instruktur", rating: 4 },
      { question: "Kemudahan akses platform", rating: 4 },
    ],
    feedback: "Materi cukup komprehensif, studi kasus sangat relevan dengan kondisi di perusahaan."
  },
]

export default function SertifikatPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showValidationSheet, setShowValidationSheet] = useState(false)
  const [selectedValidation, setSelectedValidation] = useState<ImpactValidation | null>(null)
  const [showSurveyDialog, setShowSurveyDialog] = useState(false)
  const [learningCertificate, setLearningCertificate] = useState<Certificate | null>(null)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(`pyfa_lms_player_${pythonCourse.id}`) || window.localStorage.getItem(`pyridam_learning_player_${pythonCourse.id}`)
      const player = saved ? JSON.parse(saved) : null
      if (player?.certificateIssued) {
        setLearningCertificate({
          id: "CERT-PYTHON-DEMO",
          courseId: pythonCourse.id,
          courseName: pythonCourse.title,
          userId: user?.id ?? "USR001",
          userName: user?.name ?? "Budi Santoso",
          issuedAt: new Date().toISOString(),
          certificateNumber: player.certificateNumber || "PYFA-PYTHON-DEMO",
          qrCode: `https://learning.pyfa.co.id/verify/${player.certificateNumber || "PYFA-PYTHON-DEMO"}`,
          digitalSignature: "Admin SDM - Pyridam Learning",
          learningHours: pythonCourse.estimatedHours,
          type: "internal",
        })
      }
    } catch {
      setLearningCertificate(null)
    }
  }, [user?.id, user?.name])

  const certificates = learningCertificate ? [learningCertificate, ...allCertificates] : allCertificates
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    courseName: "",
    provider: "",
    certificateNumber: "",
    issuedAt: "",
    expiresAt: "",
    learningHours: "",
    skillType: "Hard Skill",
    trainingMaterial: "",
    assignmentLetterId: "",
    file: null as File | null
  })
  
  const isAdmin = user?.role === 'admin_sdm'
  const isManager = user?.role === 'admin_divisi'
  
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || cert.type === filterType
    return matchesSearch && matchesType
  })
  
  const internalCerts = filteredCertificates.filter(c => c.type === "internal")
  const externalCerts = filteredCertificates.filter(c => c.type === "external")
  
  const expiringCerts = certificates.filter(cert => {
    if (!cert.expiresAt) return false
    const expiry = new Date(cert.expiresAt)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry > 0 && daysUntilExpiry <= 90
  })
  
  const totalLearningHours = certificates.reduce((sum, cert) => sum + cert.learningHours, 0)
  
  const handleUploadSubmit = () => {
    // Simulate upload
    console.log("Uploading certificate:", uploadForm)
    setShowUploadDialog(false)
    setUploadForm({
      courseName: "",
      provider: "",
      certificateNumber: "",
      issuedAt: "",
      expiresAt: "",
      learningHours: "",
      skillType: "Hard Skill",
      trainingMaterial: "",
      assignmentLetterId: "",
      file: null
    })
  }
  
  return (
    <div className="space-y-6">
      <PageHeader
        className="mb-0"
        title="Sertifikat Saya"
        description="Kelola portofolio sertifikat dan pencapaian pembelajaran Anda"
        actions={
          <Button onClick={() => setShowUploadDialog(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Unggah Sertifikat Eksternal
          </Button>
        }
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-serif text-foreground">{certificates.length}</p>
                <p className="text-sm text-muted-foreground">Total Sertifikat</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-serif text-foreground">{internalCerts.length}</p>
                <p className="text-sm text-muted-foreground">Internal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-serif text-foreground">{externalCerts.length}</p>
                <p className="text-sm text-muted-foreground">Eksternal</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-lg border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-serif text-foreground">{totalLearningHours}</p>
                <p className="text-sm text-muted-foreground">Total Jam Belajar</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Expiring Certificates Warning */}
      {expiringCerts.length > 0 && (
        <Card className="rounded-lg border-l-4 border-l-accent bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground">Sertifikat Akan Kadaluarsa</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {expiringCerts.length} sertifikat akan kadaluarsa dalam 90 hari ke depan. 
                  Pertimbangkan untuk memperbarui sertifikasi Anda.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {expiringCerts.map(cert => (
                    <Badge key={cert.id} variant="outline" className="bg-accent/10 text-accent border-accent/30">
                      {cert.courseName}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="certificates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="certificates">Sertifikat</TabsTrigger>
          <TabsTrigger value="impact">Validasi Dampak</TabsTrigger>
          <TabsTrigger value="surveys">Survei Kepuasan</TabsTrigger>
        </TabsList>
        
        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari sertifikat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="external">Eksternal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Certificate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCertificates.map((cert) => {
              const isExpiringSoon = cert.expiresAt && 
                Math.ceil((new Date(cert.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 90
              
              return (
                <Card 
                  key={cert.id} 
                  className={cn(
                    "rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer",
                    isExpiringSoon && "border-accent"
                  )}
                  onClick={() => setSelectedCertificate(cert)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        cert.type === "internal" 
                          ? "bg-primary/10 text-primary border-primary/30" 
                          : "bg-accent/10 text-accent border-accent/30"
                      )}>
                        {cert.type === "internal" ? "Internal" : "Eksternal"}
                      </Badge>
                      {isExpiringSoon && (
                        <AlertTriangle className="w-4 h-4 text-accent" />
                      )}
                    </div>
                    <CardTitle className="font-serif text-base leading-tight mt-2">
                      {cert.courseName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Diterbitkan: {new Date(cert.issuedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                    
                    {cert.expiresAt && (
                      <div className={cn(
                        "flex items-center gap-2 text-sm",
                        isExpiringSoon ? "text-accent" : "text-muted-foreground"
                      )}>
                        <Clock className="w-4 h-4" />
                        <span>Berlaku hingga: {new Date(cert.expiresAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{cert.learningHours} jam belajar</span>
                    </div>
                    
                    <div className="pt-2 border-t border-border flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground">
                        {cert.certificateNumber}
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground" aria-hidden="true">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          
          {filteredCertificates.length === 0 && (
            <Card className="rounded-lg border border-gray-100 shadow-sm">
              <CardContent className="p-12 text-center">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Tidak Ada Sertifikat</h3>
                <p className="text-sm text-muted-foreground">
                  Belum ada sertifikat yang ditemukan dengan filter saat ini.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Impact Validation Tab */}
        <TabsContent value="impact" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Validasi Dampak Pelatihan</CardTitle>
              <CardDescription>
                Penilaian dari atasan tentang penerapan hasil pelatihan di tempat kerja
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {impactValidations.map((validation) => (
                  <div 
                    key={validation.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedValidation(validation)
                      setShowValidationSheet(true)
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        validation.status === "validated" 
                          ? "bg-success/10" 
                          : "bg-accent/10"
                      )}>
                        {validation.status === "validated" 
                          ? <CheckCircle2 className="w-5 h-5 text-success" />
                          : <Clock className="w-5 h-5 text-accent" />
                        }
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{validation.courseName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Validasi {validation.validationDays} hari setelah selesai
                        </p>
                        {validation.validatedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Divalidasi oleh {validation.validatedBy} pada {new Date(validation.validatedAt).toLocaleDateString('id-ID')}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {validation.status === "validated" ? (
                        <div>
                          <span className="text-2xl font-bold font-serif text-success">{validation.impactScore}%</span>
                          <p className="text-xs text-muted-foreground">Skor Dampak</p>
                        </div>
                      ) : (
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                          Menunggu Validasi
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Satisfaction Surveys Tab */}
        <TabsContent value="surveys" className="space-y-4">
          <Card className="rounded-lg border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif">Survei Kepuasan (Kirkpatrick Level 1)</CardTitle>
              <CardDescription>
                Riwayat feedback yang Anda berikan setelah menyelesaikan pelatihan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {satisfactionSurveys.map((survey) => (
                  <div 
                    key={survey.id}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{survey.courseName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Diisi pada {new Date(survey.submittedAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star}
                            className={cn(
                              "w-5 h-5",
                              star <= survey.overallRating ? "text-accent fill-accent" : "text-gray-300"
                            )}
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {survey.responses.map((response, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{response.question}</span>
                          <span className="font-medium">{response.rating}/5</span>
                        </div>
                      ))}
                    </div>
                    
                    {survey.feedback && (
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-sm text-muted-foreground italic">&quot;{survey.feedback}&quot;</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Certificate Detail Sheet */}
      <Sheet open={!!selectedCertificate} onOpenChange={(open) => !open && setSelectedCertificate(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedCertificate && (
            <>
              <SheetHeader>
                <SheetTitle className="font-serif">Detail Sertifikat</SheetTitle>
                <SheetDescription>
                  Informasi lengkap sertifikat dan opsi unduh
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Certificate Preview */}
                <div className="aspect-[1.4/1] bg-gradient-to-br from-primary to-secondary rounded-lg p-6 text-white relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <QrCode className="w-16 h-16 opacity-50" />
                  </div>
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <p className="text-sm opacity-80">PT Pyridam Farma Tbk</p>
                      <h3 className="font-serif text-xl font-bold mt-1">SERTIFIKAT</h3>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Diberikan kepada:</p>
                      <p className="font-serif text-lg font-semibold">{selectedCertificate.userName}</p>
                      <p className="text-sm opacity-80 mt-2">Telah menyelesaikan:</p>
                      <p className="font-medium">{selectedCertificate.courseName}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-70">No. Sertifikat</p>
                        <p className="font-mono text-sm">{selectedCertificate.certificateNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs opacity-70">Tanggal Terbit</p>
                        <p className="text-sm">{new Date(selectedCertificate.issuedAt).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Certificate Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tipe Sertifikat</p>
                      <p className="font-medium">{selectedCertificate.type === "internal" ? "Internal" : "Eksternal"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Jam Belajar</p>
                      <p className="font-medium">{selectedCertificate.learningHours} jam</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tanggal Terbit</p>
                      <p className="font-medium">{new Date(selectedCertificate.issuedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                    {selectedCertificate.expiresAt && (
                      <div>
                        <p className="text-sm text-muted-foreground">Berlaku Hingga</p>
                        <p className="font-medium">{new Date(selectedCertificate.expiresAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Ditandatangani oleh</p>
                    <p className="font-medium">{selectedCertificate.digitalSignature}</p>
                  </div>
                  
                  {selectedCertificate.skillType && (
                    <div>
                      <p className="text-sm text-muted-foreground">Jenis Keahlian</p>
                      <p className="font-medium">{selectedCertificate.skillType}</p>
                    </div>
                  )}
                  
                  {selectedCertificate.trainingMaterial && (
                    <div>
                      <p className="text-sm text-muted-foreground">Ringkasan Materi</p>
                      <p className="font-medium">{selectedCertificate.trainingMaterial}</p>
                    </div>
                  )}
                  
                  {/* QR Code */}
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Verifikasi Sertifikat</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Scan QR code atau kunjungi tautan untuk memverifikasi keaslian sertifikat ini.
                        </p>
                        <a 
                          href={selectedCertificate.qrCode} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-secondary hover:underline mt-1 block truncate"
                        >
                          {selectedCertificate.qrCode}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={() => { toast.info("Menyiapkan sertifikat untuk dicetak"); printCurrentPage() }}>
                    <Download className="w-4 h-4 mr-2" />
                    Unduh PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={async () => {
                      const result = await shareOrCopy({
                        title: selectedCertificate.courseName,
                        text: `Sertifikat ${selectedCertificate.certificateNumber}`,
                        url: selectedCertificate.qrCode,
                      })
                      toast.success(result === "shared" ? "Sertifikat dibagikan" : "Tautan verifikasi disalin")
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Bagikan
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
      
      {/* Impact Validation Detail Sheet */}
      <Sheet open={showValidationSheet} onOpenChange={setShowValidationSheet}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedValidation && (
            <>
              <SheetHeader>
                <SheetTitle className="font-serif">Detail Validasi Dampak</SheetTitle>
                <SheetDescription>
                  Hasil penilaian penerapan pelatihan di tempat kerja
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-medium text-foreground">{selectedValidation.courseName}</h4>
                  <p className="text-sm text-muted-foreground">
                    Validasi {selectedValidation.validationDays} hari setelah penyelesaian
                  </p>
                </div>
                
                {selectedValidation.status === "validated" ? (
                  <>
                    <div className="text-center p-6 bg-success/5 rounded-lg">
                      <span className="text-4xl font-bold font-serif text-success">
                        {selectedValidation.impactScore}%
                      </span>
                      <p className="text-sm text-success mt-1">Skor Dampak Keseluruhan</p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium">Kriteria Penilaian:</h4>
                      {selectedValidation.criteria.map((criterion, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-muted-foreground">{criterion.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-success rounded-full"
                                style={{ width: `${criterion.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium w-10">{criterion.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedValidation.feedback && (
                      <div>
                        <h4 className="font-medium mb-2">Komentar Atasan:</h4>
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground italic">
                            &quot;{selectedValidation.feedback}&quot;
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Divalidasi oleh: {selectedValidation.validatedBy}</p>
                      <p>Tanggal: {new Date(selectedValidation.validatedAt!).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-8 bg-accent/5 rounded-lg">
                    <Clock className="w-12 h-12 text-accent mx-auto mb-3" />
                    <h4 className="font-medium">Menunggu Validasi</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Atasan Anda belum memberikan penilaian dampak pelatihan ini.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
      
      {/* Upload External Certificate Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif">Unggah Sertifikat Eksternal</DialogTitle>
            <DialogDescription>
              Tambahkan sertifikat dari pelatihan publik eksternal ke portofolio Anda
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="courseName">Nama Pelatihan *</Label>
              <Input
                id="courseName"
                value={uploadForm.courseName}
                onChange={(e) => setUploadForm(prev => ({ ...prev, courseName: e.target.value }))}
                placeholder="Contoh: AWS Cloud Practitioner"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Penyelenggara / Provider *</Label>
              <Input
                id="provider"
                value={uploadForm.provider}
                onChange={(e) => setUploadForm(prev => ({ ...prev, provider: e.target.value }))}
                placeholder="Contoh: Amazon Web Services"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="certificateNumber">Nomor Sertifikat *</Label>
                <Input
                  id="certificateNumber"
                  value={uploadForm.certificateNumber}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, certificateNumber: e.target.value }))}
                  placeholder="Contoh: AWS-12345678"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="learningHours">Jam Belajar *</Label>
                <Input
                  id="learningHours"
                  type="number"
                  value={uploadForm.learningHours}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, learningHours: e.target.value }))}
                  placeholder="Contoh: 16"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issuedAt">Tanggal Terbit *</Label>
                <Input
                  id="issuedAt"
                  type="date"
                  value={uploadForm.issuedAt}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, issuedAt: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiresAt">Tanggal Kadaluarsa</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={uploadForm.expiresAt}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, expiresAt: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skillType">Jenis Keahlian *</Label>
              <Select 
                value={uploadForm.skillType} 
                onValueChange={(value) => setUploadForm(prev => ({ ...prev, skillType: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hard Skill">Hard Skill</SelectItem>
                  <SelectItem value="Soft Skill">Soft Skill</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignmentLetterId">ID Surat Tugas (dari HCIS)</Label>
              <Input
                id="assignmentLetterId"
                value={uploadForm.assignmentLetterId}
                onChange={(e) => setUploadForm(prev => ({ ...prev, assignmentLetterId: e.target.value }))}
                placeholder="Contoh: ST-2024-001234"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trainingMaterial">Ringkasan Materi</Label>
              <Textarea
                id="trainingMaterial"
                value={uploadForm.trainingMaterial}
                onChange={(e) => setUploadForm(prev => ({ ...prev, trainingMaterial: e.target.value }))}
                placeholder="Jelaskan secara singkat materi yang dipelajari..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Unggah Sertifikat (PDF/JPG) *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Tarik file ke sini atau klik untuk memilih
                </p>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null
                    setUploadForm(prev => ({ ...prev, file }))
                  }}
                  className="hidden"
                  id="fileUpload"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById('fileUpload')?.click()}>
                  Pilih File
                </Button>
                {uploadForm.file && (
                  <p className="text-sm text-muted-foreground mt-2">
                    File: {uploadForm.file.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Batal
            </Button>
            <Button
              onClick={handleUploadSubmit}
              disabled={!uploadForm.courseName || !uploadForm.certificateNumber || !uploadForm.issuedAt || !uploadForm.learningHours}
            >
              Unggah Sertifikat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
