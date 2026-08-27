"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  CheckCircle,
  BarChart3,
  FolderOpen,
  FileSearch,
  X,
  DollarSign,
  PieChart,
  Pill,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { roleLabels, UserRole } from "@/lib/data/users"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  FileText,
  ClipboardList,
  Users,
  Settings,
  CheckCircle,
  BarChart3,
  FolderOpen,
  FileSearch,
  DollarSign,
  PieChart,
}

interface NavItem {
  label: string
  href: string
  icon: string
}

interface NavSection {
  label: string
  items: NavItem[]
}

function getNavigationForRole(role: UserRole): NavSection[] {
  const learningItems: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { label: "Pelatihan Saya", href: "/dashboard/pelatihan", icon: "BookOpen" },
    { label: "Katalog Pelatihan", href: "/dashboard/katalog", icon: "GraduationCap" },
    { label: "Sertifikat", href: "/dashboard/sertifikat", icon: "Award" },
  ]

  // Peserta (Learner) - basic access
  if (role === "peserta") {
    return [
      { label: "Menu Pembelajaran", items: learningItems },
      {
        label: "Menu Kontrol",
        items: [
          { label: "Pengajuan Pelatihan", href: "/dashboard/pengajuan", icon: "FileText" },
          { label: "Upload Sertifikat", href: "/dashboard/upload-sertifikat", icon: "Award" },
        ],
      },
    ]
  }

  // Trainer (under Admin Content) - content creator
  if (role === "trainer") {
    return [
      { label: "Menu Pembelajaran", items: learningItems },
      {
        label: "Menu Kontrol",
        items: [{ label: "Kelola Konten", href: "/dashboard/konten", icon: "FolderOpen" }],
      },
    ]
  }

  // Manager (under Admin SDM) - approver
  if (role === "manager") {
    return [
      { label: "Menu Pembelajaran", items: learningItems },
      {
        label: "Menu Kontrol",
        items: [
          { label: "Persetujuan", href: "/dashboard/persetujuan", icon: "CheckCircle" },
          { label: "Laporan Tim", href: "/dashboard/laporan-tim", icon: "BarChart3" },
          { label: "Biaya & Budget", href: "/dashboard/budget", icon: "DollarSign" },
          { label: "Dashboard Manajemen", href: "/dashboard/manajemen", icon: "PieChart" },
        ],
      },
    ]
  }

  // Admin Divisi (under Admin SDM) - operational access only
  if (role === "admin_divisi") {
    return [
      { label: "Menu Utama", items: [learningItems[0]] },
      {
        label: "Menu Kontrol",
        items: [
          { label: "Pengajuan Divisi", href: "/dashboard/pengajuan", icon: "FileText" },
          { label: "Laporan Divisi", href: "/dashboard/laporan-divisi", icon: "BarChart3" },
          { label: "Biaya & Budget", href: "/dashboard/budget", icon: "DollarSign" },
        ],
      },
    ]
  }

  // Admin Content (CMS) - content management only
  if (role === "admin_content") {
    return [
      { label: "Menu Utama", items: [learningItems[0]] },
      {
        label: "Menu Kontrol",
        items: [
          { label: "Kelola Konten", href: "/dashboard/konten", icon: "FolderOpen" },
          { label: "Kelola Trainer", href: "/dashboard/trainer", icon: "Users" },
          { label: "Laporan Konten", href: "/dashboard/laporan-konten", icon: "BarChart3" },
        ],
      },
    ]
  }

  // Admin SDM (LMS) - system administration only
  if (role === "admin_sdm") {
    return [
      { label: "Menu Utama", items: [learningItems[0]] },
      {
        label: "Menu Kontrol",
        items: [
          { label: "Pengajuan Pelatihan", href: "/dashboard/pengajuan", icon: "FileText" },
          { label: "TNA", href: "/dashboard/tna", icon: "ClipboardList" },
          { label: "Persetujuan", href: "/dashboard/persetujuan", icon: "CheckCircle" },
          { label: "Kelola Konten", href: "/dashboard/konten", icon: "FolderOpen" },
          { label: "Kelola Pengguna", href: "/dashboard/pengguna", icon: "Users" },
          { label: "Biaya & Budget", href: "/dashboard/budget", icon: "DollarSign" },
          { label: "Kelola Surat Tugas", href: "/dashboard/surat-tugas", icon: "FileText" },
          { label: "Validasi Sertifikat", href: "/dashboard/validasi-sertifikat", icon: "Award" },
          { label: "Audit Log", href: "/dashboard/audit", icon: "FileSearch" },
          { label: "Dashboard Manajemen", href: "/dashboard/manajemen", icon: "PieChart" },
          { label: "Laporan", href: "/dashboard/laporan", icon: "BarChart3" },
        ],
      },
    ]
  }

  return [{ label: "Menu Pembelajaran", items: learningItems }]
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, switchRole } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navigationSections = user ? getNavigationForRole(user.role) : []

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false)
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleRoleSwitch = (role: string) => {
    switchRole(role as UserRole)
    router.refresh()
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi"
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-[100dvh] flex-col border-r border-white/10 bg-sidebar text-white transition-all duration-300",
          isCollapsed ? "w-20" : "w-[260px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex min-h-16 items-center justify-between border-b border-white/10 p-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
              <Pill className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <span className="block font-serif text-base font-medium tracking-[-0.04em]">Pyridam Learning</span>
                <p className="truncate text-[11px] text-white/55">PT Pyridam Farma Tbk</p>
              </div>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-white/10 hidden lg:flex"
            aria-label={isCollapsed ? "Perluas menu samping" : "Ciutkan menu samping"}
            aria-expanded={!isCollapsed}
          >
            <ChevronLeft aria-hidden="true" className={cn("w-5 h-5 transition-transform", isCollapsed && "rotate-180")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
            className="text-white hover:bg-white/10 lg:hidden"
            aria-label="Tutup menu"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav aria-label="Navigasi utama" className="flex-1 overflow-y-auto p-3">
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.label}>
              {/* Section Label */}
              {!isCollapsed && (
                <div className="mb-1 px-3 pb-2 pt-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">
                    {section.label}
                  </p>
                </div>
              )}

              {/* Section Items */}
              <ul className="space-y-1 mb-4">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  const Icon = iconMap[item.icon] || LayoutDashboard
                  return (
                    <li key={item.href}>
                        <Link
                          href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex min-h-11 items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors",
                          isActive
                            ? "bg-foreground text-background"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <Icon aria-hidden="true" className="w-5 h-5 shrink-0" />
                        {!isCollapsed && (
                          <span className="text-sm font-medium">{item.label}</span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Divider between sections */}
              {sectionIndex < navigationSections.length - 1 && (
                <div className="my-2 border-t border-white/10" />
              )}
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {!isCollapsed && user && (
            <>
              {/* User Info - Avatar + Name/Role (Left Aligned) */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-white">
                  {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                </div>
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-semibold text-white truncate">{user?.name || 'Pengguna'}</p>
                  <p className="text-xs text-white/60 truncate">{user?.role ? roleLabels[user.role] : 'Peserta'}</p>
                </div>
              </div>

              <p className="text-[11px] text-white/50 mb-1">Mode demo — ganti peran</p>
              <Select value={user?.role} onValueChange={handleRoleSwitch}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white text-xs h-8">
                  <SelectValue placeholder="Ganti Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin_sdm">Admin SDM</SelectItem>
                  <SelectItem value="admin_content">Admin Content</SelectItem>
                  <SelectItem value="admin_divisi">Admin Divisi</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="trainer">Trainer</SelectItem>
                  <SelectItem value="peserta">Peserta</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {/* Settings & Logout Icons */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <Link
              href="/dashboard/pengaturan"
              onClick={() => setIsMobileOpen(false)}
              aria-current={pathname === "/dashboard/pengaturan" ? "page" : undefined}
              className={cn(
                "p-1.5 rounded transition-colors",
                pathname === "/dashboard/pengaturan"
                  ? "bg-sidebar-primary text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
              aria-label="Pengaturan"
              title="Pengaturan"
            >
              <Settings aria-hidden="true" className="w-5 h-5" />
            </Link>

            {/* Divider */}
            <div className="h-4 w-px bg-white/20" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-1.5 rounded transition-colors text-white/70 hover:text-white hover:bg-white/10"
              aria-label="Keluar"
              title="Keluar"
            >
              <LogOut aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-3 top-2.5 z-40 bg-secondary text-white hover:bg-accent lg:hidden"
        aria-label="Buka menu"
        aria-expanded={isMobileOpen}
      >
        <Menu aria-hidden="true" className="w-5 h-5" />
      </Button>
    </>
  )
}
