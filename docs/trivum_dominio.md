# Trivum — Documento de Domínio
> Referência para desenvolvimento da landing page. Versão 1.0 · Mai 2026

---

## O que é o Trivum

Trivum é um venture studio especializado na criação de produtos SaaS em diferentes nichos de mercado. O modelo une especialistas de nicho com capacidade técnica e de marketing para construir negócios digitais recorrentes do zero.

O nome vem do latim *trivium*, o cruzamento onde três estradas se encontravam na Roma antiga — o ponto de maior troca e geração de valor. No Trivum, três forças se encontram: o especialista, a tecnologia e o marketing.

---

## Modelo de Negócio

O Trivum opera como venture studio com o seguinte modelo base:

**O especialista entra com:**
- Conhecimento profundo do nicho de mercado
- Presença pública — é a face visível do produto nas ações de marketing
- Validação de mercado — acesso à sua rede e audiência
- Co-investimento nos custos de marketing, com base em plano aprovado em conjunto
- Engajamento contínuo no desenvolvimento do produto

**O Trivum entra com:**
- Desenvolvimento completo do SaaS (100% dos custos de desenvolvimento)
- Estratégia de marketing e execução
- Estrutura operacional — processos, métricas e ferramentas
- Visão de portfólio e experiência em empreendedorismo digital

**Divisão de receita:**
- 50% para o especialista parceiro
- 50% para o Trivum Studio

**Divisão de custos de marketing:**
- Divididos entre as partes com base em plano aprovado em conjunto

---

## Pipeline de 5 Fases

1. **Prospecção e triagem** (1–2 semanas) — avaliação do especialista e do nicho via scorecard. Decisão go/no-go antes de qualquer investimento.
2. **Validação de mercado** (3–4 semanas) — entrevistas com potenciais clientes, landing page de espera e meta de pré-cadastros. Nenhuma linha de código antes da validação.
3. **Contrato e estrutura** (2–3 semanas) — formalização da parceria, equity, vesting com cliff, propriedade intelectual e plano de marketing.
4. **Construção do MVP** (8–12 semanas) — desenvolvimento iterativo, testes com early adopters e ajustes antes do lançamento.
5. **Lançamento e crescimento** (contínuo) — execução do plano de marketing, gestão de métricas e evolução do produto.

---

## Perfil do Especialista Ideal

- Domina um nicho de mercado com profundidade
- Tem autoridade reconhecida ou audiência ativa no nicho
- Identifica um problema real sem solução digital adequada
- Está disposto a ser a face pública do produto
- Tem disponibilidade e engajamento para participar ativamente

---

## Identidade de Marca

**Nome:** Trivum  
**Categoria:** Venture Studio  
**Tagline:** Três forças. Um negócio.  
**Posicionamento:** Transformamos conhecimento especializado em SaaS.

**Tom de voz:**
- Direto — sem rodeios, sem jargão desnecessário
- Confiante sem arrogância — o especialista é o protagonista do nicho
- Humano e próximo — parceria real entre pessoas com objetivos alinhados
- Orientado a resultado — cada comunicação aponta para algo concreto

**Paleta de cores:**
- Fundo principal: `#080808` (preto profundo)
- Texto principal: `#f0ebe2` (off-white quente)
- Dourado principal: `#c9a84c`
- Dourado claro: `#d4a843`
- Dourado escuro: `#a07830`
- Superfície: `#111111`
- Texto secundário: `#6b6560`
- Bordas e linhas: `rgba(255,255,255,0.08)`

**Tipografia:**
- Títulos e elementos editoriais: Cormorant Garamond (serif, elegante, peso 300–600)
- Corpo e UI: Outfit (sans-serif, peso 300–500)
- Labels, rótulos e código: DM Mono (monospace, peso 300–400)

**Elemento visual central:** Triângulo dourado com três vértices representando especialista, tecnologia e marketing — conectados ao centro por linhas tracejadas.

---

## Presença Digital

| Canal | Endereço |
|---|---|
| Site principal | trivum.app |
| Instagram | @trivum.app |
| E-mail | contato@trivum.app |

---

## Estrutura da Landing Page (referência)

A página de apresentação já construída em HTML segue esta estrutura de seções:

1. **Hero** — nome, tagline "Três forças. Um negócio.", subtítulo "Onde conhecimento vira produto", CTA para conhecer o modelo
2. **Origem** — história do nome (trivium romano), triângulo com os três vértices
3. **Modelo** — três cards: "Você traz o conhecimento", "Nós construímos o produto", "Crescemos juntos"
4. **Parceria** — duas colunas: o que o especialista traz vs o que o Trivum traz
5. **Equity** — gráfico circular 50/50 com ênfase no 50% do especialista
6. **Processo** — timeline vertical com as 5 fases
7. **Contato** — CTA final com e-mail e links

---

## Contexto dos Fundadores

O Trivum é fundado por dois sócios com competências complementares:
- Desenvolvimento de aplicativos e produtos digitais
- Empreendedorismo e gestão de negócios
- Marketing digital e estratégia de crescimento

O studio busca ativamente especialistas em áreas diversas para formar parcerias de co-fundação, com foco inicial no mercado brasileiro.

---

## Observações para Desenvolvimento

- O tema visual é **escuro e fixo**, independente do tema do dispositivo. Usar `color-scheme: dark` e forçar backgrounds via CSS e atributos inline.
- A identidade é **premium e editorial** — evitar elementos genéricos, priorizar tipografia forte e espaçamento generoso.
- O público-alvo da landing page é **especialistas de nicho** que possam se tornar parceiros, não o usuário final dos SaaS.
- A navegação interna deve usar `scrollIntoView` via JavaScript, não âncoras href, para evitar conflitos em ambientes iframe.
- Referência visual de qualidade: metrify.com.br
