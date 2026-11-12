import React, { useState, useEffect } from 'react';
import {
  X,
  Mic,
  Volume2,
  VolumeX,
  Play,
  Sparkles,
  User,
  MessageSquare,
  CheckCircle2,
  Cpu,
  Loader2,
  Sliders,
  RotateCcw,
} from 'lucide-react';
import { CHARACTER_VOICE_PROFILES, voiceEngine, VoiceMode } from '../story/voiceEngine';
import { DIALOGUE_BEATS } from '../story/timeline';

interface VoiceCastModalProps {
  isOpen: boolean;
  onClose: () => void;
  voicesEnabled: boolean;
  onToggleVoices: () => void;
}

export const VoiceCastModal: React.FC<VoiceCastModalProps> = ({
  isOpen,
  onClose,
  voicesEnabled,
  onToggleVoices,
}) => {
  const [activeSpeaker, setActiveSpeaker] = useState<string>('Kyady');
  const [voiceMode, setVoiceMode] = useState<VoiceMode>(voiceEngine.getVoiceMode());
  const [loadingSpeaker, setLoadingSpeaker] = useState<string | null>(null);
  const [loadingBeatIdx, setLoadingBeatIdx] = useState<number | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [customPitch, setCustomPitch] = useState<number>(1.15);
  const [customRate, setCustomRate] = useState<number>(1.02);

  useEffect(() => {
    const voices = voiceEngine.getAvailableBrowserVoices();
    setAvailableVoices(voices);

    const override = voiceEngine.getCharacterOverride('Kyady');
    if (override.voiceURI) setSelectedVoiceURI(override.voiceURI);
    if (override.pitch) setCustomPitch(override.pitch);
    if (override.rate) setCustomRate(override.rate);

    const unsubscribe = voiceEngine.subscribeVoiceMode((mode) => setVoiceMode(mode));
    return () => {
      unsubscribe();
    };
  }, []);

  // Update voice customization sliders when active speaker changes
  useEffect(() => {
    const profile = CHARACTER_VOICE_PROFILES[activeSpeaker];
    const override = voiceEngine.getCharacterOverride(activeSpeaker);
    setCustomPitch(override.pitch ?? profile.pitch);
    setCustomRate(override.rate ?? profile.rate);
    const bestVoice = voiceEngine.selectBestBrowserVoice(activeSpeaker, override.voiceURI);
    setSelectedVoiceURI(override.voiceURI || bestVoice?.voiceURI || '');
  }, [activeSpeaker]);

  if (!isOpen) return null;

  const profiles = Object.values(CHARACTER_VOICE_PROFILES);

  const characterDialogues = DIALOGUE_BEATS.filter(
    (beat) => beat.speaker === activeSpeaker
  );

  const handleModeChange = (mode: VoiceMode) => {
    setVoiceMode(mode);
    voiceEngine.setVoiceMode(mode);
  };

  const handleAuditionProfile = async (speaker: string) => {
    setLoadingSpeaker(speaker);
    try {
      await voiceEngine.previewVoice(speaker);
    } finally {
      setLoadingSpeaker(null);
    }
  };

  const handleAuditionLine = async (speaker: string, text: string, idx: number) => {
    setLoadingBeatIdx(idx);
    try {
      await voiceEngine.previewVoice(speaker, text);
    } finally {
      setLoadingBeatIdx(null);
    }
  };

  const handleVoiceURIChange = (uri: string) => {
    setSelectedVoiceURI(uri);
    voiceEngine.setCharacterOverride(activeSpeaker, { voiceURI: uri });
  };

  const handlePitchChange = (p: number) => {
    setCustomPitch(p);
    voiceEngine.setCharacterOverride(activeSpeaker, { pitch: p });
  };

  const handleRateChange = (r: number) => {
    setCustomRate(r);
    voiceEngine.setCharacterOverride(activeSpeaker, { rate: r });
  };

  const handleResetSettings = () => {
    const def = CHARACTER_VOICE_PROFILES[activeSpeaker];
    setCustomPitch(def.pitch);
    setCustomRate(def.rate);
    setSelectedVoiceURI('');
    voiceEngine.setCharacterOverride(activeSpeaker, {
      pitch: def.pitch,
      rate: def.rate,
      voiceURI: undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-950/50 via-slate-900 to-indigo-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Realistic Character Voice Studio 🎙️
                </h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-950 border border-emerald-500/50 text-emerald-300">
                  Human Prosody & Neural Audio
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Natural human inflections, breathing pauses, and character voice tuning for realistic performance.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Realism Highlights Banner */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Anti-Robotic Vocal Optimization</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We eliminated metallic phase artifacts by recalibrating pitch to human vocal anatomy, adding natural breathing micro-pauses (...), and prioritizing high-definition neural voices over robotic legacy engines.
              </p>
            </div>

            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700/80 shrink-0">
              <button
                onClick={() => handleModeChange('browser-speech')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  voiceMode === 'browser-speech'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Neural Speech Engine</span>
              </button>

              <button
                onClick={() => handleModeChange('ai-gemini')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  voiceMode === 'ai-gemini'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Gemini Cloud TTS</span>
              </button>
            </div>
          </div>

          {/* Character Cast Tabs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 tracking-wider uppercase flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span>Select Character to Audition & Tune</span>
              </h3>
              <span className="text-xs text-slate-400">
                Click character to customize voice actor & prosody
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {profiles.map((profile) => {
                const isSelected = activeSpeaker === profile.speaker;
                const isLoading = loadingSpeaker === profile.speaker;
                return (
                  <div
                    key={profile.speaker}
                    onClick={() => setActiveSpeaker(profile.speaker)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-900/30 ring-2 ring-purple-500/20'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl p-1.5 bg-slate-900 rounded-2xl border border-slate-800">
                          {profile.avatarEmoji}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 border border-purple-700/60 text-purple-300 font-bold">
                          Pitch: {profile.pitch}x
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{profile.displayName}</h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                        {profile.vocalStyle}
                      </p>
                    </div>

                    <button
                      disabled={isLoading}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAuditionProfile(profile.speaker);
                      }}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 transition-all"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Voice...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Audition Character</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Voice Customization & Prosody Fine-Tuning */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  <span>Realism & Prosody Tuning: {CHARACTER_VOICE_PROFILES[activeSpeaker]?.displayName}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Select your system's best voice and calibrate natural pitch to remove robotic quality.
                </p>
              </div>

              <button
                onClick={handleResetSettings}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Natural Preset</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Voice Actor Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Voice Engine Model:</span>
                  <span className="text-[10px] text-purple-400">Preferred Voice</span>
                </label>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => handleVoiceURIChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="">Auto: Prioritize Natural / Neural Voice</option>
                  {availableVoices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang}) {v.name.toLowerCase().includes('natural') ? '⭐ Neural' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pitch Slider (0.8x to 1.35x) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span>Vocal Pitch:</span>
                    {(activeSpeaker === 'Kyady' || activeSpeaker === 'Brother') && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        8yo Child Calibrated
                      </span>
                    )}
                  </div>
                  <span className="text-purple-400 font-mono">{customPitch.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={1.35}
                  step={0.02}
                  value={customPitch}
                  onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Deep (Adult)</span>
                  <span>Adult (0.95–1.0x)</span>
                  <span className="text-amber-400 font-semibold">8yo Child (1.28–1.30x)</span>
                </div>
              </div>

              {/* Speed / Rate Slider (0.8x to 1.3x) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Speech Tempo:</span>
                  <span className="text-purple-400 font-mono">{customRate.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={1.3}
                  step={0.02}
                  value={customRate}
                  onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Slow & Dramatic</span>
                  <span>Natural Pace</span>
                  <span>Lively & Energetic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Script Lines Audition */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Audition Script Lines with New Realism Settings</span>
              </h3>
              <span className="text-xs text-purple-300 font-mono">
                Click any line to hear realistic performance
              </span>
            </div>

            <div className="space-y-2">
              {characterDialogues.map((beat, idx) => {
                const isLineLoading = loadingBeatIdx === idx;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-purple-500/50 flex items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {beat.startTime}s – {beat.endTime}s
                        </span>
                        <span className="text-[11px] font-semibold text-purple-400 capitalize">
                          Emotion: {beat.emotion}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-comic italic">
                        "{beat.text}"
                      </p>
                    </div>

                    <button
                      disabled={isLineLoading}
                      onClick={() => handleAuditionLine(beat.speaker, beat.text, idx)}
                      className="shrink-0 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 disabled:opacity-50 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
                    >
                      {isLineLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Play className="w-3 h-3 fill-current" />
                      )}
                      <span>Perform Line</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Human Prosody Calibration + Neural Voice Priority Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close & Back to Movie
          </button>
        </div>
      </div>
    </div>
  );
};
