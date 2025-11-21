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

  const signInWithGoogle = React.useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      toast.error("Brak NEXT_PUBLIC_GOOGLE_CLIENT_ID w env.");
      return;
    }

    if (!window.google?.accounts?.id) {
      toast.error("Google logowanie jest chwilowo niedostępne.");
      return;
    }

    setIsGoogleLoading(true);

    window.google.accounts.id.initialize({
      client_id: clientId,
      ux_mode: "popup",
      auto_select: false,
      cancel_on_tap_outside: true,
      use_fedcm_for_prompt: false, // bez FedCM

      callback: async (response: any) => {
        console.log("GSI callback response:", response);

        const idToken = response?.credential;
        if (!idToken) {
          setIsGoogleLoading(false);
          toast.error("Nie udało się pobrać tokenu Google.");
          return;
        }

        try {
          // użycie apiFetch zamiast fetch
          await apiFetch<{ message: string }>("/auth/google", {
            method: "POST",
            body: { idToken },
          });

          router.replace("/");
        } catch (err) {
          setIsGoogleLoading(false);

          if (err instanceof ApiError) {
            const errorCode =
              (err.data?.message as AuthCode.Failed) ?? AuthCode.Failed.Generic;

            const msg =
              translate(`error.auth.${errorCode}`) ??
              translate("error.auth.GENERIC");

            toast.error(msg);
          } else {
            toast.error(translate("error.auth.GENERIC"));
          }

          return;
        }
      },
    });

    // Prompt po kliknięciu
    window.google.accounts.id.prompt((notification: any) => {
      console.log("GSI prompt notification:", notification);

      if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
        setIsGoogleLoading(false);
      }
    });
  }, [router]);

  return { signInWithGoogle, isGoogleLoading };
}
