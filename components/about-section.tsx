"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Camera, ArrowRight } from "lucide-react"
import type { Dictionary, Locale } from "@/lib/i18n"

interface AboutSectionProps {
  dict: Dictionary
  locale: Locale
}

export function AboutSection({ dict, locale }: AboutSectionProps) {
  const galleryLabel = locale === "fr" ? "Voir toutes les photos" : "See all photos"
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Link
              href={`/${locale}/galerie`}
              aria-label={galleryLabel}
              className="group relative grid grid-cols-2 gap-4 rounded-2xl"
            >
              <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/15 group-hover:bg-black/75 transition-colors">
                <Camera className="w-3.5 h-3.5" />
                {galleryLabel}
              </span>
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/real-chambre-1.jpg"
                    alt="Chambre luxueuse avec tête de lit en bois dans un appartement Massa Residence à Yaoundé"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/real-cuisine-1.jpg"
                    alt="Cuisine moderne équipée en marbre noir, location meublée haut de gamme Yaoundé"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/real-salon.jpg"
                    alt="Salon confortable avec canapé d'angle en velours, appartement meublé Fougerolle Yaoundé"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/real-salle-de-bain.jpg"
                    alt="Salle de bain contemporaine et élégante, standard de luxe Massa Residence Yaoundé"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </Link>

            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto max-w-[360px] bg-white rounded-xl shadow-medium p-3 sm:p-4 flex items-center justify-between sm:justify-center gap-2 sm:gap-6"
            >
              <div className="text-center px-1 sm:px-3">
                <p className="text-xl sm:text-2xl font-bold text-primary">50+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Résidences</p>
              </div>
              <div className="w-px h-8 sm:h-12 bg-border" />
              <div className="text-center px-1 sm:px-3">
                <p className="text-xl sm:text-2xl font-bold text-primary">200+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Clients</p>
              </div>
              <div className="w-px h-8 sm:h-12 bg-border" />
              <div className="text-center px-1 sm:px-3">
                <p className="text-xl sm:text-2xl font-bold text-primary">5+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Années</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
              {dict.about.subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-6 tracking-tight">
              {dict.about.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {dict.about.description}
            </p>

            {/* Mission */}
            <div className="mb-8 p-5 bg-secondary/50 rounded-xl">
              <h3 className="text-base font-semibold text-foreground mb-2">
                {dict.about.mission.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {dict.about.mission.description}
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {dict.about.values.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {dict.about.values.items.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/galerie`}
              className="group mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 h-12 px-6 rounded-full border border-foreground/15 bg-background text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              <Camera className="w-4 h-4" />
              {galleryLabel}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
