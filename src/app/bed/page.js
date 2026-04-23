import { AuthGate } from "@/components/auth/auth-gate";
import { BedPage } from "@/components/dashboard/bed-page";

export default function Page() {
  return (
    <AuthGate>
      <BedPage />
    </AuthGate>
  );
}
