"use client";

import { useOverlay } from "@/lib/ui/overlay";
import { ScreenLoader } from "./screen-loader";

export function GlobalOverlay() {
  const { visible, label } = useOverlay();
  if (!visible) return null;
  return <ScreenLoader label={label ?? "Loading ..."} />;
}
