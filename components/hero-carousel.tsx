"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"

export interface HeroSlide {
  src: string
  alt: { fr: string; en: string }
  caption: { fr: string; en: string }
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/real-salon.jpg",
    alt: { fr: "Salon avec canapé d'angle en velours", en: "Living room with velvet corner sofa" },
    caption: { fr: "Salon", en: "Living room" },
  },
  {
    src: "/images/real-chambre-1.jpg",
    alt: { fr: "Chambre avec tête de lit en bois", en: "Bedroom with wooden headboard" },
    caption: { fr: "Chambre", en: "Bedroom" },
  },
  {
    src: "/images/real-cuisine-1.jpg",
    alt: { fr: "Cuisine équipée en marbre noir", en: "Fully equipped black marble kitchen" },
    caption: { fr: "Cuisine", en: "Kitchen" },
  },
  {
    src: "/images/real-salle-de-bain.jpg",
    alt: { fr: "Salle de bain contemporaine", en: "Contemporary bathroom" },
    caption: { fr: "Salle de bain", en: "Bathroom" },
  },
  {
    src: "/images/real-entree-bar.jpg",
    alt: { fr: "Entrée avec coin bar en marbre", en: "Entrance with marble bar corner" },
    caption: { fr: "Entrée", en: "Entrance" },
  },
]

const INTERVAL_MS = 5500

interface HeroCarouselProps {
  locale: Locale
  slides?: HeroSlide[]
  /** Gradient layers rendered above the images but below the controls */
  overlay?: React.ReactNode
}

export function HeroCarousel({ locale, slides = HERO_SLIDES, overlay }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length],
  )

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused, go])

  const current = slides[index]

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={locale === "fr" ? "Photos de la résidence" : "Residence photos"}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={current.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1, ease: "easeInOut" }, scale: { duration: 6, ease: "linear" } }}
        >
          <Image
            src={current.src}
            alt={current.alt[locale]}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-10 pointer-events-none">{overlay}</div>

      {/* Controls */}
      <div className="absolute right-4 md:right-10 top-24 md:top-auto md:bottom-28 z-20 flex flex-col items-end gap-3">
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs uppercase tracking-[0.2em] text-white/70 font-sans">
            {current.caption[locale]}
          </span>
          <span className="text-xs tabular-nums text-white/70 font-sans">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${locale === "fr" ? "Aller à la photo" : "Go to photo"} ${i + 1}`}
              aria-current={i === index}
              className="relative h-1 rounded-full overflow-hidden bg-white/30 transition-all duration-300"
              style={{ width: i === index ? 40 : 12 }}
            >
              {i === index && !paused && (
                <motion.span
                  key={`${index}-progress`}
                  className="absolute inset-y-0 left-0 bg-amber-300"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                />
              )}
              {i === index && paused && <span className="absolute inset-0 bg-amber-300" />}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={locale === "fr" ? "Photo précédente" : "Previous photo"}
            className="w-9 h-9 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={locale === "fr" ? "Photo suivante" : "Next photo"}
            className="w-9 h-9 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
