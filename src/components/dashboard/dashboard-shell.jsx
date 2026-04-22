"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import {
  billingCards,
  departmentBars,
  expenseBars,
  highlights,
  sidebarItems,
  shellMeta,
  topNav,
} from "./dashboard-data";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { StatCard } from "./stat-card";
import { BillingCard } from "./billing-card";
import { BarChart } from "./bar-chart";

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

export function DashboardShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <main className="h-screen overflow-hidden bg-[#f8f4ef] text-slate-800">
      <div className="flex h-full flex-col">
        <TopNav className="mr-200" items={topNav} title={shellMeta.title} />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <Sidebar
            items={sidebarItems}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((value) => !value)}
          />

          <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-4 md:px-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm md:flex">
                <Bell className="h-4 w-4" />
                Hospital overview
              </div>
            </div>

            <InfoRow />

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
          </div>
        </div>
      </div>
    </main>
  );
}
