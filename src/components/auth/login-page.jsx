"use client";

import { useEffect, useState } from "react";
import { Eye, Hospital, ShieldCheck, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "./auth-provider";

const defaultForm = {
  email: "",
  password: "",
};

export function LoginPage() {
  const router = useRouter();
  const { signIn, isAuthenticated, isReady } = useAuth();
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isReady, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f4ef] text-slate-600">
        Loading login...
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = signIn(form);

    if (!result.ok) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#e4f1fb_0%,_#f8f4ef_35%,_#eef6f4_100%)] px-4 py-8 text-slate-800">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center">
        <div className="grid w-full gap-6 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
          <section className="relative overflow-hidden bg-[#355355] px-6 py-10 text-white md:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_40%)]" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
                  <Hospital className="h-4 w-4" />
                  Hospital Management
                </div>
                <div className="space-y-3">
                  <h1 className="max-w-md text-4xl font-semibold tracking-tight md:text-5xl">
                    Secure access for the demo hospital dashboard
                  </h1>
                  <p className="max-w-lg text-sm leading-6 text-white/80 md:text-base">
                    Use one static admin account to enter the dashboard, test
                    the protected route flow, and keep the session persisted in
                    the browser.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 rounded-3xl border border-white/15 bg-white/10 p-5 text-sm text-white/85 md:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <ShieldCheck className="mb-3 h-5 w-5" />
                  <div className="font-medium">Local auth</div>
                  <div className="mt-1 text-white/70">No backend required</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <Eye className="mb-3 h-5 w-5" />
                  <div className="font-medium">Protected dashboard</div>
                  <div className="mt-1 text-white/70">Redirects on logout</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <UserRound className="mb-3 h-5 w-5" />
                  <div className="font-medium">Static user</div>
                  <div className="mt-1 text-white/70">admin@hospital.com</div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-10 md:px-10">
            <div className="max-w-md">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Sign in
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Log in with the demo credentials to access the dashboard.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#4f7172] focus:ring-4 focus:ring-[#4f7172]/10"
                    placeholder="admin@hospital.com"
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-[#4f7172] focus:ring-4 focus:ring-[#4f7172]/10"
                    placeholder="hospital123"
                    required
                  />
                </label>

                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-[#355355] text-base font-semibold text-white hover:bg-[#2a4445]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign in to dashboard"}
                </Button>
              </form>

              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                <div className="font-medium text-slate-800">
                  Demo credentials
                </div>
                <div className="mt-2 font-mono text-xs leading-6">
                  <div>Email: admin@hospital.com</div>
                  <div>Password: hospital123</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
