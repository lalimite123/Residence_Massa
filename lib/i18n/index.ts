import "server-only"

export type Locale = "fr" | "en"

export const locales: Locale[] = ["fr", "en"]
export const defaultLocale: Locale = "fr"

const dictionaries = {
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.fr()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
