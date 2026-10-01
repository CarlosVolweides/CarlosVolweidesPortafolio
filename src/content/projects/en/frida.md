---
title: Frida
description: Clinical and administrative management for geriatric care homes. Patient records, vital signs, medication dosing, staff shifts and billing, built on a three-layer DDD architecture with its own event bus.
role: Fullstack · Engineering Intern
stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'pyventus', 'Playwright']
status: shipped
statusLabel: Shipped
featured: true
date: 2026-07-01
idx: '01'
media:
  - type: image
    src: /media/frida/1.png
    alt: Frida sign-in screen with Institutional / Operational switch
  - type: image
    src: /media/frida/2.png
    alt: Resident grid with status and floor filters
  - type: image
    src: /media/frida/3.png
    alt: Medication dose schedule with statuses and caregiver assignment
  - type: image
    src: /media/frida/4.png
    alt: Scheduled group activities with their participants
  - type: image
    src: /media/frida/5.png
    alt: Rooms overview with total occupancy, status and beds per room
  - type: image
    src: /media/frida/6.png
    alt: Morning, afternoon and night shift management with assigned staff
---

## Overview

Frida runs the full clinical and administrative operation of a geriatric care home. Built at Digitan Agency for a client, end to end and solo: domain modelling, backend, frontend and tests.

## Problem

A care home runs on rotating shifts, devices shared between caregivers, and a clinical logging load that on paper gets lost or duplicated. Without per-person traceability there is no way to know who administered which dose, or to audit a resident's history.

## Solution

Seven functional areas across twelve bounded contexts:

- **Residents**: clinical records, consultations and notes
- **Vital signs**: logging and tracking
- **Medication**: prescriptions and dose generation
- **Staff**: shifts, activity, and per-person traceability through an `action_code` on shared devices
- **Rooms and beds**: assignment and occupancy
- **Alerts**: notices derived from clinical state
- **Administration**: administrative control and billing

## Architecture

The backend is organised into twelve bounded contexts — `account`, `activity`, `alerts`, `clinical_record`, `consultation`, `medical`, `notes`, `prescription`, `resident`, `room`, `shift` and `worker` — each following a three-layer DDD architecture: domain, application and infrastructure.

A `shared` layer holds the DDD base classes, the generic infrastructure and an event bus built on pyventus. Event-driven patterns are applied selectively, only where decoupling between contexts earns it.

## Quality

- **356 unit and integration tests** with pytest, across 76 test files
- **38 E2E tests** with Playwright, covering authentication and authorization roles

## Tech stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: FastAPI, Python, layered DDD architecture
- **Database**: PostgreSQL
- **Events**: pyventus
- **Testing**: pytest, Playwright
