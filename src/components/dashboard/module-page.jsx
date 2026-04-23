import { notFound } from "next/navigation";
import { AppShell } from "./app-shell";
import { getModuleConfig } from "./module-config";
import { StatCard } from "./stat-card";

function ModuleHero({ title, subtitle, icon: Icon, tone }) {
  return (
    <div className="mb-6 overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-6 bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(255,255,255,0.82))] p-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${tone}`}>
              <Icon className="h-4 w-4 text-slate-700" />
            </span>
            Static Module
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
            {subtitle}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
          <div className="font-medium text-slate-800">Flow</div>
          <div className="mt-2 max-w-xs">
            This is a static UI stage. Data can be replaced with API later.
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleTable({ columns, rows }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="mb-4 text-sm font-semibold text-slate-900">
        Daily list
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-3 text-left font-medium uppercase tracking-[0.16em]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="hover:bg-slate-50">
                {row.map((cell) => (
                  <td key={cell} className="px-4 py-3 text-slate-700">
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

function FieldPreview({ title, fields }) {
  if (!fields?.length) {
    return null;
  }

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="mb-4 text-sm font-semibold text-slate-900">{title}</div>
      <div className="grid gap-3 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              {field.label}
            </div>
            <div className="mt-2 text-sm font-medium text-slate-900">{field.value}</div>
            <div className="mt-1 text-xs leading-5 text-slate-600">{field.hint}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelationPanel({ relations }) {
  if (!relations?.length) {
    return null;
  }

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="mb-4 text-sm font-semibold text-slate-900">Relation Snapshot</div>
      <div className="space-y-4">
        {relations.map((group) => (
          <div key={group.title} className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm font-medium text-slate-900">{group.title}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlotBoard({ slots }) {
  if (!slots?.length) {
    return null;
  }

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="mb-4 text-sm font-semibold text-slate-900">Available Slot Board</div>
      <div className="space-y-4">
        {slots.map((slotGroup) => (
          <div key={slotGroup.title} className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm font-medium text-slate-900">{slotGroup.title}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {slotGroup.items.map((slot) => (
                <span
                  key={slot}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowCard({ notes }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="mb-4 text-sm font-semibold text-slate-900">
        Workflow
      </div>
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div
            key={note}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#355355] text-xs font-semibold text-white">
              {index + 1}
            </span>
            {note}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionPills({ actions }) {
  if (!actions?.length) {
    return null;
  }

  return (
    <section className="mb-6 flex flex-wrap gap-3">
      {actions.map((action) => (
        <div
          key={action}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.04)]"
        >
          {action}
        </div>
      ))}
    </section>
  );
}

function SummaryStrip({ summary }) {
  if (!summary?.length) {
    return null;
  }

  return (
    <section className="mb-6 grid gap-4 md:grid-cols-3">
      {summary.map((item) => (
        <div
          key={item.label}
          className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
        >
          <div className="text-sm font-medium text-slate-500">{item.label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            {item.value}
          </div>
        </div>
      ))}
    </section>
  );
}

function SystemOverview({ groups }) {
  if (!groups?.length) {
    return null;
  }

  return (
    <section className="mb-6 grid gap-4 xl:grid-cols-4">
      {groups.map((group) => (
        <div
          key={group.title}
          className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
        >
          <div className="text-sm font-semibold text-slate-900">{group.title}</div>
          <div className="mt-4 space-y-3">
            {group.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function BoardGrid({ board }) {
  if (!board?.length) {
    return null;
  }

  return (
    <section className="mb-6 grid gap-4 md:grid-cols-3">
      {board.map((column) => (
        <div
          key={column.label}
          className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
        >
          <div className="mb-4 text-sm font-semibold text-slate-900">
            {column.label}
          </div>
          <div className="space-y-3">
            {column.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export function ModulePage({ slug }) {
  const config = getModuleConfig(slug);

  if (!config) {
    notFound();
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <ModuleHero {...config} />
      <SystemOverview groups={config.systemOverview} />
      <ActionPills actions={config.actions} />
      <SummaryStrip summary={config.queueSummary ?? config.summary} />
      <BoardGrid board={config.board} />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {config.stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            className="bg-[#355355]"
          />
        ))}
      </section>

      {config.formFields || config.relations || config.slotBoard ? (
        <section className="mb-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <FieldPreview title={config.formTitle ?? "Form Preview"} fields={config.formFields} />
          <div className="space-y-6">
            <RelationPanel relations={config.relations} />
            <SlotBoard slots={config.slotBoard} />
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <ModuleTable columns={config.columns} rows={config.rows} />
        <WorkflowCard notes={config.entrySteps ?? config.notes} />
      </section>
    </AppShell>
  );
}
