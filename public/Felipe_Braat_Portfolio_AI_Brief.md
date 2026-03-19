# PORTFOLIO AI BRIEFING — FELIPE BRAAT
> **Propósito deste documento:** Briefing estruturado e otimizado para consumo por IA. Contém todas as informações profissionais, técnicas e de posicionamento necessárias para que um agente de IA construa, configure e personalize o portfólio de Felipe Braat com fidelidade máxima. Nenhum dado deve ser omitido ou inferido — tudo aqui é fonte primária.

---

## 1. IDENTIDADE & CONTATO

| Campo              | Valor                                  |
|--------------------|----------------------------------------|
| **Nome completo**  | Felipe Braat                           |
| **Localização**    | Serra, ES, Brazil                      |
| **LinkedIn**       | (incluir link — presente no CV original) |
| **GitHub**         | (incluir link — presente no CV original) |
| **Idiomas**        | Português (nativo), Inglês (profissional) |

---

## 2. RESUMO PROFISSIONAL (Texto original do CV)

> "Software Engineer with 3+ years of experience specializing in TypeScript, Python, and AI-driven systems. Proven track record of engineering automated quality pipelines that reduced first response time by 48% and saved 350+ engineering hours annually. Strong focus on building, testing, and optimizing full-stack applications with a detail-oriented mindset for identifying edge cases, reproducing bugs, and ensuring product robustness across web and mobile platforms."

### Interpretação para o portfólio:
- **Identidade central:** Engenheiro de Software com especialização em sistemas de IA aplicada e automação de processos.
- **Diferencial principal:** Não é apenas desenvolvedor — é um profissional que une engenharia de software, inteligência artificial e mentalidade analítica de QA para construir sistemas que geram impacto mensurável.
- **Tom de voz:** Técnico, direto, orientado a dados e resultados. Evitar linguagem genérica ("apaixonado por tecnologia"). Preferir métricas reais e sistemas concretos.
- **Posicionamento:** Mid-level Software Engineer com forte viés em AI Automation, Full-Stack e Helpdesk Intelligence.

---

## 3. HABILIDADES TÉCNICAS

### Linguagens de Programação
- TypeScript *(principal)*
- Python *(principal)*
- JavaScript
- SQL

### Frontend
- Next.js *(versão 15, App Router — preferência explícita)*
- React
- Tailwind CSS *(v4)*
- HeroUI *(component library)*

### Backend
- Node.js
- FastAPI
- Flask
- PostgreSQL
- Supabase *(backend-as-a-service principal)*

### IA & Qualidade
- OpenAI API *(integração direta, prompt engineering avançado)*
- Prompt Engineering
- AI Evaluation & Testing
- Manual & Automated QA
- RAG (Retrieval-Augmented Generation)
- Pinecone *(vector database para RAG)*

### Ferramentas & DevOps
- Git / GitHub
- Jira
- Postman
- Docker
- N8N *(automação de workflows — uso intenso)*
- HubSpot API *(integração profunda)*

### Integrações & APIs externas
- Google Sheets API
- Looker Studio
- SofaScore API
- Skyscanner API

---

## 4. EXPERIÊNCIA PROFISSIONAL

### 4.1 — InChurch | Software Engineer & Technical Analyst
**Período:** Maio 2024 – Presente  
**Formato:** Remoto (Rio de Janeiro, RJ)  
**Setor:** SaaS para gestão de igrejas / comunidades religiosas  
**Porte:** 20.000+ usuários ativos

#### Responsabilidades e Realizações (texto original do CV):
- Architected and deployed AI-driven quality systems (Heimdall Agent, Salomão Assistant) using OpenAI API and TypeScript, automating ticket triage and response generation for 20k+ active users with 98% CSAT.
- Automated helpdesk operations through custom N8N workflows, reducing First Response Time by 48% within 4 months and increasing CSAT by 5% via intelligent routing and escalation logic.
- Resolved 48% of technical inquiries (706/1,467) at the support tier, saving 350+ developer hours annually by systematically identifying, reproducing, and documenting bugs before escalation to engineering.
- Collaborated cross-functionally with product, engineering, and operations teams to analyze user feedback, track recurring issues, and drive product quality improvements.

#### Contexto técnico adicional (para o portfólio):
- Trabalhou com a stack **N8N + HubSpot API + OpenAI API + Supabase** para construir pipelines inteligentes de triagem de tickets.
- Construiu o **Heimdall Agent** (agente de triagem de tickets) e o **Salomão Assistant** (assistente de respostas automatizadas com RAG via Pinecone).
- Implementou sistema de métricas de qualidade para os agentes de IA com dashboard no **Looker Studio** alimentado por Google Sheets.
- Configurou pipelines HubSpot com lógica de SLA automatizada e escalation.
- Utilizou **Windsurf Cascade** como ambiente de desenvolvimento assistido por IA.

---

### 4.2 — Ilha Service (Tribunal Federal) | Technical Support Engineer
**Período:** Abril 2023 – Outubro 2025  
**Formato:** Presencial (Serra, ES)  
**Setor:** Serviços de TI para órgão público (Tribunal Federal)

#### Responsabilidades e Realizações (texto original do CV):
- Engineered an internal asset management system using Next.js and Python, tracking 150+ technology assets and replacing error-prone manual processes with automated workflows.
- Deployed automated SLA monitoring integrated with communication tools, enabling the team to maintain 99% compliance across 1,200+ annual tickets.
- Automated system and antivirus deployment for 74 workstations via custom scripts, ensuring 100% compliance with security protocols and reducing manual maintenance overhead.

#### Contexto adicional:
- Primeiro papel onde Felipe passou de suporte técnico para engenharia de software aplicada.
- Demonstra capacidade de identificar problemas operacionais e construir soluções de software internas do zero.
- Experiência com ambiente corporativo altamente regulado (compliance, SLA, segurança).

---

### 4.3 — Sollo Brasil | Service Desk Analyst
**Período:** Novembro 2022 – Abril 2023  
**Formato:** Presencial (Vitória, ES)  
**Setor:** Serviço de TI corporativo

#### Responsabilidades e Realizações (texto original do CV):
- Developed and deployed a workstation configuration script for a 2,000-employee operation, accelerating device setup and preventing operational downtime during mass reconfigurations.

#### Contexto adicional:
- Início da trajetória de automação: mesmo em uma função de suporte, Felipe já escrevia scripts para escalar e automatizar processos.
- Base do background de 6+ anos em suporte técnico e helpdesk operations.

---

## 5. PROJETOS

### 5.1 — Heimdall Agent
**Stack:** TypeScript, OpenAI API, N8N, HubSpot API  
**Categoria:** AI Automation / Helpdesk Intelligence  
**Status:** Em produção (InChurch)

#### Descrição técnica:
Sistema de triagem inteligente de tickets de suporte que processa 2.400+ conversas mensais via integração com HubSpot. Executa análise de sentimento, categorização de tickets e scoring de qualidade de forma automatizada, eliminando 100% do processo de triagem manual da equipe de suporte.

#### Realizações mensuráveis (texto original do CV):
- Engineered an AI-powered triage system that processes 2,400+ monthly conversations, automating sentiment analysis, ticket categorization, and quality scoring — eliminating 100% of manual triage for the support team.
- Integrated custom JavaScript logic with HubSpot API to bypass native reporting limitations, enabling advanced analytics and data-driven bug prioritization across product teams.
- Designed comprehensive test scenarios and edge-case evaluations for the AI agent, iterating on prompt engineering to improve classification accuracy and reduce false positives.

#### Destaques para o portfólio:
- **Escala:** 2.400+ conversas/mês processadas
- **Impacto:** 100% de eliminação do triage manual
- **Engenharia:** Integração customizada com HubSpot API + lógica JavaScript avançada
- **IA:** Prompt engineering iterativo para classificação e scoring

---

### 5.2 — BR Masters
**Stack:** Next.js 15, TypeScript, Supabase, Tailwind CSS  
**Categoria:** Full-Stack Web Application / Sports Tech  
**Status:** Em desenvolvimento ativo (projeto próprio)

#### Descrição técnica:
Plataforma gamificada de previsão de resultados do futebol brasileiro. Construída do zero com Next.js 15 (App Router) e Supabase, com ingestão de dados em tempo real via APIs externas (SofaScore) com otimização de rate-limit.

#### Realizações mensuráveis (texto original do CV):
- Architected a full-stack football prediction platform from scratch using Next.js 15 and Supabase, implementing real-time data ingestion from external APIs with rate-limit optimization.
- Conducted a full technical audit covering security vulnerabilities, performance bottlenecks, and UX regressions — documenting 30+ actionable findings and systematically resolving critical issues.

#### Contexto técnico adicional:
- Auditoria técnica completa documentando 30+ achados com criticalidade, impacto e plano de resolução.
- Arquitetura de banco de dados para entidades Teams e Players.
- Integração com SofaScore API com estratégias de rate-limit.
- Uso de HeroUI como component library + Tailwind CSS v4.
- Implementação de fluxos de autenticação e templates de email.
- Desenvolvimento de sistema de gamificação com pontuação e rankings.

#### Destaques para o portfólio:
- **Complexidade:** Full-stack do zero com arquitetura escalável
- **Qualidade:** Auditoria técnica profissional (30+ findings documentados)
- **Dados:** Real-time data pipeline com otimização de API externa

---

### 5.3 — Helper CX
**Stack:** Next.js, Python, Google Sheets API, Looker Studio  
**Categoria:** Helpdesk Automation / Operational Intelligence  
**Status:** Em produção (InChurch)

#### Descrição técnica:
Sistema integrado de distribuição e roteamento inteligente de tickets para suporte N1/N2, com dashboards operacionais em tempo real para visibilidade completa das métricas de helpdesk.

#### Realizações mensuráveis (texto original do CV):
- Reduced average First Response Time (FRT) to 31 seconds by engineering an automated ticket distribution and intelligent routing system for N1/N2 support tiers.
- Built real-time operational dashboards that unlocked 100% visibility into helpdesk metrics, enabling leadership to make data-driven decisions and identify product quality gaps.

#### Destaques para o portfólio:
- **Métrica chave:** FRT médio reduzido para 31 segundos
- **Impacto:** 100% de visibilidade operacional para liderança
- **Arquitetura:** N8N + Google Sheets + Looker Studio como pipeline de dados operacionais

---

### 5.4 — Central de Ajuda (Knowledge Base)
**Stack:** Next.js, Flask, Pinecone, Supabase  
**Categoria:** Knowledge Management / NLP / RAG  
**Status:** Em produção (InChurch)

#### Descrição técnica:
Base de conhecimento multilíngue com busca vetorial via Pinecone, permitindo que usuários encontrem respostas de autoatendimento antes de abrir tickets. Inclui suporte a três idiomas (pt-BR, EN, ES) e integração com pipeline de dados HubSpot ↔ N8N ↔ Supabase.

#### Realizações mensuráveis (texto original do CV):
- Deployed a multilingual knowledge base (pt-BR, EN, ES) with vector-powered search via Pinecone, reducing support ticket volume by surfacing self-service answers.
- Executed end-to-end security audits and performance testing, identifying and resolving vulnerabilities before production launch.

#### Contexto técnico adicional:
- Implementação de i18n completa (pt-BR, English, Spanish).
- Análise de custo de tradução de artigos.
- Integração com Microsoft Clarity para analytics de comportamento.
- Auditoria de segurança pré-produção.
- Pipeline de sync de artigos via HubSpot ↔ N8N ↔ Supabase.

#### Destaques para o portfólio:
- **Multilinguismo:** 3 idiomas com i18n completo
- **IA:** Busca semântica via Pinecone (RAG)
- **Qualidade:** Auditoria de segurança end-to-end antes do lançamento

---

## 6. EDUCAÇÃO

| Campo                  | Valor                                 |
|------------------------|---------------------------------------|
| **Curso**              | Bacharelado em Engenharia de Software |
| **Instituição**        | Wyden Educacional                     |
| **Previsão de conclusão** | Dezembro 2026                      |
| **Certificações extras** | Desenvolvimento em C/C++            |

---

## 7. MÉTRICAS DE IMPACTO (Consolidadas)

Estas métricas devem aparecer com destaque no portfólio, pois são o maior diferencial competitivo de Felipe:

| Métrica                                | Valor             | Contexto                                          |
|----------------------------------------|-------------------|---------------------------------------------------|
| First Response Time (FRT) reduzido     | **48%**           | InChurch — em 4 meses via N8N workflows           |
| FRT médio alcançado                    | **31 segundos**   | Helper CX — roteamento inteligente N1/N2          |
| Horas de engenharia economizadas/ano   | **350+**          | InChurch — resolução no nível de suporte          |
| Tickets resolvidos no nível de suporte | **706 de 1.467**  | InChurch — 48% de taxa de resolução               |
| CSAT alcançada                         | **98%**           | InChurch — 20k+ usuários ativos                   |
| Aumento de CSAT                        | **+5%**           | InChurch — via roteamento e escalation inteligente |
| Conversas processadas/mês (Heimdall)   | **2.400+**        | Triagem 100% automatizada                         |
| Triage manual eliminada                | **100%**          | Heimdall Agent                                    |
| Findings de auditoria técnica          | **30+**           | BR Masters — documentados e resolvidos            |
| Assets rastreados (Ilha Service)       | **150+**          | Sistema de gestão interno                         |
| Tickets anuais com 99% SLA             | **1.200+**        | Ilha Service — monitoramento automatizado         |
| Workstations configuradas via script   | **74**            | Ilha Service — deploy automatizado                |
| Operação impactada (Sollo Brasil)      | **2.000 func.**   | Script de configuração de workstation             |

---

## 8. STACK PREFERENCIAL (Ordem de preferência e proficiência)

Esta é a stack com a qual Felipe prefere e tem mais experiência para novos projetos:

```
Frontend:   Next.js 15 (App Router) + HeroUI + Tailwind CSS v4 + TypeScript
Backend:    Supabase (BaaS principal) + Flask/FastAPI (microservices)
Banco:      PostgreSQL via Supabase + Pinecone (vetores)
Automação:  N8N (workflows) + OpenAI API (IA)
Integrações: HubSpot API, Google Sheets API, SofaScore API
DevOps:     Git/GitHub, Docker (básico)
IDE/AI Dev: Windsurf Cascade (AI-assisted development principal)
```

---

## 9. PROJETOS ADICIONAIS (Contexto não-CV)

Estes projetos existem mas não estão no CV — podem ser mencionados no portfólio como "outros projetos" ou "explorations":

### Courrea Flight Spy
**Stack:** Flask + Skyscanner API  
**Descrição:** Ferramenta de inteligência de preços de passagens aéreas com estratégias anti-dynamic-pricing.

### Ageu (Bug Report Agent)
**Stack:** OpenAI API + HubSpot API + Jira API  
**Descrição:** Agente que analisa tickets do HubSpot e gera relatórios de bug estruturados no Jira com formatação ADF automática.

### Naruto Shinobi World (RPG Browser Game)
**Stack:** Next.js + Supabase  
**Descrição:** RPG de navegador com tema Naruto, incluindo sistema de criação de personagens, talent trees e arquitetura de banco de dados para um RPG de mesa.

---

## 10. DIRETRIZES PARA CONSTRUÇÃO DO PORTFÓLIO

### 10.1 — Identidade Visual Sugerida
- **Estética:** Técnica, limpa, moderna — sem excesso de elementos decorativos.
- **Paleta:** Dark mode preferencial (compatível com o perfil de desenvolvedor).
- **Tipografia:** Sem serifas — fonte mono para código, sans-serif para texto.
- **Tom:** Direto, baseado em dados, sem buzzwords genéricos.

### 10.2 — Estrutura de Páginas Recomendada
1. **Hero Section** — Nome + cargo + tagline orientada a impacto + CTAs (GitHub, LinkedIn, contato)
2. **About** — Resumo profissional (reutilizar texto do CV com adaptações)
3. **Skills** — Visualização organizada por categoria (linguagens, frontend, backend, AI, ferramentas)
4. **Projects** — Cards com stack, descrição, métricas e link (prioridade: Heimdall, BR Masters, Helper CX, Central de Ajuda)
5. **Experience** — Timeline com InChurch, Ilha Service, Sollo Brasil
6. **Metrics** — Seção de destaque com as principais métricas de impacto (números em grande)
7. **Education** — Seção compacta
8. **Contact** — Formulário ou links diretos

### 10.3 — Seções de Destaque Prioritárias
- **Métricas de impacto** devem ter destaque visual especial (números grandes, contraste alto).
- **Heimdall Agent** é o projeto mais impressionante — deve ser o featured project.
- **BR Masters** demonstra capacidade full-stack autônoma — destacar como projeto pessoal.
- A narrativa de "Suporte → Automação → Engenharia de IA" é o arco de carreira mais poderoso.

### 10.4 — Frases-chave para Copy
- "AI-driven systems that eliminate manual work at scale"
- "From support ops to AI engineering — building the tools that close the gap"
- "48% reduction in first response time. 350+ developer hours saved annually. 100% triage automated."
- "Not just an engineer — a systems thinker who measures everything"

### 10.5 — O que NÃO fazer
- Não usar frases genéricas como "apaixonado por tecnologia" ou "resolvo problemas complexos".
- Não omitir as métricas — elas são o principal diferencial competitivo.
- Não separar as experiências de suporte das de engenharia — a narrativa de evolução é o diferencial.
- Não apresentar o portfólio como "portfólio de estudante" — é um perfil de engenheiro mid-level com impacto real e mensurável.

---

## 11. CONTEXTO PROFISSIONAL ADICIONAL

### Filosofia de Desenvolvimento
- Prefere workflows de "vibe coding" estruturado com prompts detalhados para Windsurf Cascade.
- Abordagem orientada a métricas: define impacto esperado antes de construir.
- Foco em comunicação técnica concisa — documentação clara e objetiva.
- Forte atenção a edge cases, QA e robustez de sistemas.

### Área de Especialização Emergente
Felipe está se posicionando ativamente como especialista em **AI Agents & Automation Engineering**, com foco em:
- Agentes autônomos (N8N + OpenAI)
- RAG pipelines (Pinecone + Supabase)
- Helpdesk Intelligence (HubSpot integrations)
- Full-stack web applications (Next.js 15)

### Background de Suporte (6+ anos)
O histórico extenso em suporte técnico não é uma limitação — é um diferencial. Felipe entende profundamente os problemas operacionais que os sistemas que ele constrói precisam resolver. Isso gera soluções mais práticas, mais robustas e com maior adoção real.

---

## 12. CHECKLIST PARA A IA QUE VAI CONSTRUIR O PORTFÓLIO

- [ ] Utilizar todos os projetos listados na seção 5 como base para os cards.
- [ ] Incluir TODAS as métricas da seção 7 — nenhuma pode ser omitida.
- [ ] Posicionar Heimdall Agent como projeto principal/featured.
- [ ] Construir a narrativa de carreira: Suporte → Automação → Engenharia de IA.
- [ ] Incluir seção dedicada de métricas de impacto com destaque visual.
- [ ] Usar a stack da seção 8 como base para qualquer implementação técnica do portfólio.
- [ ] Manter tom técnico e direto — sem linguagem genérica ou corporativa.
- [ ] Dark mode como padrão visual.
- [ ] Garantir que o portfólio seja responsivo (mobile-first).
- [ ] LinkedIn e GitHub devem ser CTAs primários.

---

*Documento gerado em: Março de 2026*  
*Fonte primária: CV oficial de Felipe Braat (PDF)*  
*Versão: 1.0 — Briefing completo para construção de portfólio por IA*
