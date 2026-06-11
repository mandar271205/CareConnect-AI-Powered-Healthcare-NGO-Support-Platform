# CareConnect — AI-Powered Healthcare NGO Support Platform

Live Demo: ADD_LIVE_LINK  
GitHub Repository: ADD_GITHUB_LINK

CareConnect is a lightweight healthcare NGO support platform for non-emergency patient requests, volunteer registrations, general enquiries, and FAQ guidance. It is built as an internship-ready prototype that demonstrates how a small digital workflow can help an NGO collect structured records and reduce repeated FAQ work before human follow-up.

## Assignment Requirements Covered

- Patient-support form
- Volunteer-registration form
- General-contact form
- NVIDIA-powered CareBot FAQ assistant
- Supabase PostgreSQL storage
- Automation concept with ticket IDs, summary, priority, and team routing
- GitHub-ready source code
- Vercel-ready deployment configuration

## Tech Stack

- Next.js App Router
- Tailwind CSS
- Supabase PostgreSQL
- NVIDIA hosted API
- `meta/llama-3.3-70b-instruct`
- React Hook Form
- Zod
- Lucide React
- Vercel

## AI Idea

CareBot uses NVIDIA's hosted Llama model through a server-side Next.js route at `/api/chat`. The browser never receives the NVIDIA API key. A strict CareConnect system prompt limits the chatbot to NGO service, registration, contact, privacy, workflow, and safety questions. Unknown NGO facts are redirected to the contact form, and medical-advice requests are rejected safely.

## Automation Idea

Patient requests are organized automatically before storage:

- Ticket generation in the `CC-DDMM-XXXX` format
- Keyword-based priority classification
- Suggested NGO team routing from support category
- Brief non-diagnostic request summary
- Emergency disclaimer for urgent keywords

## NGO Use-Case

CareConnect gives an NGO a central intake point for patient-support requests, volunteer interest, and public messages. Supabase keeps records structured for review, while CareBot handles common FAQ questions so staff can focus on human follow-up.

## Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NVIDIA_API_KEY=
NVIDIA_FALLBACK_API_KEY=
NVIDIA_MODEL=meta/llama-3.3-70b-instruct
NVIDIA_FALLBACK_MODEL=meta/llama-3.1-8b-instruct
NGO_CONTACT_EMAIL=
NGO_CONTACT_PHONE=
```

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are browser-safe only when Row Level Security policies are configured. `NVIDIA_API_KEY` and `NVIDIA_FALLBACK_API_KEY` must stay server-side and must never use a `NEXT_PUBLIC_` prefix.

## Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy the project URL and anonymous key.
5. Add those values to `.env.local`.
6. Create an NVIDIA API key.
7. Add the NVIDIA key to `.env.local`.
8. Start the project locally.

Anonymous visitors can insert records, but cannot read, update, or delete public submissions. For this core internship version, submissions can be reviewed securely from the Supabase dashboard.

## Local Development

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Vercel Deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add all environment variables from `.env.example`.
4. Deploy.
5. Test all three forms with Supabase configured.
6. Test CareBot with `NVIDIA_API_KEY` configured.
7. Paste the live URL into this README.

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

## Disclaimer

This is an educational concept prototype. It does not provide medical advice, diagnosis, treatment, or emergency services. Users should not submit confidential medical records.
