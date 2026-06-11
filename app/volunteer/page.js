"use client";

import { useState } from "react";
import CareBot from "@/components/CareBot";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import VolunteerForm from "@/components/VolunteerForm";
import { UsersRound } from "lucide-react";

export default function VolunteerPage() {
  const [toast, setToast] = useState(null);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen py-16 sm:py-20"
        style={{
          background:
            "radial-gradient(ellipse at 10% 30%, rgba(124,58,237,0.07) 0%, transparent 50%), radial-gradient(ellipse at 90% 70%, rgba(109,40,217,0.05) 0%, transparent 50%), #f8faff",
        }}
      >
        <Toast toast={toast} onDismiss={() => setToast(null)} />
        <div className="section-shell">
          {/* Page header */}
          <div className="mb-10 border-b pb-8" style={{ borderColor: "rgba(124,58,237,0.12)" }}>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="grid size-12 place-items-center rounded-xl text-white shadow-sm"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
              >
                <UsersRound className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                  Volunteer Registration
                </p>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  Join as a Volunteer
                </h1>
              </div>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-500">
              Register your interest in outreach activities, awareness campaigns, and
              community-support programs. Our team will reach out to onboard you.
            </p>
          </div>

          {/* Form card */}
          <div className="mx-auto max-w-3xl">
            <div
              className="overflow-hidden rounded-2xl bg-white"
              style={{
                border: "1px solid rgba(124,58,237,0.15)",
                boxShadow: "0 20px 60px rgba(15,23,42,0.10), 0 4px 16px rgba(124,58,237,0.06)",
              }}
            >
              <div className="h-1" style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }} />
              <div className="p-6 sm:p-8">
                <VolunteerForm onToast={setToast} />
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
