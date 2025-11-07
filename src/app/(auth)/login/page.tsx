"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/form";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { translate } from "@/locales";
import { AuthCode } from "@/common/enum/auth-code.enum";
import { login } from "@/lib/auth-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
    } catch (e: unknown) {
      const payload = (e as { data: { message: AuthCode.Failed } })?.data;
      const errorCode = payload?.message || AuthCode.Failed.InvalidCredentials;

      const message = translate(`error.auth.${errorCode}`);

      setValue("password", "");

      // Ładny toast według kodu
      toast.error(message);
    }
  }

  return (
    <AuthCard title="Logowanie">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="jan.kowalski@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-xs text-destructive">
              {errors.email.message as string}
            </p>
          )}
        </div>

        {/* Hasło z ikoną show/hide */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Hasło</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              {...register("password")}
              disabled={isSubmitting}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
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
              {errors.password.message as string}
            </p>
          )}
        </div>

        {/* Linki pomocnicze */}
        <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
          <Link className="underline underline-offset-4" href="/reset-password">
            Zapomniałeś hasła?
          </Link>
          <Link className="underline underline-offset-4" href="/register">
            Nie masz konta? Zarejestruj się
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
              Logowanie…
            </span>
          ) : (
            "Zaloguj"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
