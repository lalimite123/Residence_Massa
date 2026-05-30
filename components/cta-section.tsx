"use client"

import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WhatsAppLink } from "./whatsapp-button"
import type { Dictionary } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

interface CtaSectionProps {
  dict: Dictionary
  locale: Locale
}

export function CtaSection({ dict, locale }: CtaSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
            {dict.contact.title}
          </h2>

          {/* Subtitle */}
          <p className="text-primary-foreground/80 mb-8 text-lg">
            {dict.contact.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppLink
              message="Bonjour Massa Residence, je suis intéressé(e) par vos logements de luxe à Yaoundé."
              className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] text-white rounded-full font-medium hover:bg-[#20bd5a] transition-all duration-300 shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {dict.contact.whatsapp}
            </WhatsAppLink>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 rounded-full px-6"
            >
              <Link href={`/${locale}/contact`}>
                {dict.nav.contact}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
