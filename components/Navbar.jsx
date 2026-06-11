import { HeartPulse, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { label: "Home",            href: "/" },
  { label: "Patient Support", href: "/patient-support" },
  { label: "Volunteer",       href: "/volunteer" },
  { label: "Contact",         href: "/contact" },
  { label: "FAQ",             href: "/#faq" },
];

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{
        background: "rgba(248,250,255,0.85)",
        borderColor: "rgba(13,148,136,0.15)",
        boxShadow: "0 1px 24px rgba(13,148,136,0.06)",
      }}
    >
      <nav className="section-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <a href="/" className="flex items-center gap-3 group">
          <span
            className="grid size-11 place-items-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
            style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
          >
            <HeartPulse aria-hidden="true" className="size-6" />
          </span>
          <span>
            <span className="block text-lg font-extrabold tracking-tight text-slate-900">
              CareConnect
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">
              Healthcare NGO Support
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-teal-50 hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            className="h-10 rounded-xl px-5 font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
          >
            <a href="/patient-support">
              <Sparkles className="size-4" />
              Request Support
            </a>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              className="rounded-xl border-teal-200 bg-white/80 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              <Menu className="size-5 text-teal-700" />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[86vw] p-0"
            style={{ background: "rgba(248,250,255,0.98)", backdropFilter: "blur(20px)" }}
          >
            <SheetHeader className="p-5">
              <div className="flex items-center gap-3">
                <span
                  className="grid size-10 place-items-center rounded-xl text-white"
                  style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
                >
                  <HeartPulse aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <SheetTitle className="text-lg font-extrabold">
                    CareConnect
                  </SheetTitle>
                  <SheetDescription className="text-teal-600">Healthcare NGO Support</SheetDescription>
                </div>
              </div>
            </SheetHeader>
            <Separator style={{ borderColor: "rgba(13,148,136,0.15)" }} />
            <div className="grid gap-1 p-4">
              {links.map((link) => (
                <SheetClose key={link.label} asChild>
                  <a
                    href={link.href}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-teal-50 hover:text-teal-700"
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
            </div>
            <div className="p-4">
              <SheetClose asChild>
                <Button
                  asChild
                  className="h-11 w-full rounded-xl font-bold"
                  style={{ background: "linear-gradient(135deg, #0d9488, #0891b2)" }}
                >
                  <a href="/patient-support">Request Support</a>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
