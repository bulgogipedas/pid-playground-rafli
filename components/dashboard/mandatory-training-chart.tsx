"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { useAuth } from "@/lib/auth-context"
import { dummyCourses, dummyEnrollments } from "@/lib/data/courses"
import { dummyTrainingRequests } from "@/lib/data/training-requests"

const chartColors = {
  primary: "#0879B5",
  success: "#059669",
  warning: "#D97706",
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

  return (
    <Card className="rounded-lg border border-border bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-lg font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {/* Ring Chart */}
          <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-serif text-foreground">{percentage}%</span>
              <span className="text-xs text-muted-foreground">{completionLabel}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
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
