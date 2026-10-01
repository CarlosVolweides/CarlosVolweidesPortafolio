---
title: Frida
description: Sistema de gestión clínica y administrativa para instituciones geriátricas. Historial de pacientes, signos vitales, dosis de medicamentos, turnos y facturación, sobre una arquitectura DDD de tres capas con event bus propio.
role: Fullstack · Pasante de Ingeniería
stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'pyventus', 'Playwright']
status: shipped
statusLabel: Entregado
featured: true
date: 2026-07-01
idx: '01'
media:
  - type: image
    src: /media/frida/1.png
    alt: Pantalla de acceso de Frida con selector Institucional / Operativo
  - type: image
    src: /media/frida/2.png
    alt: Listado de residentes en grilla con filtros por estado y piso
  - type: image
    src: /media/frida/3.png
    alt: Agenda de dosis de medicación con estados y asignación de responsables
  - type: image
    src: /media/frida/4.png
    alt: Actividades grupales programadas con sus participantes
  - type: image
    src: /media/frida/5.png
    alt: Habitaciones con ocupación total, estado y camas por cuarto
  - type: image
    src: /media/frida/6.png
    alt: Gestión de turnos de mañana, tarde y noche con el personal asignado
---

## Overview

Frida gestiona la operación clínica y administrativa completa de una institución geriátrica. Desarrollado en Digitan Agency para un cliente, de principio a fin en solitario: modelado de dominio, backend, frontend y pruebas.

## Problema

Una residencia geriátrica opera con turnos rotativos, dispositivos compartidos entre cuidadores y una carga de registro clínico que en papel se pierde o se duplica. Sin trazabilidad individual no hay forma de saber quién administró qué dosis, ni de auditar el historial de un residente.

## Solución

Siete áreas funcionales sobre doce contextos acotados:

- **Residentes**: historial clínico, consultas y notas
- **Signos vitales**: registro y seguimiento
- **Medicación**: prescripciones y generación de dosis
- **Personal**: turnos, actividad y trazabilidad individual mediante `action_code` en dispositivos compartidos
- **Habitaciones y camas**: asignación y ocupación
- **Alertas**: avisos derivados del estado clínico
- **Administración**: control administrativo y facturación

## Arquitectura

El backend se organiza en doce contextos acotados — `account`, `activity`, `alerts`, `clinical_record`, `consultation`, `medical`, `notes`, `prescription`, `resident`, `room`, `shift` y `worker` — cada uno con arquitectura DDD de tres capas: dominio, aplicación e infraestructura.

Una capa `shared` concentra las bases DDD, la infraestructura genérica y un event bus construido sobre pyventus. Los patrones event-driven se aplican de forma selectiva, solo donde el desacoplamiento entre contextos lo justifica.

## Calidad

- **356 pruebas** unitarias y de integración con pytest, repartidas en 76 archivos
- **38 pruebas E2E** con Playwright, cubriendo autenticación y roles de autorización

## Stack técnico

- **Frontend**: Next.js, React, TypeScript
- **Backend**: FastAPI, Python, arquitectura DDD por capas
- **Base de datos**: PostgreSQL
- **Eventos**: pyventus
- **Testing**: pytest, Playwright
