import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const paths = u.pathname.split("/");
    const idx = paths.findIndex((p) => p === "embed");
    if (idx >= 0 && paths[idx + 1]) return paths[idx + 1];
    return null;
  } catch {
    return null;
  }
}

export default function YouTube() {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState<string | null>(null);

  const videoId = useMemo(() => extractYouTubeId(url), [url]);
  const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : url || "https://www.youtube.com";



  const handleSummarize = async () => {
  if (!url) return;

  try {
    const response = await fetch("http://127.0.0.1:8000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (response.ok) {
      setSummary(data.summary);
    } else {
      setSummary("Failed to generate summary. Please check the video URL or try again.");
      console.error("API error:", data.detail);
    }
  } catch (err) {
    console.error("Request failed:", err);
    setSummary("An error occurred while connecting to the summarization service.");
  }
};




  return (
    <>
      <BackButton />
      <div className="container py-4">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube link"
          className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex gap-2">
          <a
            href={watchUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Watch on YouTube
          </a>
          <Button onClick={handleSummarize}>Summarize</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video */}
        <div className="lg:col-span-2 rounded-xl border bg-card">
          <div className="aspect-video w-full rounded-t-xl bg-black/5">
            {videoId ? (
              <iframe
                className="h-full w-full rounded-t-xl"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                Paste a link to preview here
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Transcript</h2>
            <ul className="space-y-2 text-sm text-muted-foreground max-h-64 overflow-auto pr-1">
              {["00:00 Introduction and goals","02:35 Key concept #1","08:12 Practical example","14:20 Common pitfalls","19:50 Summary and next steps"].map((t, i) => (
                <li key={i} className="rounded-md border p-2">{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Summary + History */}
        <div className="space-y-6">
          <aside className="rounded-xl border bg-card p-4">
            <h3 className="mb-2 text-lg font-semibold">AI Summary</h3>
            {summary ? (
              <div className="prose prose-sm max-w-none text-foreground">
                <ul className="list-disc pl-5">
                  {summary.split(".").filter(Boolean).map((s, i)=> (
                    <li key={i} className="mb-1">{s.trim()}.</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Click Summarize to generate a concise overview and key takeaways.</p>
            )}
          </aside>
          <aside className="rounded-xl border bg-card p-4">
            <h3 className="mb-2 text-lg font-semibold">History</h3>
            <ul className="space-y-2 text-sm">
              {["Harvard CS50 – Lecture 1","Deep Learning 101","React Hooks Crash Course"].map((t,i)=> (
                <li key={i} className="rounded-md border p-2">
                  <div className="font-medium line-clamp-1">{t}</div>
                  <div className="text-xs text-muted-foreground">{i+1}d ago</div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      </div>
    </>
  );
}
