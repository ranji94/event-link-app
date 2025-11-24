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
  const [gsiReady, setGsiReady] = React.useState(false);

  React.useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;
    if (!window.google?.accounts?.id) return;

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
        }
      },
    });

    setGsiReady(true);
  }, [router]);

  return { gsiReady };
}
