import type { Locale } from "@/lib/i18n"

export type GalleryCategory = "salon" | "chambre" | "cuisine" | "sdb" | "balcon" | "communs"

export interface GalleryItem {
  id: string
  type: "image" | "video"
  src: string
  poster?: string
  category: GalleryCategory
  /** Intrinsic ratio used to size masonry tiles before the media loads */
  width: number
  height: number
  caption: Record<Locale, string>
}

export const GALLERY_CATEGORIES: { id: GalleryCategory | "all"; label: Record<Locale, string> }[] = [
  { id: "all", label: { fr: "Tout", en: "All" } },
  { id: "salon", label: { fr: "Salon", en: "Living room" } },
  { id: "chambre", label: { fr: "Chambre", en: "Bedroom" } },
  { id: "cuisine", label: { fr: "Cuisine", en: "Kitchen" } },
  { id: "sdb", label: { fr: "Salle de bain", en: "Bathroom" } },
  { id: "balcon", label: { fr: "Balcon", en: "Balcony" } },
  { id: "communs", label: { fr: "Espaces communs", en: "Common areas" } },
]

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "salon-1",
    type: "image",
    src: "/images/gallery/salon-1.jpg",
    category: "salon",
    width: 960,
    height: 1280,
    caption: {
      fr: "Salon avec mur TV en marbre, tasseaux bois et corniche LED",
      en: "Living room with marble TV wall, wood slats and LED cove",
    },
  },
  {
    id: "video-1",
    type: "video",
    src: "/videos/visite-1.mp4",
    poster: "/images/gallery/salon-2.jpg",
    category: "salon",
    width: 720,
    height: 1280,
    caption: { fr: "Visite vidéo de l'appartement", en: "Video tour of the apartment" },
  },
  {
    id: "chambre-1",
    type: "image",
    src: "/images/gallery/chambre-1.jpg",
    category: "chambre",
    width: 960,
    height: 1280,
    caption: {
      fr: "Chambre avec tête de lit en bois et suspensions",
      en: "Bedroom with wooden headboard and pendant lights",
    },
  },
  {
    id: "cuisine-1",
    type: "image",
    src: "/images/gallery/cuisine-1.jpg",
    category: "cuisine",
    width: 960,
    height: 1280,
    caption: {
      fr: "Cuisine équipée, plan et crédence en marbre noir",
      en: "Fitted kitchen with black marble worktop and splashback",
    },
  },
  {
    id: "sdb-1",
    type: "image",
    src: "/images/gallery/sdb-1.jpg",
    category: "sdb",
    width: 1042,
    height: 1600,
    caption: {
      fr: "Salle de bain avec douche à l'italienne et éclairage indirect",
      en: "Bathroom with walk-in shower and indirect lighting",
    },
  },
  {
    id: "balcon-1",
    type: "image",
    src: "/images/gallery/balcon-1.jpg",
    category: "balcon",
    width: 960,
    height: 1280,
    caption: {
      fr: "Balcon privatif avec vue sur les collines de Yaoundé",
      en: "Private balcony overlooking the hills of Yaoundé",
    },
  },
  {
    id: "escalier-1",
    type: "image",
    src: "/images/gallery/escalier-1.jpg",
    category: "communs",
    width: 720,
    height: 1280,
    caption: {
      fr: "Escalier en marbre et garde-corps en verre",
      en: "Marble staircase with glass balustrade",
    },
  },
  {
    id: "salon-2",
    type: "image",
    src: "/images/gallery/salon-2.jpg",
    category: "salon",
    width: 960,
    height: 1280,
    caption: {
      fr: "Salon baigné de lumière, rideaux et canapé velours",
      en: "Light-filled living room with drapes and velvet sofa",
    },
  },
  {
    id: "sdb-2",
    type: "image",
    src: "/images/gallery/sdb-2.jpg",
    category: "sdb",
    width: 1061,
    height: 1600,
    caption: {
      fr: "Vasque suspendue et miroir rétro-éclairé",
      en: "Wall-hung basin and backlit mirror",
    },
  },
  {
    id: "video-2",
    type: "video",
    src: "/videos/visite-2.mp4",
    poster: "/images/gallery/chambre-1.jpg",
    category: "chambre",
    width: 720,
    height: 1280,
    caption: { fr: "Visite vidéo du studio", en: "Video tour of the studio" },
  },
  {
    id: "balcon-3",
    type: "image",
    src: "/images/gallery/balcon-3.jpg",
    category: "balcon",
    width: 960,
    height: 1280,
    caption: {
      fr: "Coin détente sur le balcon, colonnes et vue dégagée",
      en: "Balcony lounge corner with columns and open view",
    },
  },
  {
    id: "couloir-1",
    type: "image",
    src: "/images/gallery/couloir-1.jpg",
    category: "communs",
    width: 960,
    height: 1280,
    caption: {
      fr: "Palier avec portes noires et liserés dorés",
      en: "Landing with black doors and gold trim",
    },
  },
  {
    id: "escalier-3",
    type: "image",
    src: "/images/gallery/escalier-3.jpg",
    category: "communs",
    width: 720,
    height: 1280,
    caption: {
      fr: "Cage d'escalier végétalisée et lumineuse",
      en: "Bright staircase with greenery",
    },
  },
  {
    id: "balcon-2",
    type: "image",
    src: "/images/gallery/balcon-2.jpg",
    category: "balcon",
    width: 960,
    height: 1280,
    caption: {
      fr: "Balcon avec table bistrot et fauteuils tressés",
      en: "Balcony with bistro table and woven armchairs",
    },
  },
  {
    id: "escalier-2",
    type: "image",
    src: "/images/gallery/escalier-2.jpg",
    category: "communs",
    width: 720,
    height: 1280,
    caption: {
      fr: "Escalier sur deux niveaux, ouvert sur l'extérieur",
      en: "Two-level staircase opening onto the outside",
    },
  },
]
