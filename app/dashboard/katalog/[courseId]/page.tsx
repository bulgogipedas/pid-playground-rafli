import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CourseDetailPage } from "@/components/dashboard/course-detail-page"
import { dummyCourses } from "@/lib/data/courses"

type CourseDetailRouteProps = {
  params: Promise<{ courseId: string }>
}

export function generateStaticParams() {
  return dummyCourses
    .filter((course) => course.status === "published")
    .map((course) => ({ courseId: course.id }))
}

export async function generateMetadata({ params }: CourseDetailRouteProps): Promise<Metadata> {
  const { courseId } = await params
  const course = dummyCourses.find((item) => item.id === courseId && item.status === "published")

  if (!course) return { title: "Pelatihan tidak ditemukan | Pyridam Learning" }

  const imageUrl = new URL(course.thumbnail, "https://pyfa-lms.netlify.app").toString()
  const title = `${course.title} | Pyridam Learning`

  return {
    title,
    description: course.description,
    openGraph: {
      title,
      description: course.description,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: course.description,
      images: [imageUrl],
    },
  }
}

export default async function CourseDetailRoute({ params }: CourseDetailRouteProps) {
  const { courseId } = await params
  const course = dummyCourses.find((item) => item.id === courseId && item.status === "published")

  if (!course) notFound()

  return <CourseDetailPage course={course} />
}
