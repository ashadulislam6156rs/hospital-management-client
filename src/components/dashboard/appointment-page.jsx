"use client";

import { useState } from "react";
import { CalendarCheck2, ChevronDown, Search, Sparkles } from "lucide-react";

import { AppShell } from "./app-shell";
import { hospitalSystemBlueprint } from "./hospital-static-data";
import { StatCard } from "./stat-card";

const patientOptions = [
  { label: "Ayesha Rahman", value: "Ayesha Rahman", age: "26", gender: "Female", id: "PT-2026-0142" },
  { label: "Rahim Uddin", value: "Rahim Uddin", age: "41", gender: "Male", id: "PT-2026-0081" },
  { label: "Nabila Sultana", value: "Nabila Sultana", age: "33", gender: "Female", id: "PT-2026-0115" },
  { label: "Shamim Islam", value: "Shamim Islam", age: "58", gender: "Male", id: "PT-2026-0044" },
];

const doctorOptions = [
  { label: "Dr. Karim", value: "Dr. Karim", specialty: "Medicine", shift: "Morning" },
  { label: "Dr. Hasan", value: "Dr. Hasan", specialty: "Cardiology", shift: "Morning" },
  { label: "Dr. Sultana", value: "Dr. Sultana", specialty: "Gynae", shift: "Evening" },
  { label: "Dr. Rahman", value: "Dr. Rahman", specialty: "Surgery", shift: "Night" },
];

const departmentOptions = ["OPD / Medicine", "OPD / Cardiology", "Specialist", "Follow-up"];
const shiftOptions = ["Morning", "Evening"];
const priorityOptions = ["Normal", "Emergency", "VIP"];
const timeOptions = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "03:00 PM", "03:30 PM", "04:00 PM"];

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

function Field({ label, children, hint }) {
  return (
    <label className="block rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      {children}
      {hint ? <div className="mt-2 text-xs text-slate-500">{hint}</div> : null}
    </label>
  );
}

function SelectControl({ value, onChange, options, placeholder = "Select..." }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-9 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-900">{value}</div>
    </div>
  );
}

function CompactTable({ title, columns, rows }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
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

function SlotMatrix() {
  const { slotBoard } = hospitalSystemBlueprint.appointment;

  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Sparkles className="h-4 w-4 text-[#55767e]" />
        Slot Matrix
      </div>
      <div className="space-y-4">
        {slotBoard.map((group) => (
          <div key={group.title} className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm font-medium text-slate-900">{group.title}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((slot) => (
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

function TimelineCard() {
  const { entrySteps, relations } = hospitalSystemBlueprint.appointment;

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
        <div className="mb-4 text-sm font-semibold text-slate-900">Appointment Flow</div>
        <div className="space-y-3">
          {entrySteps.map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#55767e] text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-sm text-slate-700">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
        <div className="mb-4 text-sm font-semibold text-slate-900">Relation Snapshot</div>
        <div className="space-y-4">
          {relations.map((group) => (
            <div key={group.title} className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-900">{group.title}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function appointmentNumber(index) {
  return String(index).padStart(3, "0");
}

function AppointmentPageContent() {
  const { appointment } = hospitalSystemBlueprint;
  const [bookings, setBookings] = useState([
    {
      serialNo: "AP-021",
      token: "TK-021",
      patient: "Ayesha Rahman",
      doctor: "Dr. Karim",
      department: "OPD / Medicine",
      date: "23 Apr 2026",
      timeSlot: "09:30 AM",
      shift: "Morning",
      priority: "Normal",
      status: "Booked",
      remarks: "Follow-up after lab report",
    },
    {
      serialNo: "AP-020",
      token: "TK-020",
      patient: "Rahim Uddin",
      doctor: "Dr. Hasan",
      department: "OPD / Cardiology",
      date: "23 Apr 2026",
      timeSlot: "10:00 AM",
      shift: "Morning",
      priority: "VIP",
      status: "Waiting",
      remarks: "ECG review",
    },
    {
      serialNo: "AP-019",
      token: "TK-019",
      patient: "Nabila Sultana",
      doctor: "Dr. Sultana",
      department: "Specialist",
      date: "23 Apr 2026",
      timeSlot: "03:00 PM",
      shift: "Evening",
      priority: "Emergency",
      status: "Completed",
      remarks: "Referral from OPD",
    },
  ]);
  const [recentBooking, setRecentBooking] = useState(bookings[0]);
  const [form, setForm] = useState({
    patient: patientOptions[0].value,
    doctor: doctorOptions[0].value,
    department: departmentOptions[0],
    date: "23 Apr 2026",
    timeSlot: timeOptions[1],
    shift: "Morning",
    priority: "Normal",
    remarks: "Follow-up after lab report",
  });

  const currentPatient = patientOptions.find((item) => item.value === form.patient) ?? patientOptions[0];
  const currentDoctor = doctorOptions.find((item) => item.value === form.doctor) ?? doctorOptions[0];
  const nextIndex = bookings.length + 1;
  const serialNo = `AP-${appointmentNumber(nextIndex)}`;
  const token = `TK-${appointmentNumber(nextIndex)}`;

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextBooking = {
      serialNo,
      token,
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

    setBookings((current) => [nextBooking, ...current]);
    setRecentBooking(nextBooking);
  }

  function handleReset() {
    setForm({
      patient: patientOptions[0].value,
      doctor: doctorOptions[0].value,
      department: departmentOptions[0],
      date: "23 Apr 2026",
      timeSlot: timeOptions[1],
      shift: "Morning",
      priority: "Normal",
      remarks: "Follow-up after lab report",
    });
  }

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <div className="rounded-[28px] border border-white/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#55767e]">
                <CalendarCheck2 className="h-4 w-4" />
                Appointment
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Appointment</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Patient search, doctor assignment, slot selection, token generation, and live booking queue.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <InfoPill label="Serial No" value={serialNo} />
              <InfoPill label="Token" value={token} />
              <InfoPill label="Next Slot" value={form.timeSlot} />
              <InfoPill label="Priority" value={form.priority} />
            </div>
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {appointment.queues.map((item) => (
            <StatCard key={item.label} label={item.label} value={item.value} className="bg-[#55767e]" />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.65fr_0.95fr]">
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
            >
              <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <SectionTitle
                  title="Main Entry Form"
                  subtitle="This front-end form behaves like a live booking screen. Save adds a new appointment row instantly."
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#55767e] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4a676b]"
                  >
                    Save Appointment
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Field label="Patient">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={form.patient}
                      onChange={(event) => updateField("patient", event.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
                    >
                      {patientOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  </div>
                </Field>

                <Field label="Doctor">
                  <SelectControl
                    value={form.doctor}
                    onChange={(event) => {
                      const nextDoctor = doctorOptions.find((item) => item.value === event.target.value);
                      updateField("doctor", event.target.value);
                      if (nextDoctor) {
                        updateField("shift", nextDoctor.shift);
                        updateField("department", nextDoctor.specialty === "Cardiology" ? "OPD / Cardiology" : form.department);
                      }
                    }}
                    options={doctorOptions.map((option) => option.value)}
                  />
                </Field>

                <Field label="Department">
                  <SelectControl
                    value={form.department}
                    onChange={(event) => updateField("department", event.target.value)}
                    options={departmentOptions}
                  />
                </Field>

                <Field label="Date">
                  <input
                    value={form.date}
                    onChange={(event) => updateField("date", event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
                  />
                </Field>

                <Field label="Time Slot">
                  <SelectControl
                    value={form.timeSlot}
                    onChange={(event) => updateField("timeSlot", event.target.value)}
                    options={timeOptions}
                    placeholder="Select slot"
                  />
                </Field>

                <Field label="Shift">
                  <SelectControl
                    value={form.shift}
                    onChange={(event) => updateField("shift", event.target.value)}
                    options={shiftOptions}
                  />
                </Field>

                <Field label="Priority">
                  <SelectControl
                    value={form.priority}
                    onChange={(event) => updateField("priority", event.target.value)}
                    options={priorityOptions}
                  />
                </Field>

                <Field label="Serial No / Token">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900">
                      {serialNo}
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900">
                      {token}
                    </div>
                  </div>
                </Field>

                <Field label="Remarks" hint="Optional note for the doctor or reception desk.">
                  <input
                    value={form.remarks}
                    onChange={(event) => updateField("remarks", event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-[#55767e]"
                  />
                </Field>
              </div>
            </form>

            <CompactTable
              title="Today Appointment Queue"
              columns={["Serial", "Patient", "Doctor", "Slot", "Status"]}
              rows={bookings.map((booking) => [
                booking.serialNo,
                booking.patient,
                booking.doctor,
                booking.timeSlot,
                booking.status,
              ])}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
              <div className="mb-4 text-sm font-semibold text-slate-900">Selected Patient / Doctor</div>
              <div className="space-y-3">
                <InfoPill label="Patient" value={currentPatient.label} />
                <InfoPill label="Patient ID" value={currentPatient.id} />
                <InfoPill label="Age / Gender" value={`${currentPatient.age} / ${currentPatient.gender}`} />
                <InfoPill label="Doctor" value={currentDoctor.label} />
                <InfoPill label="Specialty" value={currentDoctor.specialty} />
                <InfoPill label="Shift" value={currentDoctor.shift} />
              </div>
            </div>

            <SlotMatrix />
            <TimelineCard />

            {recentBooking ? (
              <div className="rounded-[24px] border border-[#c7d8d9] bg-[#eff6f6] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.06)]">
                <div className="mb-4 text-sm font-semibold text-slate-900">Recently Added Appointment</div>
                <div className="grid gap-3 text-sm text-slate-700">
                  <div className="rounded-xl bg-white px-4 py-3">Serial: {recentBooking.serialNo}</div>
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

export function AppointmentPage() {
  return <AppointmentPageContent />;
}
