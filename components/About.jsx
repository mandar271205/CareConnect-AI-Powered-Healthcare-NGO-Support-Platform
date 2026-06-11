import { HeartPulse, ShieldCheck, Users, Star, Award } from "lucide-react";

const highlights = [
  { icon: Users, label: "Community Focused", desc: "Built for real people navigating hard situations" },
  { icon: Star, label: "Simple & Clear", desc: "No jargon, no barriers — just a helpful form" },
  { icon: Award, label: "Responsible AI", desc: "AI-powered FAQ assistant, never medical advice" },
];

export default function About() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: "#f8faff" }}>
      {/* Decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 80%, rgba(13,148,136,0.08) 0%, transparent 50%), radial-gradient(circle at 10% 30%, rgba(124,58,237,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="section-shell relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        {/* Left — info card */}
        <div className="space-y-5">
          <div
            className="relative overflow-hidden rounded-3xl p-7"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
              border: "1px solid rgba(13,148,136,0.15)",
              boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Top strip */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #0d9488, #0891b2)" }}
            />

            <div className="flex items-center gap-4">
              <span
                className="grid size-14 place-items-center rounded-2xl text-white shadow-sm"
                style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
              >
                <HeartPulse aria-hidden="true" className="size-7" />
              </span>
              <div>
                <p className="text-lg font-extrabold text-slate-900">CareConnect</p>
                <p className="text-sm font-semibold text-teal-600">
                  NGO Healthcare Support Platform
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border bg-white/60 p-4"
                  style={{ borderColor: "rgba(13,148,136,0.12)" }}
                >
                  <span
                    className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: "rgba(13,148,136,0.1)" }}
                  >
                    <item.icon className="size-5 text-teal-600" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer card */}
          <div
            className="flex gap-4 rounded-2xl border p-5"
            style={{
              background: "linear-gradient(135deg, rgba(251,146,60,0.08), rgba(249,115,22,0.05))",
              borderColor: "rgba(251,146,60,0.25)",
            }}
          >
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-orange-600"
            />
            <p className="text-sm font-semibold leading-6 text-slate-700">
              Not a hospital portal, medical-advice service, or emergency
              service. Users should not submit confidential medical records.
            </p>
          </div>
        </div>

        {/* Right — text */}
        <div>
          <div className="section-divider" />
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            About
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Built for clarity,{" "}
            <span className="gradient-text">accessibility,</span>{" "}
            and human connection.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-500">
            CareConnect is a concept-level healthcare NGO support platform. It
            demonstrates how a simple digital workflow can collect support
            requests, register volunteers, answer common questions, and organize
            enquiries before a human NGO team member follows up.
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-500">
            Every design decision prioritizes dignity, ease of use, and
            responsible AI — ensuring that the most vulnerable users feel
            welcomed, not overwhelmed.
          </p>


        </div>
      </div>
    </section>
  );
}
