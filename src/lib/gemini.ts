// https://aistudio.google.com/u/1/api-keys?pli=1&project=gen-lang-client-0041515414
// tson.regis@gmail.com
const MODELS = [
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3-flash',
  'gemini-3.1-flash-lite',
  'gemma-4-31b',
];
const MAX_RETRIES = 3;
const RETRY_DELAY = 5000;

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
 */
export async function callGemini(
  systemInstruction: string,
  contents: GeminiContent[]
): Promise<GeminiResult | null> {
  for (const model of MODELS) {
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
