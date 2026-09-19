import type { Locale } from "@/lib/i18n"

export interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  trim?: string
  color: { fr: string; en: string; hex: string }
  tagline: { fr: string; en: string }
  description: { fr: string; en: string }
  image: string
  gallery: string[]
  specs: {
    seats: number
    transmission: { fr: string; en: string }
    fuel: { fr: string; en: string }
    drive: string
  }
  features: { fr: string[]; en: string[] }
  idealFor: { fr: string; en: string }
}

export const VEHICLES: Vehicle[] = [
  {
    id: "prado-2022",
    brand: "Toyota",
    model: "Land Cruiser Prado",
    year: 2022,
    trim: "Super Sport",
    color: { fr: "Noir", en: "Black", hex: "#0b0b0d" },
    tagline: {
      fr: "Le SUV de référence pour vos déplacements prestige.",
      en: "The reference SUV for premium travel.",
    },
    description: {
      fr: "Confort absolu, présence imposante et fiabilité Toyota. Le Prado Super Sport est idéal pour les déplacements d'affaires, les cérémonies ou les longs trajets vers l'intérieur du pays.",
      en: "Absolute comfort, commanding presence and Toyota reliability. The Prado Super Sport is ideal for business trips, ceremonies or long journeys inland.",
    },
    image: "/images/vehicles/prado-black.png",
    gallery: ["/images/vehicles/prado-black.png", "/images/vehicles/prado-interior.png"],
    specs: {
      seats: 7,
      transmission: { fr: "Automatique", en: "Automatic" },
      fuel: { fr: "Diesel", en: "Diesel" },
      drive: "4x4",
    },
    features: {
      fr: ["Climatisation bi-zone", "Intérieur cuir", "Écran multimédia", "Caméra de recul", "Chauffeur disponible", "Toit ouvrant"],
      en: ["Dual-zone A/C", "Leather interior", "Multimedia screen", "Rear camera", "Driver available", "Sunroof"],
    },
    idealFor: {
      fr: "Affaires, cérémonies, longs trajets",
      en: "Business, ceremonies, long trips",
    },
  },
  {
    id: "hilux-2022",
    brand: "Toyota",
    model: "Hilux",
    year: 2022,
    trim: "Double Cabine",
    color: { fr: "Blanc", en: "White", hex: "#f3f4f6" },
    tagline: {
      fr: "Robuste, polyvalent, prêt pour toutes les routes.",
      en: "Rugged, versatile, ready for any road.",
    },
    description: {
      fr: "Le pick-up légendaire du Cameroun. Parfait pour les missions terrain, les excursions hors des grands axes ou le transport de matériel, sans sacrifier le confort à bord.",
      en: "Cameroon's legendary pickup. Perfect for field missions, off-the-beaten-path excursions or hauling equipment, without giving up on-board comfort.",
    },
    image: "/images/vehicles/hilux-white.png",
    gallery: ["/images/vehicles/hilux-white.png"],
    specs: {
      seats: 5,
      transmission: { fr: "Automatique", en: "Automatic" },
      fuel: { fr: "Diesel", en: "Diesel" },
      drive: "4x4",
    },
    features: {
      fr: ["Climatisation", "Benne couverte", "Bluetooth / USB", "Caméra de recul", "Chauffeur disponible", "Pneus tout-terrain"],
      en: ["Air conditioning", "Covered bed", "Bluetooth / USB", "Rear camera", "Driver available", "All-terrain tyres"],
    },
    idealFor: {
      fr: "Missions terrain, excursions, transport",
      en: "Field missions, excursions, transport",
    },
  },
]

export function getVehicleName(v: Vehicle) {
  return `${v.brand} ${v.model} ${v.year}${v.trim ? ` ${v.trim}` : ""}`
}

export function getVehicleWhatsAppMessage(v: Vehicle, locale: Locale) {
  const name = getVehicleName(v)
  return locale === "fr"
    ? `Bonjour Massa Residence, je souhaite réserver le véhicule ${name} (${v.color.fr}). Pouvez-vous me communiquer les tarifs et disponibilités ?`
    : `Hello Massa Residence, I would like to book the ${name} (${v.color.en}). Could you share rates and availability?`
}
