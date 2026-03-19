"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@heroui/react";

type Theme = "light" | "dark" | "system";

const emptySubscribe = () => () => {};

export function ThemeSwitcher() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  
  const [theme, setTheme] = useState<Theme>("system");

  // Sync theme from localStorage after mount - uses flushSync pattern to avoid cascading renders
  useEffect(() => {
    if (!mounted) return;
    
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      // Using requestAnimationFrame to defer state update outside of effect body
      requestAnimationFrame(() => {
        setTheme(stored);
      });
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
      root.setAttribute("data-theme", systemTheme);
      root.style.colorScheme = systemTheme;
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      root.setAttribute("data-theme", theme);
      root.style.colorScheme = theme;
    }
    
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
        root.setAttribute("data-theme", systemTheme);
        root.style.colorScheme = systemTheme;
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev: Theme) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const getIcon = () => {
    if (!mounted) {
      return (
        <svg
          className="size-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    }

    if (theme === "light") {
      return (
        <svg
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    }

    if (theme === "dark") {
      return (
        <svg
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );
    }

    return (
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  };

  const getLabel = () => {
    if (theme === "light") return "Light";
    if (theme === "dark") return "Dark";
    return "System";
  };

  return (
    <Button
      variant="secondary"
      onPress={toggleTheme}
      className="gap-2 transition-all duration-300 ease-out-quart"
      aria-label={`Current theme: ${getLabel()}. Click to toggle.`}
    >
      <span className="transition-transform duration-300 ease-out-quart">
        {getIcon()}
      </span>
      <span className="hidden sm:inline">{getLabel()}</span>
    </Button>
  );
}
