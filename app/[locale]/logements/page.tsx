import { getDictionary, type Locale } from "@/lib/i18n"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PropertyCard } from "@/components/property-card"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { properties } from "@/lib/data/properties"

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <>
      <SiteNavigation locale={locale} dict={dict} />
      <main className="pt-20 md:pt-24">
        {/* Header */}
        <section className="py-16 md:py-20 bg-secondary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
                {dict.properties.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {dict.properties.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  locale={locale}
                  dict={dict}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
      <WhatsAppButton />
    </>
  )
}
