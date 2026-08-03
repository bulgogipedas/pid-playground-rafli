// Training Needs Analysis (TNA) data for LMS PID

export interface CompetencyGap {
  id: string
  userId: string
  userName: string
  division: string
  jobFamily: string
  competency: string
  competencyCategory: "soft_skill" | "hard_skill" | "technical"
  requiredLevel: number // 1-5
  currentLevel: number // 1-5
  gap: number
  priority: "tinggi" | "sedang" | "rendah"
  recommendedTraining: string[]
  lastAssessment: string
  hcisSourceId: string
}

export interface DivisionGapSummary {
  division: string
  totalEmployees: number
  employeesWithGap: number
  averageGap: number
  criticalGaps: number
  competencies: {
    competency: string
    avgGap: number
    employeesAffected: number
  }[]
}

export interface JobFamilyGapSummary {
  jobFamily: string
  totalEmployees: number
  employeesWithGap: number
  averageGap: number
  topGaps: string[]
}

export interface MandatoryTrainingAssignment {
  id: string
  trainingId: string
  trainingName: string
  jobFamilies: string[]
  assignedDate: string
  deadline: string
  totalAssigned: number
  completed: number
  inProgress: number
  notStarted: number
  createdBy: string
}

// Dummy competency gaps
export const dummyCompetencyGaps: CompetencyGap[] = [
  {
    id: "GAP001",
    userId: "USR001",
    userName: "Budi Santoso",
    division: "Teknologi Informasi",
    jobFamily: "IT Operations",
    competency: "Manajemen Proyek TI",
    competencyCategory: "hard_skill",
    requiredLevel: 4,
    currentLevel: 2,
    gap: 2,
    priority: "tinggi",
    recommendedTraining: ["Project Management Fundamentals", "Agile Methodology"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-001",
  },
  {
    id: "GAP002",
    userId: "USR001",
    userName: "Budi Santoso",
    division: "Teknologi Informasi",
    jobFamily: "IT Operations",
    competency: "Komunikasi Efektif",
    competencyCategory: "soft_skill",
    requiredLevel: 3,
    currentLevel: 2,
    gap: 1,
    priority: "sedang",
    recommendedTraining: ["Effective Communication Skills"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-002",
  },
  {
    id: "GAP003",
    userId: "USR005",
    userName: "Rina Permata",
    division: "Keuangan",
    jobFamily: "Finance",
    competency: "Analisis Keuangan Lanjutan",
    competencyCategory: "hard_skill",
    requiredLevel: 4,
    currentLevel: 3,
    gap: 1,
    priority: "sedang",
    recommendedTraining: ["Advanced Financial Analysis", "Microsoft Excel Advanced"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-003",
  },
  {
    id: "GAP004",
    userId: "USR005",
    userName: "Rina Permata",
    division: "Keuangan",
    jobFamily: "Finance",
    competency: "Kepatuhan Regulasi",
    competencyCategory: "technical",
    requiredLevel: 5,
    currentLevel: 3,
    gap: 2,
    priority: "tinggi",
    recommendedTraining: ["Regulatory Compliance Training", "Risk Management"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-004",
  },
  {
    id: "GAP005",
    userId: "USR007",
    userName: "Putri Ayu",
    division: "Pemasaran",
    jobFamily: "Marketing",
    competency: "Digital Marketing",
    competencyCategory: "hard_skill",
    requiredLevel: 4,
    currentLevel: 2,
    gap: 2,
    priority: "tinggi",
    recommendedTraining: ["Digital Marketing Fundamentals", "Social Media Marketing"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-005",
  },
  {
    id: "GAP006",
    userId: "USR007",
    userName: "Putri Ayu",
    division: "Pemasaran",
    jobFamily: "Marketing",
    competency: "Presentasi Bisnis",
    competencyCategory: "soft_skill",
    requiredLevel: 4,
    currentLevel: 3,
    gap: 1,
    priority: "rendah",
    recommendedTraining: ["Business Presentation Skills"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-006",
  },
  {
    id: "GAP007",
    userId: "USR009",
    userName: "Maya Sari",
    division: "Operasional",
    jobFamily: "Operations",
    competency: "Lean Management",
    competencyCategory: "hard_skill",
    requiredLevel: 4,
    currentLevel: 2,
    gap: 2,
    priority: "tinggi",
    recommendedTraining: ["Lean Six Sigma Yellow Belt", "Process Improvement"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-007",
  },
  {
    id: "GAP008",
    userId: "USR010",
    userName: "Fajar Rahman",
    division: "Teknologi Informasi",
    jobFamily: "IT Development",
    competency: "Cloud Computing",
    competencyCategory: "technical",
    requiredLevel: 4,
    currentLevel: 2,
    gap: 2,
    priority: "tinggi",
    recommendedTraining: ["AWS Cloud Practitioner", "Azure Fundamentals"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-008",
  },
  {
    id: "GAP009",
    userId: "USR010",
    userName: "Fajar Rahman",
    division: "Teknologi Informasi",
    jobFamily: "IT Development",
    competency: "Cybersecurity",
    competencyCategory: "technical",
    requiredLevel: 3,
    currentLevel: 2,
    gap: 1,
    priority: "sedang",
    recommendedTraining: ["Cybersecurity Awareness", "CompTIA Security+"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-009",
  },
  {
    id: "GAP010",
    userId: "USR003",
    userName: "Ahmad Wijaya",
    division: "Operasional",
    jobFamily: "Operations Management",
    competency: "Kepemimpinan Strategis",
    competencyCategory: "soft_skill",
    requiredLevel: 5,
    currentLevel: 4,
    gap: 1,
    priority: "sedang",
    recommendedTraining: ["Strategic Leadership Program", "Executive Coaching"],
    lastAssessment: "2024-01-01",
    hcisSourceId: "HCIS-COMP-010",
  },
]

// Division gap summaries (aggregated)
export const divisionGapSummaries: DivisionGapSummary[] = [
  {
    division: "Teknologi Informasi",
    totalEmployees: 45,
    employeesWithGap: 32,
    averageGap: 1.8,
    criticalGaps: 12,
    competencies: [
      { competency: "Cloud Computing", avgGap: 2.1, employeesAffected: 15 },
      { competency: "Cybersecurity", avgGap: 1.5, employeesAffected: 20 },
      { competency: "Manajemen Proyek TI", avgGap: 1.8, employeesAffected: 18 },
      { competency: "DevOps", avgGap: 2.0, employeesAffected: 10 },
    ],
  },
  {
    division: "Keuangan",
    totalEmployees: 30,
    employeesWithGap: 18,
    averageGap: 1.4,
    criticalGaps: 5,
    competencies: [
      { competency: "Analisis Keuangan Lanjutan", avgGap: 1.2, employeesAffected: 10 },
      { competency: "Kepatuhan Regulasi", avgGap: 1.8, employeesAffected: 12 },
      { competency: "Financial Reporting", avgGap: 1.0, employeesAffected: 8 },
    ],
  },
  {
    division: "Operasional",
    totalEmployees: 120,
    employeesWithGap: 85,
    averageGap: 1.6,
    criticalGaps: 25,
    competencies: [
      { competency: "Lean Management", avgGap: 1.9, employeesAffected: 40 },
      { competency: "K3", avgGap: 1.2, employeesAffected: 60 },
      { competency: "Quality Control", avgGap: 1.5, employeesAffected: 35 },
    ],
  },
  {
    division: "Pemasaran",
    totalEmployees: 25,
    employeesWithGap: 15,
    averageGap: 1.5,
    criticalGaps: 6,
    competencies: [
      { competency: "Digital Marketing", avgGap: 2.0, employeesAffected: 12 },
      { competency: "Analisis Pasar", avgGap: 1.3, employeesAffected: 8 },
      { competency: "Brand Management", avgGap: 1.2, employeesAffected: 5 },
    ],
  },
  {
    division: "Sumber Daya Manusia",
    totalEmployees: 20,
    employeesWithGap: 8,
    averageGap: 1.1,
    criticalGaps: 2,
    competencies: [
      { competency: "HR Analytics", avgGap: 1.5, employeesAffected: 5 },
      { competency: "Talent Management", avgGap: 1.0, employeesAffected: 6 },
    ],
  },
]

// Job Family gap summaries
export const jobFamilyGapSummaries: JobFamilyGapSummary[] = [
  {
    jobFamily: "IT Operations",
    totalEmployees: 25,
    employeesWithGap: 18,
    averageGap: 1.7,
    topGaps: ["Cloud Computing", "Cybersecurity", "ITIL"],
  },
  {
    jobFamily: "IT Development",
    totalEmployees: 15,
    employeesWithGap: 12,
    averageGap: 1.9,
    topGaps: ["Cloud Computing", "DevOps", "Microservices"],
  },
  {
    jobFamily: "Finance",
    totalEmployees: 25,
    employeesWithGap: 15,
    averageGap: 1.4,
    topGaps: ["Kepatuhan Regulasi", "Financial Analysis", "Risk Management"],
  },
  {
    jobFamily: "Operations",
    totalEmployees: 80,
    employeesWithGap: 60,
    averageGap: 1.5,
    topGaps: ["K3", "Lean Management", "Quality Control"],
  },
  {
    jobFamily: "Marketing",
    totalEmployees: 20,
    employeesWithGap: 12,
    averageGap: 1.6,
    topGaps: ["Digital Marketing", "Content Marketing", "Analytics"],
  },
]

// Mandatory training assignments
export const mandatoryTrainingAssignments: MandatoryTrainingAssignment[] = [
  {
    id: "MTA001",
    trainingId: "CRS001",
    trainingName: "Pengenalan Keselamatan dan Kesehatan Kerja (K3)",
    jobFamilies: ["Operations", "IT Operations", "Finance", "Marketing"],
    assignedDate: "2024-01-01",
    deadline: "2024-03-31",
    totalAssigned: 150,
    completed: 85,
    inProgress: 45,
    notStarted: 20,
    createdBy: "Siti Rahayu",
  },
  {
    id: "MTA002",
    trainingId: "CRS004",
    trainingName: "Etika Bisnis dan Anti Korupsi",
    jobFamilies: ["IT Operations", "Operations", "Finance", "Marketing", "Legal", "Procurement"],
    assignedDate: "2024-01-01",
    deadline: "2024-02-28",
    totalAssigned: 200,
    completed: 180,
    inProgress: 15,
    notStarted: 5,
    createdBy: "Siti Rahayu",
  },
  {
    id: "MTA003",
    trainingId: "CRS006",
    trainingName: "Cybersecurity Awareness",
    jobFamilies: ["IT Operations", "IT Development", "IT Management"],
    assignedDate: "2024-01-15",
    deadline: "2024-02-15",
    totalAssigned: 45,
    completed: 30,
    inProgress: 10,
    notStarted: 5,
    createdBy: "Siti Rahayu",
  },
  {
    id: "MTA004",
    trainingId: "CRS002",
    trainingName: "Kepemimpinan Efektif untuk Supervisor",
    jobFamilies: ["Operations Management", "IT Management", "HR Management"],
    assignedDate: "2024-01-10",
    deadline: "2024-04-30",
    totalAssigned: 35,
    completed: 10,
    inProgress: 15,
    notStarted: 10,
    createdBy: "Siti Rahayu",
  },
]

// Priority labels
export const priorityLabels: Record<string, string> = {
  tinggi: "Tinggi",
  sedang: "Sedang",
  rendah: "Rendah",
}

// Competency category labels
export const categoryLabels: Record<string, string> = {
  soft_skill: "Soft Skill",
  hard_skill: "Hard Skill",
  technical: "Technical",
}
