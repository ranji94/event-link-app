"use client";

import { translate } from "@/locales";
import * as React from "react";
import { createPortal } from "react-dom";

export function FullscreenPreview({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-900 lex items-stretch justify-stretch bg-black/60"
    >
      <div className="relative h-full w-full overflow-auto bg-white z-100">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-white/90 px-4 py-3 backdrop-blur">
          <span className="text-sm font-medium text-gray-700">
            {translate("templates.preview")}
          </span>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-black/10 hover:bg-gray-50"
          >
            {translate("button.close")}
          </button>
        </div>

        {/* Pełna strona zaproszenia */}
        <div className="mx-auto w-full max-w-5xl px-4 py-6 z-100">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
