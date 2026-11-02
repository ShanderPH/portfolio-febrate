'use client';

import { useRef, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MeshGradientBackground } from './MeshGradientBackground';

const query = '(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)';
function subscribe(notify: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
}

export function HeroNarrative({ hero }: { hero: {
  lines: { intro: string; notJust: string; problemSolver: string }; tagline: string; cta: string; scrollIndicator: string;
} }) {
  const ref = useRef<HTMLElement>(null);
  const enhanced = useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const intro = useTransform(scrollYProgress, [0, 0.2, 0.32], [1, 1, 0]);
  const problem = useTransform(scrollYProgress, [0.25, 0.38, 0.6, 0.72], [0, 1, 1, 0]);
  const promise = useTransform(scrollYProgress, [0.65, 0.78, 1], [0, 1, 1]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return <section id="author-home" tabIndex={-1} ref={ref} className={`author-narrative${enhanced ? ' is-enhanced' : ''}`} aria-label={hero.lines.intro}>
    <div className="author-stage">
      <div className="author-matter" aria-hidden="true"><MeshGradientBackground /></div>
      <div className="author-hero-grid">
        <div className="author-acts">
          <motion.div className="author-act" style={enhanced ? { opacity: intro } : undefined}>
            <p className="author-label">Felipe Braat</p>
            <h1>{hero.lines.intro}</h1>
            <a className="author-cta author-early-cta" href="#projects-section">{hero.cta}</a>
          </motion.div>
          <motion.div className="author-act" style={enhanced ? { opacity: problem } : undefined}>
            <h2>{hero.lines.notJust}</h2><p className="author-problem">{hero.lines.problemSolver}</p>
          </motion.div>
          <motion.div className="author-act" style={enhanced ? { opacity: promise } : undefined}>
            <h2>{hero.tagline}</h2>
          </motion.div>
        </div>
        <motion.figure className="author-portrait" style={enhanced ? { y: portraitY } : undefined}>
          <Image src="/images/febrate.png" alt="Felipe Braat" fill loading="eager" fetchPriority="high" sizes="(max-width: 1023px) 80vw, 36vw" />
          <figcaption>Felipe Braat · Febrate</figcaption>
        </motion.figure>
      </div>
      <div className="author-hero-bottom"><a className="author-cta" href="#projects-section">{hero.cta}<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a><span>{hero.scrollIndicator}</span></div>
    </div>
  </section>;
}
