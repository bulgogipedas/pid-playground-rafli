"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { dummyCourses, dummyEnrollments } from "@/lib/data/courses"
import { dummyTrainingRequests } from "@/lib/data/training-requests"

const chartColors = {
  primary: "#2A438A",
  success: "#047857",
  warning: "#B45309",
  muted: "#E2E8F0",
  violet: "#7C3AED",
}

export function MandatoryTrainingChart() {
  const { user } = useAuth()
  const isLearner = user?.role === "peserta"
  const learnerEnrollments = dummyEnrollments.filter((enrollment) => enrollment.userId === user?.id)
  const requestScope = user?.role === "admin_sdm" || user?.role === "admin_content" || user?.role === "trainer" || user?.role === "manager"
    ? dummyTrainingRequests
    : dummyTrainingRequests.filter((request) => request.division === user?.division).length > 0
      ? dummyTrainingRequests.filter((request) => request.division === user?.division)
      : dummyTrainingRequests

  const data = isLearner
    ? [
        { name: "Selesai", value: learnerEnrollments.filter((item) => item.status === "selesai").length, color: chartColors.success },
        { name: "Sedang Berlangsung", value: learnerEnrollments.filter((item) => item.status === "sedang_berjalan").length, color: chartColors.warning },
        { name: "Belum Dimulai", value: learnerEnrollments.filter((item) => item.status === "belum_mulai").length, color: chartColors.muted },
      ]
    : user?.role === "admin_content" || user?.role === "trainer"
      ? [
          { name: "Terbit", value: dummyCourses.filter((course) => course.status === "published").length, color: chartColors.success },
          { name: "Draft", value: dummyCourses.filter((course) => course.status === "draft").length, color: chartColors.warning },
          { name: "Arsip", value: dummyCourses.filter((course) => course.status === "archived").length, color: chartColors.muted },
        ]
      : [
          { name: "Menunggu Review", value: requestScope.filter((request) => request.status.startsWith("pending")).length, color: chartColors.warning },
          { name: "Disetujui", value: requestScope.filter((request) => request.status === "approved").length, color: chartColors.success },
          { name: "Perlu Revisi", value: requestScope.filter((request) => request.status === "revision").length, color: chartColors.violet },
        ]

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const completed = isLearner
    ? data.find((item) => item.name === "Selesai")?.value || 0
    : data.find((item) => item.name === "Disetujui" || item.name === "Terbit")?.value || 0
  const percentage = total ? Math.round((completed / total) * 100) : 0
  const title = isLearner ? "Progress Pelatihan" : user?.role === "admin_content" || user?.role === "trainer" ? "Status Konten" : "Status Pengajuan"
  const completionLabel = isLearner ? "Selesai" : user?.role === "admin_content" || user?.role === "trainer" ? "Terbit" : "Disetujui"
  let currentAngle = 0
  const ringGradient = total
    ? `conic-gradient(${data.map((item) => {
        const start = currentAngle
        currentAngle += (item.value / total) * 360
        return `${item.color} ${start}deg ${currentAngle}deg`
      }).join(", ")})`
    : "conic-gradient(#2a2a2a 0deg 360deg)"

  return (
    <Card className="h-full border border-border bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center">
        <div className="grid w-full max-w-[480px] grid-cols-[auto_minmax(0,1fr)] items-center gap-5 sm:gap-8">
          {/* Ring Chart */}
          <div className="relative h-28 w-28 shrink-0 rounded-full p-3 sm:h-32 sm:w-32" style={{ background: ringGradient }}>
            <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-card shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              <span className="text-2xl font-bold font-serif text-foreground">{percentage}%</span>
              <span className="text-xs text-muted-foreground">{completionLabel}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="min-w-0 space-y-3">
            {data.map((item) => (
              <div key={item.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                <div className="flex min-w-0 items-start gap-2">
                  <div
                    className="mt-1 h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="min-w-0 text-sm leading-tight text-muted-foreground">{item.name}</span>
                </div>
                <span className="shrink-0 tabular-nums text-sm font-medium">{item.value}</span>
              </div>
            ))}
            <div className="border-t border-border pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="text-sm font-bold text-foreground">{total} Pelatihan</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
