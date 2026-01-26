// Phase 2: Expression - "Jungle Choir Carnival"
import { useState, useEffect, useRef, useMemo } from 'react';
import { ANIMAL_SOUNDS, ENCOURAGEMENTS } from '../data/sounds';
import { useAppStore } from '../store/useAppStore';
import { audioEngine } from '../engine/AudioEngine';
import { filterByDifficulty } from '../utils/difficulty';
import type { SoundItem } from '../types';

interface ExpressionPhaseProps {
  onComplete: () => void;
}

export const ExpressionPhase: React.FC<ExpressionPhaseProps> = ({ onComplete }) => {
  const [currentAnimal, setCurrentAnimal] = useState<SoundItem | null>(null);
  const [animalIndex, setAnimalIndex] = useState(0);
  const [isChildTurn, setIsChildTurn] = useState(false);
  const [imitated, setImitated] = useState<string[]>([]);
  const listeningInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const {
    setEchoMessage,
    setEchoListening,
    setEchoMood,
    incrementScore,
    incrementEncouragement,
    addSoundImitated,
    setActivity,
    difficultyLevel,
    recordPerformance,
    setCaption,
    clearCaption
  } = useAppStore();

  const availableAnimals = useMemo(
    () => filterByDifficulty(ANIMAL_SOUNDS, difficultyLevel),
    [difficultyLevel]
  );

  useEffect(() => {
    setActivity('Jungle Choir Carnival');
    startExpression();

    return () => {
      setActivity(undefined);
      if (listeningInterval.current) {
        clearInterval(listeningInterval.current);
      }
    };
  }, []);

  const startExpression = () => {
    setEchoMessage("Now it's YOUR turn to make sounds! Let's be animals together!");
    setEchoMood('excited');
    
    setTimeout(() => {
      presentAnimal(0);
    }, 2500);
  };

  const presentAnimal = (index: number) => {
    if (index >= availableAnimals.length) {
      completePhase();
      return;
    }

    const animal = availableAnimals[index];
    setCurrentAnimal(animal);
    setIsChildTurn(false);
    
    setEchoMessage(`Listen to Echo's ${animal.displayName}!`);
    setCaption(`Echo makes: ${animal.displayName}`);
    
    // Echo demonstrates the sound
    setTimeout(() => {
      setEchoMessage(`${animal.description}`);
      setCaption(`${animal.displayName}: ${animal.description}`);
      
      setTimeout(() => {
        promptChildImitation(animal);
      }, 2000);
    }, 1500);
  };

  const promptChildImitation = (animal: SoundItem) => {
    setIsChildTurn(true);
    setEchoMessage(`Now YOU try! Can you sound like a ${animal.displayName}?`);
    setEchoListening(true);
    setCaption(`Your turn: try ${animal.displayName}`);
    
    // Start listening for child's voice
    startListeningForImitation(animal);
  };

  const startListeningForImitation = (animal: SoundItem) => {
    let attempts = 0;
    const maxWaitTime = 15; // 15 seconds
    
    listeningInterval.current = setInterval(() => {
      attempts++;
      
      const isVocalizing = audioEngine.isVocalizing();
      
      if (isVocalizing) {
        handleSuccessfulImitation(animal);
        if (listeningInterval.current) {
          clearInterval(listeningInterval.current);
        }
      } else if (attempts >= maxWaitTime) {
        // Gentle encouragement if no sound detected
        handleNoAttempt(animal);
        if (listeningInterval.current) {
          clearInterval(listeningInterval.current);
        }
      }
    }, 1000);
  };

  const handleSuccessfulImitation = (animal: SoundItem) => {
    setEchoListening(false);
    setImitated([...imitated, animal.id]);
    addSoundImitated(animal.id);
    incrementScore();
    recordPerformance(true);
    
    const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    setEchoMessage(`${encouragement} That was a wonderful ${animal.displayName}!`);
    setEchoMood('celebrating');
    incrementEncouragement();
    
    setTimeout(() => {
      setEchoMood('excited');
      const nextIndex = animalIndex + 1;
      setAnimalIndex(nextIndex);
      presentAnimal(nextIndex);
    }, 3000);
  };

  const handleNoAttempt = (animal: SoundItem) => {
    setEchoListening(false);
    recordPerformance(false);
    
    setEchoMessage("That's okay! Sometimes we need time to think. Let's try together!");
    
    // Count it as attempted anyway - we celebrate effort
    setImitated([...imitated, animal.id]);
    addSoundImitated(animal.id);
    
    setTimeout(() => {
      const nextIndex = animalIndex + 1;
      setAnimalIndex(nextIndex);
      presentAnimal(nextIndex);
    }, 2500);
  };

  const completePhase = () => {
    setEchoMessage(`Amazing! You made ${imitated.length} different animal sounds! You're a superstar!`);
    setEchoMood('celebrating');
    clearCaption();
    
    setTimeout(() => {
      setEchoMessage("Ready to make music?");
      
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="expression-phase">
      <div className="phase-header">
        <h2 className="text-3xl font-bold text-safari-orange">🐘 Jungle Choir Carnival</h2>
        <div className="imitated-count">
          <span className="text-xl">Animals Imitated: {imitated.length}/{availableAnimals.length}</span>
        </div>
      </div>

      {currentAnimal && (
        <div className="current-animal-card">
          <div className={`animal-visual ${isChildTurn ? 'your-turn' : ''}`}>
            <span className="text-6xl">
              {isChildTurn ? '🎤' : '🔊'}
            </span>
          </div>
          <h3 className="text-3xl mt-4">{currentAnimal.displayName}</h3>
          <p className="text-xl text-gray-700">{currentAnimal.description}</p>
          
          {isChildTurn && (
            <div className="your-turn-indicator">
              <div className="pulse-ring" />
              <p className="text-2xl font-bold text-safari-yellow">YOUR TURN!</p>
            </div>
          )}
        </div>
      )}

      <div className="imitated-animals-grid">
        {imitated.map((animalId) => {
          const animal = availableAnimals.find(s => s.id === animalId) || ANIMAL_SOUNDS.find(s => s.id === animalId);
          return (
            <div key={animalId} className="imitated-badge">
              ✓ {animal?.displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpressionPhase;
