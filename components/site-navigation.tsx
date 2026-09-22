"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n"
import type { Dictionary } from "@/lib/i18n"

interface SiteNavigationProps {
  locale: Locale
  dict: Dictionary
  /** Always show the dark background (for pages without a dark hero) */
  solid?: boolean
}

export function SiteNavigation({ locale, dict, solid = false }: SiteNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.properties, href: `/${locale}#properties` },
    { label: dict.nav.gallery, href: `/${locale}/galerie` },
    { label: "Tarifs", href: `/${locale}#pricing` },
    { label: dict.nav.location, href: `/${locale}#location` },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || solid
          ? "bg-black/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/images/logo-transparent.png"
              alt="Logo Massa Residence Meublé"
              width={160}
              height={60}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            
            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5"
            >
              <Link href={`/${locale}/contact`}>
                {dict.nav.contact}
              </Link>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 text-lg text-white hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-4 mt-2 border-t border-white/10"
                >
                  <Button
                    asChild
                    className="w-full bg-primary text-primary-foreground rounded-full"
                  >
                    <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)}>
                      {dict.nav.contact}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
