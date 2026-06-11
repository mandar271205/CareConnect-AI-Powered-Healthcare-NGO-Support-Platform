import { HeartPulse } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["Patient Support", "#forms"],
  ["Volunteer", "#forms"],
  ["Contact", "#forms"],
  ["FAQ", "#faq"],
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-10 text-white">
      <div className="section-shell flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-teal-600 text-white">
            <HeartPulse aria-hidden="true" className="size-6" />
          </span>
          <div>
            <p className="text-lg font-bold">CareConnect</p>
            <p className="text-sm text-slate-300">
              Concept prototype for NGO healthcare support. Not a medical-advice
              or emergency service.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-300">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="section-shell mt-7 text-sm text-slate-400">
        © 2026 CareConnect
      </div>
    </footer>
  );
}
