"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

export function AuthRedirect() {
  const router = useRouter();
  const { isReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    router.replace(isAuthenticated ? "/dashboard" : "/login");
  }, [isAuthenticated, isReady, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f4ef] text-slate-600">
      Redirecting...
    </div>
  );
}
