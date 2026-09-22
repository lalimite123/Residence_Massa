import React from "react"
import type { Metadata, Viewport } from "next"
import { Playfair_Display, Inter } from "next/font/google"

import "./globals.css"

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

export const metadata: Metadata = {
  metadataBase: new URL("https://massaresidence.com"),
  title: "Massa Residence Meublé | Logements de Luxe à Yaoundé",
  description: "Découvrez l'excellence de nos résidences meublées haut de gamme à Yaoundé, Cameroun. Confort exceptionnel, design élégant et service personnalisé.",
  icons: {
    icon: "/images/logo-transparent.png",
    apple: "/images/logo-transparent.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f1419",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${inter.variable} ${playfair.variable} overflow-x-hidden max-w-[100vw]`}>
      <body className="overflow-x-hidden max-w-[100vw] font-sans antialiased">{children}</body>
    </html>
  )
}
