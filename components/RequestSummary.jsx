import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RequestSummary({ data, onReset }) {
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-green-600 text-white">
            <CheckCircle2 aria-hidden="true" className="size-6" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-green-700">
              Request submitted
            </p>
            <h3 className="mt-1 text-2xl font-bold text-slate-950">
              Ticket {data.ticketId}
            </h3>
          </div>
        </div>
        <span
          className={`inline-flex w-fit items-center rounded-md px-3 py-1 text-sm font-bold ${
            data.priority === "Urgent Review"
              ? "bg-red-100 text-red-700"
              : data.priority === "Priority Review"
                ? "bg-amber-100 text-amber-900"
                : "bg-teal-100 text-teal-800"
          }`}
        >
          {data.priority}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-green-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Route aria-hidden="true" className="size-4 text-teal-700" />
            Suggested team
          </div>
          <p className="mt-2 text-base font-semibold text-slate-700">
            {data.suggestedTeam}
          </p>
        </div>
        <div className="rounded-lg border border-green-200 bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <MessageCircle aria-hidden="true" className="size-4 text-teal-700" />
            Preferred follow-up
          </div>
          <p className="mt-2 text-base font-semibold text-slate-700">
            {data.preferredContact}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-green-200 bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <ClipboardCheck aria-hidden="true" className="size-4 text-teal-700" />
          Generated summary
        </div>
        <p className="mt-3 text-base leading-7 text-slate-700">
          {data.generatedSummary}
        </p>
      </div>

      {data.emergencyDisclaimer ? (
        <div className="mt-4 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm font-semibold leading-6">
            {data.emergencyDisclaimer}
          </p>
        </div>
      ) : (
        <p className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
          CareConnect does not provide medical advice or emergency services. An
          NGO team member can review this structured request and follow up.
        </p>
      )}

      <Button type="button" className="mt-6 h-11 rounded-lg font-bold" onClick={onReset}>
        Submit Another Request
      </Button>
    </div>
  );
}
