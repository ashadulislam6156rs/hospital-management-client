import { AuthGate } from "@/components/auth/auth-gate";
import { BloodPage } from "@/components/dashboard/blood-page";

export default function Page() {
  return (
    <AuthGate>
      <BloodPage />
    </AuthGate>
  );
}
