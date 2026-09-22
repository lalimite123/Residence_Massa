"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook } from "lucide-react"
import type { Dictionary, Locale } from "@/lib/i18n"
import { WHATSAPP_NUMBERS } from "@/components/whatsapp-button"
import { VehicleModal } from "@/components/vehicle-modal"

interface SiteFooterProps {
  dict: Dictionary
  locale: Locale
}

export function SiteFooter({ dict, locale }: SiteFooterProps) {
  const currentYear = new Date().getFullYear()

  const navItems = [
    { label: dict.nav.home, href: `/${locale}` },
    { label: dict.nav.properties, href: `/${locale}#properties` },
    { label: dict.nav.about, href: `/${locale}#about` },
    { label: dict.nav.location, href: `/${locale}#location` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ]

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <Image
                src="/images/logo-transparent.png"
                alt="Logo Massa Residence Meublé - Pied de page"
                width={180}
                height={90}
                className="w-auto h-16 object-contain"
              />
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
              {dict.footer.tagline}
            </p>
            <div className="flex items-start gap-2 text-primary-foreground/60 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Yaounde - Fougerolle<br />
                GPS: 2271 Rue 5.525
              </span>
            </div>
            {/* Services badge */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/20 rounded text-xs text-primary">
                Residences
              </span>
              <VehicleModal locale={locale} />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">
              {dict.nav.contact}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+237 676 961 949</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBERS.secondary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+237 698 217 257</span>
              </a>
              <a
                href="mailto:massaresidence13@gmail.com"
                className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">massaresidence13@gmail.com</span>
              </a>
              <a
                href="https://www.facebook.com/share/1GYMn2UgrW/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-4 h-4 flex-shrink-0" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com/@massaresidence?_r=1&_t=ZG-96gRXIoS7wv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.46-.24-2.42.59-4.85 2.27-6.52 1.25-1.2 2.91-1.89 4.67-1.89h.03v4.06c-.82-.01-1.63.15-2.35.58-.75.44-1.34 1.15-1.52 2.01-.15.7-.05 1.45.28 2.08.38.71 1.05 1.22 1.81 1.41.77.18 1.59.08 2.29-.28.84-.44 1.42-1.26 1.6-2.19.04-.23.05-.47.05-.71V.02z" />
                </svg>
                <span>TikTok</span>
              </a>
            </div>
            <p className="text-xs text-primary-foreground/40 mt-3">{dict.contact.hours}</p>
          </div>

          {/* Legal & Maps */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4">
              Localisation
            </h4>
            <a
              href="https://maps.app.goo.gl/TjNjhEFNHhQfaRm29?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Voir sur Google Maps
            </a>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 mt-6">
              Legal
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {dict.footer.links.privacy}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {dict.footer.links.terms}
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/10 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-primary-foreground/40">
              &copy; {currentYear} Massa Residence Meuble. {dict.footer.rights}.
            </p>
            <p className="text-xs text-primary-foreground/30">
              Yaounde - Fougerolle, Cameroun
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
