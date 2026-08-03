export interface SuratTugas {
  id: string
  number: string
  date: string
  employeeId: string
  employeeName: string
  nip: string
  position: string
  division: string
  courseId: string
  courseName: string
  trainingStartDate: string
  trainingEndDate: string
  venue: string
  cost: number
  status: "draft" | "pending" | "approved" | "rejected" | "sent" | "completed"
  createdBy: string
  createdDate: string
  approvedBy?: string
  approvedDate?: string
  notes?: string
  documentUrl?: string
}

export const suratTugasList: SuratTugas[] = [
  {
    id: "ST001",
    number: "ST/HCS/001/2024",
    date: "2024-01-10",
    employeeId: "USR001",
    employeeName: "Budi Santoso",
    nip: "1990001",
    position: "Staff IT",
    division: "Teknologi Informasi",
    courseId: "COURSE005",
    courseName: "Advanced Python Programming",
    trainingStartDate: "2024-02-01",
    trainingEndDate: "2024-02-05",
    venue: "Jakarta Training Center",
    cost: 5000000,
    status: "sent",
    createdBy: "Siti Rahayu",
    createdDate: "2024-01-10",
    approvedBy: "Ahmad Wijaya",
    approvedDate: "2024-01-12",
    notes: "Surat tugas untuk pelatihan internal IT",
    documentUrl: "/documents/st-001.pdf",
  },
  {
    id: "ST002",
    number: "ST/HCS/002/2024",
    date: "2024-01-15",
    employeeId: "USR005",
    employeeName: "Rina Permata",
    nip: "1995005",
    position: "Staff Akuntansi",
    division: "Keuangan",
    courseId: "COURSE008",
    courseName: "Financial Analysis Mastery",
    trainingStartDate: "2024-02-20",
    trainingEndDate: "2024-02-23",
    venue: "Kampus UPH Surabaya",
    cost: 7500000,
    status: "completed",
    createdBy: "Siti Rahayu",
    createdDate: "2024-01-15",
    approvedBy: "Ratna Dewi",
    approvedDate: "2024-01-17",
    notes: "Surat tugas untuk pelatihan eksternal keuangan",
    documentUrl: "/documents/st-002.pdf",
  },
  {
    id: "ST003",
    number: "ST/HCS/003/2024",
    date: "2024-01-20",
    employeeId: "USR007",
    employeeName: "Putri Ayu",
    nip: "1993007",
    position: "Marketing Executive",
    division: "Pemasaran",
    courseId: "COURSE015",
    courseName: "Digital Marketing Trends",
    trainingStartDate: "2024-03-01",
    trainingEndDate: "2024-03-03",
    venue: "Hotel Hilton Jakarta",
    cost: 4500000,
    status: "approved",
    createdBy: "Siti Rahayu",
    createdDate: "2024-01-20",
    approvedBy: "Ahmad Wijaya",
    approvedDate: "2024-01-22",
    notes: "Workshop digital marketing dengan pembicara internasional",
  },
  {
    id: "ST004",
    number: "ST/HCS/004/2024",
    date: "2024-01-22",
    employeeId: "USR010",
    employeeName: "Fajar Rahman",
    nip: "1994010",
    position: "Software Developer",
    division: "Teknologi Informasi",
    courseId: "COURSE007",
    courseName: "Cloud Infrastructure Fundamentals",
    trainingStartDate: "2024-03-10",
    trainingEndDate: "2024-03-14",
    venue: "AWS Training Center Jakarta",
    cost: 8500000,
    status: "pending",
    createdBy: "Siti Rahayu",
    createdDate: "2024-01-22",
    notes: "Menunggu persetujuan dari manager IT",
  },
  {
    id: "ST005",
    number: "ST/HCS/005/2024",
    date: "2024-01-25",
    employeeId: "USR009",
    employeeName: "Maya Sari",
    nip: "1991009",
    position: "Admin Divisi Keuangan",
    division: "Keuangan",
    courseId: "COURSE004",
    courseName: "SAP Finance Module",
    trainingStartDate: "2024-03-15",
    trainingEndDate: "2024-03-17",
    venue: "SAP Training Center Surabaya",
    cost: 6000000,
    status: "draft",
    createdBy: "Siti Rahayu",
    createdDate: "2024-01-25",
    notes: "Draft surat tugas, menunggu data final dari HR",
  },
]

export const suratTugasStatuses = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-700" },
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-700" },
  approved: { label: "Approved", color: "bg-blue-100 text-blue-700" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
  sent: { label: "Sent", color: "bg-green-100 text-green-700" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-700" },
}
