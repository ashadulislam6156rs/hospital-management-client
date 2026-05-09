import { AuthGate } from "@/components/auth/auth-gate";
import { AppointmentEditPage } from "@/components/dashboard/appointment-edit-page";

export default function Page() {
  return (
    <AuthGate>
      <AppointmentEditPage />
    </AuthGate>
  );
}
