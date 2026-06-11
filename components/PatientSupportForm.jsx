"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import {
  ageGroups,
  patientSupportSchema,
  preferredContactOptions,
  supportTypes,
} from "@/lib/validators";
import {
  CharacterCounter,
  CheckboxCard,
  FieldError,
  Honeypot,
} from "./FormParts";
import RequestSummary from "./RequestSummary";

const defaultValues = {
  website: "",
  fullName: "",
  ageGroup: "",
  contactNumber: "",
  email: "",
  city: "",
  supportTypes: [],
  description: "",
  preferredContact: "Phone",
  consent: false,
};

export default function PatientSupportForm({ onToast }) {
  const [success, setSuccess] = useState(null);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(patientSupportSchema),
    defaultValues,
  });

  const selectedSupport =
    useWatch({ control, name: "supportTypes" }) || [];
  const description = useWatch({ control, name: "description" }) || "";
  const preferredContact = useWatch({ control, name: "preferredContact" });

  function toggleSupport(type) {
    const next = selectedSupport.includes(type)
      ? selectedSupport.filter((item) => item !== type)
      : [...selectedSupport, type];

    setValue("supportTypes", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  async function onSubmit(values) {
    setFormError("");
    setSuccess(null);

    const response = await fetch("/api/patient-support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        result.error || "Unable to submit the support request. Please try again.";
      setFormError(message);
      onToast?.({
        type: "error",
        title: "Submission failed",
        message,
      });
      return;
    }

    if (result.data) {
      setSuccess(result.data);
      reset(defaultValues);
      onToast?.({
        type: "success",
        title: "Support request submitted",
        message: `Ticket ${result.data.ticketId} was generated for NGO review.`,
      });
    }
  }

  if (success) {
    return (
      <RequestSummary
        data={success}
        onReset={() => {
          setSuccess(null);
          setFormError("");
        }}
      />
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Honeypot register={register} />

      <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
        <div className="flex gap-3">
          <AlertTriangle
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-orange-700"
          />
          <p className="text-sm font-semibold leading-6 text-slate-800">
            Please submit only a brief non-emergency support request. Do not
            enter confidential medical records, diagnoses, prescriptions, or
            reports. CareConnect does not provide medical advice or emergency
            services.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="patient-full-name">
            Full name
          </label>
          <input
            id="patient-full-name"
            className="form-input"
            type="text"
            autoComplete="name"
            {...register("fullName")}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        <div>
          <label className="form-label" htmlFor="age-group">
            Age group
          </label>
          <select id="age-group" className="form-input" {...register("ageGroup")}>
            <option value="">Select age group</option>
            {ageGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <FieldError message={errors.ageGroup?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="contact-number">
            Contact number
          </label>
          <input
            id="contact-number"
            className="form-input"
            type="tel"
            autoComplete="tel"
            {...register("contactNumber")}
          />
          <FieldError message={errors.contactNumber?.message} />
        </div>

        <div>
          <label className="form-label" htmlFor="patient-email">
            Email optional
          </label>
          <input
            id="patient-email"
            className="form-input"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="patient-city">
          City or district
        </label>
        <input
          id="patient-city"
          className="form-input"
          type="text"
          autoComplete="address-level2"
          {...register("city")}
        />
        <FieldError message={errors.city?.message} />
      </div>

      <div>
        <p className="form-label">Support needed</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {supportTypes.map((type) => (
            <CheckboxCard
              key={type}
              label={type}
              checked={selectedSupport.includes(type)}
              onChange={() => toggleSupport(type)}
            />
          ))}
        </div>
        <FieldError message={errors.supportTypes?.message} />
      </div>

      <div>
        <label className="form-label" htmlFor="patient-description">
          Brief description
        </label>
        <textarea
          id="patient-description"
          className="form-input min-h-32 resize-y"
          maxLength={500}
          {...register("description")}
        />
        <CharacterCounter value={description} max={500} />
        <FieldError message={errors.description?.message} />
      </div>

      <div>
        <p className="form-label">Preferred contact</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {preferredContactOptions.map((option) => (
            <label
              key={option}
              className={`choice-card justify-center ${
                preferredContact === option ? "choice-card-active" : ""
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                value={option}
                {...register("preferredContact")}
              />
              {option}
            </label>
          ))}
        </div>
        <FieldError message={errors.preferredContact?.message} />
      </div>

      <label className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
          {...register("consent")}
        />
        <span>
          I consent to the NGO team reviewing this request and contacting me
          using the provided details.
        </span>
      </label>
      <FieldError message={errors.consent?.message} />

      {formError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          {formError}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
          <ShieldCheck aria-hidden="true" className="size-4 text-teal-700" />
          Stored only after server validation.
        </p>
        <button type="submit" className="btn-primary justify-center" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
          Submit Support Request
        </button>
      </div>
    </form>
  );
}
