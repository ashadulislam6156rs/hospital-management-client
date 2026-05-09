"use client";

import { CalendarCheck2, CalendarPlus2, ClipboardList, PencilLine } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";
import { workflowCards } from "./appointment-data";
import { WorkflowCard } from "./appointment-ui";

const iconMap = {
  "View all Appointment": ClipboardList,
  "Book Appointment": CalendarPlus2,
  "Edit Appointment": PencilLine,
};

const decoratedCards = workflowCards.map((item) => ({
  ...item,
  icon: iconMap[item.label] ?? CalendarCheck2,
}));

export function AppointmentPage() {
  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <CalendarCheck2 className="h-4 w-4" />
                Appointment Module
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Appointment</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Choose a workflow card to open the matching appointment screen.
              </p>
            </div>
            <div className="rounded-2xl border border-[#9fb9bb] bg-[#55767e] px-5 py-4 text-white">
              <div className="text-xs uppercase tracking-[0.18em] text-white/80">Status</div>
              <div className="mt-1 text-2xl font-semibold">3 Appointment Tasks</div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Booked" value="18" className="bg-[#55767e]" />
          <StatCard label="Waiting" value="6" className="bg-[#6b8a91]" />
          <StatCard label="Completed" value="11" className="bg-[#86a39f]" />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {decoratedCards.map((item) => (
            <WorkflowCard key={item.href} item={item} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
