export type EmotionType = 'excelente' | 'bien' | 'regular' | 'preocupado' | 'estresado';

export interface Transaction {
  id: string;
  type: 'ingreso' | 'gasto';
  amount: number;
  category: 'Comida' | 'Transporte' | 'Educación' | 'Entretenimiento' | 'Salud' | 'Otros';
  description: string;
  date: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: 'viajes' | 'celular' | 'universidad' | 'emergencias' | 'negocios' | 'otro';
  deadline: string;
}

export interface DiaryEntry {
  id: string;
  emotion: EmotionType;
  reflection: string;
  date: string;
}

export interface Challenge {
  id: string;
  text: string;
  type: 'gasto' | 'leccion' | 'meta' | 'diario' | 'xp';
  target: number;
  current: number;
  rewardXP: number;
  rewardCoins: number;
  completed: boolean;
  claimed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockText: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface LessonModule {
  id: number;
  title: string;
  subtitle: string;
  questions: Question[];
  rewardXP: number;
  rewardCoins: number;
  chestReward?: {
    coins: number;
    xp: number;
  };
}
