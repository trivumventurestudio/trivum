# Trivum Studio — Especificação Técnica
## Sistema de Captação de Leads + ERP + Dashboard
> Documento para Claude Code · Versão 1.0 · Mai 2026

---

## Contexto

O Trivum é um venture studio que transforma conhecimento especializado em produtos SaaS. O sistema descrito neste documento tem dois objetivos principais:

1. **Captação de leads** — formulário público na landing page para especialistas interessados em se tornar parceiros
2. **Gestão interna (ERP)** — dashboard privado para os fundadores acompanharem e evoluírem cada lead ao longo da jornada de parceria

O sistema deve funcionar como o centro operacional do studio: onde os leads entram, onde as parcerias são gerenciadas e onde o portfólio de produtos é acompanhado.

---

## Stack Recomendada

| Camada | Tecnologia |
|---|---|
| Frontend landing page | HTML/CSS/JS puro (já existente) |
| Frontend dashboard | React + Tailwind CSS |
| Backend / API | Node.js + Express ou Next.js (API Routes) |
| Banco de dados | Supabase (PostgreSQL gerenciado) |
| Autenticação | Supabase Auth (e-mail + senha, apenas fundadores) |
| Hospedagem | Vercel (frontend + API) + Supabase (banco) |
| E-mail transacional | Resend ou SendGrid |
| Agendamento | Integração com Cal.com via link ou API |

> Alternativa full-stack simplificada: Next.js 14 com App Router, Supabase e Vercel. Recomendada se o objetivo for velocidade de entrega.

---

## Módulo 1 — Formulário de Captação (Frontend Público)

### Localização
Seção final da landing page existente (trivum.app), substituindo o bloco de contato atual.

### Campos do formulário

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Nome completo | Texto | Sim | |
| E-mail | E-mail | Sim | Validação de formato |
| WhatsApp | Telefone | Sim | Com máscara BR |
| Nicho de atuação | Texto | Sim | Ex: "Educação física", "Contabilidade" |
| Descrição do problema | Textarea | Sim | Mín. 100 caracteres. Pergunta: "Qual problema você resolveria com um SaaS no seu nicho?" |
| Tem audiência ou autoridade? | Select | Sim | Opções: Sim, tenho audiência ativa / Tenho autoridade mas pouca audiência / Estou construindo minha presença |
| Como nos conheceu | Select | Não | Instagram / Indicação / Google / Outro |

### Comportamento pós-envio
- Exibir mensagem de confirmação na própria página (sem redirect)
- Enviar e-mail automático de confirmação para o lead
- Enviar e-mail de notificação para contato@trivum.app
- Registrar lead no banco com status inicial "Novo"
- Registrar data/hora e origem (UTM se disponível)

### Estética do formulário
- Seguir identidade visual do Trivum: fundo escuro `#111111`, bordas `rgba(255,255,255,0.08)`, dourado `#c9a84c`
- Campos com label flutuante ou label acima
- Botão de envio: "Quero ser parceiro →" em dourado
- Validação inline com feedback visual

---

## Módulo 2 — Backend / API

### Endpoints necessários

```
POST /api/leads              — Receber novo lead do formulário
GET  /api/leads              — Listar todos os leads (autenticado)
GET  /api/leads/:id          — Detalhe de um lead (autenticado)
PUT  /api/leads/:id          — Atualizar dados ou status do lead (autenticado)
POST /api/leads/:id/notes    — Adicionar nota ao lead (autenticado)
GET  /api/leads/:id/notes    — Listar notas do lead (autenticado)
GET  /api/dashboard/metrics  — Métricas consolidadas (autenticado)
POST /api/auth/login         — Login dos fundadores
POST /api/auth/logout        — Logout
```

### Regras de negócio
- Apenas usuários autenticados acessam rotas protegidas
- Leads públicos não requerem autenticação para criação
- Toda mudança de status deve registrar data/hora e usuário responsável
- Notas são append-only (não editáveis após criação)

---

## Módulo 3 — Modelo de Dados

### Tabela: leads

```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
created_at      TIMESTAMP DEFAULT now()
updated_at      TIMESTAMP DEFAULT now()

-- Dados do lead
name            TEXT NOT NULL
email           TEXT NOT NULL UNIQUE
whatsapp        TEXT NOT NULL
niche           TEXT NOT NULL
problem         TEXT NOT NULL
audience_level  TEXT NOT NULL  -- 'active' | 'authority' | 'building'
source          TEXT           -- 'instagram' | 'referral' | 'google' | 'other'
utm_source      TEXT
utm_medium      TEXT
utm_campaign    TEXT

-- Jornada
status          TEXT NOT NULL DEFAULT 'new'
-- Valores possíveis:
-- 'new'          → Novo (recém chegou)
-- 'contacted'    → Contatado (primeiro contato feito)
-- 'interview'    → Entrevista agendada
-- 'validated'    → Proposta validada
-- 'contract'     → Contrato assinado
-- 'development'  → App em desenvolvimento
-- 'launched'     → Produto lançado
-- 'paused'       → Pausado
-- 'disqualified' → Desqualificado

status_updated_at   TIMESTAMP
assigned_to         TEXT        -- nome do fundador responsável

-- Agendamento
interview_date      TIMESTAMP
interview_link      TEXT        -- link do Cal.com ou Meet

-- Produto associado (quando avançar para desenvolvimento)
product_name        TEXT
product_domain      TEXT
product_revenue     DECIMAL     -- MRR atual em R$
equity_specialist   INTEGER DEFAULT 50  -- % do especialista
equity_studio       INTEGER DEFAULT 50  -- % do studio
```

### Tabela: lead_notes

```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
lead_id     UUID REFERENCES leads(id)
created_at  TIMESTAMP DEFAULT now()
author      TEXT NOT NULL      -- nome do fundador
content     TEXT NOT NULL
type        TEXT DEFAULT 'note'
-- 'note'      → Nota interna
-- 'call'      → Registro de ligação/call
-- 'email'     → Registro de e-mail
-- 'status'    → Mudança de status (gerado automaticamente)
```

### Tabela: products (portfólio do studio)

```sql
id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
lead_id         UUID REFERENCES leads(id)
created_at      TIMESTAMP DEFAULT now()
name            TEXT NOT NULL
domain          TEXT
niche           TEXT
status          TEXT  -- 'mvp' | 'launched' | 'growing' | 'paused'
mrr             DECIMAL DEFAULT 0
launch_date     DATE
specialist_name TEXT
specialist_email TEXT
equity_specialist INTEGER DEFAULT 50
equity_studio     INTEGER DEFAULT 50
notes           TEXT
```

---

## Módulo 4 — Dashboard (Frontend Privado)

### Acesso
- Rota protegida: `/admin` ou subdomínio `studio.trivum.app`
- Login com e-mail e senha (Supabase Auth)
- Sem cadastro público — apenas os fundadores têm acesso

### Tela 1: Visão Geral (Home do Dashboard)

**Cards de métricas no topo:**
- Total de leads
- Leads novos (últimos 7 dias)
- Leads em negociação ativa (status entre 'contacted' e 'contract')
- Produtos em desenvolvimento
- Produtos lançados
- MRR total do portfólio (soma dos produtos)

**Kanban de leads por status:**
Colunas na ordem da jornada:
```
Novo → Contatado → Entrevista → Validado → Contrato → Desenvolvimento → Lançado
```
Cada card do kanban exibe:
- Nome do lead
- Nicho
- Data de entrada
- Dias no status atual (alerta visual se > 7 dias parado)
- Avatar com inicial do nome

**Funcionalidade de drag-and-drop** para mover leads entre colunas.

---

### Tela 2: Detalhe do Lead

Acessado ao clicar em qualquer card do kanban.

**Bloco superior — dados do lead:**
- Nome, e-mail, WhatsApp (com link direto para abrir no WhatsApp Web)
- Nicho e descrição do problema
- Nível de audiência
- Origem e UTMs
- Data de entrada e tempo total no pipeline

**Bloco de status e ações:**
- Status atual com badge colorido
- Botões de avanço rápido para próximo status
- Campo para data e link da entrevista (quando em status 'interview')
- Fundador responsável (dropdown)

**Bloco de produto associado** (visível a partir do status 'development'):
- Nome do produto, domínio, MRR atual
- Equity de cada parte
- Data de lançamento

**Timeline de notas:**
- Listagem cronológica de todas as notas, calls e mudanças de status
- Campo para adicionar nova nota com tipo (nota, call, e-mail)
- Identificação do autor e data/hora

---

### Tela 3: Portfólio de Produtos

Listagem de todos os produtos criados pelo studio.

**Colunas da tabela:**
- Nome do produto
- Especialista parceiro
- Nicho
- Status (MVP / Lançado / Crescendo / Pausado)
- MRR atual
- Data de lançamento
- Equity (studio / especialista)
- Ações: editar, ver lead origem

**Card de resumo no topo:**
- MRR total consolidado
- Número de produtos ativos
- Produto com maior MRR

---

### Tela 4: Configurações

- Gerenciamento de usuários (adicionar/remover fundadores)
- Templates de e-mail para cada etapa da jornada
- Configuração de alertas (lead parado há X dias)

---

## Módulo 5 — E-mails Automáticos

### E-mail 1: Confirmação para o lead (disparo imediato)
```
Assunto: Recebemos sua solicitação — Trivum

Olá, [Nome].

Recebemos seu contato e já estamos analisando o seu perfil.

Nos próximos dias entraremos em contato para entender melhor
o seu nicho e avaliar se faz sentido seguirmos juntos.

Enquanto isso, conheça mais sobre o modelo em trivum.app.

Trivum Venture Studio
```

### E-mail 2: Notificação interna (disparo imediato)
```
Assunto: Novo lead — [Nome] · [Nicho]

Nome: [Nome]
E-mail: [E-mail]
WhatsApp: [WhatsApp]
Nicho: [Nicho]
Problema: [Descrição]
Audiência: [Nível]
Origem: [Fonte]
```

### E-mail 3: Confirmação de entrevista (disparo manual)
```
Assunto: Sua entrevista com o Trivum está confirmada

Olá, [Nome].

Sua entrevista está agendada para [data e hora].
Acesse pelo link: [link]

Até lá.

Trivum Venture Studio
```

---

## Comportamentos e Regras de UX

- Ao mover um lead para "Entrevista", solicitar data e link antes de confirmar
- Ao mover para "Desqualificado" ou "Pausado", exigir nota obrigatória com motivo
- Leads parados há mais de 7 dias no mesmo status recebem badge de alerta laranja
- Leads parados há mais de 14 dias recebem badge vermelho
- Todas as ações destrutivas (desqualificar, deletar) pedem confirmação

---

## Identidade Visual do Dashboard

Seguir a identidade Trivum:
- Fundo: `#080808` ou `#0f0f0f`
- Superfície dos cards: `#111111` ou `#1a1a1a`
- Bordas: `rgba(255,255,255,0.08)`
- Texto principal: `#f0ebe2`
- Texto secundário: `#6b6560`
- Dourado (destaque, CTAs, badges ativos): `#c9a84c`
- Verde (status positivo): `#2d6a4f`
- Vermelho (alerta): `#c84b2f`
- Tipografia: Outfit (sans) + DM Mono (labels e métricas)

**Referência visual de qualidade:** metrify.com.br

---

## Ordem de Desenvolvimento Recomendada

1. Configurar Supabase — criar tabelas, auth e políticas de acesso (RLS)
2. Criar API de leads — POST público + rotas autenticadas
3. Integrar formulário na landing page existente
4. Construir autenticação do dashboard (login/logout)
5. Tela de Kanban com listagem e drag-and-drop
6. Tela de detalhe do lead com timeline de notas
7. Tela de portfólio de produtos
8. E-mails automáticos (confirmação e notificação)
9. Alertas de inatividade e badges de status
10. Tela de configurações

---

## Entregáveis Esperados

- [ ] Formulário funcional integrado à landing page
- [ ] API REST documentada e funcional
- [ ] Dashboard autenticado com Kanban e drag-and-drop
- [ ] Tela de detalhe do lead com timeline
- [ ] Tela de portfólio de produtos
- [ ] E-mails automáticos configurados
- [ ] Deploy funcional em Vercel + Supabase
- [ ] Instruções de configuração de variáveis de ambiente

---

## Variáveis de Ambiente Necessárias

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
EMAIL_FROM=contato@trivum.app
EMAIL_NOTIFY=contato@trivum.app
NEXT_PUBLIC_SITE_URL=https://trivum.app
```
