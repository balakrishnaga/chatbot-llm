"use client";
import { useState } from "react";
import { Message } from "@/lib/llm/types";



export default function ChatBox() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    async function sendMessage() {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        const updatedMessages = [...messages, userMessage];

        // Update user message immediately
        setMessages(updatedMessages);
        setInput("");

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await res.json();
            const botMessage: Message = { role: "bot", content: data.response };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
            const errorMessage: Message = { role: "bot", content: "Sorry, something went wrong." };
            setMessages((prev) => [...prev, errorMessage]);
        }
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">AI Chatbot</h3>
            <div
                className="d-flex flex-column shadow-lg glass-card"
                style={{
                    height: "80vh",
                    overflow: "hidden"
                }}
            >
                <div
                    className="p-3 d-flex flex-column flex-grow-1"
                    style={{ overflowY: "auto" }}
                >
                    {messages.length === 0 && (
                        <div className="text-center text-muted my-auto">
                            Start a conversation!
                        </div>
                    )}
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`d-flex mb-2 ${m.role === "user" ? "justify-content-end" : "justify-content-start"}`}
                        >
                            <div
                                className={`p-2 px-3 ${m.role === "user"
                                    ? "rounded-pill shadow-sm bg-light text-dark border-0"
                                    : "text-dark"
                                    }`}
                                style={{
                                    maxWidth: "75%",
                                    borderBottomRightRadius: m.role === "user" ? "4px" : "12px",
                                    borderBottomLeftRadius: m.role === "bot" ? "4px" : "12px"
                                }}
                            >
                                {m.content}
                            </div>
                        </div>
                    ))}
                </div>

                <form
                    className="input-group glass-footer"
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                >
                    <input
                        className="form-control border-0 glass-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        aria-label="Chat input"
                    />
                </form>
            </div>
        </div>
    );
}