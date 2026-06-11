import React, { useState } from 'react';
import { usePanda } from '../context/PandaContext';
import { Sparkles, Calculator, Calendar, PiggyBank, ArrowRight, Lightbulb } from 'lucide-react';
import StealerCat from './StealerCat';

export default function Simulator() {
  const { coins } = usePanda();

  // State parameters
  const [goalName, setGoalName] = useState<string>('Mi Viaje Planificado');
  const [targetAmount, setTargetAmount] = useState<number>(3000000);
  const [monthlySavings, setMonthlySavings] = useState<number>(300000);

  // Pre-sets
  const presets = [
    { name: '💻 Laptop Nueva', amount: 3200000, monthly: 400000 },
    { name: '✈️ Viaje Corto', amount: 2000000, monthly: 250000 },
    { name: '🔋 Fondo de Emergencia', amount: 4000000, monthly: 500000 },
    { name: '🚗 Enganche Auto', amount: 15000000, monthly: 1000000 },
  ];

  // Calculations
  const calculatedMonths = Math.ceil(targetAmount / (monthlySavings || 1)) || 0;
  const years = Math.floor(calculatedMonths / 12);
  const remainingMonths = calculatedMonths % 12;

  let timeString = '';
  if (calculatedMonths === 0) {
    timeString = '¡Selecciona tus valores!';
  } else if (years === 0) {
    timeString = `${calculatedMonths} ${calculatedMonths === 1 ? 'mes' : 'meses'}`;
  } else {
    timeString = `${years} ${years === 1 ? 'año' : 'años'} y ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
  }

  // Cost analysis compared to daily expenditures
  const dailyAhorro = Math.round(monthlySavings / 30).toLocaleString();
  const totalWeeks = Math.ceil((calculatedMonths * 30) / 7);

  // Calculate simulated coin stack height for visualization
  const maxStackHeight = 120;
  const currentProgressPercent = Math.min(100, (monthlySavings / (targetAmount || 1)) * 100);
  const animatedStackHeight = Math.max(15, (calculatedMonths > 0 ? (12 / calculatedMonths) : 1) * maxStackHeight);

  // Tips based on results
  let advice = '¡Excelente ritmo! Estimular este volumen te garantiza hábitos prósperos.';
  if (calculatedMonths > 24) {
    advice = '¡Vaya, tomará más de 2 años! Intenta subir $80.000 COP al ahorro mensual disminuyendo gastos hormiga.';
  } else if (calculatedMonths < 5) {
    advice = '¡Plan de alta velocidad! Estupendo enfoque, ya casi tocas tu meta.';
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen text-brand-dark select-none bg-brand-cream">
      
      {/* Title block */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-black tracking-wider text-brand-pink uppercase">
            SIMULADOR INTERACTIVO
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
            Mi Calculadora de Sueños
          </h1>
        </div>
        <div className="bg-brand-pink/15 text-brand-pink px-3.5 py-1.5 rounded-xl border border-brand-pink/25 flex items-center gap-2 font-black text-xs">
          <Calculator className="w-4 h-4 animate-bounce" />
          Previsión Financiera
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        
        {/* --- LEFT FORM INPUTS COLUMN --- */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-brand-gray/80 shadow-sm flex flex-col gap-6">
          <h3 className="text-sm font-black text-brand-dark/70 uppercase tracking-widest flex items-center gap-2 mb-2">
            <PiggyBank className="w-4.5 h-4.5 text-brand-pink" />
            Define tus Parámetros
          </h3>

          {/* Quick Pre-sets Bar */}
          <div>
            <span className="text-xs text-brand-dark/50 block mb-2 font-bold">Presintonías recomendadas de STEALER:</span>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setGoalName(p.name.slice(3));
                    setTargetAmount(p.amount);
                    setMonthlySavings(p.monthly);
                  }}
                  className="bg-brand-cream/80 hover:bg-brand-yellow/30 border border-brand-gray/60 hover:border-brand-orange px-3 py-2 rounded-xl text-xs font-black text-brand-dark transition-all cursor-pointer hover:-translate-y-0.5"
                >
                  {p.name} (${p.amount})
                </button>
              ))}
            </div>
          </div>

          <hr className="border-brand-gray/60" />

          {/* User Input Fields */}
          <div className="flex flex-col gap-4">
            {/* Goal Input Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-brand-pink">¿Qué quieres lograr o comprar?</label>
              <input
                id="sim-input-name"
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="Escribe el nombre de tu sueño..."
                className="w-full bg-brand-cream/40 border border-brand-gray/80 focus:border-brand-pink focus:bg-white px-4 py-3 rounded-xl outline-none text-sm text-brand-dark transition-colors font-semibold"
                maxLength={30}
              />
            </div>

            {/* Target Amount Slider & Number */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-brand-dark">Suma Objetivo (Monto Total)</label>
                <span className="font-black font-mono text-brand-orange text-base">${targetAmount.toLocaleString()} COP</span>
              </div>
              <input
                id="sim-slider-target"
                type="range"
                min={100000}
                max={30000000}
                step={100000}
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-full h-2 bg-brand-gray/50 rounded-lg appearance-none cursor-pointer accent-brand-pink"
              />
              <div className="flex justify-between text-[10px] text-brand-dark/40 font-mono">
                <span>$100.000 COP</span>
                <span>$30.000.000 COP</span>
              </div>
            </div>

            {/* Monthly Savings Slider & Number */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-brand-dark">Ahorro Mensual Sugerido</label>
                <span className="font-black font-mono text-brand-pink text-base">${monthlySavings.toLocaleString()} COP / mes</span>
              </div>
              <input
                id="sim-slider-monthly"
                type="range"
                min={10000}
                max={4000000}
                step={10000}
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="w-full h-2 bg-brand-gray/50 rounded-lg appearance-none cursor-pointer accent-brand-pink"
              />
              <div className="flex justify-between text-[10px] text-brand-dark/40 font-mono">
                <span>$10.000 COP / mes</span>
                <span>$4.000.000 COP / mes</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIMULATED OUTCOMES COLUMN --- */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Result dynamic card */}
          <div className="bg-gradient-to-br from-brand-pink to-brand-coral rounded-3xl p-6 border border-white/20 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px] text-white">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-yellow/30 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <span className="text-[10px] font-mono tracking-wider text-brand-yellow font-black block mb-1 uppercase">
                TIEMPO TOTAL REQUERIDO
              </span>
              <h2 className="text-3xl md:text-3xl font-black text-white tracking-tight drop-shadow-sm">
                {timeString}
              </h2>
              <p className="text-xs text-white/95 mt-2 font-medium">
                Para acumular los <span className="font-black text-brand-yellow">${targetAmount.toLocaleString()} COP</span> para tu plan <span className="text-brand-yellow font-semibold">"{goalName}"</span>.
              </p>
            </div>

            {/* Minor insights */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20 text-xs">
              <div>
                <p className="text-white/80 font-medium">Guardando diariamente:</p>
                <p className="font-mono font-black text-brand-yellow text-base">${dailyAhorro} COP</p>
              </div>
              <div>
                <p className="text-white/80 font-medium">Total semanas activas:</p>
                <p className="font-mono font-black text-brand-yellow text-base">{totalWeeks} semanas</p>
              </div>
            </div>
          </div>

          {/* Visual simulation of savings growing */}
          <div className="bg-white rounded-3xl p-5 border border-brand-gray/80 shadow-sm flex flex-col justify-between gap-5 relative">
            <h4 className="text-xs font-black text-brand-dark/60 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-pink" />
              Esquema de Crecimiento
            </h4>

            {/* Growth Graphic animation utilizing coin vectors or blocks */}
            <div className="h-28 bg-brand-cream/40 rounded-2xl border border-dashed border-brand-gray flex items-end justify-center gap-8 relative overflow-hidden p-3">
              <div className="absolute top-2 left-3 text-[10px] text-brand-dark/40 font-mono">Altura de ahorros</div>
              
              {/* Stack 1 (First Month) */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 bg-amber-600/20 rounded-t-lg border-t border-brand-orange/30" style={{ height: '20px' }}>
                  <div className="w-full text-center text-[9px] text-brand-orange font-bold font-mono mt-0.5">$</div>
                </div>
                <span className="text-[10px] text-brand-dark/50 font-bold">Mes 1</span>
              </div>

              {/* Stack 2 (Midpoint) */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 bg-brand-orange/30 rounded-t-lg border-t border-brand-orange/50" style={{ height: '50px' }}>
                  <div className="w-full text-center text-[9px] text-brand-orange font-bold font-mono mt-0.5">$$</div>
                </div>
                <span className="text-[10px] text-brand-dark/50 font-bold">Ahorro Mitad</span>
              </div>

              {/* Stack 3 (Goal Complete!) */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 bg-brand-pink/40 rounded-t-lg border-t border-brand-pink animate-pulse" style={{ height: '80px' }}>
                  <div className="w-full text-center text-[9px] text-brand-pink font-bold font-mono mt-0.5">$$$</div>
                </div>
                <span className="text-[10px] text-brand-pink font-black">¡Meta!</span>
              </div>
            </div>

            {/* Mascot Advisory Bubble */}
            <div className="bg-brand-cream p-3 rounded-2xl border border-brand-gray/80 flex gap-3 items-center shadow-sm">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <StealerCat size="100%" expression="normal" />
              </div>
              <div>
                <p className="text-[10px] font-black text-brand-pink uppercase tracking-wider">
                  Consejo de STEALER 🐾
                </p>
                <p className="text-xs text-brand-dark/95 italic font-medium leading-tight">
                  "{advice}"
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
