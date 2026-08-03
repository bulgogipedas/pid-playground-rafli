"use client"

import { useAuth } from "@/lib/auth-context"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useAuth()

  const languageLabels = {
    id: "Bahasa Indonesia",
    en: "English",
  }

  return (
    <div className="flex items-center gap-2">
      <Globe aria-hidden="true" className="hidden h-4 w-4 text-muted-foreground sm:block" />
      <Select value={language} onValueChange={(value) => setLanguage(value as "id" | "en")}>
        <SelectTrigger aria-label="Pilih bahasa" className="h-9 w-[104px] bg-card sm:w-[160px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id">{languageLabels.id}</SelectItem>
          <SelectItem value="en">{languageLabels.en}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
