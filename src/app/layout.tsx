import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CCR Kennels | Italian Cane Corso Breeder - Southern Illinois',
  description:
    'CCR Kennels - Veteran-owned Italian Cane Corso breeder in Southern Illinois. AKC registered puppies with champion bloodlines, DNA health testing, and 2-year health guarantee.',
  keywords:
    'Cane Corso breeder Illinois, Italian Cane Corso puppies, AKC Cane Corso, Cane Corso puppies for sale, veteran owned dog breeder, Cane Corso Centralia IL, Cane Corso Southern Illinois, Italian mastiff puppies, CCR Kennels',
  openGraph: {
    title: 'CCR Kennels | Italian Cane Corso Breeder - Southern Illinois',
    description:
      'Veteran-owned AKC Cane Corso breeder in Centralia, IL. Champion bloodlines, DNA health tested, 2-year health guarantee. Nationwide shipping available.',
    url: 'https://www.ccrcorsos.com',
    siteName: 'CCR Kennels',
    images: [
      {
        url: 'https://static.wixstatic.com/media/a1daef_88d23b183c834d8087dfa25c1238b404~mv2.png',
        width: 1200,
        height: 630,
        alt: 'CCR Kennels - Italian Cane Corso',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CCR Kennels | Italian Cane Corso Breeder',
    description:
      'Veteran-owned AKC Cane Corso breeder in Southern Illinois. Champion bloodlines, DNA tested, 2-year health guarantee.',
    images: ['https://static.wixstatic.com/media/a1daef_88d23b183c834d8087dfa25c1238b404~mv2.png'],
  },
  alternates: {
    canonical: 'https://www.ccrcorsos.com',
  },
  verification: {
    google: ['D6zxnPzW4pZeGmCNqu2-6KM9545rYb8i8z6uk5Z6LR8', 'Ysg2pyMRAghO18a_FQmN7kzChHT9lDlM5zEYixofyhY'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload LCP hero background image */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg.webp"
          fetchPriority="high"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Font Awesome — solid + brands only (~70% smaller than all.min.css) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/fontawesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/solid.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/brands.min.css"
        />

        {/* ─── Google Analytics 4 ───────────────────────────────────────
            Replace G-XXXXXXXXXX with your Measurement ID from:
            analytics.google.com → Admin → Data Streams → your stream
        ──────────────────────────────────────────────────────────────── */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} /> */}

        {/* ─── Schema.org Structured Data (Google Rich Results) ──────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'CCR Kennels',
              description:
                'Veteran-owned Italian Cane Corso breeder in Southern Illinois. AKC registered puppies with champion bloodlines and 2-year health guarantee.',
              url: 'https://www.ccrcorsos.com',
              telephone: '+17069737697',
              email: 'ccrkennels2022@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '1602 Woods Ln',
                addressLocality: 'Centralia',
                addressRegion: 'IL',
                postalCode: '62801',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 38.5253,
                longitude: -89.1334,
              },
              image:
                'https://static.wixstatic.com/media/a1daef_88d23b183c834d8087dfa25c1238b404~mv2.png',
              sameAs: [
                'https://www.facebook.com/people/CCR-Kennels/61550619435436/',
                'https://www.instagram.com/ccr_kennels_of_soil/',
                'https://www.tiktok.com/@ccr_kennels',
              ],
              priceRange: '$$',
              openingHours: 'Mo-Sa 08:00-18:00',
            }),
          }}
        />

        {/* ─── Microsoft Clarity ───────────────────────────────────────
            Replace XXXXXXXXXX with your Project ID from:
            clarity.microsoft.com → your project → Setup
        ──────────────────────────────────────────────────────────────── */}
        {/* <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "XXXXXXXXXX");
        `}} /> */}
      </head>
      <body>{children}</body>
    </html>
  )
}
