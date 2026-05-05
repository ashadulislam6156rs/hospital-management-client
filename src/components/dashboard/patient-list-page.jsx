"use client";

import Link from "next/link";
import { ChevronDown, Filter, LayoutGrid, ListFilter, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "./app-shell";
import { usePatients } from "@/hooks/use-patients";

function statusTone(status) {
  const value = String(status || "").toLowerCase();

  if (value.includes("opd") || value.includes("active")) {
    return "border-green-300 bg-green-50 text-green-700";
  }

  if (value.includes("ipd") || value.includes("admit")) {
    return "border-blue-300 bg-blue-50 text-blue-700";
  }

  return "border-slate-300 bg-slate-50 text-slate-600";
}

export function PatientListPage() {
  const { patients, isLoading, error } = usePatients();
  const [query, setQuery] = useState("");

  const filteredPatients = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return patients;
    }

    return patients.filter((patient) => {
      const haystack = [
        patient.name,
        patient.code,
        patient.patientId,
        patient.phone,
        patient.email,
        patient.primaryDoctor,
        patient.status,
        patient.address?.city,
        patient.address?.state,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [patients, query]);

  return (
    <AppShell title="Hospital management" showOverviewBadge={false}>
      <div className="mx-auto max-w-[1600px] space-y-4">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Patients List</h1>
            <span className="rounded-md border border-[#5968df] px-3 py-1 text-sm text-[#5968df]">
              Total Patients : {isLoading ? 565 : patients.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              Export <ChevronDown className="ml-1 inline-block h-4 w-4" />
            </button>
            <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <LayoutGrid className="mr-1 inline-block h-4 w-4" />
            </button>
            <Link
              href="/patient/create"
              className="rounded-md bg-[#4b4bb3] px-4 py-2 text-sm font-semibold text-white"
            >
              <Plus className="mr-1 inline-block h-4 w-4" />
              New Patient
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex w-full max-w-xs items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
            <Search className="h-4 w-4" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="w-full border-none bg-transparent outline-none placeholder:text-slate-400"
            />
          </label>

          <div className="flex items-center gap-2">
            <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <Filter className="mr-1 inline-block h-4 w-4" />
              Filters
            </button>
            <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              Sort By : Recent <ListFilter className="ml-1 inline-block h-4 w-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            Loading patient rows...
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-[2fr_1fr_1.5fr_1.3fr_1fr_0.8fr] gap-4 border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
              <div>Patient</div>
              <div>Phone</div>
              <div>Doctor</div>
              <div>Address</div>
              <div>Last Visit</div>
              <div>Status</div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredPatients.map((patient) => (
                <Link
                  key={patient.patientId}
                  href={`/patient/details?patient=${encodeURIComponent(patient.code)}`}
                  className="grid grid-cols-[2fr_1fr_1.5fr_1.3fr_1fr_0.8fr] gap-4 px-4 py-3 text-sm transition hover:bg-slate-50"
                >
                  <div>
                    <div className="font-semibold text-slate-900">{patient.name}</div>
                    <div className="text-slate-500">
                      {patient.age}, {patient.gender}
                    </div>
                  </div>
                  <div className="text-slate-600">{patient.phone}</div>
                  <div>
                    <div className="font-semibold text-slate-900">{patient.primaryDoctor}</div>
                    <div className="text-slate-500">{patient.status}</div>
                  </div>
                  <div className="text-slate-600">
                    {patient.address?.city}, {patient.address?.state}
                  </div>
                  <div className="text-slate-600">{patient.lastVisit?.date}</div>
                  <div>
                    <span className={`inline-flex rounded border px-2 py-1 text-xs font-medium ${statusTone(patient.status)}`}>
                      {patient.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
