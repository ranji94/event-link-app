"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, CalendarDays, Mail, Users } from "lucide-react";

import { loginSchema } from "@/lib/form";
import { translate } from "@/locales";
import { AuthCode } from "@/common/enum/auth-code.enum";
import { login } from "@/lib/auth-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "@/common/assets/google-icon";
import { HeaderNotAuthenticated } from "@/components/common/HeaderNotAuthenticated";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await login(values);
      router.replace("/");
      router.refresh();
    } catch (e: unknown) {
      const payload = (e as { data: { message: AuthCode.Failed } })?.data;
      const errorCode = payload?.message || AuthCode.Failed.InvalidCredentials;
      const message = translate(`error.auth.${errorCode}`);
      setValue("password", "");
      toast.error(message);
    }
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <HeaderNotAuthenticated />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Marketing / left pane */}
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

        {/* Auth card / right pane */}
        <section
          aria-label={translate("auth.login.section_label")}
          className="order-1 lg:order-2"
        >
          <div className="mx-auto w-full max-w-md rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                {translate("auth.login.title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {translate("auth.login.caption")}
              </p>
            </div>

            {/* Social buttons */}
            <div className="flex flex-col gap-3">
              <GoogleSignInButton />
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {translate("auth.login.divider")}
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
            >
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  {translate("auth.login.form.email.label")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={translate("auth.login.form.email.placeholder")}
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

              {/* Password with toggle */}
              <div className="space-y-1.5">
                <Label htmlFor="password">
                  {translate("auth.login.form.password.label")}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder={translate(
                      "auth.login.form.password.placeholder"
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
                        ? translate("auth.login.form.password.hide")
                        : translate("auth.login.form.password.show")
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
                {errors.password && (
                  <p className="text-xs text-destructive">
                    {String(errors.password.message)}
                  </p>
                )}
              </div>

              {/* Helper links */}
              <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                <Link
                  className="underline underline-offset-4"
                  href="/reset-password"
                >
                  {translate("auth.login.help.forgot")}
                </Link>
                <Link className="underline underline-offset-4" href="/register">
                  {translate("auth.login.help.register")}
                </Link>
              </div>

              {/* Submit */}
              <Button
                className="cursor-pointer w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="animate-spin" size={16} />
                    {translate("auth.login.cta.loading")}
                  </span>
                ) : (
                  translate("auth.login.cta.primary")
                )}
              </Button>
            </form>

            {/* Informacja o polityce – footer masz globalny, więc tu tylko drobny tekst (opcjonalnie) */}
            <p className="mt-6 text-center text-xs text-muted-foreground">
              {translate("auth.login.legal")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
