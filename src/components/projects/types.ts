export interface ProjectItemTranslation {
  title: string
  description: string
  longDescription: string
  stackDescription: string
}

export interface ProjectTranslations {
  sectionLabel: string
  title: string
  subtitle: string
  projectCount_one: string
  projectCount_other: string
  viewProject: string
  viewCode: string
  internalProject: string
  technologies: string
  results: string
  overview: string
  stack: string
  highlights: string
  close: string
  items: Record<string, ProjectItemTranslation>
}
