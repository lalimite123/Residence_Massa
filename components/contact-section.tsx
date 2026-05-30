"use client"

import { ArrowUpRight, MapPin, Phone, Mail, Car, Facebook } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { WHATSAPP_NUMBERS } from "@/components/whatsapp-button"
import type { Dictionary } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

interface ContactSectionProps {
  dict: Dictionary
  locale: Locale
}

export function ContactSection({ dict, locale }: ContactSectionProps) {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal(0.15)
  const { ref: bodyRef, isVisible: bodyVisible } = useScrollReveal(0.1)

  const content = {
    contactUs: locale === "fr" ? "Contactez-nous" : "Contact us",
    discussTitle: locale === "fr" ? "Discutons de votre" : "Let's discuss your",
    discussSubtitle: locale === "fr" ? "prochain sejour" : "next stay",
    followFacebook: locale === "fr" ? "Suivez-nous sur Facebook" : "Follow us on Facebook",
    ourServices: locale === "fr" ? "Nos Services" : "Our Services",
    furnishedResidences: locale === "fr" ? "Residences Meublees" : "Furnished Residences",
    vehicleRental: locale === "fr" ? "Location de Vehicules" : "Vehicle Rental",
    address: locale === "fr" ? "Adresse" : "Address",
    viewOnMaps: locale === "fr" ? "Voir sur Google Maps" : "View on Google Maps",
    available: locale === "fr" ? "Disponible 7j/7 de 8h a 22h" : "Available 7 days a week from 8am to 10pm",
  }

  return (
    <section id="contact" className="px-4 md:px-6 lg:px-12 xl:px-20 py-16 md:py-28 lg:py-36 bg-foreground text-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-28">
        <div
          ref={headRef}
          className={`transition-all duration-1000 ${
            headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-background/40 mb-6 md:mb-8">
            {content.contactUs}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-extralight leading-[1.15] tracking-tight text-balance">
            {content.discussTitle}<br />{content.discussSubtitle}
          </h2>
          <div className="mt-8 md:mt-10 space-y-3 md:space-y-4">
            <a
              href="mailto:massaresidence13@gmail.com"
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-background/60 hover:text-background transition-colors duration-500"
            >
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span className="border-b border-background/20 pb-0.5 group-hover:border-background/60 transition-colors duration-500 break-all">
                massaresidence13@gmail.com
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
            <br />
            <a
              href="https://www.facebook.com/share/1MMNRcxk8Y/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm tracking-wide text-background/60 hover:text-background transition-colors duration-500"
            >
              <Facebook className="h-4 w-4 flex-shrink-0" />
              <span className="border-b border-background/20 pb-0.5 group-hover:border-background/60 transition-colors duration-500">
                {content.followFacebook}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Services */}
          <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-background/10">
            <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-background/35 mb-4 md:mb-5">
              {content.ourServices}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/10 rounded-full text-xs md:text-sm text-background/70">
                {content.furnishedResidences}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 rounded-full text-xs md:text-sm text-amber-300">
                <Car className="w-3 h-3 md:w-4 md:h-4" />
                {content.vehicleRental}
              </span>
            </div>
          </div>
        </div>

        <div
          ref={bodyRef}
          className={`flex flex-col justify-end transition-all duration-1000 delay-200 ${
            bodyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            <div>
              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-background/35 mb-4 md:mb-5">
                {content.address}
              </p>
              <p className="text-sm leading-[1.75] text-background/55">
                <MapPin className="inline h-4 w-4 mr-2" />
                Yaounde - Fougerolle<br />
                GPS: 2271 Rue 5.525<br />
                Cameroun
              </p>
              <a
                href="https://maps.app.goo.gl/TjNjhEFNHhQfaRm29?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors duration-500 mt-4"
              >
                <span className="border-b border-background/20 pb-0.5 group-hover:border-background/60 transition-colors duration-500">
                  {content.viewOnMaps}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
            <div>
              <p className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-background/35 mb-4 md:mb-5">
                WhatsApp
              </p>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-background/55 hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +237 676 961 949
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBERS.secondary}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-background/55 hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +237 698 217 257
                </a>
              </div>
              <p className="text-xs text-background/40 mt-4">
                {content.available}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
