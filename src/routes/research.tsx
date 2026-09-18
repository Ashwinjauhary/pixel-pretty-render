import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & feasibility — SignBridge ISL translator" },
      {
        name: "description",
        content:
          "Datasets, pipeline, target users, business model, and honest risk disclosure behind SignBridge's real-time Indian Sign Language translation prototype.",
      },
      { property: "og:title", content: "Research & feasibility — SignBridge" },
      {
        property: "og:description",
        content:
          "ISL datasets, the MediaPipe-to-classifier pipeline, market model, and the limits we state openly.",
      },
    ],
  }),
  component: ResearchPage,
});

const datasets = [
  {
    name: "INCLUDE",
    offers: "263 isolated ISL signs, 7 signers",
    relevance: "Right size for a closed-vocabulary MVP",
  },
  {
    name: "CISLR (EMNLP 2022)",
    offers: "7,050 videos, ~4,765 sign words",
    relevance: "Broad vocabulary, few samples per class — suits similarity matching",
  },
  {
    name: "AI4Bharat ISL Corpus (IIT Madras)",
    offers: "~56GB labeled gesture video",
    relevance: "Credible Indian-origin, large-scale training source",
  },
  {
    name: "ISL fingerspelling sets",
    offers: "14,000–42,000+ images, 35 classes (A–Z, 0–9)",
    relevance: "Fingerspelling fallback when word recognition underperforms",
  },
  {
    name: "Open-source reference pipeline",
    offers: "MediaPipe + MobileNetV2, 35-class real-time recognition",
    relevance: "Independent proof the live pipeline works — de-risks feasibility",
  },
];

const pipeline = [
  "MediaPipe Hands + Pose for real-time landmark extraction in the browser",
  "Lightweight landmark-sequence classifier over the closed vocabulary — not a transformer",
  "Recognized text injected as live captions plus Web Speech API text-to-speech",
  "Reverse direction: speech-to-text reduced to short sign cues, no avatar overclaim",
];

const users = [
  "Deaf and hard-of-hearing students in mainstream colleges attending online classes",
  "Deaf professionals in remote and hybrid interviews and meetings",
  "Institutions and ed-tech platforms with accessibility obligations",
  "Long-term: an SDK layer inside any video-conferencing platform",
];

const model = [
  {
    stream: "B2B SaaS (primary)",
    detail:
      "Per-seat and per-institution licensing to colleges, ed-tech platforms, and corporate L&D teams",
  },
  {
    stream: "API / SDK licensing",
    detail: "Recognition engine as a plug-in for Zoom Apps and Google Meet add-ons",
  },
  {
    stream: "Freemium consumer tier",
    detail: "Free closed vocabulary for individuals; paid expanded vocabulary",
  },
  {
    stream: "Government & CSR",
    detail:
      "ISLRTC, Ministry of Social Justice and Empowerment, and disability-inclusion CSR budgets as anchor partners",
  },
  {
    stream: "Compliance hook",
    detail:
      "Positioned against tightening digital-accessibility norms under the RPwD Act, 2016",
  },
];

const risks = [
  "Closed vocabulary is not ISL fluency — this is stated as Phase 1, not sold as a complete solution.",
  "Live camera recognition varies with lighting and background; a recorded fallback clip is kept ready for demos.",
  "Sentence-level ISL grammar differs from English word order and remains an open research problem.",
];

function ResearchPage() {
  return (
    <SiteShell>
      <div className="surface-veil border-b border-border/70">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <h1 className="text-3xl font-semibold sm:text-4xl">Research & feasibility</h1>
          <p className="mt-4 text-muted-foreground">
            India codified its ISL dictionary only in 2017. The tooling around the language
            is genuinely young — this is an underserved gap, not a solved problem being
            re-pitched.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-14 px-5 py-16">
        <section>
          <h2 className="text-xl font-semibold">Data landscape</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            ISL data is less scarce than usually assumed. Several public, citable datasets
            exist; the hard part in the literature is open-vocabulary sentence translation,
            which we deliberately avoid in Phase 1.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-4 py-3">Resource</th>
                  <th className="px-4 py-3">What it offers</th>
                  <th className="px-4 py-3">Relevance</th>
                </tr>
              </thead>
              <tbody>
                {datasets.map((d) => (
                  <tr key={d.name} className="border-t border-border align-top">
                    <td className="px-4 py-3 font-medium">{d.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.offers}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Pipeline</h2>
          <ol className="mt-5 space-y-3">
            {pipeline.map((p, i) => (
              <li key={p} className="panel flex gap-4 p-4 text-sm">
                <span className="font-display text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-muted-foreground">{p}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Target users</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {users.map((u) => (
                <li key={u} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Expected impact</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                Addresses a government-acknowledged interpreter shortage head-on
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                Opens remote education and work that is otherwise structurally inaccessible
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                Aligns with digital-accessibility duties under the RPwD Act, 2016
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                Scales from closed vocabulary to regional ISL variation to a platform SDK
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Business model</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {model.map((m) => (
              <div key={m.stream} className="panel p-5">
                <h3 className="text-sm font-semibold">{m.stream}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold">What we do not claim</h2>
          <ul className="mt-4 space-y-3">
            {risks.map((r) => (
              <li
                key={r}
                className="rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground"
              >
                {r}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SiteShell>
  );
}
