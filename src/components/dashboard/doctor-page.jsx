"use client";

import { useState } from "react";

import { AppShell } from "./app-shell";
import { hospitalSystemBlueprint } from "./hospital-static-data";
import { StaticModal } from "./static-modal";
import { StatCard } from "./stat-card";

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-4">
      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[#55767e]">
        {title}
      </div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</div>
    </div>
  );
}

function FieldGrid({ fields }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {fields.map((field) => (
        <label
          key={field.label}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
        >
          <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            {field.label}
          </div>
          <div className="mt-2 text-sm text-slate-900">{field.value}</div>
          <div className="mt-1 text-xs text-slate-500">{field.hint}</div>
        </label>
      ))}
    </div>
  );
}

function PillRow({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#ced9d9] bg-white px-3 py-1 text-xs font-medium text-[#4f7172]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function SmallTable({ title, columns, rows }) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <div className="overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-3 text-left font-medium uppercase tracking-[0.14em]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row) => (
              <tr key={row.join("-")} className="hover:bg-slate-50">
                {row.map((cell) => (
                  <td key={cell} className="px-5 py-4 text-slate-700">
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

function DoctorCard() {
  const { doctor } = hospitalSystemBlueprint;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorRows, setDoctorRows] = useState([
    ["Dr. Karim", "Medicine", "Morning", "OPD-03"],
    ["Dr. Sultana", "Gynae", "Evening", "OPD-06"],
    ["Dr. Rahman", "Surgery", "Night", "OT-02"],
    ["Dr. Hasan", "Cardiology", "Morning", "OPD-01"],
  ]);
  const [recentDoctor, setRecentDoctor] = useState(null);

  const newDoctorFields = [
    { name: "code", label: "Doctor Code", value: "DR0001", readOnly: true },
    { name: "name", label: "Doctor Name", placeholder: "Doctor Name*", required: true },
    { name: "mobile", label: "Mobile", placeholder: "Mobile*", required: true },
    { name: "email", label: "Email", placeholder: "Email" },
    { name: "department", label: "Department", placeholder: "Department*", required: true },
    { name: "specialty", label: "Specialty", placeholder: "Specialty*", required: true },
    { name: "shift", label: "Shift", placeholder: "Shift" },
    { name: "room", label: "Room", placeholder: "Room" },
    { name: "slot", label: "Consultation Slot", placeholder: "Consultation Slot" },
    { name: "fee", label: "Fee", placeholder: "Consultation Fee" },
    { name: "status", label: "Status", placeholder: "Status" },
    { name: "remarks", label: "Remarks", placeholder: "Remarks", type: "textarea" },
  ];

  function handleCreateDoctor(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "New Doctor");
    const specialty = String(formData.get("specialty") || "-");
    const shift = String(formData.get("shift") || "Morning");
    const room = String(formData.get("room") || "OPD-00");
    const code = String(formData.get("code") || `DR${String(doctorRows.length + 1).padStart(4, "0")}`);

    const nextRow = [name, specialty, shift, room];

    setDoctorRows((current) => [nextRow, ...current]);
    setRecentDoctor({
      code,
      name,
      mobile: String(formData.get("mobile") || ""),
      department: String(formData.get("department") || ""),
      specialty,
      shift,
    });
    setIsModalOpen(false);
    event.currentTarget.reset();
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
                Doctor Module
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Doctor
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Consultant roster, department assignment, and static specialty management screen.
              </p>
            </div>
            <div className="rounded-2xl border border-[#9fb9bb] bg-[#55767e] px-5 py-4 text-white">
              <div className="text-xs uppercase tracking-[0.18em] text-white/80">Status</div>
              <div className="mt-1 text-2xl font-semibold">Doctor Entry</div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {doctor.dutySummary.map((item) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              className="bg-[#55767e]"
            />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <SectionTitle
                  title="Doctor Entry"
                  subtitle="Static consultant profile form with department and shift information."
                />
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-md border border-[#a7bdbf] bg-[#55767e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4a676b]"
                >
                  + New Doctor
                </button>
              </div>
              <FieldGrid fields={doctor.formFields} />
            </div>

            <SmallTable
              title="Doctor List"
              columns={["Doctor", "Specialty", "Shift", "Room"]}
              rows={doctorRows}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <SectionTitle
                title="Doctor Flow"
                subtitle="How a doctor profile is used in the hospital system."
              />
              <div className="space-y-3">
                {doctor.rosterFlow.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#55767e] text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <SectionTitle title="Relations" subtitle="Doctor connects to these service points." />
              <div className="space-y-4">
                {doctor.relations.map((group) => (
                  <div key={group.title}>
                    <div className="mb-2 text-sm font-semibold text-slate-900">{group.title}</div>
                    <PillRow items={group.items} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <SectionTitle
                title="Specialist Panels"
                subtitle="Static groups that can become tabs later."
              />
              <div className="grid gap-3">
                {["Doctor List", "Doctor Department", "Doctor Specialist Entry", "Roster"].map((label) => (
                  <div key={label} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {recentDoctor ? (
              <div className="rounded-[26px] border border-[#c7d8d9] bg-[#eff6f6] p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <SectionTitle title="Recently Added" subtitle="Latest doctor created from frontend UI." />
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Code: {recentDoctor.code}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Name: {recentDoctor.name}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Mobile: {recentDoctor.mobile}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Department: {recentDoctor.department}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Specialty: {recentDoctor.specialty}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <StaticModal
          open={isModalOpen}
          title="Add New Doctor"
          description="Create a doctor profile from this popup. This is static UI for now, ready to connect to a backend later."
          onClose={() => setIsModalOpen(false)}
          footer={
            <>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border border-red-300 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="doctor-create-form"
                className="rounded-xl bg-[#55767e] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4a676b]"
              >
                Save
              </button>
            </>
          }
        >
          <form id="doctor-create-form" onSubmit={handleCreateDoctor}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {newDoctorFields.map((field) => {
                const spanClass =
                  field.type === "textarea" ? "md:col-span-2 xl:col-span-3" : "";

                return (
                  <div key={field.name} className={spanClass}>
                    <label className="block">
                      <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                        {field.label}
                      </div>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          defaultValue={field.value}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#55767e]"
                        />
                      ) : (
                        <input
                          name={field.name}
                          defaultValue={field.value}
                          placeholder={field.placeholder}
                          type={field.type ?? "text"}
                          readOnly={field.readOnly}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#55767e]"
                        />
                      )}
                    </label>
                  </div>
                );
              })}
            </div>
          </form>
        </StaticModal>
      </div>
    </AppShell>
  );
}

export function DoctorPage() {
  return <DoctorCard />;
}
