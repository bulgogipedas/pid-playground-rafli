export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6" aria-label="Memuat dashboard" role="status">
      <div className="h-44 animate-pulse rounded-lg bg-muted" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-64 animate-pulse rounded-lg bg-muted" />
        <div className="h-64 animate-pulse rounded-lg bg-muted lg:col-span-2" />
      </div>
      <div className="h-48 animate-pulse rounded-lg bg-muted" />
      <span className="sr-only">Dashboard sedang dimuat</span>
    </div>
  )
}
