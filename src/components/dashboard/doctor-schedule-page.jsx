"use client";

import { AppShell } from "./app-shell";
import { useDoctors } from "@/hooks/use-doctors";

export function DoctorSchedulePage() {
  const { doctors, isLoading, error } = useDoctors();

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1200px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
            Doctor Module
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Doctor Schedule
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Review duty slots and room allocation from the active doctor list.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Loading doctor schedules...
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    {["Code", "Doctor", "Department", "Days", "Session", "From", "To", "Charge"].map((column) => (
                      <th key={column} className="px-5 py-3 text-left font-medium uppercase tracking-[0.14em]">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {doctors.map((doctor) => (
                    <tr key={doctor.code} className="hover:bg-slate-50">
                      <td className="px-5 py-4 text-slate-700">{doctor.code}</td>
                      <td className="px-5 py-4 text-slate-700">{doctor.name}</td>
                      <td className="px-5 py-4 text-slate-700">{doctor.department}</td>
                      <td className="px-5 py-4 text-slate-700">{doctor.schedule.days.join(", ")}</td>
                      <td className="px-5 py-4 text-slate-700">{doctor.schedule.session}</td>
                      <td className="px-5 py-4 text-slate-700">{doctor.schedule.from}</td>
                      <td className="px-5 py-4 text-slate-700">{doctor.schedule.to}</td>
                      <td className="px-5 py-4 text-slate-700">{doctor.schedule.consultationCharge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
