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
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={language} onValueChange={(value) => setLanguage(value as "id" | "en")}>
        <SelectTrigger className="w-[160px] h-9 bg-white border-gray-200">
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
