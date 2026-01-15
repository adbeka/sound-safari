// Volume Meter Component - Visual feedback for voice levels
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface VolumeMeterProps {
  audioEngine: any;
  isActive: boolean;
}

export const VolumeMeter: React.FC<VolumeMeterProps> = ({ audioEngine, isActive }) => {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const vol = audioEngine.getVolume();
      setVolume(vol);
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, audioEngine]);

  if (!isActive) return null;

  const getVolumeLevel = () => {
    if (volume < 0.1) return { label: 'Quiet', color: '#81C784', emoji: '🤫' };
    if (volume < 0.3) return { label: 'Good!', color: '#4FC3F7', emoji: '👍' };
    if (volume < 0.5) return { label: 'Loud!', color: '#FFB74D', emoji: '📢' };
    return { label: 'Very Loud!', color: '#EF5350', emoji: '📣' };
  };

  const level = getVolumeLevel();
  const percentage = Math.min(volume * 100, 100);

  return (
    <div className="volume-meter">
      <div className="meter-label">
        <span className="text-2xl">{level.emoji}</span>
        <span className="text-lg font-semibold">{level.label}</span>
      </div>
      
      <div className="meter-bar-container">
        <motion.div
          className="meter-bar"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: level.color
          }}
          animate={{
            width: `${percentage}%`
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="meter-indicators">
        <span className={percentage > 10 ? 'active' : ''}>🔉</span>
        <span className={percentage > 30 ? 'active' : ''}>🔊</span>
        <span className={percentage > 60 ? 'active' : ''}>📢</span>
      </div>
    </div>
  );
};

export default VolumeMeter;
