import { HeartPulse, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-lg bg-teal-700 text-white">
              <HeartPulse aria-hidden="true" className="size-6" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
                CareConnect
              </p>
              <p className="text-sm font-semibold text-slate-600">
                Concept platform for NGO healthcare support
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-orange-200 bg-orange-100 p-4">
            <div className="flex gap-3">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-slate-900"
              />
              <p className="text-sm font-semibold leading-6 text-slate-800">
                Not a hospital portal, medical-advice service, or emergency
                service. Users should not submit confidential medical records.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            About
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
            Built for clarity, accessibility, and human connection.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            CareConnect is a concept-level healthcare NGO support platform. It
            demonstrates how a simple digital workflow can collect support
            requests, register volunteers, answer common questions, and organize
            enquiries before a human NGO team member follows up.
          </p>
        </div>
      </div>
    </section>
  );
}
