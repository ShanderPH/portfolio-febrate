export type ProjectSize = "featured" | "wide" | "normal";
export type ProjectStatus = "live" | "internal" | "wip" | "archived";

export interface ProjectConfig {
  id: string;
  repo?: string;
  size: ProjectSize;
  status: ProjectStatus;
  liveUrl?: string;
  screenshotUrl?: string;
  tags: string[];
  accentColor?: string;
  featured?: boolean;
  staticData?: {
    year: string;
    highlights: string[];
  };
}

export const projectsConfig: ProjectConfig[] = [
  {
    id: "br-masters",
    repo: "ShanderPH/br-masters",
    size: "featured",
    status: "live",
    liveUrl: "https://brmasters.febrate.com/",
    tags: ["Next.js 16", "TypeScript", "HeroUI", "Tailwind CSS v4", "Supabase", "Framer Motion"],
    accentColor: "var(--earth-accent)",
    featured: true,
  },
  {
    id: "inchurch-knowledge",
    repo: "ShanderPH/inchurch-knowledge",
    size: "featured",
    status: "live",
    liveUrl: "https://centraldeajuda.inchurch.com.br/",
    screenshotUrl: "https://centraldeajuda.inchurch.com.br/",
    tags: ["Next.js 15", "HeroUI", "Tailwind CSS", "HubSpot API", "N8N", "TypeScript"],
    accentColor: "var(--sage)",
    featured: true,
  },
  {
    id: "helper-saas",
    repo: "ShanderPH/helper-saas",
    size: "featured",
    status: "live",
    liveUrl: "https://helper.febrate.com/",
    screenshotUrl: "https://helper.febrate.com/panel",
    tags: ["Turborepo", "Next.js 14", "Django Ninja", "PostgreSQL", "TypeScript", "JWT"],
    accentColor: "var(--earth-accent-light)",
    featured: true,
  },
  {
    id: "helper-cx",
    repo: "ShanderPH/helper-cx",
    size: "normal",
    status: "live",
    liveUrl: "https://helper-cx.febrate.com/",
    tags: ["Next.js 16", "React 19", "FastAPI", "HubSpot", "Jira", "Supabase"],
    accentColor: "var(--terracotta)",
  },
  {
    id: "natal-teixeira",
    repo: "ShanderPH/natal-teixeira",
    size: "normal",
    status: "live",
    liveUrl: "https://natal-teixeira.febrate.com/",
    tags: ["Next.js", "Supabase", "Framer Motion", "Design"],
    accentColor: "var(--sage-light)",
  },
  {
    id: "heimdall-agent",
    size: "normal",
    status: "internal",
    tags: ["Python", "NLP", "n8n", "LLM API", "Automation"],
    accentColor: "var(--amber)",
    staticData: {
      year: "2025",
      highlights: ["48% FRT", "350h/ano"],
    },
  },
];
