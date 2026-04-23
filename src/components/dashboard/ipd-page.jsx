"use client";

import { useState } from "react";
import { BedDouble } from "lucide-react";

import { AppShell } from "./app-shell";
import { hospitalSystemBlueprint } from "./hospital-static-data";
import { StatCard } from "./stat-card";

const bedOptions = ["B-01", "B-02", "B-03", "B-04", "B-05", "B-06"];
const wardOptions = ["Male Ward", "Female Ward", "Cabin", "Surgery"];
const doctorOptions = ["Dr. Karim", "Dr. Hasan", "Dr. Sultana", "Dr. Rahman"];

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

function IPDPageContent() {
  const { ipd } = hospitalSystemBlueprint;
  const [wards, setWards] = useState([
    ["IPD-001", "Mahin", "B-01", "Male Ward", "Admitted"],
    ["IPD-002", "Jannat", "B-04", "Female Ward", "Round pending"],
    ["IPD-003", "Shuvo", "B-06", "Surgery", "Under observation"],
    ["IPD-004", "Ritu", "B-09", "Cabin", "Discharge review"],
  ]);
  const [recentAdmission, setRecentAdmission] = useState(null);
  const [form, setForm] = useState({
    patient: "Mahin",
    bed: bedOptions[0],
    ward: wardOptions[0],
    doctor: doctorOptions[0],
    admitDate: "23 Apr 2026",
    diagnosis: "Fever",
    status: "Admitted",
  });

  const serial = `IPD-${String(wards.length + 1).padStart(3, "0")}`;

  function handleSubmit(event) {
    event.preventDefault();

    const nextRow = [serial, form.patient, form.bed, form.ward, form.status];
    setWards((current) => [nextRow, ...current]);
    setRecentAdmission({
      serial,
      patient: form.patient,
      bed: form.bed,
      ward: form.ward,
      doctor: form.doctor,
      diagnosis: form.diagnosis,
    });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <BedDouble className="h-4 w-4" />
                IPD
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">IPD</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Inpatient admission and bed allocation screen with live ward list and round status.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {ipd.stats.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} className="bg-[#55767e]" />
              ))}
            </div>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <SectionTitle
                title="IPD Admission"
                subtitle="Create inpatient admission, assign bed, and update ward tracking."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Save Admission
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Patient">
                <input
                  value={form.patient}
                  onChange={(event) => setForm((current) => ({ ...current, patient: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
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
              <Field label="Admit Date">
                <input
                  value={form.admitDate}
                  onChange={(event) => setForm((current) => ({ ...current, admitDate: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Diagnosis">
                <input
                  value={form.diagnosis}
                  onChange={(event) => setForm((current) => ({ ...current, diagnosis: event.target.value }))}
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
              <Field label="Admission No">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium">{serial}</div>
              </Field>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="mb-4 text-sm font-semibold text-slate-900">Admission Preview</div>
              <div className="grid gap-3">
                <SectionTitle title="Inpatient Details" subtitle="Current row before save." />
                <Info label="Patient" value={form.patient} />
                <Info label="Bed" value={form.bed} />
                <Info label="Ward" value={form.ward} />
                <Info label="Doctor" value={form.doctor} />
              </div>
            </div>

            {recentAdmission ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Added IPD Admission</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Serial: {recentAdmission.serial}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Patient: {recentAdmission.patient}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Bed: {recentAdmission.bed}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Ward: {recentAdmission.ward}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="IPD Ward List"
          columns={["Serial", "Patient", "Bed", "Ward", "Status"]}
          rows={wards}
        />
      </div>
    </AppShell>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

export function IPDPage() {
  return <IPDPageContent />;
}
