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

export const properties: Property[] = [
  {
    id: "1",
    slug: "suite-prestige-bastos",
    name: {
      fr: "Suite Prestige Bastos",
      en: "Prestige Suite Bastos",
    },
    description: {
      fr: "Suite luxueuse entièrement meublée et équipée dans le quartier diplomatique de Bastos. Finitions haut de gamme, mobilier design et équipements premium. Idéal pour les professionnels exigeants ou couples en séjour d'affaires. Proximité immédiate des ambassades et restaurants gastronomiques.",
      en: "Luxurious fully furnished and equipped suite in the diplomatic Bastos neighborhood. Premium finishes, designer furniture and high-end amenities. Ideal for demanding professionals or couples on business trips. Close to embassies and gourmet restaurants.",
    },
    shortDescription: {
      fr: "Suite élégante avec finitions premium au cœur de Bastos",
      en: "Elegant suite with premium finishes in the heart of Bastos",
    },
    location: {
      fr: "Bastos, Yaoundé",
      en: "Bastos, Yaoundé",
    },
    neighborhood: "Bastos",
    pricePerNight: 45000,
    pricePerMonth: 550000,
    currency: "FCFA",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    area: 45,
    amenities: ["wifi", "ac", "kitchen", "tv", "security", "water", "generator"],
    images: [
      "/images/studio-bastos-1.jpg",
      "/images/studio-bastos-2.jpg",
      "/images/studio-bastos-3.jpg",
    ],
    featured: true,
    available: true,
  },
  {
    id: "2",
    slug: "residence-executive-omnisport",
    name: {
      fr: "Résidence Executive Omnisport",
      en: "Executive Residence Omnisport",
    },
    description: {
      fr: "Résidence spacieuse de 2 chambres avec terrasse panoramique dans le quartier prisé d'Omnisport. Grand salon lumineux, cuisine entièrement équipée et balcon avec vue dégagée. Parfait pour les familles ou séjours longue durée.",
      en: "Spacious 2-bedroom residence with panoramic terrace in the sought-after Omnisport neighborhood. Bright living room, fully equipped kitchen and balcony with open views. Perfect for families or long stays.",
    },
    shortDescription: {
      fr: "Résidence familiale avec terrasse et vue panoramique",
      en: "Family residence with terrace and panoramic views",
    },
    location: {
      fr: "Omnisport, Yaoundé",
      en: "Omnisport, Yaoundé",
    },
    neighborhood: "Omnisport",
    pricePerNight: 65000,
    pricePerMonth: 750000,
    currency: "FCFA",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    area: 85,
    amenities: ["wifi", "ac", "parking", "kitchen", "tv", "security", "water", "generator"],
    images: [
      "/images/apt-omnisport-1.jpg",
      "/images/apt-omnisport-2.jpg",
      "/images/apt-omnisport-3.jpg",
    ],
    featured: true,
    available: true,
  },
  {
    id: "3",
    slug: "appartement-signature-nlongkak",
    name: {
      fr: "Appartement Signature Nlongkak",
      en: "Signature Apartment Nlongkak",
    },
    description: {
      fr: "Appartement signature dans une résidence sécurisée à Nlongkak. Design contemporain, finitions de luxe et équipements dernier cri. Accès privilégié au centre-ville et aux zones commerciales haut de gamme.",
      en: "Signature apartment in a secure residence in Nlongkak. Contemporary design, luxury finishes and state-of-the-art amenities. Privileged access to downtown and upscale commercial areas.",
    },
    shortDescription: {
      fr: "Design contemporain en résidence sécurisée premium",
      en: "Contemporary design in premium secure residence",
    },
    location: {
      fr: "Nlongkak, Yaoundé",
      en: "Nlongkak, Yaoundé",
    },
    neighborhood: "Nlongkak",
    pricePerNight: 55000,
    pricePerMonth: 650000,
    currency: "FCFA",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    area: 60,
    amenities: ["wifi", "ac", "parking", "kitchen", "tv", "security", "water", "generator", "laundry"],
    images: [
      "/images/apt-nlongkak-1.jpg",
      "/images/apt-nlongkak-2.jpg",
      "/images/apt-nlongkak-3.jpg",
    ],
    featured: true,
    available: true,
  },
  {
    id: "4",
    slug: "villa-grand-luxe-mfandena",
    name: {
      fr: "Villa Grand Luxe Mfandena",
      en: "Grand Luxury Villa Mfandena",
    },
    description: {
      fr: "Villa d'exception de 3 chambres avec piscine privée et jardin tropical dans le quartier résidentiel de Mfandena. Espaces de réception généreux, suite parentale avec dressing et terrasse privative. L'excellence absolue pour vos séjours prestigieux.",
      en: "Exceptional 3-bedroom villa with private pool and tropical garden in the residential Mfandena neighborhood. Generous reception areas, master suite with dressing room and private terrace. Absolute excellence for your prestigious stays.",
    },
    shortDescription: {
      fr: "Villa d'exception avec piscine et jardin tropical privé",
      en: "Exceptional villa with private pool and tropical garden",
    },
    location: {
      fr: "Mfandena, Yaoundé",
      en: "Mfandena, Yaoundé",
    },
    neighborhood: "Mfandena",
    pricePerNight: 150000,
    pricePerMonth: 1800000,
    currency: "FCFA",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    area: 200,
    amenities: ["wifi", "ac", "parking", "kitchen", "tv", "security", "water", "generator", "laundry", "pool"],
    images: [
      "/images/villa-mfandena-1.jpg",
      "/images/villa-mfandena-2.jpg",
      "/images/villa-mfandena-3.jpg",
    ],
    featured: true,
    available: true,
  },
  {
    id: "5",
    slug: "studio-confort-essos",
    name: {
      fr: "Studio Confort Essos",
      en: "Comfort Studio Essos",
    },
    description: {
      fr: "Studio fonctionnel et confortable dans le quartier dynamique d'Essos. Aménagement intelligent, équipements modernes et excellent rapport qualité-prix. Idéal pour les séjours professionnels ou académiques.",
      en: "Functional and comfortable studio in the dynamic Essos neighborhood. Smart layout, modern amenities and excellent value for money. Ideal for professional or academic stays.",
    },
    shortDescription: {
      fr: "Studio moderne avec excellent rapport qualité-prix",
      en: "Modern studio with excellent value",
    },
    location: {
      fr: "Essos, Yaoundé",
      en: "Essos, Yaoundé",
    },
    neighborhood: "Essos",
    pricePerNight: 25000,
    pricePerMonth: 300000,
    currency: "FCFA",
    bedrooms: 0,
    bathrooms: 1,
    maxGuests: 2,
    area: 30,
    amenities: ["wifi", "ac", "kitchen", "tv", "water"],
    images: [
      "/images/studio-essos-1.jpg",
      "/images/studio-essos-2.jpg",
    ],
    featured: false,
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
