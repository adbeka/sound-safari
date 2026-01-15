// Audio Visualizer Component - Real-time sound wave display
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  audioEngine: any;
  isActive: boolean;
  color?: string;
  height?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ 
  audioEngine, 
  isActive,
  color = '#4FC3F7',
  height = 80
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const volume = audioEngine.getVolume();
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw sound waves
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();

      const barCount = 50;
      const barWidth = width / barCount;

      for (let i = 0; i < barCount; i++) {
        const x = i * barWidth;
        const randomVariation = Math.random() * 0.3;
        const barHeight = (volume + randomVariation) * height * 2;
        const y = height / 2 - barHeight / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, audioEngine, color]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="audio-visualizer"
    >
      <canvas
        ref={canvasRef}
        width={300}
        height={height}
        className="visualizer-canvas"
      />
    </motion.div>
  );
};

export default AudioVisualizer;
