"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Star, Users, MapPin, MessageCircle, Camera } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HeroCarousel } from "@/components/hero-carousel"
import type { Dictionary } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

interface HeroSectionProps {
  dict: Dictionary
  locale: Locale
}

const WHATSAPP_URL = "https://wa.me/237676961949"

export function HeroSection({ dict, locale }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.9])

  const content = {
    badge: locale === "fr" ? "Disponible maintenant" : "Available now",
    title: locale === "fr" ? "Votre partenaire de confiance pour un" : "Your trusted partner for",
    titleHighlight: locale === "fr" ? "logement de qualité" : "quality accommodation",
    subtitle:
      locale === "fr"
        ? "Studios et appartements meublés à Fougerolle, Yaoundé. Des espaces confortables, équipés et prêts à vivre."
        : "Furnished studios and apartments in Fougerolle, Yaoundé. Comfortable, fully equipped spaces ready to live in.",
    cta: dict.hero.cta,
    ctaSecondary: locale === "fr" ? "Écrire sur WhatsApp" : "Chat on WhatsApp",
    ctaHint: locale === "fr" ? "Réponse en quelques minutes" : "Reply within minutes",
    gallery: locale === "fr" ? "Voir la galerie photos & vidéos" : "See the photo & video gallery",
    stats: {
      clients: locale === "fr" ? "Clients satisfaits" : "Satisfied clients",
      rating: locale === "fr" ? "Note moyenne" : "Average rating",
      location: "Yaoundé",
    },
  }

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Image carousel background with parallax */}
      <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 z-0 origin-center">
        <HeroCarousel
          locale={locale}
          overlay={
            <>
              <motion.div
                style={{ opacity: overlayOpacity }}
                className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            </>
          }
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="container mx-auto px-4 md:px-6 relative z-10 pb-14 md:pb-24 pt-28 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-2xl pointer-events-auto"
        >
          {/* Soft ambient glow behind the panel for depth */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] bg-amber-400/15 blur-3xl opacity-70"
          />

          {/* Glass panel */}
          <div className="relative rounded-2xl md:rounded-[1.75rem] border border-white/15 bg-black/35 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.18)] overflow-hidden">
            {/* Top-left light sheen */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl"
            />
            {/* Bottom-right brand tint */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -right-24 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl"
            />

            <div className="relative p-6 md:p-9">
              {/* Badge */}
              <motion.div
                {...fadeUp(0.2)}
                className="inline-flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-white/10 border border-white/15 mb-5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/85">
                  {content.badge}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                {...fadeUp(0.3)}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-medium text-white mb-4 leading-[1.08] tracking-tight text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
              >
                {content.title}{" "}
                <span className="italic text-amber-300">{content.titleHighlight}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                {...fadeUp(0.4)}
                className="text-sm md:text-base text-white/80 mb-7 max-w-lg leading-relaxed text-pretty"
              >
                {content.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row sm:items-center gap-3 mb-7">
                <Link
                  href={`/${locale}#properties`}
                  className="group relative inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 text-stone-950 text-sm font-semibold shadow-[0_10px_30px_-8px_rgba(251,191,36,0.6),inset_0_1px_0_0_rgba(255,255,255,0.5)] hover:shadow-[0_14px_40px_-8px_rgba(251,191,36,0.85)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {content.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 h-12 pl-1.5 pr-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/30 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white shadow-[0_6px_16px_-4px_rgba(37,211,102,0.6)]">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <span className="flex flex-col leading-none text-left">
                    <span className="text-sm font-medium">{content.ctaSecondary}</span>
                    <span className="text-[11px] text-white/60 mt-0.5">{content.ctaHint}</span>
                  </span>
                </a>
              </motion.div>

              {/* Gallery link */}
              <motion.div {...fadeUp(0.55)} className="-mt-3 mb-6">
                <Link
                  href={`/${locale}/galerie`}
                  className="group inline-flex items-center gap-2 text-sm text-white/75 hover:text-amber-300 transition-colors"
                >
                  <Camera className="w-4 h-4 shrink-0" />
                  <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-amber-300">
                    {content.gallery}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                {...fadeUp(0.6)}
                className="grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-white/[0.06]"
              >
                <div className="flex items-center gap-2.5 px-3 py-3 md:px-4">
                  <div className="hidden sm:flex -space-x-2 shrink-0">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 border-2 border-black/60 flex items-center justify-center"
                      >
                        <Users className="w-3 h-3 text-white" />
                      </span>
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-base md:text-lg font-semibold text-white leading-none">500+</p>
                    <p className="text-[10px] md:text-[11px] text-white/60 mt-1 truncate">{content.stats.clients}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 px-3 py-3 md:px-4">
                  <Star className="w-5 h-5 shrink-0 fill-amber-300 text-amber-300" />
                  <div className="min-w-0">
                    <p className="text-base md:text-lg font-semibold text-white leading-none">4.9</p>
                    <p className="text-[10px] md:text-[11px] text-white/60 mt-1 truncate">{content.stats.rating}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 px-3 py-3 md:px-4">
                  <MapPin className="w-5 h-5 shrink-0 text-amber-300" />
                  <div className="min-w-0">
                    <p className="text-sm md:text-base font-semibold text-white leading-none truncate">
                      Fougerolle
                    </p>
                    <p className="text-[10px] md:text-[11px] text-white/60 mt-1 truncate">{content.stats.location}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
