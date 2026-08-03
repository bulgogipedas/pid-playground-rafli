import { dummyCourses, dummyCertificates, dummyEnrollments } from "@/lib/data/courses"
import { dummyTrainingRequests, type RequestStatus } from "@/lib/data/training-requests"
import { dummyUsers, type User, type UserRole } from "@/lib/data/users"

export interface DashboardMetric {
  label: string
  value: string
  unit?: string
  trend: string
  trendUp?: boolean
  tone: "primary" | "success" | "warning" | "violet"
}

export interface DashboardQueueItem {
  id: string
  title: string
  category: string
  progress: number
  meta: string
  badge: string
  href: string
  tone: "primary" | "warning" | "success" | "violet"
}

const pendingStatuses: RequestStatus[] = ["pending_l1", "pending_l2", "pending_l3", "revision"]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function scopedRequests(user: User) {
  if (user.role === "peserta") {
    return dummyTrainingRequests.filter((request) => request.employeeId === user.id)
  }

  if (user.role === "admin_sdm" || user.role === "admin_content" || user.role === "trainer" || user.role === "manager") {
    return dummyTrainingRequests
  }

  const divisionRequests = dummyTrainingRequests.filter((request) => request.division === user.division)
  return divisionRequests.length > 0 ? divisionRequests : dummyTrainingRequests
}

export function getDashboardMetrics(user: User | null): DashboardMetric[] {
  if (!user) return []

  const userEnrollments = dummyEnrollments.filter((enrollment) => enrollment.userId === user.id)
  const userCertificates = dummyCertificates.filter((certificate) => certificate.userId === user.id)
  const requests = scopedRequests(user)
  const pendingRequests = requests.filter((request) => pendingStatuses.includes(request.status))
  const approvedRequests = requests.filter((request) => request.status === "approved")

  switch (user.role) {
    case "peserta": {
      const learningHours = userCertificates.reduce((sum, certificate) => sum + certificate.learningHours, 0)
      const completionRate = userEnrollments.length
        ? Math.round(userEnrollments.reduce((sum, enrollment) => sum + enrollment.progress, 0) / userEnrollments.length)
        : 0

      return [
        {
          label: "Jam Belajar Tercatat",
          value: learningHours.toFixed(1),
          unit: "jam",
          trend: `${userCertificates.length} sertifikat terbit`,
          tone: "primary",
        },
        {
          label: "Sertifikat Diperoleh",
          value: String(userCertificates.length),
          unit: "sertifikat",
          trend: `${approvedRequests.length} pengajuan disetujui`,
          tone: "success",
        },
        {
          label: "Progress Rata-rata",
          value: `${completionRate}%`,
          trend: `${userEnrollments.filter((item) => item.status === "sedang_berjalan").length} pelatihan aktif`,
          tone: "warning",
        },
      ]
    }

    case "manager":
    case "admin_divisi":
      return [
        {
          label: "Menunggu Persetujuan",
          value: String(pendingRequests.length),
          unit: "pengajuan",
          trend: `${requests.length} pengajuan di ${user.division}`,
          tone: "warning",
        },
        {
          label: "Pengajuan Disetujui",
          value: String(approvedRequests.length),
          unit: "pengajuan",
          trend: "Perlu ditindaklanjuti sesuai SLA",
          tone: "success",
        },
        {
          label: "Nilai Pengajuan",
          value: formatCurrency(requests.reduce((sum, request) => sum + request.estimatedCost, 0)),
          trend: "Total kebutuhan pelatihan",
          tone: "primary",
        },
      ]

    case "admin_content":
    case "trainer": {
      const ownedCourses = user.role === "trainer"
        ? dummyCourses.filter((course) => course.instructor === user.name)
        : dummyCourses
      const published = ownedCourses.filter((course) => course.status === "published")
      const averageCompletion = published.length
        ? Math.round(published.reduce((sum, course) => sum + course.completionRate, 0) / published.length)
        : 0

      return [
        {
          label: "Konten Dikelola",
          value: String(ownedCourses.length),
          unit: "pelatihan",
          trend: `${published.length} sudah terbit`,
          tone: "primary",
        },
        {
          label: "Rata-rata Penyelesaian",
          value: `${averageCompletion}%`,
          trend: "Dari pelatihan terbit",
          tone: "success",
        },
        {
          label: "Trainer Aktif",
          value: String(dummyUsers.filter((item) => item.role === "trainer" && item.status === "aktif").length),
          unit: "orang",
          trend: "Terhubung ke katalog LMS",
          tone: "violet",
        },
      ]
    }

    case "admin_sdm":
    default:
      return [
        {
          label: "Pengajuan Menunggu",
          value: String(pendingRequests.length),
          unit: "pengajuan",
          trend: "Butuh review admin",
          tone: "warning",
        },
        {
          label: "Karyawan Aktif",
          value: String(dummyUsers.filter((item) => item.status === "aktif").length),
          unit: "orang",
          trend: "Data sinkron terakhir",
          tone: "primary",
        },
        {
          label: "Katalog Terbit",
          value: String(dummyCourses.filter((course) => course.status === "published").length),
          unit: "pelatihan",
          trend: `${dummyCertificates.length} sertifikat tercatat`,
          tone: "success",
        },
      ]
  }
}

export function getDashboardQueue(user: User | null): DashboardQueueItem[] {
  if (!user) return []

  if (user.role === "peserta") {
    return dummyEnrollments
      .filter((enrollment) => enrollment.userId === user.id && enrollment.status === "sedang_berjalan")
      .map((enrollment) => {
        const course = dummyCourses.find((item) => item.id === enrollment.courseId)
        return course
          ? {
              id: course.id,
              title: course.title,
              category: course.category,
              progress: enrollment.progress,
              meta: `${Math.max(1, Math.ceil((course.duration * (100 - enrollment.progress)) / 100 / 60))} jam tersisa`,
              badge: course.type === "wajib" ? "Wajib" : "Pilihan",
              href: `/dashboard/belajar/${course.id}`,
              tone: course.type === "wajib" ? "warning" : "primary",
            }
          : null
      })
      .filter((item): item is DashboardQueueItem => Boolean(item))
  }

  if (user.role === "admin_content" || user.role === "trainer") {
    return dummyCourses
      .filter((course) => user.role === "admin_content" || course.instructor === user.name)
      .slice(0, 4)
      .map((course) => ({
        id: course.id,
        title: course.title,
        category: course.category,
        progress: course.completionRate,
        meta: `${course.enrollmentCount} peserta terdaftar`,
        badge: course.status === "published" ? "Terbit" : "Draft",
        href: "/dashboard/konten",
        tone: course.status === "published" ? "success" : "violet",
      }))
  }

  return scopedRequests(user)
    .filter((request) => pendingStatuses.includes(request.status))
    .slice(0, 4)
    .map((request) => ({
      id: request.id,
      title: request.trainingName,
      category: request.division,
      progress: request.status === "revision" ? 55 : 35,
      meta: formatCurrency(request.estimatedCost),
      badge: request.status === "revision" ? "Revisi" : "Review",
      href: user.role === "manager" ? "/dashboard/persetujuan" : "/dashboard/pengajuan",
      tone: request.status === "revision" ? "violet" : "warning",
    }))
}
