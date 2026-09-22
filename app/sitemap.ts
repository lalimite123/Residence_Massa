import { MetadataRoute } from 'next'
import { properties } from '@/lib/data/properties'
import { locales } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://massaresidence.com'

  // Pages principales statiques (Accueil, Contact, Galerie, Mentions Légales)
  const staticRoutes = ['', '/contact', '/galerie', '/privacy', '/terms'].flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  )

  // Pages dynamiques des logements
  const propertyRoutes = properties.flatMap((property) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/logements/${property.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))
  )

  return [...staticRoutes, ...propertyRoutes]
}
