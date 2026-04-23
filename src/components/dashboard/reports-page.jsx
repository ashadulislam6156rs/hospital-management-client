"use client";

import { useState } from "react";
import { FileText } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";

const departmentOptions = ["All", "OPD", "IPD", "Pharmacy", "Pathology", "Radiology", "Finance"];
const reportTypeOptions = ["Daily", "Weekly", "Monthly"];

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

function ReportsPageContent() {
  const [rows, setRows] = useState([
    ["Daily collection", "Finance", "Ready", "PDF"],
    ["Pending pathology", "Pathology", "Draft", "XLS"],
    ["Admission summary", "IPD", "Ready", "PDF"],
    ["Medicine stock", "Pharmacy", "Ready", "PDF"],
  ]);
  const [recentReport, setRecentReport] = useState(null);
  const [form, setForm] = useState({
    reportType: "Daily",
    department: "All",
    title: "Daily collection",
    dateFrom: "23 Apr 2026",
    dateTo: "23 Apr 2026",
    format: "PDF",
  });

  const stats = [
    { label: "Reports Today", value: "9", note: "generated" },
    { label: "Pending", value: "3", note: "to review" },
    { label: "Shared", value: "14", note: "downloaded" },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const nextRow = [form.title, form.department, "Ready", form.format];
    setRows((current) => [nextRow, ...current]);
    setRecentReport({ ...form });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <FileText className="h-4 w-4" />
                Reports
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Reports</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Operational and financial report builder with live frontend summary updates.
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
                title="Report Builder"
                subtitle="Filter a department and export a summary report from the frontend."
              />
              <button className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white">
                Generate Report
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Field label="Report Type">
                <select
                  value={form.reportType}
                  onChange={(event) => setForm((current) => ({ ...current, reportType: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                >
                  {reportTypeOptions.map((item) => (
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
              <Field label="Title">
                <input
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="From Date">
                <input
                  value={form.dateFrom}
                  onChange={(event) => setForm((current) => ({ ...current, dateFrom: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="To Date">
                <input
                  value={form.dateTo}
                  onChange={(event) => setForm((current) => ({ ...current, dateTo: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
              <Field label="Export Format">
                <input
                  value={form.format}
                  onChange={(event) => setForm((current) => ({ ...current, format: event.target.value }))}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#55767e]"
                />
              </Field>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="mb-4 text-sm font-semibold text-slate-900">Report Preview</div>
              <div className="grid gap-3">
                <Info label="Type" value={form.reportType} />
                <Info label="Department" value={form.department} />
                <Info label="Title" value={form.title} />
                <Info label="Format" value={form.format} />
              </div>
            </div>

            {recentReport ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Generated Report</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Title: {recentReport.title}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Department: {recentReport.department}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Range: {recentReport.dateFrom} - {recentReport.dateTo}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Format: {recentReport.format}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <SimpleTable
          title="Report Queue"
          columns={["Report", "Department", "Status", "Format"]}
          rows={rows}
        />
      </div>
    </AppShell>
  );
}

export function ReportsPage() {
  return <ReportsPageContent />;
}
