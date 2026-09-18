import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SIGN_VOCABULARY } from "@/lib/sign-vocabulary";
import heroImage from "@/assets/signbridge-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SignBridge — A live ISL interpreter in every video call" },
      {
        name: "description",
        content:
          "250 interpreters for 18 million Deaf Indians. SignBridge turns Indian Sign Language into live captions and speech inside video calls, and speech back into sign cues.",
      },
      {
        property: "og:title",
        content: "SignBridge — A live ISL interpreter in every video call",
      },
      {
        property: "og:description",
        content:
          "Real-time Indian Sign Language translation for online classes, interviews, and meetings. Working browser prototype.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "18M", label: "profoundly Deaf Indians relying on ISL" },
  { value: "~250", label: "certified ISL interpreters in the country" },
  { value: "1 : 72,000", label: "interpreter to Deaf-person ratio" },
];

const steps = [
  {
    step: "01",
    title: "Camera reads the signing",
    body: "Hand and pose landmarks are tracked in the browser at video frame rate — no server round-trip, no upload.",
  },
  {
    step: "02",
    title: "Sign becomes caption and voice",
    body: "A lightweight classifier maps landmarks to a closed vocabulary, then speaks the phrase into the call for the hearing participant.",
  },
  {
    step: "03",
    title: "Speech comes back as cues",
    body: "The hearing side's speech is transcribed live and reduced to short, readable sign cues for the Deaf participant.",
  },
];

function Home() {
  return (
    <SiteShell>
      <section className="surface-veil border-b border-border/70">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent pulse-live" aria-hidden />
              Grand Hack IPEC 2026 · Phase-1 prototype
            </span>
            <h1 className="mt-6 text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
              250 interpreters for <span className="text-gradient-signal">18 million</span>{" "}
              Deaf Indians.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              SignBridge puts a live interpreter in every video call — signing becomes
              captions and speech, speech becomes sign cues, both directions in real time.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/call"
                className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                style={{ boxShadow: "var(--shadow-lift)" }}
              >
                Open the live prototype
              </Link>
              <Link
                to="/research"
                className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                Read the research
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Runs entirely in your browser. Camera frames never leave the device.
            </p>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Two hands mid-sign with glowing landmark tracking lines"
              width={1408}
              height={1008}
              className="w-full rounded-3xl border border-border object-cover"
              style={{ boxShadow: "var(--shadow-lift)" }}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-semibold text-primary sm:text-4xl">
                {s.value}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="panel p-6">
                <div className="font-display text-sm text-accent">{s.step}</div>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/70">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Phase-1 vocabulary, stated plainly
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            This is a closed vocabulary of high-frequency classroom and meeting intents —
            not open-vocabulary translation. Sentence-level ISL grammar is an open research
            problem and we do not claim to solve it.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {SIGN_VOCABULARY.map((s) => (
              <li
                key={s.phrase}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm"
              >
                <span aria-hidden className="text-lg">
                  {s.glyph}
                </span>
                {s.phrase}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div
            className="panel flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between"
            style={{ backgroundImage: "var(--gradient-veil)" }}
          >
            <div>
              <h2 className="text-2xl font-semibold">Try it with your own camera</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hold a sign for about a second and watch it land as a caption and a spoken
                phrase.
              </p>
            </div>
            <Link
              to="/call"
              className="rounded-lg bg-primary px-5 py-3 text-sm font-medium whitespace-nowrap text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start the call
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
