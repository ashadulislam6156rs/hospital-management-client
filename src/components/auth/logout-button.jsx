"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-provider";

export function LogoutButton() {
  const router = useRouter();
  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
    router.replace("/login");
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="h-10 rounded-full border-white/15 bg-white/10 px-4 text-white hover:bg-white/20 hover:text-white"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}
