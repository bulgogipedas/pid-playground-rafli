"use client"

import Link from "next/link"
import Image from "next/image"
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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
        data-collapsed={isCollapsed}
        className={cn(
          "peer/sidebar fixed left-0 top-0 z-50 flex h-[100dvh] w-[260px] flex-col overflow-x-hidden border-r border-white/10 bg-sidebar text-white transition-all duration-300",
          isCollapsed ? "lg:w-20" : "lg:w-[260px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex min-h-16 items-center border-b border-white/10",
          isCollapsed ? "gap-0.5 px-2 py-3 lg:justify-center" : "justify-between p-4",
        )}>
          <Link href="/dashboard" aria-label="Pyridam Learning" className="flex min-w-0 items-center">
            <div className={cn(
              "flex h-10 shrink-0 items-center overflow-hidden rounded-[10px] bg-[#fff] shadow-[0_6px_20px_rgba(0,0,0,.22)]",
              isCollapsed ? "h-9 w-9 lg:w-9" : "w-[148px] px-2 py-1",
            )}>
              <Image
                src="/pyridam-farma-logo.png"
                alt="Logo PT Pyridam Farma Tbk"
                width={300}
                height={105}
                priority
                className={cn("max-w-none object-contain", isCollapsed ? "h-9 w-[103px] object-left" : "h-full w-full")}
              />
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("hidden text-white hover:bg-white/10 lg:flex", isCollapsed && "size-7")}
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
        <nav aria-label="Navigasi utama" className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-3">
          {navigationSections.map((section, sectionIndex) => (
            <div key={section.label}>
              {/* Section Label */}
              <div className={cn("mb-1 px-3 pb-2 pt-4", isCollapsed && "lg:hidden")}>
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">
                    {section.label}
                  </p>
              </div>

              {/* Section Items */}
              <ul className="space-y-1 mb-4">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  const Icon = iconMap[item.icon] || LayoutDashboard
                  return (
                    <li key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex min-h-11 items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors",
                            isCollapsed && "lg:justify-center lg:gap-0 lg:px-0",
                            isActive
                              ? "bg-foreground text-background"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
                          <span className={cn("text-sm font-medium", isCollapsed && "lg:hidden")}>{item.label}</span>
                        </Link>
                        </TooltipTrigger>
                        {isCollapsed && <TooltipContent side="right" sideOffset={12} className="hidden lg:block">{item.label}</TooltipContent>}
                      </Tooltip>
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
        <div className={cn("border-t border-white/10", isCollapsed ? "p-2" : "space-y-2 p-4")}>
          {user && (
            <div className={cn("space-y-2", isCollapsed && "lg:hidden")}>
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
            </div>
          )}

          {/* Settings & Logout Icons */}
          <div className={cn("flex items-center justify-center", isCollapsed ? "flex-col gap-1" : "gap-3 pt-1")}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/pengaturan"
                  onClick={() => setIsMobileOpen(false)}
                  aria-current={pathname === "/dashboard/pengaturan" ? "page" : undefined}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-[10px] transition-colors",
                    pathname === "/dashboard/pengaturan"
                      ? "bg-sidebar-primary text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                  aria-label="Pengaturan"
                >
                  <Settings aria-hidden="true" className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right" sideOffset={12}>Pengaturan</TooltipContent>}
            </Tooltip>

            {/* Divider */}
            {!isCollapsed && <div className="h-4 w-px bg-white/20" />}

            {/* Logout */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="flex size-10 items-center justify-center rounded-[10px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Keluar"
                >
                  <LogOut aria-hidden="true" className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right" sideOffset={12}>Keluar</TooltipContent>}
            </Tooltip>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setIsCollapsed(false)
          setIsMobileOpen(true)
        }}
        className="fixed left-3 top-2.5 z-40 bg-secondary text-white hover:bg-accent lg:hidden"
        aria-label="Buka menu"
        aria-expanded={isMobileOpen}
      >
        <Menu aria-hidden="true" className="w-5 h-5" />
      </Button>
    </>
  )
}
