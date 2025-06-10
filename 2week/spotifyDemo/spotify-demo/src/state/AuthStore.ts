import { create } from "zustand";
import { AuthState } from "./AuthType";

export const useAuthStore = create<AuthState>((set) => ({
  userId: "",
  setState: (userId: string) => {
    set(() => ({ userId }));
  },
  removeState: () => {
    set(() => ({ userId: "" }));
  },
}));
