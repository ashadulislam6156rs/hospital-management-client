"use client";

import { useEffect, useState } from "react";

import { buildPatientRecord } from "@/lib/patient-records";

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPatients() {
      try {
        const response = await fetch("/api/patients", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load patients");
        }

        const payload = await response.json();
        if (isMounted) {
          setPatients(Array.isArray(payload?.patients) ? payload.patients : []);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load patient data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPatients();

    return () => {
      isMounted = false;
    };
  }, []);

  async function addPatient(formData) {
    const response = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient: buildPatientRecord(formData, patients),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save patient");
    }

    const payload = await response.json();
    setPatients(Array.isArray(payload?.patients) ? payload.patients : []);
    return payload?.patient ?? null;
  }

  return {
    patients,
    isLoading,
    error,
    addPatient,
  };
}
