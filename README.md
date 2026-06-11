# CareConnect

## AI-Powered Healthcare NGO Support Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![NVIDIA](https://img.shields.io/badge/NVIDIA-Llama_API-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://build.nvidia.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

CareConnect is a polished healthcare NGO support prototype for collecting non-emergency patient requests, volunteer registrations, public enquiries, and FAQ questions through a responsible AI assistant.

It is designed for internship submission, GitHub presentation, Vercel deployment, and portfolio demonstration.

Live Demo: `ADD_LIVE_LINK`  
GitHub Repository: [CareConnect-AI-Powered-Healthcare-NGO-Support-Platform](https://github.com/mandar271205/CareConnect-AI-Powered-Healthcare-NGO-Support-Platform)

---

## Highlights

| Area | What CareConnect Does |
| --- | --- |
| Patient Support | Collects brief non-emergency support requests |
| Volunteer Intake | Registers healthcare/community volunteers |
| Contact Workflow | Captures enquiries, feedback, partnerships, and donation messages |
| AI FAQ Assistant | Uses NVIDIA-hosted Llama through a server-only API route |
| Automation | Generates ticket IDs, summaries, priority labels, and team routing |
| Security | Keeps API keys server-side and stores submissions with Supabase RLS |

---

## Assignment Requirements Covered

- Responsive landing page
- Patient-support form
- Volunteer-registration form
- General-contact form
- Supabase PostgreSQL storage
- NVIDIA-powered CareBot FAQ assistant
- Server-side chatbot API route
- NGO-specific knowledge base and safety rules
- Form validation, loading states, errors, success cards, and toast notifications
- Ticket ID generation
- Priority classification
- Suggested team routing
- Deployment-ready README and environment setup
- Passing production build

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js App Router |
| UI | React, Tailwind CSS, Lucide React |
| Forms | React Hook Form |
| Validation | Zod |
| Database | Supabase PostgreSQL |
| AI Provider | NVIDIA Hosted API |
| Primary Model | `meta/llama-3.3-70b-instruct` |
| Fallback Model | `meta/llama-3.1-8b-instruct` |
| Hosting | Vercel |

---

## How It Works

```text
Visitor submits form
→ client-side validation
→ server-side Next.js API route
→ Zod validation
→ Supabase insert with RLS
→ confirmation UI
```

```text
Visitor asks CareBot
→ /api/chat
→ strict NGO FAQ system prompt
→ NVIDIA hosted model
→ safe concise answer
```

```text
Patient request
→ ticket ID
→ priority classification
→ suggested NGO team
→ generated summary
→ Supabase record
```

---

## AI Idea

CareBot is a responsible FAQ assistant for a healthcare NGO support workflow. It answers questions about services, registration, volunteering, privacy, and follow-up expectations.

The NVIDIA API call runs only in `app/api/chat/route.js`. The browser never receives the NVIDIA key.

CareBot is instructed to avoid:

- diagnosis
- treatment advice
- medicine or dosage suggestions
- report interpretation
- unsupported NGO facts
- emergency-service claims

For unknown NGO details, CareBot redirects the visitor to the contact form.

---

## Automation Idea

CareConnect automatically organizes patient support submissions:

- Ticket format: `CC-DDMM-XXXX`
- Suggested team from selected support category
- Keyword-based priority review
- Brief non-diagnostic summary
- Emergency disclaimer for urgent keywords

Example:

```text
Support type: Paediatric support
Description: I need support information for my child.

Suggested team: Child Wellness Team
Priority: Priority Review
```

---

## Security Notes

All real secrets belong in `.env.local` locally and Vercel Environment Variables in production.

The project does not expose database keys or AI keys in frontend code. Supabase is called from server API routes only.

Important rules:

- Do not commit `.env.local`
- Do not put `NVIDIA_API_KEY` in frontend code
- Do not put Supabase `service_role` in this app
- Do not prefix private keys with `NEXT_PUBLIC_`
- Use Supabase Row Level Security
- Rotate keys if they were pasted into chats, screenshots, or public places

---

## Environment Variables

Create `.env.local`:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
NVIDIA_API_KEY=
NVIDIA_FALLBACK_API_KEY=
NVIDIA_MODEL=meta/llama-3.3-70b-instruct
NVIDIA_FALLBACK_MODEL=meta/llama-3.1-8b-instruct
NVIDIA_PRIMARY_TIMEOUT_MS=12000
NVIDIA_FALLBACK_TIMEOUT_MS=25000
NGO_CONTACT_EMAIL=
NGO_CONTACT_PHONE=
```

`SUPABASE_ANON_KEY` is used only from server-side API routes in this project. The Supabase `service_role` key is intentionally not required.

---

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy the project URL.
5. Copy the anonymous public key.
6. Add both to `.env.local`.
7. Keep Row Level Security enabled.

The included SQL allows anonymous inserts only. Anonymous visitors cannot read, update, or delete records.

---

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

```bash
npm run build
```

---

## Vercel Deployment

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add all `.env.example` variables in Vercel.
4. Deploy.
5. Test the three forms.
6. Test CareBot.
7. Add the live URL above.

---

## Project Structure

```text
app/
  api/
    chat/route.js
    contact/route.js
    patient-support/route.js
    volunteer/route.js
  globals.css
  layout.js
  page.js
components/
  CareBot.jsx
  ContactForm.jsx
  FormTabs.jsx
  Hero.jsx
  Navbar.jsx
  PatientSupportForm.jsx
  VolunteerForm.jsx
lib/
  careBotKnowledge.js
  requestAutomation.js
  supabaseServer.js
  ticketGenerator.js
  validators.js
supabase/
  schema.sql
```

---

## Disclaimer

This is an educational concept prototype. It does not provide medical advice, diagnosis, treatment, or emergency services. Users should not submit confidential medical records, prescriptions, reports, or emergency medical information.
