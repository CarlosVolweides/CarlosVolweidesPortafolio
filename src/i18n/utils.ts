import { getCollection } from 'astro:content';
import { ui, DEFAULT_LANG, LOCALES, SECTIONS, type Dict, type Lang } from './ui';
import type { CmdkItem } from '../components/CmdK';

/** Un PDF por idioma en `public/cv/`, generados por `cv/build_cv.py`. */
export function cvPath(lang: Lang): string {
  return `/cv/carlos-volweides-cv-${lang}.pdf`;
}

/** Nombre con el que se guarda el PDF al descargarlo. */
export function cvFilename(lang: Lang): string {
  return `Carlos-Volweides-CV-${lang.toUpperCase()}.pdf`;
}

export function isLang(value: unknown): value is Lang {
  return LOCALES.includes(value as Lang);
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return isLang(first) ? first : DEFAULT_LANG;
}

/** Returns the whole dictionary — property access keeps the keys typechecked. */
export function useTranslations(lang: Lang): Dict {
  return ui[lang];
}

/** Fills `{placeholders}` in a dictionary string. */
export function fmt(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in params ? String(params[key]) : match
  );
}

/**
 * Prefixes an app path with the locale. The default locale lives at the root.
 * Only for app routes — never pass `/api/*` or public assets through this.
 */
export function localizePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === DEFAULT_LANG ? clean : `/${lang}${clean}`;
}

/** Strips the locale prefix, giving the canonical path shape shared across languages. */
export function stripLangPrefix(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (!isLang(first) || first === DEFAULT_LANG) return pathname;
  return `/${rest.join('/')}`;
}

/** The same page in every locale, keyed by locale. Drives LangToggle and hreflang. */
export function alternatePaths(pathname: string): Record<Lang, string> {
  const base = stripLangPrefix(pathname);
  return Object.fromEntries(
    LOCALES.map((l) => [l, localizePath(l, base)])
  ) as Record<Lang, string>;
}

/** Command palette entries, localized. Built server-side so the island stays dumb. */
export function getCmdkItems(lang: Lang): CmdkItem[] {
  const t = useTranslations(lang);
  const home = localizePath(lang, '/');
  return [
    ...SECTIONS.map((s) => ({
      label: fmt(t.cmdk.goto, { label: t.nav[s.key] }),
      hint: s.num,
      href: `${home}#${s.id}`,
    })),
    { label: t.cmdk.cv, hint: 'cv', href: cvPath(lang) },
    { label: t.cmdk.email, hint: 'mail', href: 'mailto:carlos.volweides@gmail.com' },
    { label: t.cmdk.github, hint: 'gh', href: 'https://github.com/CarlosVolweides' },
    { label: t.cmdk.linkedin, hint: 'in', href: 'https://linkedin.com/in/carlos-volweides' },
    { label: t.cmdk.allProjects, hint: '04', href: localizePath(lang, '/projects') },
  ];
}

export type LocalizedProject = Awaited<ReturnType<typeof getProjects>>[number];

/**
 * Projects live at `src/content/projects/<lang>/<slug>.md`, so the collection `id`
 * carries the locale. Filtering here is what keeps a locale from rendering all
 * six files (three per language) and inflating the project counter.
 */
export async function getProjects(lang: Lang) {
  const entries = await getCollection('projects', ({ id }) => id.startsWith(`${lang}/`));
  return entries
    .map((entry) => ({ ...entry, slug: entry.id.slice(lang.length + 1) }))
    .sort((a, b) => a.data.idx.localeCompare(b.data.idx));
}

export async function getProject(lang: Lang, slug: string) {
  const projects = await getProjects(lang);
  return projects.find((p) => p.slug === slug);
}
