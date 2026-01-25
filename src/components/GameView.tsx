// Main Game Component - Orchestrates the three phases
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { audioEngine } from '../engine/AudioEngine';
import { EmotionDetector } from '../engine/EmotionDetector';
import EchoCharacter from './EchoCharacter';
import AudioVisualizer from './AudioVisualizer';
import VolumeMeter from './VolumeMeter';
import SessionSummary from './SessionSummary';
import SoundMatchMinigame from './SoundMatchMinigame';
import DiscoveryPhase from '../phases/DiscoveryPhase';
import ExpressionPhase from '../phases/ExpressionPhase';
import CreationPhase from '../phases/CreationPhase';
import { AVAILABLE_BADGES, checkBadgeEarned } from '../types/achievements';
import type { Phase } from '../types';

const emotionDetector = new EmotionDetector(audioEngine);

export const GameView: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>('discovery');
  const [showComfortMessage, setShowComfortMessage] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [showMinigame, setShowMinigame] = useState(false);

  const {
    profile,
    gameState,
    startGame,
    endGame,
    setPhase,
    startSession,
    endSession,
    setEchoMessage,
    addAchievement,
    currentSession,
    recordEmotionalState,
    recordComfortSoundPlayed,
    setEngagement
  } = useAppStore();

  useEffect(() => {
    initializeGame();

    return () => {
      cleanup();
    };
  }, []);

  // Monitor emotion every 1 second
  useEffect(() => {
    if (!isInitialized || !gameState.isActive) return;

    const emotionInterval = setInterval(() => {
      const analysis = emotionDetector.analyzeEmotion();
      recordEmotionalState(analysis.emotion, analysis.confidence);

      // Update engagement level
      const engagement = emotionDetector.getEngagementLevel();
      setEngagement(engagement);

      // Check if comfort is needed
      if (profile?.preferences.autoComfortEnabled && emotionDetector.shouldTriggerComfort()) {
        triggerComfortSound();
      }
    }, 1000);

    return () => clearInterval(emotionInterval);
  }, [isInitialized, gameState.isActive]);

  // Auto-end session after max duration
  useEffect(() => {
    if (!gameState.isActive) return;

    const maxDuration = (profile?.preferences.maxSessionDuration || 15) * 60 * 1000;
    const timer = setTimeout(() => {
      handleEndGame();
    }, maxDuration);

    return () => clearTimeout(timer);
  }, [gameState.isActive]);

  const initializeGame = async () => {
    try {
      const success = await audioEngine.initializeMicrophone();
      if (success) {
        setIsInitialized(true);
      }
    } catch (error) {
      console.error('Failed to initialize game:', error);
    }
  };

  const cleanup = () => {
    audioEngine.stop();
    emotionDetector.reset();
  };

  useEffect(() => {
    setShowVisualizer(true);
  }, []);

  const handleStartGame = () => {
    startGame();
    startSession(profile?.childName);
    setPhase('discovery');
    setCurrentPhase('discovery');
    
    setEchoMessage(`Hi ${profile?.childName || 'friend'}! Ready for a Sound Safari adventure?`);
    
    setTimeout(() => {
      setEchoMessage("Mommy's away for a bit, but Echo is here! Let's explore sounds together!");
    }, 2000);
  };

  const handlePhaseComplete = (phase: Phase) => {
    switch (phase) {
      case 'discovery':
        setCurrentPhase('expression');
        setPhase('expression');
        break;
      case 'expression':
        setCurrentPhase('creation');
        setPhase('creation');
        break;
      case 'creation':
        handleEndGame();
        break;
    }
  };

  const handleEndGame = () => {
    // Check for new badges
    if (profile && currentSession) {
      const earnedBadges: string[] = [];
      
      AVAILABLE_BADGES.forEach(badge => {
        const wasEarned = checkBadgeEarned(badge, {
          sessionHistory: [...profile.sessionHistory, currentSession],
          achievements: profile.achievements as any[]
        });
        
        if (wasEarned) {
          addAchievement({
            badgeId: badge.id,
            sessionId: currentSession.id
          });
          earnedBadges.push(badge.emoji);
        }
      });
      
      setNewBadges(earnedBadges);
    }
    
    setTimeout(() => {
      endGame();
      endSession();
      setShowSummary(true);
      setEchoMessage("Amazing safari explorer!");
    }, 1000);
    
    setTimeout(() => {
      setEchoMessage("Our safari is resting now. See you next time!");
    }, 3000);
  };

  const triggerComfortSound = async () => {
    if (!profile || profile.comfortSounds.length === 0) {
      setEchoMessage("Echo is right here with you. You're doing great!");
      return;
    }

    setShowComfortMessage(true);
    setEchoMessage("Let's hear your special sound...");

    // Play a random comfort sound
    const randomSound = profile.comfortSounds[
      Math.floor(Math.random() * profile.comfortSounds.length)
    ];

    await audioEngine.playSound(randomSound.audioBlob);
    recordComfortSoundPlayed(randomSound.id);

    setTimeout(() => {
      setShowComfortMessage(false);
      setEchoMessage("See? You're safe and loved!");
    }, randomSound.duration + 1000);
  };

  if (!isInitialized) {
    return (
      <div className="game-loading">
        <div className="loading-spinner" />
        <p>Getting Echo ready for your adventure...</p>
      </div>
    );
  }

  // Show session summary after game ends
  if (showSummary && currentSession) {
    return (
      <SessionSummary
        session={currentSession}
        newBadges={newBadges}
        onClose={() => {
          setShowSummary(false);
          setNewBadges([]);
        }}
      />
    );
  }

  // Show minigame if active
  if (showMinigame) {
    return (
      <SoundMatchMinigame 
        onExit={() => {
          setShowMinigame(false);
          setEchoMessage("Back to our safari adventure!");
        }} 
      />
    );
  }

  if (!gameState.isActive) {
    return (
      <div className="game-start-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="start-card"
        >
          <h1 className="text-5xl font-bold text-safari-blue mb-4">
            🦁 Sound Safari 🎵
          </h1>

          <p className="text-2xl mb-8">
            An Audio Adventure with Echo!
          </p>
          
          {profile ? (
            <div className="welcome-message">
              <p className="text-xl mb-4">
                Welcome back, <strong>{profile.childName}</strong>!
              </p>
              <div className="flex flex-col gap-4">
                <button onClick={handleStartGame} className="btn-start">
                  Start Adventure!
                </button>
                <button 
                  onClick={() => setShowMinigame(true)} 
                  className="btn-secondary px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold text-xl shadow-lg transition-colors"
                >
                  🎮 Play Sound Match Game
                </button>
              </div>
            </div>
          ) : (
            <div className="setup-prompt">
              <p className="text-lg mb-4">
                Ask a parent to set up your profile first!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="game-view">
      <AudioVisualizer 
        audioEngine={audioEngine}
        isActive={showVisualizer && gameState.isActive}
      />

      <VolumeMeter
        audioEngine={audioEngine}
        isActive={gameState.isActive}
      />

      <div className="game-header">
        <div className="score-display">
          <span className="score-label">Score:</span>
          <span className="score-value">{gameState.score}</span>
        </div>
        
        <div className="phase-indicator">
          <span className={`phase-dot ${currentPhase === 'discovery' ? 'active' : ''}`}>1</span>
          <span className={`phase-dot ${currentPhase === 'expression' ? 'active' : ''}`}>2</span>
          <span className={`phase-dot ${currentPhase === 'creation' ? 'active' : ''}`}>3</span>
        </div>

        <div className="engagement-indicator">
          <span className={`engagement-badge ${gameState.childEngagement}`}>
            {gameState.childEngagement === 'high' && '🔥'}
            {gameState.childEngagement === 'medium' && '👍'}
            {gameState.childEngagement === 'low' && '💤'}
          </span>
        </div>

        {/* Minigame Quick Access Button */}
        <button
          onClick={() => setShowMinigame(true)}
          className="absolute top-4 right-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold shadow-lg transition-colors flex items-center gap-2"
          title="Play Sound Match Game"
        >
          <span>🎮</span>
          <span className="hidden sm:inline">Minigame</span>
        </button>
      </div>

      <EchoCharacter />

      <AnimatePresence mode="wait">
        {showComfortMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="comfort-overlay"
          >
            <div className="comfort-message">
              <span className="text-6xl mb-4">💖</span>
              <p className="text-2xl">Sending you love...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="phase-content">
        <AnimatePresence mode="wait">
          {currentPhase === 'discovery' && (
            <motion.div
              key="discovery"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <DiscoveryPhase onComplete={() => handlePhaseComplete('discovery')} />
            </motion.div>
          )}

          {currentPhase === 'expression' && (
            <motion.div
              key="expression"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <ExpressionPhase onComplete={() => handlePhaseComplete('expression')} />
            </motion.div>
          )}

          {currentPhase === 'creation' && (
            <motion.div
              key="creation"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <CreationPhase onComplete={() => handlePhaseComplete('creation')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameView;
