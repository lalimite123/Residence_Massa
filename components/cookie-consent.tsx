"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"
import type { Dictionary, Locale } from "@/lib/i18n"

interface CookieConsentProps {
  dict: Dictionary
  locale: Locale
}

export function CookieConsent({ dict, locale }: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Verifier si l'utilisateur a deja fait un choix
    const hasConsented = localStorage.getItem("massa-cookie-consent")
    if (!hasConsented) {
      // Delai leger avant d'afficher pour ne pas agresser l'utilisateur des la 1ere seconde
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("massa-cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("massa-cookie-consent", "declined")
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="container mx-auto max-w-5xl pointer-events-auto">
            <div className="bg-foreground text-primary-foreground rounded-2xl shadow-2xl border border-white/10 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-8">
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Cookie className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/80 leading-relaxed text-pretty">
                    {dict.cookies.message}
                    <Link 
                      href={`/${locale}/privacy`} 
                      className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
                    >
                      {dict.cookies.policyLink}
                    </Link>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-auto shrink-0">
                <Button 
                  variant="outline" 
                  className="flex-1 md:flex-none border-white/20 text-white hover:bg-white/10 hover:text-white"
                  onClick={declineCookies}
                >
                  {dict.cookies.decline}
                </Button>
                <Button 
                  className="flex-1 md:flex-none bg-amber-400 text-stone-950 hover:bg-amber-500"
                  onClick={acceptCookies}
                >
                  {dict.cookies.accept}
                </Button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
