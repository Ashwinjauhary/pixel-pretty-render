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
      <div className="relative min-h-[calc(100vh-73px)] bg-[#050906] overflow-hidden font-sans text-slate-200">
        {/* Background Layer */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity scale-105"
          style={{ backgroundImage: "url('/gta_bg.jpg')" }}
        />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050906_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#050906] via-[#050906]/60 to-transparent pointer-events-none" />

        <div className="relative z-20 mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-pricedown lowercase text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] drop-shadow-[0_0_15px_rgba(76,175,80,0.4)]">live call prototype</h1>
              <p className="mt-4 max-w-2xl text-sm text-gray-300 font-light border-l-2 border-[#4CAF50]/50 pl-4">
                Face the camera, hold one of the Phase-1 signs steady for about a second, and
                it commits as a caption and a spoken phrase. Everything runs on this device.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={running ? sign.stop : sign.start}
                className="rounded-lg bg-gradient-to-r from-[#4CAF50] to-[#388E3C] text-black font-bank uppercase tracking-widest px-6 py-3 text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(76,175,80,0.5)] hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
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
                className="rounded-lg border border-[#FFC107]/30 bg-black/50 backdrop-blur text-[#FFC107] font-bank uppercase tracking-widest px-6 py-3 text-sm font-bold transition-all hover:bg-[#FFC107]/10 hover:shadow-[0_0_20px_rgba(255,193,7,0.3)] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                disabled={!speech.supported}
              >
                {speech.listening ? "Stop mic" : "Start mic"}
              </button>
            </div>
          </div>

          {sign.error && (
            <p className="mt-6 rounded-xl border border-red-500/50 bg-red-500/10 backdrop-blur px-4 py-3 text-sm text-red-200 font-medium">
              {sign.error}
            </p>
          )}

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
            {/* Camera stage */}
            <div className="panel overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="relative aspect-video bg-black/80">
                <video
                  ref={sign.videoRef}
                  playsInline
                  muted
                  className="size-full scale-x-[-1] object-cover"
                />

                {!running && (
                  <div className="absolute inset-0 grid place-items-center px-6 text-center">
                    <div>
                      <p className="font-bank text-2xl tracking-widest text-[#FFC107] uppercase drop-shadow-[0_0_10px_rgba(255,193,7,0.5)]">Camera is off</p>
                      <p className="mt-2 text-sm text-gray-400 font-light">
                        Start the camera to begin sign recognition. Frames stay in the
                        browser.
                      </p>
                    </div>
                  </div>
                )}

                {running && (
                  <>
                    <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-xs text-white backdrop-blur">
                      <span className="size-1.5 rounded-full bg-red-500 pulse-live shadow-[0_0_8px_rgba(239,68,68,0.8)]" aria-hidden />
                      <span className="font-bank tracking-wider uppercase text-[10px]">Recognizing</span>
                    </div>
                    <div className="absolute inset-x-4 bottom-4">
                      <div className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-bank text-xl tracking-wider text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                            {latest ? latest.entry.phrase : "Waiting for a sign…"}
                          </p>
                          {sign.live && (
                            <span className="text-xs text-[#FFC107] font-bold tracking-wider">
                              {sign.live.label} · {Math.round(sign.live.confidence * 100)}%
                            </span>
                          )}
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FFC107] to-[#4CAF50] transition-[width] duration-100 shadow-[0_0_10px_rgba(76,175,80,0.8)]"
                            style={{ width: `${Math.round(sign.dwell * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 bg-black/40">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300 font-light hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={autoSpeak}
                    onChange={(e) => setAutoSpeak(e.target.checked)}
                    className="size-4 accent-[#4CAF50]"
                  />
                  Speak recognized signs aloud
                </label>
                <button
                  onClick={() => {
                    sign.clear();
                    spokenCountRef.current = 0;
                  }}
                  className="text-xs text-gray-400 underline-offset-4 hover:text-[#FFC107] hover:underline transition-colors font-medium tracking-wide uppercase"
                >
                  Clear transcript
                </button>
              </div>
            </div>

            {/* Two-way transcript */}
            <div className="space-y-6">
              <div className="panel flex h-72 flex-col bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-black/40">
                  <h2 className="font-bank text-lg tracking-wide text-white uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Sign → speech</h2>
                  <span className="text-xs text-gray-400 font-bold bg-white/10 px-2 py-1 rounded">
                    {sign.detections.length} recognized
                  </span>
                </div>
                <div ref={signLogRef} className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
                  {sign.detections.length === 0 ? (
                    <p className="text-sm text-gray-500 font-light italic">
                      Recognized signs will appear here as they commit.
                    </p>
                  ) : (
                    sign.detections
                      .slice()
                      .reverse()
                      .map((d) => (
                        <div
                          key={`${d.at}-${d.entry.phrase}`}
                          className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm transition-all hover:bg-white/10 hover:border-[#4CAF50]/30"
                        >
                          <span aria-hidden className="text-xl drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                            {d.entry.glyph}
                          </span>
                          <span className="flex-1 font-medium text-gray-200">{d.entry.phrase}</span>
                          <span className="text-xs text-gray-500">{timeOf(d.at)}</span>
                        </div>
                      ))
                  )}
                </div>
              </div>

              <div className="panel flex h-72 flex-col bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-black/40">
                  <h2 className="font-bank text-lg tracking-wide text-white uppercase drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">Speech → sign cues</h2>
                  <span className="text-xs text-gray-400 font-bold bg-white/10 px-2 py-1 rounded">
                    {speech.listening ? <span className="text-[#4CAF50]">Listening</span> : "Mic off"}
                  </span>
                </div>
                <div ref={speechLogRef} className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
                  {!speech.supported && (
                    <p className="text-sm text-red-400/80 font-light border-l-2 border-red-500/50 pl-3">
                      This browser has no live speech recognition. Chrome or Edge is needed
                      for the speech direction.
                    </p>
                  )}
                  {speech.supported && speech.lines.length === 0 && !speech.interim && (
                    <p className="text-sm text-gray-500 font-light italic">
                      Start the mic and speak — the transcript and its sign cues appear here.
                    </p>
                  )}
                  {speech.lines
                    .slice()
                    .reverse()
                    .map((line) => (
                      <div key={line.id} className="rounded-lg border border-white/5 bg-white/5 px-3 py-2 transition-all hover:bg-white/10">
                        <p className="text-sm text-gray-200">{line.text}</p>
                        {line.cues.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {line.cues.map((c) => (
                              <span
                                key={c.phrase}
                                className="flex items-center gap-1.5 rounded-full border border-[#FFC107]/20 bg-[#FFC107]/10 px-2.5 py-1 text-xs text-[#FFC107] font-medium"
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
                    <p className="px-1 text-sm text-gray-400 italic">
                      {speech.interim}…
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="font-bank text-2xl tracking-wider text-[#4CAF50] uppercase mb-8 flex items-center gap-3 drop-shadow-[0_0_8px_rgba(76,175,80,0.4)]">
              Phase-1 vocabulary reference
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SIGN_VOCABULARY.map((s) => (
                <li key={s.phrase} className="panel flex items-center gap-4 px-5 py-4 text-sm bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#4CAF50]/50 hover:bg-black/60 transition-all hover:scale-[1.02] shadow-lg">
                  <span aria-hidden className="text-3xl text-[#FFC107] drop-shadow-[0_0_8px_rgba(255,193,7,0.5)]">
                    {s.glyph}
                  </span>
                  <span className="font-medium text-gray-200">{s.phrase}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-gray-500 font-light max-w-2xl border-l-2 border-white/10 pl-3">
              Recognition quality drops in low light or with a busy background — keep a plain
              background and both hands visible for the steadiest results.
            </p>
          </section>
        </div>
      </div>
    </SiteShell>
  );
}
