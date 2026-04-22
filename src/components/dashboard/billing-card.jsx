export function BillingCard({ title, amount, amountLabel, icon: Icon, color }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.08)]">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-sm ${color}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-slate-900">{title}</div>
          <div className="text-2xl leading-tight text-slate-900">{amount}</div>
          {amountLabel ? (
            <div className="mt-1 text-xs text-slate-700">{amountLabel}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

