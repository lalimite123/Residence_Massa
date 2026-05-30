"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { Locale } from "@/lib/i18n"

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/")
    segments[1] = newLocale
    return segments.join("/")
  }

  return (
    <div className="flex items-center p-1 bg-secondary rounded-full">
      <Link
        href={switchLocale("fr")}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
          locale === "fr"
            ? "bg-white text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        FR
      </Link>
      <Link
        href={switchLocale("en")}
        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
          locale === "en"
            ? "bg-white text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </Link>
    </div>
  )
}
