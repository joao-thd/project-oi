import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingBag, Menu, Heart, Star, ShieldCheck, Clock3, Sparkles, ChevronDown, X } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

const catalog = [
  ["Dress To Impress", "15 itens", "a partir de R$ 6,19"],
  ["Animal Hospital", "4 itens", "a partir de R$ 4,75"],
  ["Blox Fruits", "67 itens", "a partir de R$ 1,20"],
  ["Grow a Garden", "236 itens", "a partir de R$ 3,79"],
  ["Brookhaven", "20 itens", "a partir de R$ 1,44"],
  ["99 Nights in the Forest", "4 itens", "a partir de R$ 4,75"],
  ["Welcome to Bloxburg", "20 itens", "a partir de R$ 0,72"],
];

const reviews = [
  ["102030akl6", "Adoreiii! Terceira vez que compro aqui já."],
  ["Tay_rxxx", "O tutorial é bem explicadinho, amei. O site é fofo e organizado."],
  ["Aayumi_0", "Incrível demais!! Muito lindo e fácil de usar."],
  ["MyMelodyKawaii_64", "Gostei muito dos preços e da experiência."],
];

function KittyMark({ small = false }: { small?: boolean }) {
  return <div className={small ? "kitty-mark small" : "kitty-mark"} aria-label="Hello Kitty">
    <span className="ear left" /><span className="ear right" />
    <span className="eye left" /><span className="eye right" />
    <span className="nose" />
    <span className="whisker w1" /><span className="whisker w2" />
    <span className="bow">✦</span>
  </div>;
}

function Home() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [robux, setRobux] = useState(1000);
  const [cart, setCart] = useState(0);
  const price = useMemo(() => Math.max(4.8, robux * 0.048), [robux]);

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site">
      <div className="topbar">♡ Bem-vinda à Hello Kitty Store · pagamentos via PIX</div>

      <header className="header">
        <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X /> : <Menu />}</button>
        <button className="brand" onClick={() => scroll("inicio")}>
          <KittyMark small />
          <span><strong>Hello Kitty</strong><em>Store</em></span>
        </button>
        <nav className={menu ? "nav open" : "nav"}>
          <button onClick={() => scroll("inicio")}>Início</button>
          <button onClick={() => scroll("robux")}>Robux</button>
          <button onClick={() => scroll("catalogos")}>Catálogos</button>
          <button onClick={() => scroll("avaliacoes")}>Avaliações</button>
          <button onClick={() => scroll("entregas")}>Entregas</button>
          <button onClick={() => scroll("faq")}>Como funciona</button>
        </nav>
        <div className="header-actions">
          <div className="search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar" /></div>
          <button className="icon-btn" aria-label="Favoritos"><Heart size={19}/></button>
          <button className="cart-btn" onClick={() => setCart(cart + 1)}><ShoppingBag size={19}/><span>{cart}</span></button>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <div className="pill"><Sparkles size={14}/> Sua lojinha kawaii de Roblox</div>
            <h1>Seu universo Roblox,<br/><span>mais fofo.</span></h1>
            <p>Compre Robux e itens para seus jogos favoritos com uma experiência simples, delicada e segura.</p>
            <div className="hero-buttons">
              <button className="primary" onClick={() => scroll("catalogos")}>Ver catálogos</button>
              <button className="secondary" onClick={() => scroll("robux")}>Comprar Robux</button>
            </div>
            <div className="trust-row">
              <span><ShieldCheck size={17}/> Compra segura</span>
              <span><Clock3 size={17}/> Acompanhamento do pedido</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="spark s1">✦</div><div className="spark s2">♡</div>
            <div className="kitty-card"><KittyMark /><div className="ribbon">HELLO KITTY</div></div>
            <div className="floating-card"><strong>1.000 Robux</strong><span>por R$ 48,00 no PIX</span></div>
          </div>
        </section>

        <section className="stats">
          <div><strong>2023</strong><span>No mercado de Roblox</span></div>
          <div><strong>+10 mil</strong><span>Compras realizadas</span></div>
          <div><strong>+22 mil</strong><span>Entregas realizadas</span></div>
          <div><strong>40 mil</strong><span>Membros na comunidade</span></div>
        </section>

        <section id="robux" className="section robux-section">
          <div className="section-heading"><div><span className="eyebrow">ROBux VIA LINK</span><h2>A quantidade exata<br/>que você quer</h2></div><KittyMark small /></div>
          <div className="robux-box">
            <div className="robux-info"><div className="coin">R$</div><div><span>Você escolhe</span><strong>{robux.toLocaleString("pt-BR")} Robux</strong></div></div>
            <div className="price"><small>Você paga</small><strong>R$ {price.toFixed(2).replace(".", ",")}</strong></div>
            <input className="range" type="range" min="20" max="5000" step="10" value={robux} onChange={e => setRobux(Number(e.target.value))}/>
            <div className="quick-values">{[20,50,100,200,400,800,1000,1700,2500,3500,5000].map(v => <button className={robux === v ? "active" : ""} key={v} onClick={() => setRobux(v)}>{v.toLocaleString("pt-BR")}</button>)}</div>
            <div className="notice">1.000 Robux por R$ 48,00 · de 20 a 5.000 por pedido</div>
            <button className="primary wide" onClick={() => setCart(cart + 1)}>Continuar com {robux.toLocaleString("pt-BR")} Robux</button>
          </div>
        </section>

        <section id="catalogos" className="section">
          <div className="section-heading"><div><span className="eyebrow">CATÁLOGOS</span><h2>Escolha o seu jogo</h2></div><button className="link-btn">Ver todos <span>→</span></button></div>
          <div className="catalog-grid">
            {catalog.filter(([name]) => !search || name.toLowerCase().includes(search.toLowerCase())).map(([name,count,from], i) => (
              <button className="catalog-card" key={name} onClick={() => setCart(cart + 1)}>
                <div className={"game-icon i" + i}>{name.slice(0,1)}</div>
                <div><strong>{name}</strong><span>{count} · {from}</span></div>
                <ChevronDown size={18} className="arrow"/>
              </button>
            ))}
          </div>
        </section>

        <section id="avaliacoes" className="section reviews-section">
          <div className="section-heading centered"><span className="eyebrow">AVALIAÇÕES</span><h2>O que dizem os clientes</h2><p>Uma experiência pensada para ser simples do começo ao fim.</p></div>
          <div className="review-grid">{reviews.map(([user,text]) => <article className="review" key={user}><div className="avatar"><KittyMark small /></div><div className="stars">{Array.from({length:5}).map((_,i)=><Star key={i} size={15} fill="currentColor"/>)}</div><strong>{user}</strong><p>{text}</p></article>)}</div>
        </section>

        <section id="entregas" className="section steps-section">
          <div className="section-heading centered"><span className="eyebrow">COMO A ENTREGA FUNCIONA</span><h2>Rápido e prático</h2></div>
          <div className="steps">
            {[
              ["01","Você escolhe e paga no PIX","Escolha o produto, informe seu @ do Roblox e finalize o pagamento."],
              ["02","A gente entrega no jogo","Gamepasses e itens são enviados para sua conta, sem pedir sua senha."],
              ["03","Você acompanha aqui","Consulte o status do pedido e as orientações diretamente pelo site."]
            ].map(([n,t,d]) => <div className="step" key={n}><span className="step-number">{n}</span><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="faq-copy"><span className="eyebrow">DÚVIDAS</span><h2>Perguntas que a gente<br/>mais recebe</h2><p>Se ainda precisar de ajuda, fale com o suporte da loja.</p><button className="primary">Falar com suporte</button></div>
          <div className="faq-list">{[
            ["Preciso passar minha senha do Roblox?","Nunca. A compra deve funcionar sem compartilhar sua senha."],
            ["Quanto tempo demora a entrega?","O prazo depende do produto e aparece nas informações do pedido."],
            ["Como acompanho meu pedido?","Use a página do pedido para consultar o status e as orientações."],
            ["E se eu errar meu @?","Avise o suporte o quanto antes, antes da entrega ser concluída."]
          ].map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><KittyMark small/><strong>Hello Kitty Store</strong><p>Uma experiência kawaii para sua loja de Roblox.</p></div>
        <div><strong>Explorar</strong><button onClick={() => scroll("robux")}>Robux</button><button onClick={() => scroll("catalogos")}>Catálogos</button><button onClick={() => scroll("avaliacoes")}>Avaliações</button></div>
        <div><strong>Suporte</strong><button onClick={() => scroll("faq")}>Perguntas frequentes</button><button>Meus pedidos</button><button>Fale conosco</button></div>
      </footer>
      <div className="copyright">© 2026 Hello Kitty Store · Site independente, não afiliado à Roblox Corporation.</div>
    </div>
  );
}
