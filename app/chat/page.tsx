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
    } catch {
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
    <div className="cyber-bg min-h-screen font-sans flex justify-center px-4 py-10">
      <div className="w-full max-w-[720px] rounded-2xl border border-border/40 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_55%),hsl(var(--background))] flex flex-col p-4">
        <header className="mb-3">
          <h1 className="text-xl font-bold text-foreground mb-1">
            {'Digital Twin Chatbot (Prompt Injection Lab)'}
          </h1>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            This assistant is tuned for cybersecurity topics and recruiter-friendly answers, and it is
            protected against prompt-injection attempts. You can try to override its rules or system
            prompt — detected attacks are blocked and logged as{" "}
            <code className="text-accent font-mono text-xs">PROMPT_INJECTION</code> events in the
            security dashboard.
          </p>
        </header>

        <div className="flex-1 min-h-[280px] max-h-[420px] overflow-y-auto p-2 rounded-xl bg-card/80 mb-3">
          {messages.length === 0 && (
            <p className="text-[13px] text-muted-foreground">
              {'Start with something like: "What does Digital Twin III demonstrate?" or "How do you defend against SQL injection here?"'}
            </p>
          )}
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 py-1.5 rounded-[10px] text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
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
            className="w-full resize-none rounded-[10px] border border-border p-2 text-sm mb-2 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
