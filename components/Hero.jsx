"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Route,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function openCareBot() {
  window.dispatchEvent(new Event("carebot:open"));
}

const stats = [
  { value: "24/7", label: "AI Support" },
  { value: "100%", label: "Free Service" },
  { value: "Secure", label: "Data Private" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(13,148,136,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(8,145,178,0.1) 0%, transparent 50%), linear-gradient(180deg, #f8faff 0%, #f0f4f8 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0d9488, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-32 h-80 w-80 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #0891b2, transparent)" }}
      />

      <div className="section-shell relative grid min-h-[calc(100svh-65px)] items-center gap-10 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-24">
        {/* Left content */}
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/60 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
              AI-Powered NGO Healthcare Support
            </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Care feels closer{" "}
            <span className="gradient-text">when someone listens.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
            CareConnect bridges individuals, families, and volunteers with the
            right NGO support — through beautifully simple forms and responsible
            AI-powered guidance.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              className="group h-13 rounded-xl px-7 text-base font-bold shadow-lg shadow-teal-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/30"
              style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
            >
              <a href="#forms">
                Request Support
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-13 rounded-xl border-teal-200 bg-white/80 px-7 text-base font-bold backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:bg-teal-50 hover:shadow-md"
              onClick={openCareBot}
            >
              <Bot aria-hidden="true" className="size-5 text-teal-600" />
              Ask CareBot
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex items-center gap-6">
            {["Simple forms", "Human follow-up", "FAQ assistance"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <CheckCircle2 aria-hidden="true" className="size-4 text-teal-500" />
                  {item}
                </span>
              )
            )}
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-white/60 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm"
              >
                <p className="text-2xl font-extrabold text-teal-700">{stat.value}</p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — premium dashboard card */}
        <div className="relative">
          {/* Floating badge */}
          <div className="absolute -top-5 -right-4 z-10 hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 px-5 py-3 shadow-lg sm:block">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-orange-500" aria-hidden="true" />
              <span className="text-sm font-bold text-orange-800">AI Powered</span>
            </div>
          </div>

          {/* Main dashboard card */}
          <div
            className="relative overflow-hidden rounded-3xl border border-white/70 p-6 shadow-2xl backdrop-blur-xl"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.8))",
              boxShadow:
                "0 32px 80px rgba(15,23,42,0.15), 0 4px 16px rgba(13,148,136,0.1)",
            }}
          >
            {/* Card top gradient strip */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #0d9488, #0891b2, #7c3aed)" }}
            />

            <div className="grid gap-4">
              {/* Request preview */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(13,148,136,0.08), rgba(8,145,178,0.05))",
                  border: "1px solid rgba(13,148,136,0.15)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-teal-600">
                      <Sparkles className="size-3" />
                      New request
                    </p>
                    <h2 className="mt-2 text-xl font-extrabold text-slate-950">
                      Paediatric support
                    </h2>
                  </div>
                  <Badge className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-teal-700 shadow-sm">
                    CC-1106-4821
                  </Badge>
                </div>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  <span className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    WhatsApp follow-up
                  </span>
                  <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 px-3 py-2 text-sm font-bold text-orange-800">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    Priority Review
                  </span>
                </div>
              </div>

              {/* Info cards grid */}
              <div className="grid gap-3 sm:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Route aria-hidden="true" className="size-4 text-teal-600" />
                    Routing tag
                  </div>
                  <p className="mt-2.5 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                    Child Wellness Team
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <ClipboardList aria-hidden="true" className="size-4 text-teal-600" />
                    Generated summary
                  </div>
                  <p className="mt-2.5 text-sm leading-6 text-slate-500">
                    Request organized for NGO review with routing, priority, and follow-up.
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="grid gap-2.5 sm:grid-cols-3">
                {[
                  ["Request received", ShieldCheck, "bg-emerald-50 text-emerald-700"],
                  ["Request organized", ClipboardList, "bg-teal-50 text-teal-700"],
                  ["NGO follow-up", HeartHandshake, "bg-sky-50 text-sky-700"],
                ].map(([label, Icon, color], index) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <span
                      className={`grid size-9 place-items-center rounded-xl ${color}`}
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <p className="mt-2.5 text-xs font-bold text-slate-700">
                      {index + 1}. {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
