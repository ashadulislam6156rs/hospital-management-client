"use client";

import Link from "next/link";
import { ArrowRight, CalendarPlus, Filter, LayoutGrid, Plus } from "lucide-react";

import { AppShell } from "./app-shell";
import { useDoctors } from "@/hooks/use-doctors";

function DoctorAvatar({ name, tone = "bg-[#e9ecff] text-[#5664d8]" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className={`flex h-28 w-28 items-center justify-center rounded-md ${tone}`}>
      <span className="text-2xl font-semibold">{initials}</span>
    </div>
  );
}

function DoctorGridCard({ doctor }) {
  return (
    <Link
      href={`/doctor/details?doctor=${encodeURIComponent(doctor.code)}`}
      className="group flex items-start gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(86,100,216,0.12)]"
    >
      <DoctorAvatar name={doctor.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-lg font-semibold text-slate-900">{doctor.name}</div>
            <div className="mt-1 text-sm text-slate-500">{doctor.designation}</div>
          </div>
          <span className="rounded-md border border-slate-200 p-1 text-slate-400 transition group-hover:text-slate-700">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <div>Available: {doctor.schedule?.days?.join(", ") || "Mon"}</div>
          <div>
            Starts From:{" "}
            <span className="font-semibold text-[#4b5bdc]">
              ${doctor.schedule?.consultationCharge ?? 499}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2 text-xs text-slate-400">
          <span className="rounded border border-slate-200 px-2 py-1">
            <CalendarPlus className="inline-block h-3.5 w-3.5" /> Book
          </span>
        </div>
      </div>
    </Link>
  );
}

export function DoctorGridPage() {
  const { doctors, isLoading, error } = useDoctors();

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1600px] space-y-4">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Doctor Grid</h1>
            <span className="rounded-md border border-[#5968df] px-3 py-1 text-sm text-[#5968df]">
              Total Doctors : {isLoading ? 565 : doctors.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <Filter className="mr-1 inline-block h-4 w-4" />
              Filters
            </button>
            <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <LayoutGrid className="mr-1 inline-block h-4 w-4" />
            </button>
            <Link
              href="/doctor/add"
              className="rounded-md bg-[#4b4bb3] px-4 py-2 text-sm font-semibold text-white"
            >
              <Plus className="mr-1 inline-block h-4 w-4" />
              New Doctor
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Loading doctor cards...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorGridCard key={doctor.code} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
