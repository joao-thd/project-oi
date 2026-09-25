import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  X,
  Minus,
  Plus,
  ShieldCheck,
  CreditCard,
  PackageCheck,
} from "lucide-react";

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

const quickAmounts = [20, 50, 100, 200, 400, 800, 1000, 1700, 2500, 3500, 5000];

const money = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;
const formatRobux = (value: number) => value.toLocaleString("pt-BR");

type CartItem = {
  id: number;
  amount: number;
  price: number;
  quantity: number;
};

function Home() {
  const [custom, setCustom] = useState(1000);
  const [selected, setSelected] = useState(1000);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const customPrice = useMemo(() => {
    const exactPackage = packages.find((item) => item.amount === custom);
    return exactPackage?.price ?? Math.max(4.9, custom * 0.048);
  }, [custom]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const saved = window.localStorage.getItem("hello_kitty_store_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        window.localStorage.removeItem("hello_kitty_store_cart");
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("hello_kitty_store_cart", JSON.stringify(cart));
  }, [cart]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const addToCart = (amount: number, price: number) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === amount);
      if (existing) {
        return current.map((item) =>
          item.id === amount ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { id: amount, amount, price, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const selectPackage = (amount: number, price: number) => {
    setSelected(amount);
    setCustom(amount);
    addToCart(amount, price);
  };

  return (
    <div className="store">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>LOJA DE ROBUX</span>
          <span>Pagamento via PIX</span>
          <span>Suporte ao cliente</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <button className="brand" onClick={() => scrollTo("inicio")} aria-label="Ir para o início">
            <img src={logoImage} alt="Hello Kitty Store" />
          </button>

          <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`}>
            <button onClick={() => scrollTo("inicio")}>Início</button>
            <button onClick={() => scrollTo("robux")}>Robux</button>
            <button onClick={() => scrollTo("produtos")}>Produtos</button>
            <button onClick={() => scrollTo("avaliacoes")}>Avaliações</button>
            <button onClick={() => scrollTo("como-funciona")}>Como funciona</button>
            <button onClick={() => scrollTo("suporte")}>Suporte</button>
          </nav>

          <div className="header-actions">
            <button
              className={`icon-button search-trigger ${searchOpen ? "active" : ""}`}
              onClick={() => setSearchOpen((value) => !value)}
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho">
              <ShoppingCart size={18} strokeWidth={1.8} />
              <span>Carrinho</span>
              {cartCount > 0 && <b>{cartCount}</b>}
            </button>

            <button
              className="mobile-menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="search-panel">
            <div className="container search-panel-inner">
              <Search size={17} />
              <input autoFocus placeholder="Buscar Robux ou produtos..." aria-label="Buscar produtos" />
              <button onClick={() => setSearchOpen(false)} aria-label="Fechar busca"><X size={17} /></button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">HELLO KITTY STORE</span>
              <h1>Robux de um jeito <strong>simples.</strong></h1>
              <p>
                Escolha a quantidade de Robux, confira o valor e siga para a compra.
                Uma experiência direta, limpa e feita para você encontrar o que procura.
              </p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => scrollTo("robux")}>Comprar Robux</button>
                <button className="btn btn-outline" onClick={() => scrollTo("como-funciona")}>Como funciona</button>
              </div>
              <div className="hero-points">
                <span><ShieldCheck size={15} /> Compra simples</span>
                <span><CreditCard size={15} /> PIX</span>
                <span><PackageCheck size={15} /> Acompanhamento</span>
              </div>
            </div>

            <div className="hero-media">
              <img src={bannerImage} alt="Hello Kitty Store" />
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            <div><strong>Seleção rápida</strong><span>Pacotes e quantidade personalizada</span></div>
            <div><strong>Informação clara</strong><span>Valor visível antes de continuar</span></div>
            <div><strong>Sem senha</strong><span>Nunca compartilhe sua senha do Roblox</span></div>
          </div>
        </section>

        <section id="robux" className="section robux-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">ROBUX</span>
                <h2>A quantidade que você quer</h2>
              </div>
              <p>Escolha um pacote ou ajuste a quantidade manualmente.</p>
            </div>

            <div className="robux-builder">
              <div className="robux-builder-media">
                <img src={robuxBannerImage} alt="Robux" />
              </div>

              <div className="robux-builder-content">
                <div className="amount-heading">
                  <span>QUANTIDADE</span>
                  <strong>{formatRobux(custom)} Robux</strong>
                </div>

                <input
                  className="range"
                  type="range"
                  min="20"
                  max="5000"
                  step="10"
                  value={custom}
                  onChange={(event) => setCustom(Number(event.target.value))}
                  aria-label="Quantidade de Robux"
                />

                <div className="range-labels">
                  <span>20</span><span>1.250</span><span>2.500</span><span>3.750</span><span>5.000</span>
                </div>

                <div className="amount-grid">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      className={custom === amount ? "amount-option active" : "amount-option"}
                      onClick={() => setCustom(amount)}
                    >
                      {formatRobux(amount)}
                    </button>
                  ))}
                </div>

                <div className="builder-footer">
                  <div>
                    <span>Você paga</span>
                    <strong>{money(customPrice)}</strong>
                  </div>
                  <button className="btn btn-primary" onClick={() => addToCart(custom, customPrice)}>
                    Comprar agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="produtos" className="section products-section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">PRODUTOS</span>
                <h2>Pacotes de Robux</h2>
              </div>
              <button className="text-link" onClick={() => scrollTo("robux")}>Ver quantidade personalizada</button>
            </div>

            <div className="product-grid">
              {packages.map((item) => (
                <article key={item.amount} className={`product-card ${selected === item.amount ? "selected" : ""}`}>
                  <div className="product-image">
                    <img src={robuxBannerImage} alt="" />
                    {item.featured && <span className="product-badge">MAIS ESCOLHIDO</span>}
                  </div>
                  <div className="product-body">
                    <span className="product-type">ROBUX</span>
                    <h3>{formatRobux(item.amount)} Robux</h3>
                    <p>Pacote de {formatRobux(item.amount)} Robux.</p>
                    <div className="product-bottom">
                      <strong>{money(item.price)}</strong>
                      <button onClick={() => selectPackage(item.amount, item.price)}>Comprar</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="section how-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">COMO FUNCIONA</span>
              <h2>Três passos para comprar</h2>
              <p>Sem etapas desnecessárias na interface.</p>
            </div>

            <div className="steps-grid">
              <article className="step-card">
                <span>01</span>
                <h3>Escolha seu produto</h3>
                <p>Selecione um pacote de Robux ou use a quantidade personalizada.</p>
              </article>
              <article className="step-card">
                <span>02</span>
                <h3>Realize o pagamento</h3>
                <p>Confira o resumo e continue para o sistema de pagamento da loja.</p>
              </article>
              <article className="step-card">
                <span>03</span>
                <h3>Receba e acompanhe</h3>
                <p>Use as informações do seu pedido para acompanhar o atendimento.</p>
              </article>
            </div>

            <div className="security-note">
              <ShieldCheck size={20} />
              <div>
                <strong>Nunca compartilhe sua senha do Roblox.</strong>
                <span>Uma loja legítima não precisa da sua senha para concluir uma compra.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="avaliacoes" className="reviews-section">
          <div className="container reviews-empty">
            <span className="eyebrow">AVALIAÇÕES</span>
            <h2>Experiências reais dos clientes</h2>
            <p>As avaliações serão exibidas aqui quando os dados reais do sistema estiverem disponíveis.</p>
          </div>
        </section>

        <section className="feature-banner">
          <div className="container feature-grid">
            <div className="feature-image">
              <img src={bannerImage} alt="Hello Kitty Store" />
            </div>
            <div className="feature-content">
              <span className="eyebrow">UMA EXPERIÊNCIA MAIS LIMPA</span>
              <h2>Encontre o que procura sem complicação.</h2>
              <p>Interface organizada, preços destacados e um fluxo de compra pensado para funcionar bem também no celular.</p>
              <button className="btn btn-white" onClick={() => scrollTo("produtos")}>Ver produtos</button>
            </div>
          </div>
        </section>

        <section id="suporte" className="section faq-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">SUPORTE</span>
              <h2>Dúvidas frequentes</h2>
            </div>

            <div className="faq-list">
              <details>
                <summary>Como comprar? <ChevronDown size={17} /></summary>
                <p>Escolha um produto, confira o valor, adicione ao carrinho e continue para o processo de pagamento disponível na loja.</p>
              </details>
              <details>
                <summary>Como recebo meu pedido? <ChevronDown size={17} /></summary>
                <p>As informações de entrega e acompanhamento devem seguir o fluxo do pedido apresentado pelo sistema da loja.</p>
              </details>
              <details>
                <summary>Preciso informar minha senha do Roblox? <ChevronDown size={17} /></summary>
                <p>Não. Nunca compartilhe sua senha ou códigos de verificação.</p>
              </details>
              <details>
                <summary>Como acompanho meu pedido? <ChevronDown size={17} /></summary>
                <p>Se o sistema de pedidos estiver conectado, utilize o número ou link do pedido fornecido após a compra.</p>
              </details>
              <details>
                <summary>Quais formas de pagamento estão disponíveis? <ChevronDown size={17} /></summary>
                <p>O fluxo atual da interface destaca PIX. As opções efetivamente disponíveis devem ser definidas pela integração de pagamento da loja.</p>
              </details>
              <details>
                <summary>O que acontece se eu informar algum dado errado? <ChevronDown size={17} /></summary>
                <p>Procure o suporte da loja o quanto antes e informe o número do pedido para que o atendimento possa verificar o caso.</p>
              </details>
              <details>
                <summary>Menores de idade podem comprar? <ChevronDown size={17} /></summary>
                <p>Compras por menores devem ser realizadas com autorização e supervisão do responsável legal, quando aplicável.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={logoImage} alt="Hello Kitty Store" />
            <strong>Hello Kitty Store</strong>
            <p>Loja de Robux com uma experiência simples e objetiva.</p>
          </div>

          <div className="footer-column">
            <h4>Navegação</h4>
            <button onClick={() => scrollTo("inicio")}>Início</button>
            <button onClick={() => scrollTo("robux")}>Robux</button>
            <button onClick={() => scrollTo("produtos")}>Produtos</button>
            <button onClick={() => scrollTo("como-funciona")}>Como funciona</button>
          </div>

          <div className="footer-column">
            <h4>Suporte</h4>
            <button onClick={() => scrollTo("suporte")}>Perguntas frequentes</button>
            <button onClick={() => setCartOpen(true)}>Meu carrinho</button>
            <button onClick={() => scrollTo("avaliacoes")}>Avaliações</button>
          </div>

          <div className="footer-legal">
            <h4>Informações</h4>
            <p>Nunca compartilhe sua senha do Roblox.</p>
            <p>Hello Kitty e suas imagens são marcas e propriedades de seus respectivos titulares. Este site não declara afiliação oficial com Roblox ou Sanrio.</p>
            <small>© 2026 Hello Kitty Store</small>
          </div>
        </div>
      </footer>

      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`cart-drawer ${cartOpen ? "open" : ""`} aria-label="Carrinho">
        <div className="cart-drawer-header">
          <div>
            <span className="eyebrow">SEU PEDIDO</span>
            <h2>Carrinho</h2>
          </div>
          <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fechar carrinho"><X size={20} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={34} />
            <strong>Seu carrinho está vazio.</strong>
            <p>Escolha um pacote para começar.</p>
            <button className="btn btn-primary" onClick={() => { setCartOpen(false); scrollTo("produtos"); }}>Ver produtos</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={robuxBannerImage} alt="" />
                  <div className="cart-item-info">
                    <strong>{formatRobux(item.amount)} Robux</strong>
                    <span>{money(item.price)}</span>
                    <div className="quantity">
                      <button onClick={() => changeQuantity(item.id, -1)} aria-label="Diminuir"><Minus size={13} /></button>
                      <b>{item.quantity}</b>
                      <button onClick={() => changeQuantity(item.id, 1)} aria-label="Aumentar"><Plus size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div>
              <div className="cart-total"><span>Total</span><strong>{money(cartTotal)}</strong></div>
              <button className="btn btn-primary full-width" onClick={() => alert("Conecte aqui o checkout/pagamento já existente da loja.")}>Continuar</button>
              <small>O checkout existente da loja deve ser conectado a este botão.</small>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
