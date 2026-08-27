// Dummy course and training data for Pyridam Learning

export type CourseStatus = "belum_mulai" | "sedang_berjalan" | "selesai"
export type CourseType = "wajib" | "pilihan"
export type TrainingMethod = "e_learning" | "in_house" | "public_online" | "public_offline"
export type ContentType = "video" | "pdf" | "scorm" | "quiz"

export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: number // in minutes
  type: CourseType
  method: TrainingMethod
  category: string
  jobFamilies: string[]
  instructor: string
  sections: CourseSection[]
  createdAt: string
  status: "draft" | "published" | "archived"
  enrollmentCount: number
  completionRate: number
  rating: number
  licenseType: "beli_putus" | "langganan"
  expiryDate?: string
}

export interface CourseSection {
  id: string
  title: string
  items: ContentItem[]
}

export interface ContentItem {
  id: string
  title: string
  type: ContentType
  duration: number // in minutes
  url?: string
}

export interface Enrollment {
  id: string
  courseId: string
  userId: string
  progress: number
  status: CourseStatus
  startedAt: string
  completedAt?: string
  deadline?: string
  certificateId?: string
  lastAccessedAt: string
  sectionsProgress: Record<string, number>
}

export interface Certificate {
  id: string
  courseId: string
  courseName: string
  userId: string
  userName: string
  issuedAt: string
  expiresAt?: string
  certificateNumber: string
  qrCode: string
  digitalSignature: string
  learningHours: number
  type: "internal" | "external"
  skillType?: string
  trainingMaterial?: string
}

// Dummy courses
export const dummyCourses: Course[] = [
  {
    id: "CRS001",
    title: "Pengenalan Keselamatan dan Kesehatan Kerja (K3)",
    description: "Pelatihan wajib tentang dasar-dasar K3 untuk seluruh karyawan PT Pyridam Farma Tbk.",
    thumbnail: "/course-covers/k3.jpg",
    duration: 120,
    type: "wajib",
    method: "e_learning",
    category: "Keselamatan Kerja",
    jobFamilies: ["IT Operations", "Operations", "Finance", "Marketing"],
    instructor: "Dewi Lestari",
    sections: [
      {
        id: "SEC001",
        title: "Pengantar K3",
        items: [
          { id: "ITM001", title: "Video: Apa itu K3?", type: "video", duration: 15 },
          { id: "ITM002", title: "PDF: Regulasi K3 di Indonesia", type: "pdf", duration: 20 },
        ],
      },
      {
        id: "SEC002",
        title: "Identifikasi Bahaya",
        items: [
          { id: "ITM003", title: "Video: Mengenali Bahaya di Tempat Kerja", type: "video", duration: 25 },
          { id: "ITM004", title: "Quiz: Identifikasi Bahaya", type: "quiz", duration: 15 },
        ],
      },
    ],
    createdAt: "2023-06-01",
    status: "published",
    enrollmentCount: 450,
    completionRate: 85,
    rating: 4.5,
    licenseType: "beli_putus",
  },
  {
    id: "CRS002",
    title: "Kepemimpinan Efektif untuk Supervisor",
    description: "Program pengembangan kompetensi kepemimpinan untuk level supervisor dan manager.",
    thumbnail: "/course-covers/leadership.jpg",
    duration: 240,
    type: "wajib",
    method: "in_house",
    category: "Soft Skill",
    jobFamilies: ["Operations Management", "IT Management", "HR Management"],
    instructor: "Bambang Suryadi",
    sections: [
      {
        id: "SEC003",
        title: "Dasar Kepemimpinan",
        items: [
          { id: "ITM005", title: "Video: Gaya Kepemimpinan", type: "video", duration: 30 },
          { id: "ITM006", title: "PDF: Studi Kasus Kepemimpinan", type: "pdf", duration: 45 },
        ],
      },
    ],
    createdAt: "2023-08-15",
    status: "published",
    enrollmentCount: 120,
    completionRate: 72,
    rating: 4.8,
    licenseType: "beli_putus",
  },
  {
    id: "CRS003",
    title: "Microsoft Excel Advanced untuk Profesional",
    description: "Pelatihan tingkat lanjut Excel dengan fokus pada analisis data dan automation.",
    thumbnail: "/course-covers/excel-data.jpg",
    duration: 180,
    type: "pilihan",
    method: "e_learning",
    category: "Technical Skill",
    jobFamilies: ["Finance", "HR Management", "Operations"],
    instructor: "Fajar Rahman",
    sections: [
      {
        id: "SEC004",
        title: "Fungsi Lanjutan",
        items: [
          { id: "ITM007", title: "Video: VLOOKUP & HLOOKUP", type: "video", duration: 20 },
          { id: "ITM008", title: "Video: Pivot Table Mastery", type: "video", duration: 25 },
        ],
      },
      {
        id: "SEC005",
        title: "Macro & VBA",
        items: [
          { id: "ITM009", title: "Video: Introduction to Macro", type: "video", duration: 30 },
          { id: "ITM010", title: "Quiz: Excel Functions", type: "quiz", duration: 20 },
        ],
      },
    ],
    createdAt: "2023-10-01",
    status: "published",
    enrollmentCount: 89,
    completionRate: 65,
    rating: 4.6,
    licenseType: "langganan",
    expiryDate: "2024-12-31",
  },
  {
    id: "CRS004",
    title: "Etika Bisnis dan Anti Korupsi",
    description: "Pelatihan wajib tentang prinsip-prinsip etika bisnis dan pencegahan korupsi.",
    thumbnail: "/course-covers/business-ethics.jpg",
    duration: 90,
    type: "wajib",
    method: "e_learning",
    category: "Compliance",
    jobFamilies: ["IT Operations", "Operations", "Finance", "Marketing", "Legal", "Procurement"],
    instructor: "Ahmad Wijaya",
    sections: [
      {
        id: "SEC006",
        title: "Prinsip Etika Bisnis",
        items: [
          { id: "ITM011", title: "Video: Kode Etik Perusahaan", type: "video", duration: 20 },
          { id: "ITM012", title: "PDF: Panduan Perilaku Etis", type: "pdf", duration: 15 },
        ],
      },
    ],
    createdAt: "2023-04-15",
    status: "published",
    enrollmentCount: 520,
    completionRate: 92,
    rating: 4.3,
    licenseType: "beli_putus",
  },
  {
    id: "CRS005",
    title: "Pengelolaan Waktu dan Produktivitas",
    description: "Teknik efektif untuk mengelola waktu dan meningkatkan produktivitas kerja.",
    thumbnail: "/course-covers/productivity.jpg",
    duration: 60,
    type: "pilihan",
    method: "e_learning",
    category: "Soft Skill",
    jobFamilies: ["IT Operations", "Operations", "Finance", "Marketing"],
    instructor: "Dewi Lestari",
    sections: [
      {
        id: "SEC007",
        title: "Dasar Time Management",
        items: [
          { id: "ITM013", title: "Video: Eisenhower Matrix", type: "video", duration: 15 },
          { id: "ITM014", title: "Video: Pomodoro Technique", type: "video", duration: 12 },
        ],
      },
    ],
    createdAt: "2023-11-01",
    status: "published",
    enrollmentCount: 156,
    completionRate: 78,
    rating: 4.7,
    licenseType: "beli_putus",
  },
  {
    id: "CRS006",
    title: "Cybersecurity Awareness",
    description: "Kesadaran keamanan siber untuk melindungi aset digital perusahaan.",
    thumbnail: "/course-covers/cybersecurity.jpg",
    duration: 75,
    type: "wajib",
    method: "e_learning",
    category: "Technical Skill",
    jobFamilies: ["IT Operations", "IT Development", "IT Management"],
    instructor: "Hendra Kusuma",
    sections: [
      {
        id: "SEC008",
        title: "Ancaman Siber",
        items: [
          { id: "ITM015", title: "Video: Jenis-jenis Malware", type: "video", duration: 18 },
          { id: "ITM016", title: "Video: Social Engineering", type: "video", duration: 20 },
        ],
      },
    ],
    createdAt: "2023-09-01",
    status: "published",
    enrollmentCount: 210,
    completionRate: 88,
    rating: 4.4,
    licenseType: "beli_putus",
  },
  {
    id: "CRS007",
    title: "Good Manufacturing Practice (CPOB)",
    description: "Dasar CPOB untuk menjaga mutu, keamanan, dan konsistensi proses produksi farmasi.",
    thumbnail: "/course-covers/cpob.jpg",
    duration: 150,
    type: "wajib",
    method: "e_learning",
    category: "Quality & Compliance",
    jobFamilies: ["Production", "Quality Assurance", "Quality Control", "Warehouse"],
    instructor: "Dr. Maya Prameswari",
    sections: [
      { id: "SEC009", title: "Fondasi CPOB", items: [
        { id: "ITM017", title: "Video: Prinsip utama CPOB", type: "video", duration: 25 },
        { id: "ITM018", title: "PDF: Personalia dan higiene", type: "pdf", duration: 20 },
      ] },
      { id: "SEC010", title: "Dokumentasi & Deviasi", items: [
        { id: "ITM019", title: "Video: Good documentation practice", type: "video", duration: 25 },
        { id: "ITM020", title: "Quiz: Penanganan deviasi", type: "quiz", duration: 15 },
      ] },
    ],
    createdAt: "2024-01-18",
    status: "published",
    enrollmentCount: 638,
    completionRate: 91,
    rating: 4.9,
    licenseType: "beli_putus",
  },
  {
    id: "CRS008",
    title: "Pharmacovigilance Essentials",
    description: "Kenali pelaporan efek samping obat dan tanggung jawab setiap fungsi dalam patient safety.",
    thumbnail: "/course-covers/pharmacovigilance.jpg",
    duration: 95,
    type: "wajib",
    method: "public_online",
    category: "Patient Safety",
    jobFamilies: ["Medical", "Regulatory", "Sales", "Marketing"],
    instructor: "Apt. Nadia Putri, M.Farm.",
    sections: [
      { id: "SEC011", title: "Dasar Pharmacovigilance", items: [
        { id: "ITM021", title: "Video: Adverse drug reaction", type: "video", duration: 20 },
        { id: "ITM022", title: "PDF: Alur pelaporan internal", type: "pdf", duration: 15 },
      ] },
      { id: "SEC012", title: "Simulasi Kasus", items: [
        { id: "ITM023", title: "SCORM: Simulasi laporan kasus", type: "scorm", duration: 25 },
        { id: "ITM024", title: "Quiz: Patient safety", type: "quiz", duration: 15 },
      ] },
    ],
    createdAt: "2024-02-10",
    status: "published",
    enrollmentCount: 312,
    completionRate: 87,
    rating: 4.8,
    licenseType: "langganan",
    expiryDate: "2027-12-31",
  },
  {
    id: "CRS009",
    title: "Data Integrity: ALCOA+ in Practice",
    description: "Praktik menjaga integritas data laboratorium dan manufaktur melalui prinsip ALCOA+.",
    thumbnail: "/course-covers/data-integrity.jpg",
    duration: 110,
    type: "pilihan",
    method: "in_house",
    category: "Quality & Compliance",
    jobFamilies: ["Quality Assurance", "Quality Control", "Production", "IT Operations"],
    instructor: "Rizky Hartanto",
    sections: [
      { id: "SEC013", title: "Prinsip ALCOA+", items: [
        { id: "ITM025", title: "Video: Attributable hingga Accurate", type: "video", duration: 25 },
        { id: "ITM026", title: "PDF: Audit trail checklist", type: "pdf", duration: 20 },
      ] },
      { id: "SEC014", title: "Penerapan di Lapangan", items: [
        { id: "ITM027", title: "Video: Studi kasus data integrity", type: "video", duration: 25 },
        { id: "ITM028", title: "Quiz: Temukan risikonya", type: "quiz", duration: 15 },
      ] },
    ],
    createdAt: "2024-03-05",
    status: "published",
    enrollmentCount: 184,
    completionRate: 83,
    rating: 4.7,
    licenseType: "beli_putus",
  },
]

// Dummy enrollments for user USR001 (Budi Santoso)
export const dummyEnrollments: Enrollment[] = [
  {
    id: "ENR001",
    courseId: "CRS001",
    userId: "USR001",
    progress: 75,
    status: "sedang_berjalan",
    startedAt: "2024-01-02",
    deadline: "2024-01-31",
    lastAccessedAt: "2024-01-15T10:30:00",
    sectionsProgress: { "SEC001": 100, "SEC002": 50 },
  },
  {
    id: "ENR002",
    courseId: "CRS003",
    userId: "USR001",
    progress: 45,
    status: "sedang_berjalan",
    startedAt: "2024-01-05",
    deadline: "2024-02-15",
    lastAccessedAt: "2024-01-14T14:00:00",
    sectionsProgress: { "SEC004": 80, "SEC005": 10 },
  },
  {
    id: "ENR003",
    courseId: "CRS006",
    userId: "USR001",
    progress: 30,
    status: "sedang_berjalan",
    startedAt: "2024-01-10",
    deadline: "2024-01-25",
    lastAccessedAt: "2024-01-12T09:00:00",
    sectionsProgress: { "SEC008": 30 },
  },
  {
    id: "ENR004",
    courseId: "CRS004",
    userId: "USR001",
    progress: 100,
    status: "selesai",
    startedAt: "2023-12-01",
    completedAt: "2023-12-15",
    certificateId: "CERT001",
    lastAccessedAt: "2023-12-15T16:00:00",
    sectionsProgress: { "SEC006": 100 },
  },
  {
    id: "ENR005",
    courseId: "CRS005",
    userId: "USR001",
    progress: 100,
    status: "selesai",
    startedAt: "2023-11-10",
    completedAt: "2023-11-25",
    certificateId: "CERT002",
    lastAccessedAt: "2023-11-25T11:30:00",
    sectionsProgress: { "SEC007": 100 },
  },
  {
    id: "ENR006",
    courseId: "CRS002",
    userId: "USR001",
    progress: 0,
    status: "belum_mulai",
    startedAt: "2024-01-16",
    deadline: "2024-02-28",
    lastAccessedAt: "2024-01-16T08:00:00",
    sectionsProgress: {},
  },
]

// Dummy certificates
export const dummyCertificates: Certificate[] = [
  {
    id: "CERT001",
    courseId: "CRS004",
    courseName: "Etika Bisnis dan Anti Korupsi",
    userId: "USR001",
    userName: "Budi Santoso",
    issuedAt: "2023-12-15",
    certificateNumber: "PYFA-2023-001234",
    qrCode: "https://learning.pyfa.co.id/verify/PYFA-2023-001234",
    digitalSignature: "Siti Rahayu - Kepala Bagian Pengembangan SDM",
    learningHours: 1.5,
    type: "internal",
  },
  {
    id: "CERT002",
    courseId: "CRS005",
    courseName: "Pengelolaan Waktu dan Produktivitas",
    userId: "USR001",
    userName: "Budi Santoso",
    issuedAt: "2023-11-25",
    certificateNumber: "PYFA-2023-001198",
    qrCode: "https://learning.pyfa.co.id/verify/PYFA-2023-001198",
    digitalSignature: "Siti Rahayu - Kepala Bagian Pengembangan SDM",
    learningHours: 1,
    type: "internal",
  },
  {
    id: "CERT003",
    courseId: "EXT001",
    courseName: "AWS Cloud Practitioner",
    userId: "USR001",
    userName: "Budi Santoso",
    issuedAt: "2023-09-20",
    expiresAt: "2026-09-20",
    certificateNumber: "AWS-12345678",
    qrCode: "https://aws.amazon.com/verify/AWS-12345678",
    digitalSignature: "Amazon Web Services",
    learningHours: 16,
    type: "external",
    skillType: "Hard Skill",
    trainingMaterial: "Cloud Computing Fundamentals",
  },
  {
    id: "CERT004",
    courseId: "EXT002",
    courseName: "Project Management Professional (PMP)",
    userId: "USR001",
    userName: "Budi Santoso",
    issuedAt: "2023-06-15",
    expiresAt: "2026-06-15",
    certificateNumber: "PMP-98765432",
    qrCode: "https://pmi.org/verify/PMP-98765432",
    digitalSignature: "Project Management Institute",
    learningHours: 35,
    type: "external",
    skillType: "Hard Skill",
    trainingMaterial: "Project Management Body of Knowledge",
  },
]

// Training method labels
export const methodLabels: Record<TrainingMethod, string> = {
  e_learning: "E-Learning",
  in_house: "In-House Training",
  public_online: "Public Online",
  public_offline: "Public Offline",
}

// Course type labels
export const typeLabels: Record<CourseType, string> = {
  wajib: "Wajib",
  pilihan: "Pilihan",
}

// Status labels
export const statusLabels: Record<CourseStatus, string> = {
  belum_mulai: "Belum Mulai",
  sedang_berjalan: "Sedang Berjalan",
  selesai: "Selesai",
}
