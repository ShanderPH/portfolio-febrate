# Gate criativo: três direções independentes

Pesquisa Refero em 02/11/2026: três buscas de estilos (portfólio terroso, arquivo de projetos, exploração interativa), três estilos completos e uma busca de telas de portfólio. As telas retornadas (Dribbble e Bento) foram rejeitadas como direção: organizam perfis, mas não recuperam a assinatura do Febrate. Os estilos completos têm prioridade sobre a descrição curta de busca; Forner foi descrito de maneira mais colorida no preview do que em sua especificação completa.

## Matéria em transformação — recomendada para revisão

**Fonte dominante:** Febrate anterior (`13e44b3…`): Lexend Deca, tons terrosos, morph da navbar, três frases, shader e marca no footer.

**Referência secundária:** [Forner](https://forner.studio), estilo Refero `5b077981-cc8a-4f93-9bd4-b158984f7215`. Adaptar escala tipográfica e pausas amplas. Não importar as famílias proprietárias nem a serif itálica. O shader vem do Febrate, não de Forner; a especificação completa de Forner recomenda superfícies planas.

**Moodboard implementável:** stone claro/escuro; café como texto; cobre apenas para foco/interação; retrato existente sem filtro; Lexend grande e alinhada à esquerda; formas que se transformam com o scroll. Sem cards genéricos repetidos.

**Storyboard:** primeiro frame com nome, retrato e CTA; header de ponta a ponta vira cápsula nos primeiros 100px; apresentação dá lugar a “Não apenas…” e “Mas um solucionador…”; tagline fecha a narrativa; CTA e links permanecem fora das camadas de opacidade. Em touch/mobile/reduced motion/sem JS, os três atos ficam no fluxo de leitura. Shader opcional e apenas decorativo.

## Arquivo de decisões

**Fonte dominante:** [Mike Matas](https://mikematas.com), estilo `749d923d-8d1a-48f6-b4dc-da755fbf1c62`: composição branca/preta, títulos fortes, trabalho como evidência.

**Borrow limitado:** alinhamento, mídia ampla e pouco chrome. Não copiar mockups de dispositivos. Lexend existente mantém a autoria; screenshots autênticos fornecem a cor.

**Moodboard:** branco, tinta preta, divisórias precisas, tipografia ampla, fichas abertas de projetos. Sem shader ou nuvem como decoração da abertura.

**Storyboard:** nome em coluna editorial; seleção de projetos à vista; foco/hover revela leitura complementar; scroll aproxima descrição e implementação; detalhes HTML expansíveis. No mobile, coluna única e links explícitos. Header compacto, com transformação contida. O arquivo depende de evidências publicáveis para decisões e resultados, que não serão inventadas.

## Atlas de produtos vivos

**Fonte dominante:** projetos reais do Febrate e suas categorias já cadastradas. [Max Yinger](https://yinger.dev), estilo `115f6720-2dd6-49d2-bc00-904b2754cf17`, contribui somente com a exploração isolada e acesso direto aos links.

**Rejeitar da referência:** terminal, horário decorativo, FPS falso, glifos, fontes monoespaçadas ornamentais e blocos 3D sem função. A metáfora usa produtos existentes e nunca supõe integrações entre eles.

**Moodboard:** fundo escuro, texto quartz claro, projetos agrupados por categoria real, links em órbitas DOM opcionais. A lista convencional acompanha a exploração desde o início.

**Storyboard:** pessoa e CTA visíveis; projetos podem ser explorados por foco/hover sem canvas; seleção conduz ao projeto correspondente na página; a rolagem entrega o mesmo conteúdo em lista. Em mobile/reduced motion, a exploração vira índice estático. Sem tutorial ou WebGL obrigatório.

## Ledger e tokens

| Decisão | Fonte | Papel e limite |
| --- | --- | --- |
| Lexend Deca local | Febrate anterior e plano | Tipografia de identidade; sem importação de fontes remotas. |
| Terras em Matéria | Tokens históricos | Superfície/campo visual. Acento escuro em links; nunca texto de baixo contraste sobre shader. |
| Branco/preto em Arquivo | Mike Matas | Canvas e informação; cor vem dos projetos. |
| Basalt/quartz em Atlas | Max Yinger | Canvas e texto; nenhum terminal ou decoração técnica fictícia. |
| Retrato | `public/images/febrate.png` | Pessoa real, sem avatar inventado ou substituição por imagem gerada. |
| Cadastro e copy | JSONs + `projects.config.ts` | Dados existentes; não acrescentar alegações. |
| Menu disclosure nativo | HTML | Funciona sem JS, Escape e foco restaurado com JS; não é modal nem aprisiona foco. |
| Morph | Navbar histórica / Motion | Uma biblioteca por propriedade; sem GSAP/Lenis concorrentes. |

## Rubrica provisória (1–5)

Pontuação de proposta, não resultado de teste com usuários. Reavaliar após revisão do storyboard.

| Direção | Autoria | Motion | Legado | Projetos | Mobile | A11y | Manutenção | Copy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Matéria | 5 | 5 | 5 | 4 | 4 | 4 | 4 | 5 |
| Arquivo | 4 | 3 | 3 | 5 | 5 | 5 | 5 | 5 |
| Atlas | 4 | 4 | 3 | 4 | 4 | 4 | 3 | 5 |

**Decisão registrada em 02/11/2026:** o usuário selecionou explicitamente “Matéria em transformação (recomendado)” na pergunta de aprovação desta conversa. Essa direção e seu storyboard foram promovidos à homepage local. As outras opções seguem isoladas, sem indexação e ausentes do sitemap. A autorização foi para a homepage local; preview hospedado, publicação e revisão editorial de métricas/direitos continuam etapas separadas.
