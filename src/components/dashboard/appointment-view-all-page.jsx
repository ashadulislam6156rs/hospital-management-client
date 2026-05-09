"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Filter, LayoutGrid, ListFilter, Search } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";
import { initialAppointments } from "./appointment-data";
import { AppointmentTable, SectionHeader } from "./appointment-ui";

export function AppointmentViewAllPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredAppointments = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return initialAppointments;
    }

    return initialAppointments.filter((appointment) => {
      const haystack = [
        appointment.id,
        appointment.token,
        appointment.patient,
        appointment.doctor,
        appointment.department,
        appointment.date,
        appointment.timeSlot,
        appointment.status,
        appointment.priority,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [query]);

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
            Appointment Module
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">View all Appointment</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Review the appointment queue, search by patient or doctor, and jump to editing from the list.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Booked" value="18" className="bg-[#55767e]" />
          <StatCard label="Waiting" value="6" className="bg-[#6b8a91]" />
          <StatCard label="Completed" value="11" className="bg-[#86a39f]" />
        </section>

        <section className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
          <SectionHeader
            eyebrow="View All"
            title="Appointment Queue"
            subtitle="Search the live list and use the edit action on any row to continue the workflow."
          />

          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <Search className="h-4 w-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search appointment, patient, doctor..."
                className="w-full border-none bg-transparent outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="flex items-center gap-2">
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
                <Filter className="mr-1 inline-block h-4 w-4" />
                Filters
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
                <ListFilter className="mr-1 inline-block h-4 w-4" />
                Sort By: Recent
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
                <LayoutGrid className="mr-1 inline-block h-4 w-4" />
              </button>
            </div>
          </div>

          <AppointmentTable
            appointments={filteredAppointments}
            onEdit={(id) => router.push(`/appointment/edit?appointment=${encodeURIComponent(id)}`)}
          />
        </section>
      </div>
    </AppShell>
  );
}
