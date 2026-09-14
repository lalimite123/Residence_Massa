"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import type { Dictionary } from "@/lib/i18n"

interface AboutSectionProps {
  dict: Dictionary
}

export function AboutSection({ dict }: AboutSectionProps) {
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/real-chambre-1.jpg"
                    alt="Chambre avec tête de lit en bois et éclairage LED"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/real-cuisine-1.jpg"
                    alt="Cuisine équipée en marbre noir"
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
                    alt="Salon avec canapé d'angle en velours"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-soft">
                  <Image
                    src="/images/real-salle-de-bain.jpg"
                    alt="Salle de bain contemporaine"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>

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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
