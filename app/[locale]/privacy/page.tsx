import type { Metadata } from "next"
import { getDictionary, type Locale } from "@/lib/i18n"
import { LegalPage, COMPANY, type LegalSection } from "@/components/legal-page"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "fr" ? "Politique de confidentialité | Massa Residence" : "Privacy policy | Massa Residence",
    description:
      locale === "fr"
        ? "Comment Massa Residence collecte, utilise et protège vos données personnelles."
        : "How Massa Residence collects, uses and protects your personal data.",
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const fr = locale === "fr"

  const sections: LegalSection[] = fr
    ? [
        {
          title: "Responsable du traitement",
          paragraphs: [
            `Le responsable du traitement de vos données est ${COMPANY.name}, immatriculée sous le numéro ${COMPANY.rc}, sise au ${COMPANY.address}, représentée par ${COMPANY.ceo}. Vous pouvez nous joindre à ${COMPANY.email}.`,
          ],
        },
        {
          title: "Données collectées",
          paragraphs: ["Nous collectons uniquement les informations nécessaires à la gestion de votre séjour :"],
          bullets: [
            "Identité : nom, prénom, et le cas échéant une pièce d'identité à l'arrivée (obligation légale d'hébergement).",
            "Coordonnées : numéro de téléphone / WhatsApp, adresse email.",
            "Détails du séjour : dates, logement choisi, nombre de personnes, demandes particulières.",
            "Données techniques : pages consultées et informations de navigation anonymisées lorsque vous utilisez notre site.",
          ],
        },
        {
          title: "Finalités et base légale",
          paragraphs: ["Vos données sont utilisées pour :"],
          bullets: [
            "Traiter et confirmer vos demandes de réservation (exécution du contrat).",
            "Communiquer avec vous avant, pendant et après votre séjour (exécution du contrat, intérêt légitime).",
            "Respecter nos obligations légales et comptables (obligation légale).",
            "Améliorer notre site et nos services (intérêt légitime).",
          ],
          
        },
        {
          title: "Conservation des données",
          paragraphs: [
            "Les données liées à une réservation sont conservées pendant la durée nécessaire à la gestion du séjour, puis archivées le temps requis par la législation comptable et fiscale camerounaise. Les échanges WhatsApp sont conservés dans l'application de messagerie et supprimés sur simple demande.",
          ],
        },
        {
          title: "Partage des données",
          paragraphs: [
            "Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec les prestataires strictement nécessaires au fonctionnement de nos services (hébergement du site, messagerie WhatsApp, prestataires de paiement Mobile Money) ou avec les autorités lorsque la loi l'exige.",
          ],
        },
        {
          title: "Cookies et mesure d'audience",
          paragraphs: [
            "Notre site utilise uniquement des cookies techniques indispensables à son fonctionnement (préférence de langue, par exemple) et des outils de mesure d'audience anonymisés. Aucun cookie publicitaire n'est déposé.",
          ],
        },
        {
          title: "Sécurité",
          paragraphs: [
            "Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données contre tout accès, modification ou divulgation non autorisés : connexions chiffrées (HTTPS), accès restreint aux informations de réservation et sensibilisation de notre équipe.",
          ],
        },
        {
          title: "Vos droits",
          paragraphs: [
            "Conformément à la législation camerounaise sur la protection des données, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition concernant vos données personnelles.",
            `Pour exercer ces droits, contactez-nous à ${COMPANY.email} ou par courrier au ${COMPANY.address}. Nous répondons dans un délai de 30 jours.`,
          ],
        },
      ]
    : [
        {
          title: "Data controller",
          paragraphs: [
            `The controller of your personal data is ${COMPANY.name}, registered under number ${COMPANY.rc}, located at ${COMPANY.address}, represented by ${COMPANY.ceo}. You can reach us at ${COMPANY.email}.`,
          ],
        },
        {
          title: "Data we collect",
          paragraphs: ["We only collect the information needed to manage your stay:"],
          bullets: [
            "Identity: first and last name, and where applicable an ID document on arrival (legal accommodation requirement).",
            "Contact details: phone / WhatsApp number, email address.",
            "Stay details: dates, chosen unit, number of guests, special requests.",
            "Technical data: pages visited and anonymised browsing information when you use our website.",
          ],
        },
        {
          title: "Purposes and legal basis",
          paragraphs: ["Your data is used to:"],
          bullets: [
            "Process and confirm your booking requests (performance of the contract).",
            "Communicate with you before, during and after your stay (contract performance, legitimate interest).",
            "Comply with our legal and accounting obligations (legal obligation).",
            "Improve our website and services (legitimate interest).",
          ],
        },
        {
          title: "Data retention",
          paragraphs: [
            "Booking data is kept for as long as needed to manage your stay, then archived for the period required by Cameroonian accounting and tax law. WhatsApp conversations are stored in the messaging app and deleted on request.",
          ],
        },
        {
          title: "Data sharing",
          paragraphs: [
            "Your data is never sold. It may only be shared with providers strictly necessary to operate our services (website hosting, WhatsApp messaging, Mobile Money payment providers) or with authorities where required by law.",
          ],
        },
        {
          title: "Cookies and analytics",
          paragraphs: [
            "Our website only uses technical cookies essential to its operation (such as language preference) and anonymised audience measurement tools. No advertising cookies are set.",
          ],
        },
        {
          title: "Security",
          paragraphs: [
            "We implement reasonable technical and organisational measures to protect your data against unauthorised access, alteration or disclosure: encrypted connections (HTTPS), restricted access to booking information and staff awareness.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Under Cameroonian data protection law, you have the right to access, rectify, erase and object to the processing of your personal data.",
            `To exercise these rights, contact us at ${COMPANY.email} or by post at ${COMPANY.address}. We respond within 30 days.`,
          ],
        },
      ]

  return (
    <LegalPage
      locale={locale}
      dict={dict}
      eyebrow={fr ? "Informations légales" : "Legal"}
      title={fr ? "Politique de confidentialité" : "Privacy policy"}
      intro={
        fr
          ? "Votre confiance est essentielle. Cette page explique simplement quelles données nous collectons, pourquoi, et comment nous les protégeons."
          : "Your trust matters. This page explains in plain terms what data we collect, why, and how we protect it."
      }
      updated={fr ? "Dernière mise à jour : septembre 2026" : "Last updated: September 2026"}
      sections={sections}
      otherHref={`/${locale}/terms`}
      otherLabel={fr ? "Conditions générales" : "Terms of service"}
    />
  )
}
