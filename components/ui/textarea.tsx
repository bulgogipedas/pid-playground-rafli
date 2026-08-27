import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'placeholder:text-muted-foreground focus-visible:border-ring/50 focus-visible:ring-ring/20 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-24 w-full rounded-[10px] border border-white/10 bg-input px-3.5 py-3 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-40 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
