import { useEffect } from 'react';
import { ENVIRONMENTS } from '../data/progression';
import { useAppStore } from '../store/useAppStore';

export const ProgressionMap: React.FC = () => {
  const { profile, updateProgression, setCurrentEnvironment } = useAppStore();

  useEffect(() => {
    updateProgression();
  }, [updateProgression]);

  if (!profile) {
    return (
      <div className="progression-map">
        <h3 className="progression-title">Progression Map</h3>
        <p className="progression-subtitle">Create a profile to unlock environments!</p>
      </div>
    );
  }

  const unlocked = new Set(profile.progression.unlockedEnvironments);

  return (
    <div className="progression-map">
      <h3 className="progression-title">Progression Map</h3>
      <p className="progression-subtitle">Keep exploring to unlock new environments.</p>
      <div className="progression-grid">
        {ENVIRONMENTS.map((environment) => {
          const isUnlocked = unlocked.has(environment.id);
          const isActive = profile.progression.currentEnvironmentId === environment.id;

          return (
            <button
              key={environment.id}
              className={`environment-card ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (isUnlocked) {
                  setCurrentEnvironment(environment.id);
                }
              }}
              disabled={!isUnlocked}
            >
              <div className="environment-emoji">{environment.emoji}</div>
              <div className="environment-info">
                <h4>{environment.name}</h4>
                <p>{environment.description}</p>
                {!isUnlocked && (
                  <span className="environment-lock">
                    Unlock after {environment.unlockAtSessions} sessions
                  </span>
                )}
                {isUnlocked && isActive && (
                  <span className="environment-active">Current Environment</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressionMap;
