// Dummy user data for Pyridam Learning
// Role Structure:
// Admin SDM (LMS) - - - - - Admin Content (CMS)
//    |                          |
//    +-- Admin Divisi           +-- Trainer
//    +-- Manager
//    |
// Peserta (Learner)

export type UserRole = "admin_sdm" | "admin_content" | "admin_divisi" | "manager" | "trainer" | "peserta"

export interface User {
  id: string
  nip: string // Nomor Induk Pegawai
  name: string
  email: string
  role: UserRole
  division: string
  jobFamily: string
  position: string
  avatar?: string
  phone: string
  joinDate: string
  status: "aktif" | "nonaktif"
  lastSync?: string
  hcisId?: string
}

export interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  module: string
  details: string
  ipAddress: string
  timestamp: string
}

export const roleLabels: Record<UserRole, string> = {
  admin_sdm: "Admin SDM",
  admin_content: "Admin Content",
  admin_divisi: "Admin Divisi",
  manager: "Manager",
  trainer: "Trainer",
  peserta: "Peserta",
}

export const roleDescriptions: Record<UserRole, string> = {
  admin_sdm: "Mengelola seluruh sistem LMS, pengguna, TNA, dan pelatihan",
  admin_content: "Mengelola konten pelatihan dan manajemen materi pembelajaran",
  admin_divisi: "Mengelola request training dan laporan divisi",
  manager: "Menyetujui pengajuan pelatihan dari tim",
  trainer: "Membuat dan mengelola materi pelatihan",
  peserta: "Mengikuti pelatihan dan melihat progres pembelajaran",
}

// Dummy users
export const dummyUsers: User[] = [
  {
    id: "USR000",
    nip: "1990000",
    name: "Test User",
    email: "test@test.com",
    role: "admin_sdm",
    division: "Sumber Daya Manusia",
    jobFamily: "HR Management",
    position: "Administrator Sistem",
    phone: "081200000000",
    joinDate: "2020-01-01",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-000",
  },
  {
    id: "USR001",
    nip: "1990001",
    name: "Budi Santoso",
    email: "budi.santoso@pyfa.co.id",
    role: "peserta",
    division: "Teknologi Informasi",
    jobFamily: "IT Operations",
    position: "Staff IT",
    phone: "081234567890",
    joinDate: "2020-03-15",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-001",
  },
  {
    id: "USR002",
    nip: "1985002",
    name: "Siti Rahayu",
    email: "siti.rahayu@pyfa.co.id",
    role: "admin_sdm",
    division: "Sumber Daya Manusia",
    jobFamily: "HR Management",
    position: "Kepala Bagian Pengembangan SDM",
    phone: "081234567891",
    joinDate: "2015-06-01",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-002",
  },
  {
    id: "USR003",
    nip: "1988003",
    name: "Ahmad Wijaya",
    email: "ahmad.wijaya@pyfa.co.id",
    role: "manager",
    division: "Operasional",
    jobFamily: "Operations Management",
    position: "Manager Operasional",
    phone: "081234567892",
    joinDate: "2018-01-10",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-003",
  },
  {
    id: "USR004",
    nip: "1992004",
    name: "Dewi Lestari",
    email: "dewi.lestari@pyfa.co.id",
    role: "trainer",
    division: "Sumber Daya Manusia",
    jobFamily: "Learning & Development",
    position: "Training Specialist",
    phone: "081234567893",
    joinDate: "2019-08-20",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-004",
  },
  {
    id: "USR005",
    nip: "1995005",
    name: "Rina Permata",
    email: "rina.permata@pyfa.co.id",
    role: "peserta",
    division: "Keuangan",
    jobFamily: "Finance",
    position: "Staff Akuntansi",
    phone: "081234567894",
    joinDate: "2021-02-01",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-005",
  },
  {
    id: "USR006",
    nip: "1987006",
    name: "Hendra Kusuma",
    email: "hendra.kusuma@pyfa.co.id",
    role: "admin_divisi",
    division: "Teknologi Informasi",
    jobFamily: "IT Management",
    position: "Admin Divisi IT",
    phone: "081234567895",
    joinDate: "2016-04-15",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-006",
  },
  {
    id: "USR007",
    nip: "1993007",
    name: "Putri Ayu",
    email: "putri.ayu@pyfa.co.id",
    role: "peserta",
    division: "Pemasaran",
    jobFamily: "Marketing",
    position: "Marketing Executive",
    phone: "081234567896",
    joinDate: "2022-06-01",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-007",
  },
  {
    id: "USR008",
    nip: "1989008",
    name: "Bambang Suryadi",
    email: "bambang.suryadi@pyfa.co.id",
    role: "admin_content",
    division: "Sumber Daya Manusia",
    jobFamily: "Learning & Development",
    position: "Kepala Konten Pelatihan",
    phone: "081234567897",
    joinDate: "2017-09-10",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-008",
  },
  {
    id: "USR009",
    nip: "1991009",
    name: "Maya Sari",
    email: "maya.sari@pyfa.co.id",
    role: "admin_divisi",
    division: "Keuangan",
    jobFamily: "Finance Management",
    position: "Admin Divisi Keuangan",
    phone: "081234567898",
    joinDate: "2019-11-01",
    status: "aktif",
    lastSync: "2024-01-10T08:30:00",
    hcisId: "HCIS-009",
  },
  {
    id: "USR010",
    nip: "1994010",
    name: "Fajar Rahman",
    email: "fajar.rahman@pyfa.co.id",
    role: "peserta",
    division: "Teknologi Informasi",
    jobFamily: "IT Development",
    position: "Software Developer",
    phone: "081234567899",
    joinDate: "2023-01-15",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-010",
  },
  {
    id: "USR011",
    nip: "1986011",
    name: "Ratna Dewi",
    email: "ratna.dewi@pyfa.co.id",
    role: "manager",
    division: "Keuangan",
    jobFamily: "Finance Management",
    position: "Manager Keuangan",
    phone: "081234567900",
    joinDate: "2014-05-01",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-011",
  },
  {
    id: "USR012",
    nip: "1990012",
    name: "Agus Prasetyo",
    email: "agus.prasetyo@pyfa.co.id",
    role: "trainer",
    division: "Sumber Daya Manusia",
    jobFamily: "Learning & Development",
    position: "Senior Trainer",
    phone: "081234567901",
    joinDate: "2018-03-15",
    status: "aktif",
    lastSync: "2024-01-15T08:30:00",
    hcisId: "HCIS-012",
  },
]

// Dummy audit logs
export const dummyAuditLogs: AuditLog[] = [
  {
    id: "LOG001",
    userId: "USR002",
    userName: "Siti Rahayu",
    action: "LOGIN",
    module: "Authentication",
    details: "Login berhasil via SSO",
    ipAddress: "192.168.1.100",
    timestamp: "2024-01-15T08:30:00",
  },
  {
    id: "LOG002",
    userId: "USR002",
    userName: "Siti Rahayu",
    action: "APPROVE_TRAINING",
    module: "Approval Workflow",
    details: "Menyetujui pengajuan pelatihan TRQ-2024-001",
    ipAddress: "192.168.1.100",
    timestamp: "2024-01-15T09:15:00",
  },
  {
    id: "LOG003",
    userId: "USR004",
    userName: "Dewi Lestari",
    action: "UPLOAD_CONTENT",
    module: "Content Management",
    details: "Upload materi: Modul Kepemimpinan Dasar",
    ipAddress: "192.168.1.101",
    timestamp: "2024-01-15T10:00:00",
  },
  {
    id: "LOG004",
    userId: "USR001",
    userName: "Budi Santoso",
    action: "COMPLETE_COURSE",
    module: "Learning Execution",
    details: "Menyelesaikan kursus: Pengenalan K3",
    ipAddress: "192.168.1.102",
    timestamp: "2024-01-15T11:30:00",
  },
  {
    id: "LOG005",
    userId: "USR002",
    userName: "Siti Rahayu",
    action: "ISSUE_CERTIFICATE",
    module: "Certification",
    details: "Menerbitkan sertifikat CERT-2024-001 untuk Budi Santoso",
    ipAddress: "192.168.1.100",
    timestamp: "2024-01-15T11:45:00",
  },
  {
    id: "LOG006",
    userId: "USR003",
    userName: "Ahmad Wijaya",
    action: "LOGIN",
    module: "Authentication",
    details: "Login berhasil via SSO",
    ipAddress: "192.168.1.103",
    timestamp: "2024-01-15T13:00:00",
  },
  {
    id: "LOG007",
    userId: "USR003",
    userName: "Ahmad Wijaya",
    action: "REJECT_TRAINING",
    module: "Approval Workflow",
    details: "Menolak pengajuan pelatihan TRQ-2024-003 - Anggaran tidak tersedia",
    ipAddress: "192.168.1.103",
    timestamp: "2024-01-15T13:30:00",
  },
  {
    id: "LOG008",
    userId: "USR002",
    userName: "Siti Rahayu",
    action: "CREATE_USER",
    module: "User Management",
    details: "Membuat user baru: Contractor-001",
    ipAddress: "192.168.1.100",
    timestamp: "2024-01-15T14:00:00",
  },
  {
    id: "LOG009",
    userId: "USR005",
    userName: "Rina Permata",
    action: "SUBMIT_REQUEST",
    module: "Training Request",
    details: "Mengajukan pelatihan: Advanced Excel for Finance",
    ipAddress: "192.168.1.104",
    timestamp: "2024-01-15T14:30:00",
  },
  {
    id: "LOG010",
    userId: "USR002",
    userName: "Siti Rahayu",
    action: "SYNC_HCIS",
    module: "User Management",
    details: "Sinkronisasi data HCIS berhasil - 150 user diperbarui",
    ipAddress: "192.168.1.100",
    timestamp: "2024-01-15T15:00:00",
  },
]

// Divisions
export const divisions = [
  "Teknologi Informasi",
  "Sumber Daya Manusia",
  "Keuangan",
  "Operasional",
  "Pemasaran",
  "Hukum & Kepatuhan",
  "Pengadaan",
]

// Job Families
export const jobFamilies = [
  "IT Operations",
  "IT Development",
  "IT Management",
  "HR Management",
  "Learning & Development",
  "Finance",
  "Operations",
  "Operations Management",
  "Marketing",
  "Legal",
  "Procurement",
]
