import Link from "next/link";

export function TopNav({ items, title, userLabel, actions }) {
  return (
    <header className="border-b border-[#2d4646] bg-[#345152]">
      <div className="flex items-center gap-4 px-4 py-3 md:px-6">
        <div className="flex shrink-0 flex-col">
          <div className="text-[18px] font-semibold italic text-white">
            {title}
          </div>
          <div className="text-[15px] font-semibold text-[#d17a49]">
            {userLabel}
          </div>
        </div>

        <div className="hidden flex-1 min-w-0 xl:flex">
          <div className="flex w-max items-stretch gap-0 overflow-x-auto">
            {items.map(({ label, icon: Icon, active, href }) => (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-w-[58px] flex-col items-center justify-center gap-1 border-r border-[#5a7778] px-2 py-2 text-[10px] leading-none transition-colors ${
                  active
                    ? "bg-[#4f7172] text-white"
                    : "bg-[#345152] text-white hover:bg-[#446567]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-slate-500">
          <div className="flex items-center gap-3">{actions}</div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#c7c7c7] text-lg font-medium text-white md:flex">
            {String(userLabel || "D").slice(0, 1).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
