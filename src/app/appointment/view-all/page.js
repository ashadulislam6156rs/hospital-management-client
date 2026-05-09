import { AuthGate } from "@/components/auth/auth-gate";
import { AppointmentViewAllPage } from "@/components/dashboard/appointment-view-all-page";

export default function Page() {
  return (
    <AuthGate>
      <AppointmentViewAllPage />
    </AuthGate>
  );
}
