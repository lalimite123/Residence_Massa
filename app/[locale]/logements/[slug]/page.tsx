import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Bed,
  Bath,
  Users,
  Maximize2,
  MapPin,
  Wifi,
  Wind,
  Car,
  UtensilsCrossed,
  Tv,
  Shield,
  Droplets,
  Zap,
  WashingMachine,
  Waves,
  MessageCircle,
} from "lucide-react"
import { getDictionary, type Locale } from "@/lib/i18n"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PropertyGallery } from "@/components/property-gallery"
import { WhatsAppButton, WhatsAppLink } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { properties, getPropertyBySlug, formatPrice } from "@/lib/data/properties"

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  ac: Wind,
  parking: Car,
  kitchen: UtensilsCrossed,
  tv: Tv,
  security: Shield,
  water: Droplets,
  generator: Zap,
  laundry: WashingMachine,
  pool: Waves,
}

export async function generateStaticParams() {
  return properties.flatMap((property) =>
    ["fr", "en"].map((locale) => ({
      locale,
      slug: property.slug,
    }))
  )
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale)
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const name = property.name[locale]
  const description = property.description[locale]
  const location = property.location[locale]

  const whatsappMessage = `Bonjour Tonton Azis, je suis intéressé(e) par le logement "${name}" à ${location}.`

  return (
    <>
      <SiteNavigation locale={locale} dict={dict} />
      <main className="pt-20 md:pt-24">
        {/* Back Button */}
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Link
            href={`/${locale}/logements`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {dict.common.back}
          </Link>
        </div>

        {/* Gallery */}
        <section className="container mx-auto px-4 md:px-6 mb-10">
          <PropertyGallery images={property.images} propertyName={name} />
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
                  {name}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5" />
                      <span>
                        {property.bedrooms} {dict.properties.beds}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" />
                    <span>
                      {property.bathrooms} {dict.properties.bath}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>
                      {property.maxGuests} {dict.properties.guests}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize2 className="w-5 h-5" />
                    <span>{property.area} m&sup2;</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {dict.properties.amenities}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity]
                    const label = dict.amenities[amenity as keyof typeof dict.amenities]
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"
                      >
                        {Icon && <Icon className="w-5 h-5 text-primary" />}
                        <span className="text-sm text-foreground">{label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card border border-border rounded-lg p-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="mb-2">
                    <span className="text-2xl font-semibold text-foreground">
                      {formatPrice(property.pricePerNight)}
                    </span>
                    <span className="text-muted-foreground">{dict.properties.perNight}</span>
                  </div>
                  <div>
                    <span className="text-lg text-foreground">
                      {formatPrice(property.pricePerMonth)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {dict.properties.perMonth}
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    {dict.properties.availability}
                  </p>
                  {property.available ? (
                    <span className="inline-flex items-center px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium">
                      {dict.properties.available}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 bg-destructive/20 text-destructive rounded-full text-sm font-medium">
                      {dict.properties.booked}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <WhatsAppLink
                    message={whatsappMessage}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {dict.properties.bookNow}
                  </WhatsAppLink>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Link href={`/${locale}/contact`}>{dict.properties.contactUs}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
      <WhatsAppButton />
    </>
  )
}
