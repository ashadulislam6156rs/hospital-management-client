"use client";

import { useEffect, useState } from "react";

import {
  buildDoctorRecord,
} from "@/lib/doctor-records";

export function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDoctors() {
      try {
        const response = await fetch("/api/doctors", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load doctors");
        }

        const payload = await response.json();
        const records = Array.isArray(payload?.doctors) ? payload.doctors : [];
        if (!isMounted) {
          return;
        }

        setDoctors(records);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Failed to load doctor data.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDoctors();

    return () => {
      isMounted = false;
    };
  }, []);

  async function addDoctor(formData) {
    const nextDoctor = buildDoctorRecord(formData, doctors);

    const response = await fetch("/api/doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ doctor: nextDoctor }),
    });

    if (!response.ok) {
      throw new Error("Failed to save doctor");
    }

    const payload = await response.json();
    setDoctors(Array.isArray(payload?.doctors) ? payload.doctors : []);
    return payload?.doctor ?? nextDoctor;
  }

  return {
    doctors,
    isLoading,
    error,
    addDoctor,
  };
}
