'use client';

import { useId, useRef } from 'react';

export function BrandReveal({ label }: { label: string }) {
  const id = useId().replaceAll(':', '');
  const spotlight = useRef<SVGRadialGradientElement>(null);
  return <a className="author-brand-reveal" href="#author-home" aria-label={`Febrate — ${label}`}
    onPointerMove={event => {
      const box = event.currentTarget.getBoundingClientRect();
      spotlight.current?.setAttribute('cx', `${(event.clientX - box.left) / box.width * 100}%`);
      spotlight.current?.setAttribute('cy', `${(event.clientY - box.top) / box.height * 100}%`);
    }}>
    <svg aria-hidden="true" viewBox="0 0 1000 190">
      <defs>
        <radialGradient id={`${id}-spot`} ref={spotlight} r="45%"><stop stopColor="white"/><stop offset="1" stopColor="black"/></radialGradient>
        <mask id={`${id}-mask`}><rect width="1000" height="190" fill={`url(#${id}-spot)`}/></mask>
      </defs>
      <text x="0" y="160" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="currentColor">FEBRATE</text>
      <text className="author-brand-highlight" x="0" y="160" textLength="1000" lengthAdjust="spacingAndGlyphs" mask={`url(#${id}-mask)`}>FEBRATE</text>
    </svg>
  </a>;
}
