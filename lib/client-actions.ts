function sanitizeFilename(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "") || "export"
}

function csvCell(value: unknown) {
  const normalized = value == null ? "" : String(value)
  return `"${normalized.replace(/"/g, '""')}"`
}

export function downloadCsv<T extends object>(filename: string, rows: T[]) {
  if (typeof window === "undefined") return

  const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row))))
  const csv = [
    columns.map(csvCell).join(","),
    ...rows.map((row) => columns.map((column) => csvCell((row as Record<string, unknown>)[column])).join(",")),
  ].join("\n")
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `${sanitizeFilename(filename)}.csv`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function downloadText(filename: string, content: string, mimeType = "text/plain") {
  if (typeof window === "undefined") return

  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export async function shareOrCopy(data: { title: string; text: string; url?: string }) {
  const url = data.url ?? (typeof window !== "undefined" ? window.location.href : "")

  if (typeof navigator !== "undefined" && navigator.share) {
    await navigator.share({ ...data, url })
    return "shared" as const
  }

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    await navigator.clipboard.writeText([data.text, url].filter(Boolean).join("\n"))
    return "copied" as const
  }

  return "unavailable" as const
}

export function printCurrentPage() {
  if (typeof window !== "undefined") window.print()
}
