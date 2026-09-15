import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getDictionary, type Locale } from "@/lib/i18n"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { GalleryGrid } from "@/components/gallery-grid"
import { WhatsAppButton, WhatsAppLink } from "@/components/whatsapp-button"
import { GALLERY_ITEMS } from "@/lib/data/gallery"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const fr = locale === "fr"
  return {
    title: fr ? "Galerie | Massa Residence Meublé" : "Gallery | Massa Residence Meublé",
    description: fr
      ? "Découvrez en photos et vidéos nos studios et appartements meublés à Fougerolle, Yaoundé."
      : "Explore photos and videos of our furnished studios and apartments in Fougerolle, Yaoundé.",
  }
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const fr = locale === "fr"

  const photoCount = GALLERY_ITEMS.filter((i) => i.type === "image").length
  const videoCount = GALLERY_ITEMS.filter((i) => i.type === "video").length

  const content = {
    eyebrow: fr ? "Galerie" : "Gallery",
    title: fr ? "La résidence en images" : "The residence in pictures",
    subtitle: fr
      ? "Chaque espace a été pensé pour allier confort et élégance. Parcourez les photos et vidéos de nos logements et des espaces communs."
      : "Every space was designed to combine comfort and elegance. Browse photos and videos of our units and shared areas.",
    stats: fr ? `${photoCount} photos · ${videoCount} vidéos` : `${photoCount} photos · ${videoCount} videos`,
    ctaTitle: fr ? "Envie de voir par vous-même ?" : "Want to see for yourself?",
    ctaText: fr
      ? "Organisez une visite ou réservez directement votre séjour à Fougerolle."
      : "Arrange a visit or book your stay in Fougerolle directly.",
    ctaPrimary: fr ? "Voir les logements" : "View accommodations",
    whatsappMessage: fr
      ? "Bonjour Massa Residence, j'ai vu votre galerie et je souhaiterais organiser une visite."
      : "Hello Massa Residence, I saw your gallery and would like to arrange a visit.",
  }

  return (
    <>
      <SiteNavigation locale={locale} dict={dict} />
      <main className="pt-20 md:pt-24 bg-background">
        <section className="container mx-auto px-4 md:px-6 pt-8 md:pt-16 pb-6 md:pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3 md:mb-4">{content.eyebrow}</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight text-balance mb-3 md:mb-5">
                {content.title}
              </h1>
              <p className="text-sm md:text-lg text-muted-foreground leading-relaxed text-pretty">
                {content.subtitle}
              </p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground tabular-nums shrink-0">{content.stats}</p>
          </div>
        </section>

        <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
          <GalleryGrid locale={locale} items={GALLERY_ITEMS} />
        </section>

        <section className="border-t border-border">
          <div className="container mx-auto px-4 md:px-6 py-14 md:py-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-4xl font-medium text-foreground tracking-tight text-balance mb-2 md:mb-3">
                  {content.ctaTitle}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground text-pretty">{content.ctaText}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href={`/${locale}#properties`}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  {content.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppLink
                  message={content.whatsappMessage}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#1ebe5b] transition-colors"
                >
                  WhatsApp
                </WhatsAppLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dict={dict} />
      <WhatsAppButton message={content.whatsappMessage} />
    </>
  )
}
