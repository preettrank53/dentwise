export default function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://dentwise.vercel.app'
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#doctors`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
