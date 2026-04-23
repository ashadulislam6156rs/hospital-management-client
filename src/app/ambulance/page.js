import { AuthGate } from "@/components/auth/auth-gate";
import { AmbulancePage } from "@/components/dashboard/ambulance-page";

export default function Page() {
  return (
    <AuthGate>
      <AmbulancePage />
    </AuthGate>
  );
}
