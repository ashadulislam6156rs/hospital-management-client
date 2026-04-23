"use client";

import { useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { AuthStatus } from "@/components/auth/auth-status";
import { LogoutButton } from "@/components/auth/logout-button";
import { useAuth } from "@/components/auth/auth-provider";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { navItems } from "./navigation-data";

function isActiveRoute(pathname, item) {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function AppShell({ children, showOverviewBadge = true, title }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  const items = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        active: isActiveRoute(pathname, item),
      })),
    [pathname]
  );

  return (
    <main className="h-screen overflow-hidden bg-[#f8f4ef] text-slate-800">
      <div className="flex h-full flex-col">
        <TopNav
          items={items}
          title={title}
          userLabel={user?.name ?? "Guest"}
          actions={
            <>
              <AuthStatus />
              <LogoutButton />
            </>
          }
        />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <Sidebar
            items={items}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((value) => !value)}
          />

          <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-4 md:px-6">
            {showOverviewBadge ? (
              <div className="mb-4 flex items-center justify-between">
                <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm md:flex">
                  <Bell className="h-4 w-4" />
                  Hospital overview
                </div>
              </div>
            ) : null}

            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
