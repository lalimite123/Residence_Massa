"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Star, Users, MapPin, Phone } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

interface HeroSectionProps {
  dict: Dictionary
  locale: Locale
}

export function HeroSection({ dict, locale }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Enhanced parallax effects
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.9])

  // Translated content based on locale
  const content = {
    badge: locale === "fr" ? "Disponible maintenant" : "Available now",
    title: locale === "fr" 
      ? "Votre partenaire de confiance pour un" 
      : "Your trusted partner for",
    titleHighlight: locale === "fr" ? "logement de qualite" : "quality accommodation",
    subtitle: locale === "fr"
      ? "Massa Residence offre des residences meublees de qualite a Yaounde, creant des espaces confortables et fonctionnels."
      : "Massa Residence offers premium furnished residences in Yaounde, creating beautiful and functional spaces with quality comfort.",
    cta: dict.hero.cta,
    stats: {
      clients: locale === "fr" ? "Clients Satisfaits" : "Satisfied Clients",
      rating: locale === "fr" ? "Note" : "Rating",
    },
    findHome: locale === "fr" ? "Trouver Votre Logement" : "Find Your Home",
    location: "Yaounde - Fougerolle",
    contact: "+237 676 961 949",
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Video Background with Enhanced Parallax */}
      <motion.div 
        style={{ scale: videoScale, y: videoY }}
        className="absolute inset-0 z-0 origin-center"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Animated Gradient Overlay */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/60 to-black/20" 
      />
      
      {/* Secondary gradient for depth */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-br from-primary/10 via-transparent to-amber-900/10" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }}
        className="container mx-auto px-4 md:px-6 relative z-10 pb-12 md:pb-20 pt-28"
      >
        <div className="max-w-3xl">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full mb-5 border border-white/20"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-white/90">{content.badge}</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-4 leading-[1.15] tracking-tight text-balance"
          >
            {content.title}
            <br />
            <span className="italic text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]">{content.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-base text-white/70 mb-6 max-w-xl leading-relaxed"
          >
            {content.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 h-10 text-sm"
            >
              <Link href={`/${locale}#properties`}>
                {content.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-5 h-10 text-sm border-white/30 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm"
            >
              <a href="https://wa.me/237676961949" target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                {dict.hero.ctaSecondary}
              </a>
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 md:gap-8"
          >
            {/* Avatars + Clients */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary/60 to-amber-500/60 border-2 border-black flex items-center justify-center"
                  >
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-base md:text-lg font-semibold text-white">500+</p>
                <p className="text-[10px] md:text-xs text-white/60">{content.stats.clients}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-amber-400 text-amber-400" />
              <div>
                <p className="text-base md:text-lg font-semibold text-white">4.9</p>
                <p className="text-[10px] md:text-xs text-white/60">{content.stats.rating}</p>
              </div>
            </div>

            {/* Location Badge - Hidden on small mobile */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="text-xs text-white/80">{content.location}</span>
            </div>

            {/* Find Home Button */}
            <Link
              href={`/${locale}#properties`}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              <span className="text-sm text-white">{content.findHome}</span>
              <ArrowRight className="w-3 h-3 text-white" />
            </Link>
          </motion.div>
        </div>
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
