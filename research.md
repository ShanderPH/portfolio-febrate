# Research: Febrate como portfólio autoral, vivo e premiável

**Data de referência:** 2 de novembro de 2026  
**Fase:** research / descoberta. Nenhuma implementação, escolha definitiva de direção, mudança de design system ou planejamento de sprint está autorizada por este documento.  
**Projeto:** [febrate.com](https://www.febrate.com) — repositório ShanderPH/portfolio-febrate.  
**Objetivo:** pesquisar experiências autorais reconhecidas, identificar técnicas de interação, movimento e direção de arte aplicáveis ao perfil de Felipe Braat, e criar uma base verificável para uma etapa posterior de planning.

> Critério central: Febrate não deve parecer um template de portfólio ou uma landing page criada por IA. A experiência precisa possuir decisões visuais e comportamentais identificáveis, relacionadas à personalidade, às entregas e à trajetória real de Felipe. Originalidade não significa substituir clareza por efeitos.

---

## 1. Escopo, método, evidências e limitações

### 1.1 Perguntas da pesquisa

1. Como os sites de portfólio reconhecidos no Awwwards transformam **a identidade de seus autores** em mecânicas de interface?
2. Que características diferenciam Site of the Year, Site of the Month, Site of the Day e Developer Awards?
3. Quais efeitos são adequados à header/nav, ao hero, aos projetos, às transições e ao footer?
4. Como preservar os recursos próprios do Febrate anterior, em vez de apagá-los?
5. O que faz um site parecer artificialmente gerado e como impedir sua reintrodução?
6. Como sustentar animações sofisticadas com conteúdo acessível, sem excesso de latência, páginas inacessíveis por teclado ou prejuízo mobile?

### 1.2 Fontes e grau de confiança

- **A: fonte primária** — site do criador, documentação oficial GSAP, Codrops (autoria técnica do tutorial), Next Icons/GitHub e publicações identificadas como do próprio Awwwards.
- **B: reconhecimento verificável indiretamente** — página identificável de entrada no Awwwards e análise datada de terceiros com premiação, notas, screenshots, mecanismos, stack e ressalvas.
- **C: referência sem status de premiação validado** — estilos indexados pelo Refero, galerias curatoriais e sites visualmente relevantes.
- **D: hipótese de aplicação ao Febrate** — proposta analítica deste documento; não descrever como algo que o site de referência implementa.

**Limite importante:** páginas internas de listagem e fichas do awwwards.com apresentaram timeout na extração textual desta pesquisa. Confrontamos links oficiais das fichas com publicações do Awwwards em redes oficiais, páginas dos projetos, estudos técnicos detalhados e arquivo indexado. Não simulamos uma inspeção por navegador que não ocorreu. As notas do júri abaixo são as registradas por estudos datados; não são medições nossas e devem ser reconferidas nas fichas oficiais antes de uma divulgação pública. Algumas páginas dependem de WebGL, som e JavaScript e não oferecem extração textual representativa de suas transições. Ninguém deve inferir comportamento exclusivamente a partir da captura estática.

**Temporalidade:** o Awwwards Site of the Year de 2026 não é um resultado confirmado nesta pesquisa. O vencedor anual de 2025, premiado posteriormente, é Lando Norris. Site of the Month de setembro de 2026 confirmado por publicação do próprio Awwwards: Why Zero. O Site of the Month de outubro de 2026 não foi validado até o corte desta pesquisa; não inventar um vencedor.

### 1.3 Critérios de análise

Cada referência é observada conforme:
- Linguagem autoral (o que a torna reconhecível sem ler o logo).
- Primeiros 5 segundos e valor apresentado sem interação.
- Tipo de navegação e reações de header.
- Coreografia do hero: entrada, scroll, gesto, profundidade e duração.
- Forma de explorar projetos: galeria, narrativa, catálogo, casos.
- Sistema de transições e continuidade espacial.
- Mobile, teclado, acessibilidade, carregamento e custo visual.
- Comportamentos que poderíamos adaptar e comportamentos que devemos recusar.

Para premiações, **não misturar notas de Awwwards, The FWA, CSSDA e outras entidades**. As categorias e escalas não são equivalentes. A classificação aqui é uma curadoria aplicável ao Febrate, não um ranking mundial de todas as submissões.

---

## 2. Diagnóstico preciso do Febrate: versão autoral versus redesign anterior

A comparação usa o estado imediatamente anterior ao PR #2 (commit 13e44b3, branch main naquele momento) e o redesign incorporado ao branch main pelo merge ed1221f em 02/11/2026. O código e o histórico são a fonte principal, não lembranças sobre o site.

### 2.1 Elementos originais com proteção explícita

| Elemento | Implementação antes do PR #2 | Valor de identidade | Tratamento exigido no futuro |
|---|---|---|---|
| Navbar animada | Navbar.tsx com motion.header/motion.nav e useScroll/useTransform | Transição distintiva da barra integrada ao hero para cápsula flutuante | **Recuperar comportamento, não trocar por sticky convencional** |
| Morph da navbar | Primeiros 100px de rolagem: padding vertical 24 para 12; horizontal 32 para 24; largura 100% para 56rem; raio 0 para 9999; margem superior 0 para 16; fundo translúcido e blur 0 para 16 | Mudança de estado perceptível, com escala, vidro e compressão sincronizadas | Evoluir a coreografia sem descaracterizar |
| Navegação ativa | Determinação da seção pelo scroll, links ativos, menu mobile com AnimatePresence | Orientação contextual | Reavaliar a precisão e estabilidade; manter feedback |
| Hero narrativo | HeroSection.tsx usa 3 fases, useScroll, useTransform, TextBlockAnimation e pinagem com altura de 400vh | Construção de discurso por progressão | **Não substituir automaticamente por headline + card**; investigar redução de fricção sem destruir narrativa |
| Shader próprio | MeshGradientBackground.tsx e paleta terrosa, movimento sensível a prefers-reduced-motion | Atmosfera visual do Febrate | Preservar como matéria-prima autoral; otimizar e avaliar uma evolução técnica |
| HeroMarquee | Faixa cinética de conceitos profissionais | Identidade por repetição e movimento | Investigar integração expressiva com hero e transição, sem ornamentalizar |
| Sobre | Foto real /images/febrate.png, seção personalizada, medidas 48%, 350+, 3+, 98% | Pessoa real e credibilidade | Preservar dados originais; verificar autorização e comprovação de métricas |
| Skills | Nuvem interativa de tecnologias, React Icon Cloud | Experimento interativo próprio | Pesquisar versão mais sofisticada ou alternativa com igual personalidade; não impor grade genérica |
| Footer | TextHoverEffect do logotipo FEBRATE com máscara radial seguindo cursor | Interação de marca já construída | Preservar e desenvolver, em vez de trocar por footer-padrão |
| Conteúdo | Dicionários pt-BR/en/es já escritos | Tom de voz e trajetória próprios | Texto original como fonte de verdade; alterações somente com revisão autoral |

**Arquivos históricos para comparação:**
- [Navbar original](https://github.com/ShanderPH/portfolio-febrate/blob/13e44b3d2e679692e60c95048af071a43f23f769/src/components/layout/Navbar.tsx).
- [Hero original](https://github.com/ShanderPH/portfolio-febrate/blob/13e44b3d2e679692e60c95048af071a43f23f769/src/components/hero/HeroSection.tsx).
- [Mesh Gradient original](https://github.com/ShanderPH/portfolio-febrate/blob/13e44b3d2e679692e60c95048af071a43f23f769/src/components/hero/MeshGradientBackground.tsx).
- [Footer original](https://github.com/ShanderPH/portfolio-febrate/blob/13e44b3d2e679692e60c95048af071a43f23f769/src/components/footer/FooterSection.tsx).
- [Textos originais em português](https://github.com/ShanderPH/portfolio-febrate/blob/13e44b3d2e679692e60c95048af071a43f23f769/src/lib/i18n/translations/pt-BR/home.json).

### 2.2 Conteúdo autoral a proteger

Trechos existentes no Febrate anterior:
- "Olá, eu sou Felipe Braat."
- "Não apenas um Engenheiro de Software."
- "Mas um solucionador de problemas."
- "Transformando ideias em soluções digitais elegantes e funcionais"
- "Engenheiro de Software com 3+ anos de experiência em TypeScript, Python e sistemas orientados a IA."
- "Conheça meu trabalho"
- "O que eu construo"

Esses trechos têm precedência sobre copywriting recém-gerado. Não estamos afirmando que todos são imutáveis: poderão ser lapidados na fase de planning **com intenção e aprovação**, nunca substituídos silenciosamente por promessas genéricas.

### 2.3 Regressões produzidas pelo redesign anterior

**Componente na main agora:** PortfolioHome.tsx e portfolio.css; os componentes antigos seguem no repositório, mas não são mais montados pela homepage. Isso facilita uma restauração seletiva.

1. A navbar passou a um cabeçalho sticky com largura e altura essencialmente estáticas. A animação de transformação geométrica deixou de compor a experiência ativa.
2. O hero de narrativa por fases foi trocado por uma composição textual convencional e um falso quadro técnico. A interatividade original se perdeu, embora parte do código antigo continue presente.
3. Elementos artificiais foram introduzidos: "/ SYSTEM MAP", "001—003", "01 / Trabalho selecionado", "02 / Especialidades", "ENGINEERING / DIGITAL PRODUCTS", rótulos e slogans intercambiáveis. Não representam artefatos reais da trajetória.
4. Símbolos textuais foram usados para simular linguagem visual: setas tipográficas, sinais, marcações e glifos geométricos. O design system futuro deve operar com ícones SVG e gráficos personalizados, não pontuação decorativa.
5. Textos escritos para a versão anterior foram substituídos por frases universais como "Software bem pensado. Problemas reais resolvidos." e descrições que serviriam a milhares de profissionais.
6. A cor terrosa, a tipografia LexendDeca e o caráter do shader foram substituídos por estilo grafite quase monocromático por aproximação a Linear. Isso anulou uma combinação visual própria em vez de aprimorá-la.
7. Cards de projetos com moldura genérica de browser, filtros e expansões surgiram como padrões de produto. São funcionais, mas não expressam o universo visual de cada projeto.
8. A adição da JPM foi uma melhoria real de conteúdo; sua entrada, URL pública e traduções devem ser preservadas. Não apagar conquistas funcionais ao revisar estética.

**Diagnóstico:** houve otimização superficial de organização, mas redução de autoria e diferenciação. O próximo trabalho não é "adicionar muitas animações à versão nova"; é **recuperar a identidade existente, escolher uma gramática visual própria e compor o movimento com significado**.

---

## 3. Awwwards: vencedores anuais, mensais e portfólios fortes

### 3.1 Como interpretar prêmios e notas

A avaliação descrita por fontes que reproduzem a metodologia pública do Awwwards atribui Design 40%, Usabilidade 30%, Criatividade 20% e Conteúdo 10%. A Developer Award avalia critérios técnicos separados, com atenção a motion, responsividade, acessibilidade, semântica e otimização. [Explicação e referências da metodologia](https://exhibita.design/judged.html); [compilação com ressalvas de critérios](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/analysis/jury-evidence.md).

**Interpretação útil:** um site tecnicamente exuberante pode ter nota inferior em usabilidade ou acessibilidade. Não assumir que todo efeito premiado é apropriado para uma pessoa que usa o portfólio para avaliação profissional. Prêmio anual e prêmio mensal são reconhecimento de curadoria, não uma receita de layout.

### 3.2 Linha temporal confirmada ou documentada

| Ano/período | Site | Reconhecimento | Evidência | O que pesquisar nele |
|---|---|---|---|---|
| 2024 | Igloo Inc | Awwwards Site of the Year 2024, 7,92 SOTD | [teardown anual](https://rickcreates.com/year) | Universo visual inteiro em torno de gelo e partículas, identidade que estrutura a experiência |
| 2025 | Lando Norris, OFF+BRAND | Awwwards Site of the Year 2025, Users' Choice, SOTD 8,18, SOTM nov/2025 | [ficha Awwwards](https://www.awwwards.com/sites/lando-norris), [estudo](https://rickcreates.com/r/2025-11-20-lando-norris) | Motivo único (capacete) reaparece em hero, scroll e rodapé |
| Jan/2026 | Bruno's Portfolio | Awwwards SOTM jan/2026, SOTD 8,11 e Developer Award; FWA Year 2025 é outro prêmio | [ficha](https://www.awwwards.com/sites/brunos-portfolio), [estudo](https://rickcreates.com/r/2026-01-21-brunos-portfolio) | Mundo jogável como demonstração real da competência |
| Set/2026 | Why Zero, Sindhur Dutta | Awwwards SOTM set/2026, comunicado pela organização | [anúncio Awwwards](https://uk.linkedin.com/company/awwwards), [site](https://why.zero.university/) | Ambiente 3D justificado pela história de um modelo de educação; verificar ritmo, carregamento e acessibilidade |
| Set/2026 | Jesper Landberg | Awwwards SOTD 29/09, 7,73; Developer Award 8,17 | [ficha](https://www.awwwards.com/sites/jesper-landberg-4), [estudo](https://rickcreates.com/r/2026-09-29-jesper-landberg) | Galeria-curva com distorção de scroll e continuidade entre cartão e página |
| Set/2026 | Gil Huybrecht | Awwwards SOTD 21/09, 7,66; Developer Award 7,40 | [ficha](https://www.awwwards.com/sites/gil-huybrecht), [estudo](https://rickcreates.com/r/2026-09-21-gil-huybrecht) | Parede de projetos renderizada como uma peça única |
| Set/2026 | Léo Parpeix | Awwwards SOTD 14/09, 7,69; Developer Award 7,47 | [ficha](https://www.awwwards.com/sites/leo-parpeix-portfolio-2026), [estudo](https://rickcreates.com/r/2026-09-28-leo-parpeix-portfolio) | Ateliê 3D, a mesma linguagem atravessa trabalho, autoria e perfil |
| Out/2026 | Maria Vasilyeva | Awwwards SOTD 09/10, 7,28; Developer Award 7,33 | [ficha](https://www.awwwards.com/sites/maria-vasilyeva-portfolio), [estudo](https://rickcreates.com/r/2026-10-09-maria-vasilyeva-portfolio) | Interface inteira construída como partitura e player musical |
| Out/2026 | Guillaume Colombel — Portfolio 2026 | Awwwards SOTD e Developer Award anunciados em 28/10/2026 | [anúncio da organização](https://na.linkedin.com/company/awwwards), [site](https://guillaumecolombel.fr/) | Autoridade profissional e refinamento de motion; SplitText, WebGL e SVG conforme divulgação do GSAP |
| Set/2026 | Gionatan Nese | Awwwards SOTD 05/09, nota 7,32 reportada | [análise](https://dokle.design/awards/gionatan-nese-portfolio-homepage-pile-of-thumbnails) | Miniaturas dispersas como identidade de espaço criativo |
| Mar/2025 | Siena Film Foundation | Awwwards SOTM mar/2025, SOTD 7,90 relatada | [estudo de referências](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/award-winning-websites-2025-2030.md) | Editorial cinematográfico, foto, tipografia e dupla navegação |
| Ago/2025 | Cartier Watches & Wonders 2025 | Awwwards SOTM ago/2025, SOTD 7,64 relatada | [estudo de referências](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/award-winning-websites-2025-2030.md) | Direção de arte consistente; objeto central e transição entre universos |

No [anúncio de nomeados de setembro](https://au.linkedin.com/company/awwwards), o próprio Awwwards listou **Jesper Landberg, Why Zero, Léo Parpeix e Gil Huybrecht** no mesmo conjunto de candidatos ao Site of the Month, além de outros quatro sites. A diversidade de experiências e o vencedor final mostram que não existe uma fórmula de "fundo preto + pills + títulos numerados".

### 3.3 Estudos de caso: padrões transferíveis e armadilhas

#### A. Lando Norris — o símbolo como fio narrativo

- **Site:** [landonorris.com](https://landonorris.com/); [teardown](https://rickcreates.com/r/2025-11-20-lando-norris).
- **Mecanismo:** retrato, capacete de corrida, máscara fluida ao cursor, assinalamento gráfico e transições de scroll se encadeiam. Não é uma coleção de microefeitos desconexos.
- **Por que é autoral:** o capacete é um elemento inevitavelmente relacionado à trajetória de Norris. A navegação e os elementos visuais reforçam a mesma identidade.
- **Para Febrate:** encontrar um motivo próprio nos materiais de trabalho reais, na marca e na linguagem de engenharia, não importar um capacete, uma esfera 3D ou um brilho neon.
- **Risco:** efeitos visuais e tempo de carregamento podem prejudicar a pessoa que visita apenas para ver entregas.

#### B. Bruno Simon — a experiência é demonstração de competência

- **Site:** [bruno-simon.com](https://bruno-simon.com/); [teardown](https://rickcreates.com/r/2026-01-21-brunos-portfolio).
- **Mecanismo:** mundo explorável, carro controlável, física, modos de entrada, ações por teclado e toque, som configurável, trilhas de interação.
- **Por que é autoral:** o próprio portfólio comprova o trabalho do creative developer. O comportamento não seria intercambiável em uma página corporativa.
- **Para Febrate:** transformar *uma pequena competência demonstrável* em interação de marca, com acesso direto convencional aos projetos. Um produto técnico real pode servir de demonstração, sem gamificação artificial.
- **Risco:** aprendizagem obrigatória para acessar trabalho e níveis baixos de acessibilidade. O estudo relata 6,60 na categoria acessibilidade da Developer Award.

#### C. Jesper Landberg — continuidade física entre estados

- **Site:** [jesperlandberg.com](https://jesperlandberg.com/); [teardown](https://rickcreates.com/r/2026-09-29-jesper-landberg); [análise técnica](https://animorio.com/en/journal/jesper-landberg-how-its-made/).
- **Mecanismo:** fita curva de projetos, deformação associada à velocidade de scroll, cursor como pressão sob superfície e expansão do cartão para folha de caso; fechamento inverte a transição.
- **Por que é autoral:** a interface encena a prática de criar motion de alta qualidade e conserva estado espacial. A navegação do portfolio faz parte da demonstração.
- **Para Febrate:** tratar navegação, cards e detalhes como partes de um mesmo sistema de movimento; usar shared-element transitions em projetos selecionados e preservar o layout DOM real.
- **Risco:** estudos registram tempo de liberação da home e dificuldade de foco em teclado; o app inteiro em WebGL não é a solução automática.

#### D. Gil Huybrecht — visualização como curadoria

- **Site:** [gilhuybrecht.com](https://gilhuybrecht.com/); [teardown](https://rickcreates.com/r/2026-09-21-gil-huybrecht).
- **Mecanismo:** múltiplos trabalhos em uma parede visual contínua, imagens que trocam de posição e entram no detalhe; interação especial contextual.
- **Por que é autoral:** conteúdo e direção de arte são inseparáveis. A galeria não parece um componente UI importado.
- **Para Febrate:** produzir visuais de projetos que mostrem seu caráter real, e não capturas genéricas com moldura de navegador repetida.
- **Risco:** densidade visual, peso de mídia e acesso por teclado. A análise aponta que parte das células não funciona como link semântico.

#### E. Léo Parpeix — metáfora que atravessa toda a experiência

- **Site:** [leoparpeix.com](https://www.leoparpeix.com/); [teardown](https://rickcreates.com/r/2026-09-28-leo-parpeix-portfolio).
- **Mecanismo:** portfólio como oficina de escultor, flor/personagem que une hero, perfil e projeto; explorações e pequenos eventos lúdicos.
- **Por que é autoral:** a metáfora nasce da atividade do criador e se repete como elemento de memória, não como ornamentação solta.
- **Para Febrate:** selecionar um sistema expressivo relacionado à engenharia, à construção de produtos e à pessoa, sem ícones de código óbvios.
- **Risco:** cena inteira exige 3D e treinamento de gestos; efeitos devem ser opcionais e responsivos.

#### F. Maria Vasilyeva — linguagem específica do ofício

- **Site:** [mariavasilyeva.com](https://www.mariavasilyeva.com/); [teardown](https://rickcreates.com/r/2026-10-09-maria-vasilyeva-portfolio).
- **Mecanismo:** partitura visual que funciona como player e índice; miniaturas surgem no ponto tocado pelo playhead; som reativo e menu como parte da experiência.
- **Por que é autoral:** toda a gramática de interação tem a mesma origem conceitual.
- **Para Febrate:** construir uma mecânica consistente; não misturar glassmorphism, partículas, bento e terminal sem uma tese visual.
- **Risco:** som não pode ser obrigatório; transcrição, labels e alternativas de teclado são essenciais.

#### G. Guillaume Colombel — precisão antes do excesso

- **Site:** [guillaumecolombel.fr](https://guillaumecolombel.fr/), [anúncio Awwwards](https://na.linkedin.com/company/awwwards).
- **Mecanismo:** seleção de projetos de alta qualidade e movimentação refinada. Divulgação do GSAP identifica SplitText, SVG, Vue, Three.js/WebGL e reduced motion, sem comprovar a interação exata de cada elemento.
- **Por que é autoral:** o histórico profissional e os trabalhos estão legíveis como primeira camada; o motion reforça a assinatura do autor.
- **Para Febrate:** manter experiência sofisticada, mas acessível, com texto autoral em primeiro plano e interações capazes de demonstrar domínio técnico.
- **Limite:** não reproduzir detalhes de header específicos sem captura navegável e frame-by-frame da referência.

#### H. Why Zero — a experiência serve a uma narrativa específica

- **Site:** [why.zero.university](https://why.zero.university/); [comunicado oficial de SOTM set/2026](https://uk.linkedin.com/company/awwwards).
- **Mecanismo descrito pelo Awwwards:** ambiente digital imersivo para apresentar uma escola cuja proposta é reconstruir educação em torno de projetos e carreiras.
- **Para Febrate:** imersão só faz sentido quando explica algo singular. O mundo 3D deve evidenciar conteúdo, não funcionar como substituto de informações.
- **Limite:** a extração do site não revelou a sequência visual completa; necessidade de revisão por navegador na etapa posterior.

#### I. Gionatan Nese — romper a grade com intencionalidade

- **Referência:** [análise do portfolio](https://dokle.design/awards/gionatan-nese-portfolio-homepage-pile-of-thumbnails).
- **Mecanismo:** miniaturas de múltiplos tamanhos em composição irregular; ausência de hero textual tradicional.
- **Para Febrate:** considerar uma estrutura de trabalhos com composições específicas conforme tipo de produto.
- **Risco:** sem índice/lista e links evidentes, escaneabilidade e usabilidade caem. Adequado como experimento, não como substituição da navegação.

#### J. Siena Film Foundation e Cartier — linguagem completa versus efeito genérico

- **Referência:** [pesquisa comparativa](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/award-winning-websites-2025-2030.md).
- **Mecanismo:** Siena amarra foto, montagem e tipografia editorial; Cartier organiza experiências 3D ao redor de relógios reais. Ambos têm motivos de conteúdo distintos.
- **Para Febrate:** a fotografia de Felipe e as capturas de projetos devem dirigir o tratamento visual; telas fingidas e símbolos sem vínculo com projetos reais não podem substituir essas evidências.

### 3.4 Conclusões observáveis do conjunto

1. **Motivo visual consistente**: os exemplos memoráveis não precisam repetir uma estética popular, mas repetem um vocabulário próprio.
2. **Movimento com causalidade**: um gesto transforma o elemento que o usuário já reconhece; o item não desaparece e reaparece arbitrariamente.
3. **Hierarquia de conteúdo**: as experiências de maior elaboração frequentemente possuem uma segunda via prática para conhecer projetos e pessoa.
4. **Alguns vencedores têm falhas de acessibilidade**: prêmio não valida automaticamente UX inclusiva.
5. **Fontes e imagens são parte do conceito**: trocar a identidade autoral por Inter + grafite só porque parece sofisticado frequentemente reduz diferenciação.
6. **A navbar é parte da experiência**: no Febrate, já era. Perder esse componente contradiz a evolução desejada.

---

## 4. Pesquisa complementar no Refero

O Refero foi usado como repositório de **estilos documentados** e de screenshots de padrões de interface. Styles são descrições semânticas, não vídeos do comportamento em tempo real. Não atribuir a um estilo efeitos cinéticos que seu registro não demonstra.

| Referência real / URL | ID do Refero | Características documentadas | Papel possível, não uma cópia |
|---|---|---|---|
| [Dennis Snellenberg](https://dennissnellenberg.com) | 434f44a8-e391-4491-b036-7ed12f1ea5fc | Composição assimétrica, fotografia de pessoa, destaque tipográfico, controles discretos e acento interativo restrito | Fotografia como personagem da home e contraste entre texto e imagem |
| [Martin Laxenaire](https://www.martin-laxenaire.fr) | cb3f66cb-7142-4e6f-a303-bf0e0203b6b2 | Display de grande impacto e grafismo orgânico colorido; navegação com progresso | Como um elemento procedural pode integrar hero e progresso sem ser decoração padrão |
| [Active Theory](https://activetheory.net) | 9d795615-79d0-4544-ac5e-2858971c3b3b | Imagem abstrata 3D no centro e controles leves em canvas escuro | Refinamento de atmosfera e luz, não adoção automática de fundo preto |
| [Gustavo Faria](https://gustavo.work) | 14c1ab6c-8462-43a1-a112-af9e07d78085 | Tipografia extrema, retrato distorcido, listagem compacta e assimétrica de trabalhos | Mostrar que experimentação pode existir sem grid de cards |
| [Lusion](https://lusion.co) | 15c1f822-2f9b-4252-b76c-d32729f0abcf | Visuais 3D como mídia principal, tipografia própria, superfícies claras e escuras bem separadas | Tratar visuais especiais como obra, não preenchimento ornamental |

**Pesquisa de telas:** buscas em Refero por portfólio com hero, menu/overlay e galeria retornaram Bento, Peerlist, Contra, Awwwards e outros. O índice é predominantemente de telas estáticas e produtos SaaS; portanto não é base suficiente para definir a animação de uma navbar autoral. O uso de [Codrops Creative Hub](https://tympanus.net/codrops/hub/tag/menu/) e estudos de sites premiados é mais adequado para mecânicas cinéticas.

**Rejeição deliberada:** Linear Changelog, Verse e outras referências de dashboard escuro não devem ser a fundação exclusiva de um portfólio experimental. Estão relacionadas a software, mas não à identidade que o proprietário busca. Mesclar todas essas fontes em uma média neutra é precisamente o erro cometido anteriormente.

---

## 5. Headbar / header: pesquisa específica de comportamento

A headbar original é um **ativo de identidade**. A pesquisa de mercado aponta as seguintes famílias de interação; são alternativas concorrentes a avaliar, não efeitos cumulativos obrigatórios.

### 5.1 Pattern H1 — navbar morphing progressiva (referência direta: Febrate original)

- Estado de entrada: barra integrada à composição do hero, ocupando a largura disponível.
- No scroll: redução orgânica de largura e padding; mudança do raio de borda; aumento gradual de blur; deslocamento para floating dock.
- Evolução possível: largura medida em função dos itens e viewport, transição entre marcas/cores do hero, separação por contexto, sem jank no breakpoint.
- **Não negociável:** recuperar o morph da versão original. Não restaurar como mera classe fixa com um fade.
- Evidência: Navbar.tsx antes do PR #2, transformações concretas preservadas acima.

### 5.2 Pattern H2 — navegação sensível à direção do scroll

- Barra mais recolhida ao descer, retorna ao subir, com limites e um atalho sempre acessível.
- [Codrops, 09/10/2026](https://tympanus.net/codrops/2026/10/09/architecture-studio-astro-gsap/) documenta uma implementação com GSAP e ScrollTrigger; elementos podem entrar com stagger.
- Critério: esse comportamento deve **complementar** o morph, não substituí-lo. Não esconder o único meio de navegação.

### 5.3 Pattern H3 — menu expandido com transição geométrica e reversão intencional

- Gatilho nasce do próprio botão/menu, com continuidade visual entre forma inicial e overlay.
- A máscara pode usar SVG/clip-path e o conteúdo surgir em camadas, mantendo labels e destinos.
- [Codrops, 22/04/2026](https://tympanus.net/codrops/2026/04/22/a-playful-clip-menu-with-gsaps-easereverse/) explora easeReverse para entrada/saída com curvas independentes, além de reversão durante animação incompleta.
- Evitar overlay que desaparece abruptamente, tela vazia durante loading ou menu que só funciona por hover.

### 5.4 Pattern H4 — indicador vivo de seção

- Um elemento de destaque desloca-se e altera largura dentro da barra conforme o item ativo; a animação expressa mudança de contexto.
- Pode usar FLIP/shared layout (veja [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/)).
- Evitar números decorativos, códigos falsos ou marcador que não indique estado real.

### 5.5 Pattern H5 — marca com animação vetorial

- Um monograma desenhado para Febrate pode usar transformação SVG, recortes, linhas de construção ou morph controlado para refletir os estados da navegação.
- Deve funcionar parado como símbolo de marca, e não depender de uma sequência para ser reconhecido.
- **Não utilizar emoji, caracteres Unicode desenhados para parecer ícones, pontuação decorativa ou glyphs substitutos.**

### 5.6 Pattern H6 — hover e foco com personalidade

- Sublinhados desenhados, background de item que acompanha a seleção, transformação de peso variável, máscara curta de texto e leve atração magnética onde não altera a área de clique.
- Entrada e saída com curvas separadas; hover sempre replicado por foco de teclado.
- Rejeitar "magnetic button" que se desloca tanto que reduz previsibilidade/clicabilidade.

### 5.7 Pattern H7 — mobile com direção de arte própria

- Botão SVG autoral, abertura com a mesma lógica do desktop, seções em área de toque generosa.
- Overlay e backdrop claramente distintos, foco contido enquanto aberto, Escape fecha, retorno de foco ao botão.
- Sem hover como dependência; scroll do fundo bloqueado quando necessário e restaurado corretamente.

### 5.8 Padrões a rejeitar para a headbar

- Header cinza sticky sem mudança de forma.
- Cápsula genérica sempre igual do primeiro ao último pixel.
- Navbar criada por biblioteca pronta sem motion integrado ao hero.
- Ícones como caractere textual: glifos de setinha, estrelas e símbolos geométricos digitados.
- Blur pesado permanente em áreas grandes.
- Reações que quebram em redimensionamento, toque, redução de movimento ou navegação por âncoras.

**Pesquisa técnica:** ScrollTrigger fornece direção e velocidade e lida com início/fim/scrub; Flip anima mudanças reais de posição e tamanho; Motion pode cuidar dos estados de interface; manter uma única autoridade por propriedade evita animações que disputam transform do mesmo nó.

---

## 6. Hero: repertório de efeitos e como tornar uma história pessoal

O hero anterior tinha três atos e narrativa textual original. Sua duração de 400vh merece medição, **não eliminação por regra**. É possível conservar drama, transição, CTA e conteúdo explorável mediante versões distintas por dispositivo e preferência de movimento.

### 6.1 Técnicas pesquisadas

| Técnica | Fontes | Aplicação exploratória possível | Principal risco |
|---|---|---|---|
| Texto com máscara, split por palavras/linhas | [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/), Guillaume Colombel | Revelar as frases originais de Felipe em momentos intencionais | Fragmentação da leitura, reflow após fonte carregar |
| Storytelling com scroll progressivo | Hero original, [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Evoluir os 3 atos sem tela vazia, mantendo CTA acessível | Scrolljacking e excesso de distância |
| Shader com progressão narrativa | MeshGradient original, [Codrops demos](https://tympanus.net/codrops/hub/) | Reagir a gestos e a uma mudança de estado narrativo, em vez de animação aleatória | Consumo de GPU e queda de FPS |
| Morph/transformação de mídia | Lando Norris, Jesper Landberg | Transformação de um mesmo elemento entre hero e trabalho real | Custo de sincronização DOM/Canvas |
| Retrato dirigido por arte | Dennis Snellenberg, Gustavo Faria | Humanizar e diferenciar a composição com foto real | Recorte inadequado e distração visual |
| Layered/parallax scenes | [Codrops 2025 Review](https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/) | Profundidade em planos de mídia sem obrigar cena 3D completa | Enjoos, scroll artificial |
| Personagem/objeto ligado à obra | Léo Parpeix, Bruno Simon | Um motivo visual que apareça em todo o site com significado | Metáfora inventada e sem ligação real |
| Entrada de projeto com continuidade | Jesper Landberg, [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using) | Hero/galeria convergem para conteúdo, sem cortes arbitrários | Compatibilidade e elementos inacessíveis |

### 6.2 Como julgar uma ideia de hero

Uma ideia só passa se responder a todas:
1. Qual texto ou elemento **já pertencente ao Febrate** justifica este efeito?
2. Em que momento o usuário pode acessar projetos e contato sem completar uma animação?
3. Que parte da experiência permanecerá legível quando o efeito estiver desativado?
4. A animação introduz uma informação ou transforma uma parte importante do visual, ou é apenas enfeite?
5. A composição funciona em larguras pequenas, 200% de zoom e teclado?
6. Há motivo para usar WebGL, e não CSS, SVG ou Canvas 2D?
7. O mesmo movimento conversa com a headbar e com o próximo bloco?

### 6.3 Assinaturas visuais a investigar, sem decidir design ainda

**Hipótese A — narrativa autoral aprimorada.** O hero existente continua com seus três atos, LexendDeca e foto/shader da identidade, enquanto navegação, passagens e media cues recebem direção de arte integrada. O próprio texto original governa os momentos de revelação.

**Hipótese B — portfólio como obra interativa.** A homepage contém uma experiência de navegação explorável ligada a entregas reais, com modo simples imediato. A competência demonstrada não é "sei fazer 3D", mas o tipo de engenharia que Felipe de fato realiza.

**Hipótese C — editorial cinético profundamente pessoal.** Imagem, texto, projetos e marca ocupam uma composição em constante reorganização, com tipografia expressiva, transições próprias e nenhuma simulação de dashboards ou terminais.

Essas hipóteses competem entre si; não criar um meio-termo pasteurizado. A próxima etapa de planning precisará escolher uma direção visual a partir de storyboard e validação.

---

## 7. Projetos, cases e conteúdo: identidade ancorada em evidências

### 7.1 Repertório de exposição de trabalho

- **Galeria cinematográfica com expansão contínua:** Jesper Landberg. O item que foi clicado é o mesmo que cresce para se tornar o case.
- **Mural/parede contínua:** Gil Huybrecht. Densidade visual e navegação por agrupamento.
- **Composição editorial assimétrica:** Gustavo Faria. Hierarquia tipográfica no lugar de um card por projeto.
- **Telas reais como protagonistas:** Dennis Snellenberg; a composição separa projeto e papéis realizados.
- **Mapa explorável:** Bruno Simon; útil apenas se a interação acrescentar experiência real e houver acesso convencional alternativo.
- **Relações visuais entre produto, processo e resultado:** devem ser inventadas a partir dos projetos do portfólio, não de uma imagem genérica de pipeline.

### 7.2 Febrate: matéria-prima disponível

Na configuração do projeto, há trabalho em BR Masters, inChurch Knowledge, Helper SaaS, Helper CX, Natal Teixeira e Heimdall Agent; o PR #2 incorporou JPM — João Paulo Machado, Lda, com URL pública [jpmlda.com](https://www.jpmlda.com/).

Na etapa de planning, escolher **quais dois ou três projetos realmente contam uma história técnica que você deseja associar ao seu nome**. Não promover uma métrica, parceria, cliente ou funcionalidade a fato público sem confirmação. Para cada caso, reunir:
- O problema inicial e restrições reais.
- Seu papel pessoal na entrega (fronteiras de responsabilidade, equipe e autorização).
- Duas ou três evidências visuais autênticas, antes/depois, vídeo curto ou demo capturada.
- Desafios de arquitetura, integrações, UX e testes, quando publicáveis.
- Resultado que possa ser citado; diferenciar experiência própria, medição e expectativa.
- Tecnologias relevantes e decisões, em vez de uma nuvem indistinta de marcas.
- Um link vivo confiável; repositório público somente quando de fato público.

**JPM** deve conservar lugar no trabalho publicado. Sua apresentação pode ilustrar especialmente evolução de um negócio real: identidade, navegação, internacionalização, pedido de orçamento e manutenção. Não criar capturas falsas do site.

### 7.3 Política editorial inegociável

- Os textos originais em home.json são a versão autoral de referência. Propor edições como diff e justificativa, nunca substituir tudo em massa.
- Não introduzir frases como "Soluções que geram impacto", "Da ideia à execução", "Transformando o futuro", "Experiências memoráveis" sem ligação textual concreta com dados ou voz do autor.
- Não usar divisórias de título enumeradas como "01 /", "02 /", "001—003" ou nomenclatura de terminal como "SYSTEM MAP" para simular originalidade.
- Os projetos devem diferir na composição: repetir o mesmo mockup, ratio, navegador fake e grupo de tags em todos é efeito de template.
- O visitante deve saber: o que Felipe fez, por que importa, o que foi tecnicamente difícil e como acessar a entrega.
- Não reaproveitar estudos de caso, fotografias, logotipos ou animações de outro criador como se fossem autoria própria. Referência é linguagem, não cópia literal.

---

## 8. Iconografia e elementos gráficos: proibição de emojis e glifos fake

### 8.1 Next Icons, fonte preferencial a investigar

- [Catálogo oficial de ícones](https://www.nexticons.com/icons)
- [GitHub oficial](https://github.com/Next-Icons/next-icons)
- [Pacote React/Next.js](https://www.npmjs.com/package/@deemlol/next-icons)
- O projeto declara licença MIT, ícones em grade 24x24 e componente ajustável por tamanho, cor e stroke.
- O pacote possui também importação de ícones animados. **Antes de adotar:** verificar quais ícones realmente oferecem variante animada e se o movimento corresponde à linguagem escolhida.
- **Não confundir** nexticons.com com nexticons.in; são sites distintos.

### 8.2 Regras para o design system futuro

1. Proibidos emojis e emoticons em toda a UI pública, inclusive status, skills, botões, filtros e labels.
2. Proibidos símbolos tipográficos decorativos para fingir ícones: setas digitadas, losangos, estrelas, checks, caracteres de comando ou marcadores artificiais.
3. Ícones de ação devem ser SVG reais, com coerência de grade, stroke, proporção e estados interativos. Bibliotecas de referência: Next Icons, Lucide, Phosphor ou Tabler; selecionar no máximo uma família principal.
4. Elementos expressivos de marca **não** devem ser ícones de biblioteca em tamanho grande. Desenhar logomarca/monograma, patterns, formas e sistema gráfico específicos de Febrate.
5. Iconografia deve representar ação ou dado compreensível. Não incluir pequenos ícones dispersos apenas porque a interface parece vazia.
6. Ícone decorativo recebe aria-hidden; botão só com ícone recebe nome acessível; foco e toque não dependem da animação.
7. Logos de marcas/tecnologias devem seguir regras de marca. Evitar glifos Unicode como fallback.
8. A ausência de emoji não implica ausência de cor, humor, movimento ou experiência gráfica.

**Observação de produto:** instalar uma biblioteca não produz identidade. O que torna a interface autoral é a composição e a resposta a gesto, não trocar um emoji por um ícone genérico.

---

## 9. Motion design: inventário técnico e oportunidades pesquisadas

### 9.1 Ferramentas verificadas

| Recurso | O que faz | Uso de pesquisa | Documentação |
|---|---|---|---|
| Framer Motion (já instalado) | Estados de interface, gestos, scroll e shared layout em React | Preservar onde a composição React se beneficia de declaratividade | [Motion](https://motion.dev/) |
| GSAP + @gsap/react (já instalado) | Timelines imperativas de alta precisão | Headbar, hero, overlays e transições coordenadas | [GSAP](https://gsap.com/) |
| ScrollTrigger | Pin, scrub, direction, velocity, trigger | Evolução de progressão do hero e navbar sensível ao scroll | [Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| SplitText | Divide linhas/palavras/caracteres, máscaras e re-split responsivo | Texto narrativo original | [Docs e acessibilidade](https://gsap.com/docs/v3/Plugins/SplitText/) |
| Flip | Interpolação entre posições/medidas do DOM | Header morph e project-to-case transitions | [Docs](https://gsap.com/docs/v3/Plugins/Flip/) |
| SVG / clip-path | Máscaras e cortes vetoriais | Menu, marca e passagem entre cenas | [Codrops easeReverse](https://tympanus.net/codrops/2026/04/22/a-playful-clip-menu-with-gsaps-easereverse/) |
| View Transition API | Snapshot/transição de estado da página ou navegação | Passagem entre lista e case, com fallback | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using) |
| Three.js / shader dedicado | Geometria e deformação sofisticada | Somente quando houver conceito visual que a justifique | [Three.js](https://threejs.org/) |
| Lenis (já instalado) | Suavização controlada da rolagem | Se integrado sem competir com pinagem e preferências de acessibilidade | [Lenis](https://github.com/darkroomengineering/lenis) |

**Não implementar todos juntos.** A próxima fase deverá atribuir responsabilidades exclusivas por elemento e evitar que GSAP, Framer e CSS tentem atualizar simultaneamente transform/opacidade de um mesmo DOM node.

### 9.2 Vocabulário de movimento candidato

- **Continuidade:** shared element entre item de nav, galeria e case.
- **Reação:** deformação sutil à proximidade, pressão, arraste, velocidade e foco.
- **Revelação:** máscaras, recortes e linhas de texto com timing baseado na frase.
- **Profundidade:** shader, parallax ou z-axis somente quando melhora leitura espacial.
- **Progressão:** fases do hero ligadas à trajetória de leitura; CTA permanece alcançável.
- **Assinatura:** mesmo easing e gramática de entrada/saída em vários componentes, sem saturar todas as áreas.
- **Surpresa contextual:** pequenos momentos relacionados a projetos ou à personalidade, não easter eggs aleatórios.
- **Reversibilidade:** transições que podem ser interrompidas e fechadas sem saltos.

### 9.3 Experimentos de motion que merecem protótipo antes do planning final

| Experimento | Onde | Critério visual de sucesso | Fallback obrigatório |
|---|---|---|---|
| Restore & enhance do morph da navbar | Header | Mudança geométrica sem pulo, suavidade, integridade da marca | Barra funcional e estável |
| Menu expansível conectado ao botão | Header/mobile | Entrada e saída reversíveis, sem teleportar | Menu DOM acessível |
| Hero em três atos com continuação suave | Hero | Frases originais conduzem a visita, não prendem nela | Conteúdo imediatamente legível |
| Shader reativo autoral | Hero/transition | Movimento tem ligação explícita com narrativa ou mídia | Gradiente/composição estática |
| Transição de imagem de projeto a case | Projetos | Objeto conserva identidade visual | Navegação padrão sem bloqueios |
| Thumb preview contextual no índice | Trabalhos | Informação da mídia real muda com o item focado | Lista de links bem descritos |
| Retorno da máscara radial de FEBRATE | Footer | Marca visual reconhecível e controlável | Wordmark legível estático |

**Indicadores de fracasso:** FPS inconsistente, navegação oculta, ausência de foco visível, scroll travado, copy genérica, efeito que não explica nada, imagem/código de preenchimento, hover inacessível em mobile, CLS e layout quebrado.

---

## 10. Padrões anti-template e critérios de originalidade

### 10.1 Lista proibitiva de atalhos de design

- Hero genérico com título abstrato, subtítulo universal, dois CTAs e quadro decorativo sem relação com entrega.
- Fundo escuro com grade, brilho ao cursor e cards duplicados para simular "engenharia".
- Estrutura fixa hero, sobre, skills, cards, contato sem uma intenção narrativa singular.
- Rótulos "SYSTEM MAP", "SELECTED WORK", "FEATURED", "CRAFTING DIGITAL EXPERIENCES", numeração no começo de todas as seções e excesso de texto em caixa-alta monoespaçada.
- Painéis que imitam editor, terminal, arquivo JSON, log e diagrama de fluxo sem mostrar dados ou situação reais.
- Tipografia Inter/Geist e cores preto/branco por reflexo automático das tendências SaaS.
- CTA com seta de caractere em vez de SVG, glifos textuais substituindo símbolos gráficos e emojis de skills.
- O mesmo blur, fade-up e scale-on-hover em toda seção.
- Cards bento por padrão, sem relação com o conteúdo e sem direção de arte específica.
- "Métricas de impacto" inventadas, placeholders apresentados como clientes e marcação "Live" sem verificação.

### 10.2 A diferença entre "premium" e "identidade"

A estética de um produto SaaS pode ser premium e funcional, mas **isso não a torna adequada a uma persona profissional**. O Febrate precisa expressar a história de um engenheiro que resolve problemas e desenvolve produtos reais. Layout, motion, mídia e texto precisam ser pensados como um sistema autoral. A pergunta de validação é: retirando o nome do topo, um visitante ainda reconhece algo específico de Felipe Braat? Se não, a proposta foi genérica.

### 10.3 Requisitos que não podem regredir

- Manter português, inglês e espanhol sem traduções artificiais.
- Preservar conteúdo autoral e foto real; pedir autorização para novas mensagens.
- Preservar a JPM com seus links e descrição.
- Preservar as animações originais como referência funcional antes de qualquer remoção.
- Deixar projetos e contato acessíveis em navegação normal.
- Adaptar a direção de arte a mobile sem reproduzir um desktop encolhido.
- Fornecer alternative experience sem WebGL, autoplay, áudio e cursor.
- Não alterar repositório de produção a partir da etapa de research.

---

## 11. Performance, acessibilidade, qualidade e método de medição

### 11.1 Metas de produto e experiência

Referência do [web.dev Core Web Vitals](https://web.dev/articles/vitals), no percentil 75 de usuários:
- **LCP até 2,5 s**
- **INP até 200 ms**
- **CLS até 0,1**

São alvos medidos em condições reais, não garantias antes dos testes. O fato de alguns ganhadores do Awwwards entregarem dezenas de MB não deve virar justificativa para não otimizar: peso precisa ser proporcional ao valor expressivo da experiência.

### 11.2 Regras de acessibilidade para motion

- Respeitar [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) e oferecer substituição funcional, não uma página vazia.
- Preservar labels e semântica nas animações de texto. [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) tem suporte automático a aria, mas links dentro de texto fragmentado exigem tratamento específico.
- O que é clicável deve existir no DOM com controle acessível, mesmo com Canvas sobreposto.
- Suporte a teclado, Escape, ordem correta de foco, touch targets adequados, menu mobile funcional.
- Hover não é o único meio de revelar links, descrição ou contatos.
- Animação não bloqueia o primeiro contato com nome, ocupação e projetos.
- Color contrast e tipografia precisam ser reavaliados sobre shader e mídia em movimento.
- Som opt-in, com controle de mute sempre disponível.

### 11.3 Roteiro de estudo técnico para planning

1. Capturar as duas versões do Febrate e referências escolhidas em 360, 390, 768, 1024 e 1440 px.
2. Filmar interações completas em 60 fps ou captura de performance; registrar entrada, meio, saída e reverse.
3. Comparar carregamento inicial, autoplay e degradê do shader em dispositivo intermediário, não apenas desktop potente.
4. Verificar passagem entre breakpoints, rotas i18n, refresh, back/forward, foco, reduced motion e viewport resize.
5. Verificar o uso de GPU/JS e evitar leitores de tela bloqueados pelo canvas.
6. Testar página com JavaScript limitado como referência de robustez de conteúdo.
7. Atribuir resultado de cada experimento a fonte, comportamento e requisito de identidade.

---

## 12. Critérios objetivos para a próxima etapa de planning

A pesquisa **não escolhe** entre as três direções de hero/portfólio. Antes da implementação, o planning deverá produzir:

1. **Inventário de preservação**: lista dos componentes originais que permanecem, evoluem ou são substituídos, com justificativa explícita e aprovação quando houver remoção.
2. **Moodboards não genéricos**: no mínimo três direções radicalmente diferentes e identificáveis, cada uma com referências, mídia, tipografia e mecanismo principal.
3. **Storyboard de movimento**: sequência da header e hero frame a frame, entrada, scroll, hover, clique, abertura, fechamento, mobile e reduced motion.
4. **Decisão de identidade**: um motivo visual autoral que derive de material real sobre Felipe e seus projetos.
5. **Design tokens próprios**: tipografia, paleta, imagens, ícones, motion, sombras, radius e escalas com papéis e justificativas; não copiar tokens de terceiros.
6. **Biblioteca de interações**: convenções de hover/foco, menu, nav progress, previews, transição de projetos, conteúdo, footer.
7. **Arquitetura técnica de animações**: ownership por componente, carregamento progressivo, fallbacks e testes.
8. **Copy deck com diff**: textos originais ao lado de cada possível proposta. Nenhuma alteração sem motivo e autorização.
9. **Matriz de validação**: performance, usabilidade, acessibilidade, branding, mobile e originalidade.
10. **Critério de aceite contra AI-slop**: um avaliador deve conseguir justificar cada grande bloco com referência e dado real, sem dizer "porque isso é moderno".

### 12.1 Rubrica sugerida para comparar conceitos

Avaliar cada direção de 1 a 5 em: **identidade específica de Felipe**, qualidade do motion, preservação do legado, compreensão dos projetos, usabilidade, qualidade mobile, acessibilidade, custo de manutenção e integridade do texto. O score é um instrumento da equipe, **não** uma nota Awwwards.

**Gate:** não começar redesign de produção enquanto a identidade visual e os principais storyboards não forem aprovados. É mais barato rejeitar um conceito no papel do que remover outra vez animações próprias.

---

## 13. Bibliografia e links de trabalho

### Premiações e casos

1. Awwwards, [Annual winners](https://www.awwwards.com/annual-awards/winners) (página de premiações; extração bloqueada no ambiente).
2. Awwwards, [lista anual](https://www.awwwards.com/websites/sites_of_the_year/) (extração bloqueada no ambiente).
3. Awwwards, [Site of the Month](https://www.awwwards.com/websites/sites_of_the_month/) (extração bloqueada no ambiente).
4. Awwwards, [portfólios](https://www.awwwards.com/websites/portfolio/) (extração bloqueada no ambiente).
5. Awwwards, [anúncio SOTM setembro 2026 — Why Zero](https://uk.linkedin.com/company/awwwards).
6. Awwwards, [lista de nomeados do SOTM setembro 2026](https://au.linkedin.com/company/awwwards).
7. Awwwards, [anúncio G. Colombel de outubro 2026](https://na.linkedin.com/company/awwwards).
8. [Lando Norris: estudo e notas](https://rickcreates.com/r/2025-11-20-lando-norris).
9. [Bruno Simon: estudo e notas](https://rickcreates.com/r/2026-01-21-brunos-portfolio).
10. [Jesper Landberg: estudo e notas](https://rickcreates.com/r/2026-09-29-jesper-landberg).
11. [Gil Huybrecht: estudo e notas](https://rickcreates.com/r/2026-09-21-gil-huybrecht).
12. [Léo Parpeix: estudo e notas](https://rickcreates.com/r/2026-09-28-leo-parpeix-portfolio).
13. [Maria Vasilyeva: estudo e notas](https://rickcreates.com/r/2026-10-09-maria-vasilyeva-portfolio).
14. [Jesper Landberg: estudo de engenharia](https://animorio.com/en/journal/jesper-landberg-how-its-made/).
15. [Gionatan Nese: análise da composição](https://dokle.design/awards/gionatan-nese-portfolio-homepage-pile-of-thumbnails).
16. [Teardowns anuais — Igloo e Lando Norris](https://rickcreates.com/year).
17. [Pesquisa comparativa 2024–2026](https://github.com/coroboros/research/blob/main/articles/award-winning-websites-2025-2030/award-winning-websites-2025-2030.md).

### Design e interfaces

18. [Dennis Snellenberg](https://dennissnellenberg.com).
19. [Martin Laxenaire](https://www.martin-laxenaire.fr).
20. [Active Theory](https://activetheory.net).
21. [Gustavo Faria](https://gustavo.work).
22. [Lusion](https://lusion.co).
23. [Guillaume Colombel](https://guillaumecolombel.fr).
24. [Codrops Creative Hub](https://tympanus.net/codrops/hub/).
25. [Codrops seleção de menus](https://tympanus.net/codrops/hub/tag/menu/).

### Motion e engenharia

26. [Codrops — direção de scroll no header, 9 outubro 2026](https://tympanus.net/codrops/2026/10/09/architecture-studio-astro-gsap/).
27. [Codrops — menu reversível com GSAP, 22 abril 2026](https://tympanus.net/codrops/2026/04/22/a-playful-clip-menu-with-gsaps-easereverse/).
28. [Codrops — revisão dos experimentos 2025](https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/).
29. [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
30. [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/).
31. [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/).
32. [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using).
33. [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion).
34. [Google Web Vitals](https://web.dev/articles/vitals).
35. [Next Icons catálogo](https://www.nexticons.com/icons).
36. [Next Icons GitHub, licença MIT](https://github.com/Next-Icons/next-icons).

### Código-fonte e histórico do Febrate

37. [Repositório](https://github.com/ShanderPH/portfolio-febrate).
38. [Estado anterior ao redesign (commit)](https://github.com/ShanderPH/portfolio-febrate/tree/13e44b3d2e679692e60c95048af071a43f23f769).
39. [PR #2, redesign anterior já mesclado](https://github.com/ShanderPH/portfolio-febrate/pull/2).
40. [Página atual](https://github.com/ShanderPH/portfolio-febrate/blob/main/src/components/portfolio/PortfolioHome.tsx).
41. [Catálogo de projetos](https://github.com/ShanderPH/portfolio-febrate/blob/main/src/lib/projects.config.ts).

---

## 14. Resultado da research e fronteira para o planning

**Constatação:** o caminho mais promissor não é copiar um Site of the Month nem aplicar o mesmo visual de todas as referências. É **preservar as animações e o texto que já tornavam Febrate reconhecível** e projetar um vocabulário mais sofisticado, consistente e tecnicamente rigoroso, conectado a projetos reais e à pessoa real.

**Decisão de escopo nesta etapa:** documentar evidências, hipóteses, anti-padrões e guardrails. Não implementar, não substituir textos, não alterar navbar, não introduzir design tokens finais e não aplicar deploy. A etapa seguinte é planejamento, com opções visuais e aprovação explícita antes de qualquer intervenção no site.
