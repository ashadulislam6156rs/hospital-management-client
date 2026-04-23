import { AuthGate } from "@/components/auth/auth-gate";
import { MedicinePage } from "@/components/dashboard/medicine-page";

export default function Page() {
  return (
    <AuthGate>
      <MedicinePage />
    </AuthGate>
  );
}
