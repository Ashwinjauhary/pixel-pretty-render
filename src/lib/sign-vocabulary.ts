export type SignEntry = {
  /** Gesture category returned by the MediaPipe gesture recognizer */
  gesture: string;
  /** Phrase spoken / captioned into the call */
  phrase: string;
  /** Short glyph shown in the cue rail */
  glyph: string;
};

/**
 * Phase-1 closed vocabulary. The prototype maps a pretrained hand-gesture
 * classifier onto high-frequency academic/professional ISL intents.
 * This is deliberately NOT open-vocabulary translation.
 */
export const SIGN_VOCABULARY: SignEntry[] = [
  { gesture: "Open_Palm", phrase: "Hello", glyph: "✋" },
  { gesture: "Thumb_Up", phrase: "Yes / Understood", glyph: "👍" },
  { gesture: "Thumb_Down", phrase: "No", glyph: "👎" },
  { gesture: "Victory", phrase: "Thank you", glyph: "✌️" },
  { gesture: "Closed_Fist", phrase: "Please wait", glyph: "✊" },
  { gesture: "ILoveYou", phrase: "I need help", glyph: "🤟" },
  { gesture: "Pointing_Up", phrase: "I have a question", glyph: "☝️" },
];

export const GESTURE_TO_ENTRY = new Map(SIGN_VOCABULARY.map((s) => [s.gesture, s]));

/** Simplified cue keywords for the speech → sign direction. */
export const SPEECH_CUES: { match: RegExp; phrase: string; glyph: string }[] = [
  { match: /\b(hello|hi|hey|good morning)\b/i, phrase: "Greeting", glyph: "✋" },
  { match: /\b(yes|correct|right|okay|ok)\b/i, phrase: "Yes", glyph: "👍" },
  { match: /\b(no|not|don't|incorrect)\b/i, phrase: "No", glyph: "👎" },
  { match: /\b(question|ask|why|what|how)\b/i, phrase: "Question", glyph: "☝️" },
  { match: /\b(wait|hold|one moment|pause)\b/i, phrase: "Wait", glyph: "✊" },
  { match: /\b(thank|thanks)\b/i, phrase: "Thank you", glyph: "✌️" },
  { match: /\b(help|support|assist)\b/i, phrase: "Help", glyph: "🤟" },
  { match: /\b(understand|understood|clear)\b/i, phrase: "Understood", glyph: "👌" },
];

export function cuesForTranscript(text: string) {
  return SPEECH_CUES.filter((c) => c.match.test(text));
}
