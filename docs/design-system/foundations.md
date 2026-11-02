# Foundations — Matéria em transformação

Matéria foi aprovada pelo usuário em 02/11/2026 e aplicada à homepage local. Arquivo/Atlas continuam alternativas de revisão em `/[locale]/concepts`.

`src/styles/tokens.css` é a fonte executável. Matéria usa Lexend Deca local (200/500/700), stone/café do legado, canvas `#eeeae2`, texto `#302b25`, secundário `#655d53`, interação `#834726`. Escuro: canvas `#201d19`, texto `#eeeae2`, interação `#e8b58d`. Arquivo e Atlas possuem paletas independentes, descritas no reference lock em `docs/modernization/directions.md`.

Tipo: corpo 14–17px, leitura 1.7; títulos responsivos com `clamp`, `text-wrap: balance` e tracking negativo; sem serif ou monospace ornamental. Espaço entre seções 72–160px, margens 22–88px. Não aplicar números decorativos a seções. O raio da navbar é um estado de movimento; imagens e projetos não herdam um raio universal de card.

Mídia: fotografia existente e capturas públicas versionadas com proveniência em `docs/modernization/media.md`. Dimensões reservadas antes do carregamento; sem browser-frame simulado. Falha da mídia conserva texto e links. Aprovação editorial e de direitos de publicação continua necessária.

Estados: link com área mínima de 44px; foco 2px com offset 5px; hover e foco equivalentes; `aria-current=location` acompanha seção real. Menu é disclosure HTML, sem modalidade nem bloqueio de scroll. Detalhes de cases são `<details>` e não precisam de JS.

Galerias: `/pt-BR/concepts` para direções; `/pt-BR/concepts/components` para Button/Card/Switch/Dropdown do HeroUI estável. Review disponível em desenvolvimento e, em produção local, somente com `FEBRATE_DESIGN_REVIEW=true`. Não habilitar essa variável em produção pública sem a revisão.
