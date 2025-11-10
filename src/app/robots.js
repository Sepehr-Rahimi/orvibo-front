export default function robots() {
  return {
    rules: [
      {
        userAgent: '*', // Apply to all crawlers
        allow: ['/'], // Allow homepage and everything under it by default
        disallow: [
          '/_*', // Block admin pages
          '/admin/', // Block API endpoints
          '/auth/', // Example: block any private routes
          '/blank/',
          '/coming-soon/',
          '/components/',
          '/dashboard/',
          '/error/',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`, // Point to your sitemap
  };
}
