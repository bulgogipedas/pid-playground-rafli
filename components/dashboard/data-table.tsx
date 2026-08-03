"use client"

import { Search, Inbox, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/**
 * Shared toolbar for table/list views: labeled search + optional filter/action
 * slot + optional result count. Keeps search affordances consistent app-wide.
 */
interface DataTableToolbarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  /** Accessible label for the search field (visually hidden). */
  searchLabel?: string
  /** Unique id so the label is programmatically associated with the input. */
  searchId?: string
  /** Filter controls, view toggles, or actions rendered to the right. */
  children?: React.ReactNode
  /** Optional result-count summary shown below the controls. */
  resultCount?: number
  className?: string
}

export function DataTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Cari...",
  searchLabel = "Cari dalam tabel",
  searchId = "data-table-search",
  children,
  resultCount,
  className,
}: DataTableToolbarProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onSearchChange && (
          <div className="relative w-full sm:max-w-xs">
            <label htmlFor={searchId} className="sr-only">
              {searchLabel}
            </label>
            <Search
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            />
            <Input
              id={searchId}
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-10"
            />
          </div>
        )}
        {children && (
          <div className="flex flex-wrap items-center gap-2">{children}</div>
        )}
      </div>
      {typeof resultCount === "number" && (
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {resultCount} hasil ditemukan
        </p>
      )}
    </div>
  )
}

/**
 * Responsive horizontal-scroll container for wide tables. On narrow screens the
 * table scrolls instead of overflowing the viewport (supports 360px up).
 */
export function ResponsiveTable({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-border", className)}>
      {children}
    </div>
  )
}

/**
 * Consistent empty state for tables/lists with no rows (or filtered to zero).
 */
export function TableEmptyState({
  title = "Tidak ada data",
  description,
  icon: Icon = Inbox,
  action,
}: {
  title?: string
  description?: string
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon aria-hidden={true} className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground text-pretty">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}

/**
 * Simple skeleton block for table/list loading states.
 */
export function TableLoadingState({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2 p-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Memuat data...</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Loader2 className="sr-only" />
        </div>
      ))}
    </div>
  )
}
