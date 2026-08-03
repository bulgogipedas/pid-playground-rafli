"use client"

import { Clock, Award, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Jam Belajar YTD",
    value: "48.5",
    unit: "jam",
    icon: Clock,
    trend: "+12.5 dari bulan lalu",
    trendUp: true,
    color: "bg-primary",
  },
  {
    label: "Sertifikat Diperoleh",
    value: "12",
    unit: "sertifikat",
    icon: Award,
    trend: "+3 tahun ini",
    trendUp: true,
    color: "bg-success",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-lg border border-border shadow-sm bg-card">
          <CardContent className="p-5">
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
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon aria-hidden="true" className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
