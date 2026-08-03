// Centralized learning-flow data model for LMS PID.
// Single source of truth for the end-to-end demo flow:
// Pengajuan -> Approval -> Enrollment -> Belajar -> Assessment -> Sertifikat.

export type MaterialType =
  | "video"
  | "artikel"
  | "pdf"
  | "quiz"
  | "pretest"
  | "posttest"
  | "assignment"
  | "feedback"

export type EnrollmentStatus =
  | "belum_mulai"
  | "sedang_berjalan"
  | "selesai"
  | "tidak_lulus"

export type ParticipantCourseStatus =
  | "belum_terdaftar"
  | "menunggu_persetujuan"
  | "disetujui"
  | "belum_dimulai"
  | "sedang_berlangsung"
  | "selesai"
  | "tidak_lulus"

export type TrainingRequestStatus =
  | "draft"
  | "pending_l1"
  | "pending_l2"
  | "pending_l3"
  | "disetujui"
  | "ditolak"
  | "revisi"

export type ApprovalLevel = "L1" | "L2" | "L3"
export type ApprovalAction = "setujui" | "tolak" | "revisi"

export type AssignmentStatus =
  | "belum_dikumpulkan"
  | "sudah_dikumpulkan"
  | "sedang_dinilai"
  | "perlu_revisi"
  | "lulus"

export type CourseLevel = "pemula" | "menengah" | "mahir"
export type CourseKind = "wajib" | "pilihan"

export interface CourseMaterial {
  id: string
  slug: string
  title: string
  type: MaterialType
  /** estimated minutes */
  duration: number
  /** whether completing this material counts toward course progress */
  countsTowardProgress: boolean
  /** YouTube video id for video materials */
  youtubeId?: string
  /** rich text / markdown-ish body for artikel materials */
  body?: string
  /** minimum seconds before "Tandai Selesai" activates (video) */
  minWatchSeconds?: number
  /** id of the linked assessment (quiz/pretest/posttest) */
  assessmentId?: string
  /** id of the linked assignment */
  assignmentId?: string
  /** whether this material is required to pass the course */
  required?: boolean
}

export interface CourseModule {
  id: string
  slug: string
  title: string
  /** estimated minutes */
  estimatedMinutes: number
  materials: CourseMaterial[]
}

export interface Course {
  id: string
  slug: string
  title: string
  category: string
  kind: CourseKind
  level: CourseLevel
  method: string
  format: string
  language: string
  provider: string
  instructor: string
  shortDescription: string
  about: string
  targetAudience: string[]
  learningOutcomes: string[]
  prerequisites: string[]
  competencies: string[]
  faq: { question: string; answer: string }[]
  /** total estimated learning hours */
  estimatedHours: number
  /** access days after enrollment */
  accessDays: number
  passingGrade: number
  maxPostTestAttempts: number
  coolingOffMinutes: number
  certificateEnabled: boolean
  feedbackRequired: boolean
  requiresSuratTugas: boolean
  cost: number
  thumbnail: string
  youtubePlaylistId?: string
  modules: CourseModule[]
  createdAt: string
  status: "draft" | "published" | "archived"
  // display-only aggregates
  ratingCount?: number
  rating?: number
}

export interface MaterialProgress {
  materialId: string
  completed: boolean
  completedAt?: string
  /** seconds watched, for video */
  watchedSeconds?: number
}

export interface Enrollment {
  id: string
  courseId: string
  userId: string
  status: EnrollmentStatus
  enrolledAt: string
  startedAt?: string
  completedAt?: string
  deadline?: string
  lastAccessedAt: string
  certificateId?: string
  materialProgress: Record<string, MaterialProgress>
  /** best post-test score achieved */
  postTestBestScore?: number
  feedbackSubmitted?: boolean
}

export interface AssessmentOption {
  id: string
  text: string
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: AssessmentOption[]
  correctOptionId: string
  explanation: string
  topic?: string
}

export interface Assessment {
  id: string
  courseId: string
  type: "pretest" | "quiz" | "posttest"
  title: string
  durationMinutes: number
  passingGrade: number
  maxAttempts: number // 0 = unlimited
  randomizeQuestions: boolean
  randomizeOptions: boolean
  questions: AssessmentQuestion[]
}

export interface AssessmentAttempt {
  id: string
  assessmentId: string
  enrollmentId: string
  userId: string
  answers: Record<string, string> // questionId -> optionId
  score: number
  passed: boolean
  startedAt: string
  submittedAt: string
}

export interface Assignment {
  id: string
  courseId: string
  title: string
  brief: string
  expectedOutput: string
  submissionRules: string
  required: boolean
}

export interface AssignmentSubmission {
  id: string
  assignmentId: string
  enrollmentId: string
  userId: string
  note: string
  fileName?: string
  repoLink?: string
  submittedAt: string
  status: AssignmentStatus
  trainerComment?: string
  gradedAt?: string
  gradedBy?: string
}

export interface ApprovalRecord {
  level: ApprovalLevel
  action: ApprovalAction
  actorId: string
  actorName: string
  actorRole: string
  comment: string
  timestamp: string
}

export interface TrainingRequest {
  id: string
  courseId: string
  userId: string
  userName: string
  division: string
  reason: string
  cost: number
  status: TrainingRequestStatus
  createdAt: string
  updatedAt: string
  approvals: ApprovalRecord[]
  supportingDocName?: string
}

export interface Certificate {
  id: string
  uuid: string
  certificateNumber: string
  courseId: string
  courseName: string
  userId: string
  userName: string
  issuedAt: string
  learningHours: number
  issuingAuthority: string
  postTestScore: number
  hcisSyncStatus: "belum" | "tersinkron" | "gagal"
}

export interface LearningFeedback {
  id: string
  enrollmentId: string
  courseId: string
  userId: string
  materialRating: number
  trainerRating: number
  platformRating: number
  mostHelpful: string
  needsImprovement: string
  additionalComment: string
  submittedAt: string
}

export type AuditActor = {
  id: string
  name: string
  role: string
}

export interface AuditLog {
  id: string
  timestamp: string
  actorId: string
  actorName: string
  actorRole: string
  action: string
  entity: string
  entityId: string
  metadata?: Record<string, string | number | boolean>
}
