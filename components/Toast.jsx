"use client";

import { AlertCircle, CheckCircle2, X } from "lucide-react";

export default function Toast({ toast, onDismiss }) {
  if (!toast) {
    return null;
  }

  const Icon = toast.type === "error" ? AlertCircle : CheckCircle2;

  return (
    <div className="fixed right-4 top-20 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
      <div className="flex gap-3">
        <Icon
          aria-hidden="true"
          className={`mt-0.5 size-5 ${
            toast.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-950">{toast.title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{toast.message}</p>
        </div>
        <button
          type="button"
          className="grid size-8 shrink-0 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Dismiss notification"
          onClick={onDismiss}
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    </div>
  );
}
