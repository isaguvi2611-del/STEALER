import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction, Goal, DiaryEntry, Challenge, Badge, LessonModule, EmotionType } from '../types';
import { LESSONS_DATA } from '../lessonsData';

interface PandaContextType {
  xp: number;
  coins: number;
  streak: number;
  hearts: number;
  levelName: string;
  levelNumber: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  transactions: Transaction[];
  goals: Goal[];
  diaryEntries: DiaryEntry[];
  challenges: Challenge[];
  badges: Badge[];
  completedModuleIds: number[];
  unlockedModuleIds: number[];
  activeQuizModule: LessonModule | null;
  openQuiz: (mod: LessonModule) => void;
  closeQuiz: () => void;
  completeModule: (moduleId: number) => void;
  addTransaction: (type: 'ingreso' | 'gasto', amount: number, category: Transaction['category'], description: string) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (name: string, target: number, category: Goal['category'], deadline: string) => void;
  addMoneyToGoal: (id: string, amount: number) => void;
  addDiaryEntry: (emotion: EmotionType, reflection: string) => void;
  claimChallenge: (id: string) => void;
  refillHearts: () => void;
  addXP: (amount: number) => void;
  addCoins: (amount: number) => void;
  resetAll: () => void;
}

const PandaContext = createContext<PandaContextType | undefined>(undefined);

export function PandaProvider({ children }: { children: React.ReactNode }) {
  // --- Standard User Stats ---
  const [xp, setXp] = useState<number>(120);
  const [coins, setCoins] = useState<number>(350);
  const [streak, setStreak] = useState<number>(5);
  const [hearts, setHearts] = useState<number>(5);
  const [activeTab, setActiveTab] = useState<string>('aprender');

  // --- Core Game Progression ---
  const [completedModuleIds, setCompletedModuleIds] = useState<number[]>([1]);
  const [unlockedModuleIds, setUnlockedModuleIds] = useState<number[]>([1, 2]);

  // --- Dynamic Quitting/Learning Modal ---
  const [activeQuizModule, setActiveQuizModule] = useState<LessonModule | null>(null);

  // --- Transactions (Listado + Categorías) ---
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-1',
      type: 'ingreso',
      amount: 1500000,
      category: 'Otros',
      description: 'Bono de fin de mes o mesada',
      date: '2026-06-08'
    },
    {
      id: 'tx-2',
      type: 'gasto',
      amount: 39900,
      category: 'Entretenimiento',
      description: 'Suscripción de streaming de video',
      date: '2026-06-09'
    },
    {
      id: 'tx-3',
      type: 'gasto',
      amount: 150000,
      category: 'Comida',
      description: 'Supermercado semanal',
      date: '2026-06-10'
    },
    {
      id: 'tx-4',
      type: 'gasto',
      amount: 12000,
      category: 'Transporte',
      description: 'Pasajes de TransMilenio / autobús',
      date: '2026-06-10'
    }
  ]);

  // --- Savings Goals ---
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 'goal-1',
      name: 'Fondo de Emergencia Inicial',
      targetAmount: 1500000,
      currentAmount: 750000,
      category: 'emergencias',
      deadline: '2026-08-31'
    },
    {
      id: 'goal-2',
      name: 'Comprar mi nuevo celular',
      targetAmount: 1200000,
      currentAmount: 480000,
      category: 'celular',
      deadline: '2026-12-15'
    },
    {
      id: 'goal-3',
      name: 'Viaje mochilero a la montaña',
      targetAmount: 2500000,
      currentAmount: 600000,
      category: 'viajes',
      deadline: '2026-10-10'
    }
  ]);

  // --- Emotional Bitácora/Diary ---
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    {
      id: 'diary-1',
      emotion: 'bien',
      reflection: 'Hoy logré registrar todos mis gastos hormiga y gasté un poco menos en café fuera de casa.',
      date: '2026-06-09'
    }
  ]);

  // --- Daily Challenges ---
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'ch-1',
      text: 'Registra un gasto nuevo hoy',
      type: 'gasto',
      target: 1,
      current: 0,
      rewardXP: 10,
      rewardCoins: 15,
      completed: false,
      claimed: false
    },
    {
      id: 'ch-2',
      text: 'Completa una lección en la ruta',
      type: 'leccion',
      target: 1,
      current: 0,
      rewardXP: 20,
      rewardCoins: 25,
      completed: false,
      claimed: false
    },
    {
      id: 'ch-3',
      text: 'Describe tus emociones en tu Diario',
      type: 'diario',
      target: 1,
      current: 0,
      rewardXP: 10,
      rewardCoins: 10,
      completed: false,
      claimed: false
    },
    {
      id: 'ch-4',
      text: 'Acumula un total de 200 XP de sabiduría',
      type: 'xp',
      target: 200,
      current: 120,
      rewardXP: 40,
      rewardCoins: 30,
      completed: false,
      claimed: false
    }
  ]);

  // --- Achievements / Insignias ---
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 'badge-1',
      name: 'Primeros Pasos',
      description: 'Completa la primera lección: ¿Qué es el dinero?',
      iconName: 'Compass',
      unlocked: true,
      unlockText: '¡Completaste tu primera lección!'
    },
    {
      id: 'badge-2',
      name: 'Ahorrador de Altura',
      description: 'Ten al menos un 50% ahorrado en cualquiera de tus metas.',
      iconName: 'PiggyBank',
      unlocked: false,
      unlockText: 'Ahorrado 50% de una de tus metas activas.'
    },
    {
      id: 'badge-3',
      name: 'Mente Imperturbable',
      description: 'Escribe tu primera anotación en la bitácora emocional financiera.',
      iconName: 'BookOpen',
      unlocked: true,
      unlockText: 'Registrado un reporte de bienestar en tu diario.'
    },
    {
      id: 'badge-4',
      name: 'Cero Deudas',
      description: 'Completa la lección de "Cómo evitar deudas" (Módulo 8).',
      iconName: 'Shield',
      unlocked: false,
      unlockText: 'Logra completar el nivel 8 sobre deudas nocivas.'
    },
    {
      id: 'badge-5',
      name: 'Maestro Financiero',
      description: 'Alcanza la XP suficiente para convertirte en Maestro Financiero.',
      iconName: 'Award',
      unlocked: false,
      unlockText: 'Consigue 500 XP acumulados.'
    }
  ]);

  // --- Rank System Calculations ---
  let levelNumber = 1;
  let levelName = 'Gatito Aprendiz 🧸';

  if (xp >= 1000) {
    levelNumber = 6;
    levelName = 'Gato Maestro Financiero 👑';
  } else if (xp >= 700) {
    levelNumber = 5;
    levelName = 'Gato Inversionista Ninja 🥷';
  } else if (xp >= 450) {
    levelNumber = 4;
    levelName = 'Gatito Caza-Ofertas Exitoso 🎯';
  } else if (xp >= 250) {
    levelNumber = 3;
    levelName = 'Gatito de Bolsillo Organizado 🎒';
  } else if (xp >= 100) {
    levelNumber = 2;
    levelName = 'Gatito Ahorrador Inteligente 🐾';
  }

  // --- Manage XP, Coins and Ranks ---
  const addXP = (amount: number) => {
    setXp((prev) => {
      const next = prev + amount;
      // Sync XP challenge
      updateChallengeProgress('xp', next);
      // Auto-unlock Maestro badge if they hit 500 XP
      if (next >= 500) {
        unlockBadge('badge-5');
      }
      return next;
    });
  };

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  // --- Helper to Unlock Badges ---
  const unlockBadge = (id: string) => {
    setBadges((prev) =>
      prev.map((b) => (b.id === id ? { ...b, unlocked: true } : b))
    );
  };

  // --- Helper to update specific challenges ---
  const updateChallengeProgress = (type: Challenge['type'], value: number) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.type === type && !ch.completed) {
          const newCurrent = Math.min(ch.target, ch.current + value);
          const completed = newCurrent >= ch.target;
          return { ...ch, current: newCurrent, completed };
        }
        if (type === 'xp' && ch.type === 'xp') {
          const completed = value >= ch.target;
          return { ...ch, current: value, completed };
        }
        return ch;
      })
    );
  };

  // --- Interactive Quiz Actions ---
  const openQuiz = (mod: LessonModule) => {
    setActiveQuizModule(mod);
  };

  const closeQuiz = () => {
    setActiveQuizModule(null);
  };

  const completeModule = (moduleId: number) => {
    if (!completedModuleIds.includes(moduleId)) {
      setCompletedModuleIds((prev) => [...prev, moduleId]);
    }
    // Grant standard lesson completions
    updateChallengeProgress('leccion', 1);

    // Unlocking Badge 1 on module 1 completion
    if (moduleId === 1) {
      unlockBadge('badge-1');
    }
    // Unlocking Badge 4 on module 8 completion
    if (moduleId === 8) {
      unlockBadge('badge-4');
    }

    // Unlock subsequent module in the central Duolingo track
    const currentModuleIndex = LESSONS_DATA.findIndex((l) => l.id === moduleId);
    if (currentModuleIndex !== -1 && currentModuleIndex + 1 < LESSONS_DATA.length) {
      const nextModule = LESSONS_DATA[currentModuleIndex + 1];
      if (!unlockedModuleIds.includes(nextModule.id)) {
        setUnlockedModuleIds((prev) => [...prev, nextModule.id]);
      }
    }

    // Boost Streak on lesson completion
    setStreak((prev) => prev + 1);
  };

  // --- Transaction Actions ---
  const addTransaction = (
    type: 'ingreso' | 'gasto',
    amount: number,
    category: Transaction['category'],
    description: string
  ) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type,
      amount,
      category,
      description: description || (type === 'ingreso' ? 'Ingreso extra' : 'Gasto general'),
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions((prev) => [newTx, ...prev]);

    if (type === 'gasto') {
      updateChallengeProgress('gasto', 1);
    }
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  // --- Goal Actions ---
  const addGoal = (name: string, target: number, category: Goal['category'], deadline: string) => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      name,
      targetAmount: target,
      currentAmount: 0,
      category,
      deadline: deadline || '2026-12-31'
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const addMoneyToGoal = (id: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const proposed = g.currentAmount + amount;
          const currentAmount = Math.min(g.targetAmount, proposed);
          
          // Check for badge 2 (50% saved)
          if (currentAmount / g.targetAmount >= 0.5) {
            unlockBadge('badge-2');
          }
          return { ...g, currentAmount };
        }
        return g;
      })
    );
  };

  // --- Emotional Bitácora Actions ---
  const addDiaryEntry = (emotion: EmotionType, reflection: string) => {
    const newEntry: DiaryEntry = {
      id: `diary-${Date.now()}`,
      emotion,
      reflection,
      date: new Date().toISOString().split('T')[0]
    };
    setDiaryEntries((prev) => [newEntry, ...prev]);
    updateChallengeProgress('diario', 1);
    unlockBadge('badge-3');
  };

  // --- Claim Challenge rewards ---
  const claimChallenge = (id: string) => {
    const chal = challenges.find((ch) => ch.id === id);
    if (chal && chal.completed && !chal.claimed) {
      addXP(chal.rewardXP);
      addCoins(chal.rewardCoins);
      setChallenges((prev) =>
        prev.map((ch) => (ch.id === id ? { ...ch, claimed: true } : ch))
      );
    }
  };

  // --- Refill hearts flow ---
  const refillHearts = () => {
    if (coins >= 100 && hearts < 5) {
      setCoins((prev) => prev - 100);
      setHearts(5);
    } else if (hearts < 5) {
      // Free fallback if user spends it all so they are never softlocked
      setHearts(5);
    }
  };

  const resetAll = () => {
    setXp(120);
    setCoins(350);
    setHearts(5);
    setStreak(5);
    setCompletedModuleIds([1]);
    setUnlockedModuleIds([1, 2]);
    setActiveTab('aprender');
    setDiaryEntries([
      {
        id: 'diary-1',
        emotion: 'bien',
        reflection: '¡Reinicié mis finanzas para volver a entrenar con STEALER!',
        date: '2026-06-10'
      }
    ]);
  };

  return (
    <PandaContext.Provider
      value={{
        xp,
        coins,
        streak,
        hearts,
        levelName,
        levelNumber,
        activeTab,
        setActiveTab,
        transactions,
        goals,
        diaryEntries,
        challenges,
        badges,
        completedModuleIds,
        unlockedModuleIds,
        activeQuizModule,
        openQuiz,
        closeQuiz,
        completeModule,
        addTransaction,
        deleteTransaction,
        addGoal,
        addMoneyToGoal,
        addDiaryEntry,
        claimChallenge,
        refillHearts,
        addXP,
        addCoins,
        resetAll
      }}
    >
      {children}
    </PandaContext.Provider>
  );
}

export function usePanda() {
  const context = useContext(PandaContext);
  if (context === undefined) {
    throw new Error('usePanda must be used within a PandaProvider');
  }
  return context;
}
