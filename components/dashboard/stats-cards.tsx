"use client"

import { Activity, Award, Clock, LayoutList, TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { getDashboardMetrics } from "@/lib/dashboard-metrics"

const iconByLabel = (label: string) => {
  if (label.includes("Sertifikat")) return Award
  if (label.includes("Jam")) return Clock
  if (label.includes("Karyawan") || label.includes("Trainer")) return Users
  if (label.includes("Progress") || label.includes("Penyelesaian")) return Activity
  return LayoutList
}

const toneClasses = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  violet: "bg-primary",
}

export function StatsCards() {
  const { user } = useAuth()
  const stats = getDashboardMetrics(user)

  return (
    <div className="grid h-full grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="h-full rounded-xl border border-border bg-card shadow-sm">
          <CardContent className="flex h-full flex-col justify-between p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-bold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.unit}</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp aria-hidden="true" className="w-3 h-3 text-success" />
                  <span className="text-xs text-success">{stat.trend}</span>
                </div>
              </div>
              <div className={`${toneClasses[stat.tone]} rounded-lg p-3`}>
                {(() => {
                  const Icon = iconByLabel(stat.label)
                  return <Icon aria-hidden="true" className="h-5 w-5 text-primary-foreground" />
                })()}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
