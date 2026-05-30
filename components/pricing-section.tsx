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

const pricingData = [
  {
    duration: "01 Jour",
    studio: 55000,
    apartment: 70000,
  },
  {
    duration: "01 Semaine",
    studio: 50000,
    apartment: 65000,
  },
  {
    duration: "02 Semaines",
    studio: 45000,
    apartment: 60000,
  },
  {
    duration: "03 Semaines",
    studio: 40000,
    apartment: 55000,
  },
  {
    duration: "01 Mois",
    studio: 35000,
    apartment: 50000,
  },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fr-FR").format(price)
}

export function PricingSection({ locale }: PricingSectionProps) {
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
            Tarification
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground tracking-tight">
            Notre Grille Tarifaire
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
              <h3 className="font-semibold text-lg">STUDIO MODERNE</h3>
              <p className="text-sm text-white/80 mt-1">1 chambre, 1 salle de bain, salon, cuisine et balcon</p>
            </div>
            <div className="divide-y divide-border">
              {pricingData.map((row, index) => (
                <div key={index} className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">{row.duration}</span>
                  <span className="font-semibold text-foreground">{formatPrice(row.studio)} FCFA/Jour</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apartment Card */}
          <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
            <div className="bg-amber-500 text-white p-4 text-center">
              <h3 className="font-semibold text-lg">APPARTEMENT MODERNE</h3>
              <p className="text-sm text-white/80 mt-1">2 chambres, 2 salles de bain, salon, cuisine et 2 balcons</p>
            </div>
            <div className="divide-y divide-border">
              {pricingData.map((row, index) => (
                <div key={index} className="flex justify-between items-center p-4">
                  <span className="text-sm text-muted-foreground">{row.duration}</span>
                  <span className="font-semibold text-foreground">{formatPrice(row.apartment)} FCFA/Jour</span>
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
                <span className="font-semibold text-foreground text-center">NOMBRE DE JOURS</span>
              </div>
              <div className="bg-emerald-600 p-4 lg:p-6 text-center text-white">
                <h3 className="font-bold text-lg">STUDIO MODERNE</h3>
                <p className="text-sm text-white/80 mt-1">(1 chambre, 1 salle de bain, salon, cuisine et balcon)</p>
              </div>
              <div className="bg-amber-500 p-4 lg:p-6 text-center text-white">
                <h3 className="font-bold text-lg">APPARTEMENT MODERNE</h3>
                <p className="text-sm text-white/80 mt-1">(2 chambres, 2 salles de bain, salon, cuisine et 2 balcons)</p>
              </div>
            </div>

            {/* Table Body */}
            {pricingData.map((row, index) => {
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
                    <span className="font-semibold text-foreground">{formatPrice(row.studio)} FCFA/Jour</span>
                  </div>
                  <div className="p-4 lg:p-5 flex items-center justify-center">
                    <span className="font-semibold text-foreground">{formatPrice(row.apartment)} FCFA/Jour</span>
                  </div>
                </div>
              )
            })}

            {/* Footer Note */}
            <div className="bg-sky-100 p-4 text-center">
              <span className="text-sm text-foreground font-medium">NB.: TVA en SUS</span>
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
                  <h3 className="font-semibold text-foreground mb-1">Reception 24h/24</h3>
                  <p className="text-sm text-muted-foreground">Notre equipe est disponible a tout moment pour vous accueillir.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Plane className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Navette Aeroport Gratuite</h3>
                  <p className="text-sm text-muted-foreground">Service de navette inclus pour votre confort.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border/50 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Wi-Fi inclus</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Climatisation</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Cuisine equipee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-muted-foreground">Location de vehicules</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
              >
                <a
                  href="https://wa.me/237676961949?text=Bonjour, je suis interesse par vos residences"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reserver maintenant
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
