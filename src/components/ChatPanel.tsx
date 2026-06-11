import React, { useState, useEffect, useRef } from 'react';
import { usePanda } from '../context/PandaContext';
import { Sparkles, Send, Trash2, ArrowRight, Bot, User, Volume2, Cat } from 'lucide-react';
import StealerCat from './StealerCat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  expression?: 'normal' | 'happy' | 'sad';
}

export default function ChatPanel() {
  const { xp, coins, addXP, addCoins } = usePanda();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [catExpression, setCatExpression] = useState<'normal' | 'happy' | 'sad'>('normal');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested chips
  const suggestions = [
    { text: "🐾 ¿Cómo armo un plan de ahorro mensual?", desc: "Presupuesto simple" },
    { text: "🐈‍⬛ ¿Qué es un gasto hormiga y cómo lo evito?", desc: "Frenar fugas de dinero" },
    { text: "💰 ¿Cómo recomiendas invertir mis monedas virtuales?", desc: "Inversiones para dummies" },
    { text: "🎒 ¿Qué es el fondo de emergencia y cómo se calcula?", desc: "Seguridad ante todo" }
  ];

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('stealer_chat_history');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    } else {
      // First welcome message
      const welcome: Message = {
        role: 'assistant',
        content: '¡Miau! Hola, humano ahorrador. Soy STEALER, tu gaticonsejero financiero de bolsillo con garras afiladas para las compras compulsivas. 🐾🐈‍⬛\n\n¿Quieres saber cómo vencer los gastos hormiga, crear un presupuesto gatu-fantástico o aprender a invertir tus monedas? ¡Dispara tus dudas y te daré mis mejores consejos! ✨💰',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        expression: 'happy'
      };
      setMessages([welcome]);
      localStorage.setItem('stealer_chat_history', JSON.stringify([welcome]));
    }
  }, []);

  // Sync scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const saveMessages = (newMsgs: Message[]) => {
    setMessages(newMsgs);
    localStorage.setItem('stealer_chat_history', JSON.stringify(newMsgs));
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    saveMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setCatExpression('normal');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Determine response expression randomly or based on content
      let exp: 'normal' | 'happy' | 'sad' = 'normal';
      const contentLower = data.reply.toLowerCase();
      if (contentLower.includes('felic') || contentLower.includes('bien') || contentLower.includes('excelente') || contentLower.includes('miau') || contentLower.includes('¡sí!')) {
        exp = 'happy';
      } else if (contentLower.includes('cuidado') || contentLower.includes('mal') || contentLower.includes('gasto') || contentLower.includes('peligro') || contentLower.includes('oh no')) {
        exp = 'sad';
      }

      setCatExpression(exp);

      const assistantMsg: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        expression: exp
      };

      // Spark user some bonus XP & coins for learning!
      addXP(10);
      addCoins(5);

      saveMessages([...updatedMessages, assistantMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setCatExpression('sad');
      
      const errMsg: Message = {
        role: 'assistant',
        content: '✍️ ¡Uy! Parece que mis bigotes detectaron una interferencia en la red o mi llave de sabiduría secreta (GEMINI_API_KEY) aún no se ha configurado en la pestaña Configuración > Secretos. ¡Asegúrate de tener tu clave configurada para que pueda continuar dándote consejos! 🐾🔌',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        expression: 'sad'
      };
      saveMessages([...updatedMessages, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('¿Quieres limpiar el historial de conversación con STEALER?')) {
      const welcome: Message = {
        role: 'assistant',
        content: '¡Historial renovado como caja de arena limpia! ¿De qué quieres hablar ahora, colega? 🐾🐈‍⬛',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        expression: 'normal'
      };
      saveMessages([welcome]);
      setCatExpression('normal');
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 flex flex-col justify-between select-none relative max-h-screen text-brand-dark overflow-hidden bg-brand-cream/45">
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-20 left-4 w-24 h-24 bg-brand-yellow/15 rounded-full blur-2xl pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-gray/60 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl border border-brand-gray/80 shadow-sm p-1.5 hover:rotate-6 transition-transform flex items-center justify-center">
            <StealerCat size="100%" expression={catExpression} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="bg-brand-dark text-brand-yellow text-[9px] font-mono leading-none px-2 py-0.5 rounded font-black uppercase">
                GATITO IA COACH 🐈‍⬛
              </span>
              <span className="text-[10px] bg-brand-pink/25 text-brand-dark/80 font-mono px-2 py-0.5 rounded font-bold">
                ¡Gana +10 XP por duda!
              </span>
            </div>
            <h2 className="text-xl font-black text-brand-dark mt-0.5 flex items-center gap-1">
              Charlar con STEALER
            </h2>
          </div>
        </div>

        {/* Clear chat button */}
        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1.5 text-xs text-brand-dark/50 hover:text-brand-coral hover:bg-brand-coral/10 hover:border-brand-coral/20 border border-brand-gray/80 rounded-xl transition-all font-bold cursor-pointer"
          title="Limpiar chat de la caja"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Limpiar Chat
        </button>
      </div>

      {/* WORKSPACE CHAT BOX CONTAINER */}
      <div className="flex-1 bg-white border border-brand-gray/80 rounded-3xl p-4 md:p-6 shadow-sm overflow-hidden flex flex-col justify-between mb-4 min-h-[300px]">
        {/* Messages scrolling list */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[calc(100vh-380px)]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 max-w-[85%] ${
                m.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              {/* Avatar indicators */}
              <div
                className={`w-8.5 h-8.5 rounded-xl border flex items-center justify-center p-1 flex-shrink-0 ${
                  m.role === 'user'
                    ? 'bg-brand-pink/25 border-brand-pink/40'
                    : 'bg-brand-yellow/15 border-brand-yellow/50'
                }`}
              >
                {m.role === 'user' ? (
                  <User className="w-4 h-4 text-brand-dark" />
                ) : (
                  <StealerCat size="100%" expression={m.expression || 'normal'} />
                )}
              </div>

              {/* Text Bubble */}
              <div>
                <div
                  className={`p-3.5 rounded-2xl text-xs md:text-sm font-semibold leading-relaxed shadow-sm whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-brand-pink/20 text-brand-dark border border-brand-pink/30 rounded-tr-none'
                      : 'bg-brand-cream text-brand-dark border border-brand-gray/70 rounded-tl-none'
                  }`}
                >
                  {m.content}
                </div>
                <span className="text-[9px] text-brand-dark/45 mt-1 block font-mono pl-1">
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* PURRING LOADING COMPONENT */}
          {loading && (
            <div className="flex items-start gap-3 max-w-[75%]">
              <div className="w-8.5 h-8.5 rounded-xl border bg-brand-yellow/15 border-brand-yellow/50 flex items-center justify-center p-1 flex-shrink-0">
                <StealerCat size="100%" expression="normal" className="animate-bounce" />
              </div>
              <div className="bg-brand-cream border border-brand-gray/70 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-brand-pink rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-brand-coral rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-brand-dark/75 italic font-bold">
                  STEALER está amasando un consejo gatu-fantástico... 🐾🧶
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* INPUT AND SUGGESTIONS SECTION */}
        <div className="mt-4 border-t border-brand-gray/60 pt-4 flex flex-col gap-3">
          
          {/* AI SUGGESTION PRESETS CHIPS (rendered only when not loading & no extensive chat history for clear clean layout) */}
          {messages.length < 4 && !loading && (
            <div>
              <p className="text-[10px] font-black uppercase text-brand-dark/40 mb-1.5 tracking-wider">
                Preguntas de inicio rápido:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(p.text)}
                    className="flex flex-col text-left p-2.5 rounded-xl border border-brand-gray/70 bg-brand-beige/50 hover:bg-brand-yellow/10 hover:border-brand-orange/40 active:scale-[0.98] transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-brand-dark tracking-tight">{p.text}</span>
                    <span className="text-[9px] text-brand-dark/50 group-hover:text-brand-pink font-semibold">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MAIN INPUT BOX */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="¿Cómo puedo ahorrar dinero al comprar comida fuera de casa?"
              disabled={loading}
              className="flex-1 bg-brand-cream border border-brand-gray/80 hover:border-brand-pink/50 focus:border-brand-pink rounded-2xl px-4 py-3 text-xs md:text-sm font-semibold outline-none transition-all placeholder:text-brand-dark/35"
              id="input-ca-gato-ia"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className={`p-3 bg-brand-pink hover:bg-brand-pink/90 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-2xl border-b-2 border-brand-coral active:scale-95 transition-all cursor-pointer flex items-center justify-center`}
              id="btn-cat-send-ia"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
