// https://openrouter.ai/settings/keys
import { OpenRouter } from '@openrouter/sdk';

const client = new OpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  httpReferer: typeof window !== 'undefined' ? window.location.origin : undefined,
  appTitle: 'Flo for Hai Mi',
});

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterResult {
  text: string;
  model: string;
}

/**
 * Calls the OpenRouter chat completions API using the model set in
 * or the request fails.
 */
export async function callOpenRouter(
  systemInstruction: string,
  messages: OpenRouterMessage[]
): Promise<OpenRouterResult | null> {
  try {
    const result = await client.chat.send({
      chatRequest: {
        model: "openrouter/auto",
        stream: false,
        messages: [{ role: 'system', content: systemInstruction }, ...messages],
      },
    });

    // The SDK's types report the same ChatResult | EventStream union for every
    // overload regardless of `stream`, so narrow it ourselves at runtime.
    if (!('choices' in result)) {
      console.error('OpenRouter returned a stream unexpectedly');
      return null;
    }

    const content = result.choices[0]?.message?.content;
    const text = typeof content === 'string' ? content : 'No response received.';
    return { text, model: result.model };
  } catch (err) {
    console.error('OpenRouter call failed', err);
    return null;
  }
}
