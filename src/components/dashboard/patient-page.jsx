"use client";

import Link from "next/link";
import { ArrowRight, FileText, PlusCircle, Users } from "lucide-react";

import { AppShell } from "./app-shell";
import { usePatients } from "@/hooks/use-patients";

const patientCards = [
  {
    label: "Patients",
    href: "/patient/list",
    icon: Users,
    description: "Open patient overview and registry launcher.",
    tone: "bg-[#e9ecff] text-[#5664d8]",
  },
  {
    label: "Patient Details",
    href: "/patient/details",
    icon: FileText,
    description: "View patient profile, history, and relations.",
    tone: "bg-[#ecf8f5] text-[#2f7d6f]",
  },
  {
    label: "Create Patient",
    href: "/patient/create",
    icon: PlusCircle,
    description: "Add a new patient record from the entry form.",
    tone: "bg-[#fff4e6] text-[#c76d1f]",
  },
];

function PatientCard({ item }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="group rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#c8d1ff] hover:shadow-[0_18px_40px_rgba(86,100,216,0.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}>
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">
            {item.label}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        </div>
        <ArrowRight className="mt-1 h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-700" />
      </div>
    </Link>
  );
}

export function PatientPage() {
  const { patients, isLoading } = usePatients();

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
                Patient Module
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Patient
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Choose a patient workflow card to open the matching task screen.
              </p>
            </div>
            <div className="rounded-2xl border border-[#9fb9bb] bg-[#57777b] px-5 py-4 text-white">
              <div className="text-xs uppercase tracking-[0.18em] text-white/80">Status</div>
              <div className="mt-1 text-2xl font-semibold">
                {isLoading ? "Loading..." : `${patients.length} Patients`}
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {patientCards.map((item) => (
            <PatientCard key={item.href} item={item} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
