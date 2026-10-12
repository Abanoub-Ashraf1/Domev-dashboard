import { isTokenExpired } from "./jwt";

const KEY = "domev.session";

export function loadSession() {
  for (const store of [localStorage, sessionStorage]) {
    try {
      const session = JSON.parse(store.getItem(KEY) || "null");
      if (session?.token && !isTokenExpired(session.token)) return session;
      if (session) store.removeItem(KEY);
    } catch {
      store.removeItem(KEY);
    }
  }
  return null;
}

export function saveSession(session, remember) {
  clearSession();
  (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
}

export function getToken() {
  return loadSession()?.token ?? null;
}
