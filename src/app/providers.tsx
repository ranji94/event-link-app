"use client";

import { ConfirmProvider } from "@/components/common/confirm/confirm-provider";
import { PropsWithChildren } from "react";
import React from "React";
import { Toaster } from "sonner";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <Toaster richColors position="top-center" />
      <ConfirmProvider>{children}</ConfirmProvider>;
    </>
  );
}
