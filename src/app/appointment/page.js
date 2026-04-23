import { AuthGate } from "@/components/auth/auth-gate";
import { AppointmentPage } from "@/components/dashboard/appointment-page";

export default function Page() {
  return (
    <AuthGate>
      <AppointmentPage />
    </AuthGate>
  );
}
