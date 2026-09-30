import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 1000;

/**
 * The visitor-facing copy lives in the client dictionary (src/i18n/ui.ts), keyed
 * by these codes. The API stays language-agnostic.
 */
type ErrorCode =
  | 'NAME_REQUIRED'
  | 'EMAIL_REQUIRED'
  | 'EMAIL_INVALID'
  | 'TIPO_INVALID'
  | 'MESSAGE_REQUIRED'
  | 'MESSAGE_TOO_LONG'
  | 'BAD_JSON'
  | 'SERVER_ERROR'
  | 'SEND_FAILED';

// The notification email is always in Spanish — it goes to Carlos, not the visitor.
const TIPO_LABELS: Record<string, string> = {
  trabajo: 'Oferta de trabajo',
  freelance: 'Proyecto freelance',
  networking: 'Networking / Otro',
};

// Which language the visitor was reading the site in, for the notification email.
const LANG_LABELS: Record<string, string> = {
  es: 'Español',
  en: 'Inglés',
  pt: 'Portugués',
};

interface ContactBody {
  nombre: string;
  email: string;
  tipo: string;
  empresa: string;
  mensaje: string;
  lang: string;
}

function fail(code: ErrorCode, status: number): Response {
  return new Response(JSON.stringify({ code }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validate(body: Partial<ContactBody>): ErrorCode | null {
  if (!body.nombre?.trim()) return 'NAME_REQUIRED';
  if (!body.email?.trim()) return 'EMAIL_REQUIRED';
  if (!EMAIL_RE.test(body.email.trim())) return 'EMAIL_INVALID';
  if (!body.tipo || !(body.tipo in TIPO_LABELS)) return 'TIPO_INVALID';
  if (!body.mensaje?.trim()) return 'MESSAGE_REQUIRED';
  if (body.mensaje.length > MAX_MESSAGE_LENGTH) return 'MESSAGE_TOO_LONG';
  return null;
}

function buildEmailHtml(body: ContactBody): string {
  const nombre = escapeHtml(body.nombre.trim());
  const email = escapeHtml(body.email.trim());
  const empresa = body.empresa.trim() ? escapeHtml(body.empresa.trim()) : '';
  const mensaje = escapeHtml(body.mensaje.trim());
  const tipoLabel = TIPO_LABELS[body.tipo];
  const idioma = LANG_LABELS[body.lang] ?? LANG_LABELS.es;

  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <span style="display: inline-block; background: #101012; color: #6fe3c4; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 10px; border-radius: 999px;">
        ${tipoLabel}
      </span>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #5a5a63; width: 120px;">Nombre</td>
          <td style="padding: 6px 0; color: #1a1a1a;">${nombre}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5a5a63;">Email</td>
          <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0a7d5f;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #5a5a63;">Motivo</td>
          <td style="padding: 6px 0; color: #1a1a1a;">${tipoLabel}</td>
        </tr>
        ${empresa ? `
        <tr>
          <td style="padding: 6px 0; color: #5a5a63;">Empresa</td>
          <td style="padding: 6px 0; color: #1a1a1a;">${empresa}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 6px 0; color: #5a5a63;">Idioma</td>
          <td style="padding: 6px 0; color: #1a1a1a;">${idioma}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px; white-space: pre-wrap; font-size: 14px; color: #1a1a1a;">${mensaje}</div>
      <p style="margin-top: 24px; font-size: 12px; color: #8a8a93;">
        Este mensaje fue enviado desde el formulario de contacto de tu portafolio. Responde directamente a este email para contactar a ${nombre}.
      </p>
    </div>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail('BAD_JSON', 400);
  }

  const body = raw as Partial<ContactBody>;
  const validationError = validate(body);
  if (validationError) {
    return fail(validationError, 422);
  }

  const contactBody: ContactBody = {
    nombre: body.nombre!.trim(),
    email: body.email!.trim(),
    tipo: body.tipo!,
    empresa: body.empresa?.trim() ?? '',
    mensaje: body.mensaje!.trim(),
    lang: body.lang && body.lang in LANG_LABELS ? body.lang : 'es',
  };

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL;
  const from = import.meta.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!apiKey || !to) {
    return fail('SERVER_ERROR', 500);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: contactBody.email,
      subject: `[Portafolio] ${TIPO_LABELS[contactBody.tipo]} — ${contactBody.nombre}`,
      html: buildEmailHtml(contactBody),
    });

    if (error) {
      return fail('SEND_FAILED', 502);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return fail('SEND_FAILED', 502);
  }
};
