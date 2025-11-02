import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiFetch, getMe } from "./api";
import { hideGlobalLoading, setGlobalLoading } from "./ui/overlay";
import { translate } from "@/locales";

export type User = { userId: string; email: string; name: string } | null;

type State = {
  user: User;
  setUser: (u: User) => void;
  clear: () => void;
};

export const useAuthStore = create<State>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clear: () => set({ user: null }),
    }),
    { name: "eventspot_auth" } // localStorage key (tylko UX — źródłem prawdy są cookies)
  )
);

/** Wołaj po starcie aplikacji (np. w layout’cie) */
export async function hydrateAuth() {
  try {
    const me = await getMe();
    useAuthStore.getState().setUser(me);
  } catch {
    useAuthStore.getState().clear();
  }
}

export const useAuthUser = () => useAuthStore((s) => s.user);

/** Logowanie – po sukcesie pobiera /users/me i ustawia store */
export async function login(credentials: { email: string; password: string }) {
  await apiFetch("/auth/login", { method: "POST", body: credentials });
  const me = await getMe();
  useAuthStore.getState().setUser(me);
  return me;
}

/** Wylogowanie – czyści cookie po stronie backendu i store po stronie frontu */
export async function logout() {
  try {
    await setGlobalLoading(translate("auth.logging_out"));
    await apiFetch("/auth/logout", { method: "POST" });
  } finally {
    useAuthStore.getState().clear();
    await hideGlobalLoading();
  }
}
