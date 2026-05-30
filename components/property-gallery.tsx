"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PropertyGalleryProps {
  images: string[]
  propertyName: string
}

export function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Main Image */}
        <div
          className="md:col-span-2 relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            setCurrentIndex(0)
            setIsLightboxOpen(true)
          }}
        >
          <Image
            src={images[0]}
            alt={propertyName}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />
        </div>

        {/* Side Images */}
        <div className="hidden md:grid grid-rows-2 gap-3">
          {images.slice(1, 3).map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => {
                setCurrentIndex(index + 1)
                setIsLightboxOpen(true)
              }}
            >
              <Image
                src={image}
                alt={`${propertyName} - ${index + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="33vw"
              />
              {index === 1 && images.length > 3 && (
                <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    +{images.length - 3} photos
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <div className="relative w-full max-w-5xl aspect-[16/10] mx-4">
            <Image
              src={images[currentIndex]}
              alt={`${propertyName} - ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/40"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
