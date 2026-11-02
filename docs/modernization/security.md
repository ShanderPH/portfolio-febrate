# Atualização de segurança

Observação de 02/11/2026; resultados são locais e não descrevem produção remota.

| Domínio | Decisão |
| --- | --- |
| Next/config ESLint | 16.1.1 → 16.4.4 em par fixo. npm já possuía esse patch após o 16.4.3 citado no plano. |
| React/DOM | 19.2.3 → 19.3.1 em par fixo; types React 19 alinhados. |
| HeroUI/styles | beta.3 → 3.2.7 em par fixo; resolução limpa dos peers React Aria sem `--force` ou `--legacy-peer-deps`. Switch recebeu Control/Thumb explícitos. Galeria e testes de teclado para componentes históricos. |
| Tailwind/PostCSS | 4.3.3 em conjunto; CLI removida após busca confirmar que nenhum script/import a usa. |
| Motion | 12.43.0, mantendo família 12 e imports existentes. Sem migração simultânea para `motion/react`. |
| GSAP/React e Lenis | 3.15.0 / 2.1.2 e 1.3.27; dependências históricas preservadas. |
| i18n | i18next 25.10.10, react-i18next 16.6.6. `next-i18n-router` removido por ausência de import; proxy próprio preservado. |
| Tooling | Node 24, types Node 24, ESLint 9.39.5. Não migrar ESLint major sem validar plugins/Next. |
| Higiene | `tailwind-variants` deixou de ser dependência direta sem uso; HeroUI conserva sua dependência transitiva. Embla continua porque o carousel histórico importa core e autoplay. |
| CSS e imagens | Estilos HeroUI restritos à galeria de componentes. Imagens principais locais; a allowlist do otimizador conserva somente `api.microlink.io/` para compatibilidade histórica. |
| Shader | Mantida versão compatível 0.0.71; atualização 0.x adiada até teste de GPU/dispositivo real, com fallback/limites implementados. |

Auditoria original: 16 achados (1 crítico, 11 altos, 3 moderados, 1 baixo). Após atualização e refresh direcionado de `@humanfs/node`, `flatted`, `brace-expansion`, `picomatch`, `ajv`, `js-yaml`: zero críticos/altos e zero achados em `npm audit --omit=dev`.

## Risco residual de desenvolvimento

16 alertas moderados são propagação de uma única causa: [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), amplificação de glob em `minimatch <11.0.1`, alcançada pelas dependências de ESLint. Essas dependências não são instaladas no conjunto de produção. No lint do repositório, padrões são definidos pelo projeto; evitar executar lint/configurações de terceiros não revisados. O risco não foi chamado de resolvido.

Não forçar `minimatch@11` globalmente: consumidores legados de v3 usam API incompatível. Não seguir sugestão automática de downgrade de `eslint-config-next`, pois desalinhará o Next. CI rejeita achados altos/críticos e continua expondo moderados para revisão. Reavaliar quando os mantenedores publicarem backports ou cadeia compatível.

Nenhum `npm audit fix --force`, deploy, merge ou alteração de variáveis remotas foi realizado. Atualizações de Node em Vercel e compatibilidade em preview hospedado permanecem pendentes.
