import { SkillExperience } from './SkillExperience';
import { portfolioSkills } from '@/lib/portfolio/skills';

export function SkillsSection({ title, subtitle, explore, closeLabel }: {
  title: string; subtitle: string; explore: string; closeLabel: string;
}) {
  return <section className="author-skills-section author-section" id="skills-section" aria-labelledby="author-skills-title">
    <div className="author-section-heading"><p className="author-label">{title}</p><h2 id="author-skills-title">{subtitle}</h2></div>
    <ul className="author-skills">{portfolioSkills.map(skill => <li key={skill.slug}>{skill.name}</li>)}</ul>
    <SkillExperience explore={explore} closeLabel={closeLabel}/>
  </section>;
}
