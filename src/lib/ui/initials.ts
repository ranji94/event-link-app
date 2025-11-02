import type { User } from "@/lib/auth-store";

export function getInitials(user: User): string {
  if (!user) return "??";

  const name = user.name;
  if (typeof name === "string" && name.trim().length > 0) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }

  // fallback: z e-maila
  const email = user.email ?? "";
  const local = email.split("@")[0] ?? "";
  if (!local) return "??";
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return local.slice(0, 2).toUpperCase();
}
