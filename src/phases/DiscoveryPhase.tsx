// Phase 1: Discovery - "Quiet Ears Expedition"
import { useState, useEffect } from 'react';
import { DISCOVERY_SOUNDS, ENCOURAGEMENTS, TRANSITION_PHRASES } from '../data/sounds';
import { useAppStore } from '../store/useAppStore';
import type { SoundItem } from '../types';

interface DiscoveryPhaseProps {
  onComplete: () => void;
}

export const DiscoveryPhase: React.FC<DiscoveryPhaseProps> = ({ onComplete }) => {
  const [currentSound, setCurrentSound] = useState<SoundItem | null>(null);
  const [soundIndex, setSoundIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [discovered, setDiscovered] = useState<string[]>([]);

  const { 
    setEchoMessage, 
    setEchoListening, 
    incrementScore,
    incrementEncouragement,
    addSoundDiscovered,
    setActivity
  } = useAppStore();

  useEffect(() => {
    setActivity('Quiet Ears Expedition');
    startDiscovery();
    
    return () => {
      setActivity(undefined);
    };
  }, []);

  const startDiscovery = () => {
    setEchoMessage("Let's hear what the world is whispering...");
    setTimeout(() => {
      presentSound(0);
    }, 2000);
  };

  const presentSound = (index: number) => {
    if (index >= DISCOVERY_SOUNDS.length) {
      completePhase();
      return;
    }

    const sound = DISCOVERY_SOUNDS[index];
    setCurrentSound(sound);
    setIsListening(true);
    setEchoListening(true);
    
    setEchoMessage(`Listen carefully... Can you hear the ${sound.displayName}?`);
    
    // Simulate sound playing (in real app, would play actual sound)
    setTimeout(() => {
      setEchoMessage(`That was the ${sound.displayName}! ${sound.description}`);
      setIsListening(false);
      setEchoListening(false);
      
      handleSoundDiscovered(sound);
    }, 3000);
  };

  const handleSoundDiscovered = (sound: SoundItem) => {
    setDiscovered([...discovered, sound.id]);
    addSoundDiscovered(sound.id);
    incrementScore();
    
    const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
    setEchoMessage(encouragement);
    incrementEncouragement();
    
    setTimeout(() => {
      const nextIndex = soundIndex + 1;
      setSoundIndex(nextIndex);
      presentSound(nextIndex);
    }, 2500);
  };

  const completePhase = () => {
    setEchoMessage(`You discovered ${discovered.length} sounds! You're an amazing listener!`);
    
    setTimeout(() => {
      const transition = TRANSITION_PHRASES.toExpression[0];
      setEchoMessage(transition);
      
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 3000);
  };

  return (
    <div className="discovery-phase">
      <div className="phase-header">
        <h2 className="text-3xl font-bold text-safari-blue">🌿 Quiet Ears Expedition</h2>
        <div className="discovered-count">
          <span className="text-xl">Sounds Discovered: {discovered.length}/{DISCOVERY_SOUNDS.length}</span>
        </div>
      </div>

      {currentSound && (
        <div className="current-sound-card">
          <div className={`sound-visual ${isListening ? 'listening' : ''}`}>
            {isListening ? '👂✨' : '🎵'}
          </div>
          <h3 className="text-2xl mt-4">{currentSound.displayName}</h3>
          <p className="text-lg text-gray-600">{currentSound.description}</p>
        </div>
      )}

      <div className="discovered-sounds-grid">
        {discovered.map((soundId) => {
          const sound = DISCOVERY_SOUNDS.find(s => s.id === soundId);
          return (
            <div key={soundId} className="discovered-badge">
              ✓ {sound?.displayName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoveryPhase;
