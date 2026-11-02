import Link from 'next/link';

const directions = [
  { id: 'matter', title: 'Matéria em transformação', description: 'A identidade original em movimento. Lexend Deca, tons terrosos, retrato real e narrativa em três atos.', detail: 'Navbar que se transforma; shader opcional; projetos e contato acessíveis desde o primeiro frame.' },
  { id: 'archive', title: 'Arquivo de decisões', description: 'O trabalho como evidência. Composição editorial, contraste e leitura direta dos projetos.', detail: 'Índice aberto, fichas de projetos e detalhes nativos. A cor pertence ao trabalho.' },
  { id: 'atlas', title: 'Atlas de produtos vivos', description: 'Uma exploração dos produtos reais, com acesso direto a cada projeto.', detail: 'Navegação espacial opcional em HTML; lista convencional e foco de teclado sempre disponíveis.' },
];

export default async function Concepts({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <div className="concept-review">
    <header><Link href={`/${locale}`}>febrate.</Link><span>Revisão de direção · Novembro 2026</span></header>
    <h1>O próximo capítulo<br/>continua sendo seu.</h1>
    <p>Três propostas para recuperar a assinatura do Febrate. Explore o header, a abertura e a chegada aos projetos antes de escolher uma direção.</p>
    <div className="concept-options">{directions.map(direction => <article key={direction.id}>
      <Link className={`concept-swatch concept-swatch--${direction.id}`} href={`/${locale}/concepts/${direction.id}`} aria-label={`Explorar ${direction.title}`}>
        {direction.id === 'matter' ? <span>Olá,<br/>eu sou Felipe.</span> : direction.id === 'archive' ? <span>Ideia.<br/>Decisão.<br/>Produto.</span> : <span>JPM<span>BR Masters</span><span>inChurch</span></span>}
      </Link>
      <h2>{direction.title}</h2><p>{direction.description}</p><p className="concept-detail">{direction.detail}</p><Link className="author-cta" href={`/${locale}/concepts/${direction.id}`}>Explorar proposta<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></Link>
    </article>)}</div>
    <footer>Protótipos para revisão. A homepage atual permanece ativa. Conteúdo de cases e métricas aguardam validação editorial.</footer>
  </div>;
}
