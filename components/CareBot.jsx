"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Loader2,
  MessageCircle,
  Minimize2,
  Send,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const welcomeMessage = {
  role: "assistant",
  content:
    "Hello! I'm **CareBot**, your AI assistant. I can answer questions about CareConnect services, registration, volunteering, privacy, and follow-up. How can I help you today?",
};

const suggestedQuestions = [
  "What support is available?",
  "How do I register?",
  "How can I volunteer?",
  "Is the service free?",
  "Is my info private?",
  "How will you contact me?",
];

const failureMessage =
  "CareBot is temporarily unavailable. Please use the contact form so the NGO team can assist you.";

async function readStreamingAnswer(response, onProgress) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let answer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    answer += decoder.decode(value, { stream: true });
    onProgress(answer);
  }

  const finalChunk = decoder.decode();
  if (finalChunk) {
    answer += finalChunk;
    onProgress(answer);
  }

  return answer.trim();
}

/** Simple markdown-to-JSX renderer for bold (**text**) */
function renderContent(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3 text-sm font-semibold text-slate-600"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(13,148,136,0.15)",
          boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
        }}
      >
        <Zap className="size-3.5 text-teal-500 animate-pulse" />
        <span className="text-xs text-teal-600 font-bold">CareBot is thinking…</span>
        <div className="flex gap-1 ml-1">
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-teal-400" />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-teal-400" />
          <span className="typing-dot h-1.5 w-1.5 rounded-full bg-teal-400" />
        </div>
      </div>
    </div>
  );
}

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
    if (!question || loading) return;

    setError("");
    setInput("");
    const userMessage = { role: "user", content: question };
    const assistantIndex = messages.length + 1;
    const history = messages.slice(-5).map(({ role, content }) => ({
      role,
      content,
    }));

    setMessages((current) => [
      ...current,
      userMessage,
      { role: "assistant", content: "" },
    ]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || failureMessage);
      }

      if (!response.body) {
        const answer = await response.text();
        setMessages((current) =>
          current.map((message, index) =>
            index === assistantIndex
              ? { ...message, content: answer || failureMessage }
              : message,
          ),
        );
        return;
      }

      const answer = await readStreamingAnswer(response, (partialAnswer) => {
        setMessages((current) =>
          current.map((message, index) =>
            index === assistantIndex
              ? { ...message, content: partialAnswer }
              : message,
          ),
        );
      });

      setMessages((current) =>
        current.map((message, index) =>
          index === assistantIndex
            ? { ...message, content: answer.trim() || failureMessage }
            : message,
        ),
      );
    } catch (requestError) {
      const message = requestError.message || failureMessage;
      setError(message);
      setMessages((current) =>
        current.map((item, index) =>
          index === assistantIndex ? { ...item, content: failureMessage } : item,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  if (!open || minimized) {
    return (
      <button
        id="faq"
        type="button"
        onClick={() => {
          setOpen(true);
          setMinimized(false);
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl px-5 py-3.5 text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
        style={{
          background: "linear-gradient(135deg, #0d9488, #0891b2)",
          boxShadow: "0 8px 32px rgba(13,148,136,0.4), 0 2px 8px rgba(13,148,136,0.2)",
        }}
        aria-label="Open CareBot"
      >
        {/* Pulse ring */}
        <span className="relative flex h-5 w-5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
          <MessageCircle className="relative size-5" aria-hidden="true" />
        </span>
        CareBot
        <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-bold">AI</span>
      </button>
    );
  }

  return (
    <aside
      id="faq"
      className="fixed bottom-4 left-3 right-3 z-50 overflow-hidden rounded-3xl shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-[420px]"
      style={{
        border: "1px solid rgba(13,148,136,0.2)",
        boxShadow: "0 32px 80px rgba(15,23,42,0.2), 0 8px 32px rgba(13,148,136,0.15)",
      }}
      aria-label="CareBot AI FAQ Assistant"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between gap-3 px-5 py-4"
        style={{ background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)" }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative">
            <span className="grid size-11 place-items-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Bot aria-hidden="true" className="size-6 text-white" />
            </span>
            <span
              className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-teal-600 bg-emerald-400"
              aria-label="Online"
            >
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white opacity-75" />
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-extrabold text-white">CareBot</h2>
            <div className="flex items-center gap-1.5">
              <Zap className="size-3 text-yellow-300" aria-hidden="true" />
              <p className="text-xs font-semibold text-teal-100">
                AI Assistant • Live
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="grid size-8 place-items-center rounded-xl text-white/70 transition-all duration-200 hover:bg-white/15 hover:text-white"
            aria-label="Minimize CareBot"
            onClick={() => setMinimized(true)}
          >
            <Minimize2 aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-xl text-white/70 transition-all duration-200 hover:bg-white/15 hover:text-white"
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

      {/* Messages area */}
      <ScrollArea
        className="h-[50svh] sm:h-[400px]"
        style={{ background: "#f8faff" }}
      >
        <div className="space-y-3 p-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <span className="mr-2 mt-1 flex size-7 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                  <Bot className="size-4 text-teal-600" aria-hidden="true" />
                </span>
              )}
              <p
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${
                  message.role === "user"
                    ? "rounded-tr-sm font-medium text-white"
                    : "rounded-tl-sm text-slate-700"
                }`}
                style={
                  message.role === "user"
                    ? {
                        background:
                          "linear-gradient(135deg, #0d9488, #0891b2)",
                        boxShadow: "0 4px 12px rgba(13,148,136,0.25)",
                      }
                    : {
                        background: "rgba(255,255,255,0.9)",
                        border: "1px solid rgba(13,148,136,0.12)",
                        boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
                      }
                }
              >
                {message.content
                  ? renderContent(message.content)
                  : loading && index === messages.length - 1
                  ? null
                  : ""}
              </p>
            </div>
          ))}

          {loading && <TypingIndicator />}
          <div ref={endRef} />
        </div>
      </ScrollArea>

      {/* Bottom controls */}
      <div
        className="border-t px-4 pt-3 pb-4"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "rgba(13,148,136,0.12)",
        }}
      >
        {/* AI disclaimer */}
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="size-3.5 text-teal-500" />
          <span className="text-xs font-bold text-teal-600">
            AI-powered responses — no pre-set answers
          </span>
        </div>

        {/* Suggested questions */}
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              className="shrink-0 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm disabled:opacity-50"
              style={{
                borderColor: "rgba(13,148,136,0.2)",
                color: "#0d9488",
                background: "rgba(13,148,136,0.05)",
              }}
              onClick={() => sendQuestion(question)}
              disabled={loading}
            >
              {question}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="mb-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
            {error}
          </p>
        )}

        {/* Input form */}
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            sendQuestion();
          }}
        >
          <Input
            className="h-11 flex-1 rounded-xl border px-4 text-sm focus:ring-2"
            style={{ borderColor: "rgba(13,148,136,0.2)", outlineColor: "#0d9488" }}
            type="text"
            value={input}
            maxLength={300}
            placeholder="Ask about CareConnect…"
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            type="submit"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50"
            style={{
              background: loading || !input.trim()
                ? "rgba(13,148,136,0.4)"
                : "linear-gradient(135deg, #0d9488, #0891b2)",
            }}
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
