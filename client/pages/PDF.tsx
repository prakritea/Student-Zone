import { useState } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

export default function PDF() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <>
      <BackButton />
      <div className="container py-4 grid gap-6 lg:grid-cols-3">
      <div className="rounded-xl border bg-card p-4 lg:col-span-2">
        <div className="flex items-center gap-3">
          <input type="file" accept="application/pdf" onChange={(e)=> setFile(e.target.files?.[0] || null)} />
          <Button onClick={()=> setSummary("Key points extracted, highlights generated, and a one‑paragraph summary ready for review.")}>Summarize</Button>
        </div>
        <div className="mt-6 h-[480px] rounded-md border bg-muted/30 flex items-center justify-center text-muted-foreground">
          {file ? file.name : "PDF preview placeholder"}
        </div>
      </div>
      <div className="space-y-6">
        <aside className="rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-lg font-semibold">AI Summary</h3>
          {summary ? (
            <ul className="list-disc pl-5 text-sm">
              {summary.split(",").map((s,i)=> <li key={i} className="mb-1">{s.trim()}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Upload a PDF and click Summarize to see highlights and key takeaways.</p>
          )}
        </aside>
        <aside className="rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-lg font-semibold">History</h3>
          <ul className="space-y-2 text-sm">
            {["Research Paper on LLMs","Physics Notes","Startup Guide"].map((t,i)=> (
              <li key={i} className="rounded-md border p-2">
                <div className="font-medium line-clamp-1">{t}</div>
                <div className="text-xs text-muted-foreground">{i+2}d ago</div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      </div>
    </>
  );
}
