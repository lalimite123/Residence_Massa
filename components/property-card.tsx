"use client"

import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Users, MapPin, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import type { Property } from "@/lib/data/properties"
import { formatPrice } from "@/lib/data/properties"
import type { Dictionary } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

interface PropertyCardProps {
  property: Property
  locale: Locale
  dict: Dictionary
}

export function PropertyCard({ property, locale, dict }: PropertyCardProps) {
  const name = property.name[locale]
  const shortDescription = property.shortDescription[locale]
  const location = property.location[locale]

  return (
    <Link href={`/${locale}/logements/${property.slug}`} className="group block">
      <article className="relative h-full glass-card rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-gold">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={locale === 'fr' ? `Vue du ${property.name[locale]}, location meublée à Yaoundé` : `View of ${property.name[locale]}, furnished rental in Yaounde`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Status badge */}
          <div className="absolute top-4 left-4">
            {property.available ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider glass-gold rounded-full text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {dict.properties.available}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider glass rounded-full text-foreground/70">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {dict.properties.booked}
              </span>
            )}
          </div>

          {/* Arrow indicator */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-foreground/40 text-xs mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span className="tracking-wide">{location}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-foreground/50 mb-5 line-clamp-2 font-light leading-relaxed">
            {shortDescription}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 text-xs text-foreground/40 mb-5 pb-5 border-b border-border/50">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{property.maxGuests}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-1">
                {dict.common.from}
              </p>
              <p className="text-xl font-semibold text-primary">
                {formatPrice(property.pricePerNight)}
                <span className="text-xs font-normal text-foreground/40 ml-1">
                  {dict.properties.perNight}
                </span>
              </p>
            </div>
            <span className="text-xs font-medium text-primary/70 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {dict.properties.viewDetails}
            </span>
          </div>
        </div>

        {/* Hover border effect */}
        <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
      </article>
    </Link>
  )
}
