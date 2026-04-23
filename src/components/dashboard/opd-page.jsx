"use client";

import { useState } from "react";
import { Search, Stethoscope } from "lucide-react";

import { AppShell } from "./app-shell";
import { hospitalSystemBlueprint } from "./hospital-static-data";
import { StatCard } from "./stat-card";

const patientOptions = [
  "Ayesha Rahman",
  "Rahim Uddin",
  "Nabila Sultana",
  "Shamim Islam",
];

const doctorOptions = ["Dr. Karim", "Dr. Hasan", "Dr. Sultana", "Dr. Rahman"];
const departmentOptions = ["Medicine", "Cardiology", "Surgery", "Gynae"];

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

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-900">{value}</div>
    </div>
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

function OPDPageContent() {
  const { opd } = hospitalSystemBlueprint;
  const [queue, setQueue] = useState([
    ["OPD-01", "Ayesha Rahman", "Dr. Karim", "Medicine", "Waiting"],
    ["OPD-02", "Rahim Uddin", "Dr. Hasan", "Cardiology", "Consulted"],
    ["OPD-03", "Nabila Sultana", "Dr. Sultana", "Gynae", "Pending"],
    ["OPD-04", "Shamim Islam", "Dr. Rahman", "Surgery", "Done"],
  ]);
  const [recentVisit, setRecentVisit] = useState(null);
  const [form, setForm] = useState({
    patient: patientOptions[0],
    doctor: doctorOptions[0],
    department: departmentOptions[0],
    complaint: "Fever and weakness",
    vitals: "BP 120/80",
    fee: "300",
    status: "Waiting",
  });

  const serial = `OPD-${String(queue.length + 1).padStart(2, "0")}`;

  function handleSubmit(event) {
    event.preventDefault();

    const nextRow = [
      serial,
      form.patient,
      form.doctor,
      form.department,
      form.status,
    ];

    setQueue((current) => [nextRow, ...current]);
    setRecentVisit({
      serial,
      patient: form.patient,
      doctor: form.doctor,
      complaint: form.complaint,
      vitals: form.vitals,
      fee: form.fee,
    });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <Stethoscope className="h-4 w-4" />
                OPD
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">OPD</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Outpatient entry screen with live token queue, consultation assignment, and quick visit details.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {opd.stats.map((item) => (
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
                title="OPD Entry"
                subtitle="Front desk can register the patient, assign doctor, and create a live visit row."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Save OPD
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Patient">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    value={form.patient}
                    onChange={(event) => setForm((current) => ({ ...current, patient: event.target.value }))}
                    className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#55767e]"
                  >
                    {patientOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
              <Field label="Doctor">
                <select
                  value={form.doctor}
                  onChange={(event) => setForm((current) => ({ ...current, doctor: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {doctorOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Department">
                <select
                  value={form.department}
                  onChange={(event) => setForm((current) => ({ ...current, department: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {departmentOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Complaint">
                <input
                  value={form.complaint}
                  onChange={(event) => setForm((current) => ({ ...current, complaint: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Vitals">
                <input
                  value={form.vitals}
                  onChange={(event) => setForm((current) => ({ ...current, vitals: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Consult Fee">
                <input
                  value={form.fee}
                  onChange={(event) => setForm((current) => ({ ...current, fee: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Status">
                <input
                  value={form.status}
                  onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Current Serial">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium">{serial}</div>
              </Field>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="mb-4 text-sm font-semibold text-slate-900">Current Visit</div>
              <div className="grid gap-3">
                <InfoPill label="Patient" value={form.patient} />
                <InfoPill label="Doctor" value={form.doctor} />
                <InfoPill label="Department" value={form.department} />
                <InfoPill label="Complaint" value={form.complaint} />
                <InfoPill label="Vitals" value={form.vitals} />
              </div>
            </div>

            {recentVisit ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Added OPD Visit</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Serial: {recentVisit.serial}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Patient: {recentVisit.patient}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Doctor: {recentVisit.doctor}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Fee: {recentVisit.fee}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="Current OPD Queue"
          columns={["Serial", "Patient", "Doctor", "Department", "Status"]}
          rows={queue}
        />
      </div>
    </AppShell>
  );
}

export function OPDPage() {
  return <OPDPageContent />;
}
