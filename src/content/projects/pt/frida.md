---
title: Frida
description: Sistema de gestão clínica e administrativa para instituições geriátricas. Histórico de pacientes, sinais vitais, doses de medicamentos, turnos e faturamento, sobre uma arquitetura DDD de três camadas com event bus próprio.
role: Fullstack · Estagiário de Engenharia
stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'pyventus', 'Playwright']
status: shipped
statusLabel: Entregue
featured: true
date: 2026-07-01
idx: '01'
media:
  - type: image
    src: /media/frida/1.png
    alt: Tela de acesso do Frida com seletor Institucional / Operacional
  - type: image
    src: /media/frida/2.png
    alt: Lista de residentes em grade com filtros por status e andar
  - type: image
    src: /media/frida/3.png
    alt: Agenda de doses de medicação com status e atribuição de responsáveis
  - type: image
    src: /media/frida/4.png
    alt: Atividades em grupo programadas com seus participantes
  - type: image
    src: /media/frida/5.png
    alt: Quartos com ocupação total, status e camas por quarto
  - type: image
    src: /media/frida/6.png
    alt: Gestão de turnos de manhã, tarde e noite com a equipe atribuída
---

## Visão geral

O Frida gerencia toda a operação clínica e administrativa de uma instituição geriátrica. Desenvolvido na Digitan Agency para um cliente, de ponta a ponta sozinho: modelagem de domínio, backend, frontend e testes.

## Problema

Uma residência geriátrica opera com turnos rotativos, dispositivos compartilhados entre cuidadores e uma carga de registro clínico que, no papel, se perde ou se duplica. Sem rastreabilidade individual não há como saber quem administrou qual dose, nem auditar o histórico de um residente.

## Solução

Sete áreas funcionais sobre doze bounded contexts:

- **Residentes**: histórico clínico, consultas e notas
- **Sinais vitais**: registro e acompanhamento
- **Medicação**: prescrições e geração de doses
- **Equipe**: turnos, atividade e rastreabilidade individual por meio de `action_code` em dispositivos compartilhados
- **Quartos e leitos**: atribuição e ocupação
- **Alertas**: avisos derivados do estado clínico
- **Administração**: controle administrativo e faturamento

## Arquitetura

O backend está organizado em doze bounded contexts — `account`, `activity`, `alerts`, `clinical_record`, `consultation`, `medical`, `notes`, `prescription`, `resident`, `room`, `shift` e `worker` — cada um com arquitetura DDD de três camadas: domínio, aplicação e infraestrutura.

Uma camada `shared` concentra as bases de DDD, a infraestrutura genérica e um event bus construído sobre o pyventus. Os padrões event-driven são aplicados de forma seletiva, só onde o desacoplamento entre contextos justifica.

## Qualidade

- **356 testes** unitários e de integração com pytest, distribuídos em 76 arquivos
- **38 testes E2E** com Playwright, cobrindo autenticação e papéis de autorização

## Stack técnica

- **Frontend**: Next.js, React, TypeScript
- **Backend**: FastAPI, Python, arquitetura DDD em camadas
- **Banco de dados**: PostgreSQL
- **Eventos**: pyventus
- **Testes**: pytest, Playwright
