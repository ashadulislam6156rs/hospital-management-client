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
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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

function PatientCard() {
  const { patient } = hospitalSystemBlueprint;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientRows, setPatientRows] = useState([
    ["Ayesha Rahman", "26 / Female", "OPD", "PT-2026-0142"],
    ["Rahim Uddin", "41 / Male", "Admitted", "PT-2026-0081"],
    ["Nabila Sultana", "33 / Female", "Discharged", "PT-2026-0115"],
    ["Shamim Islam", "58 / Male", "Waiting", "PT-2026-0044"],
  ]);
  const [recentPatient, setRecentPatient] = useState(null);

  const newPatientFields = [
    { name: "code", label: "Patient Code", value: "PY0002", readOnly: true },
    { name: "name", label: "Name", placeholder: "Name*", required: true },
    { name: "contact", label: "Contact No", placeholder: "Contact No*", required: true },
    { name: "age", label: "Age", placeholder: "Age", required: true },
    { name: "gender", label: "Gender", placeholder: "Gender", required: true },
    { name: "dob", label: "Date of Birth", placeholder: "Date of Birth", type: "date" },
    { name: "bloodGroup", label: "Blood Group", placeholder: "Blood Group" },
    { name: "email", label: "Email", placeholder: "Email" },
    { name: "guardianName", label: "Guardian Name", placeholder: "Guardian Name" },
    { name: "guardianContact", label: "Guardian Contact No", placeholder: "Guardian Contact No" },
    { name: "maritalStatus", label: "Marital Status", placeholder: "Marital Status" },
    { name: "idType", label: "ID Type", placeholder: "ID Type" },
    { name: "idNumber", label: "ID Number", placeholder: "ID Number" },
    { name: "remarks", label: "Remarks", placeholder: "Remarks" },
    { name: "address", label: "Address", placeholder: "Address", type: "textarea" },
  ];

  function handleCreatePatient(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "New Patient");
    const age = String(formData.get("age") || "-");
    const gender = String(formData.get("gender") || "-");
    const status = String(formData.get("status") || "OPD");
    const patientId = `PT-2026-${String(patientRows.length + 1).padStart(4, "0")}`;
    const code = String(formData.get("code") || `PY${String(patientRows.length + 1).padStart(4, "0")}`);

    const nextRow = [`${name}`, `${age} / ${gender}`, status, patientId];

    setPatientRows((current) => [nextRow, ...current]);
    setRecentPatient({
      code,
      name,
      contact: String(formData.get("contact") || ""),
      status,
      patientId,
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
                Patient Module
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Patient
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Root entity for the system. Static demo screen for registration, visit tracking,
                and downstream treatment flow.
              </p>
            </div>
            <div className="rounded-2xl border border-[#9fb9bb] bg-[#57777b] px-5 py-4 text-white">
              <div className="text-xs uppercase tracking-[0.18em] text-white/80">Queue</div>
              <div className="mt-1 text-2xl font-semibold">No patient selected</div>
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {patient.visitStatus.map((item) => (
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
                  title="Add New Patient"
                  subtitle="Static registration form using demo values. This can later become the API-backed entry screen."
                />
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-md border border-[#a7bdbf] bg-[#55767e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4a676b]"
                >
                  + New Patient
                </button>
              </div>
              <FieldGrid fields={patient.formFields} />
            </div>

            <SmallTable
              title="Patient Registry"
              columns={["Patient", "Age / Gender", "Status", "Patient ID"]}
              rows={patientRows}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <SectionTitle
                title="Patient Flow"
                subtitle="How the patient record moves through the system."
              />
              <div className="space-y-3">
                {patient.registrationFlow.map((step, index) => (
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
              <SectionTitle title="Relations" subtitle="Patient connects to these service areas." />
              <div className="space-y-4">
                {patient.relations.map((group) => (
                  <div key={group.title}>
                    <div className="mb-2 text-sm font-semibold text-slate-900">{group.title}</div>
                    <PillRow items={group.items} />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <SectionTitle
                title="Quick Entry Labels"
                subtitle="Useful static labels for build-out later."
              />
              <div className="grid gap-3">
                {["Bill No", "Created Date", "Add Tests", "Referral & Note"].map((label) => (
                  <div key={label} className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {recentPatient ? (
              <div className="rounded-[26px] border border-[#c7d8d9] bg-[#eff6f6] p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <SectionTitle title="Recently Added" subtitle="Latest patient created from frontend UI." />
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Code: {recentPatient.code}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Name: {recentPatient.name}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Contact: {recentPatient.contact}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Patient ID: {recentPatient.patientId}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Status: {recentPatient.status}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <StaticModal
          open={isModalOpen}
          title="Add New Patient"
          description="Create a new patient record from this popup. This is currently static UI, ready for API wiring later."
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
                form="patient-create-form"
                className="rounded-xl bg-[#55767e] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4a676b]"
              >
                Save
              </button>
            </>
          }
        >
          <form id="patient-create-form" onSubmit={handleCreatePatient}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {newPatientFields.map((field) => {
                const spanClass =
                  field.type === "textarea" ? "md:col-span-2 xl:col-span-4" : "";

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
              <input type="hidden" name="status" defaultValue="OPD" />
            </div>
          </form>
        </StaticModal>
      </div>
    </AppShell>
  );
}

export function PatientPage() {
  return <PatientCard />;
}
