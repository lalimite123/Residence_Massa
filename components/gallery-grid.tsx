"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { GALLERY_CATEGORIES, type GalleryCategory, type GalleryItem } from "@/lib/data/gallery"

interface GalleryGridProps {
  locale: Locale
  items: GalleryItem[]
}

export function GalleryGrid({ locale, items }: GalleryGridProps) {
  const [category, setCategory] = useState<GalleryCategory | "all">("all")
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const visible = useMemo(
    () => (category === "all" ? items : items.filter((item) => item.category === category)),
    [items, category],
  )

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of items) map.set(item.category, (map.get(item.category) ?? 0) + 1)
    map.set("all", items.length)
    return map
  }, [items])

  const close = useCallback(() => setActiveIndex(null), [])
  const step = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length))
    },
    [visible.length],
  )

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [activeIndex, close, step])

  const active = activeIndex !== null ? visible[activeIndex] : null

  return (
    <>
      {/* Filters — horizontal scroll on mobile */}
      <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 w-max md:w-auto md:flex-wrap pb-1" role="tablist" aria-label="Filtres">
          {GALLERY_CATEGORIES.map((cat) => {
            const selected = cat.id === category
            const count = counts.get(cat.id) ?? 0
            if (count === 0) return null
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setCategory(cat.id)
                  setActiveIndex(null)
                }}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs md:text-sm whitespace-nowrap border transition-colors ${
                  selected
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {cat.label[locale]}
                <span className={`tabular-nums text-[10px] ${selected ? "opacity-70" : "opacity-50"}`}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Masonry grid */}
      <motion.div layout className="mt-6 md:mt-10 columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.button
              key={item.id}
              layout
              type="button"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActiveIndex(index)}
              aria-label={item.caption[locale]}
              className="group relative block w-full mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-xl md:rounded-2xl bg-muted text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ aspectRatio: `${item.width} / ${item.height}` }}
            >
              <Image
                src={item.type === "video" ? item.poster! : item.src}
                alt={item.caption[locale] || "Image de la galerie"}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg">
                    <Play className="w-4 h-4 md:w-5 md:h-5 text-white fill-white ml-0.5" />
                  </span>
                </span>
              )}
              <p className="absolute left-2.5 right-2.5 bottom-2.5 md:left-4 md:right-4 md:bottom-4 text-[11px] md:text-sm text-white leading-snug line-clamp-2 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                {item.caption[locale]}
              </p>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={active.caption[locale]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
            onClick={close}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-3 md:px-6 h-14 shrink-0 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs tabular-nums text-white/60">
                {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label={locale === "fr" ? "Fermer" : "Close"}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 md:px-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full max-w-5xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {active.type === "video" ? (
                    <video
                      src={active.src}
                      poster={active.poster}
                      controls
                      autoPlay
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={active.src}
                      alt={active.caption[locale]}
                      fill
                      sizes="100vw"
                      priority
                      className="object-contain"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      step(-1)
                    }}
                    aria-label={locale === "fr" ? "Précédent" : "Previous"}
                    className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      step(1)
                    }}
                    aria-label={locale === "fr" ? "Suivant" : "Next"}
                    className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div
              className="shrink-0 px-4 md:px-6 py-4 md:py-5 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary mb-1">
                {GALLERY_CATEGORIES.find((c) => c.id === active.category)?.label[locale]}
              </p>
              <p className="text-sm md:text-base text-white/85 text-balance">{active.caption[locale]}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
