"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-5">
      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#55767e]">{eyebrow}</div>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>
    </div>
  );
}

export function SelectControl({ value, onChange, options, placeholder = "Select..." }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-9 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

export function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export function Badge({ children, tone = "slate" }) {
  const styles = {
    slate: "border-slate-200 bg-slate-50 text-slate-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    red: "border-rose-200 bg-rose-50 text-rose-700",
    blue: "border-sky-200 bg-sky-50 text-sky-700",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[tone] ?? styles.slate}`}>
      {children}
    </span>
  );
}

export function WorkflowCard({ item }) {
  return (
    <Link
      href={item.href}
      className="group rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#c8d1ff] hover:shadow-[0_18px_40px_rgba(86,100,216,0.12)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${item.tone}`}>
            {item.icon ? <item.icon className="h-5 w-5" /> : null}
          </div>
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-slate-900">{item.label}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
        </div>
        <ArrowRight className="mt-1 h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-700" />
      </div>
    </Link>
  );
}

export function AppointmentTable({ appointments, onEdit }) {
  const toneByStatus = {
    Booked: "blue",
    Waiting: "amber",
    Completed: "green",
    Cancelled: "red",
  };

  return (
    <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">Appointment List</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {["ID", "Patient", "Doctor", "Date", "Slot", "Status", "Action"].map((column) => (
                <th key={column} className="px-5 py-3 text-left font-medium uppercase tracking-[0.14em]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-slate-50">
                <td className="px-5 py-4 font-semibold text-slate-900">{appointment.id}</td>
                <td className="px-5 py-4 text-slate-700">
                  <div className="font-medium text-slate-900">{appointment.patient}</div>
                  <div className="mt-1 text-xs text-slate-500">{appointment.department}</div>
                </td>
                <td className="px-5 py-4 text-slate-700">{appointment.doctor}</td>
                <td className="px-5 py-4 text-slate-700">{appointment.date}</td>
                <td className="px-5 py-4 text-slate-700">{appointment.timeSlot}</td>
                <td className="px-5 py-4">
                  <Badge tone={toneByStatus[appointment.status] ?? "slate"}>{appointment.status}</Badge>
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => onEdit(appointment.id)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-[#55767e] hover:text-[#55767e]"
                  >
                    Load for edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
