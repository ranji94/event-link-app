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
