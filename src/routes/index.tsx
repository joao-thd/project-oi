import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const publicHelloKitty = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hello_kitty.jpg";
const publicRobux = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Robux.jpg";

const packages = [
  { amount: 400, price: 19.90, label: "400 Robux" },
  { amount: 800, price: 39.90, label: "800 Robux" },
  { amount: 1000, price: 48.00, label: "1.000 Robux", featured: true },
  { amount: 1700, price: 79.90, label: "1.700 Robux" },
  { amount: 2500, price: 119.90, label: "2.500 Robux" },
  { amount: 5000, price: 239.90, label: "5.000 Robux" },
];

function Home() {
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState(1000);
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(0);

  const current = packages.find((item) => item.amount === selected);
  const customPrice = useMemo(() => Math.max(4.90, custom * 0.048), [custom]);

  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const addToCart = () => setCart((value) => value + 1);

  return (
    <div className="store">
      <div className="notice-bar">HELLO KITTY STORE</div>

      <header className="site-header">
        <button className="wordmark" onClick={() => scroll("inicio")} aria-label="Ir para o início">
          <span>HELLO KITTY</span>
          <small>STORE</small>
        </button>

        <button className="mobile-toggle" onClick={() => setMenu(!menu)} aria-label="Abrir menu">
          MENU
        </button>

        <nav className={menu ? "main-nav open" : "main-nav"}>
          <button onClick={() => scroll("inicio")}>Início</button>
          <button onClick={() => scroll("robux")}>Robux</button>
          <button onClick={() => scroll("comprar")}>Comprar</button>
          <button onClick={() => scroll("duvidas")}>Dúvidas</button>
        </nav>

        <button className="cart" onClick={addToCart}>
          CARRINHO <span>{cart}</span>
        </button>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-background" />
          <div className="hero-content">
            <div className="hero-label">HELLO KITTY</div>
            <h1>SEU ROBUX<br /><span>DO SEU JEITO</span></h1>
            <p>Escolha a quantidade de Robux e faça seu pedido de forma simples.</p>
            <button className="hero-button" onClick={() => scroll("robux")}>COMPRAR ROBUX</button>
          </div>
          <div className="hero-character">
            <img src={publicHelloKitty} alt="Hello Kitty" />
          </div>
        </section>

        <section className="pink-strip">
          <div>ROBux</div>
          <strong>COMPRE ROBUX</strong>
          <div>HELLO KITTY</div>
        </section>

        <section id="robux" className="section">
          <div className="section-title">
            <span>ROBux</span>
            <h2>ESCOLHA SEUS ROBUX</h2>
            <p>Pacotes claros, preços visíveis e pagamento simples.</p>
          </div>

          <div className="packages">
            {packages.map((item) => (
              <button
                key={item.amount}
                className={selected === item.amount ? "package selected" : "package"}
                onClick={() => setSelected(item.amount)}
              >
                {item.featured && <span className="package-label">MAIS PEDIDO</span>}
                <img src={publicRobux} alt="" />
                <strong>{item.label}</strong>
                <span>R$ {item.price.toFixed(2).replace(".", ",")}</span>
                <small>SELECIONAR</small>
              </button>
            ))}
          </div>

          <div className="selected-box">
            <div>
              <span>SELECIONADO</span>
              <strong>{current?.label}</strong>
            </div>
            <div className="selected-price">
              R$ {current?.price.toFixed(2).replace(".", ",")}
            </div>
            <button onClick={addToCart}>CONTINUAR</button>
          </div>
        </section>

        <section id="comprar" className="section custom-section">
          <div className="custom-image">
            <img src={publicHelloKitty} alt="Hello Kitty" />
          </div>
          <div className="custom-content">
            <span>QUANTIDADE PERSONALIZADA</span>
            <h2>ESCOLHA A QUANTIDADE</h2>
            <p>Use o controle para selecionar a quantidade de Robux que deseja.</p>
            <div className="custom-number">{custom.toLocaleString("pt-BR")} ROBUX</div>
            <input
              type="range"
              min="20"
              max="5000"
              step="10"
              value={custom}
              onChange={(event) => setCustom(Number(event.target.value))}
            />
            <div className="range-labels"><span>20</span><span>5.000</span></div>
            <div className="custom-price">
              <span>VALOR</span>
              <strong>R$ {customPrice.toFixed(2).replace(".", ",")}</strong>
            </div>
            <button className="dark-button" onClick={addToCart}>COMPRAR {custom.toLocaleString("pt-BR")} ROBUX</button>
          </div>
        </section>

        <section className="section process">
          <div className="section-title">
            <span>COMO FUNCIONA</span>
            <h2>COMPRAR ROBUX É SIMPLES</h2>
          </div>
          <div className="process-grid">
            <article><strong>01</strong><h3>ESCOLHA</h3><p>Selecione um pacote ou escolha uma quantidade personalizada.</p></article>
            <article><strong>02</strong><h3>PAGUE</h3><p>Confira o pedido e siga as instruções de pagamento.</p></article>
            <article><strong>03</strong><h3>RECEBA</h3><p>Após a confirmação, siga as instruções de entrega do pedido.</p></article>
          </div>
        </section>

        <section id="duvidas" className="section faq">
          <div className="section-title">
            <span>AJUDA</span>
            <h2>DÚVIDAS SOBRE ROBUX</h2>
          </div>
          <div className="faq-list">
            <details><summary>Preciso informar minha senha?</summary><p>Não compartilhe sua senha. O processo deve usar somente os dados necessários para a entrega.</p></details>
            <details><summary>Posso escolher qualquer quantidade?</summary><p>Sim. Na quantidade personalizada, escolha entre 20 e 5.000 Robux.</p></details>
            <details><summary>Como acompanho o pedido?</summary><p>Use o canal de atendimento informado pela loja após a compra.</p></details>
            <details><summary>O site é da Roblox?</summary><p>Não. A Hello Kitty Store é uma loja independente.</p></details>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>HELLO KITTY STORE</strong>
          <p>Loja independente de Robux.</p>
        </div>
        <div>
          <button onClick={() => scroll("robux")}>Robux</button>
          <button onClick={() => scroll("comprar")}>Comprar</button>
          <button onClick={() => scroll("duvidas")}>Dúvidas</button>
        </div>
        <div className="footer-note">
          Hello Kitty e suas imagens são marcas e propriedades de seus respectivos titulares. Este site não declara afiliação oficial com Roblox ou Sanrio.
        </div>
      </footer>
    </div>
  );
}
