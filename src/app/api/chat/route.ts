import { NextResponse } from "next/server";
import { getLLM } from "@/lib/llm";

export async function POST(req: Request) {
    const { message } = await req.json();
    const llm = getLLM();
    const response = await llm.chat(message);
    return NextResponse.json({ response });
}