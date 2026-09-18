import { useCallback, useEffect, useRef, useState } from "react";
import { GESTURE_TO_ENTRY, type SignEntry } from "@/lib/sign-vocabulary";

export type RecognizerStatus = "idle" | "loading" | "ready" | "running" | "error";

export type Detection = {
  entry: SignEntry;
  confidence: number;
  at: number;
};

const WASM_BASE =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";

/** Hold a gesture for this long before it commits as a recognized sign. */
const DWELL_MS = 700;
const MIN_CONFIDENCE = 0.6;
/** Same sign cannot re-fire faster than this. */
const COOLDOWN_MS = 1600;

export function useSignRecognizer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recognizerRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const candidateRef = useRef<{ gesture: string; since: number } | null>(null);
  const lastCommitRef = useRef<{ gesture: string; at: number } | null>(null);

  const [status, setStatus] = useState<RecognizerStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState<{ label: string; confidence: number } | null>(null);
  const [dwell, setDwell] = useState(0);
  const [detections, setDetections] = useState<Detection[]>([]);

  const stop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    candidateRef.current = null;
    setLive(null);
    setDwell(0);
    setStatus((s) => (s === "error" ? s : "ready"));
  }, []);

  useEffect(() => () => stop(), [stop]);

  const loop = useCallback(() => {
    const video = videoRef.current;
    const recognizer = recognizerRef.current;
    if (!video || !recognizer || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    try {
      const result = recognizer.recognizeForVideo(video, performance.now());
      const top = result?.gestures?.[0]?.[0];
      const now = performance.now();

      if (top && top.score >= MIN_CONFIDENCE && GESTURE_TO_ENTRY.has(top.categoryName)) {
        const entry = GESTURE_TO_ENTRY.get(top.categoryName)!;
        setLive({ label: entry.phrase, confidence: top.score });

        const candidate = candidateRef.current;
        if (!candidate || candidate.gesture !== top.categoryName) {
          candidateRef.current = { gesture: top.categoryName, since: now };
          setDwell(0);
        } else {
          const held = now - candidate.since;
          setDwell(Math.min(1, held / DWELL_MS));
          const last = lastCommitRef.current;
          const cooling =
            last && last.gesture === top.categoryName && now - last.at < COOLDOWN_MS;
          if (held >= DWELL_MS && !cooling) {
            lastCommitRef.current = { gesture: top.categoryName, at: now };
            candidateRef.current = { gesture: top.categoryName, since: now };
            setDwell(0);
            setDetections((prev) => [
              ...prev.slice(-40),
              { entry, confidence: top.score, at: Date.now() },
            ]);
          }
        }
      } else {
        candidateRef.current = null;
        setLive(null);
        setDwell(0);
      }
    } catch {
      /* skip a bad frame rather than killing the loop */
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const start = useCallback(async () => {
    setError(null);
    try {
      if (!recognizerRef.current) {
        setStatus("loading");
        const vision = await import("@mediapipe/tasks-vision");
        const fileset = await vision.FilesetResolver.forVisionTasks(WASM_BASE);
        recognizerRef.current = await vision.GestureRecognizer.createFromOptions(fileset, {
          baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" },
          runningMode: "VIDEO",
          numHands: 1,
        });
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 960, height: 720, facingMode: "user" },
        audio: false,
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
      setError(
        /permission|denied|notallowed/i.test(message)
          ? "Camera access was blocked. Allow the camera and try again."
          : message,
      );
      setStatus("error");
      stop();
    }
  }, [loop, stop]);

  const clear = useCallback(() => setDetections([]), []);

  return { videoRef, status, error, live, dwell, detections, start, stop, clear };
}
