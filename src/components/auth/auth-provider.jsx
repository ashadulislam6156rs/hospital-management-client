"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AUTH_STORAGE_KEY,
  STATIC_USER,
  isValidStaticCredentials,
  parseUserSession,
  serializeUserSession,
} from "@/lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = parseUserSession(window.localStorage.getItem(AUTH_STORAGE_KEY));

    queueMicrotask(() => {
      if (stored?.email === STATIC_USER.email) {
        setUser(stored);
      }

      setIsReady(true);
    });
  }, []);

  function signIn({ email, password }) {
    if (!isValidStaticCredentials(email, password)) {
      return {
        ok: false,
        message:
          "Invalid credentials. Use admin@hospital.com / hospital123.",
      };
    }

    const nextUser = {
      name: STATIC_USER.name,
      email: STATIC_USER.email,
      role: STATIC_USER.role,
    };

    window.localStorage.setItem(AUTH_STORAGE_KEY, serializeUserSession(nextUser));
    setUser(nextUser);

    return { ok: true, user: nextUser };
  }

  function signOut() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isReady,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
    }),
    [isReady, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
