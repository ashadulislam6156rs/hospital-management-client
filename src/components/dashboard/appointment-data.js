export const patientOptions = [
  { label: "Ayesha Rahman", value: "Ayesha Rahman", age: "26", gender: "Female", id: "PT-2026-0142" },
  { label: "Rahim Uddin", value: "Rahim Uddin", age: "41", gender: "Male", id: "PT-2026-0081" },
  { label: "Nabila Sultana", value: "Nabila Sultana", age: "33", gender: "Female", id: "PT-2026-0115" },
  { label: "Shamim Islam", value: "Shamim Islam", age: "58", gender: "Male", id: "PT-2026-0044" },
];

export const doctorOptions = [
  { label: "Dr. Karim", value: "Dr. Karim", specialty: "Medicine", shift: "Morning" },
  { label: "Dr. Hasan", value: "Dr. Hasan", specialty: "Cardiology", shift: "Morning" },
  { label: "Dr. Sultana", value: "Dr. Sultana", specialty: "Gynae", shift: "Evening" },
  { label: "Dr. Rahman", value: "Dr. Rahman", specialty: "Surgery", shift: "Night" },
];

export const departmentOptions = ["OPD / Medicine", "OPD / Cardiology", "Specialist", "Follow-up"];
export const shiftOptions = ["Morning", "Evening", "Night"];
export const priorityOptions = ["Normal", "Emergency", "VIP"];
export const statusOptions = ["Booked", "Waiting", "Completed", "Cancelled"];
export const timeOptions = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "03:00 PM", "03:30 PM", "04:00 PM"];

export const workflowCards = [
  {
    label: "View all Appointment",
    href: "/appointment/view-all",
    description: "See today's complete appointment list, token, status, and quick edit access.",
    tone: "bg-[#eef2ff] text-[#5865d4]",
  },
  {
    label: "Book Appointment",
    href: "/appointment/book",
    description: "Create a new appointment with patient, doctor, slot, and priority details.",
    tone: "bg-[#ecf8f5] text-[#2f7d6f]",
  },
  {
    label: "Edit Appointment",
    href: "/appointment/edit",
    description: "Load an existing appointment and update slot, status, or consultation note.",
    tone: "bg-[#fff4e6] text-[#c76d1f]",
  },
];

export const initialAppointments = [
  {
    id: "AP-021",
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
    id: "AP-020",
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
    id: "AP-019",
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
  {
    id: "AP-018",
    token: "TK-018",
    patient: "Shamim Islam",
    doctor: "Dr. Rahman",
    department: "Follow-up",
    date: "22 Apr 2026",
    timeSlot: "04:00 PM",
    shift: "Night",
    priority: "Normal",
    status: "Cancelled",
    remarks: "Patient rescheduled visit",
  },
];

export function appointmentNumber(index) {
  return String(index).padStart(3, "0");
}
