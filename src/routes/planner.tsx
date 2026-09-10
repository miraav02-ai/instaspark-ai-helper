import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [
    { title: "Content Planner — Mira" }, { name: "description", content: "Plan and schedule Instagram content in a clear editorial calendar." },
    { property: "og:title", content: "Content Planner — Mira" }, { property: "og:description", content: "A visual Instagram editorial calendar for drafts and scheduled posts." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: PlannerPage,
});

const days: Array<{ day: string; date: string; items: Array<[string, "Draft" | "Scheduled" | "Published"]> }> = [
  { day:'Mon',date:'7',items:[['Morning routine reel','Published']] },
  { day:'Tue',date:'8',items:[['Founder lesson carousel','Scheduled'],['Community Q&A','Draft']] },
  { day:'Wed',date:'9',items:[] },
  { day:'Thu',date:'10',items:[['Product detail reel','Scheduled']] },
  { day:'Fri',date:'11',items:[['Weekly wins','Draft']] },
  { day:'Sat',date:'12',items:[['Studio BTS','Scheduled']] },
  { day:'Sun',date:'13',items:[] },
];

function PlannerPage(){return <main className="page-wrap"><header className="page-heading"><div><p className="eyebrow">Editorial calendar</p><h1>Plan the week</h1><p>Keep every idea, draft, and scheduled post moving in one view.</p></div><Button><Plus /> New post</Button></header>
  <section className="panel overflow-x-auto p-0"><div className="sticky left-0 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface-raised p-5"><div className="flex items-center gap-3"><div className="starter-icon"><CalendarDays /></div><div><p className="section-label">September 2026</p><h2>Week 37</h2></div></div><div className="flex items-center gap-2"><Button variant="outline" size="icon" aria-label="Previous week"><ChevronLeft /></Button><Button variant="outline" size="icon" aria-label="Next week"><ChevronRight /></Button></div></div>
  <div className="grid min-w-[900px] grid-cols-7">{days.map(({day,date,items})=><div key={day} className="min-h-[430px] border-r border-border p-3 last:border-r-0"><div className="mb-5 flex items-baseline justify-between"><span className="section-label">{day}</span><strong className={date==='10'?'grid size-7 place-items-center rounded-full bg-primary text-sm text-primary-foreground':'text-sm'}>{date}</strong></div><div className="space-y-2">{items.map(([title,status])=><article key={title} className="rounded-lg border border-border bg-background p-3"><span className={`status-badge status-${status.toLowerCase()}`}>{status}</span><h3 className="mt-3 text-xs font-semibold leading-5">{title}</h3><p className="mt-2 text-[10px] text-muted-foreground">9:30 AM · Instagram</p></article>)}</div></div>)}</div></section>
  <div className="mt-3 flex gap-4 text-xs text-muted-foreground"><span><i className="legend published"/>Published</span><span><i className="legend scheduled"/>Scheduled</span><span><i className="legend draft"/>Draft</span></div>
</main>}