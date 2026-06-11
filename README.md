# CareConnect — AI-Powered Healthcare NGO Support Platform

> A concept prototype that makes it effortless for community members to reach healthcare NGOs — and for NGOs to receive structured, actionable intake data.

🌐 **Live:** [careconnect-ngo.vercel.app](https://careconnect-ngo.vercel.app)
💾 **Repo:** [github.com/mandar271205/CareConnect-AI-Powered-Healthcare-NGO-Support-Platform](https://github.com/mandar271205/CareConnect-AI-Powered-Healthcare-NGO-Support-Platform)

---

## 🏥 The NGO Use-Case

Healthcare NGOs often struggle with:
- Unstructured WhatsApp/phone requests that are hard to track
- Volunteers signing up with no organised onboarding flow
- No central intake system for community health support requests

**CareConnect** gives NGOs a clean digital front door:

| Who | What they can do |
|---|---|
| **Community member** | Submit a non-emergency support request (patient intake form) |
| **Volunteer** | Register interest in outreach, campaigns, and community programs |
| **Anyone** | Send a message / enquiry to the NGO team |
| **Anyone** | Ask CareBot — an AI assistant — common questions instantly |

Every submission is validated and stored in Supabase with a unique ticket ID, making follow-up easy for the NGO team. No phone tag, no lost WhatsApp messages.

---

## 🤖 The AI Idea — CareBot

The core AI feature is **CareBot**, a streaming chat assistant embedded on every page.

### How it works

```
User types question
       ↓
Next.js API route (/api/chat)
       ↓
NVIDIA LLM API (llama-3.1-nemotron-nano-8b-v1)  ← backend only
       ↓
Streamed token-by-token response back to browser
       ↓
User sees answer appear in real-time
```

- **Model:** `nvidia/llama-3.1-nemotron-nano-8b-v1` (primary, fast 8B model)
- **Fallback:** `meta/llama-3.1-8b-instruct` (if primary times out)
- **Streaming:** Real-time via `ReadableStream` — no waiting for the full response
- **Scoped system prompt:** CareBot only answers questions about CareConnect services, volunteering, privacy, and follow-up — it explicitly refuses medical advice

> The NVIDIA branding is intentionally kept **backend-only**. The frontend simply shows "CareBot" — a neutral, friendly AI assistant.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Styling** | Tailwind CSS v4 + shadcn/ui component library |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **AI / LLM** | NVIDIA NIM API — Llama 3.1 Nemotron Nano 8B |
| **Forms** | React Hook Form + Zod schema validation |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Icons** | Lucide React |

---

## 📄 Pages & Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — Hero, Services overview, How it works, About |
| `/patient-support` | Patient intake form |
| `/volunteer` | Volunteer registration form |
| `/contact` | General contact / enquiry form |
| `/api/patient-support` | POST — validates & stores patient request in Supabase |
| `/api/volunteer` | POST — validates & stores volunteer registration |
| `/api/contact` | POST — validates & stores contact message |
| `/api/chat` | POST — streams AI responses from NVIDIA LLM |

---

## 🚀 Running Locally

```bash
# 1. Clone
git clone https://github.com/mandar271205/CareConnect-AI-Powered-Healthcare-NGO-Support-Platform.git
cd CareConnect-AI-Powered-Healthcare-NGO-Support-Platform

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.example .env.local
# Fill in NVIDIA_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

```env
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# NVIDIA NIM API (backend only — never exposed to browser)
NVIDIA_API_KEY=your_nvidia_api_key
NVIDIA_MODEL=nvidia/llama-3.1-nemotron-nano-8b-v1

# Optional
NVIDIA_FALLBACK_API_KEY=your_fallback_key
NVIDIA_FALLBACK_MODEL=meta/llama-3.1-8b-instruct
NVIDIA_PRIMARY_TIMEOUT_MS=8000
NVIDIA_FALLBACK_TIMEOUT_MS=15000
```

> ⚠️ **Never use `NEXT_PUBLIC_` prefix for any API keys.** All secrets are server-side only.

---

## ⚠️ Disclaimer

CareConnect is a **concept prototype** built to demonstrate how AI can help healthcare NGOs manage community intake. It is **not** a medical service, does not provide medical advice, and should not be used in place of emergency services.

---

## 👤 Author

Built by **Mandar Sawant** · [GitHub](https://github.com/mandar271205)
