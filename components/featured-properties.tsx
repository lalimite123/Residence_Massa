"use client"

import { useState } from "react"
import Image from "next/image"
import { Bed, Bath, Users, Wifi, Wind, Car, Check, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { WHATSAPP_NUMBERS } from "@/components/whatsapp-button"
import { getFeaturedProperties, formatPrice } from "@/lib/data/properties"
import type { Property } from "@/lib/data/properties"
import type { Dictionary } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"

interface FeaturedPropertiesProps {
  dict: Dictionary
  locale: Locale
}

const propertyTypes = [
  { id: "all", label: { fr: "Tous", en: "All" } },
  { id: "studio", label: { fr: "Studios", en: "Studios" } },
  { id: "apartment", label: { fr: "Appartements", en: "Apartments" } },
]

export function FeaturedProperties({ dict, locale }: FeaturedPropertiesProps) {
  const allProperties = getFeaturedProperties()
  const [activeType, setActiveType] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredProperties = activeType === "all" 
    ? allProperties 
    : allProperties.filter(p => {
        if (activeType === "studio") return p.bedrooms <= 1
        if (activeType === "apartment") return p.bedrooms >= 2
        return true
      })

  const openPropertyModal = (property: Property) => {
    setSelectedProperty(property)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedProperty(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => 
        prev === selectedProperty.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProperty) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProperty.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <>
      <section id="properties" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
              Fougerolle, Yaoundé
            </span>
            <h2 className="text-3xl md:text-4xl font-medium text-foreground tracking-tight">
              {dict.properties.title.toLowerCase()}
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-12 w-full"
          >
            <div className="flex flex-wrap justify-center items-center p-1 bg-secondary rounded-2xl md:rounded-full gap-1 md:gap-0 max-w-full">
              {propertyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`px-4 md:px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeType === type.id
                      ? "bg-white text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {type.label[locale]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Properties List */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <PropertyListCard 
                    property={property} 
                    locale={locale} 
                    dict={dict}
                    onViewDetails={() => openPropertyModal(property)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Property Modal with Image Carousel */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            locale={locale}
            dict={dict}
            currentImageIndex={currentImageIndex}
            onClose={closeModal}
            onNextImage={nextImage}
            onPrevImage={prevImage}
            onSelectImage={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
    </>
  )
}

interface PropertyListCardProps {
  property: Property
  locale: Locale
  dict: Dictionary
  onViewDetails: () => void
}

function PropertyListCard({ property, locale, dict, onViewDetails }: PropertyListCardProps) {
  const name = property.name[locale]
  const shortDescription = property.shortDescription[locale]
  const location = property.location[locale]

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow duration-300 border border-border/50">
      <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr_240px] gap-0">
        {/* Image */}
        <div className="relative h-48 md:h-full min-h-[180px]">
          <Image
            src={property.images[0]}
            alt={locale === 'fr' ? `Vue du ${name}, logement meublé de luxe à Yaoundé` : `View of ${name}, luxury furnished accommodation in Yaounde`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 280px"
          />
          {/* Rating badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs font-semibold">4.9</span>
          </div>
          {/* Image count indicator */}
          <button 
            onClick={onViewDetails}
            className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md text-xs hover:bg-black/80 transition-colors"
          >
            +{property.images.length} photos
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{location}</p>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{name}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{shortDescription}</p>
            
            {/* Basic Info - Mobile optimized */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground text-xs">{dict.properties.beds}</span>
                <span className="font-medium text-xs">{property.bedrooms || (locale === 'fr' ? "Studio" : "Studio")}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground text-xs">{dict.properties.bath}</span>
                <span className="font-medium text-xs">{property.bathrooms}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground text-xs">Internet</span>
                <span className="font-medium text-xs">100Mbps</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/50">
                <span className="text-muted-foreground text-xs">Parking</span>
                <span className="font-medium text-xs">{property.amenities.includes("parking") ? (locale === 'fr' ? "Oui" : "Yes") : (locale === 'fr' ? "Non" : "No")}</span>
              </div>
            </div>
          </div>

          {/* Mobile Price + CTA */}
          <div className="lg:hidden mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xl font-semibold text-foreground">
                {formatPrice(property.pricePerNight)}
                <span className="text-xs font-normal text-muted-foreground">{dict.properties.perNight}</span>
              </p>
            </div>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm"
              onClick={onViewDetails}
            >
              {dict.properties.bookNow}
            </Button>
          </div>

          <button 
            onClick={onViewDetails}
            className="hidden lg:inline-flex mt-3 text-sm font-medium text-primary hover:underline items-center gap-1"
          >
            {dict.properties.viewDetails}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Price & CTA - Desktop only */}
        <div className="hidden lg:flex p-5 bg-secondary/30 flex-col justify-between border-t lg:border-t-0 lg:border-l border-border/50">
          <div>
            <p className="text-2xl font-semibold text-foreground">
              {formatPrice(property.pricePerNight)}
              <span className="text-sm font-normal text-muted-foreground">{dict.properties.perNight}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{locale === 'fr' ? 'Taxes incluses' : 'Taxes included'}</p>
          </div>

          <div className="mt-4 space-y-3">
            {/* Amenities highlights */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground text-xs">Proprete garantie</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-muted-foreground text-xs">Equipements modernes</span>
              </div>
            </div>

            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
              onClick={onViewDetails}
            >
              {dict.properties.bookNow}
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

interface PropertyModalProps {
  property: Property
  locale: Locale
  dict: Dictionary
  currentImageIndex: number
  onClose: () => void
  onNextImage: () => void
  onPrevImage: () => void
  onSelectImage: (index: number) => void
}

function PropertyModal({
  property,
  locale,
  dict,
  currentImageIndex,
  onClose,
  onNextImage,
  onPrevImage,
  onSelectImage,
}: PropertyModalProps) {
  const name = property.name[locale]
  const description = property.description[locale]
  const location = property.location[locale]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Carousel */}
        <div className="relative aspect-video bg-muted">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={property.images[currentImageIndex] || property.images[0]}
                alt={`Photo ${currentImageIndex + 1} de ${name}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={onPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => onSelectImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-4 bg-secondary/30 overflow-x-auto">
          {property.images.map((image, index) => (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                index === currentImageIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{location}</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{name}</h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {formatPrice(property.pricePerNight)}
                <span className="text-sm font-normal text-muted-foreground">/nuit</span>
              </p>
              <p className="text-sm text-muted-foreground">
                ou {formatPrice(property.pricePerMonth)}/mois
              </p>
            </div>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
              <Bed className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Chambres</p>
                <p className="font-medium">{property.bedrooms || "Studio"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
              <Bath className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Salle de bain</p>
                <p className="font-medium">{property.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Personnes</p>
                <p className="font-medium">{property.maxGuests}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
              <Wifi className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Internet</p>
                <p className="font-medium">100 Mbps</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="font-semibold text-foreground mb-3">{dict.properties.amenities}</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1.5 bg-secondary text-sm text-muted-foreground rounded-full"
                >
                  {dict.amenities[amenity as keyof typeof dict.amenities] || amenity}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-xl"
              asChild
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent(locale === "fr" ? `Bonjour, je suis intéressé(e) par ${name}.` : `Hello, I am interested in ${name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.properties.bookNow}
              </a>
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl"
              onClick={onClose}
            >
              {dict.common.back}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
