export interface LLM {
    chat(prompt: string): Promise<string>;
}