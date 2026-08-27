"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, BookOpen, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { roleLabels } from "@/lib/data/users"
import { Button } from "@/components/ui/button"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Selamat Pagi"
  if (hour < 15) return "Selamat Siang"
  if (hour < 18) return "Selamat Sore"
  return "Selamat Malam"
}

function getRoleMessage(role?: string) {
  switch (role) {
    case "admin_sdm":
      return "Kelola ekosistem pembelajaran, pantau kebutuhan SDM, dan pastikan setiap proses berjalan tepat waktu."
    case "admin_content":
      return "Pantau kualitas katalog, kelola materi, dan pastikan konten siap dipelajari oleh karyawan."
    case "admin_divisi":
      return "Pantau kebutuhan pelatihan divisi dan bantu tim mendapatkan pembelajaran yang relevan."
    case "manager":
      return "Tinjau pengajuan dari tim Anda dan bantu arahkan pengembangan kompetensi yang berdampak."
    case "trainer":
      return "Kelola materi yang Anda bawakan dan pantau sejauh mana peserta menyelesaikan pelatihan."
    default:
      return "Tingkatkan kompetensi Anda hari ini dengan melanjutkan pelatihan dan target belajar yang sedang berjalan."
  }
}

function getRoleAction(role?: string) {
  switch (role) {
    case "admin_sdm":
      return { href: "/dashboard/persetujuan", label: "Tinjau persetujuan", eyebrow: "Prioritas hari ini", value: "5 pengajuan", note: "menunggu keputusan" }
    case "admin_content":
      return { href: "/dashboard/konten", label: "Kelola konten", eyebrow: "Content health", value: "12 konten", note: "siap ditinjau" }
    case "admin_divisi":
      return { href: "/dashboard/pengajuan", label: "Lihat pengajuan", eyebrow: "Kebutuhan divisi", value: "3 rencana", note: "perlu tindak lanjut" }
    case "manager":
      return { href: "/dashboard/persetujuan", label: "Tinjau tim", eyebrow: "Antrian tim", value: "4 pengajuan", note: "mendekati SLA" }
    case "trainer":
      return { href: "/dashboard/konten", label: "Buka materi", eyebrow: "Kelas aktif", value: "3 kelas", note: "sedang berjalan" }
    default:
      return { href: "/dashboard/katalog", label: "Jelajahi katalog", eyebrow: "Target mingguan", value: "2,5 jam", note: "dari target 4 jam" }
  }
}

export function WelcomeSection() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("Selamat Datang")
  const action = getRoleAction(user?.role)
  
  useEffect(() => {
    setGreeting(getGreeting())
  }, [])
  
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_88%_18%,rgba(236,72,153,0.72),transparent_32%),radial-gradient(circle_at_60%_120%,rgba(37,99,235,0.78),transparent_48%),linear-gradient(135deg,#5B21B6_0%,#1D1038_55%,#101010_100%)] p-6 text-white shadow-[0_22px_70px_rgba(88,28,135,0.28)] sm:p-8">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/15" />
      <div className="relative z-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_250px] md:items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-warning" />
            <span className="text-sm text-white/80">{greeting}</span>
          </div>
          <h2 className="mb-3 font-serif text-3xl font-medium leading-[0.98] tracking-[-0.05em] sm:text-5xl">
            {user?.name || 'Pengguna'}!
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
            {getRoleMessage(user?.role)}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs ring-1 ring-white/20">
              {user?.role ? roleLabels[user.role] : 'Peserta'}
            </span>
            <span className="text-xs text-white/70">
              {user?.division}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href={action.href}><Button>{action.label}<ArrowUpRight className="h-4 w-4" /></Button></Link>
            {user?.role === "peserta" && <Link href="/dashboard/pelatihan"><Button variant="secondary"><BookOpen className="h-4 w-4" />Lanjut belajar</Button></Link>}
          </div>
        </div>
        <Link href={action.href} className="group block rounded-[20px] border border-white/15 bg-black/25 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">{action.eyebrow}</p>
            <ArrowUpRight className="h-4 w-4 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
          <p className="mt-8 text-3xl font-medium tracking-[-0.05em]">{action.value}</p>
          <p className="mt-1 text-sm text-white/60">{action.note}</p>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[64%] rounded-full bg-white transition-all duration-500 group-hover:w-[72%]" /></div>
        </Link>
      </div>
    </section>
  )
}
