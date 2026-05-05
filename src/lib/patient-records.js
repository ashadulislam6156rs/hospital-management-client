export const PATIENT_SEED_URL = "/demo-data/patients.json";

export function normalizePatientDataset(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.patients)) {
    return payload.patients;
  }

  return [];
}

export function getNextPatientCode(patients) {
  const nextIndex = patients.length + 1;
  return `PY${String(nextIndex).padStart(4, "0")}`;
}

export function getNextPatientId(patients) {
  const nextIndex = patients.length + 1;
  return `PT-2026-${String(nextIndex).padStart(4, "0")}`;
}

export function buildPatientRecord(formData, existingPatients = []) {
  const code = String(formData.get("code") || getNextPatientCode(existingPatients));
  const patientId = String(formData.get("patientId") || getNextPatientId(existingPatients));
  const age = Number(formData.get("age") || 0);

  return {
    code,
    patientId,
    name: String(formData.get("name") || ""),
    age,
    gender: String(formData.get("gender") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    dateOfBirth: String(formData.get("dateOfBirth") || ""),
    bloodGroup: String(formData.get("bloodGroup") || ""),
    primaryDoctor: String(formData.get("primaryDoctor") || ""),
    status: String(formData.get("status") || "OPD"),
    emergency: String(formData.get("emergency")) === "on",
    insurance: String(formData.get("insurance") || ""),
    guardianName: String(formData.get("guardianName") || ""),
    guardianContact: String(formData.get("guardianContact") || ""),
    maritalStatus: String(formData.get("maritalStatus") || ""),
    idType: String(formData.get("idType") || ""),
    idNumber: String(formData.get("idNumber") || ""),
    remarks: String(formData.get("remarks") || ""),
    allergies: String(formData.get("allergies") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    address: {
      line1: String(formData.get("addressLine1") || ""),
      line2: String(formData.get("addressLine2") || ""),
      country: String(formData.get("country") || ""),
      state: String(formData.get("state") || ""),
      city: String(formData.get("city") || ""),
      pincode: String(formData.get("pincode") || ""),
    },
    lastVisit: {
      module: String(formData.get("lastVisitModule") || ""),
      date: String(formData.get("lastVisitDate") || ""),
      reason: String(formData.get("lastVisitReason") || ""),
      doctor: String(formData.get("lastVisitDoctor") || ""),
    },
  };
}
