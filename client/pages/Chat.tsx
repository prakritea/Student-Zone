import { FormEvent, useRef, useState } from "react";
import BackButton from "@/components/BackButton";

interface Msg { id: string; role: "user" | "assistant"; content: string }

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "a", role: "assistant", content: "Hi! I can help summarize videos, PDFs, and create flashcards. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const text = input.trim();
  if (!text) return;

  const userMsg: Msg = {
    id: Math.random().toString(36).slice(2),
    role: "user",
    content: text,
  };

  setMessages((prev) => [...prev, userMsg]);
  setInput("");

  try {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    const botMsg: Msg = {
      id: Math.random().toString(36).slice(2),
      role: "assistant",
      content: data.reply || "Sorry, I couldn't process that.",
    };

    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    const errorMsg: Msg = {
      id: Math.random().toString(36).slice(2),
      role: "assistant",
      content: "⚠️ Failed to get response. Please try again.",
    };
    setMessages((prev) => [...prev, errorMsg]);
  }

  setTimeout(() => {
    listRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, 50);
};


  return (
    <>
      <BackButton />
      <div className="container py-4">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 flex h-[calc(100vh-14rem)] flex-col">
            <div ref={listRef} className="flex-1 overflow-auto rounded-xl border bg-card p-4">
              <div className="mx-auto max-w-3xl space-y-4">
                {messages.map((m)=> (
                  <div key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                    <div className={`inline-block rounded-2xl px-4 py-2 ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent"}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={onSubmit} className="mx-auto mt-4 flex w-full max-w-3xl items-center gap-2">
              <input
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Send</button>
            </form>
          </div>

          <aside className="rounded-xl border bg-card p-4">
            <h3 className="mb-2 text-lg font-semibold">History</h3>
            <ul className="space-y-2 text-sm">
              {["Study plan prompts","Explain LLMs","Summarize chapter 2"].map((t,i)=> (
                <li key={i} className="rounded-md border p-2">
                  <div className="font-medium line-clamp-1">{t}</div>
                  <div className="text-xs text-muted-foreground">{i+1}d ago</div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
