export const DOCTOR_STORAGE_KEY = "hospital-demo-doctors";
export const DOCTOR_SEED_URL = "/demo-data/doctors.json";

export function parseJsonSafe(value, fallback = null) {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function normalizeDoctorDataset(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.doctors)) {
    return payload.doctors;
  }

  return [];
}

export function getNextDoctorCode(doctors) {
  const nextIndex = doctors.length + 1;
  return `DR${String(nextIndex).padStart(4, "0")}`;
}

export function buildDoctorRecord(formData, existingDoctors = []) {
  const code = String(formData.get("code") || getNextDoctorCode(existingDoctors));
  const years = Number(formData.get("yearOfExperience") || 0);
  const consultationCharge = Number(formData.get("consultationCharge") || 0);
  const appointmentDurationMins = Number(formData.get("appointmentDurationMins") || 15);
  const acceptBookingsInAdvanceDays = Number(formData.get("acceptBookingsInAdvanceDays") || 7);
  const maxBookingsPerSlot = Number(formData.get("maxBookingsPerSlot") || 4);

  return {
    code,
    name: String(formData.get("name") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    dob: String(formData.get("dob") || ""),
    yearOfExperience: years,
    department: String(formData.get("department") || ""),
    designation: String(formData.get("designation") || ""),
    medicalLicenseNumber: String(formData.get("medicalLicenseNumber") || ""),
    languageSpoken: String(formData.get("languageSpoken") || ""),
    bloodGroup: String(formData.get("bloodGroup") || ""),
    gender: String(formData.get("gender") || ""),
    bio: String(formData.get("bio") || ""),
    featureOnWebsite: String(formData.get("featureOnWebsite")) === "on",
    profileImage: String(formData.get("profileImage") || ""),
    address: {
      line1: String(formData.get("addressLine1") || ""),
      line2: String(formData.get("addressLine2") || ""),
      country: String(formData.get("country") || ""),
      state: String(formData.get("state") || ""),
      city: String(formData.get("city") || ""),
      pincode: String(formData.get("pincode") || ""),
    },
    schedule: {
      days: String(formData.get("days") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      session: String(formData.get("session") || ""),
      from: String(formData.get("from") || ""),
      to: String(formData.get("to") || ""),
      appointmentType: String(formData.get("appointmentType") || ""),
      appointmentDurationMins,
      acceptBookingsInAdvanceDays,
      consultationCharge,
      maxBookingsPerSlot,
      displayOnBookingPage: String(formData.get("displayOnBookingPage")) === "on",
    },
    education: String(formData.get("education") || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((entry) => {
        const [degree = "", university = "", from = "", to = ""] = entry
          .split("|")
          .map((part) => part.trim());

        return { degree, university, from, to };
      }),
    awards: String(formData.get("awards") || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((name) => ({ name, from: "" })),
    certifications: String(formData.get("certifications") || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((name) => ({ name, from: "" })),
  };
}

export function enrichDoctorRecord(record) {
  return {
    ...record,
    schedule: {
      days: [],
      session: "",
      from: "",
      to: "",
      appointmentType: "",
      appointmentDurationMins: 0,
      acceptBookingsInAdvanceDays: 0,
      consultationCharge: 0,
      maxBookingsPerSlot: 0,
      displayOnBookingPage: false,
      ...record.schedule,
    },
    address: {
      line1: "",
      line2: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      ...record.address,
    },
    education: Array.isArray(record.education) ? record.education : [],
    awards: Array.isArray(record.awards) ? record.awards : [],
    certifications: Array.isArray(record.certifications) ? record.certifications : [],
    featureOnWebsite: Boolean(record.featureOnWebsite),
  };
}

export async function loadSeedDoctors() {
  const response = await fetch(DOCTOR_SEED_URL, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load doctor seed data");
  }

  const payload = await response.json();
  return normalizeDoctorDataset(payload).map(enrichDoctorRecord);
}

export function readStoredDoctors() {
  if (typeof window === "undefined") {
    return [];
  }

  return normalizeDoctorDataset(parseJsonSafe(window.localStorage.getItem(DOCTOR_STORAGE_KEY), []))
    .map(enrichDoctorRecord);
}

export function writeStoredDoctors(doctors) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(DOCTOR_STORAGE_KEY, JSON.stringify(doctors));
}

export async function getMergedDoctors() {
  const seedDoctors = await loadSeedDoctors();
  const storedDoctors = readStoredDoctors();
  const seededCodes = new Set(seedDoctors.map((doctor) => doctor.code));
  const merged = [...seedDoctors];

  for (const doctor of storedDoctors) {
    if (!seededCodes.has(doctor.code)) {
      merged.push(doctor);
    }
  }

  return merged;
}
