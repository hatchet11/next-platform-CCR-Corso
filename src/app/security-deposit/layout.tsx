import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Deposit | CCR Kennels',
  description:
    'Submit your $500 non-refundable security deposit to reserve your Italian Cane Corso puppy from CCR Kennels.',
  alternates: { canonical: 'https://www.ccrcorsos.com/security-deposit' },
  openGraph: {
    title: 'Security Deposit | CCR Kennels',
    description:
      'Reserve your Cane Corso puppy with a $500 security deposit from CCR Kennels.',
    url: 'https://www.ccrcorsos.com/security-deposit',
    siteName: 'CCR Kennels',
    type: 'website',
  },
}

export default function SecurityDepositLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
