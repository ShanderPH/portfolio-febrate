import { Marquee } from '@/components/animations/Marquee'

export function HeroMarquee({ items, pauseLabel, resumeLabel }: { items: string[]; pauseLabel: string; resumeLabel: string }) {
  return (
    <div className="author-marquee w-full py-4 sm:py-5">
      <Marquee speed={40} gap={32} pauseOnHover pauseLabel={pauseLabel} resumeLabel={resumeLabel} className="text-sm font-medium text-muted sm:text-base">
        {items.map((item, index) => (
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
