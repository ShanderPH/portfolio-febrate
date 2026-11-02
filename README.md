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
npm run lint
npm run build
```

Abra `http://localhost:3000/pt-BR`. O projeto utiliza a versão Node.js definida no ambiente da Vercel (22.x).

## Estrutura principal

| Caminho | Responsabilidade |
| --- | --- |
| `src/app/[locale]/page.tsx` | Composição da página traduzida |
| `src/components/portfolio/PortfolioHome.tsx` | Componentes e interações do redesign |
| `src/components/portfolio/portfolio.css` | Design system e layouts responsivos |
| `src/components/portfolio/portfolio-copy.ts` | Conteúdo do portfólio em 3 idiomas |
| `src/lib/projects.config.ts` | Catálogo, URLs, categorias e tecnologias dos projetos |
| `src/lib/projects.ts` | Metadados públicos de repositórios |
| `src/lib/i18n/translations/{locale}/projects.json` | Descrição de cada projeto traduzida |

Para adicionar um projeto, crie uma entrada em `projects.config.ts` e traduza o objeto `items[id]` nos três arquivos de projetos. O projeto JPM utiliza `https://www.jpmlda.com/` e é destacado no catálogo.

## Experiência e acessibilidade

Os estados de interface são claros (filtros, detalhes de projetos, navegação), os links externos usam `noopener noreferrer`, os componentes respeitam preferências de movimento reduzido e a navegação contempla dispositivos pequenos e teclado. O tema é persistido localmente no navegador.

## Observações de produção

- Screenshots são solicitadas ao serviço Microlink a partir da URL pública do projeto; existe fallback visual para páginas protegidas e serviços indisponíveis. Para melhor consistência, substitua por imagens estáticas otimizadas antes de uma campanha pública.
- Repositórios privados não disponibilizam link público do código (consulta GitHub sem autenticação retorna nulo).
- O redesign permanece numa branch até revisão. Verifique experiência visual em celular e desktop, formulário/links dos projetos, Lighthouse e acessibilidade antes do merge.
- Não adicione credenciais, dados de clientes nem detalhes sigilosos de projetos internos ao conteúdo público.

Consulte `docs/portfolio-redesign-2026.md` para auditoria, referências e roteiro de validação.
