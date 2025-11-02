"use client";

import { create } from "zustand";

type OverlayState = {
  visible: boolean;
  label: string | null;
  show: (label: string) => void;
  hide: () => void;
};

export const useOverlay = create<OverlayState>((set) => ({
  visible: false,
  label: null,
  show: (label) => set({ visible: true, label }),
  hide: () => set({ visible: false, label: null }),
}));

export async function setGlobalLoading(label: string) {
  useOverlay.getState().show(label);
}

export async function hideGlobalLoading() {
  useOverlay.getState().hide();
}
