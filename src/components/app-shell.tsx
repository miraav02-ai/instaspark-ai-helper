import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, Bot, CalendarDays, LogOut, Newspaper, UserRound, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

const items = [
  { label: "AI Agent", to: "/" as const, icon: Bot },
  { label: "News", to: "/news" as const, icon: Newspaper },
  { label: "Content Planner", to: "/planner" as const, icon: CalendarDays },
  { label: "Analytics", to: "/analytics" as const, icon: BarChart3 },
];

type Session = { name: string; email: string } | null;

export function AppShell({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouterState();
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("mira-session");
    if (saved) setSession(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const idx = items.findIndex((item) => {
      if (item.to === "/") return router.location.pathname === "/";
      return router.location.pathname.startsWith(item.to);
    });
    const el = linkRefs.current[idx];
    if (el) {
      setPillStyle({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setPillStyle((s) => ({ ...s, opacity: 0 }));
    }
  }, [router.location.pathname]);

  function handleLogin(event: FormEvent) {
    event.preventDefault();
    const next = { name: name.trim() || "Mira User", email: email.trim() };
    setSession(next);
    localStorage.setItem("mira-session", JSON.stringify(next));
    setOpen(false);
  }

  function handleLogout() {
    setSession(null);
    localStorage.removeItem("mira-session");
    setOpen(false);
  }

  const initials = (session?.name ?? "?").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return <div className="min-h-screen bg-background">
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4">
      <div className="grid w-full max-w-2xl grid-cols-[auto_1fr] items-center gap-2 rounded-full border border-border bg-background/90 p-1.5 shadow-[0_12px_40px_color-mix(in_oklab,var(--foreground)_9%,transparent)] backdrop-blur-xl">
        <button
          type="button"
          aria-label={session ? "Open profile" : "Log in"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-accent/60"
        >
          {session ? (
            <>
              <span className="grid size-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{initials}</span>
              <span className="max-w-28 truncate pr-2 text-sm font-semibold text-foreground">{session.name}</span>
            </>
          ) : (
            <span className="grid size-9 place-items-center rounded-full border border-border bg-muted text-foreground transition-colors group-hover:bg-accent">
              <UserRound className="size-4" />
            </span>
          )}
        </button>

        <nav aria-label="Primary" className="relative flex min-w-0 items-center gap-1 justify-self-end">
          <span
            aria-hidden="true"
            className="nav-pill"
            style={{ left: pillStyle.left, width: pillStyle.width, opacity: pillStyle.opacity }}
          />
          {items.map(({ label, to, icon: Icon }, i) => (
            <Link
              key={to}
              ref={(el) => { linkRefs.current[i] = el; }}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="nav-link"
              activeProps={{ className: "nav-link nav-link-active" }}
            >
              <Icon /><span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>

    {open && (
      <div className="fixed inset-0 z-[60] flex items-start justify-center bg-foreground/20 px-4 pt-24 backdrop-blur-sm" onClick={() => setOpen(false)}>
        <div role="dialog" aria-label={session ? "Profile" : "Log in"} className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">{session ? "Profile" : "Log in"}</h2>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"><X className="size-4" /></button>
          </div>

          {session ? (
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{initials}</span>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{session.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{session.email}</p>
                </div>
              </div>
              <button type="button" onClick={handleLogout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted">
                <LogOut className="size-4" /> Log out
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-3">
              <label className="block text-sm font-medium">Name
                <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </label>
              <label className="block text-sm font-medium">Email
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              </label>
              <button type="submit" className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Log in</button>
            </form>
          )}
        </div>
      </div>
    )}
    {children}
  </div>;
}
