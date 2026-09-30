---
title: Repositorio UGMA
description: Repositório institucional de trabalhos de conclusão da UGMA. Permite aos alunos pesquisar teses publicadas e aos coordenadores administrar o ciclo de aprovação. Implantado internamente na universidade.
role: Backend · Product Owner · Lead
stack: ['PHP', 'JavaScript', 'SQL', 'NoSQL', 'HTML/CSS']
status: deployed
statusLabel: Deployed · Internal
featured: false
date: 2023-06-01
idx: '03'
---

## Visão geral

Sistema de gestão de trabalhos de conclusão para a Universidad Gran Mariscal de Ayacucho (UGMA), em uso interno na universidade.

## Problema

A universidade conduzia o processo de aprovação e publicação de teses de forma manual (papel e email). Os alunos não tinham como pesquisar trabalhos anteriores, e os coordenadores não tinham visibilidade sobre o estado do ciclo de aprovação.

## Solução

Plataforma web com dois papéis distintos:

- **Alunos**: busca e consulta de teses por área, autor, ano e palavras-chave
- **Coordenadores**: administração do ciclo completo (recebimento, revisão, correções, aprovação, publicação)

## Funcionalidades

- Busca full-text com múltiplos filtros
- Fluxo de aprovação com estados e notificações
- Painel administrativo para coordenadores
- Download de documentos aprovados
- Dashboard com estatísticas de ocupação e estado do repositório

## Impacto

Substituiu um processo que era feito em papel e por email. Os alunos passaram a consultar o trabalho dos formados por conta própria, e os coordenadores a ver em que ponto do ciclo está cada tese sem correr atrás do processo.

Está implantado de maneira interna na universidade.
