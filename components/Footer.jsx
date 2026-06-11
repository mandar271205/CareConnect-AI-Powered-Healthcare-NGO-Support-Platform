import { HeartPulse, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Patient Support", "#forms"],
  ["Volunteer", "#forms"],
  ["Contact", "#forms"],
  ["FAQ", "#faq"],
];

const info = [
  { icon: Mail, text: "support@careconnect.org" },
  { icon: Phone, text: "+91 98765 43210" },
  { icon: MapPin, text: "Community Health Center, India" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-16 pb-10 text-white"
      style={{
        background: "linear-gradient(135deg, #0f2027 0%, #0d3b38 50%, #0a1628 100%)",
      }}
    >
      {/* Decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, rgba(13,148,136,0.1) 0%, transparent 50%)",
        }}
      />

      <div className="section-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span
                className="grid size-12 place-items-center rounded-2xl text-white shadow-lg"
                style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
              >
                <HeartPulse aria-hidden="true" className="size-6" />
              </span>
              <div>
                <p className="text-xl font-extrabold">CareConnect</p>
                <p className="text-sm text-teal-300">Healthcare NGO Support</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              A concept prototype demonstrating how NGOs can connect with
              communities through simple, accessible digital workflows.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              {info.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-400">
                  <Icon className="size-4 shrink-0 text-teal-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
              Navigation
            </p>
            <div className="grid gap-2">
              {links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition-all duration-200 hover:translate-x-0.5 hover:text-teal-300"
                >
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-teal-400">
              Get Help
            </p>
            <p className="text-sm leading-7 text-slate-400">
              Need healthcare NGO support? Fill out our simple form and a team member will follow up with you.
            </p>
            <a
              href="#forms"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
            >
              Request Support
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-sm text-slate-500">
            © 2026 CareConnect — Concept prototype. Not a medical service.
          </p>
          <div className="flex gap-5">
            <span className="text-sm text-slate-500">Privacy First</span>
            <span className="text-sm text-slate-500">AI Powered</span>
            <span className="text-sm text-slate-500">Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
