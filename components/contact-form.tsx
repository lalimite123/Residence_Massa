"use client"

import { useState } from "react"
import { MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WHATSAPP_NUMBERS } from "@/components/whatsapp-button"
import type { Dictionary, Locale } from "@/lib/i18n"

interface ContactFormProps {
  dict: Dictionary
  locale: Locale
}

const UNIT_OPTIONS = [
  { value: "studio", label: { fr: "Studio Moderne", en: "Modern Studio" } },
  { value: "appartement", label: { fr: "Appartement Moderne", en: "Modern Apartment" } },
  { value: "vehicule", label: { fr: "Location de véhicule", en: "Vehicle rental" } },
  { value: "autre", label: { fr: "Autre demande", en: "Other request" } },
]

export function ContactForm({ dict, locale }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    unit: "studio",
    arrival: "",
    departure: "",
    guests: "1",
    message: "",
  })

  const t = {
    unit: locale === "fr" ? "Type de logement" : "Accommodation type",
    hint:
      locale === "fr"
        ? "Votre demande s'ouvre directement dans WhatsApp, prête à envoyer."
        : "Your request opens directly in WhatsApp, ready to send.",
    submit: locale === "fr" ? "Envoyer via WhatsApp" : "Send via WhatsApp",
    optional: locale === "fr" ? "facultatif" : "optional",
  }

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const unitLabel = UNIT_OPTIONS.find((u) => u.value === form.unit)?.label[locale] ?? form.unit
    const lines =
      locale === "fr"
        ? [
            `Bonjour Massa Residence,`,
            ``,
            `Je souhaite réserver : ${unitLabel}`,
            `Nom : ${form.name}`,
            form.phone && `Téléphone : ${form.phone}`,
            form.arrival && `Arrivée : ${form.arrival}`,
            form.departure && `Départ : ${form.departure}`,
            `Personnes : ${form.guests}`,
            form.message && ``,
            form.message && form.message,
          ]
        : [
            `Hello Massa Residence,`,
            ``,
            `I would like to book: ${unitLabel}`,
            `Name: ${form.name}`,
            form.phone && `Phone: ${form.phone}`,
            form.arrival && `Arrival: ${form.arrival}`,
            form.departure && `Departure: ${form.departure}`,
            `Guests: ${form.guests}`,
            form.message && ``,
            form.message && form.message,
          ]
    const text = lines.filter((l) => l !== false && l !== undefined).join("\n")
    window.open(`https://wa.me/${WHATSAPP_NUMBERS.primary}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
  }

  const fieldClass =
    "w-full h-12 px-4 rounded-md bg-background border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
  const labelClass = "block text-xs uppercase tracking-wider text-muted-foreground mb-2"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            {dict.contact.form.name}
          </label>
          <input id="name" required value={form.name} onChange={update("name")} className={fieldClass} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            {dict.contact.form.phone} <span className="normal-case tracking-normal">({t.optional})</span>
          </label>
          <input id="phone" type="tel" value={form.phone} onChange={update("phone")} className={fieldClass} autoComplete="tel" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="unit" className={labelClass}>
            {t.unit}
          </label>
          <select id="unit" value={form.unit} onChange={update("unit")} className={fieldClass}>
            {UNIT_OPTIONS.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label[locale]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="guests" className={labelClass}>
            {dict.contact.form.guests}
          </label>
          <input id="guests" type="number" min={1} max={8} value={form.guests} onChange={update("guests")} className={fieldClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="arrival" className={labelClass}>
            {dict.contact.form.arrival}
          </label>
          <input id="arrival" type="date" value={form.arrival} onChange={update("arrival")} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="departure" className={labelClass}>
            {dict.contact.form.departure}
          </label>
          <input
            id="departure"
            type="date"
            min={form.arrival || undefined}
            value={form.departure}
            onChange={update("departure")}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {dict.contact.form.message} <span className="normal-case tracking-normal">({t.optional})</span>
        </label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={update("message")}
          className={`${fieldClass} h-auto py-3 resize-none`}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
        <Button type="submit" className="h-12 px-6 rounded-md bg-[#25D366] text-white hover:bg-[#20bd5a]">
          <MessageCircle className="w-4 h-4 mr-2" />
          {t.submit}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <p className="text-xs text-muted-foreground leading-relaxed">{t.hint}</p>
      </div>
    </form>
  )
}
