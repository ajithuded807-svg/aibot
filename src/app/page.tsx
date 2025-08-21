"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages([...messages, newMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    if (data.reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Bot</h1>

      <div className="w-full max-w-lg bg-white shadow rounded-xl p-4 flex flex-col gap-2">
        <div className="flex-1 overflow-y-auto h-80 border p-2 rounded-md bg-gray-50">
          {messages.map((m, i) => (
            <p key={i} className={m.role === "user" ? "text-blue-600" : "text-green-600"}>
              <b>{m.role}:</b> {m.content}
            </p>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            className="flex-1 border rounded-md p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}