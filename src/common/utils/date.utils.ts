import { format } from "date-fns";
import { pl } from "date-fns/locale";

export function formatDate(iso?: string | null) {
  if (!iso) return "Brak daty";
  try {
    return format(new Date(iso), "d MMM yyyy, HH:mm", { locale: pl });
  } catch {
    return iso;
  }
}

export function toIsoFromDatetimeLocal(input?: string): string | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export function toDatetimeLocalFromIso(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
