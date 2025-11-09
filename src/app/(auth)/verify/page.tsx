"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { AuthCode } from "@/common/enum/auth-code.enum";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { translate } from "@/locales";
import { HeaderNotAuthenticated } from "@/components/common/HeaderNotAuthenticated";
import { toast } from "sonner";

type ViewState = "loading" | "success" | "error" | "missing";

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
      await apiFetch(`/auth/verify-email?token=${encodeURIComponent(token)}`, {
        method: "POST",
      });
      setState("success");
      toast.success(translate("auth.verify.success"));
    } catch (e: any) {
      const errorCode =
        (e?.data?.message as AuthCode.Failed) ??
        AuthCode.Failed.InvalidCredentials;
      const message = translate(`error.auth.${errorCode}`);
      setErrorMsg(message || translate("auth.verify.error_unknown"));
      setState("error");
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div className="flex h-full flex-col bg-background">
      <HeaderNotAuthenticated />
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* Lewy panel – marketing (opcjonalnie możesz go ukryć) */}
        <section className="order-2 space-y-6 lg:order-1 lg:self-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {translate("auth.marketing.headline")}
          </h1>
          <p className="max-w-prose text-muted-foreground">
            {translate("auth.marketing.subheadline")}
          </p>
        </section>

        {/* Prawy panel – karta weryfikacji */}
        <section className="order-1 lg:order-2">
          <AuthCard
            title={translate("auth.verify.title")}
            description={translate("auth.verify.caption")}
          >
            {state === "loading" && (
              <div
                className="flex flex-col items-center gap-3"
                aria-live="polite"
              >
                <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
                <p>{translate("auth.verify.loading")}</p>
              </div>
            )}

            {state === "success" && (
              <div className="space-y-4 text-center" aria-live="polite">
                <div className="mx-auto w-fit rounded-full bg-emerald-50 p-2 dark:bg-emerald-900/20">
                  <CheckCircle2
                    className="h-6 w-6 text-emerald-600 dark:text-emerald-400"
                    aria-hidden
                  />
                </div>
                <p>{translate("auth.verify.success_long")}</p>
                <Button
                  className="cursor-pointer w-full"
                  onClick={() => router.push("/login")}
                >
                  {translate("auth.verify.to_login")}
                </Button>
              </div>
            )}

            {state === "error" && (
              <div className="space-y-4" aria-live="assertive">
                <div className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" aria-hidden />
                  <p className="font-medium">
                    {translate("auth.verify.failed")}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{errorMsg}</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={verify}
                  >
                    {translate("auth.verify.retry")}
                  </Button>
                  <Button
                    className="cursor-pointer"
                    onClick={() => router.push("/login")}
                  >
                    {translate("auth.verify.to_login")}
                  </Button>
                </div>
              </div>
            )}

            {state === "missing" && (
              <div className="space-y-4" aria-live="polite">
                <p className="text-sm">
                  {translate("auth.verify.missing_token")}
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    onClick={() => router.push("/register")}
                  >
                    {translate("auth.verify.register_again")}
                  </Button>
                  <Button
                    className="cursor-pointer"
                    onClick={() => router.push("/login")}
                  >
                    {translate("auth.verify.to_login")}
                  </Button>
                </div>
              </div>
            )}
          </AuthCard>
        </section>
      </main>
    </div>
  );
}
