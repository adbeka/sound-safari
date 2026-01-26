// Phase 3: Creation - "Family Rhythm Band"
import { useState, useEffect, useRef, useMemo } from 'react';
import { RHYTHM_PATTERNS, ENCOURAGEMENTS } from '../data/sounds';
import { useAppStore } from '../store/useAppStore';
import { audioEngine } from '../engine/AudioEngine';
import { filterByDifficulty } from '../utils/difficulty';

interface CreationPhaseProps {
  onComplete: () => void;
}

export const CreationPhase: React.FC<CreationPhaseProps> = ({ onComplete }) => {
  const [currentPattern, setCurrentPattern] = useState(0);
  const [isChildTurn, setIsChildTurn] = useState(false);
  const [rhythmsCompleted, setRhythmsCompleted] = useState(0);
  const [isFreePlay, setIsFreePlay] = useState(false);
  const [beatCount, setBeatCount] = useState(0);
  const listeningInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    setEchoMessage,
    setEchoListening,
    setEchoMood,
    incrementScore,
    incrementEncouragement,
    incrementRhythmsCreated,
    setActivity,
    difficultyLevel,
    recordPerformance,
    setCaption,
    clearCaption
  } = useAppStore();

  const availablePatterns = useMemo(
    () => filterByDifficulty(RHYTHM_PATTERNS, difficultyLevel),
    [difficultyLevel]
  );

  useEffect(() => {
    setActivity('Family Rhythm Band');
    startCreation();

    return () => {
      setActivity(undefined);
      if (listeningInterval.current) {
        clearInterval(listeningInterval.current);
      }
    };
  }, []);

  const startCreation = () => {
    setEchoMessage("Let's create our own special song—you lead!");
    setEchoMood('excited');
    
    setTimeout(() => {
      presentPattern(0);
    }, 2500);
  };

  const presentPattern = (index: number) => {
    if (index >= availablePatterns.length) {
      startFreePlay();
      return;
    }

    const pattern = availablePatterns[index];
    setCurrentPattern(index);
    setIsChildTurn(false);
    
    setEchoMessage(`Listen to this beat: ${pattern.description}`);
    setCaption(`Echo plays: ${pattern.name}`);
    
    // Play the rhythm pattern
    playPattern(pattern.pattern).then(() => {
      setTimeout(() => {
        promptChildRhythm(pattern);
      }, 1000);
    });
  };

  const playPattern = async (pattern: number[]) => {
    const beatDuration = 500; // milliseconds
    
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === 1) {
        // Play clap sound (or visual indicator)
        await audioEngine.playTone(400, 0.2);
      }
      await sleep(beatDuration);
    }
  };

  const promptChildRhythm = (pattern: typeof RHYTHM_PATTERNS[0]) => {
    setIsChildTurn(true);
    setEchoMessage("Now YOU make the beat! Clap along!");
    setEchoListening(true);
    setCaption(`Your turn: ${pattern.name}`);
    
    // Listen for child's rhythm
    startListeningForRhythm(pattern);
  };

  const startListeningForRhythm = (pattern: typeof RHYTHM_PATTERNS[0]) => {
    let clapsDetected = 0;
    let attempts = 0;
    const maxWaitTime = 20;
    
    listeningInterval.current = setInterval(() => {
      attempts++;
      
      const volume = audioEngine.getVolume();
      
      // Detect claps (sudden volume increase)
      if (volume > 0.3) {
        clapsDetected++;
        setBeatCount(clapsDetected);
      }
      
      if (clapsDetected >= pattern.pattern.filter(b => b === 1).length) {
        handleRhythmSuccess();
        if (listeningInterval.current) {
          clearInterval(listeningInterval.current);
        }
      } else if (attempts >= maxWaitTime) {
        handleRhythmAttempt();
        if (listeningInterval.current) {
          clearInterval(listeningInterval.current);
        }
      }
    }, 500);
  };

  const handleRhythmSuccess = () => {
    setIsChildTurn(false);
    setEchoListening(false);
    setRhythmsCompleted(rhythmsCompleted + 1);
    incrementRhythmsCreated();
    incrementScore();
    recordPerformance(true);
    setBeatCount(0);
    
    const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    setEchoMessage(`${encouragement} That rhythm was perfect!`);
    setEchoMood('celebrating');
    incrementEncouragement();
    
    setTimeout(() => {
      setEchoMood('excited');
      presentPattern(currentPattern + 1);
    }, 3000);
  };

  const handleRhythmAttempt = () => {
    setIsChildTurn(false);
    setEchoListening(false);
    setRhythmsCompleted(rhythmsCompleted + 1);
    incrementRhythmsCreated();
    recordPerformance(false);
    setBeatCount(0);
    
    setEchoMessage("Great effort! Every beat you make is special!");
    
    setTimeout(() => {
      presentPattern(currentPattern + 1);
    }, 2500);
  };

  const startFreePlay = () => {
    setIsFreePlay(true);
    setEchoMessage("Now make ANY beat you want! You're the band leader!");
    setEchoMood('celebrating');
    setEchoListening(true);
    setCaption('Free play: make any rhythm you like!');
    
    // Free play mode - just celebrate any sound
    listeningInterval.current = setInterval(() => {
      const volume = audioEngine.getVolume();
      if (volume > 0.2) {
        // Provide periodic encouragement
        if (Math.random() > 0.9) {
          const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
          setEchoMessage(encouragement);
        }
      }
    }, 1000);
    
    // End free play after 30 seconds
    setTimeout(() => {
      completeFreePlay();
    }, 30000);
  };

  const completeFreePlay = () => {
    if (listeningInterval.current) {
      clearInterval(listeningInterval.current);
    }
    
    setEchoListening(false);
    setEchoMessage("What an amazing musical adventure! You're a true rhythm master!");
    setEchoMood('celebrating');
    clearCaption();
    
    setTimeout(() => {
      onComplete();
    }, 4000);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="creation-phase">
      <div className="phase-header">
        <h2 className="text-3xl font-bold text-safari-purple">🥁 Family Rhythm Band</h2>
        <div className="rhythms-count">
          <span className="text-xl">Rhythms Created: {rhythmsCompleted}</span>
        </div>
      </div>

      {!isFreePlay && currentPattern < availablePatterns.length && (
        <div className="current-rhythm-card">
          <div className={`rhythm-visual ${isChildTurn ? 'your-turn' : ''}`}>
            <span className="text-6xl">
              {isChildTurn ? '👏' : '🎵'}
            </span>
          </div>
          <h3 className="text-3xl mt-4">{availablePatterns[currentPattern].name}</h3>
          <p className="text-xl text-gray-700">{availablePatterns[currentPattern].description}</p>
          
          {isChildTurn && (
            <div className="your-turn-indicator">
              <div className="beat-counter">Beats: {beatCount}</div>
              <p className="text-2xl font-bold text-safari-yellow">CLAP THE BEAT!</p>
            </div>
          )}
        </div>
      )}

      {isFreePlay && (
        <div className="free-play-card">
          <div className="celebration-visual">
            <span className="text-8xl">🎉</span>
          </div>
          <h3 className="text-4xl mt-4">FREE PLAY TIME!</h3>
          <p className="text-2xl text-gray-700">Make any rhythm you want!</p>
          <div className="pulse-ring large" />
        </div>
      )}

      <div className="rhythm-progress">
        {availablePatterns.map((pattern, index) => (
          <div 
            key={pattern.id} 
            className={`rhythm-badge ${index < rhythmsCompleted ? 'completed' : ''}`}
          >
            {index < rhythmsCompleted ? '✓' : '○'} {pattern.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreationPhase;
