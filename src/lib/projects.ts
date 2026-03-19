import { projectsConfig, type ProjectConfig } from "./projects.config";
import { buildScreenshotUrl } from "./screenshot";

const GH_API = "https://api.github.com";

interface GitHubRepo {
  name: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  html_url: string;
}

async function fetchGitHubRepo(repo: string): Promise<GitHubRepo | null> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`${GH_API}/repos/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export interface ProjectData extends Omit<ProjectConfig, "liveUrl" | "screenshotUrl"> {
  stars: number;
  language: string | null;
  topics: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  screenshotUrl: string | null;
  updatedAt: string | null;
}

export async function getProjects(): Promise<ProjectData[]> {
  const results = await Promise.all(
    projectsConfig.map(async (config) => {
      const ghData = config.repo ? await fetchGitHubRepo(config.repo) : null;
      const liveUrl = config.liveUrl ?? ghData?.homepage ?? null;
      const screenshotTarget = config.screenshotUrl ?? liveUrl;
      const screenshotUrl = screenshotTarget
        ? buildScreenshotUrl(screenshotTarget, { waitForTimeout: 5000 })
        : null;

      return {
        ...config,
        stars: ghData?.stargazers_count ?? 0,
        language: ghData?.language ?? null,
        topics: ghData?.topics ?? config.tags,
        githubUrl: ghData?.html_url ?? null,
        liveUrl,
        screenshotUrl,
        updatedAt: ghData?.updated_at ?? null,
      };
    }),
  );

  return results;
}
