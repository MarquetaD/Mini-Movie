/**
 * Web Audio API procedural sound engine for "Are Ghosts Real?"
 * Generates spooky atmospherics, comic cartoon Foley, and uplifting music cues
 * without relying on external media files.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;
  private tvDroneNode: AudioNode | null = null;
  private tvGain: GainNode | null = null;
  private lastTriggeredTimes: Map<string, number> = new Map();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.65, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.65, this.ctx.currentTime);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Helper: create white noise buffer
  private createNoiseBuffer(durationSec: number = 3): AudioBuffer {
    if (!this.ctx) this.initContext();
    const bufferSize = this.ctx!.sampleRate * durationSec;
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // 1. Ambient Rain & Storm
  public startStormAmbience(volume: number = 0.2) {
    if (this.rainNode) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(4);
    noise.loop = true;

    // Filter to make it sound like gentle rain against window
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(volume, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);

    noise.start();
    this.rainNode = noise;
  }

  public stopStormAmbience() {
    if (this.rainNode) {
      try {
        (this.rainNode as AudioBufferSourceNode).stop();
        this.rainNode.disconnect();
      } catch {
        // ignore
      }
      this.rainNode = null;
    }
  }

  // 2. Thunder Rumble
  public playThunder() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 2.5);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.0);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 3.0);
  }

  // 3. Comic Stomach Rumble
  public playStomachRumble() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(70, this.ctx.currentTime);

    // LFO creates the cartoon gurgle wobble
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(8, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(35, this.ctx.currentTime);

    lfo.connect(osc.frequency);

    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.6, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.6, this.ctx.currentTime + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    lfo.start();
    osc.start();
    lfo.stop(this.ctx.currentTime + 2.2);
    osc.stop(this.ctx.currentTime + 2.2);
  }

  // 4. Pencil Drawing Scratches
  public playPencilScratch() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(0.3);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3200, this.ctx.currentTime);
    filter.Q.setValueAtTime(4, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.3);
  }

  // 5. Creaking Floorboards
  public playCreak() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(260, this.ctx.currentTime + 0.4);
    osc.frequency.linearRampToValueAtTime(180, this.ctx.currentTime + 0.8);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.9);
  }

  // 6. Soup Boiling & Bubbling
  public playSoupBubble() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 300 + Math.random() * 200;
    osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 350, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  // 7. TV Cartoon Broadcast Chime
  public playTvTune() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.12, this.ctx!.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.12 + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(this.ctx!.currentTime + idx * 0.12);
      osc.stop(this.ctx!.currentTime + idx * 0.12 + 0.25);
    });
  }

  // 8. Sudden TV Static & Power Zap
  public playTvZapStatic() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Burst of harsh noise
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(0.6);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    // Cathode ray discharge sweep
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime + 0.4);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.9);

    oscGain.gain.setValueAtTime(0.4, this.ctx.currentTime + 0.4);
    oscGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    noise.start();
    osc.start(this.ctx.currentTime + 0.4);
    osc.stop(this.ctx.currentTime + 0.9);
  }

  // 9. Tension Heartbeat (Lub-Dub)
  public playHeartbeat() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const playThump = (delay: number, freq: number, vol: number) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx!.currentTime + delay + 0.18);

      gain.gain.setValueAtTime(vol, this.ctx!.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + delay + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(this.ctx!.currentTime + delay);
      osc.stop(this.ctx!.currentTime + delay + 0.22);
    };

    playThump(0, 75, 0.55);
    playThump(0.18, 60, 0.45);
  }

  // 10. Heavy Bookshelf Crash / Thud
  public playBookThud() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Sub-bass heavy impact
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.4);

    oscGain.gain.setValueAtTime(0.9, this.ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    // Wooden slap transient
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(0.2);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    osc.start();
    noise.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }

  // 11. Comic Giggling & Whimsical Staccato
  public playKidGiggle() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Upbeat playful arpeggio laughing notes
    const giggleNotes = [440, 554, 659, 880, 740, 880];
    giggleNotes.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f + Math.sin(i) * 30, this.ctx!.currentTime + i * 0.1);

      gain.gain.setValueAtTime(0.3, this.ctx!.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + i * 0.1 + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(this.ctx!.currentTime + i * 0.1);
      osc.stop(this.ctx!.currentTime + i * 0.1 + 0.15);
    });
  }

  // 12. Cozy Family Dinner Happy Music Cue
  public playCozyEndingFanfare() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Warm marimba-like major chords (C - G - Am - F - C)
    const chords = [
      [261.63, 329.63, 392.0], // C
      [392.0, 493.88, 587.33], // G
      [440.0, 523.25, 659.25], // Am
      [349.23, 440.0, 523.25], // F
      [523.25, 659.25, 783.99, 1046.5], // High C major victory
    ];

    chords.forEach((chord, cIdx) => {
      chord.forEach((note) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, this.ctx!.currentTime + cIdx * 0.5);

        gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + cIdx * 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + cIdx * 0.5 + 0.8);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(this.ctx!.currentTime + cIdx * 0.5);
        osc.stop(this.ctx!.currentTime + cIdx * 0.5 + 0.85);
      });
    });
  }

  // Synchronized dispatcher based on timestamp
  public syncAudioWithTimeline(timeSec: number) {
    const t = Math.floor(timeSec);

    // Throttled sound effect triggers
    const triggerOnce = (id: string, fn: () => void) => {
      const last = this.lastTriggeredTimes.get(id);
      if (last === undefined || Math.abs(t - last) > 3) {
        this.lastTriggeredTimes.set(id, t);
        fn();
      }
    };

    // Storm continuous check
    if (t < 90) {
      this.startStormAmbience(0.15);
    } else if (t >= 90 && t < 135) {
      this.startStormAmbience(0.25); // intensified storm during climax
    } else {
      this.stopStormAmbience(); // storm clears during happy ending
    }

    // Specific time-based audio cues
    if (t === 4 || t === 10) triggerOnce(`thunder-${t}`, () => this.playThunder());
    if (t === 14 || t === 20) triggerOnce(`pencil-${t}`, () => this.playPencilScratch());
    if (t === 28) triggerOnce('stomach', () => this.playStomachRumble());
    if (t === 39) triggerOnce('creak-walk', () => this.playCreak());
    if (t === 50 || t === 65 || t === 80) triggerOnce(`bubble-${t}`, () => this.playSoupBubble());
    if (t === 93) triggerOnce('tv-tune', () => this.playTvTune());
    if (t === 107) triggerOnce('tv-zap', () => this.playTvZapStatic());
    if (t === 116 || t === 120) triggerOnce(`heartbeat-${t}`, () => this.playHeartbeat());
    if (t === 124) triggerOnce('book-thud', () => this.playBookThud());
    if (t === 137 || t === 152) triggerOnce(`giggle-${t}`, () => this.playKidGiggle());
    if (t === 162) triggerOnce('happy-fanfare', () => this.playCozyEndingFanfare());
  }
}

export const soundEngine = new SoundEngine();
