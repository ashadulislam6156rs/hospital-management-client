import { AuthGate } from "@/components/auth/auth-gate";
import { IPDPage } from "@/components/dashboard/ipd-page";

export default function Page() {
  return (
    <AuthGate>
      <IPDPage />
    </AuthGate>
  );
}
