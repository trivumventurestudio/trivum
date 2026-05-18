# Project Brief: Trivum Studio — Sistema Operacional

> Gerado por Atlas (@analyst) · YOLO Mode · Mai 2026
> Baseado em: `trivum_dominio.md`, `trivum_erp_spec.md`

---

## Executive Summary

O Trivum é um venture studio que transforma conhecimento especializado em produtos SaaS, unindo especialistas de nicho com capacidade técnica e de marketing em modelo de co-fundação 50/50. O sistema descrito neste brief é o **centro operacional do studio**: uma landing page pública para captação de especialistas parceiros e um dashboard privado (ERP) para os fundadores gerenciarem o pipeline de parcerias do primeiro contato até o lançamento do produto.

**Problema central:** Sem sistema próprio, o studio opera manualmente — leads perdidos, pipeline invisível, nenhuma rastreabilidade do funil de parcerias.

**Mercado-alvo:** Especialistas de nicho no Brasil (educadores, consultores, profissionais liberais) com audiência ou autoridade que buscam monetizar conhecimento via SaaS sem capacidade técnica própria.

**Proposta de valor:** Formulário inteligente que qualifica o especialista antes do primeiro contato + ERP interno que dá aos fundadores visibilidade total sobre cada parceria em evolução.

---

## Problem Statement

### Estado atual e pontos de dor

- **Captação manual:** Leads chegam por e-mail, Instagram DM e WhatsApp — nenhuma estrutura de qualificação prévia
- **Pipeline invisível:** Os fundadores não têm visibilidade unificada de quantos leads existem, em que fase estão e quais ações são necessárias
- **Sem rastreabilidade:** Histórico de interações com cada especialista é fragmentado entre apps de mensagem e memória humana
- **Decisões go/no-go sem dados:** O scorecard de triagem (Fase 1 do pipeline) existe no papel, mas não é aplicado sistematicamente
- **Escala impossível:** O modelo atual não suporta crescimento — mais leads significam mais caos, não mais negócios

### Impacto quantificável

- Tempo médio estimado para qualificar um lead manualmente: 2–4 horas
- Taxa de perda de leads por falta de follow-up estruturado: não medida (indicador do problema)
- Capacidade atual de gerir parcerias simultâneas: ~3–5 (limitação humana)

### Por que agora

O studio está em fase de tração inicial — momento crítico para estabelecer processos antes que o volume de leads torne a operação inviável. A landing page já existe; falta o sistema que converte visitas em leads qualificados e leads em parcerias gerenciadas.

---

## Proposed Solution

### Conceito central

Dois módulos integrados construídos sobre Next.js + Supabase:

**Módulo 1 — Formulário de Captação (público):** Substituir o bloco de contato atual da landing page por um formulário inteligente que coleta informações de qualificação antes do primeiro contato humano. O especialista conta o problema que resolveria, seu nível de audiência e como chegou ao Trivum.

**Módulo 2 — ERP/Dashboard (privado):** Interface interna acessível apenas pelos fundadores para visualizar todos os leads, avançá-los pelo pipeline de 5 fases, registrar interações e tomar decisões informadas sobre cada parceria.

### Diferenciais

- **Qualificação antes do contato:** O formulário filtra candidatos inadequados automaticamente — só chegam ao dashboard leads com fit mínimo
- **Pipeline visual por fases:** Dashboard espelha as 5 fases operacionais reais do studio (prospecção → validação → contrato → MVP → lançamento)
- **Sem overhead tecnológico:** Stack simples (Next.js + Supabase) sem microsserviços ou dependências desnecessárias — dois fundadores conseguem manter

### Por que vai funcionar

Resolve uma dor operacional real com tecnologia mínima e diretamente ligada ao modelo de negócio existente. O formulário existe para alimentar o ERP; o ERP existe para tornar o pipeline de parcerias gerenciável e escalável.

---

## Target Users

### Primary User Segment: Fundadores do Trivum (usuários do ERP)

- **Perfil:** 2 co-fundadores, alta familiaridade técnica, sem equipe de suporte
- **Comportamentos atuais:** Gerenciam leads via WhatsApp, e-mail e planilhas; fazem reuniões para alinhar status de cada parceria
- **Necessidades específicas:**
  - Visão unificada de todos os leads por fase do pipeline
  - Registro rápido de interações sem sair do fluxo
  - Notificações de ações pendentes (ex: lead sem follow-up há 7 dias)
  - Decisão go/no-go baseada em scorecard visível
- **Goals:** Aumentar capacidade de gestão de parcerias simultâneas de 3–5 para 10–20 sem aumentar overhead

### Secondary User Segment: Especialistas de Nicho (usuários do formulário)

- **Perfil:** Profissionais brasileiros com 3–15 anos de experiência em nicho específico (educação, saúde, jurídico, contabilidade, fitness, etc.), 30–55 anos, presença no Instagram ou YouTube
- **Comportamentos atuais:** Monetizam via consultorias, cursos ou conteúdo; têm audiência mas não sabem como criar um SaaS
- **Necessidades específicas:**
  - Formulário que entenda o contexto deles sem ser burocrático
  - Feedback rápido sobre elegibilidade (mesmo que automatizado)
  - Clareza sobre o que acontece depois do preenchimento
- **Goals:** Transformar autoridade de nicho em produto digital recorrente sem ter que aprender tecnologia

---

## Goals & Success Metrics

### Business Objectives

- Ter 100% dos leads do Trivum passando pelo formulário estruturado dentro de 30 dias do lançamento
- Reduzir tempo médio de qualificação de lead de 2–4h para < 30min (via pré-qualificação pelo formulário)
- Aumentar capacidade de parcerias gerenciadas simultaneamente para 15+ em 90 dias pós-lançamento
- Gerar primeiro dashboard com métricas do funil (leads/semana, taxa de conversão por fase) em 60 dias

### User Success Metrics

- Fundadores: < 5 min para registrar atualização de status de um lead no dashboard
- Especialistas: Taxa de conclusão do formulário > 70% (formulário não pode ser percebido como burocrático)
- Fundadores: Zero leads "perdidos" por falta de visibilidade (todos os leads aparecem no pipeline)

### Key Performance Indicators (KPIs)

- **Leads/semana:** Número de formulários submetidos com sucesso
- **Taxa de qualificação:** % de leads que passam da Fase 1 (prospecção) para Fase 2 (validação)
- **Tempo médio por fase:** Dias médios que um lead permanece em cada etapa do pipeline
- **Taxa de conversão funil:** % de leads que chegam à Fase 5 (lançamento)
- **NPS do formulário:** Satisfação do especialista com o processo de candidatura

---

## MVP Scope

### Core Features (Must Have)

- **Formulário de captação público:** Nome, e-mail, WhatsApp, nicho, descrição do problema (≥100 chars), nível de audiência, canal de descoberta — com validação client-side e server-side
- **Persistência no Supabase:** Cada submissão cria um registro de lead com timestamp e dados completos
- **E-mail transacional automático:** Confirmação para o especialista + notificação para os fundadores a cada novo lead
- **Dashboard de leads (listagem):** Tabela com todos os leads, filtro por fase, busca por nome/nicho
- **Pipeline kanban por fases:** Mover lead entre as 5 fases com drag-and-drop ou ação manual
- **Detalhe do lead:** Página individual com todos os dados do formulário + histórico de interações
- **Registro de interações:** Campo para os fundadores anotarem calls, decisões e próximos passos
- **Autenticação dos fundadores:** Login e-mail + senha via Supabase Auth — apenas contas pré-autorizadas acessam o dashboard

### Out of Scope for MVP

- Scorecard automatizado de qualificação (avaliação manual é suficiente no MVP)
- Integração com Cal.com (agendamento via link manual no MVP)
- Notificações push ou Slack para os fundadores
- Portal do especialista (acesso externo ao pipeline da própria parceria)
- Relatórios exportáveis ou analytics avançado
- Multi-tenancy (o sistema serve apenas o Trivum Studio)
- App mobile

### MVP Success Criteria

Sistema em produção com formulário funcional na landing page, pelo menos um lead capturado e visível no dashboard, e fundadores conseguindo mover leads pelo pipeline sem assistência técnica. Tempo de build: ≤ 8 semanas.

---

## Post-MVP Vision

### Phase 2 Features

- Scorecard automatizado de qualificação com pontuação visível no dashboard
- Integração com Cal.com para agendamento de reuniões diretamente no fluxo do pipeline
- Notificações configuráveis (e-mail ou Slack) para leads sem atividade há X dias
- Tags e categorização de leads por nicho, região e perfil de audiência
- Filtros e busca avançada no dashboard

### Long-term Vision (12–24 meses)

O ERP evolui para o sistema de gestão de portfólio completo do studio: cada parceria tem seu próprio espaço com documentos, milestones de desenvolvimento do SaaS, métricas de crescimento pós-lançamento e divisão de receita rastreável. O studio consegue gerenciar 30+ parcerias ativas simultaneamente com equipe de 4–6 pessoas.

### Expansion Opportunities

- White-label do sistema para outros venture studios ou aceleradoras
- API pública para integrar com ferramentas de marketing (RD Station, HubSpot) para automação de nutrição de leads
- Módulo de métricas dos SaaS do portfólio (MRR, churn, NPS de cada produto)

---

## Technical Considerations

### Platform Requirements

- **Target Platforms:** Web (desktop-first, responsivo para mobile)
- **Browser/OS Support:** Chrome, Safari, Firefox — versões dos últimos 2 anos
- **Performance Requirements:** Formulário carrega em < 2s; dashboard em < 3s; nenhuma dependência de JS crítico para renderização inicial do formulário

### Technology Preferences

- **Frontend:** Next.js 15 com App Router (já em uso no projeto), Tailwind CSS, identidade visual dark premium já definida
- **Backend:** Firebase (Firestore para dados de leads, Firebase Auth para autenticação dos fundadores, Firebase Functions se necessário)
- **Database:** Firestore (NoSQL) como banco principal — confirmar com @architect se Supabase (PostgreSQL) ainda é preferido para dados relacionais do pipeline
- **Hosting/Infrastructure:** Firebase App Hosting para Next.js (já configurado e em uso no domínio trivum.app)

### Architecture Considerations

- **Repository Structure:** Monorepo único — Next.js app com `app/` (pages públicas) e `app/dashboard/` (área protegida)
- **Service Architecture:** Sem microsserviços — tudo em Next.js API Routes no MVP
- **Integration Requirements:** Firebase Auth, Resend (e-mail transacional), Cal.com (Phase 2)
- **Security/Compliance:** Firebase Auth + Firestore Security Rules para garantir que apenas fundadores autenticados acessam dados de leads; variáveis sensíveis via `.env`; nenhum dado de lead exposto em endpoints públicos

---

## Constraints & Assumptions

### Constraints

- **Budget:** Bootstrapped — usar apenas serviços com tier gratuito ou custo mínimo (Supabase free tier, Resend free tier, Firebase App Hosting)
- **Timeline:** MVP funcional em ≤ 8 semanas (2 fundadores trabalhando part-time)
- **Resources:** Equipe de 2 pessoas com competências em desenvolvimento e gestão; sem designer dedicado
- **Technical:** Stack já parcialmente definida (Next.js + Firebase App Hosting) — mudanças de infra aumentam custo e prazo

### Key Assumptions

- Os especialistas têm disposição para preencher formulário com ~7 campos antes do primeiro contato humano
- Os fundadores são os únicos usuários do dashboard no MVP (sem equipe adicional)
- Supabase free tier suporta o volume inicial de leads (< 500/mês estimado)
- Firebase App Hosting é viável como hosting para Next.js com App Router e server components
- O formulário na landing page não requer validação humana antes de armazenar — qualquer submissão válida é persistida

---

## Risks & Open Questions

### Key Risks

- **Fricção no formulário:** Campos demais ou linguagem errada reduzem taxa de conclusão e perdem leads qualificados — **Impacto:** Alto. Mitigação: teste com 5 especialistas reais antes do lançamento
- **Compatibilidade Firebase + Next.js App Router:** Firebase App Hosting pode ter limitações com server components e API routes em produção — **Impacto:** Alto. Mitigação: validar build de produção na semana 1
- **Escopo do ERP cresce:** Dashboard de gestão de leads pode se expandir indefinidamente se não houver corte rígido de MVP — **Impacto:** Médio. Mitigação: definir "done" por fase antes de começar
- **Supabase Auth + RLS sem experiência prévia:** Configuração incorreta pode expor dados de leads — **Impacto:** Alto. Mitigação: revisar RLS policies com `@data-engineer` antes do deploy

### Open Questions

~~Todas resolvidas — respostas dos fundadores (Mai 2026):~~

- **Critério go/no-go Fase 1:** Scorecard com pesos definidos (não decisão qualitativa)
- **Feedback do formulário:** Mensagem genérica de recebimento — sem indicação de elegibilidade ao especialista
- **Notificações de leads:** Digest diário (não tempo real)
- **Importar leads históricos:** Não — sistema começa do zero
- **Domínio trivum.app:** Aponta para Next.js; backend usa Firebase (Firestore/Functions)

### Areas Needing Further Research

- Benchmark de taxa de conclusão de formulários de captação B2B no Brasil
- Limitações reais do Firebase App Hosting com Next.js 15 + server actions em produção
- Melhores práticas de UX para formulários de qualificação de parceiros (não leads de venda comum)
- Alternativas ao Firebase App Hosting caso limitações técnicas se confirmem (Vercel, Railway)

---

## Appendices

### A. Research Summary

**Fontes utilizadas:** `trivum_dominio.md` e `trivum_erp_spec.md` — documentos internos produzidos pelos fundadores.

**Achados principais:**
- Modelo de negócio bem definido com pipeline de 5 fases operacionais claras
- Identidade visual premium dark já especificada (paleta, tipografia, logo)
- Stack técnica preferida já definida pelos fundadores
- Perfil do especialista-alvo documentado com clareza
- Nenhuma pesquisa com usuários externos realizada ainda — gap a preencher antes do lançamento

### C. References

- Documento de Domínio: `docs/trivum_dominio.md`
- Especificação Técnica ERP: `docs/trivum_erp_spec.md`
- Referência visual de qualidade: metrify.com.br
- Site: trivum.app
- Instagram: @trivum.app

---

## Next Steps

### Immediate Actions

1. **Validar este brief com os fundadores** — confirmar se MVP Scope, fases e critérios de sucesso estão corretos
2. **Esclarecer open questions** — especialmente o critério de go/no-go e o comportamento do formulário pós-envio
3. **Testar compatibilidade Firebase + Next.js 15** — build de produção com server components antes de comprometer com a stack
4. **Recrutar 3–5 especialistas reais** para teste do formulário antes do lançamento
5. **Handoff para @pm** para criação do PRD com épicos e stories detalhadas

### PM Handoff

Este Project Brief fornece o contexto completo para o Trivum Studio — Sistema Operacional. Por favor, inicie em 'PRD Generation Mode', revise o brief e trabalhe com o usuário para criar o PRD seção por seção, pedindo esclarecimentos necessários e sugerindo melhorias onde aplicável.
