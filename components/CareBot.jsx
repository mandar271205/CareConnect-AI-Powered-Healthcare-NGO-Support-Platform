"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Loader2,
  MessageCircle,
  Minimize2,
  Send,
  X,
} from "lucide-react";

const welcomeMessage = {
  role: "assistant",
  content:
    "Hello! I am CareBot, the CareConnect FAQ assistant. I can answer common questions about NGO services, registration, volunteering, privacy, and follow-up. How can I help?",
};

const suggestedQuestions = [
  "What support is available?",
  "How do I register for support?",
  "How can I volunteer?",
  "Is the service free?",
  "What details should I submit?",
  "Is my information private?",
  "How will the NGO contact me?",
  "Is this an emergency service?",
];

const failureMessage =
  "CareBot is temporarily unavailable. Please use the contact form so the NGO team can assist you.";

export default function CareBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
      setMinimized(false);
    }

    window.addEventListener("carebot:open", handleOpen);
    return () => window.removeEventListener("carebot:open", handleOpen);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function sendQuestion(questionText = input) {
    const question = questionText.trim();

    if (!question || loading) {
      return;
    }

    setError("");
    setInput("");
    const userMessage = { role: "user", content: question };
    const history = messages.slice(-5).map(({ role, content }) => ({
      role,
      content,
    }));
    setMessages((current) => [...current, userMessage]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || failureMessage);
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: result.answer || failureMessage },
      ]);
    } catch (requestError) {
      const message = requestError.message || failureMessage;
      setError(message);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: failureMessage },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!open || minimized) {
    return (
      <button
        id="faq"
        type="button"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
        onClick={() => {
          setOpen(true);
          setMinimized(false);
        }}
      >
        <MessageCircle aria-hidden="true" className="size-5" />
        CareBot
      </button>
    );
  }

  return (
    <aside
      id="faq"
      className="fixed bottom-3 left-3 right-3 z-50 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl sm:bottom-5 sm:left-auto sm:right-5 sm:w-[390px]"
      aria-label="CareBot AI FAQ Assistant"
    >
      <div className="flex items-center justify-between gap-3 bg-teal-800 px-4 py-3 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative grid size-10 shrink-0 place-items-center rounded-lg bg-white/15">
            <Bot aria-hidden="true" className="size-5" />
            <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-teal-800 bg-green-400" />
          </span>
          <div className="min-w-0">
            <h2 className="text-sm font-bold">CareBot</h2>
            <p className="text-xs font-semibold text-teal-100">
              AI FAQ Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="grid size-9 place-items-center rounded-md text-teal-50 transition hover:bg-white/10"
            aria-label="Minimize CareBot"
            onClick={() => setMinimized(true)}
          >
            <Minimize2 aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-md text-teal-50 transition hover:bg-white/10"
            aria-label="Close CareBot"
            onClick={() => {
              setOpen(false);
              setMinimized(false);
            }}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[52svh] space-y-3 overflow-y-auto bg-slate-50 p-4 sm:max-h-[430px]">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <p
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-6 ${
                message.role === "user"
                  ? "bg-teal-700 text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}

        {loading ? (
          <div className="flex justify-start" aria-live="polite">
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600">
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              CareBot is typing
            </div>
          </div>
        ) : null}

        <div ref={endRef} />
      </div>

      <div className="border-t border-slate-200 bg-white p-4">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              className="shrink-0 rounded-md border border-teal-200 bg-teal-50 px-3 py-2 text-xs font-bold text-teal-800 transition hover:bg-teal-100 disabled:opacity-60"
              onClick={() => sendQuestion(question)}
              disabled={loading}
            >
              {question}
            </button>
          ))}
        </div>

        {error ? (
          <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
            {error}
          </p>
        ) : null}

        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            sendQuestion();
          }}
        >
          <input
            className="form-input h-11"
            type="text"
            value={input}
            maxLength={300}
            placeholder="Ask about CareConnect"
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            type="submit"
            className="grid h-11 w-12 shrink-0 place-items-center rounded-md bg-teal-700 text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading || !input.trim()}
            aria-label="Send question"
          >
            {loading ? (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <Send aria-hidden="true" className="size-4" />
            )}
          </button>
        </form>
      </div>
    </aside>
  );
}
