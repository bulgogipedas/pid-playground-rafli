export interface BudgetAllocation {
  id: string
  divisionId: string
  division: string
  year: number
  totalBudget: number
  allocatedBudget: number
  spent: number
  percentage: number
  courses: number
  employees: number
}

export interface BudgetTransaction {
  id: string
  courseId: string
  courseName: string
  divisionId: string
  division: string
  amount: number
  category: "external_trainer" | "internal_trainer" | "material" | "venue" | "other"
  date: string
  description: string
  status: "pending" | "approved" | "completed"
}

export const budgetAllocations: BudgetAllocation[] = [
  {
    id: "BDG001",
    divisionId: "DIV001",
    division: "Sumber Daya Manusia",
    year: 2024,
    totalBudget: 150000000,
    allocatedBudget: 145000000,
    spent: 98500000,
    percentage: 65.7,
    courses: 12,
    employees: 45,
  },
  {
    id: "BDG002",
    divisionId: "DIV002",
    division: "Teknologi Informasi",
    year: 2024,
    totalBudget: 200000000,
    allocatedBudget: 185000000,
    spent: 142000000,
    percentage: 71,
    courses: 18,
    employees: 62,
  },
  {
    id: "BDG003",
    divisionId: "DIV003",
    division: "Operasional",
    year: 2024,
    totalBudget: 120000000,
    allocatedBudget: 110000000,
    spent: 65000000,
    percentage: 54.2,
    courses: 8,
    employees: 35,
  },
  {
    id: "BDG004",
    divisionId: "DIV004",
    division: "Keuangan",
    year: 2024,
    totalBudget: 100000000,
    allocatedBudget: 95000000,
    spent: 72000000,
    percentage: 72,
    courses: 10,
    employees: 28,
  },
  {
    id: "BDG005",
    divisionId: "DIV005",
    division: "Pemasaran",
    year: 2024,
    totalBudget: 80000000,
    allocatedBudget: 75000000,
    spent: 45000000,
    percentage: 56.25,
    courses: 7,
    employees: 22,
  },
]

export const budgetTransactions: BudgetTransaction[] = [
  {
    id: "TRX001",
    courseId: "COURSE001",
    courseName: "Leadership Development",
    divisionId: "DIV001",
    division: "Sumber Daya Manusia",
    amount: 15000000,
    category: "external_trainer",
    date: "2024-01-15",
    description: "Training external trainer - 2 hari",
    status: "completed",
  },
  {
    id: "TRX002",
    courseId: "COURSE005",
    courseName: "Advanced Python Programming",
    divisionId: "DIV002",
    division: "Teknologi Informasi",
    amount: 22000000,
    category: "external_trainer",
    date: "2024-01-20",
    description: "Training dengan vendor eksternal",
    status: "completed",
  },
  {
    id: "TRX003",
    courseId: "COURSE012",
    courseName: "Customer Service Excellence",
    divisionId: "DIV003",
    division: "Operasional",
    amount: 8500000,
    category: "internal_trainer",
    date: "2024-02-01",
    description: "Trainer internal - materi cetak",
    status: "completed",
  },
  {
    id: "TRX004",
    courseId: "COURSE008",
    courseName: "Financial Analysis Mastery",
    divisionId: "DIV004",
    division: "Keuangan",
    amount: 18000000,
    category: "external_trainer",
    date: "2024-02-10",
    description: "Pelatihan analisis keuangan",
    status: "completed",
  },
  {
    id: "TRX005",
    courseId: "COURSE015",
    courseName: "Digital Marketing Trends",
    divisionId: "DIV005",
    division: "Pemasaran",
    amount: 12000000,
    category: "external_trainer",
    date: "2024-02-15",
    description: "Workshop digital marketing 3 hari",
    status: "approved",
  },
]
