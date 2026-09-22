"use client"

import { motion } from "framer-motion"
import { Check, Plane, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

interface PricingSectionProps {
  dict: Dictionary
  locale: Locale
}

const pricingData = {
  fr: [
    { duration: "01 Jour", studio: 55000, apartment: 70000 },
    { duration: "01 Semaine", studio: 50000, apartment: 65000 },
    { duration: "02 Semaines", studio: 45000, apartment: 60000 },
    { duration: "03 Semaines", studio: 40000, apartment: 55000 },
    { duration: "01 Mois", studio: 35000, apartment: 50000 },
  ],
  en: [
    { duration: "01 Day", studio: 55000, apartment: 70000 },
    { duration: "01 Week", studio: 50000, apartment: 65000 },
    { duration: "02 Weeks", studio: 45000, apartment: 60000 },
    { duration: "03 Weeks", studio: 40000, apartment: 55000 },
    { duration: "01 Month", studio: 35000, apartment: 50000 },
  ]
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR").format(price)
}

export function PricingSection({ locale }: PricingSectionProps) {
  const currentPricingData = pricingData[locale]

  const text = {
    title: locale === 'fr' ? 'Notre Grille Tarifaire' : 'Our Pricing Plan',
    subtitle: locale === 'fr' ? 'Tarification' : 'Pricing',
    studioTitle: locale === 'fr' ? 'STUDIO MODERNE' : 'MODERN STUDIO',
    studioDesc: locale === 'fr' ? '1 chambre, 1 salle de bain, salon, cuisine et balcon' : '1 bedroom, 1 bathroom, living room, kitchen and balcony',
    aptTitle: locale === 'fr' ? 'APPARTEMENT MODERNE' : 'MODERN APARTMENT',
    aptDesc: locale === 'fr' ? '2 chambres, 2 salles de bain, salon, cuisine et 2 balcons' : '2 bedrooms, 2 bathrooms, living room, kitchen and 2 balconies',
    perDay: locale === 'fr' ? 'FCFA/Jour' : 'FCFA/Day',
    daysCount: locale === 'fr' ? 'NOMBRE DE JOURS' : 'NUMBER OF DAYS',
    vatNote: locale === 'fr' ? 'NB.: TVA en SUS' : 'Note: VAT excluded',
    reception: locale === 'fr' ? 'Reception 24h/24' : '24/7 Reception',
    receptionDesc: locale === 'fr' ? 'Notre equipe est disponible a tout moment pour vous accueillir.' : 'Our team is available at all times to welcome you.',
    shuttle: locale === 'fr' ? 'Navette Aeroport Gratuite' : 'Free Airport Shuttle',
    shuttleDesc: locale === 'fr' ? 'Service de navette inclus pour votre confort.' : 'Shuttle service included for your comfort.',
    wifi: locale === 'fr' ? 'Wi-Fi inclus' : 'Free Wi-Fi',
    ac: locale === 'fr' ? 'Climatisation' : 'Air Conditioning',
    kitchen: locale === 'fr' ? 'Cuisine equipee' : 'Equipped kitchen',
    car: locale === 'fr' ? 'Location de vehicules' : 'Car rental',
    bookBtn: locale === 'fr' ? 'Reserver maintenant' : 'Book now'
  }
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
            {text.subtitle}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground tracking-tight">
            {text.title}
          </h2>
        </motion.div>

        {/* Pricing Table - Mobile Card View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:hidden space-y-4"
        >
          {/* Studio Card */}
          <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
            <div className="bg-emerald-600 text-white p-4 text-center">
              <h3 className="font-semibold text-lg">{text.studioTitle}</h3>
              <p className="text-sm text-white/80 mt-1">{text.studioDesc}</p>
            </div>
            <div className="divide-y divide-border">
              {currentPricingData.map((row, index) => (
                <div key={index} className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">{row.duration}</span>
                  <span className="font-semibold text-foreground">{formatPrice(row.studio)} {text.perDay}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apartment Card */}
          <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
            <div className="bg-amber-500 text-white p-4 text-center">
              <h3 className="font-semibold text-lg">{text.aptTitle}</h3>
              <p className="text-sm text-white/80 mt-1">{text.aptDesc}</p>
            </div>
            <div className="divide-y divide-border">
              {currentPricingData.map((row, index) => (
                <div key={index} className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">{row.duration}</span>
                  <span className="font-semibold text-foreground">{formatPrice(row.apartment)} {text.perDay}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing Table - Desktop View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:block max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3">
              <div className="bg-secondary p-4 lg:p-6 flex items-center justify-center">
                <span className="font-semibold text-foreground text-center">{text.daysCount}</span>
              </div>
              <div className="bg-emerald-600 p-4 lg:p-6 text-center text-white">
                <h3 className="font-bold text-lg">{text.studioTitle}</h3>
                <p className="text-sm text-white/80 mt-1">({text.studioDesc})</p>
              </div>
              <div className="bg-amber-500 p-4 lg:p-6 text-center text-white">
                <h3 className="font-bold text-lg">{text.aptTitle}</h3>
                <p className="text-sm text-white/80 mt-1">({text.aptDesc})</p>
              </div>
            </div>

            {/* Table Body */}
            {currentPricingData.map((row, index) => {
              const rowColors = [
                "bg-red-100",
                "bg-orange-100",
                "bg-yellow-100",
                "bg-lime-100",
                "bg-green-100",
              ]
              return (
                <div key={index} className={`grid grid-cols-3 ${rowColors[index]}`}>
                  <div className="p-4 lg:p-5 flex items-center justify-center border-r border-border/50">
                    <span className="font-medium text-foreground">{row.duration}</span>
                  </div>
                  <div className="p-4 lg:p-5 flex items-center justify-center border-r border-border/50">
                    <span className="font-semibold text-foreground">{formatPrice(row.studio)} {text.perDay}</span>
                  </div>
                  <div className="p-4 lg:p-5 flex items-center justify-center">
                    <span className="font-semibold text-foreground">{formatPrice(row.apartment)} {text.perDay}</span>
                  </div>
                </div>
              )
            })}

            {/* Footer Note */}
            <div className="bg-sky-100 p-4 text-center">
              <span className="text-sm text-foreground font-medium">{text.vatNote}</span>
            </div>
          </div>
        </motion.div>

        {/* Services Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-14"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-amber-500/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{text.reception}</h3>
                  <p className="text-sm text-muted-foreground">{text.receptionDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Plane className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{text.shuttle}</h3>
                  <p className="text-sm text-muted-foreground">{text.shuttleDesc}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">{text.wifi}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">{text.ac}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">{text.kitchen}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">{text.car}</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
              >
                <a
                  href={`https://wa.me/237676961949?text=${encodeURIComponent(locale === "fr" ? "Bonjour, je suis intéressé(e) par vos résidences meublées." : "Hello, I am interested in your furnished residences.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {text.bookBtn}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
