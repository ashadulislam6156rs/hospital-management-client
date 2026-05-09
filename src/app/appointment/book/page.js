import { AuthGate } from "@/components/auth/auth-gate";
import { AppointmentBookPage } from "@/components/dashboard/appointment-book-page";

export default function Page() {
  return (
    <AuthGate>
      <AppointmentBookPage />
    </AuthGate>
  );
}
