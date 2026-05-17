"use client";

import { useEffect } from "react";

const MODEL_CARDS = [
  {
    num: "01",
    title: "Você traz o conhecimento",
    desc: "Você domina um nicho de mercado. Conhece os problemas reais, fala a língua do cliente, entende o que falta. Esse é o ativo mais valioso do processo.",
  },
  {
    num: "02",
    title: "Nós construímos o produto",
    desc: "O Trivum entra com o desenvolvimento completo do SaaS e com a estratégia de marketing. Do MVP ao lançamento, cuidamos da parte técnica e de crescimento.",
  },
  {
    num: "03",
    title: "Crescemos juntos",
    desc: "A receita gerada pelo SaaS é dividida entre o especialista e o Trivum. É uma parceria real, com alinhamento de longo prazo e interesse genuíno no sucesso de cada produto.",
  },
];

const ESPECIALISTA_ITEMS = [
  ["Domínio do nicho", "conhecimento profundo do mercado, dos clientes e dos problemas reais que precisam de solução."],
  ["Presença pública", "o especialista é a face visível do produto. Aparece no conteúdo, nas campanhas e na comunicação com o mercado. Sua autoridade é o principal ativo de aquisição."],
  ["Validação de mercado", "participação ativa na fase de descoberta, com acesso à sua rede e audiência."],
  ["Co-investimento em marketing", "divisão dos custos de aquisição com base em plano aprovado em conjunto."],
  ["Engajamento contínuo", "presença ativa no desenvolvimento do produto e na relação com os primeiros clientes."],
];

const TRIVUM_ITEMS = [
  ["Desenvolvimento completo", "toda a engenharia do produto, do MVP ao lançamento, por conta do studio."],
  ["Estratégia de marketing", "posicionamento, aquisição, funil e crescimento, com foco em receita recorrente."],
  ["Estrutura operacional", "processos, métricas, ferramentas e suporte para escalar o negócio com consistência."],
  ["Visão de portfólio", "experiência em empreendedorismo digital e construção de produtos que geram valor real."],
];

const FASES = [
  { num: "01", name: "Prospecção e triagem", duration: "1–2 semanas", desc: "Primeiro contato, avaliação do nicho, do especialista e do potencial do produto. Decisão conjunta de avançar ou não." },
  { num: "02", name: "Validação de mercado", duration: "3–4 semanas", desc: "Entrevistas com potenciais clientes, landing page de espera e meta de pré-cadastros antes de qualquer linha de código." },
  { num: "03", name: "Contrato e estrutura", duration: "2–3 semanas", desc: "Formalização da parceria, definição de equity, vesting, propriedade intelectual e plano de marketing aprovado em conjunto." },
  { num: "04", name: "Construção do MVP", duration: "8–12 semanas", desc: "Desenvolvimento iterativo com testes reais, feedback de early adopters e ajustes antes do lançamento oficial." },
  { num: "05", name: "Lançamento e crescimento", duration: "Contínuo", desc: "Execução do plano de marketing, gestão de métricas, evolução do produto e expansão de funcionalidades com base nos dados reais." },
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".reveal, .fase-item")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    if (!cursor || !ring) return;

    let mouseX = 0,
      mouseY = 0,
      ringX = 0,
      ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(animate);

    const interactables = document.querySelectorAll("a, button");
    const onEnter = () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
      ring.style.width = "50px";
      ring.style.height = "50px";
    };
    const onLeave = () => {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    };
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Custom cursor — hidden on touch devices via CSS */}
      <div
        id="cursor"
        className="fixed w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-300 hidden md:block"
      />
      <div
        id="cursor-ring"
        className="fixed w-9 h-9 rounded-full border border-gold-line pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-300 hidden md:block"
      />

      {/* ─── Nav ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-6"
        style={{
          background: "linear-gradient(to bottom, rgba(8,8,8,0.9), transparent)",
          backdropFilter: "blur(2px)",
        }}
      >
        <a
          href="#"
          className="font-serif text-[22px] font-normal tracking-[0.1em] text-text no-underline"
        >
          TRI<span className="text-gold">V</span>UM
        </a>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
          Venture Studio
        </span>
      </nav>

      {/* ─── Hero ─── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-12 pt-[120px] pb-20"
      >
        {/* Triangle background */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-0 animate-fade-triangle pointer-events-none"
        >
          <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="300,60 540,480 60,480" stroke="rgba(201,168,76,0.06)" strokeWidth="1" fill="rgba(201,168,76,0.02)" />
            <polygon points="300,100 510,460 90,460" stroke="rgba(201,168,76,0.04)" strokeWidth="1" fill="none" />
            <polygon points="300,140 480,440 120,440" stroke="rgba(201,168,76,0.03)" strokeWidth="1" fill="none" />
            <polygon points="300,180 450,420 150,420" stroke="rgba(201,168,76,0.025)" strokeWidth="1" fill="none" />
            <circle cx="300" cy="60" r="3" fill="rgba(201,168,76,0.3)" />
            <circle cx="540" cy="480" r="3" fill="rgba(201,168,76,0.3)" />
            <circle cx="60" cy="480" r="3" fill="rgba(201,168,76,0.3)" />
          </svg>
        </div>

        <p
          className="relative z-10 font-mono text-[11px] tracking-[0.3em] uppercase text-gold mb-8 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.8s" }}
        >
          Venture Studio · trivum.app
        </p>

        <h1
          className="relative z-10 font-serif font-light leading-[0.9] tracking-[-0.02em] opacity-0 animate-slide-up"
          style={{
            fontSize: "clamp(80px, 15vw, 160px)",
            animationDelay: "1s",
          }}
        >
          TRI<em className="not-italic text-gold">V</em>UM
        </h1>

        <p
          className="mt-10 font-serif font-light italic tracking-[0.02em] text-text/60 opacity-0 animate-slide-up"
          style={{ fontSize: "clamp(18px, 2.5vw, 26px)", animationDelay: "1.2s" }}
        >
          Três forças. Um negócio.
        </p>

        <p
          className="mt-4 font-mono text-[13px] tracking-[0.15em] uppercase text-muted opacity-0 animate-slide-up"
          style={{ animationDelay: "1.4s" }}
        >
          Onde conhecimento vira produto
        </p>

        <div
          className="mt-14 opacity-0 animate-slide-up"
          style={{ animationDelay: "1.6s" }}
        >
          <a
            href="#modelo"
            className="group relative inline-flex items-center gap-3 px-9 py-4 border border-gold-line text-gold font-mono text-[11px] tracking-[0.2em] uppercase overflow-hidden transition-colors duration-300 hover:border-gold"
          >
            <span className="absolute inset-0 bg-gold-dim -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative">Conheça o modelo</span>
            <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
          style={{ animationDelay: "2.2s" }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted">
            Scroll
          </span>
        </div>
      </section>

      {/* ─── Origem ─── */}
      <section
        id="origem"
        className="max-w-[1200px] mx-auto px-12 py-[120px] border-t border-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <div className="eyebrow">A origem do nome</div>
            <h2 className="section-title">
              Onde três<br />
              <em>caminhos</em> se encontram
            </h2>
            <p className="text-[17px] leading-[1.8] text-text/75 mb-6">
              Na Roma antiga,{" "}
              <strong className="text-text font-medium">trivium</strong> era o
              cruzamento onde três estradas se uniam. Era o ponto de maior
              movimento, troca e geração de valor de uma cidade. Não era um
              lugar de passagem. Era onde as coisas aconteciam.
            </p>
            <p className="text-[17px] leading-[1.8] text-text/75">
              No Trivum, três caminhos se encontram: o{" "}
              <strong className="text-text font-medium">
                conhecimento do especialista
              </strong>
              , a{" "}
              <strong className="text-text font-medium">
                tecnologia do studio
              </strong>{" "}
              e o{" "}
              <strong className="text-text font-medium">mercado</strong> que
              está esperando uma solução. Quando os três se alinham, um novo
              negócio nasce.
            </p>
          </div>

          <div className="reveal flex justify-center items-center">
            <svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              overflow="visible"
            >
              <polygon
                points="140,20 260,220 20,220"
                stroke="rgba(201,168,76,0.4)"
                strokeWidth="1"
                fill="rgba(201,168,76,0.03)"
              />
              <circle cx="140" cy="20" r="6" fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.6)" strokeWidth="1" />
              <circle cx="260" cy="220" r="6" fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.6)" strokeWidth="1" />
              <circle cx="20" cy="220" r="6" fill="rgba(201,168,76,0.2)" stroke="rgba(201,168,76,0.6)" strokeWidth="1" />
              <circle cx="140" cy="153" r="4" fill="rgba(201,168,76,0.5)" />
              <circle cx="140" cy="153" r="12" fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="1" />
              <text x="140" y="8" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="9" fill="rgba(201,168,76,0.7)" letterSpacing="2">ESPECIALISTA</text>
              <text x="12" y="248" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="9" fill="rgba(201,168,76,0.7)" letterSpacing="2">TECNOLOGIA</text>
              <text x="268" y="248" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="9" fill="rgba(201,168,76,0.7)" letterSpacing="2">MARKETING</text>
              <text x="140" y="178" textAnchor="middle" fontFamily="var(--font-cormorant)" fontSize="13" fill="rgba(240,235,226,0.5)" letterSpacing="3">TRIVUM</text>
              <line x1="140" y1="26" x2="140" y2="141" stroke="rgba(201,168,76,0.15)" strokeWidth="1" strokeDasharray="3,4" />
              <line x1="254" y1="214" x2="146" y2="157" stroke="rgba(201,168,76,0.15)" strokeWidth="1" strokeDasharray="3,4" />
              <line x1="26" y1="214" x2="134" y2="157" stroke="rgba(201,168,76,0.15)" strokeWidth="1" strokeDasharray="3,4" />
            </svg>
          </div>
        </div>
      </section>

      {/* ─── Modelo ─── */}
      <section
        id="modelo"
        className="max-w-[1200px] mx-auto px-12 py-[120px] border-t border-border"
      >
        <div className="eyebrow reveal">Como funciona</div>
        <h2 className="section-title reveal">
          O modelo<br />
          <em>Trivum</em>
        </h2>

        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {MODEL_CARDS.map((card) => (
            <div
              key={card.num}
              className="group relative bg-bg hover:bg-surface px-9 py-12 transition-colors duration-300 reveal"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[400ms]" />
              <div
                className="font-serif text-[72px] font-light leading-none mb-6"
                style={{
                  WebkitTextStroke: "1px rgba(201,168,76,0.3)",
                  color: "transparent",
                }}
              >
                {card.num}
              </div>
              <h3 className="font-serif text-2xl font-normal mb-4 leading-snug">
                {card.title}
              </h3>
              <p className="text-sm leading-[1.8] text-text/55">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Parceria ─── */}
      <section
        id="parceria"
        className="max-w-[1200px] mx-auto px-12 py-[120px] border-t border-border"
      >
        <div className="eyebrow reveal">A parceria</div>
        <h2 className="section-title reveal">
          O que cada um<br />
          <em>traz</em> para a mesa
        </h2>

        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="reveal">
            <h3 className="font-serif text-[28px] font-light mb-8 pb-4 border-b border-border">
              O <em className="italic text-gold">especialista</em> entra com
            </h3>
            <ul className="flex flex-col gap-5">
              {ESPECIALISTA_ITEMS.map(([title, desc]) => (
                <li key={title} className="flex gap-4 items-start">
                  <div className="list-bullet" />
                  <p className="text-[15px] leading-[1.6] text-text/70">
                    <strong className="text-text font-medium">{title}</strong>{" "}
                    — {desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className="font-serif text-[28px] font-light mb-8 pb-4 border-b border-border">
              O <em className="italic text-gold">Trivum</em> entra com
            </h3>
            <ul className="flex flex-col gap-5">
              {TRIVUM_ITEMS.map(([title, desc]) => (
                <li key={title} className="flex gap-4 items-start">
                  <div className="list-bullet" />
                  <p className="text-[15px] leading-[1.6] text-text/70">
                    <strong className="text-text font-medium">{title}</strong>{" "}
                    — {desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Equity ─── */}
      <section
        id="equity"
        className="max-w-[1200px] mx-auto px-12 py-[120px] border-t border-border"
      >
        <div className="eyebrow reveal">Divisão de receita</div>
        <h2 className="section-title reveal">
          Uma parceria<br />
          <em>real</em>
        </h2>

        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="reveal flex justify-center">
            <svg width="260" height="260" viewBox="0 0 260 260" overflow="visible">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a84c" />
                  <stop offset="100%" stopColor="#a07830" />
                </linearGradient>
              </defs>
              <circle cx="130" cy="130" r="110" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="20" />
              <circle cx="130" cy="130" r="110" fill="none" stroke="url(#goldGrad)" strokeWidth="20" strokeDasharray="345.6 345.6" strokeDashoffset="0" strokeLinecap="butt" transform="rotate(-90 130 130)" opacity="0.9" />
              <circle cx="130" cy="130" r="110" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="20" strokeDasharray="345.6 345.6" strokeDashoffset="-345.6" strokeLinecap="butt" transform="rotate(-90 130 130)" />
              <text x="130" y="118" textAnchor="middle" fontFamily="var(--font-cormorant)" fontSize="42" fontWeight="300" fill="#c9a84c">50%</text>
              <text x="130" y="142" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="9" fill="rgba(240,235,226,0.6)" letterSpacing="2">ESPECIALISTA</text>
              <text x="130" y="162" textAnchor="middle" fontFamily="var(--font-dm-mono)" fontSize="9" fill="rgba(240,235,226,0.2)" letterSpacing="2">· 50% TRIVUM</text>
            </svg>
          </div>

          <div className="reveal flex flex-col gap-6">
            <div className="relative p-6 border border-gold-line bg-surface overflow-hidden hover:border-gold transition-colors duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold" />
              <div className="font-serif text-5xl font-light text-gold leading-none mb-1">
                50%
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-3">
                Especialista Parceiro
              </div>
              <p className="text-[13px] leading-[1.6] text-text/55">
                Metade de tudo que o produto gerar é seu. Para sempre. Você entra
                com o que nenhum investidor consegue comprar: o conhecimento real
                do mercado e a autoridade para comunicá-lo.
              </p>
            </div>
            <div className="relative p-6 border border-border bg-surface overflow-hidden hover:border-gold-line transition-colors duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-text/15" />
              <div className="font-serif text-5xl font-light text-text/45 leading-none mb-1">
                50%
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-3">
                Trivum Studio
              </div>
              <p className="text-[13px] leading-[1.6] text-text/55">
                Referente ao retorno sobre o desenvolvimento completo, a
                estratégia de marketing e a operação do produto ao longo do
                tempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Fases ─── */}
      <section
        id="fases"
        className="max-w-[1200px] mx-auto px-12 py-[120px] border-t border-border"
      >
        <div className="eyebrow reveal">O processo</div>
        <h2 className="section-title reveal">
          Da ideia ao<br />
          <em>produto</em> no mercado
        </h2>

        <div className="fases-timeline">
          {FASES.map((fase) => (
            <div key={fase.num} className="fase-item relative pb-12 pl-12">
              <div className="absolute left-[-5px] top-2 w-[11px] h-[11px] border border-gold bg-bg flex items-center justify-center">
                <span className="w-[5px] h-[5px] bg-gold block" />
              </div>
              <div className="flex items-baseline gap-4 mb-3 flex-wrap">
                <span className="font-mono text-[10px] tracking-[0.2em] text-gold">
                  {fase.num}
                </span>
                <span className="font-serif text-[22px] font-normal">
                  {fase.name}
                </span>
                <span className="font-mono text-[10px] text-muted ml-auto">
                  {fase.duration}
                </span>
              </div>
              <p className="text-sm leading-[1.7] text-text/55 max-w-[600px]">
                {fase.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contato ─── */}
      <section
        id="contato"
        className="max-w-[700px] mx-auto px-12 py-[120px] border-t border-border text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-6 reveal">
          <span className="w-10 h-px bg-gold-line block" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">
            Vamos conversar
          </span>
          <span className="w-10 h-px bg-gold-line block" />
        </div>

        <h2 className="section-title reveal">
          Seu conhecimento<br />
          merece virar um <em>produto</em>
        </h2>

        <p className="text-base leading-[1.7] text-text/55 mb-12 reveal">
          Se você domina um nicho e vê uma oportunidade real de resolver um
          problema com tecnologia, o Trivum pode ser o parceiro que faltava.
        </p>

        <div className="relative border border-border p-12 bg-surface reveal">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-0.5 bg-gold" />
          <a
            href="mailto:contato@trivum.app"
            className="font-serif text-[28px] font-light text-gold block mb-4 hover:opacity-70 transition-opacity duration-300"
          >
            contato@trivum.app
          </a>
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted">
            trivum.app · @trivum.app
          </span>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="px-12 py-10 border-t border-border flex flex-wrap justify-between items-center gap-4">
        <div className="font-serif text-[18px] font-light tracking-[0.1em] text-muted">
          TRI<span className="text-gold">V</span>UM
        </div>
        <div className="font-mono text-[10px] tracking-[0.15em] text-muted">
          © 2026 Trivum Venture Studio · @trivum.app
        </div>
      </footer>
    </>
  );
}
