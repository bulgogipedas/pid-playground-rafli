"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import {
  dummyCourses,
  methodLabels,
  typeLabels,
  type Course,
  type CourseSection,
  type ContentItem,
  type ContentType,
} from "@/lib/data/courses"
import { jobFamilies } from "@/lib/data/users"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  Archive,
  Upload,
  Video,
  FileText,
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  Star,
  GripVertical,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Lock,
  Unlock,
  Calendar,
  Tag,
  FolderOpen,
  History,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/data/training-requests"
import { pythonCourse } from "@/lib/learning/seed"

const pythonContentCourse: Course = {
  id: pythonCourse.id,
  title: pythonCourse.title,
  description: pythonCourse.shortDescription,
  thumbnail: "/placeholder.svg?height=200&width=300",
  duration: pythonCourse.estimatedHours * 60,
  type: "pilihan",
  method: "e_learning",
  category: pythonCourse.category,
  jobFamilies: pythonCourse.targetAudience,
  instructor: pythonCourse.instructor,
  sections: pythonCourse.modules.map((module) => ({
    id: module.id,
    title: module.title,
    items: module.materials.map((material) => ({
      id: material.id,
      title: material.title,
      type: material.type === "video" ? "video" : ["quiz", "pretest", "posttest"].includes(material.type) ? "quiz" : "pdf",
      duration: material.duration,
      url: material.youtubeId ? `https://www.youtube.com/watch?v=${material.youtubeId}` : undefined,
    })),
  })),
  createdAt: pythonCourse.createdAt,
  status: pythonCourse.status,
  enrollmentCount: 0,
  completionRate: 0,
  rating: pythonCourse.rating ?? 0,
  licenseType: "beli_putus",
}

// Content type labels and icons
const contentTypeLabels: Record<ContentType, string> = {
  video: "Video",
  pdf: "PDF",
  scorm: "SCORM",
  quiz: "Quiz",
}

const contentTypeIcons: Record<ContentType, React.ReactNode> = {
  video: <Video className="w-4 h-4 text-secondary" />,
  pdf: <FileText className="w-4 h-4 text-red-500" />,
  scorm: <BookOpen className="w-4 h-4 text-amber-500" />,
  quiz: <CheckCircle className="w-4 h-4 text-emerald-500" />,
}

// Course form for creating/editing
function CourseForm({ 
  course,
  onSubmit, 
  onClose 
}: { 
  course?: Course
  onSubmit: (data: Partial<Course>) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    category: course?.category || "",
    type: course?.type || "pilihan",
    method: course?.method || "e_learning",
    instructor: course?.instructor || "",
    jobFamilies: course?.jobFamilies || [] as string[],
    licenseType: course?.licenseType || "beli_putus",
    expiryDate: course?.expiryDate || "",
    duration: course?.duration || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Judul Pelatihan *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Contoh: Pengenalan Keselamatan Kerja"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Jelaskan isi dan tujuan pelatihan..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipe Pelatihan *</Label>
          <Select
            value={formData.type}
            onValueChange={(v) => setFormData({ ...formData, type: v as "wajib" | "pilihan" })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wajib">Wajib</SelectItem>
              <SelectItem value="pilihan">Pilihan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Metode Pembelajaran *</Label>
          <Select
            value={formData.method}
            onValueChange={(v) => setFormData({ ...formData, method: v as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="e_learning">E-Learning</SelectItem>
              <SelectItem value="in_house">In-House Training</SelectItem>
              <SelectItem value="public_online">Public Online</SelectItem>
              <SelectItem value="public_offline">Public Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Kategori *</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Contoh: Keselamatan Kerja"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructor">Instruktur *</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            placeholder="Nama instruktur"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipe Lisensi *</Label>
          <Select
            value={formData.licenseType}
            onValueChange={(v) => setFormData({ ...formData, licenseType: v as "beli_putus" | "langganan" })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beli_putus">Beli Putus (Permanen)</SelectItem>
              <SelectItem value="langganan">Langganan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.licenseType === "langganan" && (
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Tanggal Kadaluarsa *</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>Target Job Family *</Label>
        <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
          {jobFamilies.map((jf) => (
            <div key={jf} className="flex items-center space-x-2">
              <Checkbox
                id={`jf-${jf}`}
                checked={formData.jobFamilies.includes(jf)}
                onCheckedChange={(checked) => {
                  setFormData({
                    ...formData,
                    jobFamilies: checked 
                      ? [...formData.jobFamilies, jf]
                      : formData.jobFamilies.filter(f => f !== jf)
                  })
                }}
              />
              <label htmlFor={`jf-${jf}`} className="text-sm cursor-pointer">
                {jf}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit">
          {course ? "Simpan Perubahan" : "Buat Pelatihan"}
        </Button>
      </div>
    </form>
  )
}

// Content upload dialog
function ContentUploadDialog({ 
  sectionId,
  onUpload 
}: { 
  sectionId: string
  onUpload: (content: Partial<ContentItem>) => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [contentData, setContentData] = useState({
    title: "",
    type: "video" as ContentType,
    duration: 0,
  })

  const handleSubmit = () => {
    onUpload(contentData)
    setContentData({ title: "", type: "video", duration: 0 })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Konten
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif">Upload Konten Baru</DialogTitle>
          <DialogDescription>
            Upload materi pembelajaran (Video, PDF, SCORM, atau Quiz)
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Tipe Konten *</Label>
            <Select
              value={contentData.type}
              onValueChange={(v) => setContentData({ ...contentData, type: v as ContentType })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Video (MP4)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    PDF Document
                  </div>
                </SelectItem>
                <SelectItem value="scorm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    SCORM Package
                  </div>
                </SelectItem>
                <SelectItem value="quiz">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Quiz
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentTitle">Judul Konten *</Label>
            <Input
              id="contentTitle"
              value={contentData.title}
              onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
              placeholder="Contoh: Pengenalan K3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Durasi (menit) *</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={contentData.duration}
              onChange={(e) => setContentData({ ...contentData, duration: parseInt(e.target.value) })}
              placeholder="15"
            />
          </div>

          <div className="space-y-2">
            <Label>File Upload</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Seret file ke sini atau klik untuk upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {contentData.type === "video" ? "MP4 (Maks. 2GB)" :
                 contentData.type === "pdf" ? "PDF (Maks. 100MB)" :
                 contentData.type === "scorm" ? "ZIP (SCORM 1.2/2004, Maks. 500MB)" :
                 "Quiz akan dibuat di editor"}
              </p>
              <Button type="button" variant="outline" size="sm" className="mt-3">
                Pilih File
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!contentData.title || contentData.duration === 0}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Konten
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Course editor sheet
function CourseEditorSheet({ course }: { course: Course }) {
  const [sections, setSections] = useState(course.sections)
  const [expandedSections, setExpandedSections] = useState<string[]>(course.sections.map(s => s.id))

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const addSection = () => {
    const newSection: CourseSection = {
      id: `SEC${Date.now()}`,
      title: "Bagian Baru",
      items: [],
    }
    setSections([...sections, newSection])
    setExpandedSections([...expandedSections, newSection.id])
  }

  const addContent = (sectionId: string, content: Partial<ContentItem>) => {
    setSections(prev => prev.map(section => {
      if (section.id !== sectionId) return section
      return {
        ...section,
        items: [...section.items, {
          id: `ITM${Date.now()}`,
          title: content.title || "",
          type: content.type || "video",
          duration: content.duration || 0,
        }]
      }
    }))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-1" />
          Kelola Konten
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-serif">{course.title}</SheetTitle>
          <SheetDescription>
            Kelola struktur dan konten pelatihan
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Course Info */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Durasi</span>
              <span className="font-medium">
                {Math.floor(sections.reduce((total, s) => total + s.items.reduce((t, i) => t + i.duration, 0), 0) / 60)} Jam {sections.reduce((total, s) => total + s.items.reduce((t, i) => t + i.duration, 0), 0) % 60} Menit
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Jumlah Bagian</span>
              <span className="font-medium">{sections.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Konten</span>
              <span className="font-medium">{sections.reduce((total, s) => total + s.items.length, 0)}</span>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium font-serif">Struktur Pelatihan</h4>
              <Button variant="outline" size="sm" onClick={addSection}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Bagian
              </Button>
            </div>

            {sections.map((section, index) => (
              <Card key={section.id} className="border-gray-200">
                <CardHeader className="p-3 cursor-pointer" onClick={() => toggleSection(section.id)}>
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <Input
                      value={section.title}
                      onChange={(e) => {
                        e.stopPropagation()
                        setSections(prev => prev.map(s => 
                          s.id === section.id ? { ...s, title: e.target.value } : s
                        ))
                      }}
                      className="font-medium border-0 p-0 h-auto focus-visible:ring-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs text-muted-foreground">
                        {section.items.length} materi
                      </span>
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                {expandedSections.includes(section.id) && (
                  <CardContent className="p-3 pt-0 space-y-2">
                    {section.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                        {contentTypeIcons[item.type]}
                        <span className="flex-1 text-sm">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.duration} menit</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <History className="w-4 h-4 mr-2" />
                              Versi Lama
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                    
                    <div className="pt-2">
                      <ContentUploadDialog 
                        sectionId={section.id} 
                        onUpload={(content) => addContent(section.id, content)}
                      />
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button>
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function KontenPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published" | "archived">("all")
  const [courses, setCourses] = useState<Course[]>([pythonContentCourse, ...dummyCourses])
  const [isCreating, setIsCreating] = useState(false)

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || course.status === statusFilter
    
    // Trainers only see their own courses
    if (user?.role === "trainer") {
      return matchesSearch && matchesStatus && course.instructor === user.name
    }
    
    return matchesSearch && matchesStatus
  })

  // Group by status
  const draftCourses = filteredCourses.filter(c => c.status === "draft")
  const publishedCourses = filteredCourses.filter(c => c.status === "published")
  const archivedCourses = filteredCourses.filter(c => c.status === "archived")

  // Handle create course
  const handleCreateCourse = (data: Partial<Course>) => {
    const newCourse: Course = {
      id: `CRS${String(courses.length + 1).padStart(3, '0')}`,
      title: data.title || "",
      description: data.description || "",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: data.duration || 0,
      type: data.type as "wajib" | "pilihan" || "pilihan",
      method: data.method as any || "e_learning",
      category: data.category || "",
      jobFamilies: data.jobFamilies || [],
      instructor: data.instructor || user?.name || "",
      sections: [],
      createdAt: new Date().toISOString().split('T')[0],
      status: "draft",
      enrollmentCount: 0,
      completionRate: 0,
      rating: 0,
      licenseType: data.licenseType as "beli_putus" | "langganan" || "beli_putus",
      expiryDate: data.expiryDate,
    }
    setCourses([newCourse, ...courses])
    setIsCreating(false)
    toast.success("Pelatihan dibuat", { description: newCourse.title })
  }

  // Handle status change
  const handleStatusChange = (courseId: string, newStatus: "draft" | "published" | "archived") => {
    const target = courses.find(c => c.id === courseId)
    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, status: newStatus } : c
    ))
    const statusText =
      newStatus === "published" ? "dipublikasikan" : newStatus === "archived" ? "diarsipkan" : "disimpan sebagai draft"
    toast.success(`Pelatihan ${statusText}`, { description: target?.title })
  }

  // Stats
  const stats = {
    total: filteredCourses.length,
    draft: draftCourses.length,
    published: publishedCourses.length,
    archived: archivedCourses.length,
  }

  // Check if user can manage content
  const canManageContent = user?.role === "admin_sdm" || user?.role === "admin_content" || user?.role === "trainer"

  if (!canManageContent) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="font-serif text-xl font-medium mb-2">Akses Terbatas</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Halaman ini hanya dapat diakses oleh Admin SDM, Admin Content, dan Trainer.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">Kelola Konten</h1>
          <p className="text-muted-foreground">
            Buat dan kelola materi pelatihan untuk karyawan
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Buat Pelatihan Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">Buat Pelatihan Baru</DialogTitle>
              <DialogDescription>
                Isi informasi dasar pelatihan. Konten dapat ditambahkan setelah pelatihan dibuat.
              </DialogDescription>
            </DialogHeader>
            <CourseForm onSubmit={handleCreateCourse} onClose={() => setIsCreating(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Pelatihan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Edit className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">{stats.draft}</p>
                <p className="text-xs text-muted-foreground">Draf</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{stats.published}</p>
                <p className="text-xs text-muted-foreground">Terpublikasi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Archive className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">{stats.archived}</p>
                <p className="text-xs text-muted-foreground">Diarsipkan</p>
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
                placeholder="Cari pelatihan atau instruktur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
              <SelectTrigger className="w-full md:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="draft">Draf</SelectItem>
                <SelectItem value="published">Terpublikasi</SelectItem>
                <SelectItem value="archived">Diarsipkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Semua ({filteredCourses.length})</TabsTrigger>
          <TabsTrigger value="draft">Draf ({draftCourses.length})</TabsTrigger>
          <TabsTrigger value="published">Terpublikasi ({publishedCourses.length})</TabsTrigger>
          <TabsTrigger value="archived">Diarsipkan ({archivedCourses.length})</TabsTrigger>
        </TabsList>

        {["all", "draft", "published", "archived"].map((tab) => {
          const tabCourses = tab === "all" ? filteredCourses :
            tab === "draft" ? draftCourses :
            tab === "published" ? publishedCourses : archivedCourses

          return (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {tabCourses.length === 0 ? (
                <Card className="border-gray-100 shadow-sm">
                  <CardContent className="p-8 text-center">
                    <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Tidak ada pelatihan</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setIsCreating(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Buat Pelatihan Baru
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {tabCourses.map((course) => (
                    <Card key={course.id} className="border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {/* Thumbnail */}
                          <div className="w-40 h-24 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                            <BookOpen className="w-8 h-8 text-primary/30" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                course.status === "draft" && "bg-amber-100 text-amber-700",
                                course.status === "published" && "bg-emerald-100 text-emerald-700",
                                course.status === "archived" && "bg-gray-100 text-gray-700"
                              )}>
                                {course.status === "draft" ? "Draf" : 
                                 course.status === "published" ? "Terpublikasi" : "Diarsipkan"}
                              </Badge>
                              <Badge className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                course.type === "wajib" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                              )}>
                                {typeLabels[course.type]}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {course.licenseType === "beli_putus" ? "Beli Putus" : "Langganan"}
                              </Badge>
                              {course.licenseType === "langganan" && course.expiryDate && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  s/d {formatDate(course.expiryDate)}
                                </span>
                              )}
                            </div>
                            <h3 className="font-medium font-serif line-clamp-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {course.instructor} | {course.category}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {Math.floor(course.duration / 60)} Jam
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3.5 h-3.5" />
                                {course.sections.length} Bagian
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5" />
                                {course.enrollmentCount} Peserta
                              </span>
                              {course.status === "published" && (
                                <span className="flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 text-amber-500" />
                                  {course.rating}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2 shrink-0">
                            <CourseEditorSheet course={course} />
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Preview
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {course.status === "draft" && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(course.id, "published")}>
                                    <Play className="w-4 h-4 mr-2" />
                                    Publikasikan
                                  </DropdownMenuItem>
                                )}
                                {course.status === "published" && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(course.id, "draft")}>
                                    <Pause className="w-4 h-4 mr-2" />
                                    Unpublish
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplikasi
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <History className="w-4 h-4 mr-2" />
                                  Riwayat Versi
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Users className="w-4 h-4 mr-2" />
                                  Kelola Divisi
                                </DropdownMenuItem>
                                {course.status !== "archived" && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(course.id, "archived")}>
                                    <Archive className="w-4 h-4 mr-2" />
                                    Arsipkan
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
