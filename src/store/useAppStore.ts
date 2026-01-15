// Global State Management using Zustand
import { create } from 'zustand';
import type { 
  Phase, 
  GameState, 
  EchoState, 
  UserProfile, 
  SessionData,
  EmotionalState,
  ComfortSound 
} from '../types';

interface AppState {
  // User Profile
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  addComfortSound: (sound: ComfortSound) => void;
  addAchievement: (achievement: { badgeId: string; sessionId: string }) => void;
  
  // Game State
  gameState: GameState;
  setPhase: (phase: Phase) => void;
  setActivity: (activity: string | undefined) => void;
  incrementScore: () => void;
  incrementEncouragement: () => void;
  setEngagement: (level: 'low' | 'medium' | 'high') => void;
  startGame: () => void;
  endGame: () => void;
  
  // Echo State
  echoState: EchoState;
  setEchoMood: (mood: EchoState['mood']) => void;
  setEchoListening: (isListening: boolean) => void;
  setEchoMessage: (message: string | undefined) => void;
  
  // Current Session
  currentSession: SessionData | null;
  startSession: (childName?: string) => void;
  endSession: () => void;
  addSoundDiscovered: (soundId: string) => void;
  addSoundImitated: (soundId: string) => void;
  incrementRhythmsCreated: () => void;
  recordEmotionalState: (state: EmotionalState, confidence: number) => void;
  recordComfortSoundPlayed: (soundId: string) => void;
  
  // Settings
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial Profile State
  profile: null,
  setProfile: (profile) => set({ profile }),
  addComfortSound: (sound) => set((state) => ({
    profile: state.profile ? {
      ...state.profile,
      comfortSounds: [...state.profile.comfortSounds, sound]
    } : null
  })),
  addAchievement: (achievement) => set((state) => ({
    profile: state.profile ? {
      ...state.profile,
      achievements: [...state.profile.achievements, {
        ...achievement,
        earnedAt: new Date()
      }]
    } : null
  })),

  // Initial Game State
  gameState: {
    phase: 'discovery',
    isActive: false,
    currentActivity: undefined,
    score: 0,
    encouragements: 0,
    childEngagement: 'medium'
  },
  setPhase: (phase) => set((state) => ({
    gameState: { ...state.gameState, phase }
  })),
  setActivity: (activity) => set((state) => ({
    gameState: { ...state.gameState, currentActivity: activity }
  })),
  incrementScore: () => set((state) => ({
    gameState: { ...state.gameState, score: state.gameState.score + 1 }
  })),
  incrementEncouragement: () => set((state) => ({
    gameState: { ...state.gameState, encouragements: state.gameState.encouragements + 1 }
  })),
  setEngagement: (level) => set((state) => ({
    gameState: { ...state.gameState, childEngagement: level }
  })),
  startGame: () => set((state) => ({
    gameState: { ...state.gameState, isActive: true }
  })),
  endGame: () => set((state) => ({
    gameState: { ...state.gameState, isActive: false }
  })),

  // Initial Echo State
  echoState: {
    mood: 'happy',
    isListening: false,
    earGlow: false,
    message: undefined
  },
  setEchoMood: (mood) => set((state) => ({
    echoState: { ...state.echoState, mood }
  })),
  setEchoListening: (isListening) => set((state) => ({
    echoState: { ...state.echoState, isListening, earGlow: isListening }
  })),
  setEchoMessage: (message) => set((state) => ({
    echoState: { ...state.echoState, message }
  })),

  // Session Management
  currentSession: null,
  startSession: (childName) => {
    const session: SessionData = {
      id: `session-${Date.now()}`,
      childName,
      startTime: new Date(),
      currentPhase: 'discovery',
      soundsDiscovered: [],
      soundsImitated: [],
      rhythmsCreated: 0,
      emotionalStates: [],
      comfortSoundsPlayed: [],
      totalDuration: 0
    };
    set({ currentSession: session });
  },
  endSession: () => {
    const session = get().currentSession;
    if (session) {
      session.endTime = new Date();
      session.totalDuration = session.endTime.getTime() - session.startTime.getTime();
      
      // Add to profile history
      const profile = get().profile;
      if (profile) {
        set({
          profile: {
            ...profile,
            sessionHistory: [...profile.sessionHistory, session]
          }
        });
      }
    }
    set({ currentSession: null });
  },
  addSoundDiscovered: (soundId) => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      soundsDiscovered: [...state.currentSession.soundsDiscovered, soundId]
    } : null
  })),
  addSoundImitated: (soundId) => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      soundsImitated: [...state.currentSession.soundsImitated, soundId]
    } : null
  })),
  incrementRhythmsCreated: () => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      rhythmsCreated: state.currentSession.rhythmsCreated + 1
    } : null
  })),
  recordEmotionalState: (state, confidence) => set((s) => ({
    currentSession: s.currentSession ? {
      ...s.currentSession,
      emotionalStates: [
        ...s.currentSession.emotionalStates,
        { timestamp: new Date(), state, confidence }
      ]
    } : null
  })),
  recordComfortSoundPlayed: (soundId) => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      comfortSoundsPlayed: [...state.currentSession.comfortSoundsPlayed, soundId]
    } : null
  })),

  // Settings
  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  volume: 0.7,
  setVolume: (volume) => set({ volume })
}));
