"use client"

import { MapPin, Navigation, Clock, Phone, Car, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Dictionary, Locale } from "@/lib/i18n"
import { WHATSAPP_NUMBERS } from "@/components/whatsapp-button"
import { VehicleModal } from "@/components/vehicle-modal"

interface LocationSectionProps {
  dict: Dictionary
  locale: Locale
}

export function LocationSection({ dict, locale }: LocationSectionProps) {
  const googleMapsUrl = "https://maps.app.goo.gl/TjNjhEFNHhQfaRm29?g_st=aw"

  const nearbyPlaces = [
    { name: dict.location.places?.downtown || "Centre-ville Yaoundé", time: "10 min" },
    { name: dict.location.places?.airport || "Aéroport International", time: "25 min" },
    { name: dict.location.places?.station || "Gare routière", time: "15 min" },
    { name: dict.location.places?.mall || "Centre Commercial", time: "8 min" },
  ]

  return (
    <section id="location" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
            Localisation
          </span>
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4 tracking-tight">
            {dict.location.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {dict.location.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="relative h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-soft bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.1234567890123!2d11.5167!3d3.8667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf03a6c8b5a7%3A0x5e9f8c9a7b6d5e4f!2sFougerolle%2C%20Yaound%C3%A9%2C%20Cameroon!5e0!3m2!1sfr!2scm!4v1699999999999!5m2!1sfr!2scm"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Massa Residence Location - Fougerolle, Yaounde"
              />

              {/* Get Directions floating button */}
              <div className="absolute bottom-4 left-4 right-4">
                <Button
                  asChild
                  className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-medium"
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    {dict.location.directions}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Address Card */}
            <div className="bg-white rounded-xl p-5 shadow-soft">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{dict.location.labels?.address || "Adresse"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {dict.location.address.split(', ')[0]}<br />
                    {dict.location.address.split(', ')[1]}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-xl p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{dict.location.labels?.availability || "Disponibilité"}</h3>
                  <p className="text-sm text-muted-foreground">{dict.contact.hours}</p>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl p-5 shadow-soft">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{dict.location.labels?.whatsapp || "WhatsApp"}</h3>
                  <div className="space-y-1">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBERS.primary}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline block"
                    >
                      +237 676 961 949
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBERS.secondary}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline block"
                    >
                      +237 698 217 257
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Rental Card */}
            <VehicleModal locale={locale}>
              <div className="bg-amber-50 rounded-xl p-5 shadow-soft border border-amber-200 hover:bg-amber-100 transition-colors h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground mb-1">{dict.location.labels?.vehicleRental || "Location de Véhicules"}</h3>
                    <p className="text-sm text-muted-foreground">{dict.location.labels?.vehicleService || "Service disponible sur demande"}</p>
                  </div>
                </div>
              </div>
            </VehicleModal>

            {/* Nearby Places */}
            <div className="bg-white rounded-xl p-5 shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">{dict.location.labels?.nearby || "À Proximité"}</h3>
              <div className="space-y-3">
                {nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{place.name}</span>
                    <span className="text-foreground font-medium">{place.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
