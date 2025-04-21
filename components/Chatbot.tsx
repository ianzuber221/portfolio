"use client";

import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    const botMessage = {
      sender: "AI",
      text: `I'm glad you asked! Ian is a skilled dev with experience in Angular, Next.js, and building real products like PassLink Cloud.`,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Ask why you should hire Ian 🤖</h2>

      <div className="h-64 overflow-y-auto border rounded p-4 bg-gray-50 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm ${msg.sender === "AI" ? "text-blue-600" : "text-black"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI anything..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}