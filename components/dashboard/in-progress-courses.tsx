"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { getDashboardQueue } from "@/lib/dashboard-metrics"

const toneClasses = {
  primary: "bg-primary",
  warning: "bg-warning",
  success: "bg-success",
  violet: "bg-violet-600",
}

const headerToneClasses = {
  primary: "from-sidebar to-primary",
  warning: "from-sidebar to-warning",
  success: "from-sidebar to-success",
  violet: "from-sidebar to-violet-700",
}

export function InProgressCourses() {
  const { user } = useAuth()
  const queue = getDashboardQueue(user)
  const isLearner = user?.role === "peserta"

  return (
    <Card className="rounded-lg border border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-serif text-lg font-semibold">
          {isLearner ? "Pelatihan Berlangsung" : user?.role === "admin_content" || user?.role === "trainer" ? "Konten yang Dipantau" : "Antrian Tindak Lanjut"}
        </CardTitle>
        <Link href={isLearner ? "/dashboard/pelatihan" : user?.role === "manager" ? "/dashboard/persetujuan" : "/dashboard/pengajuan"}>
          <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/90">
            Lihat semua
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {queue.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center">
            <p className="font-medium text-foreground">Belum ada item untuk ditampilkan</p>
            <p className="mt-1 text-sm text-muted-foreground">Data akan muncul saat ada aktivitas baru.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {queue.map((course) => (
            <div
              key={course.id}
              className="group overflow-hidden rounded-lg border border-border transition-shadow hover:shadow-md"
            >
              {/* Thumbnail */}
              <div className={`relative h-28 bg-gradient-to-br ${headerToneClasses[course.tone]}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
                </div>
                <span className="absolute left-2 top-2 rounded-full bg-white/15 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {course.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs text-muted-foreground">{course.category}</span>
                <h3 className="font-medium text-sm mt-1 line-clamp-2 min-h-[40px]">
                  {course.title}
                </h3>

                {/* Progress */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{isLearner ? "Progress" : "Penyelesaian"}</span>
                    <span className="font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.meta}</span>
                </div>

                {/* CTA */}
                <Link href={course.href}>
                  <Button
                    size="sm"
                    className={`mt-3 w-full ${toneClasses[course.tone]} text-white hover:opacity-90`}
                  >
                    {isLearner ? "Lanjutkan" : "Buka"}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        )}
      </CardContent>
    </Card>
  )
}
