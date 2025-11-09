"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resetPasswordSchema as baseSchema } from "@/lib/form";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";
import { translate } from "@/locales";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { HeaderNotAuthenticated } from "@/components/common/HeaderNotAuthenticated";

/** Pasek siły hasła (jak w register) */
function getPasswordScore(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 5);
}
function PasswordStrengthBar({ password }: { password: string }) {
  const score = getPasswordScore(password);
  const labelKey =
    score <= 1
      ? "auth.register.password_strength.very_weak"
      : score === 2
      ? "auth.register.password_strength.weak"
      : score === 3
      ? "auth.register.password_strength.medium"
      : score === 4
      ? "auth.register.password_strength.strong"
      : "auth.register.password_strength.very_strong";

  return (
    <div className="space-y-1" aria-live="polite">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 transition-all ${
              i < score ? "bg-primary" : "bg-transparent"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {translate("auth.register.password_strength.label")}{" "}
        <span className="font-medium">{translate(labelKey)}</span>
      </p>
    </div>
  );
}

/** Rozszerzamy schema o confirmPassword (front-only) */
const schema = baseSchema
  .extend({
    confirmPassword: z
      .string()
      .min(1, { message: translate("auth.register.form.confirm.required") }),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    path: ["confirmPassword"],
    message: translate("auth.register.form.confirm.match_error"),
  });

export default function Page() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const router = useRouter();

  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { token, newPassword: "", confirmPassword: "" },
    mode: "onSubmit",
  });

  const newPassword = form.watch("newPassword") || "";

  async function onSubmit(values: z.infer<typeof schema>) {
    const { confirmPassword, ...payload } = values;
    await apiFetch("/auth/resetPassword", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    toast.success(translate("auth.reset.confirm.success"));
    router.push("/login");
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
            title={translate("auth.reset.confirm.title")}
            description={translate("auth.reset.confirm.caption")}
          >
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              {/* Nowe hasło */}
              <div className="space-y-1.5">
                <Label htmlFor="newPassword">
                  {translate("auth.reset.confirm.form.password.label")}
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder={translate(
                      "auth.register.form.password.placeholder"
                    )}
                    aria-invalid={!!form.formState.errors.newPassword}
                    {...form.register("newPassword")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={
                      showNew
                        ? translate("auth.register.form.password.hide")
                        : translate("auth.register.form.password.show")
                    }
                    tabIndex={-1}
                  >
                    {showNew ? (
                      <EyeOff size={18} strokeWidth={1.75} />
                    ) : (
                      <Eye size={18} strokeWidth={1.75} />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {translate("auth.register.form.password.hint")}
                </p>
                <PasswordStrengthBar password={newPassword} />
                {form.formState.errors.newPassword && (
                  <p className="text-xs text-destructive">
                    {String(form.formState.errors.newPassword.message)}
                  </p>
                )}
              </div>

              {/* Potwierdź hasło */}
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">
                  {translate("auth.register.form.confirm.label")}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder={translate(
                      "auth.register.form.confirm.placeholder"
                    )}
                    aria-invalid={!!form.formState.errors.confirmPassword}
                    {...form.register("confirmPassword")}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={
                      showConfirm
                        ? translate("auth.register.form.confirm.hide")
                        : translate("auth.register.form.confirm.show")
                    }
                    tabIndex={-1}
                  >
                    {showConfirm ? (
                      <EyeOff size={18} strokeWidth={1.75} />
                    ) : (
                      <Eye size={18} strokeWidth={1.75} />
                    )}
                  </button>
                </div>
                {form.formState.errors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {String(form.formState.errors.confirmPassword.message)}
                  </p>
                )}
              </div>

              {/* token jako hidden */}
              <input type="hidden" {...form.register("token")} />

              <Button type="submit" className="cursor-pointer w-full">
                {translate("auth.reset.confirm.cta")}
              </Button>
            </form>
          </AuthCard>
        </section>
      </main>
    </div>
  );
}
