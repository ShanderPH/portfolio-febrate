'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { LocaleLink } from '@/components/i18n/LocaleLink';
import { languages, type Locale } from '@/lib/i18n/settings';
import { motionTokens } from '@/lib/portfolio/motion';

export function AuthorialNavbar({ locale, path, labels }: {
  locale: Locale; path: string;
  labels: { home: string; about: string; projects: string; contact: string; open: string; skip: string };
}) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  // Restore the original geometry; Motion alone owns these properties.
  const width = useTransform(scrollY, [0, motionTokens.headerDistance], ['100%', '56rem']);
  const radius = useTransform(scrollY, [0, motionTokens.headerDistance], [0, 48]);
  const top = useTransform(scrollY, [0, motionTokens.headerDistance], [0, 16]);
  const padding = useTransform(scrollY, [0, motionTokens.headerDistance], [24, 12]);
  const menu = useRef<HTMLDetailsElement>(null);
  const [active, setActive] = useState('author-home');
  const links = [
    { id: 'author-home', label: labels.home },
    { id: 'projects-section', label: labels.projects },
    { id: 'about-section', label: labels.about },
    { id: 'contact-section', label: labels.contact },
  ];

  useEffect(() => {
    const ids = ['author-home', 'projects-section', 'about-section', 'contact-section'];
    const elements = ids.map(id => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const anchor = () => Math.min(110, Math.max(0, window.innerHeight - 1));
    const updateActive = () => {
      let current: string | undefined = elements[0]?.id;
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= anchor() + 1) current = element.id;
      }
      if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight) {
        current = elements.at(-1)?.id;
      }
      if (current) setActive(current);
    };
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      // Observe a one-pixel line below the header, including section exits.
      observer = new IntersectionObserver(updateActive, {
        rootMargin: `-${anchor()}px 0px -${Math.max(0, window.innerHeight - anchor() - 1)}px 0px`,
        threshold: 0,
      });
      elements.forEach(element => observer.observe(element));
      updateActive();
    };
    // Short footers may never reach that line, even at the end of the page.
    const footerObserver = new IntersectionObserver(updateActive, { threshold: [0, 1] });
    const footer = elements.at(-1);
    if (footer) footerObserver.observe(footer);
    observe();
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector('summary')?.focus();
      }
    };
    const media = matchMedia('(min-width: 1024px)');
    const closeOnResize = () => { if (media.matches && menu.current) menu.current.open = false; };
    window.addEventListener('keydown', escape);
    window.addEventListener('resize', observe);
    media.addEventListener('change', closeOnResize);
    return () => { observer.disconnect(); footerObserver.disconnect(); window.removeEventListener('keydown', escape); window.removeEventListener('resize', observe); media.removeEventListener('change', closeOnResize); };
  }, []);

  const navLinks = links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? 'location' : undefined}
    onClick={() => {
      if (menu.current) menu.current.open = false;
      document.getElementById(link.id)?.focus({ preventScroll: true });
    }}>{link.label}</a>);
  return <>
    <a className="author-skip" href="#author-home">{labels.skip}</a>
    <header className="author-header">
      <motion.div className="author-nav" style={reduced ? undefined : { maxWidth: width, borderRadius: radius, marginTop: top, paddingBlock: padding }}>
        <a className="author-wordmark" href={`/${locale}`} aria-label="Febrate">febrate<span aria-hidden="true">.</span></a>
        <nav className="author-desktop-nav" aria-label={labels.open}>{navLinks}</nav>
        <div className="author-languages" aria-label="Idioma / Language">
          {languages.map(language => <LocaleLink key={language} locale={language} current={locale} path={path} />)}
        </div>
        <details className="author-menu" ref={menu}>
          <summary aria-label={labels.open}><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M4 8h16M4 16h16"/></svg></summary>
          <nav aria-label={labels.open}>{navLinks}</nav>
        </details>
      </motion.div>
    </header>
  </>;
}
