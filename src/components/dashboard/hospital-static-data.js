export const hospitalSystemBlueprint = {
  systemOverview: [
    {
      title: "Patient Flow",
      items: ["Patient", "Appointment", "OPD", "IPD"],
    },
    {
      title: "Medical Services",
      items: ["Doctor", "Pathology", "Radiology", "Pharmacy"],
    },
    {
      title: "Support",
      items: ["Blood", "Ambulance", "Bed"],
    },
    {
      title: "System",
      items: ["Finance", "Reports"],
    },
  ],
  appointment: {
    entrySteps: [
      "Select or search an existing patient",
      "Pick the doctor and department",
      "Choose appointment date and time slot",
      "Set shift and priority",
      "Auto-generate serial number and token",
      "Add remarks and confirm booking",
    ],
    formFields: [
      {
        label: "Patient",
        value: "Ayesha Rahman",
        hint: "Search from patient registry",
      },
      {
        label: "Doctor",
        value: "Dr. Karim",
        hint: "Consultant list",
      },
      {
        label: "Department",
        value: "OPD / Medicine",
        hint: "Treatment type",
      },
      {
        label: "Date",
        value: "23 Apr 2026",
        hint: "Appointment date",
      },
      {
        label: "Time Slot",
        value: "09:30 AM",
        hint: "Auto filled from available slots",
      },
      {
        label: "Shift",
        value: "Morning",
        hint: "Morning / Evening",
      },
      {
        label: "Priority",
        value: "Normal",
        hint: "Normal / Emergency / VIP",
      },
      {
        label: "Serial No / Token",
        value: "OPD-021",
        hint: "Generated automatically",
      },
      {
        label: "Remarks",
        value: "Follow-up after lab report",
        hint: "Optional note",
      },
    ],
    relations: [
      {
        title: "Main relation",
        items: ["Patient -> Appointment", "Appointment -> OPD", "Appointment -> Billing"],
      },
      {
        title: "Work queue",
        items: ["Search patient", "Assign doctor", "Lock slot", "Generate token"],
      },
      {
        title: "Output",
        items: ["Visit serial", "Consultation queue", "Billing trigger"],
      },
    ],
    slotBoard: [
      {
        title: "Morning",
        items: ["09:00", "09:30", "10:00", "10:30"],
      },
      {
        title: "Evening",
        items: ["03:00", "03:30", "04:00", "04:30"],
      },
      {
        title: "Priority lane",
        items: ["Emergency", "VIP", "Walk-in"],
      },
    ],
    queues: [
      { label: "Booked", value: "18" },
      { label: "Waiting", value: "6" },
      { label: "Completed", value: "11" },
    ],
  },
  opd: {
    stats: [
      { label: "Tokens Issued", value: "31", note: "today" },
      { label: "Consulted", value: "22", note: "done" },
      { label: "Waiting", value: "9", note: "queue" },
    ],
  },
  ipd: {
    stats: [
      { label: "Occupied Beds", value: "10", note: "of 14" },
      { label: "Admitted", value: "8", note: "active cases" },
      { label: "Discharged", value: "2", note: "today" },
    ],
  },
  ambulance: {
    stats: [
      { label: "Active Trips", value: "3", note: "on route" },
      { label: "Pending Calls", value: "2", note: "waiting" },
      { label: "Available", value: "1", note: "ready vehicle" },
    ],
  },
  blood: {
    stats: [
      { label: "Units Available", value: "48", note: "in stock" },
      { label: "Donors", value: "22", note: "registered" },
      { label: "Requests", value: "6", note: "pending" },
    ],
  },
  patient: {
    registrationFlow: [
      "Create a patient profile",
      "Attach contact and emergency details",
      "Link the first visit or admission",
      "Track OPD, IPD, and billing history",
    ],
    formFields: [
      { label: "Patient Name", value: "Ayesha Rahman", hint: "Core identity" },
      { label: "Age / Gender", value: "26 / Female", hint: "Demographic" },
      { label: "Phone", value: "+880 1711 000000", hint: "Contact number" },
      { label: "Patient ID", value: "PT-2026-0142", hint: "Auto registration number" },
      { label: "Status", value: "OPD", hint: "Visit stage" },
      { label: "Emergency", value: "No", hint: "Critical flag" },
      { label: "Insurance", value: "Not linked", hint: "Optional finance link" },
    ],
    relations: [
      {
        title: "Patient services",
        items: ["Appointment", "OPD", "IPD", "Pathology", "Radiology", "Pharmacy", "Blood"],
      },
      {
        title: "Registry actions",
        items: ["Create profile", "Update history", "Mark admission", "Close discharge"],
      },
      {
        title: "Important flags",
        items: ["Allergy", "Emergency", "Insurance"],
      },
    ],
    visitStatus: [
      { label: "Registered", value: "214" },
      { label: "New Today", value: "14" },
      { label: "Admitted", value: "10" },
    ],
  },
  doctor: {
    rosterFlow: [
      "Create doctor profile",
      "Assign department and specialty",
      "Set shift and consultation slot",
      "Track attendance and round activity",
    ],
    formFields: [
      { label: "Doctor Name", value: "Dr. Karim", hint: "Consultant name" },
      { label: "Specialty", value: "Medicine", hint: "Medical department" },
      { label: "Shift", value: "Morning", hint: "Duty window" },
      { label: "Room", value: "OPD-03", hint: "Consultation room" },
      { label: "Consultation Slot", value: "09:00 - 01:00", hint: "Active schedule" },
      { label: "Status", value: "On Duty", hint: "Availability" },
    ],
    relations: [
      {
        title: "Service links",
        items: ["Patient consult", "Appointment queue", "IPD rounds", "Referral approval"],
      },
      {
        title: "Doctor setup",
        items: ["Department", "Shift", "Room", "Leave planning"],
      },
      {
        title: "Day view",
        items: ["Consultation slots", "Ward visit", "Follow-up list"],
      },
    ],
    dutySummary: [
      { label: "On Duty", value: "8" },
      { label: "Consultants", value: "12" },
      { label: "Specialties", value: "6" },
    ],
  },
};
