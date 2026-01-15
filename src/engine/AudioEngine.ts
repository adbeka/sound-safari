// Audio Engine - Core audio processing and analysis
// All processing happens locally for privacy

export class AudioEngine {
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private microphone: MediaStream | null = null;
  private dataArray: Uint8Array;
  
  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
  }

  async initializeMicrophone(): Promise<boolean> {
    try {
      this.microphone = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      const source = this.audioContext.createMediaStreamSource(this.microphone);
      source.connect(this.analyser);
      return true;
    } catch (error) {
      console.error('Microphone access denied:', error);
      return false;
    }
  }

  getVolume(): number {
    this.analyser.getByteTimeDomainData(this.dataArray as Uint8Array<ArrayBuffer>);
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      const normalized = (this.dataArray[i] - 128) / 128;
      sum += normalized * normalized;
    }
    return Math.sqrt(sum / this.dataArray.length);
  }

  getPitch(): number {
    this.analyser.getByteFrequencyData(this.dataArray as Uint8Array<ArrayBuffer>);
    let maxIndex = 0;
    let maxValue = 0;
    
    for (let i = 0; i < this.dataArray.length; i++) {
      if (this.dataArray[i] > maxValue) {
        maxValue = this.dataArray[i];
        maxIndex = i;
      }
    }
    
    // Convert bin index to frequency
    return (maxIndex * this.audioContext.sampleRate) / this.analyser.fftSize;
  }

  isVocalizing(): boolean {
    const volume = this.getVolume();
    const pitch = this.getPitch();
    // Human voice range is roughly 85-255 Hz for children
    return volume > 0.1 && pitch > 85 && pitch < 500;
  }

  async playSound(audioBlob: Blob): Promise<void> {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    source.start();
  }

  async recordComfortSound(durationMs: number): Promise<Blob> {
    if (!this.microphone) {
      throw new Error('Microphone not initialized');
    }

    const mediaRecorder = new MediaRecorder(this.microphone);
    const chunks: Blob[] = [];

    return new Promise((resolve, reject) => {
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => resolve(new Blob(chunks, { type: 'audio/webm' }));
      mediaRecorder.onerror = reject;

      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), durationMs);
    });
  }

  getTempo(): number {
    // Simplified tempo detection
    const volume = this.getVolume();
    return volume > 0.15 ? 120 : 80; // Placeholder - real implementation would use onset detection
  }

  stop(): void {
    if (this.microphone) {
      this.microphone.getTracks().forEach(track => track.stop());
      this.microphone = null;
    }
  }

  async createToneSequence(frequencies: number[], duration: number = 0.3): Promise<void> {
    for (const freq of frequencies) {
      await this.playTone(freq, duration);
      await this.sleep(duration * 1000);
    }
  }

  async playTone(frequency: number, duration: number): Promise<void> {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const audioEngine = new AudioEngine();
