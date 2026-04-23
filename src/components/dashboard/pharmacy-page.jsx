"use client";

import { useState } from "react";
import { PillBottle, Search } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";

const medicineOptions = ["Napa", "Cefixime", "ORS", "Amlodipine", "Paracetamol"];
const statusOptions = ["Ready", "Low", "Reorder"];

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

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

function PharmacyPageContent() {
  const [rows, setRows] = useState([
    ["Napa", "120", "Ready", "BDT 2.00"],
    ["Cefixime", "42", "Low", "BDT 18.00"],
    ["ORS", "90", "Ready", "BDT 15.00"],
    ["Amlodipine", "18", "Reorder", "BDT 8.50"],
  ]);
  const [recentMedicine, setRecentMedicine] = useState(null);
  const [form, setForm] = useState({
    medicine: "Napa",
    qty: "20",
    batch: "B-001",
    expiry: "Dec 2026",
    status: "Ready",
    price: "2.00",
  });

  const stats = [
    { label: "Prescriptions", value: "19", note: "today" },
    { label: "Dispensed", value: "15", note: "completed" },
    { label: "Short Stock", value: "4", note: "alerts" },
  ];

  const serial = `PH-${String(rows.length + 1).padStart(3, "0")}`;

  function handleSubmit(event) {
    event.preventDefault();
    const nextRow = [form.medicine, form.qty, form.status, `BDT ${form.price}`];
    setRows((current) => [nextRow, ...current]);
    setRecentMedicine({ serial, ...form });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <PillBottle className="h-4 w-4" />
                Pharmacy
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Pharmacy</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Prescription queue, stock entry, and medicine issue flow with live frontend updates.
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
                title="Medicine Entry"
                subtitle="Add stock, issue medicine, or update a prescription row from the frontend."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Save Medicine
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Medicine">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    value={form.medicine}
                    onChange={(event) => setForm((current) => ({ ...current, medicine: event.target.value }))}
                    className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#55767e]"
                  >
                    {medicineOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </Field>
              <Field label="Qty">
                <input
                  value={form.qty}
                  onChange={(event) => setForm((current) => ({ ...current, qty: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Batch">
                <input
                  value={form.batch}
                  onChange={(event) => setForm((current) => ({ ...current, batch: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Expiry">
                <input
                  value={form.expiry}
                  onChange={(event) => setForm((current) => ({ ...current, expiry: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {statusOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Price">
                <input
                  value={form.price}
                  onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Serial">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium">{serial}</div>
              </Field>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="mb-4 text-sm font-semibold text-slate-900">Medicine Preview</div>
              <div className="grid gap-3">
                <Info label="Medicine" value={form.medicine} />
                <Info label="Qty" value={form.qty} />
                <Info label="Batch" value={form.batch} />
                <Info label="Status" value={form.status} />
              </div>
            </div>

            {recentMedicine ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Added Medicine</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Serial: {recentMedicine.serial}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Medicine: {recentMedicine.medicine}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Qty: {recentMedicine.qty}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Expiry: {recentMedicine.expiry}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="Pharmacy Stock / Prescription Queue"
          columns={["Medicine", "Qty", "Status", "Price"]}
          rows={rows}
        />
      </div>
    </AppShell>
  );
}

export function PharmacyPage() {
  return <PharmacyPageContent />;
}
