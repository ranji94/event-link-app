import { format } from "date-fns";
import { pl } from "date-fns/locale";

export function formatEventDate(
  date?: string | Date | null,
  pattern = "d MMMM yyyy, 'godzina' HH:mm"
): string | null {
  if (!date) return null;
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, pattern, { locale: pl });
}
