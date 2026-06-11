import { z } from "zod";

export const ageGroups = [
  "Under 18",
  "18-30",
  "31-50",
  "51-65",
  "Above 65",
  "Prefer not to say",
];

export const supportTypes = [
  "General healthcare support",
  "Maternal support",
  "Paediatric support",
  "Dental support",
  "Mental-health support",
  "Other",
];

export const preferredContactOptions = ["Phone", "WhatsApp", "Email"];

export const qualificationOptions = [
  "Doctor",
  "Dentist",
  "Pharmacist",
  "Nurse",
  "Student",
  "Community Volunteer",
  "Other",
];

export const expertiseOptions = [
  "Community outreach",
  "Health awareness",
  "Dental camps",
  "Maternal care",
  "Child wellness",
  "Mental-health support",
  "Logistics",
  "Documentation",
];

export const availableDayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const contactSubjectOptions = [
  "General enquiry",
  "Feedback",
  "Partnership",
  "Media",
  "Donation enquiry",
  "Other",
];

const requiredText = (label, max = 120) =>
  z
    .string()
    .trim()
    .min(2, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const optionalEmail = z
  .union([z.literal(""), z.string().email("Enter a valid email address.")])
  .optional()
  .transform((value) => value || "");

const optionalLimitedText = (max) =>
  z
    .string()
    .trim()
    .max(max, `Use ${max} characters or fewer.`)
    .optional()
    .default("");

const consent = z
  .boolean()
  .refine(Boolean, "Please confirm consent before submitting.");

export const patientSupportSchema = z.object({
  website: z.string().optional().default(""),
  fullName: requiredText("Full name"),
  ageGroup: z.enum(ageGroups),
  contactNumber: z
    .string()
    .trim()
    .min(7, "Enter a valid contact number.")
    .max(20, "Contact number must be 20 characters or fewer."),
  email: optionalEmail,
  city: requiredText("City or district"),
  supportTypes: z
    .array(z.enum(supportTypes))
    .min(1, "Select at least one support type."),
  description: optionalLimitedText(500),
  preferredContact: z.enum(preferredContactOptions),
  consent,
});

export const volunteerSchema = z.object({
  website: z.string().optional().default(""),
  fullName: requiredText("Full name"),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number must be 20 characters or fewer."),
  qualification: z.enum(qualificationOptions),
  expertise: z
    .array(z.enum(expertiseOptions))
    .min(1, "Select at least one expertise area."),
  experienceYears: z.preprocess(
    (value) => {
      if (value === "" || value === null || Number.isNaN(value)) {
        return undefined;
      }
      return Number(value);
    },
    z
      .number()
      .int("Years of experience must be a whole number.")
      .min(0, "Years of experience cannot be negative.")
      .max(60, "Please enter a realistic experience value.")
      .optional(),
  ),
  availableDays: z
    .array(z.enum(availableDayOptions))
    .min(1, "Select at least one available day."),
  city: requiredText("City or district"),
  motivation: optionalLimitedText(300),
  consent,
});

export const contactSchema = z.object({
  website: z.string().optional().default(""),
  name: requiredText("Name"),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.enum(contactSubjectOptions),
  message: requiredText("Message", 1000),
  consent,
});

export const chatRequestSchema = z.object({
  question: z
    .string()
    .trim()
    .min(2, "Ask a short question.")
    .max(300, "Questions must be 300 characters or fewer."),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().max(1200),
      }),
    )
    .max(5)
    .optional()
    .default([]),
});

export function zodFieldErrors(error) {
  return error.issues.reduce((fields, issue) => {
    const key = issue.path.join(".");
    if (key && !fields[key]) {
      fields[key] = issue.message;
    }
    return fields;
  }, {});
}
