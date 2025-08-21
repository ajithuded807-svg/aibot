import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${process.env.OPENROUTER_API_KEY},
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // ✅ free model
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
  }
}
