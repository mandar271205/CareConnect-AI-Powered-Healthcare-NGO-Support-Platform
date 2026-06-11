"use client";

import { ArrowRight, Bot, HeartHandshake, Sparkles, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Patient Support",
    description:
      "Submit a brief non-emergency support request so the NGO team can understand how to follow up.",
    cta: "Request Support",
    href: "/patient-support",
    icon: HeartHandshake,
    gradient: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
    bgLight: "#f0fdf4",
    iconBg: "rgba(13,148,136,0.1)",
    iconColor: "#0d9488",
    badge: "Most Popular",
  },
  {
    title: "Volunteer Registration",
    description:
      "Register your interest in outreach activities, awareness campaigns, and community-support programs.",
    cta: "Join as a Volunteer",
    href: "/volunteer",
    icon: UsersRound,
    gradient: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    bgLight: "#f5f3ff",
    iconBg: "rgba(124,58,237,0.1)",
    iconColor: "#7c3aed",
    badge: "Open Now",
  },
  {
    title: "AI FAQ Assistant",
    description:
      "Ask CareBot common questions about services, volunteering, privacy, and the support workflow.",
    cta: "Open CareBot",
    href: "#faq",
    icon: Bot,
    gradient: "linear-gradient(135deg, #0891b2 0%, #0369a1 100%)",
    bgLight: "#f0f9ff",
    iconBg: "rgba(8,145,178,0.1)",
    iconColor: "#0891b2",
    badge: "AI Powered",
  },
];

export default function Services() {
  return (
    <section className="relative overflow-hidden py-24" style={{ background: "#ffffff" }}>
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 80%, rgba(13,148,136,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124,58,237,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="section-shell relative">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="section-divider" />
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            Support Pathways
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            One simple intake flow{" "}
            <span className="gradient-text">for community care.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Choose the support pathway that works for you — we make it effortless.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                borderColor: "rgba(14,165,133,0.12)",
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Top gradient bar */}
              <div
                aria-hidden="true"
                className="h-1 w-full"
                style={{ background: service.gradient }}
              />

              <div className="p-7">
                {/* Badge */}
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="grid size-14 place-items-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ background: service.iconBg }}
                  >
                    <service.icon
                      aria-hidden="true"
                      className="size-7"
                      style={{ color: service.iconColor }}
                    />
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      background: service.iconBg,
                      color: service.iconColor,
                    }}
                  >
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-500">
                  {service.description}
                </p>

                <div className="mt-7">
                  <Button
                    asChild
                    className="group/btn h-11 w-full rounded-xl font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: service.gradient }}
                  >
                    <a
                      href={service.href}
                      onClick={(event) => {
                        if (service.title === "AI FAQ Assistant") {
                          event.preventDefault();
                          window.dispatchEvent(new Event("carebot:open"));
                        }
                      }}
                    >
                      <Sparkles className="size-4" />
                      {service.cta}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
