// Echo Character - The friendly AI companion
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export const EchoCharacter: React.FC = () => {
  const { echoState } = useAppStore();

  const getMoodEmoji = () => {
    switch (echoState.mood) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'listening': return '👂';
      case 'celebrating': return '🎉';
      default: return '😊';
    }
  };

  const getEarColor = () => {
    return echoState.earGlow ? '#FFD54F' : '#81C784';
  };

  return (
    <div className="echo-container">
      <motion.div
        className="echo-character"
        animate={{
          scale: echoState.isListening ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: echoState.isListening ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Echo's Body */}
        <div className="echo-body">
          <motion.div
            className="echo-face"
            animate={{
              rotate: echoState.mood === 'excited' ? [-5, 5, -5] : 0
            }}
            transition={{
              duration: 0.5,
              repeat: echoState.mood === 'excited' ? Infinity : 0
            }}
          >
            <span className="text-8xl">{getMoodEmoji()}</span>
          </motion.div>

          {/* Echo's Listening Ears */}
          <motion.div
            className="echo-ear left-ear"
            animate={{
              filter: echoState.earGlow 
                ? 'drop-shadow(0 0 20px rgba(255, 213, 79, 0.8))'
                : 'none',
              scale: echoState.isListening ? [1, 1.2, 1] : 1
            }}
            transition={{
              duration: 1,
              repeat: echoState.isListening ? Infinity : 0
            }}
          >
            <div 
              className="ear-inner"
              style={{ backgroundColor: getEarColor() }}
            >
              👂
            </div>
          </motion.div>

          <motion.div
            className="echo-ear right-ear"
            animate={{
              filter: echoState.earGlow 
                ? 'drop-shadow(0 0 20px rgba(255, 213, 79, 0.8))'
                : 'none',
              scale: echoState.isListening ? [1, 1.2, 1] : 1
            }}
            transition={{
              duration: 1,
              repeat: echoState.isListening ? Infinity : 0,
              delay: 0.2
            }}
          >
            <div 
              className="ear-inner"
              style={{ backgroundColor: getEarColor() }}
            >
              👂
            </div>
          </motion.div>
        </div>

        {/* Echo's Message Bubble */}
        {echoState.message && (
          <motion.div
            className="echo-message-bubble"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="echo-message-text">{echoState.message}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Listening Indicator */}
      {echoState.isListening && (
        <motion.div
          className="listening-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="sound-wave">
            <span className="wave-bar" style={{ animationDelay: '0s' }}></span>
            <span className="wave-bar" style={{ animationDelay: '0.1s' }}></span>
            <span className="wave-bar" style={{ animationDelay: '0.2s' }}></span>
            <span className="wave-bar" style={{ animationDelay: '0.3s' }}></span>
            <span className="wave-bar" style={{ animationDelay: '0.4s' }}></span>
          </div>
          <p className="listening-text">Echo is listening...</p>
        </motion.div>
      )}
    </div>
  );
};

export default EchoCharacter;
