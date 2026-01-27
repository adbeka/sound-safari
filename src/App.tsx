// Main App Component
import { useState, useEffect } from 'react';
import ParentDashboard from './components/ParentDashboard';
import GameView from './components/GameView';
import { useAppStore } from './store/useAppStore';
import { useLanguage } from './i18n/LanguageContext';
import { Home, Play, Globe } from 'lucide-react';
import './App.css';

function App() {
  const [view, setView] = useState<'home' | 'dashboard' | 'game'>('home');
  const { profile, generateDailyChallenge } = useAppStore();
  const { t, language, setLanguage } = useLanguage();
  const kidsVideoId = 'dRAEdZSaJA8';

  useEffect(() => {
    generateDailyChallenge();
  }, [generateDailyChallenge]);

  useEffect(() => {
    const accessibility = profile?.preferences.accessibility;
    const body = document.body;
    body.classList.toggle('colorblind-mode', Boolean(accessibility?.colorBlindMode));
    body.classList.toggle('reduced-motion', Boolean(accessibility?.reducedMotion));
  }, [profile?.preferences.accessibility]);

  return (
    <div className="app">
      {/* Language Selector */}
      <div className="language-selector" style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        background: 'white',
        padding: '8px 12px',
        borderRadius: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Globe size={20} />
        <button
          onClick={() => setLanguage('en')}
          style={{
            padding: '4px 12px',
            background: language === 'en' ? '#4ECDC4' : 'transparent',
            color: language === 'en' ? 'white' : '#666',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: language === 'en' ? 'bold' : 'normal'
          }}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('ru')}
          style={{
            padding: '4px 12px',
            background: language === 'ru' ? '#4ECDC4' : 'transparent',
            color: language === 'ru' ? 'white' : '#666',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: language === 'ru' ? 'bold' : 'normal'
          }}
        >
          RU
        </button>
      </div>

      {view === 'home' && (
        <div className="home-view">
          <div className="hero-section">
            <h1 className="hero-title">
              <span className="emoji">🦁</span>
              {t.home.title}
              <span className="emoji">🎵</span>
            </h1>
            <p className="hero-subtitle">
              {t.home.subtitle}
            </p>
            <p className="hero-description">
              {t.home.description}
            </p>

            <div className="cta-buttons">
              {profile ? (
                <>
                  <button 
                    onClick={() => setView('game')} 
                    className="btn-cta primary"
                  >
                    <Play size={24} />
                    {t.home.startAdventure}
                  </button>
                  <button 
                    onClick={() => setView('dashboard')} 
                    className="btn-cta secondary"
                  >
                    <Home size={24} />
                    {t.home.parentDashboard}
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setView('dashboard')} 
                  className="btn-cta primary"
                >
                  <Home size={24} />
                  {t.home.setupProfile}
                </button>
              )}
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌿</div>
                <h3>{t.home.phase1Title}</h3>
                <p>{t.home.phase1Desc}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🐘</div>
                <h3>{t.home.phase2Title}</h3>
                <p>{t.home.phase2Desc}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🥁</div>
                <h3>{t.home.phase3Title}</h3>
                <p>{t.home.phase3Desc}</p>
              </div>
            </div>

            <div className="benefits-section">
              <h2 className="section-title">{t.home.benefitsTitle}</h2>
              <ul className="benefits-list">
                <li>✨ {t.home.benefit1}</li>
                <li>🎯 {t.home.benefit2}</li>
                <li>🗣️ {t.home.benefit3}</li>
                <li>🎨 {t.home.benefit4}</li>
                <li>💖 {t.home.benefit5}</li>
                <li>🔒 {t.home.benefit6}</li>
              </ul>
            </div>

            <div className="explanation-section">
              <h2 className="section-title">{t.home.explanationTitle}</h2>
              <p className="section-subtitle">{t.home.explanationSubtitle}</p>

              <div className="explanation-grid">
                <div className="explanation-card">
                  <div className="explanation-step">1</div>
                  <h3>{t.home.explanationStep1Title}</h3>
                  <p>{t.home.explanationStep1Desc}</p>
                </div>
                <div className="explanation-card">
                  <div className="explanation-step">2</div>
                  <h3>{t.home.explanationStep2Title}</h3>
                  <p>{t.home.explanationStep2Desc}</p>
                </div>
                <div className="explanation-card">
                  <div className="explanation-step">3</div>
                  <h3>{t.home.explanationStep3Title}</h3>
                  <p>{t.home.explanationStep3Desc}</p>
                </div>
              </div>

              <div className="explanation-details">
                <div className="detail-card">
                  <h3>{t.home.explanationForParentsTitle}</h3>
                  <ul>
                    <li>{t.home.explanationForParents1}</li>
                    <li>{t.home.explanationForParents2}</li>
                  </ul>
                </div>
                <div className="detail-card">
                  <h3>{t.home.explanationSafetyTitle}</h3>
                  <ul>
                    <li>{t.home.explanationSafety1}</li>
                    <li>{t.home.explanationSafety2}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="kid-video-section">
              <h2 className="section-title">Kids Watch Corner</h2>
              <p className="section-subtitle">
                Scroll down and tap play to enjoy a friendly Sound Safari video.
              </p>
              <div className="kid-video-card">
                <div className="kid-video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${kidsVideoId}`}
                    title="Sound Safari Kids Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'dashboard' && (
        <div className="dashboard-container">
          <button 
            onClick={() => setView('home')} 
            className="back-button"
          >
            ← Back to Home
          </button>
          <ParentDashboard />
        </div>
      )}

      {view === 'game' && (
        <div className="game-container">
          <button 
            onClick={() => setView('home')} 
            className="exit-button"
          >
            Exit Safari
          </button>
          <GameView />
        </div>
      )}
    </div>
  );
}

export default App;
