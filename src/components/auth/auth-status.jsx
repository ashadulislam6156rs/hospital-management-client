"use client";

import { ShieldCheck } from "lucide-react";
import { useAuth } from "./auth-provider";

export function AuthStatus() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="hidden items-center gap-2 rounded-full border border-[#d6e0de] bg-white/80 px-3 py-2 text-sm font-medium text-[#476164] md:flex">
      <ShieldCheck className="h-4 w-4" />
      {user.name} · {user.role}
    </div>
  );
}
