import { Bot, ClipboardList, Database, Send } from "lucide-react";

const steps = [
  {
    title: "User submits request",
    detail: "Simple mobile-friendly form",
    icon: Send,
  },
  {
    title: "Request stored securely",
    detail: "Supabase database record",
    icon: Database,
  },
  {
    title: "Request organized",
    detail: "Ticket, summary, priority, and routing",
    icon: ClipboardList,
  },
  {
    title: "FAQ guidance available",
    detail: "NVIDIA-powered CareBot assistant",
    icon: Bot,
  },
];

export default function AutomationFlow() {
  return (
    <section className="bg-teal-950 py-20 text-white">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-200">
            Automation idea
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal sm:text-4xl">
            A small idea with a practical NGO impact.
          </h2>
          <p className="mt-5 text-lg leading-8 text-teal-50">
            CareConnect stores incoming requests in a structured format,
            automatically summarizes support submissions, and suggests the
            appropriate follow-up team. CareBot answers common NGO-related
            questions so staff can focus on meaningful human support.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-lg border border-white/[0.15] bg-white/[0.08] p-5 shadow-sm"
            >
              <span className="grid size-11 place-items-center rounded-lg bg-orange-200 text-slate-950">
                <step.icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-teal-50">{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
