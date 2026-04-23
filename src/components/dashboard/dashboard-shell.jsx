"use client";

import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";

import {
  billingCards,
  departmentBars,
  expenseBars,
  highlights,
  shellMeta,
} from "./dashboard-data";
import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";
import { BillingCard } from "./billing-card";
import { BarChart } from "./bar-chart";
import { navItems } from "./navigation-data";

function InfoRow() {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
  
        
        <div className="pt-2 text-4xl font-semibold tracking-tight text-[#5f7f88]">
          {shellMeta.time}
        </div>
      </div>

      <div className="text-right">
        <div className="text-sm font-semibold text-[#6d8e09]">{shellMeta.title}</div>
        <div className="mt-4 text-2xl font-semibold tracking-tight text-[#5f7f88]">
          {shellMeta.date}
        </div>
      </div>
    </div>
  );
}

function FlowCard({ label, href, description, icon: Icon, active }) {
  return (
    <Link
      href={href}
      className={`group rounded-[24px] border p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition-transform hover:-translate-y-0.5 ${
        active
          ? "border-[#355355] bg-[#355355] text-white"
          : "border-slate-200 bg-white text-slate-800"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full ${active ? "bg-white/15" : "bg-slate-100"}`}>
            <Icon className={`h-5 w-5 ${active ? "text-white" : "text-slate-700"}`} />
          </div>
          <div className="text-sm font-semibold">{label}</div>
          <div className={`mt-2 text-sm leading-6 ${active ? "text-white/75" : "text-slate-600"}`}>
            {description}
          </div>
        </div>
        <ArrowRight className={`h-5 w-5 transition-transform group-hover:translate-x-0.5 ${active ? "text-white/80" : "text-slate-400"}`} />
      </div>
    </Link>
  );
}

export function DashboardShell() {
  const shortcutItems = navItems.filter(({ href }) =>
    ["/patient", "/doctor", "/appointment", "/finance", "/reports"].includes(href)
  );

  return (
    <AppShell title={shellMeta.title}>
      <div className="mb-4 flex items-center justify-between">
        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm md:flex">
          <Bell className="h-4 w-4" />
          Hospital overview
        </div>
      </div>

      <InfoRow />

      <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {shortcutItems.map((item) => (
          <FlowCard
            key={item.label}
            label={item.label}
            href={item.href}
            description={`Open the static ${item.label.toLowerCase()} workflow.`}
            icon={item.icon}
            active={item.href === "/appointment"}
          />
        ))}
      </section>

      <section className="mb-5 grid gap-3 md:grid-cols-6">
        {highlights.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {billingCards.map((item) => (
          <BillingCard key={item.title} {...item} />
        ))}
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <BarChart
          title="Department-wise Billing (Current Month)"
          bars={departmentBars}
          colorClass="bg-[#8e95d9]"
        />
        <BarChart
          title="Current Month Expense"
          bars={expenseBars}
          colorClass="bg-[#d85f56]"
        />
      </section>
    </AppShell>
  );
}
