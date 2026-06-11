"use client";

import { useState } from "react";
import { HeartPulse, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Patient Support", href: "#forms" },
  { label: "Volunteer", href: "#forms" },
  { label: "Contact", href: "#forms" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-teal-700 text-white shadow-sm">
            <HeartPulse aria-hidden="true" className="size-6" />
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-slate-900">
              CareConnect
            </span>
            <span className="block text-xs font-medium uppercase tracking-[0.14em] text-teal-700">
              Healthcare NGO Support
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#forms" className="btn-primary">
            Request Support
          </a>
        </div>

        <button
          type="button"
          className="inline-grid size-11 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:border-teal-300 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="section-shell grid gap-2 py-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-teal-50 hover:text-teal-800"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#forms"
              className="btn-primary mt-2 justify-center"
              onClick={() => setOpen(false)}
            >
              Request Support
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
