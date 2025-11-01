"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { requestResetSchema } from "@/lib/form";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api";

export default function Page() {
  const form = useForm<z.infer<typeof requestResetSchema>>({
    resolver: zodResolver(requestResetSchema),
  });

  async function onSubmit(values: z.infer<typeof requestResetSchema>) {
    await apiFetch("/auth/requestPasswordReset", {
      method: "POST",
      body: JSON.stringify(values),
    });
    alert("Jeśli konto istnieje, wysłaliśmy mail z instrukcjami.");
  }

  return (
    <AuthCard title="Reset hasła">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...form.register("email")} />
        </div>
        <Button type="submit" className="w-full">
          Wyślij instrukcje
        </Button>
      </form>
    </AuthCard>
  );
}
