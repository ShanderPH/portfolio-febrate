# Copy e decisões editoriais

Direção aprovada pelo usuário nesta conversa em 02/11/2026: Matéria em transformação, para a homepage local. Nenhuma publicação foi autorizada ou realizada.

## Fonte única

`src/lib/i18n/translations/{pt-BR,en,es}/{home,common,projects}.json` volta a ser a fonte de texto da homepage. `portfolio-copy.ts` foi retirado após o gate, junto com o shell e o CSS grafite. Não se criou um segundo texto autoral.

## Textos preservados

- Intro “Olá, eu sou Felipe Braat.” e equivalentes EN/ES.
- “Não apenas um Engenheiro de Software.” / “Mas um solucionador de problemas.” e equivalentes.
- Tagline “Transformando ideias em soluções digitais elegantes e funcionais”.
- Bio original de `home.about.description`, CTA, descrições e detalhes de todos os sete projetos.
- Termos e nomes da nuvem original (20 tecnologias), curadoria de projetos e JPM.

## Adições de interface, nas três línguas

| Chave | PT | EN | ES |
| --- | --- | --- | --- |
| `common.theme.toggle` | Alternar tema | Toggle theme | Cambiar tema |
| `home.skills.explore` | Explorar tecnologias | Explore technologies | Explorar tecnologías |
| `home.hero.pause` | Pausar animação | Pause animation | Pausar animación |
| `home.hero.resume` | Retomar animação | Resume animation | Reanudar animación |
| `projects.filters` | Todos / Produtos / Plataformas / Automação | All / Products / Platforms / Automation | Todos / Productos / Plataformas / Automatización |

Essas mudanças são controles funcionais, sem nova alegação de resultado. A galeria de direção é uma ferramenta interna de revisão em português; os três portfólios completos reutilizam os dicionários locais.

## Pendências de publicação

Os números de FRT, horas anuais e experiência já existiam na copy e foram conservados, não auditados como novos resultados. Validar documentação, período, autorização e contribuição individual antes da publicação. Não foram acrescentados CSAT, métricas de performance, depoimentos, cargos, cases privados, screenshots autenticados ou novos resultados. A estatística de CSAT hardcoded no antigo About não foi reintroduzida no novo layout.
