import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const DailyChallengeCard: React.FC = () => {
  const {
    dailyChallenge,
    generateDailyChallenge
  } = useAppStore();

  useEffect(() => {
    generateDailyChallenge();
  }, [generateDailyChallenge]);

  if (!dailyChallenge) {
    return (
      <div className="daily-challenge-card">
        <h3 className="daily-title">Daily Challenge</h3>
        <p className="daily-description">Check back soon for today’s challenge!</p>
      </div>
    );
  }

  const progressPercent = Math.round((dailyChallenge.progress / dailyChallenge.target) * 100);

  return (
    <div className={`daily-challenge-card ${dailyChallenge.completed ? 'completed' : ''}`}>
      <div className="daily-header">
        <h3 className="daily-title">Daily Challenge</h3>
        <span className="daily-reward">Reward: {dailyChallenge.reward}</span>
      </div>
      <p className="daily-description">{dailyChallenge.description}</p>
      <div className="daily-progress">
        <div className="daily-progress-bar">
          <div
            className="daily-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="daily-progress-text">
          {dailyChallenge.progress} / {dailyChallenge.target}
        </div>
      </div>
      {dailyChallenge.completed && (
        <div className="daily-complete">Challenge completed! 🎉</div>
      )}
    </div>
  );
};

export default DailyChallengeCard;
