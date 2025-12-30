import { LLM } from "./types";

export class OpenAILLM implements LLM {
    async chat(prompt: string): Promise<string> {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL,
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await res.json();
        return data.choices[0].message.content;
    }
}