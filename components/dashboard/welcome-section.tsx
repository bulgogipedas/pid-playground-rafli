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
    <div className="rounded-lg bg-gradient-to-r from-sidebar to-primary p-6 text-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-warning" />
            <span className="text-sm text-white/80">{greeting}</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
            {user?.name || 'Pengguna'}!
          </h2>
          <p className="max-w-lg text-sm text-white/80 md:text-base">
            {getRoleMessage(user?.role)}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="rounded-full bg-white/15 px-2 py-1 text-xs ring-1 ring-white/20">
              {user?.role ? roleLabels[user.role] : 'Peserta'}
            </span>
            <span className="text-xs text-white/70">
              {user?.division}
            </span>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-3xl font-bold font-serif">{initials}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
