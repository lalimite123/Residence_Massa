import Image from "next/image"
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, ArrowUpRight } from "lucide-react"
import { getDictionary, type Locale } from "@/lib/i18n"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { WhatsAppButton, WhatsAppLink, WHATSAPP_NUMBERS } from "@/components/whatsapp-button"

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const fr = locale === "fr"

  const content = {
    eyebrow: fr ? "Contact" : "Contact",
    formTitle: fr ? "Demande de réservation" : "Booking request",
    formSubtitle: fr
      ? "Indiquez vos dates et le logement souhaité, nous confirmons la disponibilité en quelques minutes."
      : "Tell us your dates and preferred unit, we confirm availability within minutes.",
    channelsTitle: fr ? "Nos coordonnées" : "Our details",
    hours: fr ? "Horaires" : "Hours",
    viewOnMaps: fr ? "Ouvrir dans Google Maps" : "Open in Google Maps",
    address: "Yaoundé - Fougerolle",
    gps: "GPS : 2271 Rue 5.525",
    whatsappMessage: fr
      ? "Bonjour Massa Residence, je suis intéressé(e) par vos logements à Yaoundé."
      : "Hello Massa Residence, I am interested in your accommodations in Yaoundé.",
    fastResponse: fr ? "Réponse en quelques minutes" : "Reply within minutes",
    directTitle: fr ? "Vous préférez échanger directement ?" : "Prefer to talk directly?",
    directText: fr
      ? "Notre équipe est disponible 7j/7 sur WhatsApp pour répondre à vos questions et organiser votre arrivée."
      : "Our team is available 7 days a week on WhatsApp to answer your questions and arrange your arrival.",
  }

  const channels = [
    {
      icon: Phone,
      label: dict.contact.call,
      value: "+237 676 961 949",
      href: `tel:+${WHATSAPP_NUMBERS.primary}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: "massaresidence13@gmail.com",
      href: "mailto:massaresidence13@gmail.com",
    },
    {
      icon: Facebook,
      label: "Facebook",
      value: "Massa Residence",
      href: "https://www.facebook.com/share/1MMNRcxk8Y/",
      external: true,
    },
    {
      icon: Clock,
      label: content.hours,
      value: dict.contact.hours,
    },
  ]

  return (
    <>
      <SiteNavigation locale={locale} dict={dict} />
      <main className="pt-20 md:pt-24 bg-background">
        {/* Header */}
        <section className="container mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-10 md:pb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">{content.eyebrow}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight text-balance mb-5">
                {dict.contact.title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">{dict.contact.subtitle}</p>
            </div>
            <WhatsAppLink
              message={content.whatsappMessage}
              className="inline-flex items-center gap-3 self-start lg:self-auto px-5 h-12 rounded-full bg-[#25D366] text-white text-sm font-medium hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {dict.contact.whatsapp}
            </WhatsAppLink>
          </div>
        </section>

        {/* Main grid */}
        <section className="container mx-auto px-4 md:px-6 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-2">{content.formTitle}</h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{content.formSubtitle}</p>
                </div>
                <ContactForm dict={dict} locale={locale} />
              </div>
            </div>

            {/* Side column */}
            <aside className="lg:col-span-5 flex flex-col gap-6">
              {/* Address / map card */}
              <a
                href="https://maps.app.goo.gl/TjNjhEFNHhQfaRm29?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl border border-border aspect-[4/3] block"
              >
                <Image
                  src="/images/real-entree-bar.jpg"
                  alt={fr ? "Entrée d'un appartement Massa Residence" : "Entrance of a Massa Residence apartment"}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-[0.2em]">{dict.properties.location}</span>
                    </div>
                    <p className="text-lg font-medium text-white">{content.address}</p>
                    <p className="text-sm text-white/70">{content.gps}</p>
                    <p className="text-xs text-white/60 mt-2 group-hover:text-white transition-colors">{content.viewOnMaps}</p>
                  </div>
                  <span className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white flex-shrink-0 transition-colors group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </a>

              {/* Channels list */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">{content.channelsTitle}</h2>
                <ul className="divide-y divide-border">
                  {channels.map(({ icon: Icon, label, value, href, external }) => {
                    const inner = (
                      <>
                        <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-xs text-muted-foreground">{label}</span>
                          <span className="block text-sm md:text-base text-foreground font-medium truncate">{value}</span>
                        </span>
                        {href && (
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                        )}
                      </>
                    )
                    return (
                      <li key={label}>
                        {href ? (
                          <a
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">{inner}</div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* WhatsApp emphasis */}
              <div className="rounded-2xl p-6 md:p-8 bg-[#25D366]/10 border border-[#25D366]/25">
                <div className="flex items-center gap-2 text-[#25D366] mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span className="text-xs uppercase tracking-[0.2em]">{content.fastResponse}</span>
                </div>
                <h3 className="text-lg md:text-xl font-medium text-foreground mb-2">{content.directTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{content.directText}</p>
                <div className="flex flex-col gap-3">
                  <WhatsAppLink
                    message={content.whatsappMessage}
                    className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md bg-[#25D366] text-white text-sm font-medium hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    +237 676 961 949
                  </WhatsAppLink>
                  <WhatsAppLink
                    useSecondary
                    message={content.whatsappMessage}
                    className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-md border border-[#25D366]/40 text-foreground text-sm font-medium hover:bg-[#25D366]/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    +237 698 217 257
                  </WhatsAppLink>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter dict={dict} locale={locale} />
      <WhatsAppButton />
    </>
  )
}
