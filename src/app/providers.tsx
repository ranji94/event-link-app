"use client";

import { ConfirmProvider } from "@/components/common/confirm/confirm-provider";
import Script from "next/script";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <Script
        async
        defer
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />
      <Toaster richColors position="top-center" />
      <ConfirmProvider>{children}</ConfirmProvider>
    </>
  );
}
