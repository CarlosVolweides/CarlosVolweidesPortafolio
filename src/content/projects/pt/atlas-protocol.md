---
title: Atlas Protocol
description: Plataforma web com IA para criar cursos técnicos personalizados. Gera trilhas de estudo, conteúdo contextual e um chat em streaming com um agente contextualizado por system prompts.
role: Fullstack · Product Manager · Tech Lead
stack: ['Next.js', 'Supabase', 'Vercel AI', 'FastAPI', 'WebSocket']
status: live
statusLabel: MVP · Closed beta
featured: true
date: 2024-09-01
idx: '02'
---

## Visão geral

O Atlas Protocol é uma plataforma educacional movida a IA, feita para desenvolvedores que querem aprender tecnologias de forma personalizada. O sistema gera trilhas de estudo completas, conteúdo contextual para cada módulo e expõe um agente de chat contextualizado com o conteúdo do curso.

## Problema

Os recursos técnicos existentes (documentação, cursos) são genéricos e não se adaptam ao nível nem aos objetivos do estudante. O desenvolvedor perde tempo navegando por conteúdo irrelevante em vez de aprender o que precisa.

## Solução

Um pipeline de geração que recebe um tema (ex: "Rust", "System Design") e produz:

- Trilha de aprendizado estruturada em módulos
- Conteúdo explicativo por módulo com exemplos de código
- Agente conversacional que responde em streaming com o contexto do curso

## Arquitetura

O backend em FastAPI cuida do pipeline de geração e da construção dos system prompts que contextualizam o agente com as informações do curso e do usuário. O frontend Next.js consome a API e mantém o estado de sessão via Supabase. A comunicação em tempo real do agente usa WebSocket, com as respostas do modelo transmitidas em streaming. O LLM é orquestrado via Vercel AI SDK.

## Stack técnica

- **Frontend**: Next.js 14, TypeScript, Vercel AI SDK
- **Backend**: FastAPI, Python, orquestração de LLM em streaming
- **Banco de dados**: Supabase (PostgreSQL + Storage)
- **Tempo real**: WebSocket para streaming de respostas
- **Deploy**: Vercel (frontend), Railway (backend)
