"use client";

import { AuthGate } from "@/components/auth/auth-gate";
import { DashboardShell } from "./dashboard-shell";

export function DashboardPage() {
  return (
    <AuthGate>
      <DashboardShell />
    </AuthGate>
  );
}
