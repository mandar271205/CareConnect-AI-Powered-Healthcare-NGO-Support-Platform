"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, Mail, UsersRound } from "lucide-react";
import ContactForm from "./ContactForm";
import PatientSupportForm from "./PatientSupportForm";
import Toast from "./Toast";
import VolunteerForm from "./VolunteerForm";

const tabs = [
  { id: "patient", label: "Patient Support", icon: HeartHandshake },
  { id: "volunteer", label: "Volunteer Registration", icon: UsersRound },
  { id: "contact", label: "Contact Us", icon: Mail },
];

export default function FormTabs() {
  const [activeTab, setActiveTab] = useState("patient");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <section id="forms" className="bg-slate-50 py-20">
      <Toast toast={toast} onDismiss={() => setToast(null)} />
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
              Intake forms
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Collect only what the NGO team needs to follow up.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Each submission uses client and server validation, spam
              prevention, clear consent, and structured storage in Supabase.
            </p>
          </div>

          <div className="card overflow-hidden">
            <div className="grid border-b border-slate-200 bg-white sm:grid-cols-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`flex min-h-14 items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-teal-700 ${
                    activeTab === tab.id
                      ? "bg-teal-700 text-white"
                      : "text-slate-600 hover:bg-teal-50 hover:text-teal-800"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon aria-hidden="true" className="size-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-7">
              {activeTab === "patient" ? (
                <PatientSupportForm onToast={setToast} />
              ) : null}
              {activeTab === "volunteer" ? (
                <VolunteerForm onToast={setToast} />
              ) : null}
              {activeTab === "contact" ? <ContactForm onToast={setToast} /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
