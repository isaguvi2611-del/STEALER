import React from 'react';
import { usePanda } from '../context/PandaContext';
import { Zap, Sparkles, Gift, CheckCircle2 } from 'lucide-react';

export default function ChallengesPanel() {
  const { challenges, claimChallenge } = usePanda();

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen text-brand-dark select-none bg-brand-cream">
      
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-black tracking-wider text-brand-pink uppercase">
            ESTACIÓN DE ENTRENAMIENTO
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Desafíos Diarios
          </h1>
        </div>
        
        <div className="bg-brand-pink/15 text-brand-pink border border-brand-pink/25 px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-brand-pink" />
          Recompensas Activas
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20 max-w-4xl">
        {challenges.map((ch) => {
          const progressPct = Math.min(100, Math.round((ch.current / ch.target) * 100)) || 0;
          const isDone = ch.completed;
          const isClaimed = ch.claimed;

          return (
            <div
              key={ch.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between gap-4 transition-all duration-300 relative overflow-hidden ${
                isClaimed
                  ? 'bg-brand-cream/60 border-brand-gray/60 opacity-60'
                  : isDone
                  ? 'bg-gradient-to-br from-white to-brand-green/10 border-brand-green/50 shadow-sm'
                  : 'bg-white border-brand-gray/80 hover:border-brand-pink/60 shadow-sm'
              }`}
            >
              <div>
                {/* Header status and reward badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-xl ${isDone ? 'bg-brand-green/15 text-brand-green' : 'bg-brand-pink/15 text-brand-pink'}`}>
                      <Zap className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-brand-dark leading-tight">
                        {ch.text}
                      </h3>
                      <span className="text-[10px] text-brand-dark/50 font-mono font-bold">Diario</span>
                    </div>
                  </div>

                  {/* Rewards preview list */}
                  <div className="flex flex-col items-end gap-0.5 text-[9px] font-black font-mono">
                    <span className="text-brand-pink">+{ch.rewardXP} XP</span>
                    <span className="text-brand-orange">+{ch.rewardCoins} Monedas</span>
                  </div>
                </div>

                {/* Progress bar info */}
                <div className="mt-4 flex justify-between font-mono text-[10px] text-brand-dark/50 font-black">
                  <span>Progreso del reto</span>
                  <span>{ch.current} / {ch.target}</span>
                </div>

                <div className="w-full h-2 bg-brand-cream border border-brand-gray/30 rounded-full overflow-hidden mt-1 relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone ? 'bg-brand-green' : 'bg-gradient-to-r from-brand-pink to-brand-orange'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              {/* Claim Reward Button */}
              <div className="pt-2 border-t border-brand-gray/60">
                {isClaimed ? (
                  <span className="text-brand-dark/40 font-black flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-brand-dark/40" /> Recompensa Cobrada
                  </span>
                ) : isDone ? (
                  <button
                    id={`btn-claim-${ch.id}`}
                    onClick={() => claimChallenge(ch.id)}
                    className="w-full py-2.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark font-black text-xs rounded-xl uppercase tracking-widest border-b-2 border-brand-orange transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-brand-yellow/15 animate-bounce"
                  >
                    <Gift className="w-4 h-4" />
                    Reclamar Caja de Premios
                  </button>
                ) : (
                  <span className="text-brand-dark/50 text-[10px] font-bold italic">
                    Completa la actividad indicada para desbloquear la recompensa.
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
