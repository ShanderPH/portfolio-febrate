# Modernização Febrate — execução e revisão

Plano de origem: `PLANNING_FEBRATE_2026.md`, fornecido em 02/11/2026. O documento é uma especificação de trabalho; alegações sobre versões e segurança foram verificadas novamente no npm.

Resultado: Matéria aprovada e implementada localmente. [Evidências finais, testes e limites](quality.md).

## Baseline

- Checkout inicial: `ed1221fc082023b03fa4aad4cee01cc9c01e2bfa`, `main`, sem mudanças locais.
- Histórico autoral comparado: `13e44b3d2e679692e60c95048af071a43f23f769`.
- SHA256 do lock inicial: `938EAC5621BFD037ECEEFC6DB40B6937867972CD23E13106A5D7776CCF22ADCB`.
- Runtime local: Node 24.15.0, npm 11.12.1. Runtime remoto não inspecionado nem alterado.
- `npm ci`: passou; auditoria original: 16 vulnerabilidades (1 crítica, 11 altas, 3 moderadas, 1 baixa).
- Build original: passou. ESLint original: falhou em `PortfolioHome` por `setState` no effect de tema e mapa de categorias sem uso.
- Capturas da homepage original: [360px](baseline/360.png), [390px](baseline/390.png), [768px](baseline/768.png), [1024px](baseline/1024.png), [1440px](baseline/1440.png). Nenhum overflow horizontal observado nessas larguras.
- Capturas em servidor de desenvolvimento; não são baseline de Lighthouse, FPS, GPU ou Core Web Vitals. Esses indicadores não foram medidos antes da atualização. Nenhuma meta de desempenho é apresentada como resultado.

## Invariantes e ownership

| Área | Situação e decisão |
| --- | --- |
| Homepage | Matéria foi aprovada pelo usuário nesta conversa e promovida à homepage local. Composição no servidor; navegação, motion, filtros e mídia são ilhas interativas. O antigo `PortfolioHome`, sua copy genérica e CSS grafite foram removidos após aprovação. |
| Legado | Geometria da navbar e três atos foram recuperados após prototipação e aprovação. Marquee e nuvem histórica foram adaptados com fallback e controle de movimento. Componentes antigos não usados continuam disponíveis para referência. |
| Conteúdo | JSONs autorais PT/EN/ES são a fonte da homepage. Textos históricos restaurados, sem novas métricas; apenas controles de tema, filtros, exploração e pausa adicionados aos dicionários. |
| Projetos | `projects.config.ts` continua sendo o cadastro único. JPM preservado. Sem novos resultados, métricas ou atribuições. |
| Mídia | Retrato existente e três capas públicas versionadas. Falhas deixam título, descrição e links operáveis. Publicação de casos e métricas precisa de revisão editorial. |
| Navegação | URLs reais; idioma preserva query/hash; cookie deve pertencer à allowlist; idioma desconhecido não gera HTML com locale inválido. |
| Movimento | Motion controla morph e narrativa. CSS controla hover/foco. Sem Lenis/GSAP concorrendo por propriedades na composição aprovada. Shader decorativo, opcional e isolado. |
| SSR | Conteúdo essencial, detalhes e links presentes no HTML; nenhum preloader bloqueia navegação. |

## Gates

1. Fundação técnica: instalação reproduzível, auditoria, lint, TypeScript, unitários, build e E2E.
2. Direção: concluído. O usuário escolheu explicitamente “Matéria em transformação” e autorizou substituir a homepage local nesta conversa em 02/11/2026. Arquivo/Atlas continuam isolados para histórico de revisão.
3. Conteúdo: autorizar 2–3 cases, fotografia e evidência de métricas antes de promover o conteúdo editorial completo.
4. Lançamento: preview hospedado, dispositivo intermediário real, revisão editorial e aprovação de publicação. Nenhum deploy é realizado por esta entrega.

## Executar

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
npm run start
```

O E2E inicia um servidor de produção a partir do build. Na máquina local, pode reutilizar um servidor já aberto. Relatórios e screenshots de teste ficam em `playwright-report` e `test-results` (ignorados pelo Git). O pipeline mantém artefatos por 14 dias.

Para revisão local em produção: definir `FEBRATE_DESIGN_REVIEW=true` antes de `npm run start`. O Playwright define a variável apenas no servidor que inicia. Em `npm run dev`, as rotas de revisão já são habilitadas. Em produção sem opt-in, retornam 404. O guia de atualização está em [security.md](security.md), as propostas em [directions.md](directions.md), e a proveniência em [media.md](media.md).

Rollback: voltar ao commit anterior da mudança e executar `npm ci && npm run build`; o commit inicial está registrado acima. A homepage não depende das rotas de revisão nem de `FEBRATE_DESIGN_REVIEW`. Publicação e rollback de deploy exigem o fluxo do ambiente remoto, que não foi alterado.
