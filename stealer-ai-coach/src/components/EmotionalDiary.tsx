import React, { useState } from 'react';
import { usePanda } from '../context/PandaContext';
import { EmotionType } from '../types';
import { Smile, BookOpen, Clock, Frown, Sparkles, AlertTriangle } from 'lucide-react';
import StealerCat from './StealerCat';

export default function EmotionalDiary() {
  const {
    diaryEntries,
    addDiaryEntry
  } = usePanda();

  // Inputs
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('bien');
  const [reflection, setReflection] = useState<string>('');

  // Smiley list definitions
  const smileys: { type: EmotionType; char: string; label: string; color: string }[] = [
    { type: 'excelente', char: '😀', label: 'Excelente', color: 'hover:bg-green-100 hover:border-green-400 bg-green-50/60 border-green-200' },
    { type: 'bien', char: '🙂', label: 'Bien', color: 'hover:bg-emerald-100 hover:border-emerald-400 bg-emerald-50/60 border-emerald-200' },
    { type: 'regular', char: '😐', label: 'Regular', color: 'hover:bg-yellow-100 hover:border-yellow-400 bg-yellow-50/60 border-yellow-200' },
    { type: 'preocupado', char: '😟', label: 'Preocupado', color: 'hover:bg-orange-100 hover:border-orange-400 bg-orange-50/60 border-orange-200' },
    { type: 'estresado', char: '😭', label: 'Estresado', color: 'hover:bg-rose-100 hover:border-rose-400 bg-rose-50/60 border-rose-200' }
  ];

  // Dynamic mascot choice depending on state select
  let currentExpression: 'normal' | 'happy' | 'sad' = 'normal';
  let mascotAdvice = '¡Me alegra saludarte, colega! Cuéntame sobre tus gastos de hoy.';
  
  if (selectedEmotion === 'excelente') {
    currentExpression = 'happy';
    mascotAdvice = '¡Eso suena sensacional! Eres un imán de abundancia y estás tomando excelentes hábitos.';
  } else if (selectedEmotion === 'bien') {
    currentExpression = 'happy';
    mascotAdvice = '¡Excelente! Mantener balances positivos te dará una paz mental inquebrantable.';
  } else if (selectedEmotion === 'regular') {
    currentExpression = 'normal';
    mascotAdvice = 'La paciencia es clave. Separar tus deseos de tus necesidades te traerá serenidad.';
  } else if (selectedEmotion === 'preocupado' || selectedEmotion === 'estresado') {
    currentExpression = 'sad';
    mascotAdvice = 'Tranquilo, respira... Las finanzas estresan a cualquiera, pero juntos daremos pequeños pasos sanos.';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim()) {
      alert('Escribe una breve frase antes de guardar en tu bitácora.');
      return;
    }
    
    addDiaryEntry(selectedEmotion, reflection);
    setReflection('');
  };

  // Stats counting
  const totalEntries = diaryEntries.length;
  const stressEntries = diaryEntries.filter(d => d.emotion === 'preocupado' || d.emotion === 'estresado').length;
  const peacefulPct = totalEntries > 0 ? Math.round(((totalEntries - stressEntries) / totalEntries) * 100) : 100;

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen text-brand-dark select-none bg-brand-cream">
      
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-black tracking-wider text-brand-pink uppercase">
            SABIDURÍA EMOCIONAL
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Mi Diario Financiero
          </h1>
        </div>
        
        <div className="bg-brand-pink/15 border border-brand-pink/25 px-3.5 py-1.5 rounded-xl text-xs font-black text-brand-pink flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-pink" />
          <span>Bitácora de Bienestar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        
        {/* --- DYNAMIC RESPONSIVE MASCOT COUNSELOR (Left column) --- */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-brand-gray/80 shadow-sm flex flex-col justify-between items-center text-center relative group min-h-[380px]">
          <div className="absolute top-2 left-3 bg-brand-pink/15 text-brand-pink font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full border border-brand-pink/25">
            STEALER Coach Emocional 🐾
          </div>

          <div className="flex flex-col items-center mt-6 gap-3">
            {/* Emoticon mascot change dynamically */}
            <div className="w-40 h-40 flex items-center justify-center">
              <StealerCat size="100%" expression={currentExpression} className="animate-float" />
            </div>
            
            <div className="bg-brand-cream/80 p-4 rounded-2xl border border-brand-gray/80 max-w-sm mt-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-brand-pink block mb-1">
                Consejo de STEALER
              </span>
              <p className="text-xs text-brand-dark font-medium italic">
                "{mascotAdvice}"
              </p>
            </div>
          </div>

          {/* Quick wellness stats footer */}
          <div className="w-full pt-4 border-t border-brand-gray/60 grid grid-cols-2 text-xs">
            <div>
              <span className="text-brand-dark/50 text-[10px] uppercase font-black">Paz Mental:</span>
              <p className="text-brand-green font-black text-base font-mono">{peacefulPct}%</p>
            </div>
            <div>
              <span className="text-brand-dark/50 text-[10px] uppercase font-black">Anotaciones:</span>
              <p className="text-brand-pink font-black text-base font-mono">{totalEntries}</p>
            </div>
          </div>
        </div>

        {/* --- FORM PANEL SECTION (Center) --- */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* New Entry Module */}
          <div className="bg-white rounded-3xl p-6 border border-brand-gray/80 shadow-sm">
            <h2 className="text-sm font-black text-brand-dark/65 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-brand-pink" />
              ¿Cómo te sientes hoy respecto a tus finanzas?
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Emojis selection row */}
              <div className="grid grid-cols-5 gap-2">
                {smileys.map((s) => {
                  const isSelected = selectedEmotion === s.type;
                  return (
                    <button
                      key={s.type}
                      type="button"
                      onClick={() => setSelectedEmotion(s.type)}
                      className={`flex flex-col items-center p-3 rounded-2xl border transition-all cursor-pointer ${s.color} ${
                        isSelected
                          ? 'bg-brand-pink/25 border-brand-pink scale-105 shadow-sm ring-2 ring-brand-pink/15'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className="text-3xl mb-1" id={`emo-${s.type}`}>{s.char}</span>
                      <span className="text-[9px] font-bold text-brand-dark/70 md:block hidden truncate max-w-full">
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Textarea reflection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-brand-dark/75">
                  Escribe una breve reflexión sobre tus pensamientos de ahorro de hoy:
                </label>
                <textarea
                  id="diary-textarea"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Ej. Siento tranquilidad porque ordené mi presupuesto, pero aún me causan un poco de inquietud las ofertas de ropa en línea..."
                  className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink outline-none text-xs rounded-2xl p-4 text-brand-dark font-semibold h-24 resize-none leading-relaxed transition-all"
                  maxLength={250}
                  required
                />
              </div>

              <button
                id="btn-save-diary"
                type="submit"
                className="w-full py-3.5 bg-brand-yellow hover:bg-brand-yellow/95 text-brand-dark font-black rounded-2xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-brand-yellow/15 border-b-2 border-brand-orange"
              >
                Guardar Aventura Emocional (Anotar)
              </button>
            </form>
          </div>

          {/* Historical reflexions scroll */}
          <div className="bg-white rounded-3xl p-6 border border-brand-gray/80 shadow-sm">
            <h3 className="text-xs font-black text-brand-dark/65 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-pink" />
              Historial de Reflexiones
            </h3>

            <div className="flex flex-col gap-3.5 max-h-[220px] overflow-y-auto pr-1">
              {diaryEntries.map((entry) => {
                const smileAssoc = smileys.find(s => s.type === entry.emotion);
                return (
                  <div key={entry.id} className="bg-brand-cream/40 border border-brand-gray/60 p-3.5 rounded-2xl flex gap-3.5 items-start shadow-sm">
                    <span className="text-3xl leading-none flex-shrink-0">
                      {smileAssoc?.char || '😐'}
                    </span>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-brand-dark capitalize">{entry.emotion}</span>
                        <span className="text-[10px] text-brand-dark/40 font-mono font-bold">{entry.date}</span>
                      </div>
                      <p className="text-brand-dark/95 text-xs italic leading-relaxed">
                        "{entry.reflection}"
                      </p>
                    </div>
                  </div>
                );
              })}

              {diaryEntries.length === 0 && (
                <div className="text-center py-6 text-xs text-brand-dark/50 italic font-bold">
                  Aún no has anotado nada en tu diario.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
