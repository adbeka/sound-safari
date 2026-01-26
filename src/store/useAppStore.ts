// Global State Management using Zustand
import { create } from 'zustand';
import type { 
  Phase, 
  GameState, 
  EchoState, 
  UserProfile, 
  SessionData,
  EmotionalState,
  ComfortSound,
  DifficultyLevel,
  DailyChallenge
} from '../types';
import { generateDailyChallenge, getTodayKey } from '../data/challenges';
import { DEFAULT_ENVIRONMENT_ID, ENVIRONMENTS } from '../data/progression';
import { getNextDifficulty } from '../utils/difficulty';

interface AppState {
  // User Profile
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  addComfortSound: (sound: ComfortSound) => void;
  addAchievement: (achievement: { badgeId: string; sessionId: string }) => void;
  updatePreferences: (updates: Partial<UserProfile['preferences']>) => void;
  updateAccessibility: (updates: Partial<UserProfile['preferences']['accessibility']>) => void;
  setCurrentEnvironment: (environmentId: string) => void;
  updateProgression: () => void;
  
  // Game State
  gameState: GameState;
  setPhase: (phase: Phase) => void;
  setActivity: (activity: string | undefined) => void;
  incrementScore: () => void;
  incrementEncouragement: () => void;
  setEngagement: (level: 'low' | 'medium' | 'high') => void;
  difficultyLevel: DifficultyLevel;
  successStreak: number;
  struggleStreak: number;
  recordPerformance: (success: boolean) => void;
  setDifficultyLevel: (level: DifficultyLevel) => void;
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

  // Daily Challenges
  dailyChallenge: DailyChallenge | null;
  generateDailyChallenge: () => void;
  updateDailyChallengeProgress: (type: DailyChallenge['type'], amount?: number) => void;

  // Captions
  caption: string | null;
  setCaption: (caption?: string) => void;
  clearCaption: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial Profile State
  profile: null,
  setProfile: (profile) => set(() => ({
    profile: {
      ...profile,
      progression: profile.progression || {
        currentEnvironmentId: DEFAULT_ENVIRONMENT_ID,
        unlockedEnvironments: [DEFAULT_ENVIRONMENT_ID]
      },
      preferences: {
        ...profile.preferences,
        difficultyMode: profile.preferences.difficultyMode || 'adaptive',
        accessibility: profile.preferences.accessibility || {
          colorBlindMode: false,
          captions: true,
          reducedMotion: false
        }
      }
    },
    difficultyLevel: profile.preferences.difficulty
  })),
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
  updatePreferences: (updates) => set((state) => ({
    profile: state.profile ? {
      ...state.profile,
      preferences: {
        ...state.profile.preferences,
        ...updates
      }
    } : null,
    difficultyLevel: updates.difficulty || state.difficultyLevel
  })),
  updateAccessibility: (updates) => set((state) => ({
    profile: state.profile ? {
      ...state.profile,
      preferences: {
        ...state.profile.preferences,
        accessibility: {
          ...state.profile.preferences.accessibility,
          ...updates
        }
      }
    } : null
  })),
  setCurrentEnvironment: (environmentId) => set((state) => ({
    profile: state.profile ? {
      ...state.profile,
      progression: {
        ...state.profile.progression,
        currentEnvironmentId: environmentId
      }
    } : null
  })),
  updateProgression: () => set((state) => {
    if (!state.profile) return {};
    const totalSessions = state.profile.sessionHistory.length;
    const unlocked = ENVIRONMENTS.filter(env => totalSessions >= env.unlockAtSessions)
      .map(env => env.id);
    const current = unlocked.includes(state.profile.progression.currentEnvironmentId)
      ? state.profile.progression.currentEnvironmentId
      : unlocked[unlocked.length - 1] || DEFAULT_ENVIRONMENT_ID;

    return {
      profile: {
        ...state.profile,
        progression: {
          currentEnvironmentId: current,
          unlockedEnvironments: unlocked
        }
      }
    };
  }),

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
  difficultyLevel: 'easy',
  successStreak: 0,
  struggleStreak: 0,
  recordPerformance: (success) => set((state) => {
    const profile = state.profile;
    const mode = profile?.preferences.difficultyMode || 'adaptive';
    if (mode !== 'adaptive') {
      return {
        difficultyLevel: profile?.preferences.difficulty || state.difficultyLevel
      };
    }

    const successStreak = success ? state.successStreak + 1 : 0;
    const struggleStreak = success ? 0 : state.struggleStreak + 1;
    let difficulty = state.difficultyLevel;

    if (successStreak >= 3 && state.gameState.childEngagement === 'high') {
      difficulty = getNextDifficulty(difficulty, 'up');
    }
    if (struggleStreak >= 2 || state.gameState.childEngagement === 'low') {
      difficulty = getNextDifficulty(difficulty, 'down');
    }

    return {
      difficultyLevel: difficulty,
      successStreak,
      struggleStreak
    };
  }),
  setDifficultyLevel: (level) => set({ difficultyLevel: level }),
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
    get().updateProgression();
  },
  addSoundDiscovered: (soundId) => {
    set((state) => ({
      currentSession: state.currentSession ? {
        ...state.currentSession,
        soundsDiscovered: [...state.currentSession.soundsDiscovered, soundId]
      } : null
    }));
    get().updateDailyChallengeProgress('discover');
  },
  addSoundImitated: (soundId) => {
    set((state) => ({
      currentSession: state.currentSession ? {
        ...state.currentSession,
        soundsImitated: [...state.currentSession.soundsImitated, soundId]
      } : null
    }));
    get().updateDailyChallengeProgress('imitate');
  },
  incrementRhythmsCreated: () => {
    set((state) => ({
      currentSession: state.currentSession ? {
        ...state.currentSession,
        rhythmsCreated: state.currentSession.rhythmsCreated + 1
      } : null
    }));
    get().updateDailyChallengeProgress('rhythm');
  },
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
  setVolume: (volume) => set({ volume }),

  // Daily Challenges
  dailyChallenge: null,
  generateDailyChallenge: () => set((state) => {
    const todayKey = getTodayKey();
    if (state.dailyChallenge?.dateKey === todayKey) return {};
    return { dailyChallenge: generateDailyChallenge(todayKey) };
  }),
  updateDailyChallengeProgress: (type, amount = 1) => set((state) => {
    if (!state.dailyChallenge) return {};
    if (state.dailyChallenge.completed) return {};
    if (state.dailyChallenge.type !== type) return {};

    const progress = Math.min(state.dailyChallenge.target, state.dailyChallenge.progress + amount);
    const completed = progress >= state.dailyChallenge.target;

    return {
      dailyChallenge: {
        ...state.dailyChallenge,
        progress,
        completed,
        completedAt: completed ? new Date() : state.dailyChallenge.completedAt
      }
    };
  }),

  // Captions
  caption: null,
  setCaption: (caption) => set({ caption: caption ?? null }),
  clearCaption: () => set({ caption: null })
}));
