"use client";

import { ArrowRight, Bot, HeartHandshake, UsersRound } from "lucide-react";

const services = [
  {
    title: "Patient Support",
    description:
      "Submit a brief non-emergency support request so the NGO team can understand how to follow up.",
    cta: "Request Support",
    href: "#forms",
    icon: HeartHandshake,
  },
  {
    title: "Volunteer Registration",
    description:
      "Register your interest in outreach activities, awareness campaigns, and community-support programs.",
    cta: "Join as a Volunteer",
    href: "#forms",
    icon: UsersRound,
  },
  {
    title: "FAQ Assistant",
    description:
      "Ask CareBot common questions about services, volunteering, privacy, and the support workflow.",
    cta: "Open CareBot",
    href: "#faq",
    icon: Bot,
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">
            Support pathways
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
            One simple intake flow for community care.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="card p-6">
              <span className="grid size-12 place-items-center rounded-lg bg-teal-50 text-teal-700">
                <service.icon aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-slate-950">
                {service.title}
              </h3>
              <p className="mt-3 min-h-24 text-base leading-7 text-slate-600">
                {service.description}
              </p>
              <a
                href={service.href}
                onClick={(event) => {
                  if (service.title === "FAQ Assistant") {
                    event.preventDefault();
                    window.dispatchEvent(new Event("carebot:open"));
                  }
                }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-700 transition hover:text-teal-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
              >
                {service.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
