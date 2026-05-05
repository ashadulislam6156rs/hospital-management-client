import { AuthGate } from "@/components/auth/auth-gate";
import { DoctorAddPage } from "@/components/dashboard/doctor-add-page";

export default function Page() {
  return (
    <AuthGate>
      <DoctorAddPage />
    </AuthGate>
  );
}
