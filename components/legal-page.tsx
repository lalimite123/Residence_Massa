import Link from "next/link"
import { ArrowLeft, Building2, MapPin, Mail, FileText, UserRound } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import type { Dictionary, Locale } from "@/lib/i18n"

export const COMPANY = {
  name: "Massa Residence Meublée",
  email: "Massaresidence13@gmail.com",
  address: "2271 Rue 5.525, Yaoundé, Cameroun",
  rc: "RC/YAE/2022/B/1729 du 11 mai 2022",
  ceo: "Eshening Longinu Hermione",
}

export interface LegalSection {
  title: string
  paragraphs: string[]
  bullets?: string[]
}

interface LegalPageProps {
  locale: Locale
  dict: Dictionary
  eyebrow: string
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
  otherHref: string
  otherLabel: string
}

export function LegalPage({ locale, dict, eyebrow, title, intro, updated, sections, otherHref, otherLabel }: LegalPageProps) {
  const fr = locale === "fr"
  const identity = [
    { icon: Building2, label: fr ? "Raison sociale" : "Company", value: COMPANY.name },
    { icon: FileText, label: fr ? "Registre du commerce" : "Trade register", value: COMPANY.rc },
    { icon: UserRound, label: fr ? "Directrice générale" : "CEO", value: COMPANY.ceo },
    { icon: MapPin, label: fr ? "Siège" : "Address", value: COMPANY.address },
    { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavigation dict={dict} locale={locale} solid />

      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {fr ? "Retour à l'accueil" : "Back to home"}
          </Link>

          <header className="mt-8 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-600 font-medium">{eyebrow}</p>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight text-balance">{title}</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{intro}</p>
            <p className="mt-3 text-sm text-muted-foreground/70">{updated}</p>
          </header>

          <div className="mt-14 grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            <article className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.title} id={`s-${i + 1}`} className="scroll-mt-28">
                  <h2 className="font-serif text-2xl tracking-tight flex items-baseline gap-3">
                    <span className="text-amber-600 text-sm font-sans tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                    {s.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {s.bullets && (
                      <ul className="space-y-2 pl-5 list-disc marker:text-amber-600">
                        {s.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </article>

            <aside className="lg:sticky lg:top-28 space-y-4">
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  {fr ? "Identité de l'entreprise" : "Company details"}
                </h3>
                <dl className="mt-5 space-y-4">
                  {identity.map((it) => (
                    <div key={it.label} className="flex gap-3">
                      <it.icon className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                      <div className="min-w-0">
                        <dt className="text-xs text-muted-foreground">{it.label}</dt>
                        <dd className="text-sm font-medium text-foreground break-words">
                          {it.href ? (
                            <a href={it.href} className="hover:text-amber-600 transition-colors">
                              {it.value}
                            </a>
                          ) : (
                            it.value
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <nav className="rounded-3xl border border-border bg-card p-6" aria-label={fr ? "Sommaire" : "Contents"}>
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  {fr ? "Sommaire" : "Contents"}
                </h3>
                <ol className="mt-4 space-y-2">
                  {sections.map((s, i) => (
                    <li key={s.title}>
                      <a
                        href={`#s-${i + 1}`}
                        className="flex gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="tabular-nums text-amber-600">{String(i + 1).padStart(2, "0")}</span>
                        <span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
                <Link
                  href={otherHref}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  {otherLabel} →
                </Link>
              </nav>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter dict={dict} locale={locale} />
    </div>
  )
}
