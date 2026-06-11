import React from 'react';
import { usePanda } from '../context/PandaContext';
import { Badge } from '../types';
import {
  Compass,
  PiggyBank,
  BookOpen,
  Shield,
  Award,
  Sparkles,
  Trophy,
  Lock
} from 'lucide-react';

export default function AchievementsPanel() {
  const { badges, xp, levelName } = usePanda();

  // Mapping string to lucide icons
  const iconMap: Record<string, any> = {
    Compass: Compass,
    PiggyBank: PiggyBank,
    BookOpen: BookOpen,
    Shield: Shield,
    Award: Award
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen text-brand-dark select-none bg-brand-cream">
      
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-black tracking-wider text-brand-pink uppercase">
            MEDALLAS Y CONOCIMIENTO
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Mis Vitrina de Logros
          </h1>
        </div>
        
        <div className="bg-brand-pink/15 border border-brand-pink/25 px-3.5 py-1.5 rounded-xl text-xs font-black text-brand-pink flex items-center gap-2">
          <Trophy className="w-4 h-4 text-brand-pink animate-bounce" />
          <span>Colección Oficial</span>
        </div>
      </div>

      {/* Ranks overview banner */}
      <div className="bg-white border border-brand-gray/80 rounded-3xl p-6 mb-8 shadow-sm max-w-4xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 text-brand-dark">
        <div className="absolute top-0 right-0 w-44 h-44 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4">
          <div className="bg-brand-pink/15 p-4 rounded-2xl border border-brand-pink/25 text-brand-pink animate-pulse">
            <Trophy className="w-8 h-8 font-black" />
          </div>
          <div>
            <h3 className="text-xs font-black font-mono uppercase tracking-widest text-brand-pink">
              Jerarquía de Gatos Sabios 🐾
            </h3>
            <h2 className="text-xl font-black text-brand-dark mt-1">
              Rango Actual: {levelName}
            </h2>
            <p className="text-xs text-brand-dark font-medium mt-1">
              Has acumulado <span className="font-mono font-black text-brand-pink">{xp} XP</span> totales en tu preparación.
            </p>
          </div>
        </div>

        {/* Level Ranks criteria */}
        <div className="bg-brand-cream/80 p-4 rounded-2xl border border-brand-gray/80 text-[10px] space-y-1.5 font-bold text-brand-dark/70 flex flex-col justify-center min-w-[260px]">
          <div className="flex justify-between items-center text-brand-dark font-black">
            <span>👑 Gato Maestro Financiero:</span>
            <span className="font-mono">1000+ XP</span>
          </div>
          <div className="flex justify-between items-center text-brand-dark/90 font-black">
            <span>🥷 Gato Inversionista Ninja:</span>
            <span className="font-mono">700 - 999 XP</span>
          </div>
          <div className="flex justify-between items-center text-brand-dark/80 font-bold">
            <span>🎯 Gatito Caza-Ofertas:</span>
            <span className="font-mono">450 - 699 XP</span>
          </div>
          <div className="flex justify-between items-center text-brand-dark/70 font-semibold">
            <span>🎒 Gatito Organizado:</span>
            <span className="font-mono">250 - 449 XP</span>
          </div>
          <div className="flex justify-between items-center text-brand-dark/65 font-medium">
            <span>🐾 Gatito Ahorrador:</span>
            <span className="font-mono">100 - 249 XP</span>
          </div>
        </div>
      </div>

      {/* Grid listing badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20 max-w-4xl">
        {badges.map((b) => {
          const IconComp = iconMap[b.iconName] || Trophy;
          const isUnlocked = b.unlocked;

          return (
            <div
              key={b.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between min-h-[170px] relative overflow-hidden transition-all duration-300 ${
                isUnlocked
                  ? 'bg-white border-brand-pink/55 shadow-sm scale-[1.01]'
                  : 'bg-brand-cream/40 border-brand-gray/50 opacity-70'
              }`}
            >
              {/* Lock watermark overlay inside locked badges */}
              {!isUnlocked && (
                <div className="absolute top-2.5 right-2.5 bg-brand-cream p-1.5 rounded-lg border border-brand-gray/80 text-brand-dark/40">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Header Badge */}
              <div className="flex items-center gap-3.5">
                <div className={`p-3 rounded-2xl border transition-colors ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-brand-pink to-brand-orange text-white border-t border-white/20 animate-float'
                    : 'bg-brand-cream text-brand-dark/30 border-transparent'
                }`}>
                  <IconComp className="w-6 h-6 stroke-[2]" />
                </div>
                
                <div>
                  <h3 className={`text-sm font-black truncate leading-tight ${isUnlocked ? 'text-brand-dark' : 'text-brand-dark/50'}`}>
                    {b.name}
                  </h3>
                  <span className={`text-[9px] font-black font-mono tracking-wider px-1.5 py-0.5 rounded-full uppercase inline-block mt-1 ${isUnlocked ? 'bg-brand-pink/15 text-brand-pink' : 'bg-brand-cream text-brand-dark/40 border border-brand-gray/80'}`}>
                    {isUnlocked ? 'Desbloqueado' : 'Pendiente'}
                  </span>
                </div>
              </div>

              {/* Middle desc */}
              <div className="my-3 flex-1">
                <p className={`text-xs leading-normal ${isUnlocked ? 'text-brand-dark/85 font-semibold' : 'text-brand-dark/45'}`}>
                  {b.description}
                </p>
              </div>

              {/* Footer info text how to unlock */}
              <div className="pt-2 border-t border-brand-gray/50 text-[9px] text-brand-dark/50 leading-normal italic font-bold">
                {isUnlocked ? `🎯 ${b.unlockText}` : `ℹ️ Condición: Completa las actividades indicadas para lucir este escudo.`}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
