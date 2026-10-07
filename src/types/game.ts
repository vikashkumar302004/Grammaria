export type TerritoryStatus = 'locked' | 'accessible' | 'enemy-controlled' | 'captured' | 'capital-locked';

export interface GrammarQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attackPower: number;
}

export interface Territory {
  id: string;
  name: string;
  alias?: string;
  topic: string;
  grammarCategory: string;
  status: TerritoryStatus;
  enemyControl: number; // 0 to 100
  x: number; // relative % from left
  y: number; // relative % from top
  levelRequired: number;
  xpReward: number;
  coinsReward: number;
  description: string;
  studyGuide: {
    summary: string;
    keyRules: string[];
    examples: { correct: string; incorrect: string }[];
  };
  sampleQuestions: GrammarQuestion[];
}

export interface PlayerState {
  name: string;
  className: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  gems: number;
  avatarUrl: string;
  capturedTerritoriesCount: number;
  totalTerritories: number;
  streak: number;
  weakTopics: string[];
  strongTopics: string[];
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  capturedCount: number;
  status: 'In Assault' | 'Idle' | 'Victorious';
}
