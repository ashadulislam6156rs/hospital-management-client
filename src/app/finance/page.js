import { AuthGate } from "@/components/auth/auth-gate";
import { FinancePage } from "@/components/dashboard/finance-page";

export default function Page() {
  return (
    <AuthGate>
      <FinancePage />
    </AuthGate>
  );
}
