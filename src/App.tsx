// Main App Component
import { useState } from 'react';
import ParentDashboard from './components/ParentDashboard';
import GameView from './components/GameView';
import { useAppStore } from './store/useAppStore';
import { Home, Play } from 'lucide-react';
import './App.css';

function App() {
  const [view, setView] = useState<'home' | 'dashboard' | 'game'>('home');
  const { profile } = useAppStore();

  return (
    <div className="app">
      {view === 'home' && (
        <div className="home-view">
          <div className="hero-section">
            <h1 className="hero-title">
              <span className="emoji">🦁</span>
              Sound Safari
              <span className="emoji">🎵</span>
            </h1>
            <p className="hero-subtitle">
              The Interactive Audio Adventure for Curious Toddlers
            </p>
            <p className="hero-description">
              Transform parental absence into an engaging auditory exploration with Echo, 
              your child's friendly sound companion!
            </p>

            <div className="cta-buttons">
              {profile ? (
                <>
                  <button 
                    onClick={() => setView('game')} 
                    className="btn-cta primary"
                  >
                    <Play size={24} />
                    Start Adventure
                  </button>
                  <button 
                    onClick={() => setView('dashboard')} 
                    className="btn-cta secondary"
                  >
                    <Home size={24} />
                    Parent Dashboard
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setView('dashboard')} 
                  className="btn-cta primary"
                >
                  <Home size={24} />
                  Setup Profile
                </button>
              )}
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌿</div>
                <h3>Phase 1: Discovery</h3>
                <p>Quiet Ears Expedition - Listen to the world around you</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🐘</div>
                <h3>Phase 2: Expression</h3>
                <p>Jungle Choir Carnival - Make your own animal sounds</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🥁</div>
                <h3>Phase 3: Creation</h3>
                <p>Family Rhythm Band - Create musical rhythms</p>
              </div>
            </div>

            <div className="benefits-section">
              <h2 className="section-title">Benefits for Your Child</h2>
              <ul className="benefits-list">
                <li>✨ Reduces separation anxiety through engagement</li>
                <li>🎯 Builds auditory processing and attention skills</li>
                <li>🗣️ Encourages vocal confidence and expression</li>
                <li>🎨 Develops creativity through sound exploration</li>
                <li>💖 Provides emotional comfort during transitions</li>
                <li>🔒 100% privacy-focused with local processing</li>
              </ul>
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
