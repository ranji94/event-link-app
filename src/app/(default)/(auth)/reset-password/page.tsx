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
import { translate } from "@/locales";
import { HeaderNotAuthenticated } from "@/components/common/HeaderNotAuthenticated";
import Link from "next/link";
import { toast } from "sonner";

export default function Page() {
  const form = useForm<z.infer<typeof requestResetSchema>>({
    resolver: zodResolver(requestResetSchema),
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof requestResetSchema>) {
    await apiFetch(`/auth/requestPasswordReset?email=${values.email}`, {
      method: "POST",
    });
    toast.success(translate("auth.reset.request.success"));
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <HeaderNotAuthenticated />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Lewy panel */}
        <section className="order-2 space-y-6 lg:order-1 lg:self-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {translate("auth.marketing.headline")}
          </h1>
          <p className="max-w-prose text-muted-foreground">
            {translate("auth.marketing.subheadline")}
          </p>
        </section>

        {/* Prawy panel – karta */}
        <section className="order-1 lg:order-2">
          <AuthCard
            title={translate("auth.reset.request.title")}
            description={translate("auth.reset.request.caption")}
          >
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  {translate("auth.reset.request.form.email.label")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={translate(
                    "auth.reset.request.form.email.placeholder"
                  )}
                  aria-invalid={!!form.formState.errors.email}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {String(form.formState.errors.email.message)}
                  </p>
                )}
              </div>

              <Button type="submit" className="cursor-pointer w-full">
                {translate("auth.reset.request.cta")}
              </Button>

              <div className="text-center text-sm">
                <Link href="/login" className="underline underline-offset-4">
                  {translate("auth.reset.request.back_to_login")}
                </Link>
              </div>
            </form>
          </AuthCard>
        </section>
      </main>
    </div>
  );
}
