"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Route,
  ShieldCheck,
} from "lucide-react";

function openCareBot() {
  window.dispatchEvent(new Event("carebot:open"));
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="section-shell grid min-h-[calc(100svh-65px)] items-center gap-12 py-14 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-teal-700">
            Community Healthcare Support
          </p>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.04] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
            Care feels closer when someone listens.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            CareConnect helps individuals, families, and volunteers connect
            with the right NGO support workflow through simple forms and
            responsible AI-powered FAQ guidance.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#forms" className="btn-primary justify-center">
              Request Support
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <button
              type="button"
              className="btn-secondary justify-center"
              onClick={openCareBot}
            >
              <Bot aria-hidden="true" className="size-4" />
              Ask CareBot
            </button>
          </div>

          <div className="mt-8 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-3">
            {["Simple forms", "Human follow-up", "FAQ assistance"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 aria-hidden="true" className="size-5 text-green-600" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:p-6">
            <div className="grid gap-4">
              <div className="rounded-lg border border-teal-100 bg-teal-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-800">
                      New request
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-slate-950">
                      Paediatric support
                    </h2>
                  </div>
                  <span className="rounded-md bg-white px-3 py-1 text-xs font-bold text-teal-800 shadow-sm">
                    CC-1106-4821
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <span className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                    WhatsApp follow-up
                  </span>
                  <span className="rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-900">
                    Priority Review
                  </span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Route aria-hidden="true" className="size-4 text-teal-700" />
                    Routing tag
                  </div>
                  <p className="mt-3 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                    Child Wellness Team
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <ClipboardList aria-hidden="true" className="size-4 text-teal-700" />
                    Generated summary
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Request organized for NGO review with selected support,
                    follow-up channel, team routing, and priority.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Request received", ShieldCheck],
                  ["Request organized", ClipboardList],
                  ["NGO follow-up", HeartHandshake],
                ].map(([label, Icon], index) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <span className="grid size-9 place-items-center rounded-md bg-white text-teal-700 shadow-sm">
                      <Icon aria-hidden="true" className="size-4" />
                    </span>
                    <p className="mt-3 text-sm font-bold text-slate-800">
                      {index + 1}. {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-lg bg-orange-200 px-4 py-3 text-sm font-bold text-slate-900 shadow-lg sm:block">
            Responsible AI FAQ guidance
          </div>
        </div>
      </div>
    </section>
  );
}
