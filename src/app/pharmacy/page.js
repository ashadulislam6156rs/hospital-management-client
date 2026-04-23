import { AuthGate } from "@/components/auth/auth-gate";
import { PharmacyPage } from "@/components/dashboard/pharmacy-page";

export default function Page() {
  return (
    <AuthGate>
      <PharmacyPage />
    </AuthGate>
  );
}
