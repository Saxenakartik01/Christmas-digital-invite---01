// Synthesizes a gentle, festive music-box chime melody ("We Wish You A Merry Christmas") using Web Audio API

class HolidayChime {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private noteIndex = 0;

  // [frequency in Hz, duration in seconds]
  private melody: [number, number][] = [
    [293.66, 0.45], // D4 (We)
    [392.00, 0.45], // G4 (wish)
    [392.00, 0.25], // G4 (you)
    [440.00, 0.25], // A4 (a)
    [392.00, 0.25], // G4 (mer-)
    [369.99, 0.25], // F#4 (-ry)
    [329.63, 0.45], // E4 (Christ-)
    [329.63, 0.45], // E4 (-mas)
    [329.63, 0.45], // E4 (We)
    [440.00, 0.45], // A4 (wish)
    [440.00, 0.25], // A4 (you)
    [493.88, 0.25], // B4 (a)
    [440.00, 0.25], // A4 (mer-)
    [392.00, 0.25], // G4 (-ry)
    [369.99, 0.45], // F#4 (Christ-)
    [293.66, 0.45], // D4 (-mas)
    [293.66, 0.45], // D4 (We)
    [493.88, 0.45], // B4 (wish)
    [493.88, 0.25], // B4 (you)
    [523.25, 0.25], // C5 (a)
    [493.88, 0.25], // B4 (mer-)
    [440.00, 0.25], // A4 (-ry)
    [392.00, 0.45], // G4 (Christ-)
    [329.63, 0.45], // E4 (-mas)
    [293.66, 0.25], // D4 (and)
    [293.66, 0.25], // D4 (a)
    [329.63, 0.45], // E4 (hap-)
    [440.00, 0.45], // A4 (-py)
    [369.99, 0.45], // F#4 (New)
    [392.00, 0.85], // G4 (Year)
  ];

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private playTone(freq: number, duration: number) {
    if (!this.isPlaying) return;
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;

      // Primary tone (warm sine)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, now);

      // Bell overtone (triangle at 2x frequency for music box sparkle)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Bell envelope
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.04, now + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.9);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration * 1.6);
      osc2.stop(now + duration * 1.6);
    } catch {
      // Audio playback fails gracefully if blocked
    }
  }

  private scheduleNext() {
    if (!this.isPlaying) return;
    const [freq, dur] = this.melody[this.noteIndex];
    this.playTone(freq, dur);

    const stepMs = dur * 1000;
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;

    // Small extra pause at end of stanza
    const pauseMs = this.noteIndex === 0 ? 1200 : stepMs;
    this.timer = window.setTimeout(() => this.scheduleNext(), pauseMs);
  }

  public play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNext();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const holidayChime = new HolidayChime();

// Synthesizes a crystalline Christmas church bell chime using Web Audio API
export function playChristmasBell() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const now = ctx.currentTime;

    // Harmonic and inharmonic bell partials (strike note, tierce, quint, octave, shimmer)
    const partials = [
      { freq: 880.0, gain: 0.38, decay: 2.2 },     // A5 Strike note
      { freq: 1108.73, gain: 0.26, decay: 1.8 },   // C#6 Minor Tierce
      { freq: 1318.51, gain: 0.22, decay: 1.6 },   // E6 Quint
      { freq: 1760.0, gain: 0.18, decay: 1.3 },    // A6 Octave
      { freq: 2637.0, gain: 0.12, decay: 0.9 },    // High metallic shimmer
      { freq: 3520.0, gain: 0.08, decay: 0.6 },    // Crystal brilliance
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gain, now + 0.003);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch {
    // Audio playback fails gracefully if blocked by device
  }
}

// Synthesizes a whimsical frosted snow flurry chime
export function playSnowFlurrySound() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    const flurryNotes = [
      { freq: 1760.0, delay: 0.0, gain: 0.14 },
      { freq: 2093.0, delay: 0.05, gain: 0.16 },
      { freq: 2349.32, delay: 0.1, gain: 0.18 },
      { freq: 2793.83, delay: 0.16, gain: 0.2 },
      { freq: 3135.96, delay: 0.22, gain: 0.14 },
    ];

    flurryNotes.forEach(({ freq, delay, gain }) => {
      const t = now + delay;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);

      gainNode.gain.setValueAtTime(0, t);
      gainNode.gain.linearRampToValueAtTime(gain, t + 0.003);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.5);
    });
  } catch {
    // Audio playback fails gracefully if blocked
  }
}

