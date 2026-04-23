import { AuthGate } from "@/components/auth/auth-gate";
import { ModulePage } from "@/components/dashboard/module-page";

export default function Page() {
  return (
    <AuthGate>
      <ModulePage slug="modules" />
    </AuthGate>
  );
}
