export function DashboardHeader({ items, className, itemClassName }) {
  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          {items.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={itemClassName}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

