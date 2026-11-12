import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Subtitles,
  Sparkles,
  BookOpen,
  AudioWaveform,
  FastForward,
  Rewind,
  Mic,
  MicOff,
} from 'lucide-react';
import { formatTime, SCENES, TOTAL_DURATION_SECONDS } from '../story/timeline';

interface MovieControlsProps {
  currentTime: number;
  isPlaying: boolean;
  isMuted: boolean;
  voicesEnabled: boolean;
  showCaptions: boolean;
  playbackSpeed: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
  onToggleVoices: () => void;
  onToggleCaptions: () => void;
  onChangeSpeed: (speed: number) => void;
  onOpenSoundDesign: () => void;
  onOpenVoiceCast: () => void;
  onOpenPlanner: () => void;
}

export const MovieControls: React.FC<MovieControlsProps> = ({
  currentTime,
  isPlaying,
  isMuted,
  voicesEnabled,
  showCaptions,
  playbackSpeed,
  onTogglePlay,
  onSeek,
  onToggleMute,
  onToggleVoices,
  onToggleCaptions,
  onChangeSpeed,
  onOpenSoundDesign,
  onOpenVoiceCast,
  onOpenPlanner,
}) => {
  const progressPercent = (currentTime / TOTAL_DURATION_SECONDS) * 100;

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
      {/* Timeline Scrubber & Scene Markers */}
      <div className="relative flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1 gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-white font-bold">{formatTime(currentTime)}</span>
            <span className="text-slate-600">/</span>
            <span>{formatTime(TOTAL_DURATION_SECONDS)}</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {SCENES.map((s) => {
              const isActive = currentTime >= s.startTime && currentTime < s.endTime;
              return (
                <button
                  key={s.id}
                  onClick={() => onSeek(s.startTime)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-all shrink-0 ${
                    isActive
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Scene {s.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Scrubber Input */}
        <div className="relative w-full flex items-center group">
          {/* Timeline background track with scene color stripes */}
          <div className="absolute inset-0 h-2 my-auto rounded-full bg-slate-800 overflow-hidden pointer-events-none flex">
            <div className="w-[25%] h-full bg-indigo-950/60 border-r border-slate-700/60" title="Scene 1: Setup" />
            <div className="w-[25%] h-full bg-amber-950/50 border-r border-slate-700/60" title="Scene 2: Rising Action" />
            <div className="w-[25%] h-full bg-purple-950/70 border-r border-slate-700/60" title="Scene 3: Climax" />
            <div className="w-[25%] h-full bg-emerald-950/60" title="Scene 4: Twist & Dinner" />
          </div>

          {/* Active Progress Fill */}
          <div
            className="absolute left-0 h-2 my-auto rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 pointer-events-none transition-[width] duration-75"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Range Slider for Scrubbing */}
          <input
            type="range"
            min={0}
            max={TOTAL_DURATION_SECONDS}
            step={0.2}
            value={currentTime}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="w-full h-4 appearance-none bg-transparent cursor-pointer z-10 focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-500/50 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-600 [&::-webkit-slider-thumb]:transition-transform group-hover:[&::-webkit-slider-thumb]:scale-125"
          />
        </div>
      </div>

      {/* Playback Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Left: Playback Triggers */}
        <div className="flex items-center gap-2">
          {/* Rewind 5s */}
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 5))}
            aria-label="Rewind 5 seconds"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Rewind className="w-4 h-4" />
          </button>

          {/* Main Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
            className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white shadow-lg shadow-purple-600/30 transition-all font-semibold flex items-center gap-1.5"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            <span className="text-xs uppercase tracking-wider pr-1">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          {/* Forward 5s */}
          <button
            onClick={() => onSeek(Math.min(TOTAL_DURATION_SECONDS, currentTime + 5))}
            aria-label="Forward 5 seconds"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <FastForward className="w-4 h-4" />
          </button>

          {/* Restart from 0:00 */}
          <button
            onClick={() => onSeek(0)}
            aria-label="Restart from beginning"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Restart from beginning (0:00)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Multiplier */}
          <div className="flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700/60 text-xs">
            {[1, 1.5, 2].map((speed) => (
              <button
                key={speed}
                onClick={() => onChangeSpeed(speed)}
                className={`px-2 py-1 rounded-lg font-medium transition-all ${
                  playbackSpeed === speed
                    ? 'bg-purple-600 text-white font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Right: Audio, Captions, Planner & Sound Design Modals */}
        <div className="flex items-center gap-2">
          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              isMuted
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-purple-500/50'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          {/* Voice Speech Toggle */}
          <button
            onClick={onToggleVoices}
            aria-label={voicesEnabled ? 'Mute character speech voices' : 'Enable character speech voices'}
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              voicesEnabled
                ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
            title="Toggle Character Dialogue Voices"
          >
            {voicesEnabled ? <Mic className="w-4 h-4 text-purple-400" /> : <MicOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{voicesEnabled ? 'Voices On' : 'Voices Off'}</span>
          </button>

          {/* Subtitles / CC Toggle */}
          <button
            onClick={onToggleCaptions}
            aria-label="Toggle subtitles and closed captions"
            className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              showCaptions
                ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Subtitles className="w-4 h-4" />
            <span className="hidden sm:inline">CC</span>
          </button>

          {/* Sound Design Studio Button */}
          <button
            onClick={onOpenSoundDesign}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600/30 to-amber-500/20 hover:from-amber-600/40 hover:to-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
          >
            <AudioWaveform className="w-4 h-4 text-amber-400" />
            <span>Sound Design Elements</span>
          </button>

          {/* Storyboard Planner Button */}
          <button
            onClick={onOpenPlanner}
            className="px-3 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 border border-purple-700/50 text-purple-200 text-xs font-medium flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span className="hidden md:inline">Movie Planner</span>
          </button>
        </div>
      </div>
    </div>
  );
};
