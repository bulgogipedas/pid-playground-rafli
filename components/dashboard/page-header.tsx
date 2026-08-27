import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

export interface Crumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  /** Page title, rendered as the single <h1> for the route. */
  title: string
  /** Optional supporting description shown under the title. */
  description?: string
  /** Optional breadcrumb trail. The last item is rendered as the current page. */
  breadcrumbs?: Crumb[]
  /** Optional actions (buttons, filters) aligned to the end on wider screens. */
  actions?: React.ReactNode
  className?: string
}

/**
 * Standard page header used across dashboard routes: breadcrumb, single <h1>,
 * optional description, and an actions slot. Responsive from 360px up.
 */
export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb className="mb-3">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <BreadcrumbItem key={`${crumb.label}-${index}`}>
                  {isLast || !crumb.href ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  )}
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-balance font-serif text-3xl font-medium leading-none tracking-[-0.045em] text-foreground sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
