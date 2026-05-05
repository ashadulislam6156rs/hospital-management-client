import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const DATA_FILE = path.join(process.cwd(), "public", "demo-data", "doctors.json");

async function readDoctorsFile() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const payload = JSON.parse(raw);
  return Array.isArray(payload?.doctors) ? payload.doctors : [];
}

async function writeDoctorsFile(doctors) {
  const nextPayload = JSON.stringify({ doctors }, null, 2);
  await fs.writeFile(DATA_FILE, `${nextPayload}\n`, "utf8");
}

export async function GET() {
  try {
    const doctors = await readDoctorsFile();
    return NextResponse.json({ doctors });
  } catch {
    return NextResponse.json({ message: "Failed to load doctor data." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const doctor = body?.doctor;

    if (!doctor?.code || !doctor?.name) {
      return NextResponse.json(
        { message: "Doctor code and name are required." },
        { status: 400 }
      );
    }

    const doctors = await readDoctorsFile();
    const nextDoctors = [doctor, ...doctors.filter((item) => item.code !== doctor.code)];

    await writeDoctorsFile(nextDoctors);

    return NextResponse.json({ doctor, doctors: nextDoctors });
  } catch {
    return NextResponse.json({ message: "Failed to save doctor data." }, { status: 500 });
  }
}
