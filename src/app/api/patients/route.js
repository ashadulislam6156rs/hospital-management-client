import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const DATA_FILE = path.join(process.cwd(), "public", "demo-data", "patients.json");

async function readPatientsFile() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const payload = JSON.parse(raw);
  return Array.isArray(payload?.patients) ? payload.patients : [];
}

async function writePatientsFile(patients) {
  const nextPayload = JSON.stringify({ patients }, null, 2);
  await fs.writeFile(DATA_FILE, `${nextPayload}\n`, "utf8");
}

export async function GET() {
  try {
    const patients = await readPatientsFile();
    return NextResponse.json({ patients });
  } catch {
    return NextResponse.json({ message: "Failed to load patient data." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const patient = body?.patient;

    if (!patient?.patientId || !patient?.code || !patient?.name) {
      return NextResponse.json(
        { message: "Patient code, patientId, and name are required." },
        { status: 400 }
      );
    }

    const patients = await readPatientsFile();
    const nextPatients = [patient, ...patients.filter((item) => item.patientId !== patient.patientId)];

    await writePatientsFile(nextPatients);

    return NextResponse.json({ patient, patients: nextPatients });
  } catch {
    return NextResponse.json({ message: "Failed to save patient data." }, { status: 500 });
  }
}
