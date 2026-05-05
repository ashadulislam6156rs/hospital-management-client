import { AuthGate } from "@/components/auth/auth-gate";
import { DoctorGridPage } from "@/components/dashboard/doctor-grid-page";

export default function Page() {
  return (
    <AuthGate>
      <DoctorGridPage />
    </AuthGate>
  );
}
