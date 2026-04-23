"use client";

import { useState } from "react";
import { WalletCards } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";

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

function FinancePageContent() {
  const [entries, setEntries] = useState([
    ["OPD", "2,400", "Posted", "Cash"],
    ["Pharmacy", "1,800", "Posted", "Card"],
    ["Pathology", "1,900", "Pending", "Cash"],
    ["Radiology", "1,300", "Posted", "Bkash"],
  ]);
  const [recentEntry, setRecentEntry] = useState(null);
  const [form, setForm] = useState({
    source: "OPD",
    amount: "2500",
    status: "Posted",
    mode: "Cash",
    note: "Day shift collection",
  });

  const stats = [
    { label: "Cash Balance", value: "24,820", note: "today" },
    { label: "Bank Balance", value: "0", note: "linked later" },
    { label: "Collections", value: "7,400", note: "total today" },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const nextRow = [form.source, form.amount, form.status, form.mode];
    setEntries((current) => [nextRow, ...current]);
    setRecentEntry({ ...form });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <WalletCards className="h-4 w-4" />
                Finance
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Finance</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Cash collection, payment entry, and daily ledger view with a live frontend table.
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
                title="Finance Entry"
                subtitle="Add a collection or payment line. Changes will show instantly below."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Save Entry
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Source">
                <input
                  value={form.source}
                  onChange={(event) => setForm((current) => ({ ...current, source: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Amount">
                <input
                  value={form.amount}
                  onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))}
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
              <Field label="Mode">
                <input
                  value={form.mode}
                  onChange={(event) => setForm((current) => ({ ...current, mode: event.target.value }))}
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
              <div className="mb-4 text-sm font-semibold text-slate-900">Finance Preview</div>
              <div className="grid gap-3">
                <Info label="Source" value={form.source} />
                <Info label="Amount" value={form.amount} />
                <Info label="Status" value={form.status} />
                <Info label="Mode" value={form.mode} />
              </div>
            </div>

            {recentEntry ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Added Finance Entry</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Source: {recentEntry.source}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Amount: {recentEntry.amount}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Status: {recentEntry.status}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Mode: {recentEntry.mode}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="Cashbook / Collection Ledger"
          columns={["Source", "Amount", "Status", "Mode"]}
          rows={entries}
        />
      </div>
    </AppShell>
  );
}

export function FinancePage() {
  return <FinancePageContent />;
}
