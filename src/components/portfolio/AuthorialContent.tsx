import Image from 'next/image';
import { ProjectArtwork } from '@/components/projects/ProjectArtwork';
import { BrandReveal } from '@/components/footer/BrandReveal';
import { SkillsSection } from '@/components/skills/SkillsSection';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { featuredProjectIds } from '@/lib/portfolio/featured-projects';
import type { dictionaries } from '@/lib/portfolio/dictionaries';
import type { ProjectData } from '@/lib/projects';

type Dictionary = (typeof dictionaries)['pt-BR'];
export function AuthorialContent({ dictionary, projects }: { dictionary: Dictionary; projects: ProjectData[] }) {
  const { home, common, projects: copy } = dictionary;
  return <>
    <section id="projects-section" tabIndex={-1} className="author-work author-section" aria-labelledby="author-work-title">
      <div className="author-section-heading"><p className="author-label">{copy.sectionLabel}</p><h2 id="author-work-title">{copy.title}</h2><p>{copy.subtitle}</p></div>
      <ProjectFilter labels={copy.filters} items={projects.flatMap(project => {
          const item = copy.items[project.id as keyof typeof copy.items];
          if (!item) return [];
          const featured = featuredProjectIds.some(id => id === project.id);
          return [{ id: project.id, category: project.category, content: <article className={`author-project author-project--${project.id}${featured ? ' author-project--selected' : ''}`} id={`work-${project.id}`} key={project.id}>
            {featured && <ProjectArtwork src={project.coverImage ?? null} title={item.title} fallback={copy.overview} />}
            <div className="author-project-copy"><p className="author-label">{project.tags.slice(0, 3).join(' · ')}</p><h3>{item.title}</h3><p>{item.description}</p>
              <div className="author-project-links">
                {project.liveUrl && project.status !== 'internal' && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{copy.viewProject}<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"><path d="M7 17 17 7H7m10 0v10"/></svg></a>}
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">{copy.viewCode}</a>}
                {project.status === 'internal' && <span>{copy.internalProject}</span>}
              </div>
              <details className="author-project-details"><summary>{copy.overview}</summary><p>{item.longDescription}</p><h4>{copy.stack}</h4><p>{item.stackDescription}</p></details>
            </div>
          </article> }];
        })} />
    </section>
    <section id="about-section" tabIndex={-1} className="author-about author-section" aria-labelledby="author-about-title">
      <figure><Image src="/images/febrate.png" alt="Felipe Braat" width={720} height={900} sizes="(max-width: 767px) 100vw, 40vw"/><figcaption>Felipe Braat · {common.footer.location}</figcaption></figure>
      <div><p className="author-label">{home.about.label}</p><h2 id="author-about-title">{home.about.firstName}<br/>{home.about.lastName}</h2>
        <p>{home.about.description}</p><a className="author-cta" href="https://www.linkedin.com/in/felipebraat" target="_blank" rel="noopener noreferrer">{home.about.cta}</a>
      </div>
    </section>
    <SkillsSection title={home.skills.title} subtitle={home.skills.subtitle} explore={home.skills.explore} closeLabel={copy.close} />
    <footer id="contact-section" tabIndex={-1} className="author-footer author-section">
      <div className="author-footer-intro"><h2>{common.cta.contactMe}</h2><p>{common.footer.tagline}</p><div className="author-project-links"><a href="https://www.linkedin.com/in/felipebraat" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/ShanderPH" target="_blank" rel="noopener noreferrer">GitHub</a></div></div>
      <BrandReveal label={common.nav.home} />
      <div className="author-colophon"><span>© {new Date().getFullYear()} Felipe Braat</span><span>{common.footer.location}</span><a href="#author-home">{common.nav.home}</a></div>
    </footer>
  </>;
}
