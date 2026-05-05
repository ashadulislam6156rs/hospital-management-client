import { AuthGate } from "@/components/auth/auth-gate";
import { PatientDetailsPage } from "@/components/dashboard/patient-details-page";

export default function Page() {
  return (
    <AuthGate>
      <PatientDetailsPage />
    </AuthGate>
  );
}
