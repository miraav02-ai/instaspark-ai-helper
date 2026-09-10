import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Flame } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [
    { title: "Marketing News — Mira" }, { name: "description", content: "Tiga topik yang sedang viral dan lima berita terbaru seputar Instagram marketing." },
    { property: "og:title", content: "Marketing News — Mira" }, { property: "og:description", content: "Topik trending dan berita terbaru untuk kontenmu." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: NewsPage,
});

const topics = [
  { rank: "01", topic: "Behind-the-scenes tanpa polesan", growth: "+84%", tag: "Reels" },
  { rank: "02", topic: "Founder-led storytelling", growth: "+61%", tag: "Carousel" },
  { rank: "03", topic: "Otomasi komentar ke DM", growth: "+43%", tag: "Growth" },
];

const articles = [
  { title: "Instagram lebih menghargai cerita orisinal ketimbang produksi mewah", topic: "Behind-the-scenes tanpa polesan", source: "Later Blog", time: "12 menit lalu", read: "6 menit" },
  { title: "Reels rough-cut mencatat watch time 27% lebih panjang bulan ini", topic: "Behind-the-scenes tanpa polesan", source: "Social Media Today", time: "48 menit lalu", read: "4 menit" },
  { title: "Brand kecil tumbuh cepat saat pendirinya tampil di kamera", topic: "Founder-led storytelling", source: "Hootsuite Insights", time: "2 jam lalu", read: "5 menit" },
  { title: "Carousel bergaya catatan pribadi memimpin jumlah save minggu ini", topic: "Founder-led storytelling", source: "Buffer Research", time: "5 jam lalu", read: "3 menit" },
  { title: "Uji coba balasan otomatis komentar ke DM diperluas ke lebih banyak akun", topic: "Otomasi komentar ke DM", source: "Instagram Newsroom", time: "9 jam lalu", read: "2 menit" },
];

function NewsPage() {
  return <main className="page-wrap">
    <header className="page-heading">
      <div><p className="eyebrow">Signal over noise</p><h1>Berita Instagram</h1><p>Tiga topik yang sedang viral dan berita terbarunya.</p></div>
      <span className="status-chip"><span /> Update 12 menit lalu</span>
    </header>

    <section>
      <p className="section-label mb-3">Topik viral</p>
      <div className="grid gap-4 md:grid-cols-3">
        {topics.map(item => <article key={item.rank} className="panel">
          <div className="mb-4 flex items-center justify-between">
            <span className="tiny-pill border-0"><Flame className="size-3 text-primary" /> {item.tag}</span>
            <span className="font-display text-sm text-muted-foreground">{item.rank}</span>
          </div>
          <h2 className="text-base! leading-snug">{item.topic}</h2>
          <p className="mt-3 text-xs font-semibold text-success">{item.growth} percakapan 7 hari terakhir</p>
        </article>)}
      </div>
    </section>

    <section className="mt-10">
      <p className="section-label mb-3">Berita terbaru</p>
      <div className="panel divide-y divide-border p-0">
        {articles.map(article => <article key={article.title} className="flex flex-wrap items-start justify-between gap-4 p-5">
          <div className="max-w-2xl">
            <span className="status-badge status-scheduled">{article.topic}</span>
            <h3 className="mt-3 text-sm font-semibold leading-6">{article.title}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{article.source} · {article.time} · {article.read} baca</p>
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground" />
        </article>)}
      </div>
    </section>
  </main>;
}
