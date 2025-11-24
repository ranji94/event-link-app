"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiFetch, ApiError } from "@/lib/api";
import { translate } from "@/locales";
import { AuthCode } from "@/common/enum/auth-code.enum";

declare global {
  interface Window {
    google?: any;
  }
}

export function useGoogleLogin() {
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [gsiReady, setGsiReady] = React.useState(false);

  React.useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error(
        "[GSI] Brak NEXT_PUBLIC_GOOGLE_CLIENT_ID – Google login nie będzie działać."
      );
      return;
    }

    let cancelled = false;

    const initializeGsi = () => {
      if (!window.google?.accounts?.id) {
        // skrypt GSI jeszcze się nie załadował
        return false;
      }

      console.log("[GSI] Inicjalizacja google.accounts.id");
      window.google.accounts.id.initialize({
        client_id: clientId,
        ux_mode: "popup",
        auto_select: false,
        cancel_on_tap_outside: true,
        use_fedcm_for_prompt: true,
        itp_support: true,
        callback: async (response: any) => {
          const idToken = response?.credential;
          if (!idToken) {
            setIsGoogleLoading(false);
            toast.error("Nie udało się pobrać tokenu Google.");
            return;
          }

          try {
            await apiFetch<{ message: string }>("/auth/google", {
              method: "POST",
              body: { idToken },
            });

            router.replace("/");
          } catch (err) {
            setIsGoogleLoading(false);

            if (err instanceof ApiError) {
              const errorCode =
                (err.data?.message as AuthCode.Failed) ??
                AuthCode.Failed.Generic;

              const msg =
                translate(`error.auth.${errorCode}`) ??
                translate("error.auth.GENERIC");

              toast.error(msg);
            } else {
              toast.error(translate("error.auth.GENERIC"));
            }
          }
        },
      });

      if (!cancelled) {
        setGsiReady(true);
      }
      return true;
    };

    // próbujemy od razu
    if (initializeGsi()) {
      return () => {
        cancelled = true;
      };
    }

    // jeśli jeszcze nie ma window.google, próbujemy co 100 ms
    const interval = window.setInterval(() => {
      if (cancelled) {
        window.clearInterval(interval);
        return;
      }

      if (initializeGsi()) {
        window.clearInterval(interval);
      }
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [router]);

  const signInWithGoogle = React.useCallback(() => {
    if (!gsiReady) {
      toast.error("Google logowanie jest chwilowo niedostępne.");
      console.warn(
        "[GSI] Próba logowania przy gsiReady = false – sprawdź, czy skrypt GSI jest załadowany i czy jest ustawione NEXT_PUBLIC_GOOGLE_CLIENT_ID."
      );
      return;
    }

    setIsGoogleLoading(true);

    window.google.accounts.id.prompt((notification: any) => {
      console.log("GSI prompt notification:", notification);

      if (notification.isNotDisplayed?.()) {
        const reason = notification.getNotDisplayedReason?.();
        console.log("One Tap not displayed reason:", reason);
      }

      if (notification.isSkippedMoment?.()) {
        const reason = notification.getSkippedReason?.();
        console.log("One Tap skipped reason:", reason);

        if (reason === "dismissed_by_user") {
          toast.info(
            "Anulowałaś logowanie Google. Google może chwilowo nie pokazywać ponownie tego okna."
          );
        }
      }

      setIsGoogleLoading(false);
    });
  }, [gsiReady]);

  return { signInWithGoogle, isGoogleLoading };
}
