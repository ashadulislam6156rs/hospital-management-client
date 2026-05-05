"use client";

import { useState } from "react";

import { AppShell } from "./app-shell";
import { getNextDoctorCode } from "@/lib/doctor-records";
import { useDoctors } from "@/hooks/use-doctors";

export function DoctorAddPage() {
  const { doctors, addDoctor } = useDoctors();
  const [recentDoctor, setRecentDoctor] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setError("");

    try {
      const savedDoctor = await addDoctor(formData);
      setRecentDoctor(savedDoctor);
      event.currentTarget.reset();
    } catch {
      setError("Failed to save doctor.");
    }
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1200px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
            Doctor Module
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Add Doctor
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Fill the full doctor profile. New entries are written to the JSON file and stay saved.
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
                value={getNextDoctorCode(doctors)}
                readOnly
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none"
              />
            </label>

            {[
              ["name", "Doctor Name", "Dr. Name", false],
              ["phone", "Phone", "+880...", false],
              ["email", "Email", "doctor@hospital.com", false],
              ["dob", "Date of Birth", "", false, "date"],
              ["yearOfExperience", "Year Of Experience", "0", false, "number"],
              ["department", "Department", "Medicine", false],
              ["designation", "Designation", "Consultant", false],
              ["medicalLicenseNumber", "Medical License Number", "BMDC-000000", false],
              ["languageSpoken", "Language Spoken", "Bangla, English", false],
              ["bloodGroup", "Blood Group", "A+", false],
              ["gender", "Gender", "Male", false],
              ["profileImage", "Profile Image", "/demo-data/doctors/doctor.png", false],
              ["addressLine1", "Address Line 1", "", false],
              ["addressLine2", "Address Line 2", "", false],
              ["country", "Country", "Bangladesh", false],
              ["state", "State", "Dhaka", false],
              ["city", "City", "Dhaka", false],
              ["pincode", "Pincode", "", false],
              ["days", "Schedule Days", "Monday, Tuesday, Thursday", false],
              ["session", "Session", "Morning", false],
              ["from", "From", "09:00 AM", false],
              ["to", "To", "01:00 PM", false],
              ["appointmentType", "Appointment Type", "OPD", false],
              ["appointmentDurationMins", "Appointment Duration (mins)", "15", false, "number"],
              ["acceptBookingsInAdvanceDays", "Accept Bookings In Advance (days)", "7", false, "number"],
              ["consultationCharge", "Consultation Charge", "800", false, "number"],
              ["maxBookingsPerSlot", "Max Bookings Per Slot", "4", false, "number"],
            ].map(([name, label, placeholder, readOnly, type]) => (
              <label key={name} className="block">
                <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </div>
                <input
                  name={name}
                  defaultValue=""
                  placeholder={placeholder}
                  readOnly={Boolean(readOnly)}
                  type={type ?? "text"}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#55767e]"
                />
              </label>
            ))}

            <label className="md:col-span-2 xl:col-span-3 block">
              <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Bio
              </div>
              <textarea
                name="bio"
                rows={4}
                placeholder="Short doctor bio"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#55767e]"
              />
            </label>

            <label className="md:col-span-2 xl:col-span-3 block">
              <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Education
              </div>
              <textarea
                name="education"
                rows={4}
                placeholder="One per line: degree | university | from | to"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#55767e]"
              />
            </label>

            <label className="md:col-span-2 xl:col-span-3 block">
              <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Awards
              </div>
              <textarea
                name="awards"
                rows={3}
                placeholder="One award name per line"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#55767e]"
              />
            </label>

            <label className="md:col-span-2 xl:col-span-3 block">
              <div className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Certifications
              </div>
              <textarea
                name="certifications"
                rows={3}
                placeholder="One certification name per line"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[#55767e]"
              />
            </label>

            <label className="flex items-center gap-3 md:col-span-2 xl:col-span-3">
              <input
                name="featureOnWebsite"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-[#55767e]"
              />
              <span className="text-sm text-slate-700">Feature on website</span>
            </label>

            <label className="flex items-center gap-3 md:col-span-2 xl:col-span-3">
              <input
                name="displayOnBookingPage"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-[#55767e]"
              />
              <span className="text-sm text-slate-700">Display on booking page</span>
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="reset"
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#55767e] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4a676b]"
            >
              Save Doctor
            </button>
          </div>
        </form>

        {error ? (
          <div className="rounded-[24px] border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {recentDoctor ? (
          <div className="rounded-[24px] border border-[#d5d9ff] bg-[#f4f6ff] p-5">
            <div className="text-sm font-semibold text-[#5664d8]">Recently Added</div>
            <div className="mt-2 text-sm text-slate-700">
              {recentDoctor.name} ({recentDoctor.code})
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
