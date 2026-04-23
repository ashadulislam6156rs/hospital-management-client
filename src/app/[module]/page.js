import { AuthGate } from "@/components/auth/auth-gate";
import { ModulePage } from "@/components/dashboard/module-page";

export default function Page({ params }) {
  return (
    <AuthGate>
      <ModulePage slug={params.module} />
    </AuthGate>
  );
}
