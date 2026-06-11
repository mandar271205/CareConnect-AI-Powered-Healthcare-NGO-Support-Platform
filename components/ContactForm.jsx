"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });
  const message = useWatch({ control, name: "message" }) || "";
  const consentValue = useWatch({ control, name: "consent" }) || false;

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
            <Button
              type="button"
              className="mt-6 h-11 rounded-lg font-bold"
              onClick={() => setSuccess(false)}
            >
              Send Another Message
            </Button>
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
          <Label className="form-label" htmlFor="contact-name">
            Name
          </Label>
          <Input
            id="contact-name"
            className="form-input"
            type="text"
            autoComplete="name"
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label className="form-label" htmlFor="contact-email">
            Email
          </Label>
          <Input
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
        <Label className="form-label" htmlFor="contact-subject">
          Subject
        </Label>
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
        <Label className="form-label" htmlFor="contact-message">
          Message
        </Label>
        <Textarea
          id="contact-message"
          className="form-input min-h-36 resize-y"
          maxLength={1000}
          {...register("message")}
        />
        <CharacterCounter value={message} max={1000} />
        <FieldError message={errors.message?.message} />
      </div>

      <label className="flex gap-3 rounded-lg border border-border bg-muted/50 p-4 text-sm font-semibold leading-6 text-slate-700">
        <Checkbox
          checked={consentValue}
          onCheckedChange={(value) =>
            setValue("consent", Boolean(value), {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
          className="mt-1 border-slate-300 data-checked:border-primary data-checked:bg-primary"
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

      <Button type="submit" className="h-11 justify-center rounded-lg font-bold sm:ml-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        Send Message
      </Button>
    </form>
  );
}
