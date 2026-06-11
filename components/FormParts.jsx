import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return <p className="form-error">{message}</p>;
}

export function CharacterCounter({ value = "", max }) {
  return (
    <p className="mt-2 text-right text-xs font-semibold text-slate-500">
      {value.length}/{max}
    </p>
  );
}

export function Honeypot({ register }) {
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor="website">Website</label>
      <input
        id="website"
        tabIndex={-1}
        autoComplete="off"
        {...register("website")}
      />
    </div>
  );
}

export function CheckboxCard({ label, checked, onChange }) {
  return (
    <label
      className={cn("choice-card", checked && "choice-card-active")}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="border-slate-300 data-checked:border-primary data-checked:bg-primary"
      />
      <span>{label}</span>
    </label>
  );
}
