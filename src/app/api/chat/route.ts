import { NextResponse } from "next/server";
import { getLLM } from "@/lib/llm";

export async function POST(req: Request) {
    const { messages } = await req.json();
    const llm = getLLM();
    const response = await llm.chat(messages);
    return NextResponse.json({ response });
}