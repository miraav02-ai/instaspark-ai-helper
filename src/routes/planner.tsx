import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [
    { title: "Content Planner — Mira" }, { name: "description", content: "Kalender konten satu bulan penuh dengan tambah, ubah, dan hapus jadwal." },
    { property: "og:title", content: "Content Planner — Mira" }, { property: "og:description", content: "Kelola jadwal konten Instagram dalam kalender bulanan." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: PlannerPage,
});

type Status = "Draft" | "Scheduled" | "Published";
type Post = { id: string; title: string; date: string; time: string; status: Status };

const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DAYS = ["Sen","Sel","Rab","Kam","Jum","Sab","Min"];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

const initialPosts: Post[] = [
  { id: "1", title: "Morning routine reel", date: "2026-09-07", time: "09:30", status: "Published" },
  { id: "2", title: "Founder lesson carousel", date: "2026-09-08", time: "12:00", status: "Scheduled" },
  { id: "3", title: "Community Q&A", date: "2026-09-08", time: "17:00", status: "Draft" },
  { id: "4", title: "Product detail reel", date: "2026-09-10", time: "10:15", status: "Scheduled" },
  { id: "5", title: "Weekly wins", date: "2026-09-11", time: "16:00", status: "Draft" },
  { id: "6", title: "Studio BTS", date: "2026-09-12", time: "11:00", status: "Scheduled" },
  { id: "7", title: "Trend recap", date: "2026-09-22", time: "13:30", status: "Draft" },
  { id: "8", title: "Testimonial carousel", date: "2026-09-26", time: "08:45", status: "Scheduled" },
];

const emptyDraft = (date: string): Post => ({ id: "", title: "", date, time: "09:00", status: "Draft" });

function PlannerPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [view, setView] = useState({ year: 2026, month: 8 });
  const [draft, setDraft] = useState<Post | null>(null);

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const lead = (first.getDay() + 6) % 7;
    const total = new Date(view.year, view.month + 1, 0).getDate();
    const list: Array<number | null> = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= total; d++) list.push(d);
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [view]);

  const shift = (delta: number) => setView(v => {
    const d = new Date(v.year, v.month + delta, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const save = () => {
    if (!draft || !draft.title.trim()) return;
    setPosts(prev => draft.id ? prev.map(p => p.id === draft.id ? draft : p) : [...prev, { ...draft, id: crypto.randomUUID() }]);
    setDraft(null);
  };

  const remove = (id: string) => setPosts(prev => prev.filter(p => p.id !== id));

  return <main className="page-wrap">
    <header className="page-heading">
      <div><p className="eyebrow">Editorial calendar</p><h1>Rencana bulan ini</h1><p>Atur, ubah, dan pindahkan jadwal konten dalam satu kalender.</p></div>
      <Button onClick={() => setDraft(emptyDraft(iso(view.year, view.month, 1)))}><Plus /> Konten baru</Button>
    </header>

    <section className="panel overflow-x-auto p-0">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-surface-raised p-5">
        <div className="flex items-center gap-3">
          <div className="starter-icon"><CalendarDays /></div>
          <div><p className="section-label">Kalender konten</p><h2>{MONTHS[view.month]} {view.year}</h2></div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Bulan sebelumnya" onClick={() => shift(-1)}><ChevronLeft /></Button>
          <Button variant="outline" size="icon" aria-label="Bulan berikutnya" onClick={() => shift(1)}><ChevronRight /></Button>
        </div>
      </div>

      <div className="grid min-w-[900px] grid-cols-7 border-b border-border">
        {DAYS.map(d => <div key={d} className="p-3"><span className="section-label">{d}</span></div>)}
      </div>

      <div className="grid min-w-[900px] grid-cols-7">
        {cells.map((day, index) => {
          const date = day ? iso(view.year, view.month, day) : "";
          const items = day ? posts.filter(p => p.date === date) : [];
          return <div key={index} className="min-h-[150px] border-b border-r border-border p-3 last:border-r-0">
            {day && <>
              <div className="mb-3 flex items-center justify-between">
                <strong className="text-sm">{day}</strong>
                <button className="text-muted-foreground transition hover:text-primary" aria-label={`Tambah konten ${date}`} onClick={() => setDraft(emptyDraft(date))}><Plus className="size-3.5" /></button>
              </div>
              <div className="space-y-2">
                {items.map(post => <article key={post.id} className="rounded-lg border border-border bg-background p-2.5">
                  <span className={`status-badge status-${post.status.toLowerCase()}`}>{post.status}</span>
                  <h3 className="mt-2 text-xs font-semibold leading-5">{post.title}</h3>
                  <p className="mt-1 text-[10px] text-muted-foreground">{post.time} · Instagram</p>
                  <div className="mt-2 flex gap-1">
                    <Button variant="ghost" size="icon" className="size-6" aria-label={`Ubah ${post.title}`} onClick={() => setDraft(post)}><Pencil className="size-3" /></Button>
                    <Button variant="ghost" size="icon" className="size-6" aria-label={`Hapus ${post.title}`} onClick={() => remove(post.id)}><Trash2 className="size-3" /></Button>
                  </div>
                </article>)}
              </div>
            </>}
          </div>;
        })}
      </div>
    </section>

    <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
      <span><i className="legend published" />Published</span>
      <span><i className="legend scheduled" />Scheduled</span>
      <span><i className="legend draft" />Draft</span>
    </div>

    <Dialog open={draft !== null} onOpenChange={open => !open && setDraft(null)}>
      <DialogContent>
        <DialogHeader><DialogTitle>{draft?.id ? "Ubah konten" : "Konten baru"}</DialogTitle></DialogHeader>
        {draft && <div className="space-y-4">
          <div className="space-y-2"><Label htmlFor="title">Judul</Label><Input id="title" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} placeholder="Misal: Reels behind-the-scenes" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="date">Tanggal</Label><Input id="date" type="date" value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} /></div>
            <div className="space-y-2"><Label htmlFor="time">Jam</Label><Input id="time" type="time" value={draft.time} onChange={e => setDraft({ ...draft, time: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Status</Label>
            <Select value={draft.status} onValueChange={value => setDraft({ ...draft, status: value as Status })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{(["Draft","Scheduled","Published"] as Status[]).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>}
        <DialogFooter>
          {draft?.id && <Button variant="outline" onClick={() => { remove(draft.id); setDraft(null); }}><Trash2 /> Hapus</Button>}
          <Button onClick={save}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </main>;
}
