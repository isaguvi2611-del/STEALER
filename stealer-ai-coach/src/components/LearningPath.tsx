import React, { useState } from 'react';
import { usePanda } from '../context/PandaContext';
import { LESSONS_DATA } from '../lessonsData';
import { LessonModule } from '../types';
import { Check, Lock, Play, Star, Sparkles, Gift } from 'lucide-react';
import StealerCat from './StealerCat';

export default function LearningPath() {
  const {
    unlockedModuleIds,
    completedModuleIds,
    openQuiz,
    addCoins,
    addXP,
    hearts
  } = usePanda();

  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [openedChests, setOpenedChests] = useState<number[]>([]);
  const [chestMessage, setChestMessage] = useState<string | null>(null);

  // Stagger offsets for a beautiful curved path (X margin offsets)
  // Wave: Center -> Left -> LeftDouble -> Left -> Center -> Right -> RightDouble -> Right -> repeat
  const getCurveClasses = (index: number) => {
    const cycle = index % 8;
    switch (cycle) {
      case 0: return 'translate-x-0';
      case 1: return '-translate-x-10 md:-translate-x-16';
      case 2: return '-translate-x-16 md:-translate-x-24';
      case 3: return '-translate-x-10 md:-translate-x-16';
      case 4: return 'translate-x-0';
      case 5: return 'translate-x-10 md:translate-x-16';
      case 6: return 'translate-x-16 md:translate-x-24';
      case 7: return 'translate-x-10 md:translate-x-16';
      default: return 'translate-x-0';
    }
  };

  const handleNodeClick = (mod: LessonModule) => {
    const isUnlocked = unlockedModuleIds.includes(mod.id);
    if (!isUnlocked) {
      setActiveTooltip(mod.id);
      setTimeout(() => setActiveTooltip(null), 3000);
      return;
    }

    if (hearts <= 0) {
      alert('¡Vaya! Te quedas sin vidas (❤️ 0). Compra recargas o haz clic sobre tu indicador de vidas arriba a la derecha.');
      return;
    }

    openQuiz(mod);
  };

  const handleChestClick = (modId: number, coinsGift: number, xpGift: number) => {
    const isModuleFinished = completedModuleIds.includes(modId);
    if (!isModuleFinished) {
      alert('¡Este cofre está cerrado! Resuelve el módulo anterior para conseguir las llaves del tesoro.');
      return;
    }

    if (openedChests.includes(modId)) {
      alert('Ya recogiste el contenido de este cofre. ¡Sigue aprendiendo!');
      return;
    }

    addCoins(coinsGift);
    addXP(xpGift);
    setOpenedChests((prev) => [...prev, modId]);
    setChestMessage(`¡Cofre Abierto! STEALER te obsequia +${coinsGift} monedas y +${xpGift} XP de sabiduría.`);
    setTimeout(() => setChestMessage(null), 5000);
  };

  return (
    <div className="flex-1 p-4 md:p-8 flex flex-col items-center relative overflow-y-auto max-h-screen text-brand-dark select-none">
      
      {/* Decorative cats decorating the outside boundaries, matching the requested reference layout */}
      {/* 1. Cute sitting cat on the right */}
      <div className="absolute right-2 md:right-8 lg:right-16 top-1/4 xl:top-1/3 z-10 w-24 h-24 md:w-40 md:h-40 pointer-events-none select-none animate-float">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-yellow/10 rounded-full blur-2xl pointer-events-none" />
          <StealerCat size="100%" expression="normal" className="drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]" />
        </div>
      </div>

      {/* 2. Cute winking cat on the left, celebrating */}
      <div className="absolute left-2 md:left-8 lg:left-16 bottom-[12%] md:bottom-[18%] z-10 w-24 h-24 md:w-40 md:h-40 pointer-events-none select-none animate-float" style={{ animationDelay: '1.8s' }}>
        <div className="relative">
          <div className="absolute inset-0 bg-brand-pink/10 rounded-full blur-2xl pointer-events-none" />
          <StealerCat size="100%" expression="happy" className="drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)]" />
        </div>
      </div>

      {/* HEADER SECTION banner */}
      <div className="w-full max-w-xl bg-gradient-to-r from-brand-pink to-brand-coral rounded-2xl p-5 border border-white/30 shadow-xl mb-12 relative overflow-hidden flex justify-between items-center text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/25 rounded-full blur-2xl pointer-events-none" />
        <div className="z-10 flex-1">
          <span className="bg-brand-yellow text-brand-dark text-xs font-mono font-black px-2.5 py-1 rounded-md border border-brand-orange/30 shadow-sm inline-block">
            ACADEMIA FINANCIERA STEALER 🐾
          </span>
          <h2 className="text-xl md:text-2xl font-black mt-2 text-white">La Ruta al Éxito</h2>
          <p className="text-xs text-white/95 mt-1 mr-4 max-w-sm leading-relaxed font-bold">
            Completa lecciones para habilitar nuevos senderos de prosperidad. ¡STEALER celebrará cada victoria contigo!
          </p>
        </div>
        
        {/* Animated mini cat waving */}
        <div className="relative p-1 bg-white/10 rounded-2xl border border-white/20 shadow-inner flex items-center justify-center">
          <StealerCat size={72} expression="happy" className="animate-bounce" />
        </div>
      </div>

      {/* Pop up message for chest claiming */}
      {chestMessage && (
        <div className="fixed top-20 z-50 bg-white border-2 border-brand-green text-brand-dark p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce max-w-md mx-4">
          <div className="bg-brand-green/10 p-2 rounded-xl text-brand-green border border-brand-green/20">
            <Sparkles className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <p className="font-extrabold text-sm text-brand-green">¡Increíble Victoria!</p>
            <p className="text-xs text-brand-dark/80 font-medium">{chestMessage}</p>
          </div>
        </div>
      )}

      {/* --- DUOLINGO PATHWAY MAP --- */}
      <div className="relative flex flex-col items-center w-full max-w-md pb-24">
        
        {/* Beautiful background path connecting line */}
        <div className="absolute top-10 bottom-10 w-2 bg-brand-gray/60 rounded-full border-dashed border-2 border-brand-orange/30 -z-10" />

        {LESSONS_DATA.map((lesson, idx) => {
          const isCompleted = completedModuleIds.includes(lesson.id);
          const isUnlocked = unlockedModuleIds.includes(lesson.id);
          const isCurrent = isUnlocked && !isCompleted;
          
          const staggerClass = getCurveClasses(idx);

          return (
            <div
              key={lesson.id}
              className={`flex flex-col items-center my-6 md:my-8 transition-transform ${staggerClass} w-full relative`}
            >
              {/* Tooltip locked alert */}
              {activeTooltip === lesson.id && (
                <div className="absolute -top-16 z-40 bg-white border-2 border-brand-coral text-brand-dark rounded-2xl p-3 text-xs text-center shadow-xl w-60 font-semibold">
                  <p className="text-brand-coral font-black">⚠️ Nivel Bloqueado</p>
                  <p className="text-[10px] text-brand-dark/70 mt-0.5">¡Completa los módulos anteriores para aprender sobre esto!</p>
                </div>
              )}

              {/* Node Circular Button */}
              <button
                id={`path-node-${lesson.id}`}
                onClick={() => handleNodeClick(lesson)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex flex-col items-center justify-center relative transition-all duration-300 cursor-pointer shadow-lg outline-none ${
                  isCompleted
                    ? 'bg-brand-pink border-b-6 border-brand-coral text-white hover:brightness-110 shadow-brand-pink/20'
                    : isCurrent
                    ? 'bg-brand-yellow border-b-6 border-brand-orange text-brand-dark animate-pulse hover:scale-105 shadow-brand-yellow/40 shadow-xl'
                    : 'bg-brand-gray/30 border-b-6 border-brand-gray text-brand-dark/40 cursor-not-allowed'
                }`}
              >
                {/* Visual marker inside node */}
                {isCompleted ? (
                  <Check className="w-7 md:w-9 h-7 md:h-9 stroke-[3]" />
                ) : isUnlocked ? (
                  <Play className="w-7 md:w-9 h-7 md:h-9 fill-current stroke-none ml-1 translate-y-0.5" />
                ) : (
                  <Lock className="w-6 md:w-7 h-6 md:h-7 text-brand-dark/40" />
                )}

                {/* Micro Level indicator ring */}
                {isCurrent && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-orange"></span>
                  </span>
                )}
              </button>

              {/* Label below Node */}
              <div className="text-center mt-2.5 max-w-[170px] select-none pointer-events-none">
                <span className="block text-[10px] font-mono tracking-wider text-brand-pink uppercase font-black">
                  Módulo {lesson.id}
                </span>
                <span
                  className={`text-xs md:text-sm font-black block leading-tight ${
                    isUnlocked ? 'text-brand-dark' : 'text-brand-dark/40'
                  }`}
                >
                  {lesson.title}
                </span>
                
                {isCurrent && (
                  <span className="inline-block mt-1 font-black text-[9px] bg-brand-yellow text-brand-dark px-2.5 py-0.5 rounded-full border border-brand-orange/30">
                    Siguiente
                  </span>
                )}
              </div>

              {/* --- INTERMEDIATE TREASURE CHEST GIFT --- (After modules with chestReward configured) */}
              {lesson.chestReward && (
                <div className="absolute top-full mt-4 flex flex-col items-center justify-center">
                  <div className="h-8 w-1 bg-brand-gray/60" />
                  
                  <button
                    onClick={() => handleChestClick(lesson.id, lesson.chestReward!.coins, lesson.chestReward!.xp)}
                    className={`p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative group cursor-pointer ${
                      openedChests.includes(lesson.id)
                        ? 'bg-brand-beige border border-brand-gray text-brand-dark/30'
                        : isCompleted
                        ? 'bg-brand-orange border-2 border-brand-yellow text-brand-dark animate-bounce shadow-xl hover:scale-110 shadow-brand-orange/20'
                        : 'bg-brand-gray/20 border border-brand-gray/40 text-brand-dark/30'
                    }`}
                    title={openedChests.includes(lesson.id) ? 'Cofre vaciado' : isCompleted ? '¡Cofre disponible! Haz clic para reclamar' : 'Cofre bloqueado'}
                  >
                    <Gift className={`w-6 h-6 ${openedChests.includes(lesson.id) ? 'stroke-brand-dark/30' : 'animate-pulse'}`} />
                    <span className="text-[9px] font-black font-mono tracking-wider mt-1 block uppercase text-center w-full">
                      Cofre +{lesson.chestReward.coins}$
                    </span>
                  </button>
                  
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
