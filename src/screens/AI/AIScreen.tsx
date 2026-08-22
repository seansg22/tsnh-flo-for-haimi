import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Check, Copy, Send, Sparkles, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { differenceInWeeks, parseISO } from 'date-fns';
import { useApp } from '../../context/appStateContext';
import { useBabyAge } from '../../hooks/useBabyAge';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { milestones } from '../../data/weeklyDevelopment';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}


export function AIScreen() {
  const { state, dispatch } = useApp();
  const age = useBabyAge(state.babyProfile?.birthDate ?? null);
  const [messages, setMessages] = useLocalStorage<Message[]>('ai-messages', []);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [streamingContent, setStreamingContent] = useState('');
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (loading || (lastMsg && lastMsg.role === 'user')) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    function update() {
      if (!containerRef.current) return;
      containerRef.current.style.height = `${vv!.height}px`;
      containerRef.current.style.top = `${vv!.offsetTop}px`;
    }

    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, []);

  async function send(override?: string) {
    const text = (override ?? input).trim();
    if (!text || loading) return;

    setInput('');
    const withUser: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(withUser);
    setLoading(true);

    const baby = state.babyProfile!;

    const latestEntry = state.growthEntries
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))[0];

    const measurementsLine = latestEntry
      ? [
          latestEntry.weight != null ? `weight ${latestEntry.weight} kg` : null,
          latestEntry.length != null ? `length ${latestEntry.length} cm` : null,
          latestEntry.head != null ? `head circumference ${latestEntry.head} cm` : null,
        ]
          .filter(Boolean)
          .join(', ')
      : null;

    const achievedSet = new Set(state.achievedMilestones);
    const achievedLabels = milestones
      .filter(m => achievedSet.has(m.id))
      .map(m => `- [${m.category}] ${m.label}`);
    const milestonesLine = achievedLabels.join(', ')

    const feedingLabel: Record<string, string> = {
      breast: 'breastfeeding',
      bottle: 'bottle-feeding with expressed breast milk',
      formula: 'formula feeding',
    };

    const solidsLine = baby.solidsStartDate
      ? `Started solids ${differenceInWeeks(new Date(), parseISO(baby.solidsStartDate))} weeks ago (on ${baby.solidsStartDate})`
      : 'Not started solids yet';

    const formulaSwitchLine = baby.feedingMethod === 'formula' && baby.formulaSwitchDate
      ? `\n- Switched from breast milk to formula ${differenceInWeeks(new Date(), parseISO(baby.formulaSwitchDate))} weeks ago (on ${baby.formulaSwitchDate})`
      : '';

    const notesLine = baby.notes?.trim() ? `\n- Parent's notes: ${baby.notes.trim()}` : '';

    const systemInstruction = `You are a careful baby development assistant.

Baby:
- Name: ${baby.name}
- Age: ${age.weeks} weeks
- Gender: ${baby.gender}
- Feeding method: ${feedingLabel[baby.feedingMethod ?? 'breast']}${formulaSwitchLine}
- Solids: ${solidsLine}${measurementsLine ? `\n- Latest measurements: ${measurementsLine}` : ''}${milestonesLine ? `\n- Achieved milestones: ${milestonesLine}` : ''}${notesLine}

Rules:
- Address the user as "${baby.name}'s parent" in the language they used in their question, but only in the your first response of the conversation.
- Answer in the language the user used in their question.
- Format answers as bullet points — one concise sentence per bullet
- Use 3 to 5 bullets max unless user explicitly asks to be more comprehensive
- Give practical, age-aware, gender-aware, measurement-aware guidance`;

    const conversation = withUser.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

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

    for (const model of MODELS) {
      let succeeded = false;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: { parts: [{ text: systemInstruction }] },
                contents: conversation,
              }),
            }
          );

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const data = await res.json();
          const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response received.';

          setLoading(false);
          let i = 0;
          const CHUNK = 3;
          streamIntervalRef.current = setInterval(() => {
            i += CHUNK;
            if (i >= answer.length) {
              clearInterval(streamIntervalRef.current!);
              streamIntervalRef.current = null;
              setStreamingContent('');
              setMessages([...withUser, { role: 'assistant', content: answer, model }]);
            } else {
              setStreamingContent(answer.slice(0, i));
            }
          }, 16);
          succeeded = true;
          return;
        } catch {
          if (attempt < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          }
        }
      }
      if (succeeded) return;
    }

    setMessages([...withUser, { role: 'assistant', content: 'Something went wrong after several attempts. Please try again later.' }]);
    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex flex-col bg-cream w-full max-w-[430px]"
      style={{ height: '100dvh' }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-black/5 flex-shrink-0"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'today' })}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-app-text"
          aria-label="Go back"
        >
          <ArrowLeft size={20} strokeWidth={2.3} />
        </button>
        <div className="flex flex-1 items-center gap-2">
          <Sparkles size={18} className="text-peach" />
          <span className="text-lg font-extrabold text-app-text">Ask AI</span>
        </div>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (streamIntervalRef.current) {
                clearInterval(streamIntervalRef.current);
                streamIntervalRef.current = null;
              }
              setStreamingContent('');
              setMessages([]);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-textMuted"
            aria-label="Clear conversation"
          >
            <Trash2 size={16} strokeWidth={2.2} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-3 text-center pt-16">
            <div className="w-14 h-14 rounded-full bg-peach/10 flex items-center justify-center">
              <Sparkles size={26} className="text-peach" />
            </div>
            <p className="text-textMuted text-sm font-medium max-w-[260px]">
              I already know {state.babyProfile?.name} — her age, gender, and profile. Ask me anything about her development, feeding, sleep, or milestones.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'user' ? (
              <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed bg-peach text-black whitespace-pre-wrap">
                {msg.content}
              </div>
            ) : (
              <div className="text-sm leading-relaxed text-app-text">
                <div className="prose prose-sm prose-neutral max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <div className="mt-3 mb-2 flex items-center justify-between ml-6">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(msg.content);
                      setCopiedIndex(i);
                      setTimeout(() => setCopiedIndex(null), 1500);
                    }}
                    className="flex items-center gap-1 text-sm text-textMuted active:text-app-text"
                    aria-label="Copy message"
                  >
                    {copiedIndex === i ? <Check size={12} strokeWidth={2.2} /> : <Copy size={12} strokeWidth={2.2} />}
                    {copiedIndex === i ? 'Copied' : 'Copy'}
                  </button>
                  {msg.model && (
                    <span className="flex items-center text-sm text-textMuted/70">answered by {msg.model}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-textMuted rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 bg-textMuted rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 bg-textMuted rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {streamingContent && (
          <div className="flex justify-start">
            <div className="text-sm leading-relaxed text-app-text">
              <div className="prose prose-sm prose-neutral max-w-none">
                <ReactMarkdown>{streamingContent}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 border-t border-black/5"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2 overflow-x-auto px-4 pt-2 pb-2 no-scrollbar">
          <span className="flex-shrink-0 text-xs text-textMuted font-medium">Explore</span>
          {([
            ['Feeding', 'Give me a comprehensive guide on feeding for her current age — appropriate foods, feeding schedule, portion sizes, what to avoid, and any tips for making feeding easier. Please be thorough.'],
            ['Sleep', 'Give me a comprehensive breakdown of her sleep needs at this age — total hours, nap schedule, nighttime sleep, common sleep challenges, and practical tips to improve sleep quality. Please be thorough.'],
            ['Growth', 'Give me a comprehensive assessment of her growth based on her age, gender, and latest measurements — whether she is on track, what the healthy ranges are, signs to watch for, and when to consult a doctor. Please be thorough.'],
            ['Vaccine', 'Give me a comprehensive vaccination guide for her age — what she should have received so far, what is coming up next, the schedule, possible side effects, and how to prepare. Please be thorough.'],
            ['Milestones', 'Give me a comprehensive developmental overview based on her age and achieved milestones — what she should be doing now, what to focus on next, activities to encourage development, and any red flags to watch for. Please be thorough.'],
            ['Crying', 'Give me a comprehensive guide on why babies her age cry and how to soothe them — common causes, how to identify each, the most effective soothing techniques, and when to seek medical advice. Please be thorough.'],
          ] as [string, string][]).map(([label, prompt]) => (
            <button
              key={label}
              type="button"
              onClick={() => send(prompt)}
              className="flex-shrink-0 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs text-app-text whitespace-nowrap active:bg-black/5"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2 px-4">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-app-text placeholder:text-textMuted focus:outline-none focus:ring-2 focus:ring-peach/40 max-h-32"
            style={{ lineHeight: '1.5' }}
          />
          <button
            type="button"
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-peach text-white shadow-sm transition-opacity disabled:opacity-40 active:scale-95"
            aria-label="Send"
          >
            <Send size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}
