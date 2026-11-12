/**
 * Realistic Character Voice Engine for "Are Ghosts Real?"
 * Provides natural, human-sounding speech with prosody tuning,
 * neural voice prioritization, emotion-aware pacing, and per-character customization.
 */

import { DialogueBeat } from './types';

export type VoiceMode = 'ai-gemini' | 'browser-speech';

export interface CharacterVoiceProfile {
  speaker: 'Kyady' | 'Mom' | 'Brother' | 'Narrator';
  displayName: string;
  role: string;
  geminiVoice: 'Puck' | 'Kore' | 'Zephyr' | 'Fenrir';
  vocalStyle: string;
  pitch: number;
  rate: number;
  volume: number;
  preferredVoiceURI?: string;
  avatarEmoji: string;
  color: string;
  samplePhrase: string;
}

export const CHARACTER_VOICE_PROFILES: Record<string, CharacterVoiceProfile> = {
  Kyady: {
    speaker: 'Kyady',
    displayName: 'Kyady (8-Year-Old Girl)',
    role: 'Sweet, imaginative 8-year-old little girl wearing Leavitt shirt and purple pants; easily spooked by ghosts',
    geminiVoice: 'Puck',
    vocalStyle: 'Adorable, sweet 8-year-old child voice with innocent inflections, cute breathless gasps, and cheerful giggles.',
    pitch: 1.28, // Authentic 8-year-old child pitch (cute, high, natural)
    rate: 1.05,
    volume: 1.0,
    avatarEmoji: '👧',
    color: 'text-purple-400 bg-purple-950/60 border-purple-700/60',
    samplePhrase: "Hmm, just a little more green rind for my watermelon drawing! Mom, do you think ghosts live in our house?",
  },
  Mom: {
    speaker: 'Mom',
    displayName: 'Mom (Loving Parent)',
    role: 'Warm, loving mother stirring steaming vegetable soup',
    geminiVoice: 'Kore',
    vocalStyle: 'Warm, soothing, melodic maternal voice with comforting cadence and gentle pacing.',
    pitch: 0.98,
    rate: 0.94,
    volume: 1.0,
    avatarEmoji: '👩',
    color: 'text-rose-400 bg-rose-950/60 border-rose-700/60',
    samplePhrase: "Don't worry Kyady, there are no ghosts here! It's just old floorboards. Hot soup is ready!",
  },
  Brother: {
    speaker: 'Brother',
    displayName: 'Brother Leo (8-Year-Old Boy)',
    role: 'Playful, energetic 8-year-old little brother who loves hiding and pulling harmless spooky pranks',
    geminiVoice: 'Zephyr',
    vocalStyle: 'Playful, cheeky 8-year-old boy voice bursting with mischievous chuckles, high kid energy, and teasing giggles.',
    pitch: 1.30, // Authentic 8-year-old boy child pitch
    rate: 1.14,
    volume: 1.0,
    avatarEmoji: '👦',
    color: 'text-sky-400 bg-sky-950/60 border-sky-700/60',
    samplePhrase: 'Hehehe! Gotcha Kyady! You jumped all the way to the ceiling! You should have seen your face!',
  },
  Narrator: {
    speaker: 'Narrator',
    displayName: 'The Spooky Storyteller',
    role: 'Deep, atmospheric narrator setting the eerie stormy mood and building suspense',
    geminiVoice: 'Fenrir',
    vocalStyle: 'Deep, resonant, cinematic movie narrator voice with suspenseful cadence and dramatic pauses.',
    pitch: 0.86,
    rate: 0.88,
    volume: 0.95,
    avatarEmoji: '🎙️',
    color: 'text-amber-400 bg-amber-950/60 border-amber-700/60',
    samplePhrase: 'On a dark and stormy night, the wind howls around an old rusty house on the hill...',
  },
};

class VoiceEngine {
  private isEnabled: boolean = true;
  private voiceMode: VoiceMode = 'browser-speech'; // Defaults to enhanced natural neural browser speech for zero-lag local playback
  private volume: number = 1.0;
  private currentAudioElement: HTMLAudioElement | null = null;
  private lastSpokenKey: string | null = null;
  private synth: SpeechSynthesis | null = null;
  private audioCache: Map<string, string> = new Map();
  private pendingRequests: Map<string, Promise<string | null>> = new Map();
  private customVoiceOverrides: Map<string, { voiceURI?: string; pitch?: number; rate?: number }> = new Map();
  private onSpeakingChangeCallbacks: Set<(isSpeaking: boolean, speaker?: string) => void> = new Set();
  private onVoiceModeChangeCallbacks: Set<(mode: VoiceMode) => void> = new Set();
  private availableVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.loadBrowserVoices();
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => this.loadBrowserVoices();
        }
      }
    }
  }

  private loadBrowserVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (voices && voices.length > 0) {
      this.availableVoices = voices;
    }
  }

  public getAvailableBrowserVoices(): SpeechSynthesisVoice[] {
    if (this.availableVoices.length === 0 && this.synth) {
      this.loadBrowserVoices();
    }
    return this.availableVoices;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  public setVoiceMode(mode: VoiceMode) {
    this.voiceMode = mode;
    this.stop();
    this.onVoiceModeChangeCallbacks.forEach((cb) => cb(mode));
  }

  public getVoiceMode(): VoiceMode {
    return this.voiceMode;
  }

  public setCharacterOverride(speaker: string, settings: { voiceURI?: string; pitch?: number; rate?: number }) {
    const existing = this.customVoiceOverrides.get(speaker) || {};
    this.customVoiceOverrides.set(speaker, { ...existing, ...settings });
  }

  public getCharacterOverride(speaker: string) {
    return this.customVoiceOverrides.get(speaker) || {};
  }

  public subscribeVoiceMode(cb: (mode: VoiceMode) => void): () => void {
    this.onVoiceModeChangeCallbacks.add(cb);
    return () => {
      this.onVoiceModeChangeCallbacks.delete(cb);
    };
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentAudioElement) {
      this.currentAudioElement.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public subscribeSpeakingState(cb: (isSpeaking: boolean, speaker?: string) => void): () => void {
    this.onSpeakingChangeCallbacks.add(cb);
    return () => {
      this.onSpeakingChangeCallbacks.delete(cb);
    };
  }

  private notifySpeakingState(speaking: boolean, speaker?: string) {
    this.onSpeakingChangeCallbacks.forEach((cb) => cb(speaking, speaker));
  }

  /**
   * Preprocess dialogue text to add natural human breathing pauses,
   * smooth out robotic monotone, and prevent abrupt speech clipping.
   */
  public makeTextNatural(text: string, emotion?: string): string {
    let clean = text
      .replace(/\*.*?\*/g, '') // strip *GASP* or *THUD* directions
      .replace(/♪/g, '')
      .trim();

    // Insert natural breathing ellipses after introductory exclamations
    clean = clean.replace(/^(Mom!|Haha!|LEO\?!|Whoa!|Suddenly\.\.\.)\s*/i, '$1 ... ');

    // Add breathing micro-pauses around dramatic suspense phrases
    if (emotion === 'terrified' || emotion === 'shocked') {
      clean = clean.replace(/\?/g, '?... ');
      clean = clean.replace(/!/g, '!... ');
    } else {
      clean = clean.replace(/!{2,}/g, '!');
      clean = clean.replace(/\?{2,}/g, '?');
    }

    return clean;
  }

  /**
   * Fetch realistic AI voice audio from the server via Gemini 3.8 Flash Lite TTS
   */
  public async fetchAIAudio(speaker: string, text: string, emotion?: string): Promise<string | null> {
    const cleanText = this.makeTextNatural(text, emotion);
    if (!cleanText) return null;

    const cacheKey = `${speaker}:${cleanText}`;
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }

    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey)!;
    }

    const requestPromise = (async () => {
      try {
        const response = await fetch('/api/tts/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ speaker, text: cleanText, emotion }),
        });

        if (!response.ok) {
          return null;
        }

        const data = await response.json();
        if (data.audioBase64) {
          const dataUrl = `data:audio/wav;base64,${data.audioBase64}`;
          this.audioCache.set(cacheKey, dataUrl);
          return dataUrl;
        }
        return null;
      } catch (err) {
        console.warn('Could not fetch Gemini TTS audio, will use natural browser speech:', err);
        return null;
      } finally {
        this.pendingRequests.delete(cacheKey);
      }
    })();

    this.pendingRequests.set(cacheKey, requestPromise);
    return requestPromise;
  }

  /**
   * Speak a dialogue beat in sync with animation
   */
  public async speakDialogue(beat: DialogueBeat) {
    if (!this.isEnabled) return;

    const beatKey = `${beat.speaker}:${beat.text}`;
    if (this.lastSpokenKey === beatKey) {
      return;
    }

    this.stop();
    this.lastSpokenKey = beatKey;

    if (this.voiceMode === 'ai-gemini') {
      const audioUrl = await this.fetchAIAudio(beat.speaker, beat.text, beat.emotion);
      if (audioUrl) {
        this.playAudioClip(audioUrl, beat.speaker);
        return;
      }
    }

    // Natural human speech synthesis
    this.speakWithBrowserSpeech(beat.speaker, beat.text, beat.emotion);
  }

  private playAudioClip(audioUrl: string, speaker: string) {
    this.stop();
    const audio = new Audio(audioUrl);
    audio.volume = this.volume;

    audio.onplay = () => {
      this.notifySpeakingState(true, speaker);
    };

    audio.onended = () => {
      this.notifySpeakingState(false);
      this.currentAudioElement = null;
    };

    audio.onerror = () => {
      this.notifySpeakingState(false);
      this.currentAudioElement = null;
    };

    this.currentAudioElement = audio;
    audio.play().catch(() => {
      this.notifySpeakingState(false);
    });
  }

  private speakWithBrowserSpeech(speaker: string, text: string, emotion?: string) {
    if (!this.synth) return;

    const profile = CHARACTER_VOICE_PROFILES[speaker] || CHARACTER_VOICE_PROFILES['Kyady'];
    const overrides = this.customVoiceOverrides.get(speaker) || {};
    const naturalText = this.makeTextNatural(text, emotion);

    if (!naturalText) return;

    try {
      const utterance = new SpeechSynthesisUtterance(naturalText);

      // Emotion-aware prosody adjustments for lifelike realism
      let pitch = overrides.pitch ?? profile.pitch;
      let rate = overrides.rate ?? profile.rate;

      if (emotion === 'terrified') {
        pitch = Math.max(0.7, pitch * 0.95); // Slightly lowered, breathless
        rate = Math.max(0.75, rate * 0.88); // Slower, trembling
      } else if (emotion === 'laughing' || emotion === 'giggling') {
        pitch = Math.min(1.35, pitch * 1.05); // Bouncy and bright
        rate = Math.min(1.25, rate * 1.08); // Cheerful tempo
      }

      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = profile.volume * this.volume;

      const chosenVoice = this.selectBestBrowserVoice(speaker, overrides.voiceURI);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      utterance.onstart = () => this.notifySpeakingState(true, speaker);
      utterance.onend = () => this.notifySpeakingState(false);
      utterance.onerror = () => this.notifySpeakingState(false);

      this.synth.speak(utterance);
    } catch {
      this.notifySpeakingState(false);
    }
  }

  /**
   * Smart selector that prioritizes modern Natural / Neural / High-Definition voices
   * while filtering out legacy robotic synthesizers (e.g. eSpeak / robotic MBROLA).
   */
  public selectBestBrowserVoice(speaker: string, preferredURI?: string): SpeechSynthesisVoice | null {
    if (!this.availableVoices || this.availableVoices.length === 0) {
      this.loadBrowserVoices();
    }
    if (this.availableVoices.length === 0) return null;

    if (preferredURI) {
      const match = this.availableVoices.find(v => v.voiceURI === preferredURI);
      if (match) return match;
    }

    const englishVoices = this.availableVoices.filter(v => v.lang.startsWith('en'));
    const pool = englishVoices.length > 0 ? englishVoices : this.availableVoices;

    // Filter out known low-quality legacy robotic synthesizers
    const nonRobotic = pool.filter(v => !/espeak|mbrola|klatt|synthetic|robotic/i.test(v.name));
    const cleanPool = nonRobotic.length > 0 ? nonRobotic : pool;

    // Prioritize premium neural human voices
    const neuralVoices = cleanPool.filter(v =>
      /natural|neural|premium|enhanced|google us|google uk|siri|online \(natural\)/i.test(v.name)
    );
    const candidatePool = neuralVoices.length > 0 ? neuralVoices : cleanPool;

    if (speaker === 'Kyady') {
      const match = candidatePool.find(v => /jenny|aria|samantha|victoria|karen|female|zira|zoe/i.test(v.name));
      return match || candidatePool[0];
    } else if (speaker === 'Mom') {
      const match = candidatePool.find(v => /samantha|karen|moira|fiona|female|amy|serena/i.test(v.name));
      return match || candidatePool[0];
    } else if (speaker === 'Brother') {
      const match = candidatePool.find(v => /guy|christopher|alex|fred|junior|child|boy/i.test(v.name));
      return match || candidatePool[0];
    } else {
      // Narrator: deeper resonant male voice
      const match = candidatePool.find(v => /guy|christopher|daniel|george|david|oliver|male/i.test(v.name));
      return match || candidatePool[0];
    }
  }

  /**
   * Audition / preview a character's realistic voice
   */
  public async previewVoice(speaker: string, customText?: string) {
    this.stop();
    const profile = CHARACTER_VOICE_PROFILES[speaker] || CHARACTER_VOICE_PROFILES['Kyady'];
    const text = customText || profile.samplePhrase;

    if (this.voiceMode === 'ai-gemini') {
      const audioUrl = await this.fetchAIAudio(speaker, text);
      if (audioUrl) {
        this.playAudioClip(audioUrl, speaker);
        return;
      }
    }

    this.speakWithBrowserSpeech(speaker, text);
  }

  public stop() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement.currentTime = 0;
      this.currentAudioElement = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.notifySpeakingState(false);
  }
}

export const voiceEngine = new VoiceEngine();
