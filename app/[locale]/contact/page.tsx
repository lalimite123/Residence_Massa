import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, MessageCircle, Car, Facebook } from "lucide-react"
import { getDictionary, type Locale } from "@/lib/i18n"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppButton, WhatsAppLink, WHATSAPP_NUMBERS } from "@/components/whatsapp-button"

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const content = {
    getInTouch: locale === "fr" ? "Nous joindre" : "Get in touch",
    fastResponse: locale === "fr" ? "Reponse rapide garantie" : "Fast response guaranteed",
    hours: locale === "fr" ? "Horaires" : "Hours",
    services: locale === "fr" ? "Nos Services" : "Our Services",
    furnishedResidences: locale === "fr" ? "Residences Meublees" : "Furnished Residences",
    vehicleRental: locale === "fr" ? "Location de Vehicules" : "Vehicle Rental",
    weHelpYou: locale === "fr" 
      ? "Nous vous accompagnons dans votre recherche de logement a Yaounde. N'hesitez pas a nous contacter pour toute question."
      : "We help you find accommodation in Yaounde. Feel free to contact us for any questions.",
    viewOnMaps: locale === "fr" ? "Voir sur Google Maps" : "View on Google Maps",
  }

  return (
    <>
      <SiteNavigation locale={locale} dict={dict} />
      <main className="pt-20 md:pt-24">
        {/* Header */}
        <section className="py-12 md:py-20 bg-secondary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                {dict.contact.title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">{dict.contact.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-10 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6 md:mb-8">
                  {content.getInTouch}
                </h2>

                <div className="space-y-4 md:space-y-6">
                  {/* WhatsApp - Primary */}
                  <WhatsAppLink
                    message={locale === "fr" 
                      ? "Bonjour Massa Residence, je suis interesse(e) par vos logements a Yaounde."
                      : "Hello Massa Residence, I am interested in your accommodations in Yaounde."}
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-[#25D366]/10 rounded-lg border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-[#25D366] transition-colors">
                        WhatsApp
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm mb-2">
                        {content.fastResponse}
                      </p>
                      <p className="text-foreground font-medium text-sm md:text-base">+237 676 961 949</p>
                      <p className="text-foreground font-medium text-sm md:text-base">+237 698 217 257</p>
                    </div>
                  </WhatsAppLink>

                  {/* Phone */}
                  <a
                    href={`tel:+${WHATSAPP_NUMBERS.primary}`}
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {dict.contact.call}
                      </h3>
                      <p className="text-foreground font-medium text-sm md:text-base">+237 676 961 949</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:massaresidence13@gmail.com"
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        Email
                      </h3>
                      <p className="text-foreground font-medium text-sm md:text-base break-all">massaresidence13@gmail.com</p>
                    </div>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/1MMNRcxk8Y/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Facebook className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-blue-500 transition-colors">
                        Facebook
                      </h3>
                      <p className="text-muted-foreground text-sm">Massa Residence</p>
                    </div>
                  </a>

                  {/* Address */}
                  <a
                    href="https://maps.app.goo.gl/TjNjhEFNHhQfaRm29?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {dict.properties.location}
                      </h3>
                      <p className="text-foreground text-sm md:text-base">Yaounde - Fougerolle</p>
                      <p className="text-muted-foreground text-sm">GPS: 2271 Rue 5.525</p>
                      <p className="text-primary text-sm mt-1">{content.viewOnMaps}</p>
                    </div>
                  </a>

                  {/* Hours */}
                  <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-card rounded-lg border border-border">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {content.hours}
                      </h3>
                      <p className="text-muted-foreground text-sm">{dict.contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div>
                <div className="bg-secondary/10 rounded-lg p-6 md:p-8 h-full flex flex-col justify-center">
                  <div className="text-center mb-6 md:mb-8">
                    <Image
                      src="/images/logo-transparent.png"
                      alt="Massa Residence"
                      width={200}
                      height={100}
                      className="w-auto h-16 md:h-20 object-contain mx-auto mb-4"
                    />
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                      Massa Residence
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">{dict.footer.tagline}</p>
                  </div>

                  {/* Services */}
                  <div className="mb-6 md:mb-8">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">
                      {content.services}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full text-xs md:text-sm text-primary">
                        {content.furnishedResidences}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 rounded-full text-xs md:text-sm text-amber-600">
                        <Car className="w-3 h-3" />
                        {content.vehicleRental}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                      {content.weHelpYou}
                    </p>

                    <WhatsAppLink
                      message={locale === "fr" 
                        ? "Bonjour Massa Residence, je suis interesse(e) par vos logements a Yaounde."
                        : "Hello Massa Residence, I am interested in your accommodations in Yaounde."}
                      className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#20bd5a] transition-colors text-sm md:text-base"
                    >
                      <MessageCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      {dict.contact.whatsapp}
                    </WhatsAppLink>
                  </div>
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
