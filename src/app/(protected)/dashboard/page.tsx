"use client";
import { useEffect, useState } from "react";
import { apiFetch, getMe } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const [me, setMe] = useState<{ userId: string; email: string } | null>(null);
  useEffect(() => {
    getMe()
      .then(setMe)
      .catch(() => setMe(null));
  }, []);

  async function onSubmit() {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (e) {
      toast.error("Error logging out.");
    }
  }

  if (!me) return <main className="p-6">Brak dostępu lub nie zalogowano.</main>;
  return (
    <main className="p-6">
      Witaj, {me.email}
      <Button onClick={onSubmit} title="Logout" />
    </main>
  );
}
