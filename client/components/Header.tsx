import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#273469] text-white">AI</span>
          <span>NoteGPT</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <NavLink to="/" className={({isActive})=> isActive? "text-foreground" : "hover:text-foreground"}>Home</NavLink>
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#how" className="hover:text-foreground">How it works</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#chrome"
            className="hidden sm:inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
          >
            Add to Chrome
          </a>
          <Button asChild size="lg">
            <Link to="/dashboard">Try Free Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
