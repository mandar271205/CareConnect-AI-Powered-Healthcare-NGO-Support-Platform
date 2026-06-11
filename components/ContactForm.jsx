"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { contactSchema, contactSubjectOptions } from "@/lib/validators";
import { CharacterCounter, FieldError, Honeypot } from "./FormParts";

const defaultValues = {
  website: "",
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

export default function ContactForm({ onToast }) {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });
  const message = useWatch({ control, name: "message" }) || "";

  async function onSubmit(values) {
    setFormError("");
    setSuccess(false);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = result.error || "Unable to submit your message.";
      setFormError(errorMessage);
      onToast?.({
        type: "error",
        title: "Message failed",
        message: errorMessage,
      });
      return;
    }

    setSuccess(true);
    reset(defaultValues);
    onToast?.({
      type: "success",
      title: "Message submitted",
      message: "The NGO team can now review your enquiry.",
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
              Message received
            </h3>
            <p className="mt-2 text-base leading-7 text-slate-700">
              Your message has been submitted successfully. The NGO team can now
              review your enquiry.
            </p>
            <button
              type="button"
              className="btn-primary mt-6"
              onClick={() => setSuccess(false)}
            >
              Send Another Message
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
          <label className="form-label" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            className="form-input"
            type="text"
            autoComplete="name"
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label className="form-label" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            className="form-input"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <label className="form-label" htmlFor="contact-subject">
          Subject
        </label>
        <select
          id="contact-subject"
          className="form-input"
          {...register("subject")}
        >
          <option value="">Select subject</option>
          {contactSubjectOptions.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <FieldError message={errors.subject?.message} />
      </div>

      <div>
        <label className="form-label" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          className="form-input min-h-36 resize-y"
          maxLength={1000}
          {...register("message")}
        />
        <CharacterCounter value={message} max={1000} />
        <FieldError message={errors.message?.message} />
      </div>

      <label className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded border-slate-300 text-teal-700 focus:ring-teal-700"
          {...register("consent")}
        />
        <span>
          I consent to the NGO team reviewing this enquiry and contacting me
          using the provided details.
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
        Send Message
      </button>
    </form>
  );
}
