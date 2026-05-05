"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AppShell } from "./app-shell";
import { usePatients } from "@/hooks/use-patients";

export function PatientDetailsPage() {
  const { patients, isLoading, error } = usePatients();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("patient") || searchParams.get("code") || "";
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    setSelectedCode(initialCode);
  }, [initialCode]);

  const selectedPatient = useMemo(
    () => patients.find((item) => item.code === selectedCode) ?? patients[0] ?? null,
    [patients, selectedCode]
  );

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
            Patient Module
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Patient Details
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            View patient profile fields and related visit snapshot.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Loading patient records...
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                <div className="text-sm font-semibold text-slate-900">Select Patient</div>
                <div className="mt-4 space-y-3">
                  {patients.map((item) => {
                    const active = item.code === selectedPatient?.code;

                    return (
                      <button
                        key={item.patientId}
                        type="button"
                        onClick={() => setSelectedCode(item.code)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                          active
                            ? "border-[#57777b] bg-[#eef4f4]"
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-sm font-medium text-slate-900">{item.name}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          {item.code} | {item.status} | {item.primaryDoctor}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {selectedPatient ? (
              <div className="space-y-6">
                <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Profile
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">
                    {selectedPatient.name}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {selectedPatient.code} | {selectedPatient.patientId} | {selectedPatient.status}
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {[
                      ["Age", String(selectedPatient.age)],
                      ["Gender", selectedPatient.gender],
                      ["Phone", selectedPatient.phone],
                      ["Email", selectedPatient.email],
                      ["DOB", selectedPatient.dateOfBirth],
                      ["Blood Group", selectedPatient.bloodGroup],
                      ["Primary Doctor", selectedPatient.primaryDoctor],
                      ["Insurance", selectedPatient.insurance],
                      ["Guardian", selectedPatient.guardianName],
                      ["Guardian Contact", selectedPatient.guardianContact],
                      ["Marital Status", selectedPatient.maritalStatus],
                      ["ID Type", selectedPatient.idType],
                      ["ID Number", selectedPatient.idNumber],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
                        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                          {label}
                        </div>
                        <div className="mt-2 text-sm font-medium text-slate-900">{value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
                    {selectedPatient.remarks}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                    <div className="text-sm font-semibold text-slate-900">Address</div>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                      <div>{selectedPatient.address.line1}</div>
                      <div>{selectedPatient.address.line2}</div>
                      <div>
                        {selectedPatient.address.city}, {selectedPatient.address.state}
                      </div>
                      <div>
                        {selectedPatient.address.country} - {selectedPatient.address.pincode}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                    <div className="text-sm font-semibold text-slate-900">Last Visit</div>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                      <div>Module: {selectedPatient.lastVisit.module}</div>
                      <div>Date: {selectedPatient.lastVisit.date}</div>
                      <div>Reason: {selectedPatient.lastVisit.reason}</div>
                      <div>Doctor: {selectedPatient.lastVisit.doctor}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <div className="text-sm font-semibold text-slate-900">Allergies</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(selectedPatient.allergies || []).length ? (
                      selectedPatient.allergies.map((item) => (
                        <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">No allergies listed</span>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </AppShell>
  );
}
