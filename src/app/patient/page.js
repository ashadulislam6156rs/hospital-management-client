import { AuthGate } from "@/components/auth/auth-gate";
import { PatientPage } from "@/components/dashboard/patient-page";

export default function Page() {
  return (
    <AuthGate>
      <PatientPage />
    </AuthGate>
  );
}
