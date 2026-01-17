// Parent Dashboard - Setup and monitoring interface
import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useLanguage } from '../i18n/LanguageContext';
import { audioEngine } from '../engine/AudioEngine';
import BadgeDisplay from './BadgeDisplay';
import type { ComfortSound } from '../types';
import { Settings, Mic, Play, Trash2, BarChart3, Award } from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const { profile, setProfile, addComfortSound } = useAppStore();
  const { t } = useLanguage();
  const [childName, setChildName] = useState(profile?.childName || '');
  const [childAge, setChildAge] = useState(profile?.age || 36);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingLabel, setRecordingLabel] = useState('');
  const [view, setView] = useState<'setup' | 'comfort' | 'insights' | 'badges'>('setup');

  const handleSaveProfile = () => {
    if (!childName) return;

    const newProfile = profile || {
      childName,
      age: childAge,
      comfortSounds: [],
      favoriteAnimals: [],
      sessionHistory: [],
      achievements: [],
      preferences: {
        maxSessionDuration: 15,
        autoComfortEnabled: true,
        volumeLevel: 0.7,
        voiceSpeed: 'normal',
        difficulty: 'easy'
      }
    };

    setProfile({ ...newProfile, childName, age: childAge });
  };

  const startRecording = async (type: ComfortSound['type']) => {
    setIsRecording(true);
    
    try {
      await audioEngine.initializeMicrophone();
      
      // Record for 5 seconds
      const audioBlob = await audioEngine.recordComfortSound(5000);
      
      const comfortSound: ComfortSound = {
        id: `comfort-${Date.now()}`,
        type,
        audioBlob,
        duration: 5000,
        recordedAt: new Date(),
        label: recordingLabel || `${type} sound`
      };
      
      addComfortSound(comfortSound);
      setRecordingLabel('');
      setIsRecording(false);
    } catch (error) {
      console.error('Recording failed:', error);
      setIsRecording(false);
    }
  };

  const playComfortSound = async (sound: ComfortSound) => {
    await audioEngine.playSound(sound.audioBlob);
  };

  return (
    <div className="parent-dashboard">
      <div className="dashboard-header">
        <h1 className="text-3xl font-bold">{t.dashboard.title}</h1>
        <div className="dashboard-tabs">
          <button 
            className={`tab ${view === 'setup' ? 'active' : ''}`}
            onClick={() => setView('setup')}
          >
            <Settings size={20} /> {t.dashboard.setup}
          </button>
          <button 
            className={`tab ${view === 'comfort' ? 'active' : ''}`}
            onClick={() => setView('comfort')}
          >
            <Mic size={20} /> {t.dashboard.comfort}
          </button>
          <button 
            className={`tab ${view === 'insights' ? 'active' : ''}`}
            onClick={() => setView('insights')}
          >
            <BarChart3 size={20} /> {t.dashboard.insights}
          </button>
          <button 
            className={`tab ${view === 'badges' ? 'active' : ''}`}
            onClick={() => setView('badges')}
          >
            <Award size={20} /> {t.dashboard.badges}
          </button>
        </div>
      </div>

      {view === 'setup' && (
        <div className="setup-section">
          <h2 className="text-2xl font-semibold mb-4">Child Profile</h2>
          
          <div className="form-group">
            <label htmlFor="childName">{t.dashboard.childName}</label>
            <input
              id="childName"
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder={t.dashboard.childName}
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="childAge">{t.dashboard.childAge}</label>
            <input
              id="childAge"
              type="number"
              value={childAge}
              onChange={(e) => setChildAge(parseInt(e.target.value))}
              min={24}
              max={60}
              className="input"
            />
            <p className="text-sm text-gray-600">
              {Math.floor(childAge / 12)} years, {childAge % 12} {t.dashboard.monthsOld}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="maxDuration">Max Session Duration (minutes)</label>
            <input
              id="maxDuration"
              type="number"
              value={profile?.preferences.maxSessionDuration || 15}
              onChange={(e) => {
                if (profile) {
                  setProfile({
                    ...profile,
                    preferences: {
                      ...profile.preferences,
                      maxSessionDuration: parseInt(e.target.value)
                    }
                  });
                }
              }}
              min={5}
              max={30}
              className="input"
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={profile?.preferences.autoComfortEnabled ?? true}
                onChange={(e) => {
                  if (profile) {
                    setProfile({
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        autoComfortEnabled: e.target.checked
                      }
                    });
                  }
                }}
                className="checkbox"
              />
              <span className="ml-2">Automatically play comfort sounds when distress detected</span>
            </label>
          </div>

          <button onClick={handleSaveProfile} className="btn-primary">
            Save Profile
          </button>
        </div>
      )}

      {view === 'comfort' && (
        <div className="comfort-section">
          <h2 className="text-2xl font-semibold mb-4">Comfort Sounds</h2>
          <p className="text-gray-600 mb-6">
            Record special sounds that help comfort your child during the adventure.
          </p>

          <div className="recording-controls">
            <div className="form-group">
              <label htmlFor="recordingLabel">Sound Label</label>
              <input
                id="recordingLabel"
                type="text"
                value={recordingLabel}
                onChange={(e) => setRecordingLabel(e.target.value)}
                placeholder="e.g., Mommy's kiss, Bedtime song"
                className="input"
                disabled={isRecording}
              />
            </div>

            <div className="recording-buttons">
              <button
                onClick={() => startRecording('kiss')}
                disabled={isRecording || !recordingLabel}
                className="btn-record"
              >
                <Mic size={20} />
                Record Kiss Sound
              </button>
              <button
                onClick={() => startRecording('lullaby')}
                disabled={isRecording || !recordingLabel}
                className="btn-record"
              >
                <Mic size={20} />
                Record Lullaby
              </button>
              <button
                onClick={() => startRecording('phrase')}
                disabled={isRecording || !recordingLabel}
                className="btn-record"
              >
                <Mic size={20} />
                Record Phrase
              </button>
            </div>

            {isRecording && (
              <div className="recording-indicator">
                <div className="recording-pulse" />
                <span>Recording... (5 seconds)</span>
              </div>
            )}
          </div>

          <div className="comfort-sounds-list">
            <h3 className="text-xl font-semibold mb-3">Recorded Sounds</h3>
            {profile?.comfortSounds.length === 0 ? (
              <p className="text-gray-500">No comfort sounds recorded yet.</p>
            ) : (
              <div className="sounds-grid">
                {profile?.comfortSounds.map((sound) => (
                  <div key={sound.id} className="sound-card">
                    <div className="sound-info">
                      <h4 className="font-semibold">{sound.label}</h4>
                      <p className="text-sm text-gray-600">{sound.type}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(sound.recordedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="sound-actions">
                      <button
                        onClick={() => playComfortSound(sound)}
                        className="btn-icon"
                        title="Play sound"
                      >
                        <Play size={18} />
                      </button>
                      <button
                        onClick={() => {
                          // Remove sound (implement in store)
                        }}
                        className="btn-icon btn-danger"
                        title="Delete sound"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {view === 'insights' && (
        <div className="insights-section">
          <h2 className="text-2xl font-semibold mb-4">Session Insights</h2>
          
          {!profile || profile.sessionHistory.length === 0 ? (
            <p className="text-gray-500">No sessions recorded yet. Start a Sound Safari adventure!</p>
          ) : (
            <div className="insights-content">
              <div className="stat-card">
                <h3 className="stat-label">Total Sessions</h3>
                <p className="stat-value">{profile.sessionHistory.length}</p>
              </div>

              <div className="stat-card">
                <h3 className="stat-label">Sounds Discovered</h3>
                <p className="stat-value">
                  {profile.sessionHistory.reduce((sum, s) => sum + s.soundsDiscovered.length, 0)}
                </p>
              </div>

              <div className="stat-card">
                <h3 className="stat-label">Animals Imitated</h3>
                <p className="stat-value">
                  {profile.sessionHistory.reduce((sum, s) => sum + s.soundsImitated.length, 0)}
                </p>
              </div>

              <div className="stat-card">
                <h3 className="stat-label">Rhythms Created</h3>
                <p className="stat-value">
                  {profile.sessionHistory.reduce((sum, s) => sum + s.rhythmsCreated, 0)}
                </p>
              </div>

              <div className="session-history">
                <h3 className="text-xl font-semibold mb-3">Recent Sessions</h3>
                {profile.sessionHistory.slice(-5).reverse().map((session) => (
                  <div key={session.id} className="session-card">
                    <div className="session-date">
                      {new Date(session.startTime).toLocaleString()}
                    </div>
                    <div className="session-stats">
                      <span>Duration: {Math.round(session.totalDuration / 60000)}m</span>
                      <span>Phase: {session.currentPhase}</span>
                      <span>Sounds: {session.soundsDiscovered.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'badges' && (
        <div className="badges-section">
          <h2 className="text-2xl font-semibold mb-4">Achievement Badges</h2>
          
          {!profile ? (
            <p className="text-gray-500">Create a profile to start earning badges!</p>
          ) : (
            <>
              <div className="badges-stats">
                <div className="stat-badge">
                  <Award size={32} className="text-safari-yellow" />
                  <div>
                    <div className="text-2xl font-bold">{profile.achievements.length}</div>
                    <div className="text-sm text-gray-600">Badges Earned</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Your Badges</h3>
                <BadgeDisplay 
                  achievements={profile.achievements}
                  showAll={true}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
