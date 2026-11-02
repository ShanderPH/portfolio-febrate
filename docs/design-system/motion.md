# Motion — contrato do protótipo

Tokens JS em `src/lib/portfolio/motion.ts`, equivalentes CSS em `src/styles/tokens.css`: fast 160ms, navegação 280ms, reveal 500ms, cena 800ms; easing `(0.22, 1, 0.36, 1)`. Não são budgets de FPS.

- Navbar: Motion interpola largura `100% → 56rem`, raio `0 → 48px`, margem `0 → 16px` e padding vertical `24 → 12px` nos primeiros 100px. Transformação reversível, sem outro motor escrevendo nessas propriedades. No mobile e reduced motion, geometria estável.
- Hero Matéria: Motion controla opacidade de três atos e deslocamento do retrato até 60px. Pinagem somente em desktop ≥1024px, pointer fino e sem reduced motion. Distância proposta: 280svh. Não oculta o CTA junto com os atos. Sem JS, os três atos são blocos sequenciais.
- Shader: importação lazy, Suspense e error boundary. Carrega somente em desktop com pointer fino, sem reduced motion, intersectando viewport e aba visível. Limite de 650.000 pixels e velocidade 0.2 são valores iniciais para revisão, sem promessa de desempenho em GPU física. Unmount fora dessas condições; fundo CSS estático desde SSR.
- Cases: CSS controla aproximação da imagem até 1.025 e sublinhado no hover/foco. Reduced motion remove essas transições.
- Marca: máscara SVG segue pointer sem render React por pixel. Nome estático e foco operáveis desde SSR; nenhuma informação depende da máscara.

GSAP, Lenis e o hero legado permanecem preservados, sem competir na composição nova. O marquee original foi recuperado com pausa persistente por botão; respeita hover, reduced motion e ausência de JS. A nuvem original é lazy-loaded ao abrir “Explorar tecnologias”, com controles HTML de teclado e lista sempre disponível. Fecha/unmount ao recolher o disclosure; canvas só roda quando visível, em aba ativa e sem reduced motion. Falha no serviço de ícones não remove os controles textuais. Os SVGs são de marca; não foi adicionada biblioteca de ícones.
