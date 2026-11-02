import { HeroNarrative } from '@/components/hero/HeroNarrative';
import { HeroMarquee } from '@/components/hero/HeroMarquee';
import type { dictionaries } from '@/lib/portfolio/dictionaries';
import type { ProjectData } from '@/lib/projects';
import { featuredProjectIds } from '@/lib/portfolio/featured-projects';

type Dictionary = (typeof dictionaries)['pt-BR'];
export function ConceptHero({ concept, dictionary, projects }: { concept: string; dictionary: Dictionary; projects: ProjectData[] }) {
  const { hero } = dictionary.home;
  if (concept === 'matter') return <><HeroNarrative hero={hero} /><HeroMarquee items={hero.marqueeItems} pauseLabel={hero.pause} resumeLabel={hero.resume} /></>;
  return <section id="author-home" tabIndex={-1} className={`author-concept-hero author-concept-hero--${concept}`}>
    <div className="author-concept-intro"><p className="author-label">Felipe Braat · Febrate</p><h1>{hero.lines.intro}</h1>
      <p className="author-concept-statement">{hero.lines.notJust}<br/>{hero.lines.problemSolver}</p>
      <a className="author-cta" href="#projects-section">{hero.cta}<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
    </div>
    <nav className={concept === 'atlas' ? 'author-atlas' : 'author-archive-index'} aria-label={dictionary.projects.title}>
      {projects.filter(project => featuredProjectIds.some(id => id === project.id)).map(project => <a href={`#work-${project.id}`} key={project.id}>
        <span>{dictionary.projects.items[project.id as keyof typeof dictionary.projects.items]?.title ?? project.id}</span>
        <small>{project.tags.slice(0, 2).join(' · ')}</small>
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 17 17 7H7m10 0v10"/></svg>
      </a>)}
    </nav>
  </section>;
}
