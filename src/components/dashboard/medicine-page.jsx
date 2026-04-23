"use client";

import { useState } from "react";
import { Package, Search } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";

const statusOptions = ["Healthy", "Low", "Reorder", "Expired"];

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

function MedicinePageContent() {
  const [rows, setRows] = useState([
    ["Napa 500", "320", "Dec 2026", "Healthy"],
    ["Syrup", "56", "Sep 2026", "Low"],
    ["Antacid", "24", "Aug 2026", "Reorder"],
    ["Insulin", "12", "Jun 2026", "Expired"],
  ]);
  const [recentItem, setRecentItem] = useState(null);
  const [form, setForm] = useState({
    item: "Napa 500",
    stock: "320",
    expiry: "Dec 2026",
    status: "Healthy",
    batch: "M-1001",
    location: "Store A",
  });

  const stats = [
    { label: "Total Items", value: "142", note: "catalogued" },
    { label: "Expired", value: "4", note: "remove now" },
    { label: "Reorder", value: "11", note: "items" },
  ];

  const serial = `MD-${String(rows.length + 1).padStart(3, "0")}`;

  function handleSubmit(event) {
    event.preventDefault();
    const nextRow = [form.item, form.stock, form.expiry, form.status];
    setRows((current) => [nextRow, ...current]);
    setRecentItem({ serial, ...form });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <Package className="h-4 w-4" />
                Medicine
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Medicine</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Product inventory, expiry monitoring, and stock entry in one static frontend screen.
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
                title="Medicine Inventory"
                subtitle="Add or update inventory stock with live UI feedback."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Save Medicine
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Medicine Item">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={form.item}
                    onChange={(event) => setForm((current) => ({ ...current, item: event.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#55767e]"
                  />
                </div>
              </Field>
              <Field label="Stock">
                <input
                  value={form.stock}
                  onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
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
              <Field label="Batch">
                <input
                  value={form.batch}
                  onChange={(event) => setForm((current) => ({ ...current, batch: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Store">
                <input
                  value={form.location}
                  onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
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
              <div className="mb-4 text-sm font-semibold text-slate-900">Inventory Preview</div>
              <div className="grid gap-3">
                <Info label="Item" value={form.item} />
                <Info label="Stock" value={form.stock} />
                <Info label="Expiry" value={form.expiry} />
                <Info label="Status" value={form.status} />
              </div>
            </div>

            {recentItem ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Added Medicine</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Serial: {recentItem.serial}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Item: {recentItem.item}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Stock: {recentItem.stock}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Store: {recentItem.location}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="Medicine Inventory Table"
          columns={["Item", "Stock", "Expiry", "Status"]}
          rows={rows}
        />
      </div>
    </AppShell>
  );
}

export function MedicinePage() {
  return <MedicinePageContent />;
}
