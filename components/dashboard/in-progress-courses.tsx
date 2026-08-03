"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PlayCircle, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  category: string
  progress: number
  duration: string
  thumbnail: string
  isMandatory: boolean
}

const courses: Course[] = [
  {
    id: "1",
    title: "Keselamatan dan Kesehatan Kerja (K3)",
    category: "Wajib",
    progress: 75,
    duration: "2 jam tersisa",
    thumbnail: "/api/placeholder/300/160",
    isMandatory: true,
  },
  {
    id: "2",
    title: "Microsoft Excel Advanced",
    category: "Technical",
    progress: 45,
    duration: "4 jam tersisa",
    thumbnail: "/api/placeholder/300/160",
    isMandatory: false,
  },
  {
    id: "3",
    title: "Effective Communication Skills",
    category: "Soft Skill",
    progress: 20,
    duration: "6 jam tersisa",
    thumbnail: "/api/placeholder/300/160",
    isMandatory: false,
  },
]

export function InProgressCourses() {
  return (
    <Card className="rounded-lg border border-gray-100 shadow-sm bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-serif text-lg font-semibold">
          Pelatihan Berlangsung
        </CardTitle>
        <Link href="/dashboard/pelatihan">
          <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/90">
            Lihat Semua
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative h-32 bg-gradient-to-br from-[#102F49] to-[#0879B5]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
                </div>
                {course.isMandatory && (
                  <span className="absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-medium bg-[#D97706] text-white">
                    Wajib
                  </span>
                )}
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
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.duration}</span>
                </div>

                {/* CTA */}
                <Link href={`/dashboard/belajar/${course.id}`}>
                  <Button
                    size="sm"
                    className="w-full mt-3 bg-[#0879B5] hover:bg-[#0879B5]/90 text-white"
                  >
                    Lanjutkan
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
