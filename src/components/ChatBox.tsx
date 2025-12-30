"use client";
import { useState } from "react";

interface Message {
    role: "user" | "bot";
    content: string;
}

export default function ChatBox() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    async function sendMessage() {
        if (!input.trim()) return;

        const userInput = input;
        const userMessage: Message = { role: "user", content: userInput };

        // Update user message immediately
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput }),
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
                className="rounded p-3 mb-2 d-flex flex-column"
                style={{
                    height: 500,
                    overflowY: "auto",
                    borderRadius: "12px",
                    border: "1px solid #c5c9cdff"
                }}
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
                            className={`p-2 px-3 rounded-pill ${m.role === "user"
                                ? "bg-white text-dark shadow-sm border"
                                : "bg-white text-dark"
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
                className="input-group shadow-sm"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
            >
                <input
                    className="form-control"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    aria-label="Chat input"
                />
                <button className="btn btn-primary px-4" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
}