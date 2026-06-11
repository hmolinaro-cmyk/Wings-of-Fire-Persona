export enum Tribe {
  MudWing = "MudWing",
  SandWing = "SandWing",
  SkyWing = "SkyWing",
  SeaWing = "SeaWing",
  RainWing = "RainWing",
  IceWing = "IceWing",
  NightWing = "NightWing",
  SilkWing = "SilkWing",
  HiveWing = "HiveWing",
  LeafWing = "LeafWing",
  Hybrid = "Hybrid"
}

export interface Answer {
  id: string;
  text: string;
  scores: Record<string, number>; // Map of Tribe string to weight. 'Animus' can also be a key here.
}

export interface Question {
  id: string;
  text: string;
  options: Answer[];
}

export interface QuizResult {
  primaryTribe: Tribe;
  secondaryTribe?: Tribe;
  isHybrid: boolean;
  isAnimus: boolean;
  personalityAnalysis: string;
  nameSuggestion: string;
  abilities: string[];
}

export type AppState = 'intro' | 'quiz' | 'analyzing' | 'result';