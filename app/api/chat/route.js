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

async function completeWith({ apiKey, model, messages }) {
  const client = getOpenAIClient(apiKey);

  return client.chat.completions.create({
    model,
    messages,
    temperature: 0.2,
    top_p: 0.7,
    max_tokens: 220,
  });
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
    const safetyResponse = getCareBotSafetyResponse(question);

    if (safetyResponse) {
      return NextResponse.json({ answer: safetyResponse });
    }

    const primaryApiKey = process.env.NVIDIA_API_KEY;
    const fallbackApiKey = process.env.NVIDIA_FALLBACK_API_KEY || primaryApiKey;
    const model = process.env.NVIDIA_MODEL || "meta/llama-3.3-70b-instruct";
    const fallbackModel =
      process.env.NVIDIA_FALLBACK_MODEL || "meta/llama-3.1-8b-instruct";
    const messages = [
      { role: "system", content: careBotSystemPrompt },
      ...history.slice(-5),
      { role: "user", content: question },
    ];

    let completion;

    try {
      completion = await completeWith({
        apiKey: primaryApiKey,
        model,
        messages,
      });
    } catch (error) {
      completion = await completeWith({
        apiKey: fallbackApiKey,
        model: fallbackModel,
        messages,
      });
    }

    const answer = completion.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error("Empty CareBot response.");
    }

    return NextResponse.json({ answer });
  } catch (error) {
    const isMissingKey = error.message?.includes("NVIDIA_API_KEY");

    return NextResponse.json(
      {
        error:
          "CareBot is temporarily unavailable. Please use the contact form so the NGO team can assist you.",
      },
      { status: isMissingKey ? 503 : 500 },
    );
  }
}
