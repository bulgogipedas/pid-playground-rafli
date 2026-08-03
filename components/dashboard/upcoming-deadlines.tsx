"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarClock, AlertTriangle, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { dummyTrainingRequests } from "@/lib/data/training-requests"

interface Deadline {
  id: string
  title: string
  type: "training" | "certificate" | "assessment"
  dueDate: string
  daysLeft: number
  status: "urgent" | "warning" | "normal"
}

const deadlines: Deadline[] = [
  {
    id: "1",
    title: "Pelatihan Keselamatan Kerja",
    type: "training",
    dueDate: "15 Jan 2025",
    daysLeft: 3,
    status: "urgent",
  },
  {
    id: "2",
    title: "Sertifikasi ISO 9001 - Renewal",
    type: "certificate",
    dueDate: "22 Jan 2025",
    daysLeft: 10,
    status: "warning",
  },
  {
    id: "3",
    title: "Assessment Leadership Level 2",
    type: "assessment",
    dueDate: "30 Jan 2025",
    daysLeft: 18,
    status: "normal",
  },
  {
    id: "4",
    title: "Microsoft Excel Advanced",
    type: "training",
    dueDate: "5 Feb 2025",
    daysLeft: 24,
    status: "normal",
  },
  {
    id: "5",
    title: "Compliance Training Q1",
    type: "training",
    dueDate: "10 Feb 2025",
    daysLeft: 29,
    status: "normal",
  },
]

function getStatusBadge(status: Deadline["status"], daysLeft: number) {
  switch (status) {
    case "urgent":
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-destructive/20 bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">
          <AlertTriangle className="w-3 h-3" />
          {daysLeft} hari lagi
        </span>
      )
    case "warning":
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-warning/20 bg-warning/10 px-2 py-1 text-xs font-medium text-warning">
          <Clock className="w-3 h-3" />
          {daysLeft} hari lagi
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-success/20 bg-success/10 px-2 py-1 text-xs font-medium text-success">
          <Clock className="w-3 h-3" />
          {daysLeft} hari lagi
        </span>
      )
  }
}

function getTypeLabel(type: Deadline["type"]) {
  switch (type) {
    case "training":
      return "Pelatihan"
    case "certificate":
      return "Sertifikat"
    case "assessment":
      return "Assessment"
    default:
      return type
  }
}

export function UpcomingDeadlines() {
  const { user } = useAuth()
  const isLearner = user?.role === "peserta"
  const roleDeadlines: Deadline[] = (user?.role === "admin_sdm" || user?.role === "admin_content" || user?.role === "trainer" || user?.role === "manager"
    ? dummyTrainingRequests
    : dummyTrainingRequests.filter((request) => request.division === user?.division).length > 0
      ? dummyTrainingRequests.filter((request) => request.division === user?.division)
      : dummyTrainingRequests)
    .filter((request) => request.status.startsWith("pending") || request.status === "revision")
    .slice(0, 5)
    .map((request) => ({
      id: request.id,
      title: request.trainingName,
      type: "training" as const,
      dueDate: new Date(request.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      daysLeft: Math.max(1, Math.ceil((new Date(request.startDate).getTime() - Date.now()) / 86400000)),
      status: request.status === "revision" ? "warning" as const : "urgent" as const,
    }))
  const visibleDeadlines = isLearner ? deadlines : roleDeadlines

  return (
    <Card className="rounded-lg border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-primary" />
          <CardTitle className="font-serif text-lg font-semibold">
            {isLearner ? "Deadline Mendatang" : "Aktivitas Perlu Perhatian"}
          </CardTitle>
        </div>
        <Link href={isLearner ? "/dashboard/pelatihan" : user?.role === "manager" ? "/dashboard/persetujuan" : "/dashboard/pengajuan"}>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            Lihat Semua
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
            {visibleDeadlines.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
                <p className="font-medium text-foreground">Tidak ada aktivitas mendesak</p>
                <p className="mt-1 text-sm text-muted-foreground">Semua item dalam scope Anda sudah tertangani.</p>
              </div>
            ) : visibleDeadlines.map((deadline, index) => (
            <div
              key={deadline.id}
              className={`flex items-center justify-between py-3 ${
                index !== visibleDeadlines.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">{getTypeLabel(deadline.type)}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{deadline.dueDate}</span>
                </div>
                <h4 className="font-medium text-sm truncate">{deadline.title}</h4>
              </div>
              <div className="flex items-center gap-3 ml-4">
                {getStatusBadge(deadline.status, deadline.daysLeft)}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
