import { create } from "zustand";

type User = { userId: string; email: string } | null;

type State = {
  user: User;
  setUser: (u: User) => void;
  clear: () => void;
};

export const useAuthStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clear: () => set({ user: null }),
}));
