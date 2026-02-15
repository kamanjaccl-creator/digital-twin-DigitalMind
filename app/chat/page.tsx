"use client";

import { useState, type KeyboardEvent } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: nextMessages }),
      });

      const data = await res.json();
      const reply = data.reply || data.message || "No response received.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I ran into an error talking to the backend. Please check that the deployment has OPENAI_API_KEY configured.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "#f9fafb",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          borderRadius: 16,
          border: "1px solid rgba(148,163,184,0.4)",
          background:
            "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 55%), #020617",
          display: "flex",
          flexDirection: "column",
          padding: 16,
        }}
      >
        <header style={{ marginBottom: 12 }}>
          <h1 style={{ fontSize: 20, marginBottom: 4 }}>Digital Twin Chatbot (Prompt Injection Lab)</h1>
          <p style={{ fontSize: 13, color: "#9ca3af" }}>
            This assistant is tuned for cybersecurity topics and recruiter-friendly answers, and it is
            protected against prompt-injection attempts. You can try to override its rules or system
            promptdetected attacks are blocked and logged as <code>PROMPT_INJECTION</code> events in the
            security dashboard.
          </p>
        </header>

        <div
          style={{
            flex: 1,
            minHeight: 280,
            maxHeight: 420,
            overflowY: "auto",
            padding: 8,
            borderRadius: 12,
            backgroundColor: "rgba(15,23,42,0.8)",
            marginBottom: 12,
          }}
        >
          {messages.length === 0 && (
            <p style={{ fontSize: 13, color: "#6b7280" }}>
              Start with something like: "What does Digital Twin III demonstrate?" or
              "How do you defend against SQL injection here?"
            </p>
          )}
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 8,
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "6px 10px",
                  borderRadius: 10,
                  fontSize: 14,
                  backgroundColor: m.role === "user" ? "#22c55e" : "#111827",
                  color: m.role === "user" ? "#020617" : "#e5e7eb",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <div>
          <textarea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a question about your digital twin, security setup, or attack simulations..."
            style={{
              width: "100%",
              resize: "none",
              borderRadius: 10,
              border: "1px solid #4b5563",
              padding: 8,
              fontSize: 14,
              marginBottom: 8,
              backgroundColor: "#020617",
              color: "#e5e7eb",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "none",
                backgroundColor: loading ? "#6b7280" : "#22c55e",
                color: "#020617",
                fontSize: 14,
                cursor: loading ? "default" : "pointer",
              }}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
