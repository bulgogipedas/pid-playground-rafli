"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Bell, Moon, Search, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { useTheme } from "next-themes"

const notifications = [
  {
    id: 1,
    title: "Pelatihan Baru Tersedia",
    message: "Microsoft Excel Advanced telah ditambahkan ke katalog",
    time: "5 menit lalu",
    unread: true,
  },
  {
    id: 2,
    title: "Deadline Mendekati",
    message: "Pelatihan Keselamatan Kerja berakhir dalam 3 hari",
    time: "1 jam lalu",
    unread: true,
  },
  {
    id: 3,
    title: "Sertifikat Terbit",
    message: "Sertifikat Leadership Essentials telah diterbitkan",
    time: "Kemarin",
    unread: false,
  },
]

export function Header() {
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [isThemeReady, setIsThemeReady] = useState(false)
  const [notificationItems, setNotificationItems] = useState(notifications)
  const unreadCount = notificationItems.filter((n) => n.unread).length

  useEffect(() => setIsThemeReady(true), [])

  const openNotification = (notificationId: number) => {
    setNotificationItems((current) => current.map((item) => item.id === notificationId ? { ...item, unread: false } : item))
    const target = notificationId === 1 ? "/dashboard/katalog" : notificationId === 2 ? "/dashboard/pelatihan" : "/dashboard/sertifikat"
    router.push(target)
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = String(formData.get("query") || "").trim()

    if (!query) {
      toast.info("Masukkan kata kunci untuk mencari pelatihan")
      return
    }

    router.push(`/dashboard/katalog?search=${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b border-border bg-background/85 px-3 pl-16 backdrop-blur-xl sm:px-7 sm:pl-16 lg:px-10">
      {/* Search */}
      <div className="min-w-0 max-w-md flex-1">
        <form role="search" onSubmit={handleSearch} className="relative">
          <label htmlFor="global-search" className="sr-only">
            Cari pelatihan, sertifikat, atau pengguna
          </label>
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          />
          <Input
            id="global-search"
            name="query"
            type="search"
            placeholder="Cari pelatihan, sertifikat..."
            className="border-border bg-card pl-10 pr-10 focus-visible:ring-ring/20"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon-sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Jalankan pencarian"
          >
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label={resolvedTheme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
          className="hidden sm:inline-flex"
        >
          {isThemeReady && resolvedTheme === "dark" ? <Sun aria-hidden="true" className="h-5 w-5" /> : <Moon aria-hidden="true" className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={
                unreadCount > 0
                  ? `Notifikasi, ${unreadCount} belum dibaca`
                  : "Notifikasi"
              }
            >
              <Bell aria-hidden="true" className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center"
                >
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="font-serif">Notifikasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notificationItems.map((notification) => (
              <DropdownMenuItem key={notification.id} onClick={() => openNotification(notification.id)} className="flex flex-col items-start gap-1 py-3 cursor-pointer">
                <div className="flex items-start gap-2 w-full">
                  {notification.unread && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-ring" />
                  )}
                  <div className={notification.unread ? "" : "pl-4"}>
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={unreadCount === 0}
              onClick={() => setNotificationItems((current) => current.map((item) => ({ ...item, unread: false })))}
              className="text-center text-primary cursor-pointer justify-center"
            >
              Tandai semua dibaca
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Current Date */}
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground px-3">
          <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </header>
  )
}
