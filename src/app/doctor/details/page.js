import { AuthGate } from "@/components/auth/auth-gate";
import { DoctorDetailsPage } from "@/components/dashboard/doctor-details-page";

export default function Page() {
  return (
    <AuthGate>
      <DoctorDetailsPage />
    </AuthGate>
  );
}
