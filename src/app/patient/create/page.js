import { AuthGate } from "@/components/auth/auth-gate";
import { PatientCreatePage } from "@/components/dashboard/patient-create-page";

export default function Page() {
  return (
    <AuthGate>
      <PatientCreatePage />
    </AuthGate>
  );
}
