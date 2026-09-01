"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User, UserRole, dummyUsers } from "@/lib/data/users"

export type Language = "id" | "en"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  language: Language
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  switchRole: (role: UserRole) => void // For demo purposes
  setLanguage: (lang: Language) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const USER_STORAGE_KEY = "pyfa_lms_user"
const LEGACY_USER_STORAGE_KEY = "lms_pid_user"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [language, setLanguage] = useState<Language>("id")

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem(LEGACY_USER_STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY)
        localStorage.removeItem(LEGACY_USER_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    // Simulate SSO authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Find user by email (simulating SSO lookup)
    const foundUser = dummyUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (!foundUser) {
      setIsLoading(false)
      return { success: false, error: "Email tidak ditemukan dalam sistem" }
    }
    
    if (foundUser.status === "nonaktif") {
      setIsLoading(false)
      return { success: false, error: "Akun Anda tidak aktif. Silakan hubungi Admin SDM" }
    }
    
    // Simulate password validation (in real SSO, this would be handled by AD)
    if (password.length < 4) {
      setIsLoading(false)
      return { success: false, error: "Password tidak valid" }
    }
    
    // Set user and store in localStorage
    setUser(foundUser)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser))
    localStorage.removeItem(LEGACY_USER_STORAGE_KEY)
    setIsLoading(false)
    
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(USER_STORAGE_KEY)
    localStorage.removeItem(LEGACY_USER_STORAGE_KEY)
  }

  // Demo function to switch between roles
  const switchRole = (role: UserRole) => {
    const userWithRole = dummyUsers.find(u => u.role === role && u.status === "aktif")
    if (userWithRole) {
      setUser(userWithRole)
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithRole))
      localStorage.removeItem(LEGACY_USER_STORAGE_KEY)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        language,
        login,
        logout,
        switchRole,
        setLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Helper to check if user has required role
export function hasRole(user: User | null, allowedRoles: UserRole[]): boolean {
  if (!user) return false
  return allowedRoles.includes(user.role)
}

// Navigation items based on role
export function getNavigationForRole(role: UserRole) {
  const baseNav = [
    { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { label: "Pelatihan Saya", href: "/dashboard/pelatihan", icon: "BookOpen" },
    { label: "Katalog Pelatihan", href: "/dashboard/katalog", icon: "GraduationCap" },
    { label: "Sertifikat", href: "/dashboard/sertifikat", icon: "Award" },
  ]

  // Peserta (Learner)
  const pesertaNav = [
    ...baseNav,
    { label: "Pengajuan Pelatihan", href: "/dashboard/pengajuan", icon: "FileText" },
  ]

  // Trainer (under Admin Content)
  const trainerNav = [
    ...baseNav,
    { label: "Kelola Konten", href: "/dashboard/konten", icon: "FolderOpen" },
  ]

  // Manager (approver under Admin SDM)
  const managerNav = [
    ...baseNav,
    { label: "Persetujuan", href: "/dashboard/persetujuan", icon: "CheckCircle" },
    { label: "Laporan Tim", href: "/dashboard/laporan-tim", icon: "BarChart" },
  ]

  // Admin Divisi (under Admin SDM)
  const adminDivisiNav = [
    baseNav[0],
    { label: "Pengajuan Divisi", href: "/dashboard/pengajuan", icon: "FileText" },
    { label: "Laporan Divisi", href: "/dashboard/laporan-divisi", icon: "BarChart" },
  ]

  // Admin Content (CMS)
  const adminContentNav = [
    baseNav[0],
    { label: "Kelola Konten", href: "/dashboard/konten", icon: "FolderOpen" },
    { label: "Kelola Trainer", href: "/dashboard/trainer", icon: "Users" },
    { label: "Laporan Konten", href: "/dashboard/laporan-konten", icon: "BarChart" },
  ]

  // Admin SDM (LMS - full access)
  const adminSdmNav = [
    baseNav[0],
    { label: "Pengajuan Pelatihan", href: "/dashboard/pengajuan", icon: "FileText" },
    { label: "TNA", href: "/dashboard/tna", icon: "ClipboardList" },
    { label: "Persetujuan", href: "/dashboard/persetujuan", icon: "CheckCircle" },
    { label: "Kelola Konten", href: "/dashboard/konten", icon: "FolderOpen" },
    { label: "Kelola Pengguna", href: "/dashboard/pengguna", icon: "Users" },
    { label: "Audit Log", href: "/dashboard/audit", icon: "FileSearch" },
    { label: "Dashboard Manajemen", href: "/dashboard/manajemen", icon: "BarChart" },
    { label: "Laporan", href: "/dashboard/laporan", icon: "BarChart" },
  ]

  switch (role) {
    case "admin_sdm":
      return adminSdmNav
    case "admin_content":
      return adminContentNav
    case "admin_divisi":
      return adminDivisiNav
    case "manager":
      return managerNav
    case "trainer":
      return trainerNav
    case "peserta":
    default:
      return pesertaNav
  }
}
