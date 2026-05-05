import { AuthGate } from "@/components/auth/auth-gate";
import { DoctorSchedulePage } from "@/components/dashboard/doctor-schedule-page";

export default function Page() {
  return (
    <AuthGate>
      <DoctorSchedulePage />
    </AuthGate>
  );
}
