# Portfolio Febrate — auditoria, redesign e validação (2026)

## Objetivo

Atualizar o portfólio de Felipe Braat para uma experiência profissional voltada a recrutadores e empresas que procuram desenvolvimento de produtos, engenharia de software, integração de APIs e automação.

## Auditoria do código anterior

- Hero de 400vh com fases dependentes da rolagem: proposta de valor e CTA exigiam muitas interações para aparecer.
- Shader WebGL, nuvem 3D de ferramentas, efeitos de texto e scroll customizado em conjunto: risco de trabalho gráfico desnecessário para visitantes mobile.
- Grid Bento, modal de projetos, traduções e dados centralizados já eram reutilizáveis, mas a apresentação priorizava o aspecto visual em vez de resultado e contexto.
- README genérico do template Next.js; metadados SEO iniciais genéricos; não havia sitemap/robots dedicados.
- Projetos tinham screenshot dinâmica e links com fallback parcial; nenhum item JPM.

## Pesquisa Refero / reference lock

Fundação principal: **Linear Changelog** — interface escura controlada, hierarquia tipográfica precisa, bordas finas, superfícies neutras e contraste sem excesso de gradientes.

Referências secundárias:
- **David Kirschberg** — cards de projetos com screenshots no centro da narrativa.
- **Verse** — metadados monoespaçados, numeração técnica e separadores discretos.
- **Bento/Peerlist** — cards de conteúdo escaneável e rótulos contextuais.

Compromissos: fundo `#08090a`, superfícies `#111315` / `#17191c`, texto `#f4f5f6`, bordas `#2a2d31`; verde `#89d6b0` somente em status funcional, não como decoração. Inter/sans para conteúdo e mono restrito a metadados; radius 8–15px. Capturas de produto reais quando possíveis, fallback gráfico honesto. Evitar rolagem teatral, 3D persistente e animação sem propósito.

## Mudanças entregues na branch

1. Novo hero curto com headline e CTA imediatamente visíveis, além de diagrama explicativo do processo técnico.
2. Nova galeria de projetos com filtros Todos / Produtos / Plataformas / Automação, detalhes expansíveis e links externos.
3. Inclusão de JPM — João Paulo Machado, Lda (site comercial português), descrições nos três idiomas, URL `https://www.jpmlda.com/`.
4. Seções especialidades, sobre com fotografia, métricas extraídas do portfólio existente e contatos objetivos.
5. Tema claro/escuro com persistência local; navegação responsiva e suporte a reduced motion.
6. Metadados internacionais (hreflang/canonical, OpenGraph), sitemap e robots.
7. Atualização de URL do BR Masters para `https://brmasters.fun/`.

## Decisões e justificativas

| Decisão | Referência/fonte | Objetivo |
| --- | --- | --- |
| Dark-first com grafite e superfícies discretas | Linear Changelog | Clareza, legibilidade e identidade técnica |
| Screenshots e microinformação junto ao projeto | Kirschberg + Peerlist | Evidência de entregas, não apenas lista de stacks |
| Etiquetas com tipo e estado de projeto | Verse | Facilitar triagem técnica |
| CTA acima da dobra | Objetivo de recrutamento | Permitir ação sem rolagem de 400vh |
| Animação de entrada curta e feedback rápido | Refero Motion Guide | Clareza sem sobrecarregar dispositivos |
| JPM em destaque | Solicitação do proprietário | Evidenciar trabalho comercial em produção |
| Compatibilidade com reduced motion | Acessibilidade | Respeitar preferências do usuário |

## Validação de release

- [x] Compilação Next.js/TypeScript em preview Vercel anterior à última etapa SEO.
- [x] Traduções dos projetos presentes nos três idiomas.
- [x] Projeto JPM inserido na configuração e ligado à URL solicitada.
- [ ] Revisão visual manual de 360, 390, 768, 1024 e 1440 px em navegadores reais.
- [ ] Verificação de links públicos e screenshot JPM renderizada, pois não foi possível capturar o domínio externo neste ambiente.
- [ ] Verificação do sitemap e robots após deploy final.
- [ ] Medição com Lighthouse/Web Vitals real (LCP, INP, CLS).
- [ ] Teste de navegação com teclado, VoiceOver/NVDA e tema claro.
- [ ] Revisão do texto profissional e métricas com o titular, incluindo projeto interno e autorização de divulgação.
- [ ] Aprovação e merge da PR antes de disponibilizar em febrate.com.

## Próximos refinamentos recomendados

Substituir screenshots dinâmicas por capturas revisadas e otimizadas; criar estudos de caso em páginas individuais para os 2–3 projetos prioritários; melhorar SEO social com OpenGraph específica; integrar analytics com consentimento e privacidade adequados; remover dependências legadas do site anterior após uma rodada de regressão; validar métricas do negócio e fotos/autorização de uso.

**Nota:** status de build READY não equivale a auditoria visual ou a testes de performance em navegador. O deployment preview da Vercel pode exigir login por Deployment Protection.
