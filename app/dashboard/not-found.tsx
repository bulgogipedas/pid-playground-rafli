import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="mt-2 font-serif text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-muted-foreground">Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.</p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">Kembali ke dashboard</Link>
      </Button>
    </div>
  )
}
