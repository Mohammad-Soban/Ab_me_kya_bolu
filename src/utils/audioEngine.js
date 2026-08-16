// Web Audio API Procedural Romantic Sound & Music Engine
// Zero external asset dependencies - 100% reliable in any browser!

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.bgGain = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.6;
    this.musicTimer = null;
    this.currentScaleIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgGain = this.ctx.createGain();
      this.bgGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.bgGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : val, this.ctx.currentTime, 0.1);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.1);
    }
    return this.isMuted;
  }

  // --- Sound Effects ---

  // Gate Unlock Chime Fanfare
  playGateOpenChime() {
    this.init();
    if (!this.ctx) return;

    // Harmonic Chord: E Major 9 / Celestial Chimes
    const notes = [329.63, 415.30, 493.88, 659.25, 830.61, 987.77, 1318.51];
    const now = this.ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 2.6);
    });
  }

  // Sparkle / Star chime
  playSparkle() {
    this.init();
    if (!this.ctx) return;

    const freqs = [880, 1174.66, 1396.91, 1760];
    const now = this.ctx.currentTime;

    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.04);

      gain.gain.setValueAtTime(0.08, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.7);
    });
  }

  // Pop / Bubble burst
  playPop() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Heartbeat sound
  playHeartbeat() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.18].forEach((offset, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(idx === 0 ? 80 : 65, now + offset);
      osc.frequency.exponentialRampToValueAtTime(35, now + offset + 0.12);

      gain.gain.setValueAtTime(0.3, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + offset);
      osc.stop(now + offset + 0.15);
    });
  }

  // --- Procedural Romantic Background Soundtrack ---
  startBackgroundMusic() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Romantic Progression in D Major / B Minor
    // Dmaj7 -> Bm7 -> Gmaj7 -> A7sus4
    const chordProgressions = [
      // Dmaj7
      { root: 146.83, chord: [293.66, 369.99, 440.00, 554.37], melody: [587.33, 739.99, 880.00] },
      // Bm7
      { root: 123.47, chord: [246.94, 293.66, 369.99, 440.00], melody: [493.88, 587.33, 739.99] },
      // Gmaj7
      { root: 98.00, chord: [196.00, 246.94, 293.66, 369.99], melody: [392.00, 493.88, 587.33] },
      // A9
      { root: 110.00, chord: [220.00, 277.18, 329.63, 440.00], melody: [440.00, 554.37, 659.25] },
      // F#m7
      { root: 92.50, chord: [185.00, 220.00, 277.18, 369.99], melody: [369.99, 440.00, 554.37] },
      // Em7
      { root: 82.41, chord: [164.81, 196.00, 246.94, 293.66], melody: [329.63, 392.00, 493.88] },
      // Gmaj7 (tender return)
      { root: 98.00, chord: [196.00, 246.94, 293.66, 369.99], melody: [587.33, 493.88, 369.99] },
      // Asus4 -> A
      { root: 110.00, chord: [220.00, 293.66, 329.63, 440.00], melody: [659.25, 554.37, 440.00] }
    ];

    let chordIndex = 0;
    const playChordStep = () => {
      if (!this.isPlaying || !this.ctx) return;

      const current = chordProgressions[chordIndex % chordProgressions.length];
      chordIndex++;

      const now = this.ctx.currentTime;
      const duration = 4.2;

      // Warm Bass Pad
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(current.root, now);

      bassGain.gain.setValueAtTime(0, now);
      bassGain.gain.linearRampToValueAtTime(0.12, now + 1.0);
      bassGain.gain.linearRampToValueAtTime(0.001, now + duration);

      bassOsc.connect(bassGain);
      bassGain.connect(this.bgGain);
      bassOsc.start(now);
      bassOsc.stop(now + duration + 0.1);

      // Warm Soft Chord Pads
      current.chord.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.035, now + 1.2);
        gain.gain.linearRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.bgGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });

      // Harp / Music Box Arpeggio notes
      current.melody.forEach((freq, mIdx) => {
        const mTime = now + 0.8 + mIdx * 0.9;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, mTime);

        gain.gain.setValueAtTime(0, mTime);
        gain.gain.linearRampToValueAtTime(0.06, mTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, mTime + 1.8);

        osc.connect(gain);
        gain.connect(this.bgGain);

        osc.start(mTime);
        osc.stop(mTime + 1.9);
      });

      this.musicTimer = setTimeout(playChordStep, duration * 1000 - 300);
    };

    playChordStep();
  }

  stopBackgroundMusic() {
    this.isPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const audioEngine = new AudioEngine();
