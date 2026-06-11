import React from 'react';
import { usePanda } from '../context/PandaContext';
import { Flame, Star, Shield, Heart, Trophy, Zap, AlertCircle } from 'lucide-react';

export default function ProgressPanel() {
  const {
    xp,
    coins,
    streak,
    hearts,
    levelName,
    challenges,
    goals,
    refillHearts,
    setActiveTab
  } = usePanda();

  // Simulated leaderboard players
  const leaderboardPlayers = [
    { name: 'Mateo (Inversor Súper)', xp: 1200, avatar: '🦁' },
    { name: 'Sofía Ahorros', xp: 850, avatar: '🦊' },
    { name: 'STEALER (Tú)', xp: xp, avatar: '🐈‍⬛' },
    { name: 'Juan Finanzas', xp: 230, avatar: '🐱' },
    { name: 'Camila Cero_Deudas', xp: 105, avatar: '🐰' },
    { name: 'Lucas_Planificador', xp: 80, avatar: '🐨' }
  ];

  // Sort leaderboard by XP
  const sortedPlayers = [...leaderboardPlayers].sort((a, b) => b.xp - a.xp);
  const userRankIndex = sortedPlayers.findIndex((p) => p.name === 'STEALER (Tú)');

  // Determine current division based on level
  let leagueName = 'División Bronce';
  let leagueBadgeBg = 'from-amber-800 to-orange-950 border-amber-700';
  if (xp > 800) {
    leagueName = 'División Diamante';
    leagueBadgeBg = 'from-sky-700 to-indigo-900 border-sky-600';
  } else if (xp > 400) {
    leagueName = 'División Platino';
    leagueBadgeBg = 'from-purple-700 to-indigo-900 border-purple-600';
  } else if (xp > 200) {
    leagueName = 'División Esmeralda';
    leagueBadgeBg = 'from-emerald-700 to-teal-900 border-emerald-600';
  } else if (xp > 100) {
    leagueName = 'División Zafiro';
    leagueBadgeBg = 'from-blue-700 to-purple-900 border-blue-600';
  }

  return (
    <div className="w-80 border-l border-brand-gray/60 bg-white p-5 flex flex-col gap-5 max-h-screen overflow-y-auto sticky top-0 scrollbar select-none text-brand-dark">
      
      {/* --- STATS TOP BAR --- */}
      <div className="flex items-center justify-between bg-brand-cream p-3.5 rounded-2xl border border-brand-gray/80 shadow-sm">
        {/* Streak */}
        <div className="flex items-center gap-1.5 cursor-pointer title-tooltip transition-transform hover:scale-105" title="¡Tu racha diaria!">
          <Flame className="w-5.5 h-5.5 text-brand-orange fill-brand-orange" />
          <span className="font-bold text-brand-dark text-sm font-mono">{streak}</span>
        </div>

        {/* Coins */}
        <div className="flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105" title="Monedas de STEALER">
          <div className="w-5.5 h-5.5 bg-brand-orange rounded-full flex items-center justify-center font-black text-white text-xs font-mono shadow-md shadow-brand-orange/20 animate-spin-slow">
            $
          </div>
          <span className="font-bold text-brand-dark text-sm font-mono">{coins}</span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105" title="Estrellas de Sabiduría XP">
          <Star className="w-5.5 h-5.5 text-brand-orange fill-brand-yellow" />
          <span className="font-bold text-brand-dark text-sm font-mono">{xp} XP</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 relative group">
          <button
            onClick={refillHearts}
            className={`flex items-center gap-1.5 cursor-pointer transition-all duration-300 hover:scale-110 ${
              hearts === 0 ? 'animate-bounce' : ''
            }`}
            title="Tus vidas. ¡Haz clic para recargar por 100!"
          >
            <Heart
              className={`w-5.5 h-5.5 ${
                hearts > 0 ? 'text-brand-coral fill-brand-coral' : 'text-gray-400'
              }`}
            />
            <span className="font-bold text-brand-dark text-sm font-mono">{hearts}</span>
          </button>

          {/* Prompt warning if no hearts */}
          {hearts === 0 && (
            <div className="absolute right-0 top-8 bg-white border-2 border-brand-coral text-brand-dark text-[10px] p-2.5 rounded-xl z-50 w-44 shadow-lg">
              <p className="flex items-center gap-1 font-bold text-brand-coral">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-brand-coral" />
                ¡Sin vidas! Haz clic para recargar.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- PRO EMBLEMA DE RANGO --- */}
      <div className={`p-4 rounded-3xl bg-gradient-to-br ${leagueBadgeBg} border flex items-center gap-3.5 shadow-lg shadow-brand-dark/10 text-white`}>
        <div className="bg-black/20 p-2.5 rounded-2xl border border-white/10 text-white animate-float">
          <Trophy className="w-6 h-6 text-brand-yellow" />
        </div>
        <div>
          <h4 className="text-[10px] text-white/70 font-bold uppercase tracking-widest font-mono">
            Rango de Liga
          </h4>
          <h3 className="text-base font-black text-white leading-tight">
            {leagueName}
          </h3>
          <p className="text-[10px] text-white/80 font-medium">
            Estás en el puesto <span className="font-bold">#{userRankIndex + 1}</span> de la liga
          </p>
        </div>
      </div>

      {/* --- LEADERBOARD --- */}
      <div className="bg-brand-cream rounded-2xl p-4 border border-brand-gray/80 shadow-sm">
        <h4 className="text-[10px] text-brand-dark/50 font-black uppercase tracking-wider mb-3 font-sans">
          Clasificación Semanal
        </h4>
        <div className="flex flex-col gap-2">
          {sortedPlayers.map((player, idx) => {
            const isUser = player.name === 'STEALER (Tú)';
            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-2 rounded-xl border text-xs transition-colors duration-200 ${
                  isUser
                    ? 'bg-brand-pink/10 border-brand-pink text-brand-pink font-bold shadow-sm'
                    : 'bg-white border-brand-gray text-brand-dark/80 font-medium'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-4 font-black font-mono text-brand-dark/40 text-center">
                    {idx + 1}
                  </span>
                  <span className="text-base">{player.avatar}</span>
                  <span className={`font-bold ${isUser ? 'text-brand-pink' : 'text-brand-dark'}`}>
                    {player.name}
                  </span>
                </div>
                <span className="font-mono font-bold text-brand-dark/60">{player.xp} XP</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- DESAFÍOS RÁPIDOS --- */}
      <div className="bg-brand-cream rounded-2xl p-4 border border-brand-gray/80 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] text-brand-dark/50 font-black uppercase tracking-wider font-sans">
            Desafíos Diarios
          </h4>
          <button
            onClick={() => setActiveTab('desafios')}
            className="text-[10px] text-brand-pink font-black hover:underline cursor-pointer"
          >
            Ver todos
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {challenges.slice(0, 2).map((ch) => {
            const progressPct = Math.min(100, (ch.current / ch.target) * 100);
            return (
              <div key={ch.id} className="bg-white p-2.5 rounded-xl border border-brand-gray/60 flex flex-col gap-1.5 shadow-sm">
                <span className="text-xs font-bold text-brand-dark/90 leading-tight">
                  {ch.text}
                </span>
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex-1 h-2 bg-brand-gray/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-pink to-brand-yellow rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-brand-dark/60 font-black whitespace-nowrap">
                    {ch.current}/{ch.target}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- METAS ACTIVAS WIDGET --- */}
      <div className="bg-brand-orange/5 rounded-2xl p-4 border border-brand-orange/20 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] text-brand-orange font-black uppercase tracking-wider font-sans">
            Mis Metas
          </h4>
          <button
            onClick={() => setActiveTab('metas')}
            className="text-[10px] text-brand-pink font-black hover:underline cursor-pointer"
          >
            Añadir Meta
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {goals.slice(0, 2).map((g) => {
            const pct = Math.round((g.currentAmount / g.targetAmount) * 100);
            return (
              <div key={g.id} className="text-xs">
                <div className="flex justify-between items-center mb-1 text-brand-dark/85">
                  <span className="font-bold truncate max-w-44">{g.name}</span>
                  <span className="font-black text-brand-orange font-mono">{pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-brand-gray/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-orange rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
