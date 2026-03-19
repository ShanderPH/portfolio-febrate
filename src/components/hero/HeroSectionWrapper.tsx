'use client'

import { HeroSection } from './HeroSection'

interface HeroSectionWrapperProps {
  onCtaClick?: () => void
}

export function HeroSectionWrapper({ onCtaClick }: HeroSectionWrapperProps) {
  return <HeroSection onCtaClick={onCtaClick} />
}
