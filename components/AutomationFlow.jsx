import { Bot, ClipboardList, Database, Send, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "User submits request",
    detail: "Simple mobile-friendly form — takes under 3 minutes",
    icon: Send,
    color: "from-teal-400 to-teal-600",
    number: "01",
  },
  {
    title: "Request stored securely",
    detail: "Supabase database — encrypted and private",
    icon: Database,
    color: "from-sky-400 to-sky-600",
    number: "02",
  },
  {
    title: "Request organized",
    detail: "Ticket, summary, priority, and routing assigned",
    icon: ClipboardList,
    color: "from-violet-400 to-violet-600",
    number: "03",
  },
  {
    title: "FAQ guidance available",
    detail: "AI-powered CareBot gives instant answers",
    icon: Bot,
    color: "from-orange-400 to-orange-600",
    number: "04",
  },
];

export default function AutomationFlow() {
  return (
    <section
      className="relative overflow-hidden py-24 text-white"
      style={{
        background: "linear-gradient(135deg, #0f2027 0%, #0d3b38 50%, #0f2027 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(13,148,136,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(8,145,178,0.1) 0%, transparent 40%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="section-shell relative">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            Automation idea
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            A small idea with a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #5eead4, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              practical NGO impact.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-teal-100/70">
            CareConnect stores incoming requests in a structured format,
            automatically summarizes submissions, and suggests the appropriate
            follow-up team. CareBot answers common questions so staff can focus
            on meaningful human support.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="relative group">
              {/* Connector arrow */}
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
                >
                  <ArrowRight className="size-5 text-white/20" />
                </div>
              )}

              <div
                className="relative overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl"
                style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)" }}
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 text-5xl font-black text-white/5">
                  {step.number}
                </span>

                <div
                  className={`grid size-14 place-items-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                >
                  <step.icon aria-hidden="true" className="size-7 text-white" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-teal-100/60">{step.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
