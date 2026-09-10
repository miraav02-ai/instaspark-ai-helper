import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Bookmark, Flame, Lightbulb, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [
    { title: "Marketing News — Mira" }, { name: "description", content: "Track Instagram trends and turn industry news into timely content ideas." },
    { property: "og:title", content: "Marketing News — Mira" }, { property: "og:description", content: "Fresh Instagram trends and AI-suggested content hooks." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: NewsPage,
});

const trends = [
  { rank: "01", topic: "Unpolished behind-the-scenes", growth: "+84%", tag: "Reels" },
  { rank: "02", topic: "Founder-led storytelling", growth: "+61%", tag: "Carousel" },
  { rank: "03", topic: "Comment-to-DM automations", growth: "+43%", tag: "Growth" },
];

function NewsPage() {
  return <main className="page-wrap">
    <header className="page-heading"><div><p className="eyebrow">Signal over noise</p><h1>What’s moving Instagram</h1><p>Fresh shifts, useful context, and a clear angle for your next post.</p></div><span className="status-chip"><span /> Updated 12 min ago</span></header>
    <section className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <div className="space-y-5">
        <article className="panel overflow-hidden p-0"><div className="border-b border-border bg-soft-purple p-6"><div className="mb-12 flex items-center justify-between"><span className="tiny-pill border-0"><Flame className="size-3 text-primary" /> Today’s lead</span><Button variant="ghost" size="icon" aria-label="Save article"><Bookmark /></Button></div><p className="section-label">Platform update · 6 min read</p><h2 className="mt-3 max-w-2xl text-2xl! leading-tight">Instagram is rewarding original storytelling over polished production</h2></div><div className="p-6"><p className="leading-7 text-muted-foreground">Creators showing the process—not just the outcome—are seeing stronger saves and longer watch time. For brands, that means the rough cut may outperform the campaign film.</p><Button variant="link" className="mt-4 px-0">Read briefing <ArrowUpRight /></Button></div></article>
        <div><p className="section-label mb-3">Trending now</p><div className="panel divide-y divide-border p-0">{trends.map(item => <div key={item.rank} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 p-4"><span className="font-display text-sm text-muted-foreground">{item.rank}</span><div><strong className="text-sm">{item.topic}</strong><p className="mt-1 text-xs text-muted-foreground">{item.tag}</p></div><span className="text-xs font-semibold text-success">{item.growth}</span></div>)}</div></div>
      </div>
      <aside className="panel h-fit"><div className="panel-head"><div><p className="section-label mb-1">AI-suggested</p><h2>Hooks worth testing</h2></div><Lightbulb className="size-5 text-primary" /></div><div className="space-y-3">{[
        'The polished version is costing you reach. Here’s what to post instead.',
        'Three things we stopped doing—and the metric that finally moved.',
        'POV: your audience wants the draft, not the grand reveal.',
        'Save this before planning your next “perfect” launch.'
      ].map((hook,index)=><button key={hook} className="starter w-full min-h-0"><span className="starter-icon"><Newspaper /></span><span><small className="mt-0!">HOOK {index+1}</small><strong className="mt-1 text-sm leading-5">{hook}</strong></span></button>)}</div></aside>
    </section>
  </main>;
}