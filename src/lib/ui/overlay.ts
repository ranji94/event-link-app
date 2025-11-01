"use client";

import { TranslationKey } from "@/locales";
import { create } from "zustand";

type OverlayState = {
  visible: boolean;
  label: TranslationKey | null;
  show: (label: TranslationKey) => void;
  hide: () => void;
};

export const useOverlay = create<OverlayState>((set) => ({
  visible: false,
  label: null,
  show: (label) => set({ visible: true, label }),
  hide: () => set({ visible: false, label: null }),
}));
