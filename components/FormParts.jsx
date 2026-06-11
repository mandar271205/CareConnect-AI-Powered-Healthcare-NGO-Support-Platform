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
      className={`choice-card ${checked ? "choice-card-active" : ""}`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span className="grid size-5 shrink-0 place-items-center rounded border border-slate-300 bg-white">
        {checked ? (
          <span className="size-2.5 rounded-sm bg-teal-700" aria-hidden="true" />
        ) : null}
      </span>
      <span>{label}</span>
    </label>
  );
}
