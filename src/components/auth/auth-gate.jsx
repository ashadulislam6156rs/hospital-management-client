"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

export function AuthGate({ children, redirectTo = "/login" }) {
  const router = useRouter();
  const { isReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isReady, redirectTo, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f4ef] text-slate-600">
        Loading authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
