"use client";

import { useState } from "react";

import { AppShell } from "./app-shell";
import { getNextPatientCode, getNextPatientId } from "@/lib/patient-records";
import { usePatients } from "@/hooks/use-patients";

const initialForm = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  bloodGroup: "",
  primaryDoctor: "",
  status: "OPD",
  emergency: false,
  insurance: "",
  guardianName: "",
  guardianContact: "",
  maritalStatus: "",
  idType: "",
  idNumber: "",
  remarks: "",
  allergies: "",
  addressLine1: "",
  addressLine2: "",
  country: "Bangladesh",
  state: "Dhaka",
  city: "Dhaka",
  pincode: "",
  lastVisitModule: "OPD",
  lastVisitDate: "",
  lastVisitReason: "",
  lastVisitDoctor: "",
};

export function PatientCreatePage() {
  const { patients, addPatient } = usePatients();
  const [form, setForm] = useState(initialForm);
  const [recentPatient, setRecentPatient] = useState(null);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setError("");

    addPatient(formData)
      .then((savedPatient) => {
        setRecentPatient(savedPatient);
        setForm(initialForm);
        event.currentTarget.reset();
      })
      .catch(() => {
        setError("Failed to save patient.");
      });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1200px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
            Patient Module
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Create Patient
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Fill the full patient profile. New entries are written to the JSON file and stay saved.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label className="block">
              <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Code
              </div>
              <input
                name="code"
                value={getNextPatientCode(patients)}
                readOnly
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none"
              />
            </label>

            <label className="block">
              <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Patient ID
              </div>
              <input
                name="patientId"
                value={getNextPatientId(patients)}
                readOnly
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none"
              />
            </label>

            {[
              ["name", "Patient Name", "Ayesha Rahman", false],
              ["age", "Age", "26", false, "number"],
              ["gender", "Gender", "Female", false],
              ["phone", "Phone", "+880...", false],
              ["email", "Email", "patient@hospital.com", false],
              ["dateOfBirth", "Date Of Birth", "2000-02-14", false, "date"],
              ["bloodGroup", "Blood Group", "A+", false],
              ["primaryDoctor", "Primary Doctor", "Dr. Hasan Mahmud", false],
              ["status", "Status", "OPD", false],
              ["insurance", "Insurance", "Not linked", false],
              ["guardianName", "Guardian Name", "Shah Alam", false],
              ["guardianContact", "Guardian Contact", "+880...", false],
              ["maritalStatus", "Marital Status", "Married", false],
              ["idType", "ID Type", "National ID", false],
              ["idNumber", "ID Number", "1999123456789", false],
              ["addressLine1", "Address Line 1", "Flat 5B, House 18", false],
              ["addressLine2", "Address Line 2", "Mirpur 10", false],
              ["country", "Country", "Bangladesh", false],
              ["state", "State", "Dhaka", false],
              ["city", "City", "Dhaka", false],
              ["pincode", "Pincode", "1216", false],
              ["lastVisitModule", "Last Visit Module", "OPD", false],
              ["lastVisitDate", "Last Visit Date", "2026-05-03", false, "date"],
              ["lastVisitReason", "Last Visit Reason", "Fever and weakness", false],
              ["lastVisitDoctor", "Last Visit Doctor", "Dr. Hasan Mahmud", false],
            ].map(([key, label, placeholder, readOnly, type]) => (
              <label key={key} className="block">
                <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </div>
                <input
                  name={key}
                  value={form[key]}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [key]: event.target.value }))
                  }
                  placeholder={placeholder}
                  readOnly={Boolean(readOnly)}
                  type={type ?? "text"}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#57777b]"
                />
              </label>
            ))}

            <label className="md:col-span-2 xl:col-span-3 block">
              <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Allergies
              </div>
              <input
                name="allergies"
                value={form.allergies}
                onChange={(event) =>
                  setForm((current) => ({ ...current, allergies: event.target.value }))
                }
                placeholder="Comma separated allergies"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#57777b]"
              />
            </label>

            <label className="md:col-span-2 xl:col-span-3 block">
              <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Remarks
              </div>
              <textarea
                name="remarks"
                value={form.remarks}
                onChange={(event) =>
                  setForm((current) => ({ ...current, remarks: event.target.value }))
                }
                rows={4}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-[#57777b]"
              />
            </label>

            <label className="flex items-center gap-3 md:col-span-2 xl:col-span-3">
              <input
                name="emergency"
                type="checkbox"
                checked={Boolean(form.emergency)}
                onChange={(event) =>
                  setForm((current) => ({ ...current, emergency: event.target.checked }))
                }
                className="h-4 w-4 rounded border-slate-300 text-[#57777b]"
              />
              <span className="text-sm text-slate-700">Emergency patient</span>
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="reset"
              onClick={() => {
                setForm(initialForm);
                setError("");
              }}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#57777b] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#49686c]"
            >
              Save Patient
            </button>
          </div>
        </form>

        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {recentPatient ? (
          <div className="rounded-[24px] border border-[#d5d9ff] bg-[#f4f6ff] p-5">
            <div className="text-sm font-semibold text-[#57777b]">Recently Added</div>
            <div className="mt-2 text-sm text-slate-700">
              {recentPatient.name} ({recentPatient.patientId})
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
