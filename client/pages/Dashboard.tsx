import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function SidebarItem({ to, icon, label, badge, collapsed = false }: { to: string; icon: React.ReactNode; label: string; badge?: React.ReactNode; collapsed?: boolean }) {
  return (
    <NavLink
      to={to}
      title={label}
      className={({ isActive }) =>
        cn(
          "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
          collapsed ? "justify-center" : "gap-3",
          isActive ? "bg-primary/10 text-foreground" : "hover:bg-accent text-muted-foreground",
        )
      }
    >
      <span className="shrink-0" aria-hidden>{icon}</span>
      {!collapsed && <span className="flex-1 text-left">{label}</span>}
      {!collapsed && badge}
    </NavLink>
  );
}

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] dark:bg-black">
      {/* Sidebar */}
      <aside className={cn("border-r bg-white dark:bg-black transition-all duration-200", collapsed ? "w-[72px]" : "w-[260px]")}>
        <div className="h-16 flex items-center px-4 border-b">
          <button onClick={()=>setCollapsed(v=>!v)} className="text-muted-foreground hover:text-foreground">
            {collapsed ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m15 18-6-6 6-6"/></svg>
            ): (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m9 18 6-6-6-6"/></svg>
            )}
          </button>
        </div>
        <nav className="p-3 space-y-1">
          <SidebarItem collapsed={collapsed} to="/dashboard" icon={<span className="i">🏠</span>} label="Home" />
          <SidebarItem collapsed={collapsed} to="/planner" icon={<span>🗓️</span>} label="Study Planner" />
          <SidebarItem collapsed={collapsed} to="/youtube" icon={<span>▶️</span>} label="AI YouTube" />
          <SidebarItem collapsed={collapsed} to="/chat" icon={<span>💬</span>} label="AI Chat" />
          <SidebarItem collapsed={collapsed} to="/pdf" icon={<span>📄</span>} label="AI PDF" />
          <SidebarItem collapsed={collapsed} to="/ppt" icon={<span>📽️</span>} label="AI Presentation" badge={<span className="ml-auto rounded bg-rose-100 px-1.5 py-0.5 text-xs text-rose-600">Hot</span>} />
          <SidebarItem collapsed={collapsed} to="/flashcards" icon={<span>🧠</span>} label="AI Flashcards" />
          <div className="my-3 h-px bg-border" />
          <SidebarItem collapsed={collapsed} to="/notes" icon={<span>📝</span>} label="My Notes" />
          <SidebarItem collapsed={collapsed} to="/#pricing" icon={<span>⭐</span>} label="Subscriptions" badge={<span className="ml-auto rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-700">Save 30%</span>} />
          <SidebarItem collapsed={collapsed} to="/dashboard" icon={<span>👥</span>} label="Community" />
          <div className="my-3 h-px bg-border" />
          <SidebarItem collapsed={collapsed} to="/dashboard" icon={<span>🧩</span>} label="Add to Chrome" />
        </nav>
        <div className="mt-auto p-3 hidden md:block">
          <div className="rounded-lg border p-3 text-xs text-muted-foreground">
            <div className="mb-2 font-medium text-foreground">Prakriti</div>
            <div>prakritisirshi03@gmail.com</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <section className="flex-1 dark:bg-black">
        <div className="h-16 border-b bg-white/60 dark:bg-black flex items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Home</h1>
          <div className="flex items-center gap-2">
            <input className="hidden md:block w-64 rounded-md border bg-white dark:bg-[#0b0b0b] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Search your notes" />
            <Button className="">New Note</Button>
          </div>
        </div>
        <div className="p-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="mb-2 text-xl font-semibold">Welcome back 👋</h2>
              <p className="text-muted-foreground">Start by importing a YouTube video, PDF, or create a new note. Your study companion is here to help.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild variant="secondary"><Link to="/youtube">Import YouTube</Link></Button>
                <Button asChild variant="secondary"><Link to="/pdf">Upload PDF</Link></Button>
                <Button asChild><Link to="/chat">Start AI Chat</Link></Button>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-4 text-lg font-semibold">Recent Notes</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {["Harvard CS50 Lecture 1", "Research Paper on LLMs", "Calculus: Integrals", "World History: WW2"].map((t, i)=> (
                  <div key={i} className="rounded-lg border p-4 hover:shadow-sm transition">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-medium">{t}</div>
                      <span className="text-xs text-muted-foreground">Edited {i+1}d ago</span>
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">Auto-generated summary and key points are saved here. Continue learning where you left off.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-2 text-lg font-semibold">Quick Actions</h3>
              <div className="grid gap-2">
                <Button variant="secondary">Summarize a video</Button>
                <Button variant="secondary">Scan a PDF</Button>
                <Button variant="secondary">Create presentation</Button>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h3 className="mb-2 text-lg font-semibold">Subscription</h3>
              <p className="text-sm text-muted-foreground mb-3">Upgrade to unlock unlimited notes and HD exports.</p>
              <Button asChild className="w-full"><Link to="/#pricing">Upgrade - Save 30%</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
