"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, CalendarDays, Mail, Users } from "lucide-react";

import { registerSchema as baseRegisterSchema } from "@/lib/form";
import { translate } from "@/locales";
import { AuthCode } from "@/common/enum/auth-code.enum";
import { apiFetch } from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/common/assets/google-icon";
import { HeaderNotAuthenticated } from "@/components/common/HeaderNotAuthenticated";
import { useGoogleLogin } from "@/lib/use-google-login";

/** ——— Password strength ——— */
function getPasswordScore(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  // 0..5
  return Math.min(score, 5);
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

/** ——— Schema z potwierdzeniem hasła ——— */
const schema = baseRegisterSchema
  .extend({
    confirmPassword: z
      .string()
      .min(1, { message: translate("auth.register.form.confirm.required") }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: translate("auth.register.form.confirm.match_error"),
  });

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const { signInWithGoogle, isGoogleLoading } = useGoogleLogin();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const currentPassword = watch("password") || "";

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      // Usuń confirmPassword przed wysyłką (backend go nie potrzebuje)
      const { confirmPassword, ...payload } = values;
      await apiFetch("/auth/register", { method: "POST", body: payload });
      toast.success(translate("auth.register.success"));
      router.push("/login?registered=1");
    } catch (e) {
      const payload = (e as { data: { message: AuthCode.Failed } })?.data;
      const errorCode = payload?.message || AuthCode.Failed.InvalidCredentials;
      const message = translate(`error.auth.${errorCode}`);
      toast.error(message);
    }
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <HeaderNotAuthenticated />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Marketing / lewy panel */}
        <section className="order-2 space-y-6 lg:order-1 lg:self-center">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {translate("auth.marketing.headline")}
            </h1>
            <p className="max-w-prose text-muted-foreground">
              {translate("auth.marketing.subheadline")}
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <li className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <div>
                <p className="font-medium">
                  {translate("auth.features.plan.title")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {translate("auth.features.plan.desc")}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
              <Mail className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <div>
                <p className="font-medium">
                  {translate("auth.features.invites.title")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {translate("auth.features.invites.desc")}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border bg-card p-4 shadow-sm">
              <Users className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <div>
                <p className="font-medium">
                  {translate("auth.features.guests.title")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {translate("auth.features.guests.desc")}
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Karta rejestracji / prawy panel */}
        <section
          aria-label={translate("auth.register.section_label")}
          className="order-1 lg:order-2"
        >
          <div className="mx-auto w-full max-w-md rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                {translate("auth.register.title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {translate("auth.register.caption")}
              </p>
            </div>

            {/* Social buttons */}
            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
                onClick={signInWithGoogle}
                disabled={isSubmitting || isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    {translate("auth.register.google_loading")}
                  </span>
                ) : (
                  <>
                    <GoogleIcon />
                    {translate("auth.register.google")}
                  </>
                )}
              </Button>
              {/* Jeśli chcesz włączyć FB, odkomentuj i podłącz swoją ikonę */}
              {/* <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => console.log("Facebook sign-up clicked")}
              >
                {translate("auth.register.facebook")}
              </Button> */}
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {translate("auth.register.divider")}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              {/* Imię i nazwisko */}
              <div className="space-y-1.5">
                <Label htmlFor="name">
                  {translate("auth.register.form.name.label")}
                </Label>
                <Input
                  id="name"
                  placeholder={translate("auth.register.form.name.placeholder")}
                  aria-invalid={!!errors.name}
                  {...register("name")}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  {translate("auth.register.form.email.label")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={translate(
                    "auth.register.form.email.placeholder"
                  )}
                  aria-invalid={!!errors.email}
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {String(errors.email.message)}
                  </p>
                )}
              </div>

              {/* Hasło */}
              <div className="space-y-1.5">
                <Label htmlFor="password">
                  {translate("auth.register.form.password.label")}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder={translate(
                      "auth.register.form.password.placeholder"
                    )}
                    aria-invalid={!!errors.password}
                    {...register("password")}
                    disabled={isSubmitting}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={
                      showPassword
                        ? translate("auth.register.form.password.hide")
                        : translate("auth.register.form.password.show")
                    }
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={1.75} />
                    ) : (
                      <Eye size={18} strokeWidth={1.75} />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {translate("auth.register.form.password.hint")}
                </p>

                {/* Pasek złożoności */}
                <PasswordStrengthBar password={currentPassword} />

                {errors.password && (
                  <p className="text-xs text-destructive">
                    {String(errors.password.message)}
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
                    aria-invalid={!!errors.confirmPassword}
                    {...register("confirmPassword")}
                    disabled={isSubmitting}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive">
                    {String(errors.confirmPassword.message)}
                  </p>
                )}
              </div>

              {/* Link pomocniczy */}
              <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="text-muted-foreground">
                  {translate("auth.register.help.have_account")}
                </span>
                <Link className="underline underline-offset-4" href="/login">
                  {translate("auth.register.help.login_link")}
                </Link>
              </div>

              {/* CTA */}
              <Button
                className="cursor-pointer w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    {translate("auth.register.cta.loading")}
                  </span>
                ) : (
                  translate("auth.register.cta.primary")
                )}
              </Button>
            </form>

            {/* Informacja prawna */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              {translate("auth.register.legal_prefix")}{" "}
              <Link href="/terms" className="underline underline-offset-4">
                {translate("auth.register.legal_terms")}
              </Link>{" "}
              {translate("auth.register.legal_and")}{" "}
              <Link href="/privacy" className="underline underline-offset-4">
                {translate("auth.register.legal_privacy")}
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
