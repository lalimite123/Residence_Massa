export type Property = {
  id: string
  slug: string
  name: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  shortDescription: {
    fr: string
    en: string
  }
  location: {
    fr: string
    en: string
  }
  neighborhood: string
  pricePerNight: number
  pricePerMonth: number
  currency: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  area: number
  amenities: string[]
  images: string[]
  featured: boolean
  available: boolean
}

// Photos réelles de la résidence (Yaoundé - Fougerolle)
export const residenceImages = {
  chambre1: "/images/real-chambre-1.jpg",
  chambre2: "/images/real-chambre-2.jpg",
  salon: "/images/real-salon.jpg",
  cuisine1: "/images/real-cuisine-1.jpg",
  cuisine2: "/images/real-cuisine-2.jpg",
  salleDeBain: "/images/real-salle-de-bain.jpg",
  entreeBar: "/images/real-entree-bar.jpg",
  couloir: "/images/real-couloir.jpg",
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "studio-moderne",
    name: {
      fr: "Studio Moderne",
      en: "Modern Studio",
    },
    description: {
      fr: "Studio moderne entièrement meublé et équipé au cœur de Yaoundé, quartier Fougerolle. Une chambre avec tête de lit en bois noble et éclairage LED indirect, un salon confortable, une cuisine équipée en marbre noir avec four, plaques et réfrigérateur, une salle de bain contemporaine avec WC suspendu et un balcon. Climatisation, TV connectée et Wi-Fi haut débit inclus.",
      en: "Modern fully furnished and equipped studio in the heart of Yaoundé, Fougerolle district. One bedroom with a fine-wood headboard wall and indirect LED lighting, a comfortable living room, a fitted kitchen in black marble with oven, hob and fridge, a contemporary bathroom with wall-hung toilet and a balcony. Air conditioning, smart TV and high-speed Wi-Fi included.",
    },
    shortDescription: {
      fr: "1 chambre, 1 salle de bain, salon, cuisine équipée et balcon",
      en: "1 bedroom, 1 bathroom, living room, fitted kitchen and balcony",
    },
    location: {
      fr: "Fougerolle, Yaoundé",
      en: "Fougerolle, Yaoundé",
    },
    neighborhood: "Fougerolle",
    pricePerNight: 55000,
    pricePerMonth: 1050000,
    currency: "FCFA",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    area: 45,
    amenities: ["wifi", "ac", "kitchen", "tv", "security", "water", "generator", "parking"],
    images: [
      residenceImages.chambre1,
      residenceImages.cuisine2,
      residenceImages.salleDeBain,
      residenceImages.chambre2,
      residenceImages.couloir,
    ],
    featured: true,
    available: true,
  },
  {
    id: "2",
    slug: "appartement-moderne",
    name: {
      fr: "Appartement Moderne",
      en: "Modern Apartment",
    },
    description: {
      fr: "Appartement moderne de 2 chambres, entièrement meublé et équipé, à Fougerolle. Grand salon avec canapé d'angle en velours, table basse en marbre et éclairage d'ambiance, cuisine ouverte en marbre noir avec bar et tabourets, deux chambres avec dressing et TV, deux salles de bain contemporaines et deux balcons. Idéal pour les familles et les séjours longue durée.",
      en: "Modern 2-bedroom apartment, fully furnished and equipped, in Fougerolle. Large living room with velvet corner sofa, marble coffee table and ambient lighting, open black-marble kitchen with breakfast bar and stools, two bedrooms with wardrobe and TV, two contemporary bathrooms and two balconies. Ideal for families and long stays.",
    },
    shortDescription: {
      fr: "2 chambres, 2 salles de bain, salon, cuisine et 2 balcons",
      en: "2 bedrooms, 2 bathrooms, living room, kitchen and 2 balconies",
    },
    location: {
      fr: "Fougerolle, Yaoundé",
      en: "Fougerolle, Yaoundé",
    },
    neighborhood: "Fougerolle",
    pricePerNight: 70000,
    pricePerMonth: 1500000,
    currency: "FCFA",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    area: 85,
    amenities: ["wifi", "ac", "parking", "kitchen", "tv", "security", "water", "generator", "laundry"],
    images: [
      residenceImages.salon,
      residenceImages.cuisine1,
      residenceImages.entreeBar,
      residenceImages.chambre2,
      residenceImages.chambre1,
      residenceImages.salleDeBain,
      residenceImages.couloir,
    ],
    featured: true,
    available: true,
  },
]

export const getFeaturedProperties = () => properties.filter((p) => p.featured)

export const getPropertyBySlug = (slug: string) =>
  properties.find((p) => p.slug === slug)

export const getAvailableProperties = () => properties.filter((p) => p.available)

export const formatPrice = (price: number, currency: string = "FCFA") => {
  return new Intl.NumberFormat("fr-FR").format(price) + " " + currency
}
