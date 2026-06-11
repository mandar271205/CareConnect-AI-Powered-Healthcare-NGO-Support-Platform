"use client";

import { useState } from "react";
import CareBot from "@/components/CareBot";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Toast from "@/components/Toast";
import { Mail } from "lucide-react";

export default function ContactPage() {
  const [toast, setToast] = useState(null);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen py-16 sm:py-20"
        style={{
          background:
            "radial-gradient(ellipse at 10% 30%, rgba(8,145,178,0.08) 0%, transparent 50%), radial-gradient(ellipse at 90% 70%, rgba(3,105,161,0.05) 0%, transparent 50%), #f8faff",
        }}
      >
        <Toast toast={toast} onDismiss={() => setToast(null)} />
        <div className="section-shell">
          {/* Page header */}
          <div className="mb-10 border-b pb-8" style={{ borderColor: "rgba(8,145,178,0.12)" }}>
            <div className="mb-4 flex items-center gap-3">
              <span
                className="grid size-12 place-items-center rounded-xl text-white shadow-sm"
                style={{ background: "linear-gradient(135deg, #0891b2, #0369a1)" }}
              >
                <Mail className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">
                  Contact Us
                </p>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  Get in Touch
                </h1>
              </div>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-500">
              Have a question, feedback, or partnership enquiry? Send us a message and our
              team will respond within 1–2 business days.
            </p>
          </div>

          {/* Form card */}
          <div className="mx-auto max-w-3xl">
            <div
              className="overflow-hidden rounded-2xl bg-white"
              style={{
                border: "1px solid rgba(8,145,178,0.15)",
                boxShadow: "0 20px 60px rgba(15,23,42,0.10), 0 4px 16px rgba(8,145,178,0.06)",
              }}
            >
              <div className="h-1" style={{ background: "linear-gradient(135deg, #0891b2, #0369a1)" }} />
              <div className="p-6 sm:p-8">
                <ContactForm onToast={setToast} />
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
