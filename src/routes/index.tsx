import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Agent — Mira" },
      { name: "description", content: "Create Instagram campaigns, captions, reels, and carousels with Mira." },
      { property: "og:title", content: "AI Agent — Mira" },
      { property: "og:description", content: "Create high-performing Instagram content with an AI marketing agent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Message = { role: "user" | "agent"; text: string };

const DUMMY_RESPONSE =
  "Got it! Here's a first draft for your Instagram content:\n\n“Your next big idea doesn’t need a bigger to-do list. It needs a clearer first step. Save this for the day you’re ready to turn ‘someday’ into momentum.” ✨ #BuildInPublic #FounderLife";

function Index() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setShowScrollDown(false);
    }
  }, [messages]);

  function handleScroll() {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isFarFromBottom = scrollHeight - scrollTop - clientHeight > 80;
    setShowScrollDown(isFarFromBottom);
  }

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  function handleSend() {
    const text = prompt.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }, { role: "agent", text: DUMMY_RESPONSE }]);
    setPrompt("");
    setHasStarted(true);
  }

  return (
    <main
      className={`flex w-full px-4 pb-6 pt-24 ${
        hasStarted
          ? "h-dvh max-h-dvh flex-col overflow-hidden"
          : "min-h-[calc(100dvh-4rem)] flex-col items-center justify-center"
      }`}
    >
      {!hasStarted && (
        <div className="agent-hero relative w-full max-w-xl pb-10 text-center">
          <div className="agent-glow" aria-hidden="true" />
          <p className="eyebrow">AI marketing workspace</p>
          <h1>What are we creating today?</h1>
          <p>Turn a rough idea into ready-to-publish Instagram content.</p>
        </div>
      )}

      {hasStarted && (
        <div className="relative mx-auto flex w-full max-w-[840px] flex-1 min-h-0 flex-col">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 md:px-8 pb-4 flex flex-col gap-8"
          >
            {messages.map((message, index) =>
              message.role === "user" ? (
                <div key={index} className="flex w-full justify-end">
                  <span className="inline-block max-w-[80%] sm:max-w-[70%] rounded-2xl rounded-br-sm bg-primary px-5 py-3 text-left text-sm text-primary-foreground">
                    {message.text}
                  </span>
                </div>
              ) : (
                <div key={index} className="flex w-full justify-start">
                  <div className="max-w-[88%] sm:max-w-[82%] whitespace-pre-line text-sm leading-7 text-foreground">
                    {message.text}
                  </div>
                </div>
              )
            )}
          </div>

          {showScrollDown && (
            <button
              type="button"
              aria-label="Scroll to bottom"
              onClick={scrollToBottom}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-surface-raised shadow-md text-foreground transition-all hover:bg-muted"
            >
              <ArrowDown className="size-4" />
            </button>
          )}
        </div>
      )}

      <div className={`mx-auto w-full max-w-xl shrink-0 ${hasStarted ? "mt-auto pt-2" : ""}`}>
        <div className="flex items-end gap-2 rounded-3xl border border-border bg-surface-raised px-4 py-3 shadow-lg">
          <Textarea
            aria-label="Marketing request"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask Mira anything..."
            rows={1}
            className="min-h-[24px] max-h-32 flex-1 resize-none border-0 bg-transparent p-0 text-sm shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
          />
          <Button
            aria-label="Send request"
            size="icon"
            className="size-8 shrink-0 rounded-full"
            disabled={!prompt.trim()}
            onClick={handleSend}
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Mira may produce inaccurate marketing advice. Verify before publishing.
        </p>
      </div>
    </main>
  );
}
