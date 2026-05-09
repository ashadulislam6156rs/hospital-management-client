"use client";

import { useState } from "react";
import { Clock3, Sparkles } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";
import {
  appointmentNumber,
  departmentOptions,
  doctorOptions,
  initialAppointments,
  patientOptions,
  priorityOptions,
  shiftOptions,
  timeOptions,
} from "./appointment-data";
import { SelectControl, SectionHeader, StatPill } from "./appointment-ui";

export function AppointmentBookPage() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [form, setForm] = useState({
    patient: patientOptions[0].value,
    doctor: doctorOptions[0].value,
    department: departmentOptions[0],
    date: "24 Apr 2026",
    timeSlot: timeOptions[1],
    shift: "Morning",
    priority: "Normal",
    remarks: "Follow-up after lab report",
  });
  const [recentBooking, setRecentBooking] = useState(null);

  const nextIndex = appointments.length + 1;
  const nextId = `AP-${appointmentNumber(nextIndex)}`;
  const nextToken = `TK-${appointmentNumber(nextIndex)}`;

  const currentPatient = patientOptions.find((item) => item.value === form.patient) ?? patientOptions[0];
  const currentDoctor = doctorOptions.find((item) => item.value === form.doctor) ?? doctorOptions[0];

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextBooking = {
      id: nextId,
      token: nextToken,
      patient: form.patient,
      doctor: form.doctor,
      department: form.department,
      date: form.date,
      timeSlot: form.timeSlot,
      shift: form.shift,
      priority: form.priority,
      status: "Booked",
      remarks: form.remarks || "No remarks",
    };

    setAppointments((current) => [nextBooking, ...current]);
    setRecentBooking(nextBooking);
  }

  function handleReset() {
    setForm({
      patient: patientOptions[0].value,
      doctor: doctorOptions[0].value,
      department: departmentOptions[0],
      date: "24 Apr 2026",
      timeSlot: timeOptions[1],
      shift: "Morning",
      priority: "Normal",
      remarks: "Follow-up after lab report",
    });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
            Appointment Module
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Book Appointment</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Create a new booking by selecting patient, doctor, slot, and priority.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Next Serial" value={nextId} className="bg-[#55767e]" />
          <StatCard label="Next Token" value={nextToken} className="bg-[#6b8a91]" />
          <StatCard label="Priority" value={form.priority} className="bg-[#86a39f]" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
          >
            <SectionHeader
              eyebrow="Book Appointment"
              title="Create a New Booking"
              subtitle="This form behaves like a booking desk. Save adds a new appointment record instantly."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Patient</div>
                <SelectControl
                  value={form.patient}
                  onChange={(event) => updateField("patient", event.target.value)}
                  options={patientOptions.map((item) => item.value)}
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Doctor</div>
                <SelectControl
                  value={form.doctor}
                  onChange={(event) => {
                    const nextDoctor = doctorOptions.find((item) => item.value === event.target.value);
                    updateField("doctor", event.target.value);
                    if (nextDoctor) {
                      updateField("shift", nextDoctor.shift);
                      updateField(
                        "department",
                        nextDoctor.specialty === "Cardiology"
                          ? "OPD / Cardiology"
                          : nextDoctor.specialty === "Medicine"
                            ? "OPD / Medicine"
                            : "Specialist"
                      );
                    }
                  }}
                  options={doctorOptions.map((item) => item.value)}
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Department</div>
                <SelectControl
                  value={form.department}
                  onChange={(event) => updateField("department", event.target.value)}
                  options={departmentOptions}
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Date</div>
                <input
                  value={form.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Time Slot</div>
                <SelectControl
                  value={form.timeSlot}
                  onChange={(event) => updateField("timeSlot", event.target.value)}
                  options={timeOptions}
                  placeholder="Select slot"
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Shift</div>
                <SelectControl
                  value={form.shift}
                  onChange={(event) => updateField("shift", event.target.value)}
                  options={shiftOptions}
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Priority</div>
                <SelectControl
                  value={form.priority}
                  onChange={(event) => updateField("priority", event.target.value)}
                  options={priorityOptions}
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2 xl:col-span-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Remarks</div>
                <input
                  value={form.remarks}
                  onChange={(event) => updateField("remarks", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
                />
              </label>

              <div className="flex items-end gap-3 md:col-span-2 xl:col-span-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full rounded-xl border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#55767e] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4a676b]"
                >
                  Save Booking
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Sparkles className="h-4 w-4 text-[#55767e]" />
                Booking Preview
              </div>
              <div className="mt-4 space-y-3">
                <StatPill label="Patient" value={currentPatient.label} />
                <StatPill label="Patient ID" value={currentPatient.id} />
                <StatPill label="Age / Gender" value={`${currentPatient.age} / ${currentPatient.gender}`} />
                <StatPill label="Doctor" value={currentDoctor.label} />
                <StatPill label="Specialty" value={currentDoctor.specialty} />
                <StatPill label="Generated Serial" value={nextId} />
                <StatPill label="Generated Token" value={nextToken} />
              </div>
            </div>

            <div className="rounded-[28px] border border-[#c7d8d9] bg-[#eff6f6] p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Clock3 className="h-4 w-4 text-[#55767e]" />
                Quick Flow
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-xl bg-white px-4 py-3">1. Search patient</div>
                <div className="rounded-xl bg-white px-4 py-3">2. Assign doctor and department</div>
                <div className="rounded-xl bg-white px-4 py-3">3. Choose time slot and priority</div>
                <div className="rounded-xl bg-white px-4 py-3">4. Save and push to appointment queue</div>
              </div>
            </div>

            {recentBooking ? (
              <div className="rounded-[28px] border border-[#c7d8d9] bg-[#eff6f6] p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="text-sm font-semibold text-slate-900">Recently Added Appointment</div>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Serial: {recentBooking.id}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Token: {recentBooking.token}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Patient: {recentBooking.patient}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Doctor: {recentBooking.doctor}</div>
                  <div className="rounded-xl bg-white px-4 py-3">Slot: {recentBooking.timeSlot}</div>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
