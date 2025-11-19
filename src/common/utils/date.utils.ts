import { format } from "date-fns";
import { pl } from "date-fns/locale";

// ISO -> "d MMM yyyy, HH:mm" (np. "2 gru 2025, 18:30")
export function formatDate(iso?: string | null) {
  if (!iso) return "Brak daty";
  try {
    return format(new Date(iso), "d MMM yyyy, HH:mm", { locale: pl });
  } catch {
    return iso;
  }
}

// DISPLAY: "dd.MM.yyyy, hh:mm"
export const DISPLAY_REGEX = /^(\d{2})\.(\d{2})\.(\d{4}),\s(\d{2}):(\d{2})$/;

// "dd.MM.yyyy, hh:mm" -> ISO 8601
export function displayToIso(display?: string | null): string | undefined {
  if (!display) return undefined;
  const m = display.match(DISPLAY_REGEX);
  if (!m) return undefined;
  const [, dd, mm, yyyy, hh, mi] = m;
  const d = new Date(
    Number(yyyy),
    Number(mm) - 1,
    Number(dd),
    Number(hh),
    Number(mi),
    0,
    0
  );
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ISO -> "dd.MM.yyyy, hh:mm"
export function isoToDisplay(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad(d.getDate())}.${pad(
    d.getMonth() + 1
  )}.${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// 'YYYY-MM-DDTHH:mm' | native stringy -> porównanie
export function laterNative(a?: string, b?: string): string {
  const da = a ? new Date(a) : null;
  const db = b ? new Date(b) : null;
  if (!da && !db) return "";
  if (da && !db) return a!;
  if (!da && db) return b!;
  return da!.getTime() >= db!.getTime() ? a! : b!;
}

export function maxOneYearNative(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  d.setSeconds(0, 0);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

// "dd.MM.yyyy, hh:mm" -> Date
export function parseDisplayToDate(value: string): Date | null {
  const m = value.match(DISPLAY_REGEX);
  if (!m) return null;

  const [, d, mo, y, hh, mm] = m;
  const year = Number(y);
  const monthIndex = Number(mo) - 1;
  const day = Number(d);
  const hour = Number(hh);
  const minute = Number(mm);

  const date = new Date(year, monthIndex, day, hour, minute, 0, 0);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== monthIndex ||
    date.getDate() !== day ||
    date.getHours() !== hour ||
    date.getMinutes() !== minute
  ) {
    return null;
  }
  return date;
}

// Date -> "dd.MM.yyyy, hh:mm"
export function formatDisplay(date: Date): string {
  return `${pad(date.getDate())}.${pad(
    date.getMonth() + 1
  )}.${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

// "dd.MM.yyyy, hh:mm" -> "YYYY-MM-DDTHH:mm" (native input)
export function displayToNative(value?: string): string {
  if (!value) return "";
  const d = parseDisplayToDate(value);
  if (!d) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

// "YYYY-MM-DDTHH:mm" -> "dd.MM.yyyy, hh:mm"
export function nativeToDisplay(value?: string): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return formatDisplay(d);
}

// teraz (zaokrąglony do minuty) w formacie 'YYYY-MM-DDTHH:mm'
export function nowNative(): string {
  const d = new Date();
  d.setSeconds(0, 0);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
