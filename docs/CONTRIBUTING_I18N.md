# i18n Rules for New Components

This document outlines the internationalization (i18n) patterns and rules for the Febrate Portfolio project.

## Supported Languages

- **pt-BR** (Brazilian Portuguese) - Default
- **en** (English)
- **es** (Spanish)

## Available Namespaces

| Namespace | Purpose |
|-----------|---------|
| `common` | Shared translations (nav, footer, CTAs, accessibility) |
| `home` | Home page content |
| `about` | About page content |
| `projects` | Projects page content |
| `contact` | Contact page content |

---

## Server Components

1. Import `serverSideTranslation` from `@/lib/i18n`
2. Get locale from params: `const { locale } = await params`
3. Load translations: `const { t } = await serverSideTranslation(locale, ['namespace'])`
4. Use `t('key')` for translations

### Example

```tsx
import { serverSideTranslation, type Locale } from '@/lib/i18n'

export default async function MyComponent({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const { t } = await serverSideTranslation(locale, ['common'])

  return <h1>{t('nav.home')}</h1>
}
```

### Using Multiple Namespaces

```tsx
const { t } = await serverSideTranslation(locale, ['common', 'home'])

// Access keys from different namespaces
t('nav.home')           // from 'common' (default)
t('home:hero.greeting') // from 'home' namespace
```

---

## Client Components

1. Must be wrapped in `I18nProvider` (usually done in layout)
2. Import `useT` from `@/lib/i18n/client`
3. Use the hook: `const { t } = useT('namespace')`

### Example

```tsx
'use client'

import { useT } from '@/lib/i18n/client'

export default function MyClientComponent() {
  const { t } = useT('common')

  return <button>{t('cta.contactMe')}</button>
}
```

### Using Multiple Namespaces in Client

```tsx
'use client'

import { useT } from '@/lib/i18n/client'

export default function MyClientComponent() {
  const { t } = useT(['common', 'home'])

  return (
    <div>
      <h1>{t('home:hero.greeting')}</h1>
      <button>{t('cta.viewProjects')}</button>
    </div>
  )
}
```

---

## Adding New Translation Keys

1. **ALWAYS add to ALL 3 language files** (pt-BR, en, es)
2. Use nested keys for organization: `section.subsection.key`
3. Keep keys in English, values in target language
4. Update TypeScript types if adding new namespace

### File Locations

```
src/lib/i18n/translations/
├── pt-BR/
│   ├── common.json
│   ├── home.json
│   ├── about.json
│   ├── projects.json
│   └── contact.json
├── en/
│   └── [same structure]
└── es/
    └── [same structure]
```

---

## Creating New Namespaces

1. Create JSON file in all 3 locale folders
2. Update `@types/i18next.d.ts` with new namespace type:

```typescript
// src/@types/i18next.d.ts
import 'i18next'
import type newNamespacePtBR from '@/lib/i18n/translations/pt-BR/newNamespace.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      // ... existing namespaces
      newNamespace: typeof newNamespacePtBR
    }
  }
}
```

3. Document namespace purpose in this file

---

## Naming Conventions

- **Namespaces**: lowercase, page/feature name (`home`, `about`, `projects`)
- **Keys**: camelCase, descriptive (`heroTitle`, `submitButton`)
- **Nested max 3 levels**: `section.subsection.key`

### Good Examples

```json
{
  "hero": {
    "greeting": "Hello",
    "tagline": "Welcome to my portfolio"
  },
  "cta": {
    "viewProjects": "View Projects",
    "contactMe": "Contact Me"
  }
}
```

### Bad Examples

```json
{
  "hero_greeting": "Hello",           // Use nesting instead
  "hero.greeting.text.main": "Hello", // Too deeply nested
  "GREETING": "Hello"                 // Use camelCase
}
```

---

## Layout Integration

The `[locale]/layout.tsx` handles:

- Setting `lang` attribute on `<html>` tag
- Setting `dir` attribute (ltr for all supported languages)
- Wrapping children with `I18nProvider`
- Loading initial namespaces

### Adding Namespaces to Layout

If your page needs additional namespaces, load them in the page component:

```tsx
// In your page component
const { t, resources } = await serverSideTranslation(locale, ['common', 'home', 'newNamespace'])
```

---

## LocaleSwitcher Component

The `LocaleSwitcher` component is available at `@/components/i18n/LocaleSwitcher`:

```tsx
import { LocaleSwitcher } from '@/components/i18n/LocaleSwitcher'

// In your header/nav
<LocaleSwitcher />
```

Features:
- Displays current language with flag
- Dropdown with all available languages
- Updates cookie and redirects to new locale path
- Preserves current page path

---

## Middleware Behavior

The middleware (`src/middleware.ts`) handles:

1. **URL Detection**: Checks if URL has locale prefix
2. **Cookie Detection**: Reads `NEXT_LOCALE` cookie
3. **Accept-Language**: Falls back to browser preference
4. **Default**: Uses `pt-BR` as fallback

### Excluded Paths

The middleware excludes:
- `/api/*`
- `/_next/*`
- Static files (images, fonts, etc.)

---

## Testing Checklist

After adding translations, verify:

- [ ] Visiting `/` redirects to `/pt-BR`
- [ ] Visiting `/en` shows English content
- [ ] Visiting `/es` shows Spanish content
- [ ] Language switcher updates URL and content
- [ ] Cookie persists language preference
- [ ] Server components render translated content
- [ ] Client components render translated content
- [ ] No hydration errors occur

---

## Common Mistakes to Avoid

1. **Hardcoded strings**: All user-visible text must use translations
2. **Missing translations**: Always add keys to ALL 3 language files
3. **Wrong namespace**: Ensure you're loading the correct namespace
4. **Client component without provider**: Client components must be wrapped in `I18nProvider`
5. **Forgetting to await params**: In Next.js 15+, params is a Promise

---

## TypeScript Support

The project includes type definitions for autocomplete support. After adding new namespaces or keys, TypeScript will provide autocomplete for translation keys.

**Note**: When using namespace prefix syntax (`home:key`), TypeScript may show warnings. These are type-level only and don't affect runtime behavior.
