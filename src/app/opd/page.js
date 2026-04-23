import { AuthGate } from "@/components/auth/auth-gate";
import { OPDPage } from "@/components/dashboard/opd-page";

export default function Page() {
  return (
    <AuthGate>
      <OPDPage />
    </AuthGate>
  );
}
