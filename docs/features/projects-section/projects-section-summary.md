# Projects Section - Bento Grid

## Overview
Seção de projetos do portfólio com layout Bento Grid dinâmico, thumbnails via Microlink API e dados reais do GitHub.

## Architecture

### Data Flow
1. **`lib/projects.config.ts`** — Configuração estática dos projetos (tamanho, status, tags, override de dados)
2. **`lib/screenshot.ts`** — Integração com Microlink API para capturas de tela automáticas
3. **`lib/projects.ts`** — Server-side data fetching: combina dados GitHub API + Microlink + config local
4. **`components/projects/ProjectsSection.tsx`** — Server Component que busca dados e renderiza a seção
5. **`components/projects/BentoGrid.tsx`** — Client Component com grid e cards inline, responsividade e animações

### Grid Layout (Desktop - 3 colunas)
| Projeto | Tamanho | Grid Span |
|---|---|---|
| BR Masters | featured | col-span-2, row-span-2 |
| InChurch Knowledge | tall | col-span-1, row-span-2 |
| Heimdall Agent | normal | col-span-1, row-span-1 |
| Helper SaaS | wide | col-span-2, row-span-1 |
| Helper CX | normal | col-span-1, row-span-1 |
| Natal Teixeira | normal | col-span-1, row-span-1 |

### Responsividade
- **Mobile (< 640px)**: 1 coluna, todos os cards como `normal`
- **Tablet (640px–1024px)**: Grid adapta via CSS
- **Desktop (> 1024px)**: Layout Bento completo com 3 colunas

### Filtros
- Todos / Em produção / Internos / Em progresso

## Dependencies Added
- Nenhuma dependência nova (usa HeroUI + Framer Motion já existentes)

## Environment Variables
- `GITHUB_TOKEN` — Token do GitHub para API (opcional, aumenta rate limit)
- `MICROLINK_API_KEY` — Chave da Microlink API (opcional, funciona sem até 50 req/dia)

## Image Domains (next.config.ts)
- `*.microlink.io`
- `api.microlink.io`
- `opengraph.githubassets.com`
- `raw.githubusercontent.com`

## Files Created
- `src/lib/projects.config.ts`
- `src/lib/screenshot.ts`
- `src/lib/projects.ts`
- `src/components/projects/index.ts`
- `src/components/projects/ProjectsSection.tsx`
- `src/components/projects/BentoGrid.tsx`

## Files Modified
- `src/app/[locale]/page.tsx` — Adicionado `<ProjectsSection />`
- `src/app/globals.css` — Adicionada animação `fade-in-up`
- `next.config.ts` — Adicionados `images.remotePatterns`
- `.env.local` / `.env.example` — Criados com variáveis de ambiente
