import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Sidebar({ items, collapsed, onToggle }) {
  return (
    <aside
      className={`hidden shrink-0 border-r border-[#e6ddd4] bg-[#fbf4ef] lg:block ${
        collapsed ? "w-[56px]" : "w-[250px]"
      }`}
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex items-center justify-end border-b border-[#e6ddd4] bg-white px-3 py-3">
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d9e1e6] bg-white text-[#6e8598] transition-colors hover:bg-[#f3f7f8]"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {!collapsed ? (
          <nav className="scrollbar-hide min-h-0 flex-1 overflow-y-auto py-1">
            {items.map(({ label, icon: Icon, active, href }) => (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex w-full items-center gap-4 px-4 py-[14px] text-left text-[18px] font-medium text-[#2c4668] transition-colors hover:bg-white/80 ${
                  active ? "bg-white/85" : ""
                }`}
              >
                <Icon className="h-[18px] w-[18px] shrink-0 text-[#6e8598]" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </aside>
  );
}
