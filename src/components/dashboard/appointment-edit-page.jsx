"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarCheck2, Sparkles, UserRound } from "lucide-react";

import { AppShell } from "./app-shell";
import { StatCard } from "./stat-card";
import {
  initialAppointments,
  priorityOptions,
  shiftOptions,
  statusOptions,
  timeOptions,
} from "./appointment-data";
import { AppointmentTable, SectionHeader, SelectControl, StatPill } from "./appointment-ui";

export function AppointmentEditPage() {
  const searchParams = useSearchParams();
  const initialAppointment =
    initialAppointments.find((item) => item.id === searchParams.get("appointment")) ?? initialAppointments[0];
  const initialId = initialAppointment.id;

  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(initialId);
  const [editForm, setEditForm] = useState(() => {
    return {
      date: initialAppointment.date,
      timeSlot: initialAppointment.timeSlot,
      shift: initialAppointment.shift,
      priority: initialAppointment.priority,
      status: initialAppointment.status,
      remarks: initialAppointment.remarks,
    };
  });

  const selectedAppointment = useMemo(
    () => appointments.find((item) => item.id === selectedAppointmentId) ?? appointments[0] ?? null,
    [appointments, selectedAppointmentId]
  );

  function selectAppointment(appointmentId) {
    const nextAppointment = appointments.find((item) => item.id === appointmentId) ?? appointments[0];
    setSelectedAppointmentId(appointmentId);

    if (nextAppointment) {
      setEditForm({
        date: nextAppointment.date,
        timeSlot: nextAppointment.timeSlot,
        shift: nextAppointment.shift,
        priority: nextAppointment.priority,
        status: nextAppointment.status,
        remarks: nextAppointment.remarks,
      });
    }
  }

  function updateField(name, value) {
    setEditForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === selectedAppointmentId
          ? {
              ...appointment,
              ...editForm,
            }
          : appointment
      )
    );
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1400px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#55767e]">
            Appointment Module
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Edit Appointment</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Select an existing appointment and update its schedule, status, and remarks.
          </p>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard label="Appointments" value={String(appointments.length)} className="bg-[#55767e]" />
          <StatCard label="Selected" value={selectedAppointmentId} className="bg-[#6b8a91]" />
          <StatCard label="Status" value={selectedAppointment?.status ?? "N/A"} className="bg-[#86a39f]" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
          >
            <SectionHeader
              eyebrow="Edit Appointment"
              title="Update an Existing Booking"
              subtitle="Use the selector or load from the list page, then update the appointment in place."
            />

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Appointment
                </div>
                <SelectControl
                  value={selectedAppointmentId}
                  onChange={(event) => selectAppointment(event.target.value)}
                  options={appointments.map((item) => item.id)}
                  placeholder="Choose appointment"
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Date</div>
                <input
                  value={editForm.date}
                  onChange={(event) => updateField("date", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Time Slot</div>
                <SelectControl
                  value={editForm.timeSlot}
                  onChange={(event) => updateField("timeSlot", event.target.value)}
                  options={timeOptions}
                  placeholder="Select slot"
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Shift</div>
                <SelectControl
                  value={editForm.shift}
                  onChange={(event) => updateField("shift", event.target.value)}
                  options={shiftOptions}
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Priority</div>
                <SelectControl
                  value={editForm.priority}
                  onChange={(event) => updateField("priority", event.target.value)}
                  options={priorityOptions}
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Status</div>
                <SelectControl
                  value={editForm.status}
                  onChange={(event) => updateField("status", event.target.value)}
                  options={statusOptions}
                />
              </label>

              <label className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Remarks</div>
                <input
                  value={editForm.remarks}
                  onChange={(event) => updateField("remarks", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
                />
              </label>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-[#55767e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4a676b]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <UserRound className="h-4 w-4 text-[#55767e]" />
                Selected Record
              </div>
              {selectedAppointment ? (
                <div className="mt-4 space-y-3">
                  <StatPill label="Appointment ID" value={selectedAppointment.id} />
                  <StatPill label="Patient" value={selectedAppointment.patient} />
                  <StatPill label="Doctor" value={selectedAppointment.doctor} />
                  <StatPill label="Department" value={selectedAppointment.department} />
                  <StatPill label="Current Status" value={selectedAppointment.status} />
                  <StatPill label="Current Token" value={selectedAppointment.token} />
                </div>
              ) : (
                <div className="mt-4 text-sm text-slate-500">No appointment selected.</div>
              )}
            </div>

            <div className="rounded-[28px] border border-[#c7d8d9] bg-[#eff6f6] p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Sparkles className="h-4 w-4 text-[#55767e]" />
                Edit Tips
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="rounded-xl bg-white px-4 py-3">Keep the appointment ID fixed.</div>
                <div className="rounded-xl bg-white px-4 py-3">Update status after the consultation is done.</div>
                <div className="rounded-xl bg-white px-4 py-3">Use the list page to load a row quickly.</div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <CalendarCheck2 className="h-4 w-4 text-[#55767e]" />
                Queue Snapshot
              </div>
              <div className="mt-4 text-sm text-slate-600">
                The table below reflects the current in-memory appointment list after edits are saved.
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
          <SectionHeader
            eyebrow="View Current"
            title="Edited Queue"
            subtitle="This is the same live data shown in the edit form, so you can verify changes immediately."
          />
          <AppointmentTable appointments={appointments} onEdit={(id) => selectAppointment(id)} />
        </section>
      </div>
    </AppShell>
  );
}
