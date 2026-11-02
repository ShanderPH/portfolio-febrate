'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/settings';
import type { ProjectData } from '@/lib/projects';
import type { ProjectTranslations } from '@/components/projects/types';
import { portfolioCopy } from './portfolio-copy';

type Category = 'all' | 'product' | 'platform' | 'automation';
type SiteTheme = 'dark' | 'light';
const categories: Category[] = ['all', 'product', 'platform', 'automation'];

const projectCategories: Record<string, Exclude<Category, 'all'>> = {
  jpm: 'platform',
  'br-masters': 'product',
  'inchurch-knowledge': 'platform',
  'helper-saas': 'product',
  'helper-cx': 'platform',
  'natal-teixeira': 'product',
  'heimdall-agent': 'automation',
};

const social = {
  linkedin: 'https://www.linkedin.com/in/felipebraat',
  github: 'https://github.com/ShanderPH',
};

function ArrowIcon({ external = false }: { external?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
      {external ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.42, delay, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProjectPreview({ project, title }: { project: ProjectData; title: string }) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(project.screenshotUrl) && !failed;

  return (
    <div className={'portfolio-project-media' + (!hasImage ? ' portfolio-project-media--abstract' : '')}>
      <div className="portfolio-project-browser" aria-hidden="true">
        <span /><span /><span />
        <span className="portfolio-project-browser-label">{project.liveUrl ? new URL(project.liveUrl).hostname : 'project / internal'}</span>
      </div>
      {hasImage ? (
        <Image
          src={project.screenshotUrl!}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 560px"
          className="portfolio-project-image"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="portfolio-project-fallback" aria-hidden="true">
          <span className="portfolio-project-fallback-symbol">{project.id === 'jpm' ? 'JPM.' : project.id === 'br-masters' ? 'BR /' : '///'}</span>
          <span>{project.tags.slice(0, 2).join('  /  ')}</span>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index, labels, lang }: { project: ProjectData; index: number; labels: ProjectTranslations; lang: Locale }) {
  const c = portfolioCopy[lang];
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const item = labels.items[project.id];
  const title = item?.title || project.id;
  const internal = project.status === 'internal';

  return (
    <article className={'portfolio-project-card' + (project.featured ? ' portfolio-project-card--featured' : '')}>
      <ProjectPreview project={project} title={title} />
      <div className="portfolio-project-body">
        <div className="portfolio-project-meta">
          <span>{String(index + 1).padStart(2, '0')} / {c.work.filters[categories.indexOf(project.category)]}</span>
          <span className={'portfolio-project-status' + (internal ? ' portfolio-project-status--internal' : '')}>
            <span aria-hidden="true" className="portfolio-dot" /> {internal ? c.work.internal : c.work.liveStatus}
          </span>
        </div>
        <h3>{title}</h3>
        <p className="portfolio-project-description">{item?.description}</p>
        <div className="portfolio-project-tags">
          {project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <div className="portfolio-project-actions">
          {project.liveUrl && !internal && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {c.work.live}<ArrowIcon external />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="portfolio-project-secondary">
              {c.work.code}<ArrowIcon external />
            </a>
          )}
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={`portfolio-details-${project.id}`}
            onClick={() => setExpanded(prev => !prev)}
          >
            {expanded ? c.work.showLess : c.work.showMore}
            <span className={expanded ? 'portfolio-chevron portfolio-chevron--up' : 'portfolio-chevron'} aria-hidden="true">⌄</span>
          </button>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={`portfolio-details-${project.id}`}
              className="portfolio-project-details"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.24 }}
            >
              <h4>{c.work.detail}</h4>
              <p>{item?.longDescription}</p>
              <h4>{c.work.technical}</h4>
              <p>{item?.stackDescription}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

interface PortfolioHomeProps {
  locale: Locale;
  projects: ProjectData[];
  translations: ProjectTranslations;
}

export function PortfolioHome({ locale, projects, translations }: PortfolioHomeProps) {
  const c = portfolioCopy[locale];
  const reduced = useReducedMotion();
  const [theme, setTheme] = useState<SiteTheme>('dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<Category>('all');

  useEffect(() => {
    const saved = window.localStorage.getItem('febrate-portfolio-theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  const toggleTheme = () => {
    setTheme(current => {
      const next = current === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem('febrate-portfolio-theme', next);
      return next;
    });
  };

  const nav = [
    { label: c.nav.work, href: '#projects-section' },
    { label: c.nav.expertise, href: '#expertise-section' },
    { label: c.nav.about, href: '#about-section' },
    { label: c.nav.contact, href: '#contact-section' },
  ];
  const visibleProjects = projects.filter(p => category === 'all' || p.category === category);

  return (
    <div className="portfolio-site" data-theme={theme}>
      <a href="#portfolio-main" className="portfolio-skip">{c.skip}</a>
      <header className="portfolio-header">
        <div className="portfolio-header-inner">
          <a className="portfolio-brand" href="#portfolio-main" aria-label="Felipe Braat — home">
            <span className="portfolio-brand-mark">f<span>.</span>b</span>
            <span className="portfolio-brand-divider" aria-hidden="true" />
            <span className="portfolio-brand-copy">FELIPE BRAAT<br /><small>SOFTWARE ENGINEER</small></span>
          </a>
          <nav className="portfolio-desktop-nav" aria-label="Main navigation">
            {nav.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="portfolio-header-actions">
            <div className="portfolio-language-picker" role="group" aria-label={c.languages}>
              {(['pt-BR', 'en', 'es'] as const).map(l => (
                <a
                  key={l}
                  href={`/${l}`}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? 'page' : undefined}
                  className={l === locale ? 'is-current' : ''}
                >{l === 'pt-BR' ? 'PT' : l.toUpperCase()}</a>
              ))}
            </div>
            <button className="portfolio-theme-toggle" type="button" onClick={toggleTheme} aria-label={c.theme} title={c.theme}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                {theme === 'dark' ? <path d="M20.3 15.3A8.8 8.8 0 0 1 8.7 3.7 8.8 8.8 0 1 0 20.3 15.3Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.5 1.5m11.2 11.2 1.5 1.5M2 12h2m16 0h2M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5" /></>}
              </svg>
            </button>
            <button
              className="portfolio-mobile-toggle"
              type="button"
              aria-controls="portfolio-mobile-nav"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? c.closeMenu : c.menu}
              onClick={() => setMobileOpen(v => !v)}
            >
              <span /> <span />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              id="portfolio-mobile-nav"
              className="portfolio-mobile-nav"
              aria-label="Mobile navigation"
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {nav.map(item => <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}<ArrowIcon /></a>)}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <div id="portfolio-main">
        <section className="portfolio-hero" aria-labelledby="portfolio-hero-title">
          <div className="portfolio-container portfolio-hero-grid">
            <div className="portfolio-hero-content">
              <Reveal className="portfolio-eyebrow"><span className="portfolio-dot" />{c.available}</Reveal>
              <Reveal delay={0.04}><p className="portfolio-overline">{c.eyebrow}</p></Reveal>
              <Reveal delay={0.09}><h1 id="portfolio-hero-title">{c.headline}</h1></Reveal>
              <Reveal delay={0.13}><p className="portfolio-hero-lead">{c.intro}</p></Reveal>
              <Reveal delay={0.17} className="portfolio-hero-actions">
                <a className="portfolio-button portfolio-button-primary" href="#projects-section">{c.explore}<ArrowIcon /></a>
                <a className="portfolio-button portfolio-button-ghost" href="#contact-section">{c.connect}<ArrowIcon external /></a>
              </Reveal>
              <div className="portfolio-hero-bottom"><span className="portfolio-small-cross" aria-hidden="true">+</span>{c.scroll}<span className="portfolio-hero-index">ENGINEERING / DIGITAL PRODUCTS</span></div>
            </div>
            <Reveal delay={0.16} className="portfolio-hero-visual">
              <div className="portfolio-diagram">
                <div className="portfolio-diagram-top"><span className="portfolio-diagram-mark">/ SYSTEM MAP</span><span className="portfolio-diagram-indicator"><span className="portfolio-dot" />{c.terminal.status}</span></div>
                <div className="portfolio-diagram-title">{c.terminal.label}</div>
                <div className="portfolio-diagram-flow">
                  {[c.terminal.step1, c.terminal.step2, c.terminal.step3].map((step, i) => (
                    <div key={step} className="portfolio-diagram-node">
                      <div className="portfolio-diagram-node-head"><span>0{i + 1}</span><span className="portfolio-diagram-node-icon">↗</span></div>
                      <strong>{step}</strong>
                      <span className="portfolio-diagram-connector" aria-hidden="true" />
                    </div>
                  ))}
                  <div className="portfolio-diagram-output"><span className="portfolio-dot" /><strong>{c.terminal.outcome}</strong><span>✓</span></div>
                </div>
                <p className="portfolio-diagram-foot">{c.terminal.description}</p>
              </div>
              <div className="portfolio-diagram-caption">ENGINEERING / INTEGRATION / AUTOMATION <span>001—003</span></div>
            </Reveal>
          </div>
        </section>

        <section className="portfolio-work portfolio-section" id="projects-section" aria-labelledby="portfolio-work-title">
          <div className="portfolio-container">
            <Reveal className="portfolio-section-intro">
              <div><p className="portfolio-section-kicker">{c.work.eyebrow}</p><h2 id="portfolio-work-title">{c.work.title}</h2></div>
              <p>{c.work.intro}</p>
            </Reveal>
            <div className="portfolio-filters" role="group" aria-label={c.work.eyebrow}>
              {categories.map((cat, index) => (
                <button
                  key={cat}
                  type="button"
                  className={category === cat ? 'is-active' : ''}
                  aria-pressed={category === cat}
                  onClick={() => setCategory(cat)}
                >{c.work.filters[index]}</button>
              ))}
              <span className="portfolio-result-count">{String(visibleProjects.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            </div>
            {visibleProjects.length ? (
              <div className="portfolio-project-grid">
                {visibleProjects.map((project, index) => (
                  <Reveal key={project.id} className="portfolio-project-item" delay={Math.min(index * 0.045, 0.15)}>
                    <ProjectCard project={project} index={index} labels={translations} lang={locale} />
                  </Reveal>
                ))}
              </div>
            ) : <p className="portfolio-empty">{c.work.noResults}</p>}
          </div>
        </section>

        <section className="portfolio-expertise portfolio-section" id="expertise-section" aria-labelledby="portfolio-expertise-title">
          <div className="portfolio-container">
            <Reveal className="portfolio-section-intro">
              <div><p className="portfolio-section-kicker">{c.expertise.eyebrow}</p><h2 id="portfolio-expertise-title">{c.expertise.title}</h2></div>
              <p>{c.expertise.intro}</p>
            </Reveal>
            <div className="portfolio-expertise-grid">
              {c.expertise.cards.map((card, index) => (
                <Reveal className="portfolio-expertise-item" key={card.number} delay={index * 0.055}>
                  <article className="portfolio-expertise-card">
                    <span className="portfolio-expertise-number">{card.number} / 03</span>
                    <div className="portfolio-expertise-symbol" aria-hidden="true">{index === 0 ? '◫' : index === 1 ? '⌘' : '◇'}</div>
                    <h3>{card.title}</h3><p>{card.description}</p>
                    <span className="portfolio-expertise-tech">{card.stack}</span>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="portfolio-toolkit">
              <span>{c.expertise.stackLabel}</span>
              <div>{c.expertise.stack.map(tool => <span key={tool}>{tool}</span>)}</div>
            </Reveal>
          </div>
        </section>

        <section className="portfolio-about portfolio-section" id="about-section" aria-labelledby="portfolio-about-title">
          <div className="portfolio-container portfolio-about-grid">
            <Reveal className="portfolio-about-image-wrapper"><div className="portfolio-about-image"><Image src="/images/febrate.png" alt={c.about.profileAlt} fill sizes="(max-width: 800px) 100vw, 430px" className="portfolio-portrait" /></div><span className="portfolio-portrait-caption">FELIPE BRAAT / SOFTWARE ENGINEER</span></Reveal>
            <div className="portfolio-about-copy">
              <Reveal><p className="portfolio-section-kicker">{c.about.eyebrow}</p><h2 id="portfolio-about-title">{c.about.title}</h2></Reveal>
              <Reveal delay={0.05}><p>{c.about.description}</p><p>{c.about.complement}</p></Reveal>
              <Reveal delay={0.1} className="portfolio-stats">{c.about.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</Reveal>
            </div>
          </div>
        </section>

        <footer className="portfolio-contact portfolio-section" id="contact-section">
          <div className="portfolio-container">
            <Reveal><p className="portfolio-section-kicker">{c.contact.eyebrow}</p><h2>{c.contact.title}</h2><p className="portfolio-contact-lead">{c.contact.intro}</p></Reveal>
            <Reveal delay={0.08} className="portfolio-contact-actions">
              <a className="portfolio-button portfolio-button-primary" href={social.linkedin} target="_blank" rel="noopener noreferrer">{c.contact.linkedin}<ArrowIcon external /></a>
              <a className="portfolio-button portfolio-button-ghost" href={social.github} target="_blank" rel="noopener noreferrer">{c.contact.github}<ArrowIcon external /></a>
            </Reveal>
            <div className="portfolio-footer-bottom">
              <span>© {new Date().getFullYear()} FELIPE BRAAT</span>
              <span>{c.contact.footer}</span>
              <a href="#portfolio-main">{c.contact.back} ↑</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
