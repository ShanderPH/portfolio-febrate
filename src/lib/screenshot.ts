const MICROLINK_BASE = "https://api.microlink.io";

export function buildScreenshotUrl(
  url: string,
  options?: { waitForTimeout?: number },
): string {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
  });

  if (options?.waitForTimeout) {
    params.set("screenshot.waitForTimeout", String(options.waitForTimeout));
  }

  return `${MICROLINK_BASE}?${params}`;
}

export async function getProjectScreenshot(
  url: string,
): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      url,
      screenshot: "true",
      meta: "false",
    });

    const res = await fetch(`${MICROLINK_BASE}?${params}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data?.screenshot?.url ?? null;
  } catch {
    return null;
  }
}
