'use client';

// ==========================================
// Quvnoq Bolachalar - Web Audio Engine
// Sof Web Audio API orqali quvnoq tovushlar
// ==========================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.musicEnabled = false;
    this.musicInterval = null;
  }

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(force) {
    this.soundEnabled = force !== undefined ? force : !this.soundEnabled;
    return this.soundEnabled;
  }

  toggleMusic() {
    this.init();
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.startBackgroundMelody();
    } else {
      this.stopBackgroundMelody();
    }
    return this.musicEnabled;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.15, startDelay = 0) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const startTime = this.ctx.currentTime + startDelay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(gainVal, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Quvnoq tugma bosish
  click() {
    this.playTone(600, 'sine', 0.08, 0.1);
  }

  // Pufakcha yorilishi
  pop() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.08);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch (e) {
      console.warn(e);
    }
  }

  // Kartochka aylanishi
  flip() {
    this.playTone(450, 'triangle', 0.09, 0.12);
  }

  // To'g'ri javob - g'olibona akkord
  correct() {
    if (!this.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.22, 0.14, idx * 0.08);
    });
  }

  // Noto'g'ri javob - yumshoq eslatma tovushi
  wrong() {
    if (!this.soundEnabled) return;
    this.playTone(280, 'sawtooth', 0.18, 0.1, 0);
    this.playTone(220, 'sawtooth', 0.25, 0.1, 0.12);
  }

  // Yulduzcha yutib olish
  star() {
    if (!this.soundEnabled) return;
    const notes = [880, 1174.66, 1760];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.18, 0.12, idx * 0.07);
    });
  }

  // Combo maratoni
  combo(streak = 1) {
    if (!this.soundEnabled) return;
    const base = 400 + Math.min(streak * 70, 750);
    this.playTone(base, 'triangle', 0.12, 0.14, 0);
    this.playTone(base * 1.25, 'triangle', 0.18, 0.14, 0.08);
  }

  // Katta g'alaba fanfari
  victory() {
    if (!this.soundEnabled) return;
    const fanfare = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 523.25, d: 0.15, t: 0.15 },
      { f: 523.25, d: 0.15, t: 0.3 },
      { f: 659.25, d: 0.35, t: 0.45 },
      { f: 587.33, d: 0.2, t: 0.8 },
      { f: 659.25, d: 0.2, t: 1.0 },
      { f: 783.99, d: 0.6, t: 1.2 }
    ];
    fanfare.forEach(item => {
      this.playTone(item.f, 'triangle', item.d, 0.16, item.t);
    });
  }

  // Fon musiqasi (soft pentatonic)
  startBackgroundMelody() {
    this.stopBackgroundMelody();
    const pentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let step = 0;
    this.musicInterval = setInterval(() => {
      if (!this.musicEnabled) return;
      const freq = pentatonic[step % pentatonic.length];
      this.playTone(freq, 'sine', 0.3, 0.035);
      step = (step + Math.floor(Math.random() * 3) + 1) % pentatonic.length;
    }, 450);
  }

  stopBackgroundMelody() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const sound = new SoundEngine();
export default sound;
