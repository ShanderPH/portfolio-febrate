'use client'

import { useT } from '@/lib/i18n/client'
import { Marquee } from '@/components/animations'

export function HeroMarquee() {
  const { t } = useT('home')
  
  const marqueeItems = t('hero.marqueeItems', { returnObjects: true }) as string[]

  return (
    <div className="w-full bg-surface/80 py-4 backdrop-blur-sm sm:py-5">
      <Marquee speed={40} gap={32} pauseOnHover className="text-sm font-medium text-muted sm:text-base">
        {marqueeItems.map((item, index) => (
          <MarqueeItem key={`${item}-${index}`} text={item} />
        ))}
      </Marquee>
    </div>
  )
}

interface MarqueeItemProps {
  text: string
}

function MarqueeItem({ text }: MarqueeItemProps) {
  return (
    <span className="flex items-center gap-3 whitespace-nowrap px-2">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      <span>{text}</span>
    </span>
  )
}
