import { useState } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

type Template = "minimal" | "gradient" | "neon";

export default function PPT() {
  const [topics, setTopics] = useState("");
  const [template, setTemplate] = useState<Template>("minimal");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [history, setHistory] = useState<{ id: string; topic: string; count: number; date: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    const t = (topics || "AI in Education").trim();
    if (!t) return;

    setLoading(true);
    setError(null);
    setDownloadLink(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/ppt/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: t,
          template_id: template,
          num_slides: 5,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to generate PPT");
      }

      // Get blob and turn into downloadable link
      const blob = await res.blob();
      const fileURL = URL.createObjectURL(blob);
      setDownloadLink(fileURL);

      setHistory((h) => [
        {
          id: Math.random().toString(36).slice(2),
          topic: t,
          count: 5,
          date: new Date().toLocaleString(),
        },
        ...h,
      ]);
    } catch (err: any) {
      console.error("Error generating PPT:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton />
      <div className="container py-4 grid gap-6 lg:grid-cols-4">
        {/* Controls */}
        <div className="rounded-xl border bg-card p-4 lg:col-span-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <textarea
              className="min-h-[120px] flex-1 rounded-md border p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter topic and optional bullet points separated by semicolons"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
            />
            <div className="flex gap-2 sm:flex-col">
              <Button onClick={generate} disabled={loading}>
                {loading ? "Generating..." : "Generate Slides"}
              </Button>
              <div className="text-xs text-muted-foreground sm:self-start">Template:</div>
              <div className="flex gap-2 sm:flex-col">
                {(["minimal", "gradient", "neon"] as Template[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`rounded-md px-3 py-2 text-xs border ${
                      template === t ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 text-sm text-red-500">
              ⚠️ {error}
            </div>
          )}

          {/* Download Link */}
          {downloadLink && (
            <div className="mt-4 text-sm">
              ✅ PPT generated.{" "}
              <a
                href={downloadLink}
                download={`presentation_${template}.pptx`}
                className="text-primary hover:underline"
              >
                Click here to download.
              </a>
            </div>
          )}
        </div>

        {/* History */}
        <aside className="rounded-xl border bg-card p-4">
          <h3 className="mb-2 text-lg font-semibold">History</h3>
          {history.length ? (
            <ul className="space-y-2 text-sm">
              {history.map((h) => (
                <li key={h.id} className="rounded-md border p-2">
                  <div className="font-medium line-clamp-1">{h.topic}</div>
                  <div className="text-xs text-muted-foreground">
                    {h.count} slides • {h.date}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No decks yet. Generate to see them here.</p>
          )}
        </aside>
      </div>
    </>
  );
}
