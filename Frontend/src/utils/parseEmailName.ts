// src/utils/parseEmailName.ts
export function parseEmailName(email: string): string {
  const local = email.split('@')[0];         // “igor.tacu”
  const [first = '', last = ''] = local.split('.');
  const cap = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  return `${cap(first)} ${cap(last)}`.trim();
}
