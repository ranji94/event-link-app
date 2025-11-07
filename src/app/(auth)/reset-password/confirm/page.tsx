"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/form";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, newPassword: "" },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    await apiFetch("/auth/resetPassword", {
      method: "POST",
      body: JSON.stringify(values),
    });
    alert("Hasło zostało zmienione. Zaloguj się nowym hasłem.");
    router.push("/login");
  }

  return (
    <AuthCard title="Ustaw nowe hasło">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="newPassword">Nowe hasło</Label>
          <Input
            id="newPassword"
            type="password"
            {...form.register("newPassword")}
          />
        </div>
        <input type="hidden" {...form.register("token")} />
        <Button type="submit" className="w-full">
          Zapisz
        </Button>
      </form>
    </AuthCard>
  );
}
