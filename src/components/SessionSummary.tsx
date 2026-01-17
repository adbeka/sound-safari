// Session Summary Screen - Celebration and achievements
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { useLanguage } from '../i18n/LanguageContext';
import type { SessionData } from '../types';
import { Trophy, Star, Music, Mic, Ear } from 'lucide-react';

interface SessionSummaryProps {
  session: SessionData;
  newBadges: string[];
  onClose: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({ 
  session, 
  newBadges,
  onClose 
}) => {
  const { profile } = useAppStore();
  const { t } = useLanguage();

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getTotalScore = () => {
    return session.soundsDiscovered.length + 
           session.soundsImitated.length + 
           session.rhythmsCreated;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="session-summary-overlay"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="summary-card"
      >
        {/* Celebration Header */}
        <div className="summary-header">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="celebration-icon"
          >
            🎉
          </motion.div>
          <h1 className="summary-title">{t.summary.title}</h1>
          <p className="summary-subtitle">
            {t.echo.amazing} <strong>{profile?.childName || 'Explorer'}</strong>!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="summary-stats">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="stat-item"
          >
            <Ear className="stat-icon" size={32} />
            <div className="stat-value">{session.soundsDiscovered.length}</div>
            <div className="stat-label">{t.summary.soundsFound}</div>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="stat-item"
          >
            <Mic className="stat-icon" size={32} />
            <div className="stat-value">{session.soundsImitated.length}</div>
            <div className="stat-label">{t.summary.animalsImitated}</div>
          </motion.div>

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="stat-item"
          >
            <Music className="stat-icon" size={32} />
            <div className="stat-value">{session.rhythmsCreated}</div>
            <div className="stat-label">{t.summary.rhythmsCreated}</div>
          </motion.div>
        </div>

        {/* Total Score */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          className="total-score"
        >
          <Trophy className="trophy-icon" size={48} />
          <div className="score-text">
            <div className="score-label">Total Score</div>
            <div className="score-value">{getTotalScore()}</div>
          </div>
        </motion.div>

        {/* Duration */}
        <div className="session-duration">
          <span>Adventure Time: </span>
          <strong>{formatDuration(session.totalDuration)}</strong>
        </div>

        {/* New Badges */}
        {newBadges.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="new-badges-section"
          >
            <h3 className="badges-title">
              <Star size={24} /> {t.summary.newBadges}! <Star size={24} />
            </h3>
            <div className="badges-grid">
              {newBadges.map((badge, index) => (
                <motion.div
                  key={badge}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 1.4 + index * 0.2,
                    type: 'spring',
                    stiffness: 200
                  }}
                  className="badge-card new"
                >
                  <span className="badge-emoji">{badge}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Encouragement Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="encouragement-message"
        >
          <p>🌟 You're becoming an amazing Sound Explorer! 🌟</p>
        </motion.div>

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={onClose}
          className="close-summary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue to Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SessionSummary;
