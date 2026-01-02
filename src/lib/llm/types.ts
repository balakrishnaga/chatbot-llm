export interface Message {
    role: "user" | "bot";
    content: string;
}

export interface LLM {
    chat(messages: Message[]): Promise<Message>;
}