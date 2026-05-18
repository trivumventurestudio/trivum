# Trivum Studio — Brownfield Enhancement PRD

> Gerado por Morgan (@pm) · Modo Interactive · Mai 2026  
> Baseado em: `docs/brief.md`, `docs/trivum_erp_spec.md`

---

## Change Log

| Change | Date | Version | Description | Author |
|---|---|---|---|---|
| Criação | 2026-05-17 | 1.0 | PRD inicial gerado via create-brownfield-prd | Morgan (@pm) |
| Revisão | 2026-05-17 | 1.1 | C1: Story 1.6 IV3 clarificado — Firebase Client SDK direto (não Next.js API). S1: Story 1.11 adicionada (/dashboard/settings MVP). | Morgan (@pm) |
| Revisão | 2026-05-17 | 1.2 | C1: Versão Next.js atualizada 15 → 16 (package.json: 16.2.6). | Morgan (@pm) |

---

## 1. Intro Project Analysis and Context

### 1.1 Existing Project Overview

**Analysis Source:** IDE-based analysis + documentação interna dos fundadores (`brief.md`, `trivum_erp_spec.md`)

**Current Project State:**
Trivum Studio possui landing page pública Next.js 16 (App Router) deployed em Firebase App Hosting no domínio `trivum.app`. Stack atual: Next.js + Firebase App Hosting + Tailwind CSS. Identidade visual dark premium (`#111111`, dourado `#c9a84c`) definida. Sem formulário de captação estruturado, sem dashboard, sem banco de dados — leads chegam por WhatsApp/Instagram/e-mail sem rastreabilidade.

### 1.2 Available Documentation

| Documento | Status |
|---|---|
| Tech Stack | ✓ (`brief.md` + `trivum_erp_spec.md`) |
| Source Tree / Architecture | Parcial (Next.js App Router, Firebase) |
| Coding Standards | Parcial |
| API Documentation | ✗ (APIs ainda serão criadas) |
| UX / UI Guidelines | ✓ (paleta, tipografia, referência: metrify.com.br) |
| Technical Debt | N/A (projeto novo) |

### 1.3 Enhancement Scope

**Enhancement Type:** New Feature Addition + Integration with New Systems

**Enhancement Description:**
Adicionar ao projeto Next.js existente dois módulos: (1) formulário público de captação de leads na landing page e (2) dashboard privado (ERP) para os fundadores gerenciarem o pipeline de parcerias com especialistas de nicho.

**Impact Assessment:** Significant Impact — adiciona banco de dados, auth, rotas de API e área protegida; landing page existente sofre alteração no bloco de contato.

### 1.4 Goals

- Pipeline de leads 100% rastreável — zero perda por falta de visibilidade
- Qualificação prévia via formulário — reduzir tempo de triagem de 2–4h para < 30min
- Escalar capacidade de parcerias simultâneas de 3–5 para 15+
- Dashboard com kanban visual espelhando as 5 fases operacionais reais

### 1.5 Background Context

O Trivum Studio opera hoje sem sistema próprio: leads chegam via DM, WhatsApp e e-mail sem estrutura de qualificação ou pipeline visível. Com a landing page já publicada, o próximo passo crítico é conectar visitas a um funil gerenciável.

A enhancement descrita não é incremental — é a fundação operacional do studio. Sem ela, crescimento de leads significa mais caos, não mais negócios.

---

## 2. Requirements

### Functional Requirements

- **FR1:** O formulário público deve capturar nome, e-mail, WhatsApp, nicho, descrição do problema (mín. 100 chars), nível de audiência e canal de descoberta — com validação client-side e server-side
- **FR2:** Cada submissão válida cria registro no Firestore com timestamp, status inicial `"new"` e UTM parameters quando presentes
- **FR3:** Submissão dispara e-mail de confirmação para o especialista e e-mail de notificação para `contato@trivum.app` via Resend
- **FR4:** Dashboard exige autenticação via Firebase Auth — apenas contas de fundadores pré-autorizadas
- **FR5:** Dashboard exibe todos os leads em kanban por status: Novo → Contatado → Entrevista → Validado → Contrato → Desenvolvimento → Lançado
- **FR6:** Fundadores movem leads entre fases via drag-and-drop ou ação manual
- **FR7:** Cada lead possui página de detalhe com dados do formulário + timeline cronológica de interações
- **FR8:** Fundadores adicionam notas ao lead (tipos: nota, call, e-mail) — append-only, sem edição posterior
- **FR9:** Toda mudança de status gera entrada automática na timeline com autor, data/hora e status anterior
- **FR10:** Dashboard home exibe métricas: total de leads, leads novos (7 dias), negociações ativas, produtos em desenvolvimento, produtos lançados, MRR total do portfólio
- **FR11:** Lead sem mudança de status há > 7 dias exibe badge laranja; > 14 dias exibe badge vermelho
- **FR12:** Mover lead para status `"interview"` requer preenchimento de data e link antes de confirmar
- **FR13:** Mover lead para `"disqualified"` ou `"paused"` requer nota obrigatória com motivo
- **FR14:** Ações destrutivas (desqualificar, deletar) pedem confirmação explícita
- **FR15:** Tela de portfólio lista todos os produtos do studio com nome, especialista, nicho, status, MRR, equity e data de lançamento

### Non-Functional Requirements

- **NFR1:** Formulário carrega em < 2s; dashboard em < 3s (medido em conexão 4G padrão)
- **NFR2:** Renderização inicial do formulário não depende de JS crítico
- **NFR3:** Interface responsiva — desktop-first, funcional em mobile
- **NFR4:** Firebase Security Rules garantem que nenhum dado de lead seja exposto em endpoints públicos
- **NFR5:** Todas as chaves sensíveis via variáveis de ambiente — zero secrets hardcoded
- **NFR6:** Stack dentro do free tier: Firebase Spark + Resend free (< 100 leads/mês estimado)
- **NFR7:** Suporte a Chrome, Safari e Firefox (últimas 2 versões)

### Compatibility Requirements

- **CR1:** Integração do formulário não quebra estilos ou componentes existentes da landing page
- **CR2:** Adição de Firestore/Auth não conflita com configuração existente do Firebase App Hosting (`apphosting.yaml`)
- **CR3:** Novos componentes seguem identidade Trivum: `#111111`, `#c9a84c`, `#f0ebe2`, Outfit + DM Mono
- **CR4:** Novas rotas seguem padrão App Router existente — sem misto de Pages Router

---

## 3. User Interface Enhancement Goals

### 3.1 Integration with Existing UI

| Token | Valor |
|---|---|
| Fundo base | `#080808` / `#0f0f0f` |
| Superfície cards | `#111111` / `#1a1a1a` |
| Bordas | `rgba(255,255,255,0.08)` |
| Texto principal | `#f0ebe2` |
| Texto secundário | `#6b6560` |
| Destaque / CTA | `#c9a84c` (dourado) |
| Status positivo | `#2d6a4f` |
| Alerta | `#c84b2f` |
| Tipografia | Outfit (sans) + DM Mono (labels/métricas) |

Referência de qualidade: metrify.com.br

### 3.2 Modified / New Screens

**Modificadas:**
- Landing page — seção de contato substituída pelo formulário de captação

**Novas:**
- `/login` — tela de autenticação dos fundadores
- `/dashboard` — home com métricas + kanban
- `/dashboard/leads/[id]` — detalhe do lead com timeline
- `/dashboard/portfolio` — portfólio de produtos do studio
- `/dashboard/settings` — configurações (usuários, templates, alertas)

### 3.3 UI Consistency Requirements

- **Formulário:** label acima ou flutuante; botão "Quero ser parceiro →" dourado; validação inline com feedback visual; sem redirect pós-envio — mensagem de confirmação na própria página
- **Kanban:** cards com nome, nicho, data de entrada, dias no status atual; badge laranja (>7 dias), vermelho (>14 dias); drag-and-drop
- **Badges de status:** cores consistentes mapeadas por fase (Novo = cinza, Contatado = azul, Entrevista = amarelo, Validado = verde, Contrato = dourado, Desenvolvimento = púrpura, Lançado = verde escuro)
- **Modais de confirmação:** para ações destrutivas — estilo Trivum, sem alert nativo do browser
- **Responsivo:** layout mobile-first para o formulário público; dashboard aceita telas ≥ 768px no MVP

---

## 4. Technical Constraints and Integration Requirements

### 4.1 Existing Technology Stack

| Camada | Tecnologia | Versão / Nota |
|---|---|---|
| Language | TypeScript | Já em uso |
| Framework | Next.js | 16, App Router |
| Styling | Tailwind CSS | Já em uso |
| Auth | Firebase Auth | E-mail + senha |
| Database | Firestore (NoSQL) | Firebase Spark tier |
| Hosting | Firebase App Hosting | `apphosting.yaml` existente |
| E-mail | Resend | Free tier |
| Runtime | Node.js | 18+ |

> **Decisão de stack:** Firestore confirmado (não Supabase). Razão: Firebase App Hosting já configurado, evita overhead de segundo provider.

### 4.2 Integration Approach

| Camada | Estratégia |
|---|---|
| Database | Firestore collections: `leads`, `lead_notes`, `products` |
| API | Next.js Route Handlers (`app/api/*`) — sem Express separado |
| Auth | Firebase Admin SDK no server; Firebase Client SDK no browser |
| Frontend | Server Components para dashboard; Client Components para drag-and-drop e formulário interativo |
| E-mail | Resend SDK chamado via Route Handler server-side |

### 4.3 Code Organization

```
app/
├── (public)/           # Landing page existente
│   └── page.tsx        # Formulário integrado aqui
├── api/
│   ├── leads/          # POST (público) + GET/PUT (autenticado)
│   └── auth/           # Login / logout helpers
├── dashboard/          # Área privada
│   ├── layout.tsx      # Auth guard
│   ├── page.tsx        # Home: métricas + kanban
│   ├── leads/[id]/     # Detalhe do lead
│   ├── portfolio/      # Portfólio de produtos
│   └── settings/       # Configurações
└── login/              # Tela pública de autenticação
lib/
├── firebase/           # Config client + admin
├── firestore/          # Helpers de query por collection
└── email/              # Templates Resend
```

### 4.4 Deployment & Operations

| Item | Decisão |
|---|---|
| Build | `next build` — Firebase App Hosting CI automático |
| Env vars | Firebase App Hosting secrets |
| Logs | Firebase App Hosting built-in logging |
| Monitoring | Firebase console |
| Config | `apphosting.yaml` existente — adicionar env vars necessárias |

### 4.5 Risk Assessment

| Risco | Impacto | Mitigação |
|---|---|---|
| Firebase App Hosting + Next.js 16 server actions | Alto | Validar build de produção na semana 1 |
| Firestore Security Rules mal configuradas expõem PII | Alto | Revisão com `@data-engineer` antes de deploy |
| Drag-and-drop com Server Components | Médio | Isolar kanban como Client Component; usar `@dnd-kit/core` |
| Fricção no formulário reduz conversão | Alto | Teste com 5 especialistas antes do lançamento |
| Scope creep no dashboard | Médio | Freeze de MVP: apenas as 4 telas definidas |

---

## 5. Epic and Story Structure

**Epic Structure Decision:** 1 epic único ("Trivum Sistema Operacional") com stories sequenciadas por dependência técnica. Formulário, auth, banco e dashboard formam sistema coeso — não features independentes.

---

## 6. Epic 1: Trivum Sistema Operacional

**Epic Goal:** Adicionar ao Next.js existente um formulário público de captação de leads + ERP privado para fundadores gerenciarem o pipeline de parcerias, sem quebrar a landing page atual.

**Integration Requirements:** Firestore como banco, Firebase Auth para proteção do dashboard, Resend para e-mails, tudo dentro do App Router existente.

---

### Story 1.1 — Setup Firebase: Firestore + Security Rules

> Como fundador do Trivum,  
> quero as collections do Firestore criadas com Security Rules corretas,  
> para que dados de leads sejam persistidos com segurança desde o primeiro formulário.

**Acceptance Criteria:**
1. Collections `leads`, `lead_notes`, `products` criadas no Firestore
2. Security Rules: `leads` — write público (criação), read/update apenas autenticados; `lead_notes`, `products` — CRUD apenas autenticados
3. Firebase Admin SDK configurado em `lib/firebase/admin.ts`
4. Firebase Client SDK configurado em `lib/firebase/client.ts`
5. Variáveis de ambiente documentadas em `.env.example`
6. `apphosting.yaml` atualizado com referência às env vars necessárias

**Integration Verification:**
- IV1: Build de produção `next build` passa sem erros após adição dos SDKs Firebase
- IV2: Firebase App Hosting não conflita com nova configuração de Admin SDK (server-only)
- IV3: Landing page existente renderiza sem alteração após setup

---

### Story 1.2 — API Route: POST /api/leads

> Como especialista visitando trivum.app,  
> quero submeter meus dados pelo formulário,  
> para que minha candidatura seja registrada e eu receba confirmação.

**Acceptance Criteria:**
1. `POST /api/leads` aceita: `name`, `email`, `whatsapp`, `niche`, `problem` (≥100 chars), `audience_level`, `source`, UTM params
2. Validação server-side — campos obrigatórios ausentes retornam 400 com mensagem descritiva
3. E-mail duplicado retorna 409
4. Lead criado no Firestore com `status: "new"`, `created_at`, `updated_at`
5. Retorna 201 com `{ id, status }` — sem expor dados sensíveis
6. Rate limiting: máx 5 requests/IP/hora

**Integration Verification:**
- IV1: Endpoint acessível publicamente sem autenticação
- IV2: Dados gravados no Firestore respeitam Security Rules (write público)
- IV3: Rota não conflita com estrutura de routes existentes no App Router

---

### Story 1.3 — Formulário de Captação na Landing Page

> Como especialista visitando trivum.app,  
> quero preencher um formulário na landing page,  
> para que eu possa candidatar-me a ser parceiro do Trivum sem contato manual prévio.

**Acceptance Criteria:**
1. Bloco de contato atual substituído pelo formulário com 7 campos: nome, e-mail, WhatsApp (máscara BR), nicho, problema (textarea), nível de audiência (select), como conheceu (select)
2. Validação client-side inline com feedback visual antes do submit
3. Submit chama `POST /api/leads` — sem redirect, mensagem de confirmação na própria página
4. Botão "Quero ser parceiro →" em dourado `#c9a84c`; estado de loading durante envio
5. Identidade visual: fundo `#111111`, bordas `rgba(255,255,255,0.08)`, label acima dos campos
6. Acessível: labels associadas aos inputs, erros anunciados por screen readers

**Integration Verification:**
- IV1: Estilos existentes da landing page não são afetados fora da seção de contato
- IV2: Formulário renderiza sem JS — validação client-side é progressive enhancement
- IV3: Formulário não adiciona > 50KB ao bundle da landing page

---

### Story 1.4 — E-mails Automáticos

> Como fundador do Trivum,  
> quero receber notificação imediata a cada novo lead e que o especialista receba confirmação,  
> para que nenhuma candidatura passe despercebida.

**Acceptance Criteria:**
1. `POST /api/leads` dispara dois e-mails via Resend após persistir lead com sucesso
2. E-mail 1 para especialista: assunto "Recebemos sua solicitação — Trivum", corpo conforme spec
3. E-mail 2 para `contato@trivum.app`: assunto "Novo lead — [Nome] · [Nicho]", corpo com todos os dados
4. Falha no e-mail NÃO bloqueia criação do lead — erro logado, lead persiste
5. Templates em `lib/email/templates/` — sem strings hardcoded no Route Handler
6. Env vars: `RESEND_API_KEY`, `EMAIL_FROM`, `EMAIL_NOTIFY`

**Integration Verification:**
- IV1: Lead criado no Firestore mesmo quando Resend retorna erro
- IV2: E-mails não disparados em ambiente de desenvolvimento (guard por `NODE_ENV`)
- IV3: `EMAIL_FROM` usa domínio verificado no Resend

---

### Story 1.5 — Firebase Auth + Tela de Login

> Como fundador do Trivum,  
> quero fazer login com e-mail e senha,  
> para que eu acesse o dashboard de forma segura sem que terceiros vejam os leads.

**Acceptance Criteria:**
1. Rota `/login` com formulário de e-mail + senha
2. Autenticação via Firebase Auth Client SDK — sem cadastro público
3. Login bem-sucedido redireciona para `/dashboard`
4. Falha de login exibe mensagem de erro sem revelar se o e-mail existe
5. `app/dashboard/layout.tsx` protege todas as rotas `/dashboard/*` — redireciona para `/login` se não autenticado
6. Logout disponível no dashboard limpa sessão e redireciona para `/login`

**Integration Verification:**
- IV1: `/login` acessível publicamente sem auth
- IV2: Firebase Auth não conflita com Firebase App Hosting session management
- IV3: Proteção de rota funciona em build de produção

---

### Story 1.6 — Dashboard Home: Métricas + Kanban

> Como fundador do Trivum,  
> quero ver todos os leads em um kanban por fase,  
> para que eu tenha visibilidade total do pipeline de parcerias em uma só tela.

**Acceptance Criteria:**
1. Cards de métricas no topo: total de leads, leads novos (últimos 7 dias), negociações ativas, produtos em desenvolvimento, produtos lançados, MRR total
2. Kanban com colunas: Novo → Contatado → Entrevista → Validado → Contrato → Desenvolvimento → Lançado
3. Cada card exibe: nome, nicho, data de entrada, dias no status atual
4. Badge laranja se dias no status > 7; badge vermelho se > 14
5. Drag-and-drop funcional entre colunas — atualiza Firestore imediatamente
6. Clicar no card navega para `/dashboard/leads/[id]`

**Integration Verification:**
- IV1: Kanban usa Client Component isolado — Server Components do layout não afetados
- IV2: `@dnd-kit/core` não aumenta bundle do formulário público
- IV3: Kanban carrega dados via Firebase Client SDK autenticado (não Next.js API routes) — Security Rules bloqueiam acesso sem token Firebase Auth válido; `PUT /api/leads/[id]` (Story 1.7) não é pré-requisito desta story

---

### Story 1.7 — APIs Autenticadas: GET/PUT Leads + Notes

> Como fundador do Trivum,  
> quero ler e atualizar dados de leads via API segura,  
> para que o dashboard funcione com dados reais do Firestore.

**Acceptance Criteria:**
1. `GET /api/leads` — lista todos os leads (autenticado), filtro por `status`, busca por `name`/`niche`
2. `GET /api/leads/[id]` — detalhe completo do lead (autenticado)
3. `PUT /api/leads/[id]` — atualiza `status`, `assigned_to`, `interview_date`, `interview_link`, campos de produto; mudança de status gera entrada automática em `lead_notes`
4. `POST /api/leads/[id]/notes` — adiciona nota; campos: `content`, `type`, `author`
5. `GET /api/leads/[id]/notes` — lista notas em ordem cronológica
6. `GET /api/dashboard/metrics` — retorna agregados para cards de métricas
7. Todos os endpoints verificam token Firebase Auth — 401 se inválido

**Integration Verification:**
- IV1: `POST /api/leads` (público) não é afetado pelas verificações de auth das rotas protegidas
- IV2: Mudança de status via `PUT` gera entrada automática em `lead_notes` (tipo `"status"`)
- IV3: Security Rules do Firestore coerentes com a camada de auth da API

---

### Story 1.8 — Detalhe do Lead + Timeline

> Como fundador do Trivum,  
> quero ver todos os dados de um lead e o histórico completo de interações,  
> para que eu tome decisões informadas sobre cada parceria.

**Acceptance Criteria:**
1. Bloco superior: nome, e-mail, WhatsApp (link WhatsApp Web), nicho, problema, audiência, origem, UTMs, data de entrada, tempo total no pipeline
2. Bloco de status: badge colorido, botões de avanço rápido para próximo status
3. Ao avançar para `"interview"`: modal exige data e link antes de confirmar
4. Ao mover para `"disqualified"` ou `"paused"`: modal exige nota com motivo
5. Ações destrutivas exibem modal de confirmação
6. Timeline: listagem cronológica de notas, calls, e-mails e mudanças de status; campo para adicionar nova nota

**Integration Verification:**
- IV1: Página protegida pelo layout guard da Story 1.5
- IV2: Adição de nota dispara `POST /api/leads/[id]/notes` e atualiza timeline sem reload completo
- IV3: WhatsApp link (`https://wa.me/55{número}`) gerado corretamente

---

### Story 1.9 — Tela de Portfólio de Produtos

> Como fundador do Trivum,  
> quero ver todos os produtos do studio em uma tabela,  
> para que eu acompanhe MRR, equity e status de cada parceria que evoluiu para desenvolvimento.

**Acceptance Criteria:**
1. Card de resumo no topo: MRR total, número de produtos ativos, produto com maior MRR
2. Tabela com colunas: nome, especialista parceiro, nicho, status, MRR, data de lançamento, equity, ações
3. Ação "Ver lead origem" navega para `/dashboard/leads/[id]`
4. Ação "Editar" abre modal inline para atualizar MRR, status e notas do produto
5. Dados lidos da collection `products` no Firestore

**Integration Verification:**
- IV1: Rota protegida pelo layout guard
- IV2: Referência `lead_id` válida — link para lead origem funcional
- IV3: Edição de produto não afeta dados do lead associado

---

### Story 1.10 — Alertas de Inatividade + Badges de Status

> Como fundador do Trivum,  
> quero ver alertas visuais em leads parados há muito tempo,  
> para que nenhuma parceria seja esquecida no pipeline.

**Acceptance Criteria:**
1. Lógica de inatividade calculada no servidor: `dias_no_status = now() - status_updated_at`
2. Badge laranja no card do kanban e no detalhe do lead quando `dias_no_status > 7`
3. Badge vermelho quando `dias_no_status > 14`
4. Badges visíveis tanto no kanban quanto na tela de detalhe
5. Tooltip no badge mostra: "X dias sem atualização"
6. Fallback para `created_at` quando `status_updated_at` ausente

**Integration Verification:**
- IV1: Lógica centralizada em `lib/firestore/leads.ts` — reutilizada pelo kanban e pelo detalhe
- IV2: Badges não quebram layout mobile do kanban
- IV3: Lead recém-criado (< 1 dia) não exibe nenhum badge

---

### Story 1.11 — Tela de Settings do Dashboard

> Como fundador do Trivum,  
> quero gerenciar usuários autorizados, templates de e-mail e thresholds de alertas,  
> para que eu controle o acesso ao dashboard e personalize o comportamento operacional do studio.

**Acceptance Criteria:**
1. Rota `/dashboard/settings` acessível via navegação do dashboard com 3 seções: Usuários, Templates, Alertas
2. Seção Usuários: lista contas autorizadas (nome + e-mail) com ação "Remover acesso" e campo para adicionar novo e-mail de fundador
3. Adição/remoção de usuários usa Firebase Auth Admin SDK via Route Handler server-side — nunca exposta no browser
4. Seção Templates: visualização e edição inline dos templates de e-mail em `lib/email/templates/` (confirmação ao especialista e notificação interna)
5. Seção Alertas: inputs numéricos para configurar thresholds dos badges (padrão: laranja = 7 dias, vermelho = 14 dias) — valores salvos no Firestore collection `settings`
6. Alterações salvas com confirmação visual; autor e timestamp registrados no documento `settings/config`

**Integration Verification:**
- IV1: Rota protegida pelo layout guard da Story 1.5 — redireciona para `/login` se não autenticado
- IV2: Adição/remoção de usuários usa Firebase Admin SDK (server-only) — Firebase Client SDK não tem acesso a operações de Auth management
- IV3: Alteração dos thresholds de alerta reflete imediatamente nos badges do kanban (Story 1.10) via leitura dos valores em `settings/config`

---

## Appendix — Environment Variables

```env
# Firebase
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# Email
RESEND_API_KEY=
EMAIL_FROM=contato@trivum.app
EMAIL_NOTIFY=contato@trivum.app

# App
NEXT_PUBLIC_SITE_URL=https://trivum.app
```
