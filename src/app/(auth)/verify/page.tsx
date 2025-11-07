"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { apiFetch, type ApiError } from "@/lib/api";
import { AuthCode, normalizeAuthError } from "@/common/enum/auth-code.enum";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { translate } from "@/locales";

type ViewState = "loading" | "success" | "error" | "missing";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  const router = useRouter();

  const [state, setState] = useState<ViewState>(token ? "loading" : "missing");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const verify = useCallback(async () => {
    if (!token) {
      setState("missing");
      return;
    }
    setState("loading");
    setErrorMsg("");
    try {
      await apiFetch("/auth/verify-email", {
        method: "POST",
        body: { token },
      });
      setState("success");
    } catch (e) {
      const payload = (e as { data: { message: AuthCode.Failed } })?.data;
      const errorCode = payload?.message || AuthCode.Failed.InvalidCredentials;

      const message =
        typeof errorCode === AuthCode.Failed
          ? translate(`error.auth.${errorCode}`)
          : errorCode;

      setErrorMsg(message || "Nieprawidłowy lub wygasły token.");
      setState("error");
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <AuthCard
      title="Weryfikacja e-mail"
      description="Potwierdzenie adresu e-mail"
    >
      {/* LOADING */}
      {state === "loading" && (
        <div className="flex flex-col items-center gap-3" aria-live="polite">
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
          <p>Weryfikuję token…</p>
        </div>
      )}

      {/* SUCCESS */}
      {state === "success" && (
        <div className="space-y-4 text-center" aria-live="polite">
          <div className="mx-auto w-fit rounded-full bg-emerald-50 p-2 dark:bg-emerald-900/20">
            <CheckCircle2
              className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
          </div>
          <p>Adres e-mail został pomyślnie potwierdzony.</p>
          <Button className="w-full" onClick={() => router.push("/login")}>
            Przejdź do logowania
          </Button>
        </div>
      )}

      {/* ERROR */}
      {state === "error" && (
        <div className="space-y-4" aria-live="assertive">
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" aria-hidden />
            <p className="font-medium">Weryfikacja nie powiodła się</p>
          </div>
          <p className="text-sm text-muted-foreground">{errorMsg}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button variant="outline" onClick={verify}>
              Spróbuj ponownie
            </Button>
            <Button onClick={() => router.push("/login")}>
              Wróć do logowania
            </Button>
          </div>
        </div>
      )}

      {/* MISSING TOKEN */}
      {state === "missing" && (
        <div className="space-y-4" aria-live="polite">
          <p className="text-sm">
            Brakuje parametru <span className="font-mono">token</span> w
            adresie. Upewnij się, że używasz linku z e-maila weryfikacyjnego.
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => router.push("/register")}
            >
              Zarejestruj ponownie
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Przejdź do logowania
            </Button>
          </div>
        </div>
      )}
    </AuthCard>
  );
}
