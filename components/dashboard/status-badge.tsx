import type { LucideIcon } from "lucide-react"
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Info,
  Circle,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Semantic status tones. Each maps to a token-based color pair plus a default
 * icon so status is never communicated by color alone (WCAG 1.4.1).
 */
export type StatusTone =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "pending"
  | "progress"

const toneStyles: Record<StatusTone, { className: string; icon: LucideIcon }> = {
  success: {
    className: "bg-success/10 text-success border-success/20",
    icon: CheckCircle2,
  },
  warning: {
    className: "bg-warning/10 text-warning border-warning/20",
    icon: AlertTriangle,
  },
  danger: {
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
  info: {
    className: "bg-primary/10 text-primary border-primary/20",
    icon: Info,
  },
  neutral: {
    className: "bg-muted text-muted-foreground border-border",
    icon: Circle,
  },
  pending: {
    className: "bg-warning/10 text-warning border-warning/20",
    icon: Clock,
  },
  progress: {
    className: "bg-primary/10 text-primary border-primary/20",
    icon: Loader2,
  },
}

interface StatusBadgeProps {
  /** Semantic tone controlling color + default icon. */
  tone: StatusTone
  /** Visible label text. */
  children: React.ReactNode
  /** Override the default icon for the tone. Pass null to hide the icon. */
  icon?: LucideIcon | null
  className?: string
}

/**
 * Consistent, accessible status pill used across tables and detail views.
 * Renders an icon + text so meaning does not rely on color alone.
 */
export function StatusBadge({ tone, children, icon, className }: StatusBadgeProps) {
  const { className: toneClass, icon: defaultIcon } = toneStyles[tone]
  const Icon = icon === null ? null : icon ?? defaultIcon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClass,
        className,
      )}
    >
      {Icon ? <Icon aria-hidden="true" className="w-3.5 h-3.5 shrink-0" /> : null}
      {children}
    </span>
  )
}
