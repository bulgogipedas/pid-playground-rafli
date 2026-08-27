"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { roleLabels } from "@/lib/data/users"

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

export function WelcomeSection() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("Selamat Datang")
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'
  
  useEffect(() => {
    setGreeting(getGreeting())
  }, [])
  
  return (
    <section className="relative overflow-hidden rounded-[30px] bg-[radial-gradient(circle_at_88%_18%,rgba(236,72,153,0.72),transparent_32%),radial-gradient(circle_at_60%_120%,rgba(37,99,235,0.78),transparent_48%),linear-gradient(135deg,#5B21B6_0%,#1D1038_55%,#101010_100%)] p-6 text-white shadow-[0_22px_70px_rgba(88,28,135,0.28)] sm:p-8">
      <div aria-hidden="true" className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/15" />
      <div className="flex items-start justify-between">
        <div className="relative z-10">
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
        </div>
        <div className="relative z-10 hidden md:block">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-3xl font-bold font-serif">{initials}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
