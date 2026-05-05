"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { AppShell } from "./app-shell";
import { useDoctors } from "@/hooks/use-doctors";

export function DoctorDetailsPage() {
  const { doctors, isLoading, error } = useDoctors();
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("doctor") || searchParams.get("code") || "";
  const [selectedCode, setSelectedCode] = useState("");

  useEffect(() => {
    setSelectedCode(initialCode);
  }, [initialCode]);

  const selectedDoctor = useMemo(
    () => doctors.find((doctor) => doctor.code === selectedCode) ?? doctors[0] ?? null,
    [doctors, selectedCode]
  );

  const doctor = selectedDoctor;

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
            Doctor Module
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Doctor Details
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            View doctor profile fields and relation snapshot.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Loading doctor records...
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                <div className="text-sm font-semibold text-slate-900">Select Doctor</div>
                <div className="mt-4 space-y-3">
                  {doctors.map((item) => {
                    const active = item.code === doctor?.code;

                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => setSelectedCode(item.code)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                          active
                            ? "border-[#5664d8] bg-[#eef1ff]"
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-sm font-medium text-slate-900">{item.name}</div>
                        <div className="mt-1 text-xs text-slate-500">
                          {item.department} | {item.designation} | {item.code}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {doctor ? (
              <div className="space-y-6">
                <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Profile
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">{doctor.name}</div>
                  <div className="mt-1 text-sm text-slate-600">
                    {doctor.department} | {doctor.designation} | {doctor.code}
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {[
                      ["Phone", doctor.phone],
                      ["Email", doctor.email],
                      ["DOB", doctor.dob],
                      ["Years", String(doctor.yearOfExperience)],
                      ["License", doctor.medicalLicenseNumber],
                      ["Languages", doctor.languageSpoken],
                      ["Blood Group", doctor.bloodGroup],
                      ["Gender", doctor.gender],
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
                    {doctor.bio}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                    <div className="text-sm font-semibold text-slate-900">Address</div>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                      <div>{doctor.address.line1}</div>
                      <div>{doctor.address.line2}</div>
                      <div>
                        {doctor.address.city}, {doctor.address.state}
                      </div>
                      <div>
                        {doctor.address.country} - {doctor.address.pincode}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                    <div className="text-sm font-semibold text-slate-900">Schedule</div>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                      <div>Days: {doctor.schedule.days.join(", ")}</div>
                      <div>Session: {doctor.schedule.session}</div>
                      <div>
                        Time: {doctor.schedule.from} - {doctor.schedule.to}
                      </div>
                      <div>Type: {doctor.schedule.appointmentType}</div>
                      <div>Duration: {doctor.schedule.appointmentDurationMins} mins</div>
                      <div>Charge: {doctor.schedule.consultationCharge}</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                    <div className="text-sm font-semibold text-slate-900">Education</div>
                    <div className="mt-4 space-y-3">
                      {doctor.education.map((item) => (
                        <div key={`${item.degree}-${item.university}`} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                          <div className="font-medium text-slate-900">{item.degree}</div>
                          <div className="mt-1">{item.university}</div>
                          <div className="mt-1 text-xs text-slate-500">
                            {item.from} - {item.to}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                      <div className="text-sm font-semibold text-slate-900">Awards</div>
                      <div className="mt-4 space-y-3">
                        {doctor.awards.map((item) => (
                          <div key={item.name} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                            <div className="font-medium text-slate-900">{item.name}</div>
                            {item.from ? <div className="mt-1 text-xs text-slate-500">{item.from}</div> : null}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-slate-200 bg-white p-5">
                      <div className="text-sm font-semibold text-slate-900">Certifications</div>
                      <div className="mt-4 space-y-3">
                        {doctor.certifications.map((item) => (
                          <div key={item.name} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                            <div className="font-medium text-slate-900">{item.name}</div>
                            {item.from ? <div className="mt-1 text-xs text-slate-500">{item.from}</div> : null}
                          </div>
                        ))}
                      </div>
                    </div>
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
