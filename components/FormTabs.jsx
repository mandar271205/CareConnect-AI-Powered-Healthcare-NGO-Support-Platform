"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, Lock, Mail, Sparkles, UsersRound } from "lucide-react";
import ContactForm from "./ContactForm";
import PatientSupportForm from "./PatientSupportForm";
import Toast from "./Toast";
import VolunteerForm from "./VolunteerForm";

const tabs = [
  { id: "patient",   label: "Patient Support", icon: HeartHandshake },
  { id: "volunteer", label: "Volunteer",        icon: UsersRound },
  { id: "contact",   label: "Contact Us",       icon: Mail },
];

const trustItems = [
  "End-to-end encryption",
  "No medical records stored",
  "Human follow-up guaranteed",
  "Supabase secure backend",
];

export default function FormTabs() {
  const [activeTab, setActiveTab]   = useState("patient");
  const [toast,     setToast]       = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <section id="forms" className="py-16 sm:py-20 lg:py-24" style={{ background: "#f8faff" }}>
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      <div className="section-shell">
        {/* ── Section header — always full width ── */}
        <div className="mb-10">
          <div className="section-divider" />
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            Intake Forms
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Collect only what the{" "}
            <span className="gradient-text">NGO team needs</span> to follow up.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
            Each submission uses client and server validation, spam prevention,
            clear consent, and structured storage in Supabase.
          </p>
        </div>

        {/* ── Two-column grid: trust sidebar | form card ── */}
        <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">

          {/* LEFT — trust signals, desktop only */}
          <aside className="hidden lg:block lg:sticky lg:top-24">
            <div
              className="rounded-2xl border p-6"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "rgba(13,148,136,0.15)",
                boxShadow: "0 4px 20px rgba(15,23,42,0.06)",
              }}
            >
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
                Why trust us?
              </p>
              <ul className="space-y-3">
                {trustItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span
                      className="grid size-7 shrink-0 place-items-center rounded-lg"
                      style={{ background: "rgba(13,148,136,0.1)" }}
                    >
                      <Lock className="size-3.5 text-teal-600" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* RIGHT — form card (block, not flex) */}
          <div
            className="w-full overflow-hidden rounded-2xl"
            style={{
              border: "1px solid rgba(13,148,136,0.15)",
              boxShadow: "0 20px 60px rgba(15,23,42,0.10), 0 4px 16px rgba(13,148,136,0.06)",
              background: "#ffffff",
            }}
          >
            {/* ── Custom tab bar (stacks above form, never side-by-side) ── */}
            <div
              className="border-b px-4 pt-4 pb-3"
              style={{
                background: "#fafafa",
                borderColor: "rgba(13,148,136,0.12)",
              }}
            >
              <div className="grid w-full grid-cols-3 gap-1.5 rounded-xl bg-slate-100 p-1">
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 px-2 text-xs font-semibold transition-all duration-200 sm:text-sm"
                      style={{
                        background: active ? "#ffffff" : "transparent",
                        color: active ? "#0d9488" : "#64748b",
                        boxShadow: active ? "0 1px 4px rgba(15,23,42,0.10)" : "none",
                      }}
                    >
                      <tab.icon aria-hidden="true" className="size-3.5 shrink-0 sm:size-4" />
                      {/* Responsive labels */}
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Form body — sits directly below the tab bar ── */}
            <div className="p-5 sm:p-7">
              <div className="mb-5 flex items-center gap-2">
                <Sparkles className="size-4 shrink-0 text-teal-500" aria-hidden="true" />
                <span
                  className="rounded-lg px-3 py-1 text-xs font-semibold"
                  style={{
                    background: "rgba(13,148,136,0.08)",
                    color: "#0d9488",
                    border: "1px solid rgba(13,148,136,0.18)",
                  }}
                >
                  Secure server-side submission
                </span>
              </div>

              {activeTab === "patient"   && <PatientSupportForm onToast={setToast} />}
              {activeTab === "volunteer" && <VolunteerForm      onToast={setToast} />}
              {activeTab === "contact"   && <ContactForm        onToast={setToast} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
