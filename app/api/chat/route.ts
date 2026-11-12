
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = {
  sender: "user" | "bot";
  text: string;
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          code: "MISSING_API_KEY",
          error: "OpenAI API key is missing.",
        },
        { status: 503 }
      );
    }

    const body = await req.json();

    const message = body?.message;

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 1000
    ) {
      return NextResponse.json(
        {
          code: "INVALID_MESSAGE",
          error: "Please enter a valid message.",
        },
        { status: 400 }
      );
    }

    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (m: unknown): m is ChatMessage =>
              typeof m === "object" &&
              m !== null &&
              "sender" in m &&
              "text" in m &&
              (m.sender === "user" || m.sender === "bot") &&
              typeof m.text === "string" &&
              m.text.length <= 1000
          )
          .slice(-8)
      : [];

    const client = new OpenAI({
      apiKey,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",

      instructions: `
You are Rachit Dev Assistant, a professional AI assistant
for Rachit Dev Web Service.

ABOUT BUSINESS:
Name: Rachit Dev Web Service
Founder: Rachit Rathore
Services:
- Portfolio Website Development
- Business Website Development
- E-commerce Website Development
- Restaurant and Hotel Websites
- React.js and Next.js Development
- UI/UX Design
- Responsive Web Design
- Website Performance Optimization

TECHNOLOGIES:
React.js, Next.js, TypeScript, JavaScript,
HTML, CSS, Tailwind CSS and Git.

YOUR RESPONSIBILITIES:
1. Answer client questions professionally.
2. Help clients choose website services.
3. Explain website features and technologies.
4. Ask useful questions about project requirements.
5. Discuss pricing without inventing fixed prices.
6. Suggest WhatsApp for consultations and meetings.
7. Reply in Hindi, Hinglish or English based on user language.
8. Keep replies friendly, clear and concise.
9. Never invent client testimonials, guarantees or confirmed bookings.
10. Stay focused on Rachit Dev Web Service.
`,

      input: [
        ...history.map((m) => ({
          role:
            m.sender === "user"
              ? ("user" as const)
              : ("assistant" as const),
          content: m.text,
        })),
        {
          role: "user" as const,
          content: message.trim(),
        },
      ],

      max_output_tokens: 250,
    });

    return NextResponse.json({
      reply:
        response.output_text?.trim() ||
        "Could you share more details about your project?",
    });
  } catch (error: unknown) {
    console.error("OPENAI API ERROR:", error);

    if (error instanceof OpenAI.APIError) {
      const status = error.status ?? 502;

      return NextResponse.json(
        {
          code:
            status === 401
              ? "INVALID_API_KEY"
              : status === 429
              ? "RATE_LIMIT_OR_QUOTA"
              : status === 403
              ? "ACCESS_DENIED"
              : "PROVIDER_ERROR",
          error:
            "AI service is temporarily unavailable.",
        },
        { status: status >= 400 && status < 600 ? status : 502 }
      );
    }

    return NextResponse.json(
      {
        code: "SERVER_ERROR",
        error: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
