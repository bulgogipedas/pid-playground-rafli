"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-warning" aria-hidden="true" />
      <h1 className="font-serif text-2xl font-bold">Dashboard belum bisa dimuat</h1>
      <p className="mt-2 text-muted-foreground">Terjadi gangguan sementara. Silakan coba lagi.</p>
      <Button className="mt-6 gap-2" onClick={() => reset()}>
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Coba lagi
      </Button>
    </div>
  )
}
