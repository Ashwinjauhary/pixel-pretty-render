# SignBridge — Deep Research Report
### Real-Time ISL Translator for Video Calls | Grand Hack IPEC 2026

---

## 1. Problem Statement

India has an estimated **63 million** people with significant hearing impairment (~6.3% of population), and within that, an estimated **18 million profoundly Deaf** individuals who rely on Indian Sign Language (ISL) as their primary language. Against this population, India has only **~250 trained/certified ISL interpreters** — a ratio of roughly **1 interpreter per 72,000 Deaf people**.

This gap shows up acutely in everyday digital communication: video calls (Zoom/Meet), online classes, and remote interviews have no real-time ISL support. Captions require literacy in written English/Hindi, which is not the same as fluency in ISL (a distinct visual-grammar language, not "signed English"). The result: Deaf students and professionals are structurally excluded from remote-first education and work — a gap that widened, not shrank, after the shift to hybrid/remote formats.

**Compounding factor:** India only formally codified an ISL dictionary in 2017 (via ISLRTC, under the Ministry of Social Justice and Empowerment) — the infrastructure for ISL-tech is genuinely young, meaning this is a real, current, underserved gap rather than a solved problem being re-pitched.

---

## 2. Solution

A real-time, in-call ISL↔speech/text translation layer that plugs into video calls:

- **Sign → Speech/Text:** Camera captures the Deaf participant's signing; the system recognizes gestures and injects live captions/speech into the call for the other participant.
- **Speech → Sign cue:** The hearing participant's speech is transcribed and shown as text/simplified cues to the Deaf participant (full photorealistic avatar generation is out of scope for a 24-hour build — flagged honestly below).

**Explicit Phase-1 MVP scope (this is the credibility move for judges):** a closed vocabulary of ~20–35 high-frequency academic/professional ISL signs (hello, yes, no, help, question, thank you, wait, understood, repeat, etc.) — not open-vocabulary translation. This mirrors how real published ISL research scopes itself (see Section 3).

---

## 3. Approach & Technical Feasibility (research-backed)

This is the part most teams get wrong by guessing. Actual research landscape as of 2026:

| Resource | What it offers | Relevance |
|---|---|---|
| **INCLUDE dataset** | 263 isolated ISL signs, 7 signers | Good size for a closed-vocabulary MVP |
| **CISLR (EMNLP 2022)** | 7,050 videos, ~4,765 sign words | Larger vocabulary, but low samples/class (better for one-shot/similarity matching, not deep classifiers) |
| **AI4Bharat ISL Corpus (IIT Madras)** | ~56GB labeled gesture videos | Credible Indian-origin, large-scale source — *namedrop this in the PPT*, it signals real research literacy |
| **ISL fingerspelling sets (IEEE DataPort, arXiv)** | 14,000–42,000+ images across 35 classes (A–Z, 0–9) | Well-suited for a fingerspelling fallback mode if full-word recognition underperforms live |
| **Existing open-source reference implementation** | MediaPipe + MobileNetV2/ResNet, 35-class real-time recognition (GitHub, ThrisheiyanUK) | Proves the exact pipeline (MediaPipe landmarks → lightweight CNN → live translation) is already demonstrated to work in real-time by independent developers — **this directly de-risks your feasibility claim** |

**Key correction to earlier assumption:** ISL data is *not* as scarce as commonly assumed — multiple public, citable datasets exist. The actual hard problem in published literature is **sentence-level, open-vocabulary, cross-lingual translation** (grammar reordering, regional variation) — which is exactly why you should NOT attempt that scope, and should explicitly scope down to isolated-word/closed-vocabulary recognition, which is a solved-enough pattern to build in 24 hours.

**Recommended pipeline:**
1. MediaPipe Hands + Pose → landmark extraction (real-time, browser/edge-capable)
2. Lightweight classifier (MobileNetV2 or a simple landmark-sequence classifier, not a full transformer) trained/fine-tuned on the closed vocabulary
3. WebRTC data channel → inject recognized text as live caption + Web Speech API for TTS
4. Reverse direction: Web Speech API (speech-to-text) → simple text/icon cue display (avoid overpromising sign-avatar generation)

---

## 4. Tech Stack

- **Frontend/Call layer:** Next.js + WebRTC (your proven strength)
- **Gesture pipeline:** MediaPipe Hands/Pose (browser-based, no server round-trip needed for landmarks)
- **Classifier:** TensorFlow.js (client-side inference — no heavy backend, faster demo, lower latency)
- **Speech layer:** Web Speech API (STT + TTS, no external API dependency/cost)
- **Backend (optional, for logging/session state):** FastAPI + Supabase

---

## 5. Target Users

- Deaf/hard-of-hearing students in mainstream (non-ISL-medium) colleges attending online classes
- Deaf professionals in remote/hybrid interviews and meetings
- Educational institutions and ed-tech platforms seeking accessibility compliance
- Long-term: any video-conferencing platform (Zoom/Meet/Teams) as an SDK/plugin layer

---

## 6. Expected Impact

- Directly addresses a documented, government-acknowledged interpreter shortage (250 interpreters : 18M Deaf population)
- Enables participation in remote education/work that is otherwise structurally inaccessible
- Aligns with India's Rights of Persons with Disabilities Act, 2016 (digital accessibility obligations) — a strong "policy relevance" point for judges
- Scalable path: closed-vocabulary MVP → expanded vocabulary → regional ISL variation support → SDK for any video platform

---

## 7. Business Model

| Stream | Description |
|---|---|
| **B2B SaaS (primary)** | Per-seat/per-institution licensing to colleges, ed-tech platforms, and corporate L&D/HR teams for accessibility compliance |
| **API/SDK licensing** | License the recognition engine as a plug-in module to existing video platforms (Zoom Apps marketplace, Google Meet add-ons) |
| **Freemium consumer tier** | Free closed-vocabulary tier for individual users; paid tier for expanded vocabulary / multi-language sign support |
| **Government/CSR partnerships** | ISLRTC, Ministry of Social Justice and Empowerment, and corporate CSR accessibility mandates (many large Indian companies have disability-inclusion CSR budgets) as anchor customers/grants |
| **Compliance angle (strong monetization hook)** | Position as an accessibility-compliance tool — increasingly relevant as digital accessibility norms tighten (CAG's 2023 report already flagged <15% government website compliance, indicating regulatory pressure is building) |

---

## 8. Honest Risk Disclosure (for the PPT's credibility)

- Closed-vocabulary ≠ full ISL fluency — must be stated explicitly as Phase 1 scope, not undersold as "complete solution"
- Live camera recognition has real-world variance (lighting/background) — keep a pre-recorded fallback clip ready for the stage demo
- Sentence-level grammar translation (true ISL, which has different word order from English) is a known hard research problem — do not claim to solve this in the MVP

---

## 9. One-Line Pitch for the PPT Title Slide

*"250 interpreters for 18 million Deaf Indians — SignBridge puts a live interpreter in every video call."*
