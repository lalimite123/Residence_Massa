"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Car, Users, Settings2, Fuel, Mountain, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { WHATSAPP_NUMBERS } from "@/components/whatsapp-button"
import { VEHICLES, getVehicleName, getVehicleWhatsAppMessage } from "@/lib/data/vehicles"
import type { Locale } from "@/lib/i18n"

interface VehicleModalProps {
  locale: Locale
}

export function VehicleModal({ locale }: VehicleModalProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const fr = locale === "fr"

  const vehicle = VEHICLES[index]
  const name = getVehicleName(vehicle)
  const waHref = `https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent(getVehicleWhatsAppMessage(vehicle, locale))}`

  const go = (dir: 1 | -1) => {
    setDirection(dir)
    setIndex((i) => (i + dir + VEHICLES.length) % VEHICLES.length)
  }

  const specs = [
    { icon: Users, value: `${vehicle.specs.seats} ${fr ? "places" : "seats"}` },
    { icon: Settings2, value: fr ? vehicle.specs.transmission.fr : vehicle.specs.transmission.en },
    { icon: Fuel, value: fr ? vehicle.specs.fuel.fr : vehicle.specs.fuel.en },
    { icon: Mountain, value: vehicle.specs.drive },
  ]

  const t = {
    trigger: fr ? "Véhicules" : "Vehicles",
    eyebrow: fr ? "Service véhicule" : "Vehicle service",
    subtitle: fr
      ? "Avec ou sans chauffeur, livré à la résidence."
      : "With or without driver, delivered to the residence.",
    book: fr ? "Réserver sur WhatsApp" : "Book on WhatsApp",
    counter: `${index + 1} / ${VEHICLES.length}`,
    prev: fr ? "Véhicule précédent" : "Previous vehicle",
    next: fr ? "Véhicule suivant" : "Next vehicle",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 rounded text-xs text-amber-400 transition-colors"
      >
        <Car className="w-3 h-3" />
        {t.trigger}
      </button>

      <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] p-0 gap-0 overflow-hidden rounded-[28px] border-0 bg-white text-neutral-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] font-sans [&>button:last-child]:right-4 [&>button:last-child]:top-4 [&>button:last-child]:z-20 [&>button:last-child]:h-8 [&>button:last-child]:w-8 [&>button:last-child]:rounded-full [&>button:last-child]:bg-white/85 [&>button:last-child]:backdrop-blur [&>button:last-child]:shadow-sm [&>button:last-child]:opacity-100 [&>button:last-child]:flex [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:text-neutral-700">
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <DialogDescription className="sr-only">{vehicle.tagline[locale]}</DialogDescription>

        {/* Visual */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-neutral-100 to-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(245,158,11,0.18),transparent_60%)]" />
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={vehicle.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -60, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={vehicle.image}
                alt={name}
                fill
                sizes="400px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[11px] font-medium tracking-wide text-neutral-700 shadow-sm">
            <span className="w-2 h-2 rounded-full border border-black/10" style={{ backgroundColor: vehicle.color.hex }} />
            {vehicle.color[locale]}
          </div>

          {VEHICLES.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 backdrop-blur shadow-sm flex items-center justify-center text-neutral-700 hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.next}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 backdrop-blur shadow-sm flex items-center justify-center text-neutral-700 hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Text */}
        <div className="px-6 pb-6 -mt-2 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-600 font-medium">{t.eyebrow}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="mt-2 text-[22px] leading-tight font-semibold tracking-tight text-neutral-900">
                {vehicle.brand} {vehicle.model}
                <span className="block text-base font-normal text-neutral-500">
                  {vehicle.year}
                  {vehicle.trim ? ` · ${vehicle.trim}` : ""}
                </span>
              </h3>
              <p className="mt-3 text-sm text-neutral-500 leading-relaxed">{vehicle.tagline[locale]}</p>
            </motion.div>
          </AnimatePresence>

          <ul className="mt-5 grid grid-cols-4 gap-2">
            {specs.map((s) => (
              <li key={s.value} className="flex flex-col items-center gap-1.5 rounded-2xl bg-neutral-50 py-3 px-1">
                <s.icon className="w-4 h-4 text-neutral-500" />
                <span className="text-[11px] font-medium text-neutral-700 leading-none truncate max-w-full">{s.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex justify-center gap-1.5">
            {VEHICLES.map((v, i) => (
              <button
                key={v.id}
                type="button"
                aria-label={getVehicleName(v)}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-neutral-900" : "w-1.5 bg-neutral-300 hover:bg-neutral-400"}`}
              />
            ))}
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 h-12 rounded-2xl bg-[#25D366] text-white text-[15px] font-semibold hover:bg-[#1fb955] active:scale-[0.99] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            {t.book}
          </a>
          <p className="mt-3 text-xs text-neutral-400">{t.subtitle}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
