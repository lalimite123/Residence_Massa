import type { Metadata } from "next"
import { getDictionary, type Locale } from "@/lib/i18n"
import { LegalPage, COMPANY, type LegalSection } from "@/components/legal-page"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "fr" ? "Conditions générales | Massa Residence" : "Terms of service | Massa Residence",
    description:
      locale === "fr"
        ? "Conditions générales de location des appartements meublés Massa Residence à Yaoundé."
        : "Terms of service for Massa Residence furnished apartments in Yaoundé.",
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const fr = locale === "fr"

  const sections: LegalSection[] = fr
    ? [
        {
          title: "Objet",
          paragraphs: [
            `Les présentes conditions générales encadrent la location de courte et moyenne durée des appartements meublés proposés par ${COMPANY.name}, société immatriculée au registre du commerce de Yaoundé sous le numéro ${COMPANY.rc}, dont le siège est situé au ${COMPANY.address}, représentée par sa directrice générale, ${COMPANY.ceo}.`,
            "Toute réservation, qu'elle soit effectuée via WhatsApp, par téléphone, par email ou via le formulaire du site, implique l'acceptation sans réserve des présentes conditions.",
          ],
        },
        {
          title: "Réservation et confirmation",
          paragraphs: [
            "Une réservation est considérée comme ferme après confirmation écrite de Massa Residence (message WhatsApp ou email) et, le cas échéant, réception de l'acompte convenu.",
            "Les tarifs communiqués sont exprimés en francs CFA (XAF), par nuit ou par mois selon la formule choisie. Ils incluent l'électricité, l'eau, le Wi-Fi et le nettoyage d'arrivée, sauf mention contraire.",
          ],
        },
        {
          title: "Paiement",
          paragraphs: [
            "Le règlement s'effectue en espèces, par Mobile Money (Orange Money, MTN MoMo) ou par virement bancaire. Pour les séjours de plus de sept nuits, un acompte de 50 % peut être demandé à la réservation, le solde étant réglé à l'arrivée.",
            "Une caution peut être demandée à la remise des clés. Elle est restituée intégralement au départ après état des lieux, déduction faite des éventuels dommages constatés.",
          ],
        },
        {
          title: "Annulation et modification",
          paragraphs: ["Nous appliquons une politique d'annulation souple afin de vous offrir un maximum de flexibilité :"],
          bullets: [
            "Annulation plus de 72 heures avant l'arrivée : remboursement intégral de l'acompte.",
            "Annulation entre 24 et 72 heures avant l'arrivée : 50 % de l'acompte est retenu.",
            "Annulation moins de 24 heures avant l'arrivée ou non-présentation : l'acompte est conservé.",
            "Toute demande de modification de dates est étudiée en fonction des disponibilités, sans frais.",
          ],
        },
        {
          title: "Arrivée, départ et règles du séjour",
          paragraphs: [
            "L'arrivée est possible à partir de 14h et le départ doit être effectué avant 12h. Une arrivée tardive ou un départ décalé peuvent être organisés sur simple demande, selon disponibilité.",
            "Le nombre d'occupants ne doit pas dépasser la capacité indiquée pour le logement. Les fêtes, le tapage nocturne et le tabagisme à l'intérieur des appartements ne sont pas autorisés. Le locataire s'engage à respecter le voisinage et le règlement de la résidence.",
          ],
        },
        {
          title: "Responsabilités",
          paragraphs: [
            "Le locataire est responsable du logement et de son mobilier pendant toute la durée du séjour. Tout dommage, perte ou dégradation sera facturé au coût de remplacement ou de réparation.",
            "Massa Residence ne saurait être tenue responsable des objets personnels perdus ou volés dans le logement, ni des perturbations indépendantes de sa volonté (coupures d'électricité ou d'eau du réseau public, événements de force majeure). Des solutions de secours (groupe électrogène, réserve d'eau) sont mises en place dans la mesure du possible.",
          ],
        },
        {
          title: "Service véhicule",
          paragraphs: [
            "La mise à disposition d'un véhicule (avec ou sans chauffeur) constitue un service optionnel, faisant l'objet d'un devis distinct. Les conditions spécifiques (durée, kilométrage, carburant, assurance, caution) sont précisées lors de la confirmation.",
          ],
        },
        {
          title: "Droit applicable et litiges",
          paragraphs: [
            "Les présentes conditions sont soumises au droit camerounais. En cas de différend, les parties s'engagent à rechercher une solution amiable avant toute action. À défaut, les tribunaux compétents de Yaoundé seront seuls compétents.",
            `Pour toute question relative aux présentes conditions, écrivez-nous à ${COMPANY.email}.`,
          ],
        },
      ]
    : [
        {
          title: "Purpose",
          paragraphs: [
            `These terms govern short and medium-term rentals of the furnished apartments offered by ${COMPANY.name}, registered with the Yaoundé trade register under number ${COMPANY.rc}, headquartered at ${COMPANY.address}, represented by its CEO, ${COMPANY.ceo}.`,
            "Any booking, whether made via WhatsApp, phone, email or the website form, implies full acceptance of these terms.",
          ],
        },
        {
          title: "Booking and confirmation",
          paragraphs: [
            "A booking is considered firm once Massa Residence has confirmed it in writing (WhatsApp message or email) and, where applicable, the agreed deposit has been received.",
            "Rates are quoted in CFA francs (XAF), per night or per month depending on the chosen plan. They include electricity, water, Wi-Fi and arrival cleaning unless stated otherwise.",
          ],
        },
        {
          title: "Payment",
          paragraphs: [
            "Payment is accepted in cash, by Mobile Money (Orange Money, MTN MoMo) or by bank transfer. For stays longer than seven nights, a 50% deposit may be requested at booking, with the balance due on arrival.",
            "A security deposit may be requested on key handover. It is refunded in full on departure after inspection, less any damage identified.",
          ],
        },
        {
          title: "Cancellation and changes",
          paragraphs: ["We apply a flexible cancellation policy to give you maximum peace of mind:"],
          bullets: [
            "Cancellation more than 72 hours before arrival: full refund of the deposit.",
            "Cancellation between 24 and 72 hours before arrival: 50% of the deposit is retained.",
            "Cancellation less than 24 hours before arrival or no-show: the deposit is retained.",
            "Date changes are considered subject to availability, free of charge.",
          ],
        },
        {
          title: "Check-in, check-out and house rules",
          paragraphs: [
            "Check-in is from 2 pm and check-out is before 12 pm. Late arrival or late check-out can be arranged on request, subject to availability.",
            "The number of occupants must not exceed the stated capacity of the unit. Parties, night-time noise and smoking inside the apartments are not permitted. Guests agree to respect neighbours and the residence rules.",
          ],
        },
        {
          title: "Liability",
          paragraphs: [
            "Guests are responsible for the apartment and its furnishings throughout their stay. Any damage, loss or deterioration will be charged at replacement or repair cost.",
            "Massa Residence cannot be held liable for personal belongings lost or stolen in the apartment, nor for disruptions beyond its control (public grid power or water cuts, force majeure). Backup solutions (generator, water reserve) are provided wherever possible.",
          ],
        },
        {
          title: "Vehicle service",
          paragraphs: [
            "Provision of a vehicle (with or without driver) is an optional service subject to a separate quote. Specific conditions (duration, mileage, fuel, insurance, deposit) are set out at confirmation.",
          ],
        },
        {
          title: "Governing law and disputes",
          paragraphs: [
            "These terms are governed by Cameroonian law. In the event of a dispute, the parties undertake to seek an amicable solution before any legal action. Failing that, the competent courts of Yaoundé shall have sole jurisdiction.",
            `For any question about these terms, write to us at ${COMPANY.email}.`,
          ],
        },
      ]

  return (
    <LegalPage
      locale={locale}
      dict={dict}
      eyebrow={fr ? "Informations légales" : "Legal"}
      title={fr ? "Conditions générales de location" : "Terms of service"}
      intro={
        fr
          ? "Des règles claires pour un séjour serein. Voici tout ce qu'il faut savoir avant de réserver l'un de nos appartements meublés à Yaoundé."
          : "Clear rules for a worry-free stay. Everything you need to know before booking one of our furnished apartments in Yaoundé."
      }
      updated={fr ? "Dernière mise à jour : septembre 2026" : "Last updated: September 2026"}
      sections={sections}
      otherHref={`/${locale}/privacy`}
      otherLabel={fr ? "Politique de confidentialité" : "Privacy policy"}
    />
  )
}
