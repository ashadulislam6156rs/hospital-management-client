import { AuthGate } from "@/components/auth/auth-gate";
import { PatientListPage } from "@/components/dashboard/patient-list-page";

export default function Page() {
  return (
    <AuthGate>
      <PatientListPage />
    </AuthGate>
  );
}
