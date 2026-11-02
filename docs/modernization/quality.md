# Evidências de qualidade — 02/11/2026

Escopo: implementação local de Matéria em transformação, aprovada pelo usuário. Estas evidências foram obtidas antes da abertura do PR e não descrevem o site público ou um preview hospedado. Os checks remotos devem ser conferidos na aba Checks do PR.

## Gates executados

| Check | Resultado |
| --- | --- |
| `npm ci` | Lock reproduzível em Node 24.15.0 / npm 11.12.1 |
| `npm run check` | Lint sem warnings, typegen/TypeScript, 11 testes unitários e build passaram |
| `npm run test:e2e` | 35 cenários passaram no Chromium, suíte final em 41,0s |
| `npm audit --omit=dev` | Zero vulnerabilidades |
| Auditoria completa | Zero altas/críticas; 16 alertas moderados da mesma causa em minimatch/ESLint, analisados em `security.md` |
| `git diff --check` | Passou; avisos de normalização LF/CRLF não são whitespace errors |

A suíte cobre PT/EN/ES, canonical/hreflang, filtros e detalhes, fallback de metadados, privacidade de repositórios, menu/Escape/foco, toque/resize, persistência de tema, troca de idioma com query/hash/back, ausência de JavaScript, movimento reduzido, falha de imagem/WebGL/serviço de ícones, pausa de marquee, skills com seleção e teclado, e migração HeroUI estável. Capturas em 360/390/768/1024/1440px sem overflow horizontal observado. Axe verificou as três direções nos dois temas, incluindo Matéria com skills abertas e tecnologia selecionada.

A revisão de preparação do PR reproduziu um indicador de navegação desatualizado ao voltar de Contato para Skills. A correção usa a posição das seções numa linha abaixo do header e trata footers curtos, sem adicionar listener de scroll por pixel. O cenário de regressão Contato → Skills/Sobre → Projetos integra a suíte final.

## Lighthouse mobile

Chrome 156 headless, Lighthouse 13.6.0, servidor `next start` local, emulação mobile e throttling simulado. Skills fechadas no carregamento inicial; shader ausente na variante mobile. Relatório final: [HTML](lighthouse-mobile.report.html) / [JSON](lighthouse-mobile.report.json).

| Indicador | Medição |
| --- | --- |
| Performance | 88/100 |
| Acessibilidade | 100/100 |
| Boas práticas | 100/100 |
| SEO | 100/100 |
| LCP | 1,1s |
| CLS | 0 |
| TBT | 440ms |
| Transferência inicial | 454 KiB |

O ensaio anterior à separação do CSS HeroUI registrou 494 KiB, performance 87, LCP 1,3s e TBT 400ms: [HTML anterior](lighthouse-before-css-split.report.html). Essa comparação é entre duas iterações da modernização, **não** entre o site original e o novo. O CSS da biblioteca foi retirado da homepage e continua na galeria de componentes. A transferência diminuiu aproximadamente 40 KiB; a pequena variação de score/TBT não demonstra melhoria de responsividade.

Lighthouse é evidência de laboratório, não aprovação de Core Web Vitals no percentil 75. TBT ainda indica oportunidade de reduzir o custo de execução/hidratação. INP de campo, FPS, GPU, bateria, dispositivo intermediário físico e Core Web Vitals após deploy não foram medidos. Não há promessa de 60fps ou de INP aprovado.

## Revisão visual e limites

- Capturas finais: [desktop](home-desktop.png), [mobile](home-mobile.png). As alternativas e o reference lock estão em `directions.md`.
- A homepage funciona sem a variável de revisão. Rotas `/concepts` usam `noindex`, estão fora do sitemap e retornam 404 em produção quando `FEBRATE_DESIGN_REVIEW` não é `true`. Esse gate foi verificado em servidor local separado (home 200, conceitos 404).
- Sem JS: nome, três atos, projetos, detalhes nativos, foto, skills e contatos continuam no HTML. Efeitos e controles dependentes de JS não bloqueiam conteúdo.
- A autorização de direção foi para a homepage local. Revisar contribuição/direitos de cases, período e fontes das métricas herdadas, preview hospedado, leitor de tela e zoom manual de 200%, desempenho físico e publicação antes do lançamento.
- Na etapa de medição local, CI e Dependabot estavam configurados, mas ainda não haviam sido publicados. Não se inferiu runtime, variáveis, deploy ou estado atual da Vercel a partir da configuração local.

## Reproduzir o Lighthouse

Com `npm run start` em outra sessão e Chromium instalado pelo Playwright:

```powershell
$env:CHROME_PATH = node -e "console.log(require('playwright').chromium.executablePath())"
npx --yes lighthouse@13.6.0 http://localhost:3000/pt-BR --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=html --output=json --output-path=docs/modernization/lighthouse-mobile --quiet
```
