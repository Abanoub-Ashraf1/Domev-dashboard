import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ApiError, setUnauthorizedHandler } from "../services/apiClient";
import { authService } from "../services/authService";
import { canAccessAdmin } from "./permissions";
import { clearSession, loadSession, saveSession } from "./tokenStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession()); // { token, user } | null
  const [checking, setChecking] = useState(() => Boolean(loadSession()));
  const [notice, setNotice] = useState("");

  const logout = useCallback((message = "") => {
    clearSession();
    setSession(null);
    setNotice(message);
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => logout("Your session has expired. Sign in again."));
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  // Validate stored token on mount
  useEffect(() => {
    if (!session) {
      setChecking(false);
      return undefined;
    }
    let cancelled = false;
    authService
      .getProfile()
      .catch(() => {})
      .finally(() => !cancelled && setChecking(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (email, password, remember) => {
    const next = await authService.login(email, password);
    if (!canAccessAdmin(next.user)) {
      throw new ApiError("This account doesn't have admin access.", { status: 403 });
    }
    saveSession(next, remember);
    setNotice("");
    setSession(next);
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: Boolean(session),
      checking,
      notice,
      login,
      logout: () => logout(),
    }),
    [session, checking, notice, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
