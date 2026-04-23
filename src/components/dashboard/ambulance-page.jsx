"use client";

import { useState } from "react";
import { Ambulance } from "lucide-react";

import { AppShell } from "./app-shell";
import { hospitalSystemBlueprint } from "./hospital-static-data";
import { StatCard } from "./stat-card";

const vehicleOptions = ["AMB-01", "AMB-02", "AMB-03", "AMB-04"];
const priorityOptions = ["Normal", "Emergency", "Critical"];

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

function AmbulancePageContent() {
  const { ambulance } = hospitalSystemBlueprint;
  const [requests, setRequests] = useState([
    ["AMB-01", "Ayesha Rahman", "Uttara", "Hospital", "Emergency"],
    ["AMB-02", "Rahim Uddin", "Mirpur", "Lab", "Normal"],
    ["AMB-03", "Nabila Sultana", "Dhanmondi", "City Hospital", "Critical"],
  ]);
  const [recentTrip, setRecentTrip] = useState(null);
  const [form, setForm] = useState({
    patient: "Ayesha Rahman",
    pickup: "Uttara",
    destination: "Hospital",
    vehicle: vehicleOptions[0],
    priority: "Emergency",
    driver: "Driver A",
    status: "Dispatched",
    note: "Patient needs pickup immediately",
  });

  const serial = `AMB-${String(requests.length + 1).padStart(2, "0")}`;

  function handleSubmit(event) {
    event.preventDefault();

    const nextRow = [serial, form.patient, form.pickup, form.destination, form.priority];
    setRequests((current) => [nextRow, ...current]);
    setRecentTrip({
      serial,
      patient: form.patient,
      pickup: form.pickup,
      destination: form.destination,
      vehicle: form.vehicle,
      driver: form.driver,
    });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <Ambulance className="h-4 w-4" />
                Ambulance
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Ambulance</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Emergency transport queue with live dispatch details, destination, and vehicle assignment.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {ambulance.stats.map((item) => (
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
                title="Ambulance Dispatch"
                subtitle="Register the call, assign vehicle, and create a live request row."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Save Request
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
              <Field label="Pickup Location">
                <input
                  value={form.pickup}
                  onChange={(event) => setForm((current) => ({ ...current, pickup: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Destination">
                <input
                  value={form.destination}
                  onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Vehicle">
                <select
                  value={form.vehicle}
                  onChange={(event) => setForm((current) => ({ ...current, vehicle: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {vehicleOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Driver">
                <input
                  value={form.driver}
                  onChange={(event) => setForm((current) => ({ ...current, driver: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Priority">
                <select
                  value={form.priority}
                  onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {priorityOptions.map((item) => (
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
              <Field label="Request No">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium">{serial}</div>
              </Field>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="mb-4 text-sm font-semibold text-slate-900">Dispatch Preview</div>
              <div className="grid gap-3">
                <Info label="Patient" value={form.patient} />
                <Info label="Pickup" value={form.pickup} />
                <Info label="Destination" value={form.destination} />
                <Info label="Vehicle" value={form.vehicle} />
              </div>
            </div>

            {recentTrip ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Added Ambulance Request</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Request: {recentTrip.serial}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Patient: {recentTrip.patient}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Pickup: {recentTrip.pickup}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Destination: {recentTrip.destination}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="Ambulance Dispatch Queue"
          columns={["Request", "Patient", "Pickup", "Destination", "Priority"]}
          rows={requests}
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

export function AmbulancePage() {
  return <AmbulancePageContent />;
}
