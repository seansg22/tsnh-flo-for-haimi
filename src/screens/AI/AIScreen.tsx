import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '../../context/appStateContext';
import { useBabyAge } from '../../hooks/useBabyAge';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}


export function AIScreen() {
  const { state, dispatch } = useApp();
  const age = useBabyAge(state.babyProfile?.birthDate ?? null);
  const [messages, setMessages] = useLocalStorage<Message[]>('ai-messages', []);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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

  async function send() {
    const text = input.trim();
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

    const prompt = `
You are a careful baby development assistant.

Baby:
- Name: ${baby.name}
- Age: ${age.weeks} weeks
- Gender: ${baby.gender}${measurementsLine ? `\n- Latest measurements: ${measurementsLine}` : ''}

Question:
${text}

Rules:
- Address the user as "${baby.name}'s parent"
- Format answers as bullet points — one concise sentence per bullet
- Use 3 to 5 bullets max unless user explicitly asks for more detail
- Give practical, age-aware, gender-aware, measurement-aware guidance
`;

    const MAX_RETRIES = 3;
    const RETRY_DELAY = 5000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response received.';

        setMessages([...withUser, { role: 'assistant', content: answer }]);
        setLoading(false);
        return;
      } catch {
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        } else {
          setMessages([...withUser, { role: 'assistant', content: 'Something went wrong after several attempts. Please try again later.' }]);
          setLoading(false);
        }
      }
    }
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
            onClick={() => setMessages([])}
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
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-peach text-white rounded-br-sm whitespace-pre-wrap'
                  : 'bg-white text-app-text rounded-bl-sm shadow-sm prose prose-sm prose-neutral max-w-none'
              }`}
            >
              {msg.role === 'user' ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
            </div>
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

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 px-4 py-3 border-t border-black/5"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-end gap-2">
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
            onClick={send}
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
