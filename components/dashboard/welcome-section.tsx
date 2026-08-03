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

export function WelcomeSection() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("Selamat Datang")
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'
  
  useEffect(() => {
    setGreeting(getGreeting())
  }, [])
  
  return (
    <div className="bg-gradient-to-r from-[#102F49] to-[#0879B5] rounded-lg p-6 text-white">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[#D97706]" />
            <span className="text-sm text-white/80">{greeting}</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
            {user?.name || 'Pengguna'}!
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-lg">
            {user?.role === 'admin_sdm' 
              ? 'Kelola sistem pembelajaran dan pantau perkembangan karyawan.'
              : user?.role === 'admin_divisi'
              ? 'Pantau dan setujui pengajuan pelatihan dari tim Anda.'
              : user?.role === 'trainer'
              ? 'Kelola konten pelatihan dan lihat progres peserta.'
              : 'Tingkatkan kompetensi Anda hari ini. Anda memiliki beberapa pelatihan yang perlu diselesaikan.'}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
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
