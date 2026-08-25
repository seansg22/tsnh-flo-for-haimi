// https://aistudio.google.com/u/1/api-keys?pli=1&project=gen-lang-client-0041515414
// tson.regis@gmail.com
const MODELS = [
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3-flash',
  'gemini-2.5-flash',
  'gemini-3.1-flash-lite',
  'gemini-2.5-flash-lite',
];
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

// Index into MODELS to start from. Sticky across calls: once a model succeeds,
// later calls start there instead of retrying already-known-bad models from the top.
let modelIndex = 0;

export interface GeminiContent {
  role: string;
  parts: { text: string }[];
}

export interface GeminiResult {
  text: string;
  model: string;
}

/**
 * Calls the Gemini generateContent API, falling back through MODELS (each retried
 * MAX_RETRIES times) until one succeeds. Returns null if every model/attempt fails.
 *
 * A 503 ("model overloaded") skips the remaining retries for that model and moves
 * straight to the next one — retrying an overloaded model rarely helps and only
 * burns the fixed RETRY_DELAY.
 *
 * The starting model is sticky across calls (see `modelIndex`): once a fallback
 * model succeeds, subsequent calls start there instead of re-trying earlier models
 * that just failed. If the current model and every model after it fail, the search
 * wraps around to the start of MODELS (e.g. sticky on C, C fails → D, E, ... wraps to A, B).
 */
export async function callGemini(
  systemInstruction: string,
  contents: GeminiContent[]
): Promise<GeminiResult | null> {
  for (let n = 0; n < MODELS.length; n++) {
    const i = (modelIndex + n) % MODELS.length;
    const model = MODELS[i];
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: systemInstruction }] },
              contents,
            }),
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`, { cause: res.status });

        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response received.';
        modelIndex = i;
        return { text, model };
      } catch (err) {
        if (err instanceof Error && err.cause === 503) break;
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }
    }
  }

  return null;
}
