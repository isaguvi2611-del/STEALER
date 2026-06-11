import React, { useState } from 'react';
import { usePanda } from '../context/PandaContext';
import { Goal } from '../types';
import { Target, Calendar, PlusCircle, Sparkles, Plus, CheckCircle2 } from 'lucide-react';

export default function GoalsTracker() {
  const {
    goals,
    addGoal,
    addMoneyToGoal
  } = usePanda();

  // New goal creation inputs
  const [name, setName] = useState<string>('');
  const [target, setTarget] = useState<string>('');
  const [category, setCategory] = useState<Goal['category']>('viajes');
  const [deadline, setDeadline] = useState<string>('');

  // Interactive deposit tracking
  const [activeDepositGoalId, setActiveDepositGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const numTarget = parseFloat(target);
    if (!name || isNaN(numTarget) || numTarget <= 0) {
      alert('Por favor, ingresa un nombre válido y un monto objetivo razonable.');
      return;
    }
    
    addGoal(name, numTarget, category, deadline);
    
    // Clear
    setName('');
    setTarget('');
    setDeadline('');
  };

  const handleDepositFunds = (id: string) => {
    const numDeposit = parseFloat(depositAmount);
    if (isNaN(numDeposit) || numDeposit <= 0) {
      alert('Ingresa un monto válido a ahorrar.');
      return;
    }
    addMoneyToGoal(id, numDeposit);
    setDepositAmount('');
    setActiveDepositGoalId(null);
  };

  const categoryIcons = {
    viajes: '✈️',
    celular: '📱',
    universidad: '🎓',
    emergencias: '🔋',
    negocios: '💼',
    otro: '🎯'
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen text-brand-dark select-none bg-brand-cream">
      
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-black tracking-wider text-brand-pink uppercase">
            ESTRATEGIAS DE ÉXITO
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Mis Metas de Ahorro
          </h1>
        </div>
        
        <div className="bg-brand-pink/15 text-brand-pink border border-brand-pink/25 px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5">
          <Target className="w-4 h-4" />
          Plan S.M.A.R.T.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        
        {/* --- FORM CREATOR (Left) --- */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-brand-gray/80 shadow-sm h-fit text-brand-dark">
          <h2 className="text-base font-black text-brand-dark mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-brand-pink" />
            Nueva Meta de Ahorro
          </h2>

          <form onSubmit={handleCreateGoal} className="flex flex-col gap-4 text-xs">
            
            {/* Goal name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-dark/70">¿Qué estás planeando lograr?</label>
              <input
                id="goal-input-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Vacaciones, Rentar depto, Beca..."
                className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink px-4 py-3 rounded-xl outline-none text-sm text-brand-dark font-bold"
                required
              />
            </div>

            {/* Target amount */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-dark/70">Monto del Objetivo ($ COP)</label>
              <input
                id="goal-input-target"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Ej. 1500000"
                className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink px-4 py-3 rounded-xl outline-none text-sm text-brand-dark font-bold"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-dark/70">Tipo de Meta</label>
              <select
                id="goal-input-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Goal['category'])}
                className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink px-4 py-3 rounded-xl outline-none text-sm text-brand-dark font-bold"
              >
                <option value="viajes">✈️ Viajes</option>
                <option value="celular">📱 Comprar Celular / Dispositivo</option>
                <option value="universidad">🎓 Universidad / Escuela</option>
                <option value="emergencias">🔋 Fondo de Emergencias</option>
                <option value="negocios">💼 Negocios / Emprendimiento</option>
                <option value="otro">🎯 Otro Objetivo</option>
              </select>
            </div>

            {/* Deadline */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-brand-dark/70">Fecha Límite Estimada</label>
              <input
                id="goal-input-deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink px-4 py-3 rounded-xl outline-none text-sm text-brand-dark font-bold"
              />
            </div>

            <button
              id="btn-create-goal"
              type="submit"
              className="w-full py-3.5 bg-brand-yellow hover:bg-brand-yellow/95 text-brand-dark font-black text-sm rounded-xl transition-all shadow-md shadow-brand-yellow/15 border-b-2 border-brand-orange cursor-pointer"
            >
              Crear Meta S.M.A.R.T.
            </button>
          </form>
        </div>

        {/* --- GOALS LIST GRID (Right) --- */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h2 className="text-base font-black text-brand-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
            🎯 Mis Objetivos Activos ({goals.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((g) => {
              const percentage = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100)) || 0;
              const isFinished = percentage >= 100;

              return (
                <div
                  key={g.id}
                  className="bg-white border border-brand-gray/80 rounded-3xl p-5 flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-brand-pink/60 transition-all duration-300 shadow-sm"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-pink/5 rounded-bl-full pointer-events-none group-hover:bg-brand-pink/10 transition-all" />

                  <div>
                    {/* Header: Badge category and custom name */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl" id={`goal-icon-${g.id}`} role="img" aria-label={g.category}>
                          {categoryIcons[g.category] || '🎯'}
                        </span>
                        <div>
                          <h3 className="text-sm font-black text-brand-dark truncate max-w-[130px] tooltip" title={g.name}>
                            {g.name}
                          </h3>
                          <span className="text-[10px] text-brand-dark/50 font-bold capitalize">{g.category}</span>
                        </div>
                      </div>

                      {/* Percent badge */}
                      <span className={`text-xs font-black px-2.5 py-0.5 rounded-full font-mono ${isFinished ? 'bg-brand-green/15 text-brand-green border border-brand-green/20' : 'bg-brand-pink/15 text-brand-pink border border-brand-pink/20'}`}>
                        {percentage}%
                      </span>
                    </div>

                    {/* Progress figures */}
                    <div className="flex justify-between font-mono text-[11px] font-black mt-4 text-brand-dark/70">
                      <span>Ahorrado: <span className="text-brand-dark/95 font-black">${g.currentAmount.toLocaleString()} COP</span></span>
                      <span>Objetivo: ${g.targetAmount.toLocaleString()} COP</span>
                    </div>

                    {/* Colorful progress bar */}
                    <div className="w-full h-2.5 bg-brand-cream rounded-full overflow-hidden mt-1.5 relative border border-brand-gray/30">
                      <div
                        className="h-full bg-gradient-to-r from-brand-pink to-brand-orange rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Goal bottom info or interactive saving deposit */}
                  <div className="pt-2 border-t border-brand-gray/50 text-[10px] flex justify-between items-center text-brand-dark/50 font-bold">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-brand-pink" />
                      Límite: {g.deadline || 'Indefinido'}
                    </span>

                    {isFinished ? (
                      <span className="text-brand-green font-black flex items-center gap-1 text-xs">
                        <CheckCircle2 className="w-4 h-4 fill-brand-green/20" /> Logrado
                      </span>
                    ) : activeDepositGoalId === g.id ? (
                      <div className="flex items-center gap-1 text-xs">
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder="$ Sumar"
                          className="w-16 bg-brand-cream border border-brand-pink rounded px-1.5 py-0.5 text-[10px] outline-none text-brand-dark font-mono font-bold"
                        />
                        <button
                          onClick={() => handleDepositFunds(g.id)}
                          className="px-2 py-0.5 bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark font-black rounded text-[10px] border border-brand-orange/40 cursor-pointer"
                        >
                          Ir
                        </button>
                        <button
                          onClick={() => setActiveDepositGoalId(null)}
                          className="text-brand-dark/50 hover:text-brand-pink font-black"
                        >
                          x
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveDepositGoalId(g.id);
                          setDepositAmount('');
                        }}
                        className="px-2.5 py-1 bg-brand-pink/15 hover:bg-brand-pink/25 text-brand-pink font-black rounded-lg border border-brand-pink/30 cursor-pointer transition-colors"
                      >
                        + Ahorrar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {goals.length === 0 && (
              <div className="col-span-2 text-center py-16 text-xs text-brand-dark/50 italic font-bold">
                No has configurado metas aún. ¡Empieza creando una meta arriba para motivar tus ahorros!
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
