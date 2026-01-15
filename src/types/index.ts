// Core types for Sound Safari application

export type Phase = 'discovery' | 'expression' | 'creation';

export type EmotionalState = 'happy' | 'neutral' | 'distressed' | 'excited' | 'calm';

export interface SoundItem {
  id: string;
  name: string;
  displayName: string;
  category: 'animal' | 'household' | 'nature' | 'musical';
  audioUrl?: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ComfortSound {
  id: string;
  type: 'kiss' | 'lullaby' | 'phrase' | 'song';
  audioBlob: Blob;
  duration: number;
  recordedAt: Date;
  label: string;
}

export interface SessionData {
  id: string;
  childName?: string;
  startTime: Date;
  endTime?: Date;
  currentPhase: Phase;
  soundsDiscovered: string[];
  soundsImitated: string[];
  rhythmsCreated: number;
  emotionalStates: Array<{
    timestamp: Date;
    state: EmotionalState;
    confidence: number;
  }>;
  comfortSoundsPlayed: string[];
  totalDuration: number;
}

export interface UserProfile {
  childName: string;
  age: number; // in months
  comfortSounds: ComfortSound[];
  favoriteAnimals: string[];
  sessionHistory: SessionData[];
  achievements: Array<{
    badgeId: string;
    earnedAt: Date;
    sessionId: string;
  }>;
  preferences: {
    maxSessionDuration: number; // in minutes
    autoComfortEnabled: boolean;
    volumeLevel: number;
    voiceSpeed: 'slow' | 'normal' | 'fast';
    difficulty: 'easy' | 'medium' | 'hard';
  };
}

export interface Achievement {
  badgeId: string;
  earnedAt: Date;
  sessionId: string;
}

export interface AudioAnalysis {
  volume: number;
  pitch: number;
  tempo: number;
  emotion: EmotionalState;
  isVocalizing: boolean;
  confidence: number;
}

export interface GameState {
  phase: Phase;
  isActive: boolean;
  currentActivity?: string;
  score: number;
  encouragements: number;
  childEngagement: 'low' | 'medium' | 'high';
}

export interface EchoState {
  mood: 'happy' | 'excited' | 'listening' | 'celebrating';
  isListening: boolean;
  earGlow: boolean;
  message?: string;
}
