"use client";

import { useState } from "react";
import { BedDouble } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";

const wardOptions = ["General", "Cabin", "ICU", "Surgery"];
const bedOptions = ["B-01", "B-02", "B-03", "B-04", "B-05", "B-06"];

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-4">
      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#55767e]">
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      {children}
    </label>
  );
}

function SimpleTable({ title, columns, rows }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <div className="overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-3 text-left font-medium uppercase tracking-[0.14em]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row) => (
              <tr key={row.join("-")} className="hover:bg-slate-50">
                {row.map((cell) => (
                  <td key={cell} className="px-5 py-4 text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BedPageContent() {
  const [beds, setBeds] = useState([
    ["B-01", "General", "Occupied", "Mahin"],
    ["B-03", "Cabin", "Available", "-"],
    ["B-05", "ICU", "Occupied", "Ritu"],
    ["B-08", "General", "Maintenance", "-"],
  ]);
  const [recentAssign, setRecentAssign] = useState(null);
  const [form, setForm] = useState({
    bed: bedOptions[0],
    ward: wardOptions[0],
    status: "Available",
    patient: "Mahin",
    note: "Ready for admission",
  });

  const stats = [
    { label: "Available", value: "4", note: "free beds" },
    { label: "Occupied", value: "10", note: "in use" },
    { label: "Cabins", value: "6", note: "reserved" },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const nextRow = [form.bed, form.ward, form.status, form.patient];
    setBeds((current) => [nextRow, ...current]);
    setRecentAssign({ ...form });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <BedDouble className="h-4 w-4" />
                Bed
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Bed Management</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Bed assignment, ward status, and occupancy tracking in a simple frontend workflow.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {stats.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} className="bg-[#55767e]" />
              ))}
            </div>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <SectionTitle
                title="Bed Entry"
                subtitle="Assign bed and patient from the frontend without a backend."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Save Bed Assignment
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Bed">
                <select
                  value={form.bed}
                  onChange={(event) => setForm((current) => ({ ...current, bed: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {bedOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Ward">
                <select
                  value={form.ward}
                  onChange={(event) => setForm((current) => ({ ...current, ward: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {wardOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Status">
                <input
                  value={form.status}
                  onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Patient">
                <input
                  value={form.patient}
                  onChange={(event) => setForm((current) => ({ ...current, patient: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Note">
                <input
                  value={form.note}
                  onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="mb-4 text-sm font-semibold text-slate-900">Bed Preview</div>
              <div className="grid gap-3">
                <Info label="Bed" value={form.bed} />
                <Info label="Ward" value={form.ward} />
                <Info label="Status" value={form.status} />
                <Info label="Patient" value={form.patient} />
              </div>
            </div>

            {recentAssign ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Assigned Bed</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Bed: {recentAssign.bed}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Ward: {recentAssign.ward}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Status: {recentAssign.status}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Patient: {recentAssign.patient}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="Bed List"
          columns={["Bed", "Ward", "Status", "Patient"]}
          rows={beds}
        />
      </div>
    </AppShell>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

export function BedPage() {
  return <BedPageContent />;
}
