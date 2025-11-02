import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // ⬅️ await!
  const hasAccess = !!cookieStore.get("access_token");
  const hasRefresh = !!cookieStore.get("refresh_token");

  if (hasAccess || hasRefresh) {
    redirect("/events");
  }
  return <>{children}</>;
}
