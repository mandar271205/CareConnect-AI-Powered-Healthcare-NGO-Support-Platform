"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import {
  availableDayOptions,
  expertiseOptions,
  qualificationOptions,
  volunteerSchema,
} from "@/lib/validators";
import {
  CharacterCounter,
  CheckboxCard,
  FieldError,
  Honeypot,
} from "./FormParts";

const defaultValues = {
  website: "",
  fullName: "",
  email: "",
  phone: "",
  qualification: "",
  expertise: [],
  experienceYears: "",
  availableDays: [],
  city: "",
  motivation: "",
  consent: false,
};

export default function VolunteerForm({ onToast }) {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(volunteerSchema),
    defaultValues,
  });

  const selectedExpertise = useWatch({ control, name: "expertise" }) || [];
  const selectedDays = useWatch({ control, name: "availableDays" }) || [];
  const motivation = useWatch({ control, name: "motivation" }) || "";

  function toggleArray(field, selected, value) {
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setValue(field, next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  async function onSubmit(values) {
    setFormError("");
    setSuccess(false);

    const response = await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        result.error || "Unable to submit the volunteer registration.";
      setFormError(message);
      onToast?.({
        type: "error",
        title: "Registration failed",
        message,
      });
      return;
    }

    setSuccess(true);
    reset(defaultValues);
    onToast?.({
      type: "success",
      title: "Volunteer registration submitted",
      message: "The NGO team can now review your volunteer details.",
    });
  }

  if (success) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <div className="flex gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-green-600 text-white">
            <CheckCircle2 aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h3 className="text-2xl font-bold text-slate-950">
              Volunteer interest received
            </h3>
            <p className="mt-2 text-base leading-7 text-slate-700">
              Thank you for registering your interest. The NGO team can now
              review your volunteer submission and contact you using your
              preferred details.
            </p>
            <button
              type="button"
              className="btn-primary mt-6"
              onClick={() => setSuccess(false)}
            >
              Submit Another Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Honeypot register={register} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="volunteer-name">
            Full name
          </label>
          <input
            id="volunteer-name"
            className="form-input"
            type="text"
            autoComplete="name"
            {...register("fullName")}
          />
          <FieldError message={errors.fullName?.message} />
        </div>
        <div>
          <label className="form-label" htmlFor="volunteer-email">
            Email
          </label>
          <input
            id="volunteer-email"
            className="form-input"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="volunteer-phone">
            Phone
          </label>
          <input
            id="volunteer-phone"
            className="form-input"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <label className="form-label" htmlFor="qualification">
            Qualification
          </label>
          <select
            id="qualification"
            className="form-input"
            {...register("qualification")}
          >
            <option value="">Select qualification</option>
            {qualificationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError message={errors.qualification?.message} />
        </div>
      </div>

      <div>
        <p className="form-label">Expertise</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {expertiseOptions.map((option) => (
            <CheckboxCard
              key={option}
              label={option}
              checked={selectedExpertise.includes(option)}
              onChange={() => toggleArray("expertise", selectedExpertise, option)}
            />
          ))}
        </div>
        <FieldError message={errors.expertise?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="experience-years">
            Years of experience optional
          </label>
          <input
            id="experience-years"
            className="form-input"
            type="number"
            min="0"
            max="60"
            {...register("experienceYears")}
          />
          <FieldError message={errors.experienceYears?.message} />
        </div>
        <div>
          <label className="form-label" htmlFor="volunteer-city">
            City or district
          </label>
          <input
            id="volunteer-city"
            className="form-input"
            type="text"
            autoComplete="address-level2"
            {...register("city")}
          />
          <FieldError message={errors.city?.message} />
        </div>
      </div>

      <div>
        <p className="form-label">Available days</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {availableDayOptions.map((day) => (
            <CheckboxCard
              key={day}
              label={day}
              checked={selectedDays.includes(day)}
              onChange={() => toggleArray("availableDays", selectedDays, day)}
            />
          ))}
        </div>
        <FieldError message={errors.availableDays?.message} />
      </div>

      <div>
        <label className="form-label" htmlFor="motivation">
          Motivation
        </label>
        <textarea
          id="motivation"
          className="form-input min-h-28 resize-y"
          maxLength={300}
          {...register("motivation")}
        />
        <CharacterCounter value={motivation} max={300} />
        <FieldError message={errors.motivation?.message} />
      </div>

      <label className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
          {...register("consent")}
        />
        <span>
          I consent to the NGO team reviewing this volunteer registration and
          contacting me using the provided details.
        </span>
      </label>
      <FieldError message={errors.consent?.message} />

      {formError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {formError}
        </div>
      ) : null}

      <button type="submit" className="btn-primary justify-center sm:ml-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        Register as Volunteer
      </button>
    </form>
  );
}
