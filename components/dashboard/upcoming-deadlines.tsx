"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarClock, AlertTriangle, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

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
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-[#DC2626]/10 text-[#DC2626]">
          <AlertTriangle className="w-3 h-3" />
          {daysLeft} hari lagi
        </span>
      )
    case "warning":
      return (
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-[#D97706]/10 text-[#D97706]">
          <Clock className="w-3 h-3" />
          {daysLeft} hari lagi
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-[#059669]/10 text-[#059669]">
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
  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-[#0879B5]" />
          <CardTitle className="font-serif text-lg font-semibold">
            Deadline Mendatang
          </CardTitle>
        </div>
        <Link href="/dashboard/pelatihan">
          <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/90">
            Lihat Semua
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {deadlines.map((deadline, index) => (
            <div
              key={deadline.id}
              className={`flex items-center justify-between py-3 ${
                index !== deadlines.length - 1 ? "border-b border-gray-100" : ""
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
