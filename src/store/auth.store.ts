import { Session } from "next-auth";
import { create } from "zustand";

type SessionStatus = "authenticated" | "unauthenticated" | "loading";

interface AuthState {
  isAuthenticated: boolean;
  status: SessionStatus;
  session: Session | null;
  setAuthState: (status: SessionStatus, session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  status: "loading",
  session: null,
  setAuthState: (status: SessionStatus, session: Session | null) => {
    set({
      status,
      session,
      isAuthenticated: status === "authenticated",
    });
  },
}));
