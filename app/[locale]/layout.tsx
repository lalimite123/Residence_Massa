import React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { getDictionary, type Locale, locales } from "@/lib/i18n"
import { CookieConsent } from "@/components/cookie-consent"

import "../globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: [
      "logement meublé Yaoundé",
      "appartement luxe Yaoundé",
      "location Cameroun",
      "furnished apartment Yaoundé",
      "Massa Residence",
      "résidence meublée",
      "luxury accommodation Cameroon",
    ],
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `https://massaresidence.com/${locale}`,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      siteName: "Massa Residence Meublé",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#0f1419",
  width: "device-width",
  initialScale: 1,
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  return (
    <div lang={locale} className={`${inter.variable} ${playfair.variable} bg-background font-sans antialiased overflow-x-hidden`}>
      {children}
      <CookieConsent dict={dict} locale={locale} />
    </div>
  )
}