# Portafolio — Carlos Volweides

Sitio personal / portafolio. Astro 6 + TypeScript + Tailwind CSS 4 + React (solo como isla para el Cmd+K).

Producción: https://carlosvolweides.dev

## Stack

- **Astro 6** — `output: 'server'` con adapter de Vercel, pero cada página excepto `/` es `prerender = true` (efectivamente estático).
- **Tailwind CSS 4** — vía `@tailwindcss/vite`, sin `tailwind.config`; todo el diseño vive en `src/styles/global.css`.
- **React** — un solo island (`CmdK.tsx`, paleta Cmd+K).
- **i18n nativo de Astro** — español en `/`, inglés en `/en`. Ver `CLAUDE.md` para el detalle de arquitectura.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/ + .vercel/output/
npm run preview  # sirve el build de dist/
```

Requiere Node ≥ 22.12 (`engines` en package.json).

### Variables de entorno

El form de contacto (`src/pages/api/contact.ts`) usa [Resend](https://resend.com) para enviar el email de notificación:

```
RESEND_API_KEY=re_xxxxxxxx
```

Local: crear `.env` en la raíz con esa variable. En Vercel, configurarla en el dashboard del proyecto (Settings → Environment Variables) — no se versiona.

## Estructura

Ver `CLAUDE.md` para la arquitectura completa (i18n, content collections, sistema de diseño, por qué `/` es server-rendered). En resumen:

```
src/
├── components/        — HomePage/ProjectsPage/ProjectPage.astro (thin page bodies) + Header, Footer, ContactForm, CmdK
├── i18n/               — ui.ts (dictionarios es/en), utils.ts
├── content/projects/   — {es,en}/<slug>.md, un archivo por idioma y proyecto
├── layouts/            — BaseLayout.astro (SEO, JSON-LD, hreflang)
├── middleware.ts       — detección de locale en la primera visita
├── pages/              — rutas es (raíz) + /en
└── styles/global.css   — design system completo (CSS vars + todo el CSS)
```

## Deploy en Vercel

El proyecto está enlazado a Vercel con adapter `@astrojs/vercel` y `edgeMiddleware: true` (necesario para que `src/middleware.ts` corra en producción — ver nota en `astro.config.mjs` sobre por qué `/` no puede ser estático).

### Redeploy automático (la vía normal)

```bash
git push origin main
```

Push a `main` dispara un deploy de producción automático en Vercel. No hace falta ningún paso manual.

### Redeploy manual con Vercel CLI

Si necesitás forzar un deploy sin cambios nuevos, o probar antes de mergear:

```bash
npm i -g vercel        # una sola vez
vercel login           # una sola vez
vercel link            # una sola vez, conecta la carpeta local al proyecto de Vercel

vercel                 # deploy de preview
vercel --prod          # deploy directo a producción
```

### Desde el dashboard

En [vercel.com](https://vercel.com) → proyecto → pestaña **Deployments** → `⋯` sobre cualquier deploy previo → **Redeploy**. Útil para volver a lanzar un build anterior sin tocar código (por ejemplo, tras cambiar una env var).

### Rollback

Si un deploy rompe algo: **Deployments** → elegir el último deploy bueno → `⋯` → **Promote to Production**. Es inmediato, no requiere revert de Git.

### Dominio

`site` en `astro.config.mjs` alimenta `robots.txt` y el JSON-LD. Si el dominio cambia, actualizar ese valor y volver a desplegar.
