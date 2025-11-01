"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/lib/form";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch, type ApiError } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { normalizeAuthError } from "@/lib/errors";

export default function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await apiFetch("/auth/register", { method: "POST", body: values });
      toast.success(
        "Konto utworzone. Sprawdź skrzynkę pocztową, aby potwierdzić e-mail."
      );
      router.push("/login?registered=1");
    } catch (e) {
      const err = e as ApiError;
      const { code, message } = normalizeAuthError(err.data);

      if (code === "EMAIL_ALREADY_USED") setError("email", { message });
      if (code === "PASSWORD_WEAK") setError("password", { message });

      toast.error(message);
    }
  }

  return (
    <AuthCard title="Rejestracja" description="Utwórz nowe konto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
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

        {/* Hasło */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Hasło</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="******"
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
          <p className="text-xs text-muted-foreground">
            Hasło: min. 8 znaków, mała i wielka litera, cyfra i znak specjalny.
          </p>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message as string}
            </p>
          )}
        </div>

        {/* Imię i nazwisko */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">Imię</Label>
            <Input
              id="firstName"
              placeholder="Jan"
              aria-invalid={!!errors.firstName}
              {...register("firstName")}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">
                {errors.firstName.message as string}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Nazwisko</Label>
            <Input
              id="lastName"
              placeholder="Kowalski"
              aria-invalid={!!errors.lastName}
              {...register("lastName")}
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="text-xs text-destructive">
                {errors.lastName.message as string}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Rejestrowanie…" : "Zarejestruj"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Rejestrując się, akceptujesz regulamin i politykę prywatności.
        </p>
      </form>
    </AuthCard>
  );
}
