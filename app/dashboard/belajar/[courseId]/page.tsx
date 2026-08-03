"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  FileText,
  Video,
  HelpCircle,
  Clock,
  RotateCcw,
  Award,
  AlertTriangle,
  Download,
  BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { dummyCourses, type ContentItem, type CourseSection } from "@/lib/data/courses"

// Quiz data
interface QuizQuestion {
  id: string
  type: "multiple_choice" | "fill_blank"
  question: string
  options?: string[]
  correctAnswer: string
  points: number
}

interface Quiz {
  id: string
  title: string
  type: "pre_test" | "post_test" | "section_quiz"
  duration: number // in minutes
  passingScore: number
  maxAttempts: number
  questions: QuizQuestion[]
}

const dummyQuizzes: Record<string, Quiz> = {
  "ITM004": {
    id: "QUIZ001",
    title: "Quiz: Identifikasi Bahaya",
    type: "section_quiz",
    duration: 15,
    passingScore: 70,
    maxAttempts: 3,
    questions: [
      {
        id: "Q1",
        type: "multiple_choice",
        question: "Apa yang dimaksud dengan bahaya fisik di tempat kerja?",
        options: [
          "Bahaya yang berhubungan dengan bahan kimia",
          "Bahaya yang dapat menyebabkan cedera fisik langsung",
          "Bahaya yang berhubungan dengan tekanan mental",
          "Bahaya yang disebabkan oleh virus dan bakteri"
        ],
        correctAnswer: "Bahaya yang dapat menyebabkan cedera fisik langsung",
        points: 20
      },
      {
        id: "Q2",
        type: "multiple_choice",
        question: "Contoh APD (Alat Pelindung Diri) yang tepat untuk melindungi kepala adalah?",
        options: [
          "Sarung tangan",
          "Kacamata safety",
          "Helm safety",
          "Sepatu safety"
        ],
        correctAnswer: "Helm safety",
        points: 20
      },
      {
        id: "Q3",
        type: "fill_blank",
        question: "Singkatan K3 dalam keselamatan kerja adalah Keselamatan dan Kesehatan ____",
        correctAnswer: "Kerja",
        points: 20
      },
      {
        id: "Q4",
        type: "multiple_choice",
        question: "Apa langkah pertama yang harus dilakukan saat menemukan potensi bahaya?",
        options: [
          "Mengabaikan karena bukan tanggung jawab kita",
          "Melaporkan kepada atasan atau petugas K3",
          "Mencoba memperbaiki sendiri",
          "Menunggu sampai terjadi kecelakaan"
        ],
        correctAnswer: "Melaporkan kepada atasan atau petugas K3",
        points: 20
      },
      {
        id: "Q5",
        type: "multiple_choice",
        question: "Warna apa yang digunakan untuk rambu larangan dalam K3?",
        options: [
          "Biru",
          "Hijau",
          "Merah",
          "Kuning"
        ],
        correctAnswer: "Merah",
        points: 20
      }
    ]
  },
  "ITM010": {
    id: "QUIZ002",
    title: "Quiz: Excel Functions",
    type: "section_quiz",
    duration: 20,
    passingScore: 75,
    maxAttempts: 2,
    questions: [
      {
        id: "Q1",
        type: "multiple_choice",
        question: "Fungsi Excel apa yang digunakan untuk mencari nilai secara vertikal?",
        options: ["HLOOKUP", "VLOOKUP", "INDEX", "MATCH"],
        correctAnswer: "VLOOKUP",
        points: 25
      },
      {
        id: "Q2",
        type: "fill_blank",
        question: "Fungsi ____ digunakan untuk menghitung jumlah sel yang berisi angka",
        correctAnswer: "COUNT",
        points: 25
      },
      {
        id: "Q3",
        type: "multiple_choice",
        question: "Untuk membuat referensi absolut dalam Excel, kita menggunakan simbol?",
        options: ["#", "$", "@", "&"],
        correctAnswer: "$",
        points: 25
      },
      {
        id: "Q4",
        type: "multiple_choice",
        question: "Pivot Table berguna untuk?",
        options: [
          "Membuat grafik saja",
          "Meringkas dan menganalisis data",
          "Menulis macro",
          "Menghapus data duplikat"
        ],
        correctAnswer: "Meringkas dan menganalisis data",
        points: 25
      }
    ]
  }
}

// Pre-test for course
const preTestQuiz: Quiz = {
  id: "PRETEST001",
  title: "Pre-Test: Pengenalan K3",
  type: "pre_test",
  duration: 10,
  passingScore: 0, // Pre-test doesn't need passing
  maxAttempts: 1,
  questions: [
    {
      id: "PT1",
      type: "multiple_choice",
      question: "Apakah Anda sudah pernah mengikuti pelatihan K3 sebelumnya?",
      options: ["Belum pernah", "1-2 kali", "3 kali atau lebih"],
      correctAnswer: "Belum pernah",
      points: 0
    },
    {
      id: "PT2",
      type: "multiple_choice",
      question: "Seberapa familiar Anda dengan istilah APD?",
      options: ["Tidak familiar", "Sedikit familiar", "Sangat familiar"],
      correctAnswer: "Sangat familiar",
      points: 0
    }
  ]
}

// Post-test for course
const postTestQuiz: Quiz = {
  id: "POSTTEST001",
  title: "Post-Test: Pengenalan K3",
  type: "post_test",
  duration: 20,
  passingScore: 80,
  maxAttempts: 3,
  questions: [
    {
      id: "PST1",
      type: "multiple_choice",
      question: "Tujuan utama dari K3 adalah?",
      options: [
        "Meningkatkan produktivitas saja",
        "Melindungi tenaga kerja dari kecelakaan dan penyakit akibat kerja",
        "Mengurangi biaya operasional",
        "Memenuhi syarat administratif"
      ],
      correctAnswer: "Melindungi tenaga kerja dari kecelakaan dan penyakit akibat kerja",
      points: 20
    },
    {
      id: "PST2",
      type: "multiple_choice",
      question: "Siapa yang bertanggung jawab terhadap K3 di tempat kerja?",
      options: [
        "Hanya manajemen",
        "Hanya petugas K3",
        "Semua pihak termasuk pekerja",
        "Hanya pemerintah"
      ],
      correctAnswer: "Semua pihak termasuk pekerja",
      points: 20
    },
    {
      id: "PST3",
      type: "fill_blank",
      question: "Tindakan pencegahan untuk mengurangi risiko bahaya disebut ____",
      correctAnswer: "mitigasi",
      points: 20
    },
    {
      id: "PST4",
      type: "multiple_choice",
      question: "Apa yang harus dilakukan sebelum memulai pekerjaan berbahaya?",
      options: [
        "Langsung bekerja saja",
        "Melakukan risk assessment",
        "Menunggu instruksi atasan",
        "Tidak perlu persiapan"
      ],
      correctAnswer: "Melakukan risk assessment",
      points: 20
    },
    {
      id: "PST5",
      type: "multiple_choice",
      question: "Hierarki pengendalian risiko yang paling efektif adalah?",
      options: [
        "Penggunaan APD",
        "Pengendalian administratif",
        "Eliminasi bahaya",
        "Pengendalian engineering"
      ],
      correctAnswer: "Eliminasi bahaya",
      points: 20
    }
  ]
}

export default function ELearningPlayerPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.courseId as string
  
  const course = dummyCourses.find(c => c.id === courseId)
  
  const [currentSection, setCurrentSection] = useState(0)
  const [currentItem, setCurrentItem] = useState(0)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [completedItems, setCompletedItems] = useState<string[]>(["ITM001"])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  
  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showPreTest, setShowPreTest] = useState(false)
  const [showPostTest, setShowPostTest] = useState(false)
  const [preTestCompleted, setPreTestCompleted] = useState(true) // Assuming pre-test done
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  const [showCertificateEarned, setShowCertificateEarned] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6">
          <p className="text-muted-foreground">Pelatihan tidak ditemukan</p>
          <Button className="mt-4" onClick={() => router.push('/dashboard/pelatihan')}>
            Kembali ke Pelatihan Saya
          </Button>
        </Card>
      </div>
    )
  }
  
  const allItems = course.sections.flatMap(s => s.items)
  const currentContent = course.sections[currentSection]?.items[currentItem]
  const overallProgress = Math.round((completedItems.length / allItems.length) * 100)
  
  useEffect(() => {
    if (course.sections.length > 0) {
      setExpandedSections([course.sections[0].id])
    }
  }, [course.sections])
  
  // Timer for quiz
  useEffect(() => {
    if (showQuiz && currentQuiz && timeRemaining > 0 && !quizSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [showQuiz, currentQuiz, quizSubmitted])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }
  
  const handleSelectItem = (sectionIndex: number, itemIndex: number) => {
    const item = course.sections[sectionIndex].items[itemIndex]
    
    if (item.type === "quiz") {
      const quiz = dummyQuizzes[item.id]
      if (quiz) {
        setCurrentQuiz(quiz)
        setTimeRemaining(quiz.duration * 60)
        setQuizAnswers({})
        setQuizSubmitted(false)
        setQuizScore(0)
        setCurrentQuestionIndex(0)
        setShowQuiz(true)
      }
    } else {
      setCurrentSection(sectionIndex)
      setCurrentItem(itemIndex)
    }
  }
  
  const markAsComplete = () => {
    if (currentContent && !completedItems.includes(currentContent.id)) {
      setCompletedItems(prev => [...prev, currentContent.id])
    }
    
    // Move to next item
    const currentSectionItems = course.sections[currentSection].items
    if (currentItem < currentSectionItems.length - 1) {
      setCurrentItem(currentItem + 1)
    } else if (currentSection < course.sections.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentItem(0)
      setExpandedSections(prev => [...prev, course.sections[currentSection + 1].id])
    } else {
      // Course completed
      if (completedItems.length + 1 >= allItems.length) {
        setShowCompletionDialog(true)
      }
    }
  }
  
  const handleSubmitQuiz = () => {
    if (!currentQuiz) return
    
    let score = 0
    let totalPoints = 0
    
    currentQuiz.questions.forEach(q => {
      totalPoints += q.points
      const userAnswer = quizAnswers[q.id]?.toLowerCase().trim()
      const correctAnswer = q.correctAnswer.toLowerCase().trim()
      
      if (userAnswer === correctAnswer) {
        score += q.points
      }
    })
    
    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0
    setQuizScore(percentage)
    setQuizSubmitted(true)
    
    if (timerRef.current) clearInterval(timerRef.current)
    
    // If passed, mark quiz as complete
    if (percentage >= currentQuiz.passingScore) {
      const quizItem = allItems.find(item => dummyQuizzes[item.id]?.id === currentQuiz.id)
      if (quizItem && !completedItems.includes(quizItem.id)) {
        setCompletedItems(prev => [...prev, quizItem.id])
      }
    }
  }
  
  const handleStartPostTest = () => {
    setCurrentQuiz(postTestQuiz)
    setTimeRemaining(postTestQuiz.duration * 60)
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
    setCurrentQuestionIndex(0)
    setShowPostTest(true)
    setShowCompletionDialog(false)
  }
  
  const handlePostTestComplete = () => {
    setShowPostTest(false)
    if (quizScore >= postTestQuiz.passingScore) {
      setShowCertificateEarned(true)
    }
  }
  
  const getContentIcon = (type: ContentItem["type"]) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />
      case "pdf": return <FileText className="w-4 h-4" />
      case "quiz": return <HelpCircle className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-4">
        <Link href="/dashboard/pelatihan" aria-label="Kembali ke Pelatihan Saya">
          <Button variant="ghost" size="icon" aria-hidden="true" tabIndex={-1}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-serif font-semibold text-foreground truncate">{course.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Progress:</span>
            <Progress value={overallProgress} className="w-24 h-2" />
            <span className="text-sm font-medium text-secondary">{overallProgress}%</span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video/Content Player */}
          <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
            {currentContent?.type === "video" ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-4 mx-auto">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{currentContent.title}</h2>
                    <p className="text-white/70">Durasi: {currentContent.duration} menit</p>
                  </div>
                </div>
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="mb-2">
                    <Progress value={videoProgress} className="h-1 bg-white/30" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                        aria-label={isPlaying ? "Jeda video" : "Putar video"}
                      >
                        {isPlaying ? <Pause aria-hidden="true" className="w-5 h-5" /> : <Play aria-hidden="true" className="w-5 h-5" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                        aria-label={isMuted ? "Nyalakan suara" : "Bisukan suara"}
                        aria-pressed={isMuted}
                      >
                        {isMuted ? <VolumeX aria-hidden="true" className="w-5 h-5" /> : <Volume2 aria-hidden="true" className="w-5 h-5" />}
                      </Button>
                      <span className="text-white text-sm">00:00 / {currentContent.duration}:00</span>
                    </div>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" aria-label="Layar penuh">
                      <Maximize aria-hidden="true" className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : currentContent?.type === "pdf" ? (
              <div className="flex flex-col items-center justify-center text-white">
                <FileText className="w-24 h-24 mb-4 text-white/70" />
                <h2 className="text-xl font-semibold mb-2">{currentContent.title}</h2>
                <p className="text-white/70 mb-6">Durasi baca: {currentContent.duration} menit</p>
                <div className="flex gap-3">
                  <Button className="bg-secondary hover:bg-secondary/90">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Buka Dokumen
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Unduh PDF
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-white">
                <BookOpen className="w-24 h-24 mb-4 mx-auto text-white/70" />
                <p>Pilih materi dari daftar konten</p>
              </div>
            )}
          </div>
          
          {/* Content Controls */}
          <div className="h-16 border-t border-border bg-card flex items-center justify-between px-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Bagian {currentSection + 1} dari {course.sections.length}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {completedItems.includes(currentContent?.id || "") ? (
                <Badge className="bg-success/10 text-success border-0">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Selesai
                </Badge>
              ) : (
                <Button 
                  onClick={markAsComplete}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  Tandai Selesai & Lanjut
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar - Course Content List */}
        <div className="w-80 border-l border-border bg-card overflow-y-auto">
          {/* Learning Path Section */}
          <div className="p-4 border-b border-border">
            <h3 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learning Path
            </h3>
            <div className="space-y-2">
              {course.sections.map((section, idx) => (
                <div key={section.id} className="flex items-center gap-2 text-xs">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white",
                      section.items.every(item => completedItems.includes(item.id))
                        ? "bg-success"
                        : "bg-secondary"
                    )}>
                      {section.items.every(item => completedItems.includes(item.id))
                        ? <CheckCircle2 className="w-3 h-3" />
                        : idx + 1
                      }
                    </div>
                    {idx < course.sections.length - 1 && (
                      <div className="w-0.5 h-3 bg-border mt-1" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{section.title}</p>
                    <p className="text-muted-foreground">{section.items.length} materi</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daftar Materi Section */}
          <div className="p-4 border-b border-border">
            <h3 className="font-serif font-semibold text-foreground">Daftar Materi</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {completedItems.length} dari {allItems.length} materi selesai
            </p>
          </div>
          
          <div className="divide-y divide-border">
            {course.sections.map((section, sectionIndex) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                      section.items.every(item => completedItems.includes(item.id))
                        ? "bg-success text-white"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {section.items.every(item => completedItems.includes(item.id)) 
                        ? <CheckCircle2 className="w-4 h-4" />
                        : sectionIndex + 1
                      }
                    </div>
                    <span className="font-medium text-sm text-foreground">{section.title}</span>
                  </div>
                  {expandedSections.includes(section.id) 
                    ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  }
                </button>
                
                {expandedSections.includes(section.id) && (
                  <div className="pb-2">
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectItem(sectionIndex, itemIndex)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 pl-14 text-left transition-colors",
                          currentSection === sectionIndex && currentItem === itemIndex
                            ? "bg-secondary/10 border-l-2 border-secondary"
                            : "hover:bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "flex-shrink-0",
                          completedItems.includes(item.id) ? "text-success" : "text-muted-foreground"
                        )}>
                          {completedItems.includes(item.id) 
                            ? <CheckCircle2 className="w-4 h-4" />
                            : getContentIcon(item.type)
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm truncate",
                            completedItems.includes(item.id) ? "text-muted-foreground" : "text-foreground"
                          )}>
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.duration} menit</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Assessment Pelatihan Section */}
          <div className="p-4 border-t border-border">
            <h4 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-orange-600" />
              Assessment Pelatihan
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span>Pre-Assessment (0-10%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span>Mid-Assessment (40-50%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-orange-50 rounded">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span>Final Assessment (80-90%)</span>
              </div>
            </div>
          </div>

          {/* Final Project Section */}
          <div className="p-4 border-t border-border">
            <h4 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              Final Project
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-purple-50 rounded">
                <p className="font-medium text-foreground">Tipe:</p>
                <p className="text-muted-foreground">Proyek Individu / Kelompok</p>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <p className="font-medium text-foreground">Durasi:</p>
                <p className="text-muted-foreground">2-4 minggu</p>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <p className="font-medium text-foreground">Bobot:</p>
                <p className="text-muted-foreground">30% dari nilai akhir</p>
              </div>
            </div>
          </div>
          
          {/* Post-Test Button */}
          {overallProgress === 100 && (
            <div className="p-4 border-t border-border">
              <Button 
                onClick={handleStartPostTest}
                className="w-full bg-accent text-white hover:bg-accent/90"
              >
                <Award className="w-4 h-4 mr-2" />
                Mulai Post-Test
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Quiz Dialog */}
      <Dialog open={showQuiz || showPostTest} onOpenChange={(open) => {
        if (!open && !quizSubmitted) {
          // Confirm before closing
        } else if (!open) {
          setShowQuiz(false)
          setShowPostTest(false)
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif flex items-center justify-between">
              <span>{currentQuiz?.title}</span>
              {!quizSubmitted && (
                <Badge variant="outline" className={cn(
                  "font-mono",
                  timeRemaining < 60 ? "text-destructive border-destructive" : ""
                )}>
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTime(timeRemaining)}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              {quizSubmitted 
                ? `Nilai Anda: ${quizScore}% ${quizScore >= (currentQuiz?.passingScore || 0) ? "- Lulus!" : "- Belum Lulus"}`
                : `Skor kelulusan: ${currentQuiz?.passingScore}% | Kesempatan: ${currentQuiz?.maxAttempts}x`
              }
            </DialogDescription>
          </DialogHeader>
          
          {!quizSubmitted ? (
            <div className="py-4">
              {currentQuiz && currentQuiz.questions.map((question, qIndex) => (
                <div key={question.id} className="mb-6 pb-6 border-b border-border last:border-0">
                  <p className="font-medium mb-3">
                    {qIndex + 1}. {question.question}
                  </p>
                  
                  {question.type === "multiple_choice" ? (
                    <RadioGroup
                      value={quizAnswers[question.id] || ""}
                      onValueChange={(value) => setQuizAnswers(prev => ({
                        ...prev,
                        [question.id]: value
                      }))}
                    >
                      {question.options?.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center space-x-2 py-2">
                          <RadioGroupItem value={option} id={`${question.id}-${oIndex}`} />
                          <Label htmlFor={`${question.id}-${oIndex}`} className="cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <Input
                      placeholder="Ketik jawaban Anda"
                      value={quizAnswers[question.id] || ""}
                      onChange={(e) => setQuizAnswers(prev => ({
                        ...prev,
                        [question.id]: e.target.value
                      }))}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6">
              <div className={cn(
                "text-center p-6 rounded-lg mb-6",
                quizScore >= (currentQuiz?.passingScore || 0) 
                  ? "bg-success/10" 
                  : "bg-destructive/10"
              )}>
                <div className={cn(
                  "text-5xl font-bold font-serif mb-2",
                  quizScore >= (currentQuiz?.passingScore || 0) 
                    ? "text-success" 
                    : "text-destructive"
                )}>
                  {quizScore}%
                </div>
                <p className={cn(
                  "font-medium",
                  quizScore >= (currentQuiz?.passingScore || 0) 
                    ? "text-success" 
                    : "text-destructive"
                )}>
                  {quizScore >= (currentQuiz?.passingScore || 0) 
                    ? "Selamat! Anda lulus quiz ini" 
                    : "Maaf, Anda belum mencapai nilai minimum"
                  }
                </p>
              </div>
              
              {/* Answer Review */}
              <div className="space-y-4">
                <h4 className="font-medium">Review Jawaban:</h4>
                {currentQuiz?.questions.map((question, qIndex) => {
                  const userAnswer = quizAnswers[question.id]?.toLowerCase().trim()
                  const isCorrect = userAnswer === question.correctAnswer.toLowerCase().trim()
                  
                  return (
                    <div key={question.id} className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium mb-1">{qIndex + 1}. {question.question}</p>
                      <p className="text-sm">
                        Jawaban Anda: <span className={isCorrect ? "text-success" : "text-destructive"}>
                          {quizAnswers[question.id] || "(tidak dijawab)"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-success">
                          Jawaban benar: {question.correctAnswer}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          
          <DialogFooter>
            {!quizSubmitted ? (
              <Button onClick={handleSubmitQuiz} className="bg-secondary hover:bg-secondary/90">
                Kumpulkan Jawaban
              </Button>
            ) : showPostTest ? (
              <Button onClick={handlePostTestComplete} className="bg-secondary hover:bg-secondary/90">
                {quizScore >= (currentQuiz?.passingScore || 0) ? "Lihat Sertifikat" : "Tutup"}
              </Button>
            ) : (
              <Button onClick={() => setShowQuiz(false)}>
                Tutup
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Course Completion Dialog */}
      <AlertDialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif flex items-center gap-2">
              <Award className="w-6 h-6 text-accent" />
              Selamat! Anda Menyelesaikan Materi
            </AlertDialogTitle>
            <AlertDialogDescription>
              Anda telah menyelesaikan semua materi dalam pelatihan ini. 
              Untuk mendapatkan sertifikat, silakan selesaikan Post-Test dengan nilai minimum 80%.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Nanti Saja</AlertDialogCancel>
            <AlertDialogAction onClick={handleStartPostTest} className="bg-secondary hover:bg-secondary/90">
              Mulai Post-Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Certificate Earned Dialog */}
      <Dialog open={showCertificateEarned} onOpenChange={setShowCertificateEarned}>
        <DialogContent className="text-center">
          <DialogHeader>
            <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <Award className="w-10 h-10 text-success" />
            </div>
            <DialogTitle className="font-serif text-2xl">Sertifikat Diterbitkan!</DialogTitle>
            <DialogDescription className="text-base">
              Selamat! Anda telah berhasil menyelesaikan pelatihan &quot;{course.title}&quot; 
              dan lulus Post-Test dengan nilai {quizScore}%.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="p-4 bg-muted rounded-lg text-left">
              <p className="text-sm text-muted-foreground">Nomor Sertifikat:</p>
              <p className="font-mono font-medium">LMSPID-2024-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowCertificateEarned(false)}>
              Tutup
            </Button>
            <Button 
              className="bg-secondary hover:bg-secondary/90"
              onClick={() => router.push('/dashboard/sertifikat')}
            >
              <Download className="w-4 h-4 mr-2" />
              Lihat Sertifikat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
