"use client";

import { useState } from "react";
import { Droplets } from "lucide-react";

import { AppShell } from "./app-shell";
import { hospitalSystemBlueprint } from "./hospital-static-data";
import { StatCard } from "./stat-card";

const groupOptions = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
const requestOptions = ["Donation", "Issue", "Cross Match", "Reserve"];

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

function BloodPageContent() {
  const { blood } = hospitalSystemBlueprint;
  const [items, setItems] = useState([
    ["Blood Donation", "Ayesha Rahman", "A+", "1", "Healthy"],
    ["Blood Issue", "Rahim Uddin", "B+", "2", "Issued"],
    ["Cross Match", "Nabila Sultana", "O+", "1", "Pending"],
  ]);
  const [recentItem, setRecentItem] = useState(null);
  const [form, setForm] = useState({
    requestType: requestOptions[0],
    name: "Ayesha Rahman",
    group: groupOptions[0],
    units: "1",
    status: "Healthy",
    contact: "01711 000000",
    note: "Regular donation",
  });

  const serial = `BL-${String(items.length + 1).padStart(3, "0")}`;

  function handleSubmit(event) {
    event.preventDefault();

    const nextRow = [form.requestType, form.name, form.group, form.units, form.status];
    setItems((current) => [nextRow, ...current]);
    setRecentItem({
      serial,
      requestType: form.requestType,
      name: form.name,
      group: form.group,
      units: form.units,
    });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <Droplets className="h-4 w-4" />
                Blood
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Blood Bank</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Donation, issue, reserve, and cross-match work queue with live frontend updates.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {blood.stats.map((item) => (
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
                title="Blood Entry"
                subtitle="Create donation or issue request directly from the frontend."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Save Blood Entry
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Request Type">
                <select
                  value={form.requestType}
                  onChange={(event) => setForm((current) => ({ ...current, requestType: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {requestOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Patient / Donor">
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Blood Group">
                <select
                  value={form.group}
                  onChange={(event) => setForm((current) => ({ ...current, group: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {groupOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Units">
                <input
                  value={form.units}
                  onChange={(event) => setForm((current) => ({ ...current, units: event.target.value }))}
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
              <Field label="Contact">
                <input
                  value={form.contact}
                  onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Serial No">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium">{serial}</div>
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
              <div className="mb-4 text-sm font-semibold text-slate-900">Blood Preview</div>
              <div className="grid gap-3">
                <Info label="Request Type" value={form.requestType} />
                <Info label="Name" value={form.name} />
                <Info label="Blood Group" value={form.group} />
                <Info label="Units" value={form.units} />
              </div>
            </div>

            {recentItem ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Added Blood Entry</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Serial: {recentItem.serial}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Name: {recentItem.name}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Group: {recentItem.group}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Units: {recentItem.units}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="Blood Bank Queue"
          columns={["Type", "Name", "Group", "Units", "Status"]}
          rows={items}
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

export function BloodPage() {
  return <BloodPageContent />;
}
