import OpenAI from "openai";
import { NextResponse } from "next/server";
import { chatRequestSchema, zodFieldErrors } from "@/lib/validators";
import {
  careBotSystemPrompt,
  getCareBotSafetyResponse,
} from "@/lib/careBotKnowledge";

const openAIClients = new Map();

function getOpenAIClient(apiKey = process.env.NVIDIA_API_KEY) {
  if (!apiKey) {
    throw new Error("Missing NVIDIA_API_KEY.");
  }

  if (!openAIClients.has(apiKey)) {
    openAIClients.set(
      apiKey,
      new OpenAI({
        apiKey,
        baseURL: "https://integrate.api.nvidia.com/v1",
      }),
    );
  }

  return openAIClients.get(apiKey);
}

async function streamWith({ apiKey, model, messages }) {
  const client = getOpenAIClient(apiKey);
  // Reduced timeouts for faster UX — fast model first, then fallback
  const timeout =
    model === (process.env.NVIDIA_MODEL || "nvidia/llama-3.1-nemotron-nano-8b-v1")
      ? Number(process.env.NVIDIA_PRIMARY_TIMEOUT_MS || 8000)
      : Number(process.env.NVIDIA_FALLBACK_TIMEOUT_MS || 15000);

  return client.chat.completions.create(
    {
      model,
      messages,
      temperature: 0.2,
      top_p: 0.7,
      // Reduced max_tokens for faster first-token response
      max_tokens: 150,
      stream: true,
    },
    { timeout },
  );
}

function textResponse(content, status = 200) {
  return new Response(content, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function streamResponse(completionStream) {
  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completionStream) {
            const content = chunk.choices?.[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (error) {
          controller.enqueue(
            encoder.encode(
              "\n\nCareBot is temporarily unavailable. Please use the contact form so the NGO team can assist you.",
            ),
          );
        } finally {
          controller.close();
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        // Disable proxy buffering for instant streaming
        "X-Accel-Buffering": "no",
        "Transfer-Encoding": "chunked",
      },
    },
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please ask a short CareConnect-related question.",
          fields: zodFieldErrors(parsed.error),
        },
        { status: 400 },
      );
    }

    const { question, history } = parsed.data;

    // Safety check — instant local response, no LLM needed
    const safetyResponse = getCareBotSafetyResponse(question);
    if (safetyResponse) {
      return textResponse(safetyResponse);
    }

    const primaryApiKey = process.env.NVIDIA_API_KEY;
    const fallbackApiKey = process.env.NVIDIA_FALLBACK_API_KEY || primaryApiKey;

    // Use fast NVIDIA Nemotron Nano as primary (8B, very fast TTFT)
    // Fallback to llama-3.1-8b-instruct
    const model = process.env.NVIDIA_MODEL || "nvidia/llama-3.1-nemotron-nano-8b-v1";
    const fallbackModel =
      process.env.NVIDIA_FALLBACK_MODEL || "meta/llama-3.1-8b-instruct";

    const messages = [
      { role: "system", content: careBotSystemPrompt },
      ...history.slice(-4), // Slightly smaller context window for speed
      { role: "user", content: question },
    ];

    let completionStream;

    try {
      completionStream = await streamWith({
        apiKey: primaryApiKey,
        model,
        messages,
      });
    } catch (error) {
      // Silently fall back to secondary model
      completionStream = await streamWith({
        apiKey: fallbackApiKey,
        model: fallbackModel,
        messages,
      });
    }

    return streamResponse(completionStream);
  } catch (error) {
    const isMissingKey = error.message?.includes("NVIDIA_API_KEY");

    return textResponse(
      "CareBot is temporarily unavailable. Please use the contact form so the NGO team can assist you.",
      isMissingKey ? 503 : 500,
    );
  }
}
