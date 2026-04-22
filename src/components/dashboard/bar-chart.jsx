export function BarChart({ title, bars, colorClass }) {
  const max = Math.max(...bars.map((bar) => bar.value));

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.08)]">
      <div className="mb-3 text-sm font-medium text-slate-900">{title}</div>
      <div className="flex h-40 items-end gap-3 border-b border-slate-200 pb-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end justify-center">
              <div
                className={`w-full max-w-12 rounded-t ${colorClass}`}
                style={{ height: `${(bar.value / max) * 100}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-600">{bar.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

