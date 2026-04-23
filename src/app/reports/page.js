import { AuthGate } from "@/components/auth/auth-gate";
import { ReportsPage } from "@/components/dashboard/reports-page";

export default function Page() {
  return (
    <AuthGate>
      <ReportsPage />
    </AuthGate>
  );
}
