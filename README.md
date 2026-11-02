# Febrate — Portfólio de Felipe Braat

Portfólio profissional de engenharia de software, integrações, automação e produtos digitais, publicado em [febrate.com](https://www.febrate.com).

## Tecnologia

- Next.js 16 (App Router) e React 19
- TypeScript e Tailwind CSS 4
- Framer Motion com suporte a `prefers-reduced-motion`
- Internacionalização: português, inglês e espanhol
- Deploy e prévias na Vercel

## Desenvolvimento

```bash
npm ci
npm run dev
npm run check
npx playwright install chromium
npm run test:e2e
```

Abra [localhost:3000/pt-BR](http://localhost:3000/pt-BR). Use Node.js 24 conforme `.nvmrc` e `engines`; o runtime remoto deve ser conferido no gate de publicação. A direção **Matéria em transformação** foi aprovada e aplicada localmente em 02/11/2026.

## Estrutura principal

| Caminho | Responsabilidade |
| --- | --- |
| `src/app/[locale]/page.tsx` | Composição da página traduzida |
| `src/components/portfolio/AuthorialContent.tsx` | Cases, pessoa e footer renderizados no servidor |
| `src/components/portfolio/AuthorialNavbar.tsx` | Morph do header e navegação acessível |
| `src/components/hero/HeroNarrative.tsx` | Três atos, variante estática e shader opcional |
| `src/styles/{tokens,authorial}.css` | Tokens e layouts responsivos |
| `src/lib/i18n/translations/{locale}` | Fonte única de conteúdo em 3 idiomas |
| `src/lib/portfolio/featured-projects.ts` | Curadoria por ID, sem duplicar metadados |
| `src/lib/projects.config.ts` | Catálogo, URLs, categorias e tecnologias dos projetos |
| `src/lib/projects.ts` | Metadados públicos de repositórios |
| `src/lib/i18n/translations/{locale}/projects.json` | Descrição de cada projeto traduzida |

Para adicionar um projeto, crie uma entrada em `projects.config.ts` e traduza o objeto `items[id]` nos três arquivos de projetos. O projeto JPM utiliza `https://www.jpmlda.com/` e é destacado no catálogo.

## Experiência e acessibilidade

Os estados de interface são claros (filtros, detalhes de projetos, navegação), os links externos usam `noopener noreferrer`, os componentes respeitam preferências de movimento reduzido e a navegação contempla dispositivos pequenos e teclado. O tema é persistido localmente no navegador.

## Observações de produção

- As três capas principais são locais e versionadas; verifique a proveniência e os direitos em `docs/modernization/media.md` antes de publicar. Microlink permanece apenas como compatibilidade histórica, fora do caminho de mídia da homepage.
- Metadados de repositórios privados não são publicados, inclusive quando a consulta GitHub possui um token. A consulta tem timeout e fallback local.
- O redesign permanece numa branch até revisão. Verifique experiência visual em celular e desktop, formulário/links dos projetos, Lighthouse e acessibilidade antes do merge.
- Não adicione credenciais, dados de clientes nem detalhes sigilosos de projetos internos ao conteúdo público.

Consulte [a execução da modernização](docs/modernization/README.md), [o design system](docs/design-system/foundations.md) e [a análise de segurança](docs/modernization/security.md). Os arquivos de `docs/portfolio-redesign-2026.md` descrevem o redesign anterior e ficam como histórico.

## Revisão das alternativas

Em desenvolvimento, `/pt-BR/concepts` apresenta as três direções. No servidor de produção local, essas rotas exigem `FEBRATE_DESIGN_REVIEW=true`, usam `noindex` e ficam fora do sitemap. A homepage aprovada funciona sem essa variável. A galeria de migração do HeroUI está em `/pt-BR/concepts/components`; seu CSS é carregado apenas nessa rota.
