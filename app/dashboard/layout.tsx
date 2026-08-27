"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLearningPlayer = pathname.startsWith("/dashboard/belajar/")

  if (isLearningPlayer) {
    return <div className="min-h-[100dvh] bg-background">{children}</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Skip to content (keyboard/screen-reader users) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Lewati ke konten utama
      </a>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="min-w-0 transition-all duration-300 lg:pl-[260px] peer-data-[collapsed=true]/sidebar:lg:pl-20">
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="min-w-0 px-4 pb-10 pt-20 focus:outline-none sm:px-7 sm:pt-8 lg:px-10"
        >
          <div className="mx-auto w-full max-w-[1199px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
