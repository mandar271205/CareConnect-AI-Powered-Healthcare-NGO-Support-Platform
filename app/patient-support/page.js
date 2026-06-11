"use client";

import { useState } from "react";
import CareBot from "@/components/CareBot";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PatientSupportForm from "@/components/PatientSupportForm";
import Toast from "@/components/Toast";
import { HeartHandshake } from "lucide-react";

export default function PatientSupportPage() {
  const [toast, setToast] = useState(null);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen py-16 sm:py-20"
        style={{
          background:
            "radial-gradient(ellipse at 10% 30%, rgba(13,148,136,0.08) 0%, transparent 50%), radial-gradient(ellipse at 90% 70%, rgba(8,145,178,0.06) 0%, transparent 50%), #f8faff",
        }}
      >
        <Toast toast={toast} onDismiss={() => setToast(null)} />
        <div className="section-shell">
          {/* Page header */}
          <div className="mb-10 border-b pb-8" style={{ borderColor: "rgba(13,148,136,0.12)" }}>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="grid size-12 place-items-center rounded-xl text-white shadow-sm"
                style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
              >
                <HeartHandshake className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
                  Patient Support
                </p>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  Submit a Support Request
                </h1>
              </div>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-500">
              Fill in the form below and our NGO team will follow up with you. Please do not share
              confidential medical records, diagnoses, or prescriptions.
            </p>
          </div>

          {/* Form card */}
          <div className="mx-auto max-w-3xl">
            <div
              className="overflow-hidden rounded-2xl bg-white"
              style={{
                border: "1px solid rgba(13,148,136,0.15)",
                boxShadow: "0 20px 60px rgba(15,23,42,0.10), 0 4px 16px rgba(13,148,136,0.06)",
              }}
            >
              <div className="h-1" style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }} />
              <div className="p-6 sm:p-8">
                <PatientSupportForm onToast={setToast} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CareBot />
    </>
  );
}
