"use client";

import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";

export function ScreenLoader({ label = "loading" }: { label?: string }) {
  if (typeof window === "undefined") return null;
  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-lg">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>,
    document.body
  );
}
