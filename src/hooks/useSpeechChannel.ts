import { useCallback, useEffect, useRef, useState } from "react";
import { cuesForTranscript } from "@/lib/sign-vocabulary";

export type TranscriptLine = {
  id: number;
  text: string;
  cues: { phrase: string; glyph: string }[];
  at: number;
};

/** Speech → text (hearing side) + text → speech (sign side) via Web Speech API. */
export function useSpeechChannel() {
  const recognitionRef = useRef<any>(null);
  const idRef = useRef(0);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [interim, setInterim] = useState("");
  const [lines, setLines] = useState<TranscriptLine[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const Ctor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setSupported(Boolean(Ctor));
  }, []);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* already stopped */
    }
    recognitionRef.current = null;
    setListening(false);
    setInterim("");
  }, []);

  const startListening = useCallback(() => {
    const Ctor =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Ctor) {
      setSupported(false);
      return;
    }
    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event: any) => {
      let pending = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const text = String(result[0].transcript).trim();
        if (!text) continue;
        if (result.isFinal) {
          idRef.current += 1;
          const cues = cuesForTranscript(text).map((c) => ({
            phrase: c.phrase,
            glyph: c.glyph,
          }));
          setLines((prev) => [
            ...prev.slice(-30),
            { id: idRef.current, text, cues, at: Date.now() },
          ]);
        } else {
          pending = text;
        }
      }
      setInterim(pending);
    };
    recognition.onerror = () => stopListening();
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setListening(true);
  }, [stopListening]);

  useEffect(() => () => stopListening(), [stopListening]);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  }, []);

  const clear = useCallback(() => setLines([]), []);

  return { listening, supported, interim, lines, startListening, stopListening, speak, clear };
}
