"use client";

import { useGoogleLogin } from "@/lib/use-google-login";
import * as React from "react";

declare global {
  interface Window {
    google?: any;
  }
}

export function GoogleSignInButton() {
  const { gsiReady } = useGoogleLogin();
  const buttonRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!gsiReady) return;
    if (!window.google?.accounts?.id) return;
    if (!buttonRef.current) return;

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      width: 320,
    });
  }, [gsiReady]);

  return (
    <div className="flex justify-center">
      <div ref={buttonRef} />
    </div>
  );
}
