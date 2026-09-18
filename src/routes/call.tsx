import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { useSignRecognizer } from "@/hooks/useSignRecognizer";
import { useSpeechChannel } from "@/hooks/useSpeechChannel";
import { SIGN_VOCABULARY } from "@/lib/sign-vocabulary";

export const Route = createFileRoute("/call")({
  head: () => ({
    meta: [
      { title: "Live prototype — SignBridge in-call ISL translation" },
      {
        name: "description",
        content:
          "Run the SignBridge prototype in your browser: hold a sign to turn it into a live caption and spoken phrase, and see speech come back as sign cues.",
      },
      { property: "og:title", content: "Live prototype — SignBridge" },
      {
        property: "og:description",
        content:
          "Browser-only Indian Sign Language recognition demo with two-way captions and speech.",
      },
    ],
  }),
  component: CallPage,
});

function timeOf(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function CallPage() {
  const sign = useSignRecognizer();
  const speech = useSpeechChannel();
  const [autoSpeak, setAutoSpeak] = useState(true);
  const spokenCountRef = useRef(0);
  const signLogRef = useRef<HTMLDivElement | null>(null);
  const speechLogRef = useRef<HTMLDivElement | null>(null);

  // Speak each newly committed sign once.
  useEffect(() => {
    if (sign.detections.length > spokenCountRef.current) {
      const latest = sign.detections[sign.detections.length - 1];
      if (autoSpeak && latest) speech.speak(latest.entry.phrase);
      spokenCountRef.current = sign.detections.length;
    }
  }, [sign.detections, autoSpeak, speech]);

  useEffect(() => {
    signLogRef.current?.scrollTo({ top: signLogRef.current.scrollHeight });
  }, [sign.detections.length]);

  useEffect(() => {
    speechLogRef.current?.scrollTo({ top: speechLogRef.current.scrollHeight });
  }, [speech.lines.length]);

  const running = sign.status === "running";
  const latest = sign.detections[sign.detections.length - 1];

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold sm:text-3xl">Live call prototype</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Face the camera, hold one of the Phase-1 signs steady for about a second, and
              it commits as a caption and a spoken phrase. Everything runs on this device.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={running ? sign.stop : sign.start}
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              disabled={sign.status === "loading"}
            >
              {sign.status === "loading"
                ? "Loading model…"
                : running
                  ? "Stop camera"
                  : "Start camera"}
            </button>
            <button
              onClick={speech.listening ? speech.stopListening : speech.startListening}
              className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface disabled:opacity-50"
              disabled={!speech.supported}
            >
              {speech.listening ? "Stop mic" : "Start mic"}
            </button>
          </div>
        </div>

        {sign.error && (
          <p className="mt-6 rounded-xl border border-destructive/50 bg-destructive/15 px-4 py-3 text-sm text-foreground">
            {sign.error}
          </p>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Camera stage */}
          <div className="panel overflow-hidden">
            <div className="relative aspect-video bg-surface">
              <video
                ref={sign.videoRef}
                playsInline
                muted
                className="size-full scale-x-[-1] object-cover"
              />

              {!running && (
                <div className="absolute inset-0 grid place-items-center px-6 text-center">
                  <div>
                    <p className="font-display text-lg font-semibold">Camera is off</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Start the camera to begin sign recognition. Frames stay in the
                      browser.
                    </p>
                  </div>
                </div>
              )}

              {running && (
                <>
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-background/75 px-3 py-1.5 text-xs backdrop-blur">
                    <span className="size-1.5 rounded-full bg-signal pulse-live" aria-hidden />
                    Recognizing
                  </div>
                  <div className="absolute inset-x-4 bottom-4">
                    <div className="rounded-xl bg-background/80 px-4 py-3 backdrop-blur">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-display text-lg font-semibold">
                          {latest ? latest.entry.phrase : "Waiting for a sign…"}
                        </p>
                        {sign.live && (
                          <span className="text-xs text-muted-foreground">
                            {sign.live.label} · {Math.round(sign.live.confidence * 100)}%
                          </span>
                        )}
                      </div>
                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-accent transition-[width] duration-100"
                          style={{ width: `${Math.round(sign.dwell * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={autoSpeak}
                  onChange={(e) => setAutoSpeak(e.target.checked)}
                  className="size-4 accent-[var(--color-primary)]"
                />
                Speak recognized signs aloud
              </label>
              <button
                onClick={() => {
                  sign.clear();
                  spokenCountRef.current = 0;
                }}
                className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Clear transcript
              </button>
            </div>
          </div>

          {/* Two-way transcript */}
          <div className="space-y-6">
            <div className="panel flex h-72 flex-col">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <h2 className="text-sm font-semibold">Sign → speech</h2>
                <span className="text-xs text-muted-foreground">
                  {sign.detections.length} recognized
                </span>
              </div>
              <div ref={signLogRef} className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
                {sign.detections.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Recognized signs will appear here as they commit.
                  </p>
                ) : (
                  sign.detections
                    .slice()
                    .reverse()
                    .map((d) => (
                      <div
                        key={`${d.at}-${d.entry.phrase}`}
                        className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2 text-sm"
                      >
                        <span aria-hidden className="text-lg">
                          {d.entry.glyph}
                        </span>
                        <span className="flex-1 font-medium">{d.entry.phrase}</span>
                        <span className="text-xs text-muted-foreground">{timeOf(d.at)}</span>
                      </div>
                    ))
                )}
              </div>
            </div>

            <div className="panel flex h-72 flex-col">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <h2 className="text-sm font-semibold">Speech → sign cues</h2>
                <span className="text-xs text-muted-foreground">
                  {speech.listening ? "Listening" : "Mic off"}
                </span>
              </div>
              <div ref={speechLogRef} className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
                {!speech.supported && (
                  <p className="text-sm text-muted-foreground">
                    This browser has no live speech recognition. Chrome or Edge is needed
                    for the speech direction.
                  </p>
                )}
                {speech.supported && speech.lines.length === 0 && !speech.interim && (
                  <p className="text-sm text-muted-foreground">
                    Start the mic and speak — the transcript and its sign cues appear here.
                  </p>
                )}
                {speech.lines
                  .slice()
                  .reverse()
                  .map((line) => (
                    <div key={line.id} className="rounded-lg bg-surface px-3 py-2">
                      <p className="text-sm">{line.text}</p>
                      {line.cues.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {line.cues.map((c) => (
                            <span
                              key={c.phrase}
                              className="flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-xs text-accent"
                            >
                              <span aria-hidden>{c.glyph}</span>
                              {c.phrase}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                {speech.interim && (
                  <p className="px-1 text-sm text-muted-foreground italic">
                    {speech.interim}…
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-semibold">Phase-1 vocabulary reference</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SIGN_VOCABULARY.map((s) => (
              <li key={s.phrase} className="panel flex items-center gap-3 px-4 py-3 text-sm">
                <span aria-hidden className="text-2xl">
                  {s.glyph}
                </span>
                <span>{s.phrase}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Recognition quality drops in low light or with a busy background — keep a plain
            background and both hands visible for the steadiest results.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
