import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Febrate Portfolio',
  description: 'A modern portfolio built with Next.js 16, HeroUI V3, and Tailwind CSS V4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
