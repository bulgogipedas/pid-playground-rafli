// Training Request and Approval Workflow Data for Pyridam Learning

export type ApprovalLevel = "atasan_langsung" | "kepala_divisi" | "sdm_admin"
export type RequestStatus = 
  | "draft" 
  | "pending_l1" 
  | "pending_l2" 
  | "pending_l3" 
  | "approved" 
  | "rejected" 
  | "revision"
export type SkillType = "hard_skill" | "soft_skill"
export type TrainingType = "internal" | "external_online" | "external_offline"

export interface TrainingRequest {
  id: string
  employeeId: string
  employeeName: string
  employeeNik: string
  division: string
  jobFamily: string
  
  // Training Details
  trainingName: string
  trainingDescription: string
  vendor: string
  skillType: SkillType
  trainingType: TrainingType
  estimatedCost: number
  currency: string
  rationale: string
  competencyGap?: string // From TNA
  
  // Schedule
  startDate: string
  endDate: string
  duration: number // in days
  learningHours: number
  
  // Workflow
  status: RequestStatus
  currentLevel: ApprovalLevel
  createdAt: string
  updatedAt: string
  
  // Approval History
  approvals: ApprovalRecord[]
  
  // Files
  attachments: Attachment[]
}

export interface ApprovalRecord {
  id: string
  level: ApprovalLevel
  approverId: string
  approverName: string
  action: "approve" | "reject" | "revision"
  comment: string
  timestamp: string
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "approval" | "rejection" | "revision" | "reminder" | "info"
  relatedId?: string
  relatedType?: "training_request" | "course" | "deadline"
  isRead: boolean
  createdAt: string
}

// Status labels
export const statusLabels: Record<RequestStatus, string> = {
  draft: "Draf",
  pending_l1: "Menunggu Atasan Langsung",
  pending_l2: "Menunggu Kepala Divisi",
  pending_l3: "Menunggu Admin SDM",
  approved: "Disetujui",
  rejected: "Ditolak",
  revision: "Perlu Revisi",
}

export const statusColors: Record<RequestStatus, string> = {
  draft: "bg-gray-100 text-gray-700",
  pending_l1: "bg-amber-100 text-amber-700",
  pending_l2: "bg-amber-100 text-amber-700",
  pending_l3: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
  revision: "bg-blue-100 text-blue-700",
}

export const levelLabels: Record<ApprovalLevel, string> = {
  atasan_langsung: "Atasan Langsung",
  kepala_divisi: "Kepala Divisi",
  sdm_admin: "Admin SDM",
}

export const skillTypeLabels: Record<SkillType, string> = {
  hard_skill: "Hard Skill",
  soft_skill: "Soft Skill",
}

export const trainingTypeLabels: Record<TrainingType, string> = {
  internal: "Internal",
  external_online: "Eksternal Online",
  external_offline: "Eksternal Offline",
}

// Dummy training requests
export const dummyTrainingRequests: TrainingRequest[] = [
  {
    id: "REQ-PY-001",
    employeeId: "USR001",
    employeeName: "Budi Santoso",
    employeeNik: "PYFA-2020-001",
    division: "Teknologi Informasi",
    jobFamily: "IT Operations",
    trainingName: "Python Dasar untuk Pemula",
    trainingDescription: "Learning path internal untuk memahami dasar Python dan otomasi pekerjaan sederhana.",
    vendor: "Pyridam Learning",
    skillType: "hard_skill",
    trainingType: "internal",
    estimatedCost: 0,
    currency: "IDR",
    rationale: "Meningkatkan kemampuan otomasi pekerjaan dan pengolahan data sederhana.",
    competencyGap: "Programming Fundamentals",
    startDate: "2026-08-04",
    endDate: "2026-09-03",
    duration: 30,
    learningHours: 12,
    status: "pending_l1",
    currentLevel: "atasan_langsung",
    createdAt: "2026-08-04T08:00:00",
    updatedAt: "2026-08-04T08:00:00",
    approvals: [],
    attachments: [],
  },
  {
    id: "REQ001",
    employeeId: "USR001",
    employeeName: "Budi Santoso",
    employeeNik: "PYFA-2020-001",
    division: "Teknologi Informasi",
    jobFamily: "IT Operations",
    trainingName: "AWS Solutions Architect Associate",
    trainingDescription: "Sertifikasi AWS untuk arsitektur cloud computing dan deployment aplikasi di lingkungan AWS.",
    vendor: "Amazon Web Services",
    skillType: "hard_skill",
    trainingType: "external_online",
    estimatedCost: 15000000,
    currency: "IDR",
    rationale: "Diperlukan untuk mendukung migrasi infrastruktur perusahaan ke cloud AWS yang direncanakan tahun ini.",
    competencyGap: "Cloud Computing",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    duration: 3,
    learningHours: 24,
    status: "pending_l2",
    currentLevel: "kepala_divisi",
    createdAt: "2024-01-10T08:00:00",
    updatedAt: "2024-01-12T10:30:00",
    approvals: [
      {
        id: "APR001",
        level: "atasan_langsung",
        approverId: "USR003",
        approverName: "Hendra Kusuma",
        action: "approve",
        comment: "Disetujui. Pelatihan ini relevan dengan kebutuhan tim dan proyek migrasi cloud.",
        timestamp: "2024-01-12T10:30:00",
      },
    ],
    attachments: [
      {
        id: "ATT001",
        name: "AWS_Course_Outline.pdf",
        type: "application/pdf",
        size: 245000,
        url: "/attachments/aws_outline.pdf",
      },
    ],
  },
  {
    id: "REQ002",
    employeeId: "USR001",
    employeeName: "Budi Santoso",
    employeeNik: "PYFA-2020-001",
    division: "Teknologi Informasi",
    jobFamily: "IT Operations",
    trainingName: "Certified Kubernetes Administrator (CKA)",
    trainingDescription: "Sertifikasi CKA untuk pengelolaan container orchestration dengan Kubernetes.",
    vendor: "Linux Foundation",
    skillType: "hard_skill",
    trainingType: "external_online",
    estimatedCost: 12000000,
    currency: "IDR",
    rationale: "Perusahaan berencana mengadopsi Kubernetes untuk container management.",
    competencyGap: "Container Technology",
    startDate: "2024-03-10",
    endDate: "2024-03-12",
    duration: 3,
    learningHours: 24,
    status: "pending_l1",
    currentLevel: "atasan_langsung",
    createdAt: "2024-01-14T09:00:00",
    updatedAt: "2024-01-14T09:00:00",
    approvals: [],
    attachments: [],
  },
  {
    id: "REQ003",
    employeeId: "USR005",
    employeeName: "Rina Wati",
    employeeNik: "PYFA-2019-015",
    division: "Keuangan",
    jobFamily: "Finance",
    trainingName: "Certified Public Accountant (CPA) Preparation",
    trainingDescription: "Program persiapan ujian CPA untuk meningkatkan kompetensi akuntansi profesional.",
    vendor: "Institut Akuntan Publik Indonesia",
    skillType: "hard_skill",
    trainingType: "external_offline",
    estimatedCost: 25000000,
    currency: "IDR",
    rationale: "Untuk memenuhi persyaratan audit internal dan meningkatkan kualitas pelaporan keuangan.",
    competencyGap: "Financial Reporting",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    duration: 30,
    learningHours: 120,
    status: "approved",
    currentLevel: "sdm_admin",
    createdAt: "2023-12-01T08:00:00",
    updatedAt: "2024-01-05T14:00:00",
    approvals: [
      {
        id: "APR002",
        level: "atasan_langsung",
        approverId: "USR006",
        approverName: "Siti Aminah",
        action: "approve",
        comment: "Disetujui untuk pengembangan kompetensi tim finance.",
        timestamp: "2023-12-05T10:00:00",
      },
      {
        id: "APR003",
        level: "kepala_divisi",
        approverId: "USR007",
        approverName: "Ahmad Budiman",
        action: "approve",
        comment: "Sesuai dengan rencana pengembangan SDM divisi keuangan.",
        timestamp: "2023-12-10T14:00:00",
      },
      {
        id: "APR004",
        level: "sdm_admin",
        approverId: "USR008",
        approverName: "Siti Rahayu",
        action: "approve",
        comment: "Budget tersedia. Disetujui.",
        timestamp: "2024-01-05T14:00:00",
      },
    ],
    attachments: [],
  },
  {
    id: "REQ004",
    employeeId: "USR009",
    employeeName: "Dian Purnama",
    employeeNik: "PYFA-2021-022",
    division: "Pemasaran",
    jobFamily: "Marketing",
    trainingName: "Google Analytics Advanced",
    trainingDescription: "Pelatihan Google Analytics tingkat lanjut untuk analisis digital marketing.",
    vendor: "Google",
    skillType: "hard_skill",
    trainingType: "external_online",
    estimatedCost: 5000000,
    currency: "IDR",
    rationale: "Diperlukan untuk meningkatkan efektivitas kampanye digital marketing.",
    startDate: "2024-02-01",
    endDate: "2024-02-03",
    duration: 3,
    learningHours: 16,
    status: "rejected",
    currentLevel: "atasan_langsung",
    createdAt: "2024-01-08T10:00:00",
    updatedAt: "2024-01-10T11:00:00",
    approvals: [
      {
        id: "APR005",
        level: "atasan_langsung",
        approverId: "USR010",
        approverName: "Bambang Wijaya",
        action: "reject",
        comment: "Mohon tunda dulu. Pelatihan serupa sudah dijadwalkan untuk Q3.",
        timestamp: "2024-01-10T11:00:00",
      },
    ],
    attachments: [],
  },
  {
    id: "REQ005",
    employeeId: "USR011",
    employeeName: "Eko Prasetyo",
    employeeNik: "PYFA-2018-008",
    division: "Operasi",
    jobFamily: "Operations",
    trainingName: "Six Sigma Green Belt",
    trainingDescription: "Sertifikasi Six Sigma untuk peningkatan kualitas dan efisiensi proses.",
    vendor: "ASQ Indonesia",
    skillType: "hard_skill",
    trainingType: "external_offline",
    estimatedCost: 18000000,
    currency: "IDR",
    rationale: "Untuk mendukung program continuous improvement di divisi operasi.",
    competencyGap: "Process Improvement",
    startDate: "2024-03-01",
    endDate: "2024-03-10",
    duration: 10,
    learningHours: 40,
    status: "revision",
    currentLevel: "atasan_langsung",
    createdAt: "2024-01-05T09:00:00",
    updatedAt: "2024-01-08T15:00:00",
    approvals: [
      {
        id: "APR006",
        level: "atasan_langsung",
        approverId: "USR012",
        approverName: "Agus Salim",
        action: "revision",
        comment: "Mohon lengkapi dengan surat penugasan dari HCIS dan penjelasan lebih detail tentang manfaat bagi tim.",
        timestamp: "2024-01-08T15:00:00",
      },
    ],
    attachments: [],
  },
  {
    id: "REQ006",
    employeeId: "USR013",
    employeeName: "Nurul Hidayah",
    employeeNik: "PYFA-2020-033",
    division: "Sumber Daya Manusia",
    jobFamily: "HR Management",
    trainingName: "HR Analytics & People Data",
    trainingDescription: "Pelatihan analisis data HR untuk pengambilan keputusan berbasis data.",
    vendor: "Udemy Business",
    skillType: "hard_skill",
    trainingType: "external_online",
    estimatedCost: 3500000,
    currency: "IDR",
    rationale: "Untuk meningkatkan kemampuan analisis data SDM dan mendukung transformasi digital HR.",
    startDate: "2024-02-20",
    endDate: "2024-02-25",
    duration: 5,
    learningHours: 20,
    status: "pending_l3",
    currentLevel: "sdm_admin",
    createdAt: "2024-01-07T08:00:00",
    updatedAt: "2024-01-13T16:00:00",
    approvals: [
      {
        id: "APR007",
        level: "atasan_langsung",
        approverId: "USR014",
        approverName: "Maya Dewi",
        action: "approve",
        comment: "Disetujui. Sangat relevan dengan kebutuhan tim.",
        timestamp: "2024-01-09T10:00:00",
      },
      {
        id: "APR008",
        level: "kepala_divisi",
        approverId: "USR015",
        approverName: "Hadi Santoso",
        action: "approve",
        comment: "Sesuai dengan roadmap transformasi digital HR.",
        timestamp: "2024-01-13T16:00:00",
      },
    ],
    attachments: [],
  },
  {
    id: "REQ007",
    employeeId: "USR016",
    employeeName: "Fajar Nugroho",
    employeeNik: "PYFA-2019-044",
    division: "Teknologi Informasi",
    jobFamily: "IT Development",
    trainingName: "React & Next.js Advanced Development",
    trainingDescription: "Pelatihan pengembangan web modern dengan React dan Next.js.",
    vendor: "Dicoding Indonesia",
    skillType: "hard_skill",
    trainingType: "external_online",
    estimatedCost: 7500000,
    currency: "IDR",
    rationale: "Untuk mendukung modernisasi aplikasi internal perusahaan.",
    competencyGap: "Web Development",
    startDate: "2024-02-10",
    endDate: "2024-02-14",
    duration: 5,
    learningHours: 30,
    status: "pending_l1",
    currentLevel: "atasan_langsung",
    createdAt: "2024-01-15T08:30:00",
    updatedAt: "2024-01-15T08:30:00",
    approvals: [],
    attachments: [],
  },
]

// Dummy notifications
export const dummyNotifications: Notification[] = [
  {
    id: "NOT001",
    userId: "USR001",
    title: "Pengajuan Disetujui L1",
    message: "Pengajuan pelatihan AWS Solutions Architect telah disetujui oleh atasan langsung.",
    type: "approval",
    relatedId: "REQ001",
    relatedType: "training_request",
    isRead: false,
    createdAt: "2024-01-12T10:30:00",
  },
  {
    id: "NOT002",
    userId: "USR001",
    title: "Deadline Pelatihan",
    message: "Pelatihan Cybersecurity Awareness akan berakhir dalam 3 hari.",
    type: "reminder",
    relatedId: "CRS006",
    relatedType: "deadline",
    isRead: false,
    createdAt: "2024-01-15T08:00:00",
  },
  {
    id: "NOT003",
    userId: "USR001",
    title: "Pelatihan Wajib Baru",
    message: "Anda telah didaftarkan ke pelatihan wajib: Kepemimpinan Efektif untuk Supervisor.",
    type: "info",
    relatedId: "CRS002",
    relatedType: "course",
    isRead: true,
    createdAt: "2024-01-10T09:00:00",
  },
  {
    id: "NOT004",
    userId: "USR003",
    title: "Pengajuan Baru Perlu Persetujuan",
    message: "Pengajuan pelatihan Certified Kubernetes Administrator dari Budi Santoso menunggu persetujuan Anda.",
    type: "approval",
    relatedId: "REQ002",
    relatedType: "training_request",
    isRead: false,
    createdAt: "2024-01-14T09:00:00",
  },
  {
    id: "NOT005",
    userId: "USR008",
    title: "Pengajuan Perlu Persetujuan Final",
    message: "Pengajuan pelatihan HR Analytics dari Nurul Hidayah menunggu persetujuan final Anda.",
    type: "approval",
    relatedId: "REQ006",
    relatedType: "training_request",
    isRead: false,
    createdAt: "2024-01-13T16:00:00",
  },
]

// Mandatory training programs (auto-enrolled soft skills)
export interface MandatoryProgram {
  id: string
  name: string
  description: string
  courseIds: string[]
  targetJobFamilies: string[]
  startDate: string
  endDate: string
  enrolledCount: number
  completedCount: number
  status: "active" | "scheduled" | "completed"
}

export const dummyMandatoryPrograms: MandatoryProgram[] = [
  {
    id: "MPR001",
    name: "Program Orientasi Karyawan Baru 2024",
    description: "Program onboarding komprehensif untuk seluruh karyawan baru.",
    courseIds: ["CRS001", "CRS004"],
    targetJobFamilies: ["IT Operations", "Operations", "Finance", "Marketing", "HR Management", "Legal"],
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    enrolledCount: 45,
    completedCount: 32,
    status: "active",
  },
  {
    id: "MPR002",
    name: "Program Pengembangan Supervisor 2024",
    description: "Program mandatory untuk seluruh supervisor dan manager.",
    courseIds: ["CRS002"],
    targetJobFamilies: ["Operations Management", "IT Management", "HR Management", "Finance Management"],
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    enrolledCount: 28,
    completedCount: 12,
    status: "active",
  },
]

// Format currency
export function formatCurrency(amount: number, currency: string = "IDR"): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Format datetime
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
