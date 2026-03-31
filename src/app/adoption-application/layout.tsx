import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adoption Application | CCR Kennels',
  description:
    'Apply to adopt an Italian Cane Corso puppy from CCR Kennels. Complete our adoption application to begin the process of welcoming a Corso into your family.',
  alternates: { canonical: 'https://www.ccrcorsos.com/adoption-application' },
  openGraph: {
    title: 'Adoption Application | CCR Kennels',
    description:
      'Apply to adopt an Italian Cane Corso puppy from CCR Kennels in Southern Illinois.',
    url: 'https://www.ccrcorsos.com/adoption-application',
    siteName: 'CCR Kennels',
    type: 'website',
  },
}

export default function AdoptionApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
