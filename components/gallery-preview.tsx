"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Camera, Play } from "lucide-react"
import { GALLERY_ITEMS } from "@/lib/data/gallery"
import type { Locale } from "@/lib/i18n"

interface GalleryPreviewProps {
  locale: Locale
}

const PREVIEW_IDS = ["salon-1", "chambre-1", "sdb-1", "cuisine-1", "balcon-1"]

export function GalleryPreview({ locale }: GalleryPreviewProps) {
  const items = PREVIEW_IDS.map((id) => GALLERY_ITEMS.find((item) => item.id === id)).filter(
    (item): item is (typeof GALLERY_ITEMS)[number] => Boolean(item),
  )
  const photoCount = GALLERY_ITEMS.filter((i) => i.type === "image").length
  const videoCount = GALLERY_ITEMS.filter((i) => i.type === "video").length

  const t = {
    eyebrow: locale === "fr" ? "En images" : "In pictures",
    title: locale === "fr" ? "Visitez la résidence avant d'arriver" : "Tour the residence before you arrive",
    subtitle:
      locale === "fr"
        ? "Chaque pièce photographiée sur place : salon, chambre, cuisine, salle de bain, balcon et espaces communs."
        : "Every room photographed on site: living room, bedroom, kitchen, bathroom, balcony and shared spaces.",
    cta: locale === "fr" ? "Voir toute la galerie" : "View the full gallery",
    count:
      locale === "fr"
        ? `${photoCount} photos · ${videoCount} vidéos`
        : `${photoCount} photos · ${videoCount} videos`,
    more: locale === "fr" ? "Voir plus" : "See more",
  }

  const [lead, ...rest] = items

  return (
    <section id="gallery" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8 md:mb-12">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
              {t.eyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight mb-3 text-balance">
              {t.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">{t.subtitle}</p>
          </div>
          <Link
            href={`/${locale}/galerie`}
            className="hidden md:inline-flex items-center gap-2 h-11 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity shrink-0"
          >
            <Camera className="w-4 h-4" />
            {t.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {lead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-2 row-span-2"
            >
              <Link
                href={`/${locale}/galerie`}
                className="group relative block aspect-[4/5] md:aspect-auto md:h-full rounded-2xl overflow-hidden shadow-soft"
              >
                <Image
                  src={lead.src}
                  alt={lead.caption[locale]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-1">{t.count}</p>
                    <p className="text-white font-medium text-sm md:text-base leading-snug">
                      {lead.caption[locale]}
                    </p>
                  </div>
                  <span className="shrink-0 w-10 h-10 rounded-full bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center text-white">
                    <Play className="w-4 h-4 fill-current" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {rest.map((item, index) => {
            const isLast = index === rest.length - 1
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * (index + 1) }}
              >
                <Link
                  href={`/${locale}/galerie`}
                  className="group relative block aspect-square rounded-2xl overflow-hidden shadow-soft"
                >
                  <Image
                    src={item.src}
                    alt={item.caption[locale]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {isLast ? (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2 text-white">
                      <span className="text-2xl md:text-3xl font-semibold leading-none">+{photoCount + videoCount - items.length}</span>
                      <span className="text-xs uppercase tracking-[0.18em] inline-flex items-center gap-1.5">
                        {t.more}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>

        <Link
          href={`/${locale}/galerie`}
          className="md:hidden mt-5 inline-flex w-full items-center justify-center gap-2 h-12 rounded-full bg-foreground text-background text-sm font-medium"
        >
          <Camera className="w-4 h-4" />
          {t.cta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
