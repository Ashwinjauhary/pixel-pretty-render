import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as SiteShell } from "./site-shell-FljmJfZX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/research-hiz7gXNQ.js
var import_jsx_runtime = require_jsx_runtime();
var datasets = [
	{
		name: "INCLUDE",
		offers: "263 isolated ISL signs, 7 signers",
		relevance: "Right size for a closed-vocabulary MVP"
	},
	{
		name: "CISLR (EMNLP 2022)",
		offers: "7,050 videos, ~4,765 sign words",
		relevance: "Broad vocabulary, few samples per class — suits similarity matching"
	},
	{
		name: "AI4Bharat ISL Corpus (IIT Madras)",
		offers: "~56GB labeled gesture video",
		relevance: "Credible Indian-origin, large-scale training source"
	},
	{
		name: "ISL fingerspelling sets",
		offers: "14,000–42,000+ images, 35 classes (A–Z, 0–9)",
		relevance: "Fingerspelling fallback when word recognition underperforms"
	},
	{
		name: "Open-source reference pipeline",
		offers: "MediaPipe + MobileNetV2, 35-class real-time recognition",
		relevance: "Independent proof the live pipeline works — de-risks feasibility"
	}
];
var pipeline = [
	"MediaPipe Hands + Pose for real-time landmark extraction in the browser",
	"Lightweight landmark-sequence classifier over the closed vocabulary — not a transformer",
	"Recognized text injected as live captions plus Web Speech API text-to-speech",
	"Reverse direction: speech-to-text reduced to short sign cues, no avatar overclaim"
];
var users = [
	"Deaf and hard-of-hearing students in mainstream colleges attending online classes",
	"Deaf professionals in remote and hybrid interviews and meetings",
	"Institutions and ed-tech platforms with accessibility obligations",
	"Long-term: an SDK layer inside any video-conferencing platform"
];
var model = [
	{
		stream: "B2B SaaS (primary)",
		detail: "Per-seat and per-institution licensing to colleges, ed-tech platforms, and corporate L&D teams"
	},
	{
		stream: "API / SDK licensing",
		detail: "Recognition engine as a plug-in for Zoom Apps and Google Meet add-ons"
	},
	{
		stream: "Freemium consumer tier",
		detail: "Free closed vocabulary for individuals; paid expanded vocabulary"
	},
	{
		stream: "Government & CSR",
		detail: "ISLRTC, Ministry of Social Justice and Empowerment, and disability-inclusion CSR budgets as anchor partners"
	},
	{
		stream: "Compliance hook",
		detail: "Positioned against tightening digital-accessibility norms under the RPwD Act, 2016"
	}
];
var risks = [
	"Closed vocabulary is not ISL fluency — this is stated as Phase 1, not sold as a complete solution.",
	"Live camera recognition varies with lighting and background; a recorded fallback clip is kept ready for demos.",
	"Sentence-level ISL grammar differs from English word order and remains an open research problem."
];
function ResearchPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-veil border-b border-border/70",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-5 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold sm:text-4xl",
				children: "Research & feasibility"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "India codified its ISL dictionary only in 2017. The tooling around the language is genuinely young — this is an underserved gap, not a solved problem being re-pitched."
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-14 px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Data landscape"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "ISL data is less scarce than usually assumed. Several public, citable datasets exist; the hard part in the literature is open-vocabulary sentence translation, which we deliberately avoid in Phase 1."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 overflow-hidden rounded-2xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface text-xs tracking-wide text-muted-foreground uppercase",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Resource"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "What it offers"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Relevance"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: datasets.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border align-top",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-medium",
									children: d.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: d.offers
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: d.relevance
								})
							]
						}, d.name)) })]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "Pipeline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 space-y-3",
				children: pipeline.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "panel flex gap-4 p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-accent",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: p
					})]
				}, p))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-10 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Target users"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3 text-sm text-muted-foreground",
					children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "mt-2 size-1.5 shrink-0 rounded-full bg-primary"
						}), u]
					}, u))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Expected impact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "mt-2 size-1.5 shrink-0 rounded-full bg-accent"
							}), "Addresses a government-acknowledged interpreter shortage head-on"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "mt-2 size-1.5 shrink-0 rounded-full bg-accent"
							}), "Opens remote education and work that is otherwise structurally inaccessible"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "mt-2 size-1.5 shrink-0 rounded-full bg-accent"
							}), "Aligns with digital-accessibility duties under the RPwD Act, 2016"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "mt-2 size-1.5 shrink-0 rounded-full bg-accent"
							}), "Scales from closed vocabulary to regional ISL variation to a platform SDK"]
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "Business model"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-4 sm:grid-cols-2",
				children: model.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						children: m.stream
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: m.detail
					})]
				}, m.stream))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: "What we do not claim"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: risks.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground",
					children: r
				}, r))
			})] })
		]
	})] });
}
//#endregion
export { ResearchPage as component };
