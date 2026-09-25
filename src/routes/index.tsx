import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useEffect, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const bannerImage = "/hello-kitty-banner.jpg";
const robuxBannerImage = "/hello-kitty-robux-banner.png";
const logoImage = "/hello-kitty-store-logo.png";

const packages = [
  { amount: 400, price: 19.9 },
  { amount: 800, price: 39.9 },
  { amount: 1000, price: 48, featured: true },
  { amount: 1700, price: 79.9 },
  { amount: 2500, price: 119.9 },
  { amount: 5000, price: 239.9 },
];

const activityItems = [
  { name: "Luan", amount: "400 Robux", price: "R$ 19,90" },
  { name: "Davi", amount: "800 Robux", price: "R$ 39,90" },
  { name: "Miguel", amount: "1.000 Robux", price: "R$ 48,00" },
  { name: "Arthur", amount: "1.700 Robux", price: "R$ 79,90" },
  { name: "Theo", amount: "2.500 Robux", price: "R$ 119,90" },
];

const money = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;
const robux = (value: number) => value.toLocaleString("pt-BR");

function Home() {
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState(1000);
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(0);
  const [activityIndex, setActivityIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const saved = Number(window.localStorage.getItem("hk_activity_index"));
    return Number.isFinite(saved) ? (saved + 1) % activityItems.length : 0;
  });
  const [activityVisible, setActivityVisible] = useState(true);

  const current = packages.find((item) => item.amount === selected) ?? packages[2];
  const customPrice = useMemo(() => Math.max(4.9, custom * 0.048), [custom]);

  useEffect(() => {
    window.localStorage.setItem("hk_activity_index", String(activityIndex));
    let showTimer: number | undefined;
    const cycleTimer = window.setTimeout(() => {
      setActivityVisible(false);
      showTimer = window.setTimeout(() => {
        setActivityIndex((value) => (value + 1) % activityItems.length);
        setActivityVisible(true);
      }, 900);
    }, 11500);
    return () => {
      window.clearTimeout(cycleTimer);
      if (showTimer) window.clearTimeout(showTimer);
    };
  }, [activityIndex]);

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const addToCart = () => setCart((value) => value + 1);
  const activity = activityItems[activityIndex];

  return (
    <div className="store">
      <div className="notice-bar">LOJA DE ROBUX · HELLO KITTY STORE</div>

      <header className="site-header">
        <button className="wordmark" onClick={() => scroll("inicio")} aria-label="Ir para o início">
          <img src={logoImage} alt="Hello Kitty Store" />
        </button>

        <nav className={menu ? "main-nav open" : "main-nav"}>
          <button onClick={() => scroll("inicio")}>Início</button>
          <button onClick={() => scroll("robux")}>Robux</button>
          <button onClick={() => scroll("como-funciona")}>Como funciona</button>
          <button onClick={() => scroll("duvidas")}>Dúvidas</button>
        </nav>

        <div className="header-actions">
          <button className="search-button" onClick={() => scroll("robux")}>Buscar</button>
          <button className="cart" onClick={addToCart}>Carrinho <span>{cart}</span></button>
          <button className="mobile-toggle" onClick={() => setMenu(!menu)} aria-label="Abrir menu">Menu</button>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-background" />
          <div className="hero-content">
            <span className="hero-kicker">HELLO KITTY STORE</span>
            <h1>Sua loja<br /><strong>de Robux</strong></h1>
            <p>Escolha a quantidade de Robux que você quer e encontre seu pacote de forma simples e rápida.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scroll("robux")}>Ver Robux</button>
              <button className="secondary-button" onClick={() => scroll("como-funciona")}>Como funciona</button>
            </div>
            <div className="hero-features">
              <span>Pagamento no PIX</span>
              <span>Pedido simples</span>
              <span>Suporte ao cliente</span>
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <div><strong>1.000 Robux</strong><span>R$ 48,00</span></div>
          <div><strong>Escolha sua quantidade</strong><span>De 20 a 5.000 Robux</span></div>
          <div><strong>Hello Kitty Store</strong><span>Uma experiência simples para comprar</span></div>
        </section>

        <section id="robux" className="robux-section">
          <div className="section-heading centered">
            <span>ROBUX</span>
            <h2>A quantidade exata que você quer</h2>
            <p>Selecione um pacote ou ajuste a quantidade manualmente.</p>
          </div>

          <div className="robux-layout">
            <div className="robux-visual">
              <img src={robuxBannerImage} alt="Hello Kitty Store" />
            </div>

            <div className="robux-panel">
              <div className="robux-panel-top">
                <span>QUANTIDADE</span>
                <strong>{robux(custom)} Robux</strong>
              </div>

              <input
                className="robux-range"
                type="range"
                min="20"
                max="5000"
                step="10"
                value={custom}
                onChange={(event) => setCustom(Number(event.target.value))}
                aria-label="Quantidade de Robux"
              />

              <div className="range-values">
                <span>20</span><span>1.250</span><span>2.500</span><span>3.750</span><span>5.000</span>
              </div>

              <div className="quick-grid">
                {[20, 50, 100, 200, 400, 800, 1000, 1700, 2500, 3500, 5000].map((amount) => (
                  <button key={amount} className={custom === amount ? "quick active" : "quick"} onClick={() => setCustom(amount)}>
                    {robux(amount)}
                  </button>
                ))}
              </div>

              <div className="custom-total">
                <span>Você paga</span>
                <strong>{money(customPrice)}</strong>
              </div>

              <button className="primary-button full" onClick={addToCart}>Continuar com {robux(custom)} Robux</button>
            </div>
          </div>

          <div className="package-area">
            <div className="section-heading">
              <span>ESCOLHA UM PACOTE</span>
              <h2>Pacotes de Robux</h2>
            </div>
            <div className="packages">
              {packages.map((item) => (
                <button
                  key={item.amount}
                  className={selected === item.amount ? "package selected" : "package"}
                  onClick={() => {
                    setSelected(item.amount);
                    setCustom(item.amount);
                  }}
                >
                  {item.featured && <span className="package-badge">MAIS ESCOLHIDO</span>}
                  <strong>{robux(item.amount)} Robux</strong>
                  <span>{money(item.price)}</span>
                  <small>Selecionar</small>
                </button>
              ))}
            </div>
            <div className="selected-line">
              <span>{robux(current.amount)} Robux</span>
              <strong>{money(current.price)}</strong>
              <button onClick={addToCart}>Continuar</button>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="how-section">
          <div className="section-heading centered">
            <span>COMO FUNCIONA</span>
            <h2>Rápido e prático</h2>
            <p>Um fluxo simples para escolher, conferir e acompanhar seu pedido.</p>
          </div>
          <div className="steps">
            <article><b>01</b><h3>Você escolhe</h3><p>Selecione a quantidade de Robux que deseja no site.</p></article>
            <article><b>02</b><h3>Você confere</h3><p>Confira a quantidade e o valor antes de continuar.</p></article>
            <article><b>03</b><h3>Você acompanha</h3><p>Use as informações do pedido para acompanhar o atendimento.</p></article>
          </div>
        </section>

        <section className="feature-section">
          <div className="feature-image"><img src={bannerImage} alt="Hello Kitty Store" /></div>
          <div className="feature-copy">
            <span>HELLO KITTY STORE</span>
            <h2>Uma loja feita para deixar tudo mais simples.</h2>
            <p>Visual limpo, seleção rápida e informações claras para você encontrar o pacote de Robux que procura.</p>
            <button className="dark-button" onClick={() => scroll("robux")}>Escolher Robux</button>
          </div>
        </section>

        <section id="duvidas" className="faq-section">
          <div className="section-heading centered">
            <span>PERGUNTAS FREQUENTES</span>
            <h2>Fala com a gente</h2>
          </div>
          <div className="faq-list">
            <details><summary>Preciso passar minha senha do Roblox?</summary><p>Nunca compartilhe sua senha. O site não deve solicitar sua senha para uma compra.</p></details>
            <details><summary>Posso escolher uma quantidade personalizada?</summary><p>Sim. O seletor permite escolher entre 20 e 5.000 Robux.</p></details>
            <details><summary>Como acompanho meu pedido?</summary><p>Guarde as informações apresentadas durante o processo de compra e use o canal de atendimento da loja.</p></details>
            <details><summary>Essa loja é oficial da Roblox ou da Sanrio?</summary><p>Não. A Hello Kitty Store é uma loja independente e não declara afiliação oficial com Roblox ou Sanrio.</p></details>
          </div>
        </section>
      </main>

      <div className={activityVisible ? "activity-popup visible" : "activity-popup"} aria-live="polite">
        <img className="activity-logo" src={logoImage} alt="" />
        <div className="activity-info">
          <span>HELLO KITTY STORE</span>
          <strong>{activity.name} escolheu</strong>
          <small>{activity.amount} por {activity.price}</small>
        </div>
        <button className="activity-close" onClick={() => setActivityVisible(false)} aria-label="Fechar aviso">X</button>
      </div>

      <footer className="footer">
        <div className="footer-brand">
          <img src={logoImage} alt="Hello Kitty Store" />
          <div><strong>Hello Kitty Store</strong><p>Sua loja de Robux.</p></div>
        </div>
        <div>
          <h4>Navegação</h4>
          <button onClick={() => scroll("inicio")}>Início</button>
          <button onClick={() => scroll("robux")}>Robux</button>
          <button onClick={() => scroll("como-funciona")}>Como funciona</button>
          <button onClick={() => scroll("duvidas")}>Dúvidas</button>
        </div>
        <div>
          <h4>Atendimento</h4>
          <p>Confira as informações do seu pedido e utilize o canal de suporte disponibilizado pela loja.</p>
        </div>
        <div className="footer-note">
          <p>Hello Kitty e suas imagens são marcas e propriedades de seus respectivos titulares. Este site não declara afiliação oficial com Roblox ou Sanrio.</p>
          <small>© 2026 Hello Kitty Store</small>
        </div>
      </footer>
    </div>
  );
}
