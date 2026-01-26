// Sound Match Minigame - A simple memory matching game with sounds
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Star, Trophy, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

interface SoundCard {
  id: string;
  soundId: string;
  displayName: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MINIGAME_SOUNDS = [
  { soundId: 'lion-roar', displayName: 'Lion', emoji: '🦁' },
  { soundId: 'cat-meow', displayName: 'Cat', emoji: '🐱' },
  { soundId: 'dog-bark', displayName: 'Dog', emoji: '🐶' },
  { soundId: 'bird-chirp', displayName: 'Bird', emoji: '🐦' },
  { soundId: 'elephant-trumpet', displayName: 'Elephant', emoji: '🐘' },
  { soundId: 'duck-quack', displayName: 'Duck', emoji: '🦆' },
];

export const SoundMatchMinigame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { incrementScore, setEchoMessage, setCaption, clearCaption, profile, caption } = useAppStore();
  
  const [cards, setCards] = useState<SoundCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [stars, setStars] = useState(3);

  useEffect(() => {
    initializeGame();
    return () => {
      clearCaption();
    };
  }, []);

  useEffect(() => {
    // Calculate stars based on moves
    if (moves > 20) setStars(1);
    else if (moves > 15) setStars(2);
  }, [moves]);

  const initializeGame = () => {
    // Select 3 random sounds for easier gameplay for toddlers
    const selectedSounds = MINIGAME_SOUNDS.slice(0, 3);
    
    // Create pairs of cards
    const cardPairs = selectedSounds.flatMap((sound, index) => [
      {
        id: `${sound.soundId}-1-${index}`,
        soundId: sound.soundId,
        displayName: sound.displayName,
        emoji: sound.emoji,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `${sound.soundId}-2-${index}`,
        soundId: sound.soundId,
        displayName: sound.displayName,
        emoji: sound.emoji,
        isFlipped: false,
        isMatched: false,
      },
    ]);

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setEchoMessage('Match the sounds! Tap cards to hear them!');
  };

  const playCardSound = (soundId: string) => {
    // Play a simple beep sound using Web Audio API
    // Since we don't have access to actual sound files in the minigame,
    // we'll generate a tone based on the sound type
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Different frequencies for different animals
    const frequencies: { [key: string]: number } = {
      'lion-roar': 220,
      'cat-meow': 440,
      'dog-bark': 330,
      'bird-chirp': 880,
      'elephant-trumpet': 165,
      'duck-quack': 550,
    };
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequencies[soundId] || 440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
    const sound = MINIGAME_SOUNDS.find((entry) => entry.soundId === soundId);
    if (sound) {
      setCaption(`Sound: ${sound.displayName}`);
    }
  };

  const handleCardClick = (cardId: string) => {
    if (isChecking || gameWon) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped) return;

    // Play the sound
    playCardSound(card.soundId);

    // Flip the card
    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    // Check for match when two cards are flipped
    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard?.soundId === secondCard?.soundId) {
        // Match found!
        setTimeout(() => {
          const matchedCards = newCards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          );
          setCards(matchedCards);
          setMatches(matches + 1);
          setFlippedCards([]);
          setIsChecking(false);
          incrementScore();
          setEchoMessage('Great match! 🎉');

          // Check if game is won
          const allMatched = matchedCards.every(c => c.isMatched);
          if (allMatched) {
            setGameWon(true);
            setEchoMessage(`You won with ${stars} stars! Amazing! 🌟`);
          }
        }, 800);
      } else {
        // No match - flip back
        setTimeout(() => {
          const resetCards = newCards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(resetCards);
          setFlippedCards([]);
          setIsChecking(false);
          setEchoMessage('Try again! You can do it!');
        }, 1200);
      }
    }
  };

  const handleRestart = () => {
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameWon(false);
    setStars(3);
    initializeGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-400 to-yellow-300 p-6">
      {profile?.preferences.accessibility.captions && caption && (
        <div className="caption-banner" aria-live="polite">
          <span className="caption-label">Caption:</span> {caption}
        </div>
      )}
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Back</span>
          </button>

          <div className="flex items-center gap-4 bg-white/80 rounded-full px-6 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">{matches}/3</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-white drop-shadow-lg mb-2">
          🎵 Sound Match Game 🎵
        </h1>
        <p className="text-center text-white text-lg">
          Moves: {moves} | Find the matching sounds!
        </p>
      </div>

      {/* Game Grid */}
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isChecking || card.isMatched}
              className={`aspect-square rounded-2xl shadow-xl transition-all ${
                card.isMatched
                  ? 'bg-green-400 cursor-default'
                  : card.isFlipped
                  ? 'bg-blue-400'
                  : 'bg-white hover:bg-gray-100 hover:scale-105'
              }`}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                {card.isFlipped || card.isMatched ? (
                  <div className="flex flex-col items-center gap-2" style={{ transform: 'scaleX(-1)' }}>
                    <span className="text-6xl">{card.emoji}</span>
                    <Volume2 className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <span className="text-6xl">❓</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Win Screen */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
            >
              <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl">
                <div className="text-7xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-purple-600 mb-4">
                  You Won!
                </h2>
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-10 h-10 ${
                        i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xl mb-6">
                  You completed it in {moves} moves!
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleRestart}
                    className="flex-1 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full font-bold shadow-lg transition-colors"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={onExit}
                    className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold shadow-lg transition-colors"
                  >
                    Exit
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      <div className="max-w-2xl mx-auto mt-8 bg-white/80 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-purple-600 mb-2">How to Play:</h3>
        <ul className="space-y-2 text-gray-700">
          <li>🎵 Tap cards to hear sounds and flip them</li>
          <li>🔍 Find two cards with the same sound</li>
          <li>⭐ Complete with fewer moves to earn more stars!</li>
        </ul>
      </div>
    </div>
  );
};

export default SoundMatchMinigame;
