import { useMemo, useState } from "react";
import BackButton from "@/components/BackButton";

interface Note { id: string; title: string; content: string; date: string }

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Harvard CS50 Lecture 1", content: "Auto-summary and key points.", date: new Date().toDateString() },
    { id: "2", title: "Research Paper on LLMs", content: "Takeaways and quotes.", date: new Date(Date.now()-86400000).toDateString() },
  ]);
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const filtered = useMemo(() => notes.filter(n => n.title.toLowerCase().includes(query.toLowerCase())), [notes, query]);

  const add = () => {
    if (!title.trim()) return;
    setNotes(prev => [{ id: Math.random().toString(36).slice(2), title: title.trim(), content, date: new Date().toDateString() }, ...prev]);
    setTitle(""); setContent("");
  };

  return (
    <>
      <BackButton />
      <div className="container py-4 grid gap-6 lg:grid-cols-3">
      <div className="rounded-xl border bg-card p-4">
        <div className="mb-3 text-lg font-semibold">Upload / Create Note</div>
        <input className="mb-2 w-full rounded-md border px-3 py-2 text-sm" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)} />
        <textarea className="min-h-[120px] w-full rounded-md border p-3 text-sm" placeholder="Paste or type content" value={content} onChange={(e)=> setContent(e.target.value)} />
        <div className="mt-3 flex items-center justify-between">
          <label className="text-sm text-muted-foreground">
            <input type="file" className="mr-2" /> or create from text
          </label>
          <button onClick={add} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save</button>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Notes</div>
          <input value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Search notes" className="rounded-md border px-3 py-2 text-sm" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((n)=> (
            <div key={n.id} className="rounded-lg border p-4">
              <div className="mb-1 text-sm text-muted-foreground">{n.date}</div>
              <div className="font-medium">{n.title}</div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-3">{n.content}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
