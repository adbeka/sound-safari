// Emotion Detection Engine - Local audio tone analysis
// Detects emotional state from voice characteristics

import { AudioEngine } from './AudioEngine';
import type { EmotionalState, AudioAnalysis } from '../types';

export class EmotionDetector {
  private audioEngine: AudioEngine;
  private history: AudioAnalysis[] = [];
  private readonly HISTORY_LENGTH = 30; // 3 seconds at 10 samples/sec

  constructor(audioEngine: AudioEngine) {
    this.audioEngine = audioEngine;
  }

  analyzeEmotion(): AudioAnalysis {
    const volume = this.audioEngine.getVolume();
    const pitch = this.audioEngine.getPitch();
    const tempo = this.audioEngine.getTempo();
    const isVocalizing = this.audioEngine.isVocalizing();

    // Simple emotion classification based on acoustic features
    let emotion: EmotionalState = 'neutral';
    let confidence = 0;

    if (!isVocalizing) {
      emotion = 'neutral';
      confidence = 0.5;
    } else {
      // High pitch + high volume + fast tempo = excited
      if (pitch > 300 && volume > 0.3 && tempo > 110) {
        emotion = 'excited';
        confidence = 0.8;
      }
      // Low pitch + low volume + slow tempo = calm
      else if (pitch < 200 && volume < 0.2 && tempo < 90) {
        emotion = 'calm';
        confidence = 0.75;
      }
      // Irregular high pitch + high volume = distressed
      else if (pitch > 350 && volume > 0.4) {
        emotion = 'distressed';
        confidence = 0.7;
      }
      // Moderate values = happy
      else if (pitch > 200 && pitch < 300 && volume > 0.15) {
        emotion = 'happy';
        confidence = 0.7;
      }
    }

    const analysis: AudioAnalysis = {
      volume,
      pitch,
      tempo,
      emotion,
      isVocalizing,
      confidence
    };

    this.updateHistory(analysis);
    return analysis;
  }

  private updateHistory(analysis: AudioAnalysis): void {
    this.history.push(analysis);
    if (this.history.length > this.HISTORY_LENGTH) {
      this.history.shift();
    }
  }

  getEmotionTrend(): EmotionalState {
    if (this.history.length < 5) return 'neutral';

    const recentEmotions = this.history.slice(-10);
    const emotionCounts: Record<EmotionalState, number> = {
      happy: 0,
      neutral: 0,
      distressed: 0,
      excited: 0,
      calm: 0
    };

    recentEmotions.forEach(analysis => {
      emotionCounts[analysis.emotion]++;
    });

    // Return the most common emotion
    return Object.entries(emotionCounts).reduce((a, b) => 
      emotionCounts[a[0] as EmotionalState] > emotionCounts[b[0] as EmotionalState] ? a : b
    )[0] as EmotionalState;
  }

  shouldTriggerComfort(): boolean {
    const trend = this.getEmotionTrend();
    const recentAnalyses = this.history.slice(-5);
    
    // Trigger comfort if consistently distressed
    const distressedCount = recentAnalyses.filter(a => a.emotion === 'distressed').length;
    
    return trend === 'distressed' || distressedCount >= 3;
  }

  getEngagementLevel(): 'low' | 'medium' | 'high' {
    if (this.history.length < 5) return 'medium';

    const recentAnalyses = this.history.slice(-10);
    const vocalizingCount = recentAnalyses.filter(a => a.isVocalizing).length;
    const avgVolume = recentAnalyses.reduce((sum, a) => sum + a.volume, 0) / recentAnalyses.length;

    if (vocalizingCount >= 7 || avgVolume > 0.3) return 'high';
    if (vocalizingCount >= 3 || avgVolume > 0.15) return 'medium';
    return 'low';
  }

  reset(): void {
    this.history = [];
  }
}
