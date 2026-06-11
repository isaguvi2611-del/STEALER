import React from 'react';
import { usePanda } from '../context/PandaContext';
import {
  Compass,
  Calculator,
  Target,
  Smile,
  Wallet,
  Zap,
  Award,
  User,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import StealerCat from './StealerCat';

export default function Sidebar() {
  const { activeTab, setActiveTab, resetAll, levelName } = usePanda();

  const menuItems = [
    { id: 'aprender', label: 'Aprender', icon: Compass },
    { id: 'chat_ia', label: 'Chat con IA 🐾', icon: Sparkles },
    { id: 'simulador', label: 'Simulador', icon: Calculator },
    { id: 'metas', label: 'Metas', icon: Target },
    { id: 'emociones', label: 'Mi Diario', icon: Smile },
    { id: 'finanzas', label: 'Mis Finanzas', icon: Wallet },
    { id: 'desafios', label: 'Desafíos', icon: Zap },
    { id: 'logros', label: 'Logros', icon: Award },
  ];

  return (
    <aside className="w-64 max-h-screen sticky top-0 hidden md:flex flex-col border-r border-brand-gray/60 bg-white p-5 justify-between select-none relative overflow-visible">
      
      {/* Adorable peak-a-boo Stealer kittens decorating the outside coordinates (bouncing/floating outside) */}
      <div className="absolute -left-5 top-20 w-10 h-10 pointer-events-none select-none filter drop-shadow hover:scale-125 transition-transform animate-bounce" style={{ animationDuration: '3.5s' }} title="¡Hola, humano!">
        <StealerCat size="100%" expression="happy" />
      </div>
      <div className="absolute -right-6 top-44 w-12 h-12 pointer-events-none select-none filter drop-shadow-md hover:scale-125 transition-transform animate-float" style={{ animationDuration: '4s' }} title="¡Stealer vigila!">
        <StealerCat size="100%" expression="normal" />
      </div>
      <div className="absolute -left-6 bottom-44 w-11 h-11 pointer-events-none select-none filter drop-shadow hover:scale-125 transition-transform animate-float" style={{ animationDuration: '4.8s' }} title="¡Prepárate!">
        <StealerCat size="100%" expression="normal" />
      </div>
      <div className="absolute -right-5 bottom-20 w-10 h-10 pointer-events-none select-none filter drop-shadow hover:scale-125 transition-transform animate-bounce" style={{ animationDuration: '3.2s' }} title="¡Miau!">
        <StealerCat size="100%" expression="happy" />
      </div>

      <div className="flex flex-col gap-6">
        {/* Logo Brand Panel with an incredibly adorable, bright, premium STEALER Mascot logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center p-1 rounded-2xl bg-[#ffaabc]/10 border border-[#ffaabc]/25 shadow-sm hover:scale-110 transition-transform duration-300">
            <StealerCat size={44} expression="happy" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-pink rounded-full border-2 border-white animate-pulse" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-brand-dark block leading-none mb-1">
              STEALER
            </span>
            <span className="block text-[9px] text-brand-pink font-mono tracking-widest uppercase font-black">
              Mi Coach Gatito 🐾
            </span>
          </div>
        </div>

        {/* Mascot Mini Widget */}
        <div className="bg-brand-cream/80 rounded-2xl p-4 border border-brand-gray/80 flex flex-col items-center gap-2 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ffaabc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <StealerCat size={88} expression="normal" />

          <div className="text-center z-10 w-full">
            <p className="text-xs text-brand-dark/70 font-bold">Guía de hoy:</p>
            <p className="text-sm text-brand-green font-black tracking-tight truncate w-full">
              Gatito Stealer 🐾
            </p>
            <span className="inline-block px-3 py-0.5 mt-1 text-[9px] bg-brand-yellow text-brand-dark font-mono rounded-full border border-brand-orange/30 font-bold">
              {levelName}
            </span>
          </div>
        </div>

        {/* Navigation Menus */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer text-left font-bold ${
                  isActive
                    ? 'bg-brand-pink text-white shadow-md shadow-brand-pink/20 scale-[1.02] border-b-2 border-brand-coral'
                    : 'text-brand-dark/70 hover:text-brand-dark hover:bg-brand-yellow/30 hover:translate-x-1'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-3 pt-4 border-t border-brand-gray/60">
        {/* Action button "Comenzar aprendizaje" */}
        <button
          id="btn-sidebar-comenzar"
          onClick={() => setActiveTab('aprender')}
          className="w-full py-3 px-4 bg-brand-yellow hover:bg-brand-yellow/90 active:scale-95 text-brand-dark font-black text-sm rounded-xl transition-all duration-200 tracking-wide border-b-2 border-brand-orange shadow-md shadow-brand-yellow/10 cursor-pointer flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4 animate-spin-slow text-brand-dark" />
          ¡Comenzar Lección!
        </button>

        {/* Reset settings */}
        <button
          onClick={() => {
            if (window.confirm('¿Quieres reiniciar tu racha, XP y progreso financiero?')) {
              resetAll();
            }
          }}
          className="flex items-center justify-center gap-2 py-1.5 text-xs text-brand-dark/50 hover:text-brand-coral font-bold cursor-pointer transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reiniciar Progreso
        </button>
      </div>
    </aside>
  );
}
