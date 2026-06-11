import React, { useState } from 'react';
import { PandaProvider, usePanda } from './context/PandaContext';
import Sidebar from './components/Sidebar';
import ProgressPanel from './components/ProgressPanel';
import LearningPath from './components/LearningPath';
import Simulator from './components/Simulator';
import ExpensesTracker from './components/ExpensesTracker';
import GoalsTracker from './components/GoalsTracker';
import EmotionalDiary from './components/EmotionalDiary';
import ChallengesPanel from './components/ChallengesPanel';
import AchievementsPanel from './components/AchievementsPanel';
import QuizModal from './components/QuizModal';
import StealerCat from './components/StealerCat';
import ChatPanel from './components/ChatPanel';

import {
  Compass,
  Calculator,
  Target,
  Smile,
  Wallet,
  Menu,
  Flame,
  Star,
  Heart,
  Grid,
  Sparkles
} from 'lucide-react';

function DashboardContent() {
  const {
    activeTab,
    setActiveTab,
    activeQuizModule,
    closeQuiz,
    streak,
    coins,
    xp,
    hearts,
    refillHearts
  } = usePanda();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Render active main content view depending on tab state
  const renderMainView = () => {
    switch (activeTab) {
      case 'aprender':
        return <LearningPath />;
      case 'chat_ia':
        return <ChatPanel />;
      case 'simulador':
        return <Simulator />;
      case 'metas':
        return <GoalsTracker />;
      case 'emociones':
        return <EmotionalDiary />;
      case 'finanzas':
        return <ExpensesTracker />;
      case 'desafios':
        return <ChallengesPanel />;
      case 'logros':
        return <AchievementsPanel />;
      default:
        return <LearningPath />;
    }
  };

  const mobileNavItems = [
    { id: 'aprender', label: 'Ruta', icon: Compass },
    { id: 'simulador', label: 'Simulador', icon: Calculator },
    { id: 'metas', label: 'Metas', icon: Target },
    { id: 'emociones', label: 'Diario', icon: Smile },
    { id: 'finanzas', label: 'Gastos', icon: Wallet },
  ];

  return (
    <div className="flex w-full min-h-screen bg-brand-beige text-brand-dark font-sans antialiased overflow-hidden select-none relative">
      
      {/* 1. LEFT SIDEBAR COMPONENT (Desktop) */}
      <Sidebar />

      {/* 2. CENTRAL ACTIVE WORKSPACE CONTAINER */}
      <main className="flex-1 flex flex-col min-w-0 bg-brand-cream border-r border-brand-gray/60 relative">
        
        {/* Mobile Header Bar */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-brand-gray/70 sticky top-0 z-30 select-none">
          <div className="flex items-center gap-2">
            {/* Adorable Mini Logo */}
            <div className="relative flex items-center justify-center p-1 rounded-xl bg-[#ffaabc]/10 border border-[#ffaabc]/20">
              <StealerCat size={28} expression="happy" />
            </div>
            <span className="font-extrabold text-brand-dark text-base tracking-tight">
              STEALER <span className="text-[10px] text-brand-pink block font-black leading-none uppercase tracking-widest font-mono">Coach 🐾</span>
            </span>
          </div>

          {/* Core mini headers */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-brand-orange/10 px-2 py-0.5 rounded-lg border border-brand-orange/20">
              <Flame className="w-4 h-4 text-brand-orange fill-brand-orange" />
              <span className="text-xs font-bold font-mono text-brand-dark">{streak}</span>
            </div>
            <div className="flex items-center gap-1 bg-brand-yellow/10 px-2 py-0.5 rounded-lg border border-brand-yellow/35">
              <Star className="w-4 h-4 text-brand-orange fill-brand-yellow" />
              <span className="text-xs font-bold font-mono text-brand-dark">{xp}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer bg-brand-coral/10 px-2 py-0.5 rounded-lg border border-brand-coral/20" onClick={refillHearts}>
              <Heart className={`w-4 h-4 ${hearts > 0 ? 'text-brand-coral fill-brand-coral' : 'text-gray-400 animate-pulse'}`} />
              <span className="text-xs font-bold font-mono text-brand-dark">{hearts}</span>
            </div>

            {/* Menu options trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 px-2 rounded bg-brand-pink/10 text-brand-pink border border-brand-pink/20"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Floating Mobile drop-down utility panel */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 max-h-screen bg-white/95 backdrop-blur-md z-40 border-b border-brand-gray/60 p-4 flex flex-col gap-3 select-none">
            <p className="text-[10px] uppercase font-bold text-brand-dark/40 font-mono">Más Secciones</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { setActiveTab('desafios'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 rounded-xl border font-bold text-left ${activeTab === 'desafios' ? 'bg-brand-pink border-brand-coral text-white' : 'bg-brand-beige border-brand-gray text-brand-dark/70'}`}
              >
                ⚡ Desafíos Diarios
              </button>
              <button
                onClick={() => { setActiveTab('logros'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 rounded-xl border font-bold text-left ${activeTab === 'logros' ? 'bg-brand-pink border-brand-coral text-white' : 'bg-brand-beige border-brand-gray text-brand-dark/70'}`}
              >
                🏆 Vitrina de Logros
              </button>
              <button
                onClick={() => { setActiveTab('chat_ia'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 rounded-xl border font-bold text-left col-span-2 ${activeTab === 'chat_ia' ? 'bg-brand-pink border-brand-coral text-white' : 'bg-brand-beige border-brand-gray text-brand-dark/70'}`}
              >
                ✨ Chat con IA 🐾
              </button>
            </div>
          </div>
        )}

        {/* Actual Dynamic Body Section */}
        <div className="flex-1 flex flex-col justify-between overflow-hidden">
          {renderMainView()}
        </div>

        {/* Mobile bottom navigation bar layout */}
        <nav className="md:hidden flex items-center justify-around bg-white border-t border-brand-gray/60 py-2 relative pb-safe">
          {mobileNavItems.map((item) => {
            const IconComp = item.icon;
            const isSel = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all ${
                  isSel ? 'text-brand-pink scale-105' : 'text-brand-dark/65'
                }`}
              >
                <IconComp className="w-5.5 h-5.5" />
                <span className="text-[10px] font-bold mt-1 font-sans">{item.label}</span>
              </button>
            );
          })}
        </nav>

      </main>

      {/* 3. RIGHT PROGRESS PANEL COMPONENT (Desktop) */}
      <div className="hidden xl:flex flex-col">
        <ProgressPanel />
      </div>

      {/* 4. FLOATING INTERACTIVE ACTIVE QUIZ OVERLAY MODAL */}
      {activeQuizModule && (
        <QuizModal
          module={activeQuizModule}
          onClose={closeQuiz}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <PandaProvider>
      <DashboardContent />
    </PandaProvider>
  );
}
export { App };
