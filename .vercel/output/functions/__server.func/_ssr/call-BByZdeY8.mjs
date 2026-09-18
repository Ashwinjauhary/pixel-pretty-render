import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as SiteShell } from "./site-shell-FljmJfZX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/call-BByZdeY8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Phase-1 closed vocabulary. The prototype maps a pretrained hand-gesture
* classifier onto high-frequency academic/professional ISL intents.
* This is deliberately NOT open-vocabulary translation.
*/
var SIGN_VOCABULARY = [
	{
		gesture: "Open_Palm",
		phrase: "Hello",
		glyph: "✋"
	},
	{
		gesture: "Thumb_Up",
		phrase: "Yes / Understood",
		glyph: "👍"
	},
	{
		gesture: "Thumb_Down",
		phrase: "No",
		glyph: "👎"
	},
	{
		gesture: "Victory",
		phrase: "Thank you",
		glyph: "✌️"
	},
	{
		gesture: "Closed_Fist",
		phrase: "Please wait",
		glyph: "✊"
	},
	{
		gesture: "ILoveYou",
		phrase: "I need help",
		glyph: "🤟"
	},
	{
		gesture: "Pointing_Up",
		phrase: "I have a question",
		glyph: "☝️"
	}
];
var GESTURE_TO_ENTRY = new Map(SIGN_VOCABULARY.map((s) => [s.gesture, s]));
/** Simplified cue keywords for the speech → sign direction. */
var SPEECH_CUES = [
	{
		match: /\b(hello|hi|hey|good morning)\b/i,
		phrase: "Greeting",
		glyph: "✋"
	},
	{
		match: /\b(yes|correct|right|okay|ok)\b/i,
		phrase: "Yes",
		glyph: "👍"
	},
	{
		match: /\b(no|not|don't|incorrect)\b/i,
		phrase: "No",
		glyph: "👎"
	},
	{
		match: /\b(question|ask|why|what|how)\b/i,
		phrase: "Question",
		glyph: "☝️"
	},
	{
		match: /\b(wait|hold|one moment|pause)\b/i,
		phrase: "Wait",
		glyph: "✊"
	},
	{
		match: /\b(thank|thanks)\b/i,
		phrase: "Thank you",
		glyph: "✌️"
	},
	{
		match: /\b(help|support|assist)\b/i,
		phrase: "Help",
		glyph: "🤟"
	},
	{
		match: /\b(understand|understood|clear)\b/i,
		phrase: "Understood",
		glyph: "👌"
	}
];
function cuesForTranscript(text) {
	return SPEECH_CUES.filter((c) => c.match.test(text));
}
var WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";
var MODEL_URL = "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";
/** Hold a gesture for this long before it commits as a recognized sign. */
var DWELL_MS = 700;
var MIN_CONFIDENCE = .6;
/** Same sign cannot re-fire faster than this. */
var COOLDOWN_MS = 1600;
function useSignRecognizer() {
	const videoRef = (0, import_react.useRef)(null);
	const recognizerRef = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const candidateRef = (0, import_react.useRef)(null);
	const lastCommitRef = (0, import_react.useRef)(null);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)(null);
	const [live, setLive] = (0, import_react.useState)(null);
	const [dwell, setDwell] = (0, import_react.useState)(0);
	const [detections, setDetections] = (0, import_react.useState)([]);
	const stop = (0, import_react.useCallback)(() => {
		if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
		rafRef.current = null;
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
		if (videoRef.current) videoRef.current.srcObject = null;
		candidateRef.current = null;
		setLive(null);
		setDwell(0);
		setStatus((s) => s === "error" ? s : "ready");
	}, []);
	(0, import_react.useEffect)(() => () => stop(), [stop]);
	const loop = (0, import_react.useCallback)(() => {
		const video = videoRef.current;
		const recognizer = recognizerRef.current;
		if (!video || !recognizer || video.readyState < 2) {
			rafRef.current = requestAnimationFrame(loop);
			return;
		}
		try {
			const top = recognizer.recognizeForVideo(video, performance.now())?.gestures?.[0]?.[0];
			const now = performance.now();
			if (top && top.score >= MIN_CONFIDENCE && GESTURE_TO_ENTRY.has(top.categoryName)) {
				const entry = GESTURE_TO_ENTRY.get(top.categoryName);
				setLive({
					label: entry.phrase,
					confidence: top.score
				});
				const candidate = candidateRef.current;
				if (!candidate || candidate.gesture !== top.categoryName) {
					candidateRef.current = {
						gesture: top.categoryName,
						since: now
					};
					setDwell(0);
				} else {
					const held = now - candidate.since;
					setDwell(Math.min(1, held / DWELL_MS));
					const last = lastCommitRef.current;
					const cooling = last && last.gesture === top.categoryName && now - last.at < COOLDOWN_MS;
					if (held >= DWELL_MS && !cooling) {
						lastCommitRef.current = {
							gesture: top.categoryName,
							at: now
						};
						candidateRef.current = {
							gesture: top.categoryName,
							since: now
						};
						setDwell(0);
						setDetections((prev) => [...prev.slice(-40), {
							entry,
							confidence: top.score,
							at: Date.now()
						}]);
					}
				}
			} else {
				candidateRef.current = null;
				setLive(null);
				setDwell(0);
			}
		} catch {}
		rafRef.current = requestAnimationFrame(loop);
	}, []);
	return {
		videoRef,
		status,
		error,
		live,
		dwell,
		detections,
		start: (0, import_react.useCallback)(async () => {
			setError(null);
			try {
				if (!recognizerRef.current) {
					setStatus("loading");
					const vision = await import("../_libs/mediapipe__tasks-vision.mjs").then((n) => n.t);
					const fileset = await vision.FilesetResolver.forVisionTasks(WASM_BASE);
					recognizerRef.current = await vision.GestureRecognizer.createFromOptions(fileset, {
						baseOptions: {
							modelAssetPath: MODEL_URL,
							delegate: "GPU"
						},
						runningMode: "VIDEO",
						numHands: 1
					});
				}
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						width: 960,
						height: 720,
						facingMode: "user"
					},
					audio: false
				});
				streamRef.current = stream;
				const video = videoRef.current;
				if (!video) throw new Error("Camera view not mounted");
				video.srcObject = stream;
				await video.play();
				setStatus("running");
				rafRef.current = requestAnimationFrame(loop);
			} catch (e) {
				const message = e instanceof Error ? e.message : "Could not start the camera";
				setError(/permission|denied|notallowed/i.test(message) ? "Camera access was blocked. Allow the camera and try again." : message);
				setStatus("error");
				stop();
			}
		}, [loop, stop]),
		stop,
		clear: (0, import_react.useCallback)(() => setDetections([]), [])
	};
}
/** Speech → text (hearing side) + text → speech (sign side) via Web Speech API. */
function useSpeechChannel() {
	const recognitionRef = (0, import_react.useRef)(null);
	const idRef = (0, import_react.useRef)(0);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [supported, setSupported] = (0, import_react.useState)(true);
	const [interim, setInterim] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
		setSupported(Boolean(Ctor));
	}, []);
	const stopListening = (0, import_react.useCallback)(() => {
		try {
			recognitionRef.current?.stop();
		} catch {}
		recognitionRef.current = null;
		setListening(false);
		setInterim("");
	}, []);
	const startListening = (0, import_react.useCallback)(() => {
		const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!Ctor) {
			setSupported(false);
			return;
		}
		const recognition = new Ctor();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = "en-IN";
		recognition.onresult = (event) => {
			let pending = "";
			for (let i = event.resultIndex; i < event.results.length; i += 1) {
				const result = event.results[i];
				const text = String(result[0].transcript).trim();
				if (!text) continue;
				if (result.isFinal) {
					idRef.current += 1;
					const cues = cuesForTranscript(text).map((c) => ({
						phrase: c.phrase,
						glyph: c.glyph
					}));
					setLines((prev) => [...prev.slice(-30), {
						id: idRef.current,
						text,
						cues,
						at: Date.now()
					}]);
				} else pending = text;
			}
			setInterim(pending);
		};
		recognition.onerror = () => stopListening();
		recognition.onend = () => setListening(false);
		recognition.start();
		recognitionRef.current = recognition;
		setListening(true);
	}, [stopListening]);
	(0, import_react.useEffect)(() => () => stopListening(), [stopListening]);
	return {
		listening,
		supported,
		interim,
		lines,
		startListening,
		stopListening,
		speak: (0, import_react.useCallback)((text) => {
			if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = "en-IN";
			utterance.rate = 1;
			window.speechSynthesis.speak(utterance);
		}, []),
		clear: (0, import_react.useCallback)(() => setLines([]), [])
	};
}
function timeOf(ts) {
	return new Date(ts).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	});
}
function CallPage() {
	const sign = useSignRecognizer();
	const speech = useSpeechChannel();
	const [autoSpeak, setAutoSpeak] = (0, import_react.useState)(true);
	const spokenCountRef = (0, import_react.useRef)(0);
	const signLogRef = (0, import_react.useRef)(null);
	const speechLogRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (sign.detections.length > spokenCountRef.current) {
			const latest = sign.detections[sign.detections.length - 1];
			if (autoSpeak && latest) speech.speak(latest.entry.phrase);
			spokenCountRef.current = sign.detections.length;
		}
	}, [
		sign.detections,
		autoSpeak,
		speech
	]);
	(0, import_react.useEffect)(() => {
		signLogRef.current?.scrollTo({ top: signLogRef.current.scrollHeight });
	}, [sign.detections.length]);
	(0, import_react.useEffect)(() => {
		speechLogRef.current?.scrollTo({ top: speechLogRef.current.scrollHeight });
	}, [speech.lines.length]);
	const running = sign.status === "running";
	const latest = sign.detections[sign.detections.length - 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold sm:text-3xl",
					children: "Live call prototype"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: "Face the camera, hold one of the Phase-1 signs steady for about a second, and it commits as a caption and a spoken phrase. Everything runs on this device."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: running ? sign.stop : sign.start,
						className: "rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
						disabled: sign.status === "loading",
						children: sign.status === "loading" ? "Loading model…" : running ? "Stop camera" : "Start camera"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: speech.listening ? speech.stopListening : speech.startListening,
						className: "rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface disabled:opacity-50",
						disabled: !speech.supported,
						children: speech.listening ? "Stop mic" : "Start mic"
					})]
				})]
			}),
			sign.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 rounded-xl border border-destructive/50 bg-destructive/15 px-4 py-3 text-sm text-foreground",
				children: sign.error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-video bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								ref: sign.videoRef,
								playsInline: true,
								muted: true,
								className: "size-full scale-x-[-1] object-cover"
							}),
							!running && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 grid place-items-center px-6 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg font-semibold",
									children: "Camera is off"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Start the camera to begin sign recognition. Frames stay in the browser."
								})] })
							}),
							running && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-4 left-4 flex items-center gap-2 rounded-full bg-background/75 px-3 py-1.5 text-xs backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-1.5 rounded-full bg-signal pulse-live",
									"aria-hidden": true
								}), "Recognizing"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-x-4 bottom-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-background/80 px-4 py-3 backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-lg font-semibold",
											children: latest ? latest.entry.phrase : "Waiting for a sign…"
										}), sign.live && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-muted-foreground",
											children: [
												sign.live.label,
												" · ",
												Math.round(sign.live.confidence * 100),
												"%"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 h-1 overflow-hidden rounded-full bg-secondary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-accent transition-[width] duration-100",
											style: { width: `${Math.round(sign.dwell * 100)}%` }
										})
									})]
								})
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex cursor-pointer items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: autoSpeak,
								onChange: (e) => setAutoSpeak(e.target.checked),
								className: "size-4 accent-[var(--color-primary)]"
							}), "Speak recognized signs aloud"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								sign.clear();
								spokenCountRef.current = 0;
							},
							className: "text-xs text-muted-foreground underline-offset-4 hover:underline",
							children: "Clear transcript"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel flex h-72 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-5 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Sign → speech"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [sign.detections.length, " recognized"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: signLogRef,
							className: "flex-1 space-y-2 overflow-y-auto px-5 py-4",
							children: sign.detections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Recognized signs will appear here as they commit."
							}) : sign.detections.slice().reverse().map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-lg bg-surface px-3 py-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										className: "text-lg",
										children: d.entry.glyph
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 font-medium",
										children: d.entry.phrase
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: timeOf(d.at)
									})
								]
							}, `${d.at}-${d.entry.phrase}`))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel flex h-72 flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-5 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Speech → sign cues"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: speech.listening ? "Listening" : "Mic off"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: speechLogRef,
							className: "flex-1 space-y-2 overflow-y-auto px-5 py-4",
							children: [
								!speech.supported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "This browser has no live speech recognition. Chrome or Edge is needed for the speech direction."
								}),
								speech.supported && speech.lines.length === 0 && !speech.interim && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Start the mic and speak — the transcript and its sign cues appear here."
								}),
								speech.lines.slice().reverse().map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-surface px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm",
										children: line.text
									}), line.cues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 flex flex-wrap gap-1.5",
										children: line.cues.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1 rounded-full bg-card px-2 py-0.5 text-xs text-accent",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												"aria-hidden": true,
												children: c.glyph
											}), c.phrase]
										}, c.phrase))
									})]
								}, line.id)),
								speech.interim && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "px-1 text-sm text-muted-foreground italic",
									children: [speech.interim, "…"]
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Phase-1 vocabulary reference"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: SIGN_VOCABULARY.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "panel flex items-center gap-3 px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "text-2xl",
								children: s.glyph
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.phrase })]
						}, s.phrase))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Recognition quality drops in low light or with a busy background — keep a plain background and both hands visible for the steadiest results."
					})
				]
			})
		]
	}) });
}
//#endregion
export { CallPage as component };
