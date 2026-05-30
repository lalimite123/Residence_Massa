import { getDictionary, type Locale } from "@/lib/i18n"
import { SiteNavigation } from "@/components/site-navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { PricingSection } from "@/components/pricing-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { AboutSection } from "@/components/about-section"
import { LocationSection } from "@/components/location-section"
import { CtaSection } from "@/components/cta-section"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <>
      <SiteNavigation locale={locale} dict={dict} />
      <main>
        <HeroSection dict={dict} locale={locale} />
        <FeaturedProperties dict={dict} locale={locale} />
        <PricingSection dict={dict} locale={locale} />
        <AdvantagesSection dict={dict} />
        <AboutSection dict={dict} />
        <LocationSection dict={dict} />
        <CtaSection dict={dict} locale={locale} />
      </main>
      <SiteFooter dict={dict} locale={locale} />
      <WhatsAppButton />
    </>
  )
}
