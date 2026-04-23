import { AuthGate } from "@/components/auth/auth-gate";
import { DoctorPage } from "@/components/dashboard/doctor-page";

export default function Page() {
  return (
    <AuthGate>
      <DoctorPage />
    </AuthGate>
  );
}
