export function StatCard({ label, value, className }) {
  return (
    <div
      className={`flex min-h-24 flex-col justify-center rounded-lg px-4 py-3 text-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] ${className}`}
    >
      <div className="text-[11px] font-medium tracking-wide text-white/90">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold leading-none">{value}</div>
    </div>
  );
}

