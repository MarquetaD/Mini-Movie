/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Film,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Ghost,
  Laugh,
  CheckCircle2,
  Tv,
  Utensils,
  Maximize2,
  Moon,
  Info,
  Mic,
} from 'lucide-react';
import { MovieStage } from './components/MovieStage';
import { MovieControls } from './components/MovieControls';
import { StoryArcMeter } from './components/StoryArcMeter';
import { SoundDesignPanel } from './components/SoundDesignPanel';
import { StoryPlannerModal } from './components/StoryPlannerModal';
import { VoiceCastModal } from './components/VoiceCastModal';
import {
  calculateAnimationState,
  getSceneAtTime,
  getActiveDialogue,
  TOTAL_DURATION_SECONDS,
  SCENES,
  formatTime,
} from './story/timeline';
import { soundEngine } from './story/audioEngine';
import { voiceEngine } from './story/voiceEngine';

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voicesEnabled, setVoicesEnabled] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [soundDesignOpen, setSoundDesignOpen] = useState<boolean>(false);
  const [plannerOpen, setPlannerOpen] = useState<boolean>(false);
  const [voiceCastOpen, setVoiceCastOpen] = useState<boolean>(false);
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);

  const lastFrameTimeRef = useRef<number | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastSpokenBeatIdRef = useRef<string | null>(null);

  // Sync mute state with sound engine
  const handleToggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  }, [isMuted]);

  const handleToggleVoices = useCallback(() => {
    const nextVoices = !voicesEnabled;
    setVoicesEnabled(nextVoices);
    voiceEngine.setEnabled(nextVoices);
    if (!nextVoices) {
      voiceEngine.stop();
    }
  }, [voicesEnabled]);

  // Main Animation Loop
  useEffect(() => {
    const loop = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }
      const deltaSec = (timestamp - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = timestamp;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + deltaSec * playbackSpeed;
          if (next >= TOTAL_DURATION_SECONDS) {
            setIsPlaying(false);
            soundEngine.stopStormAmbience();
            voiceEngine.stop();
            return TOTAL_DURATION_SECONDS;
          }
          // Sync sound effects procedural generator with the timeline
          soundEngine.syncAudioWithTimeline(next);

          // Sync character voices
          if (voicesEnabled) {
            const activeBeat = getActiveDialogue(next);
            if (activeBeat) {
              const beatKey = `${activeBeat.speaker}-${activeBeat.startTime}`;
              if (lastSpokenBeatIdRef.current !== beatKey) {
                lastSpokenBeatIdRef.current = beatKey;
                voiceEngine.speakDialogue(activeBeat);
              }
            } else {
              lastSpokenBeatIdRef.current = null;
            }
          }

          return next;
        });
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      lastFrameTimeRef.current = null;
    };
  }, [isPlaying, playbackSpeed, voicesEnabled]);

  // Seek handler
  const handleSeek = (time: number) => {
    const target = Math.max(0, Math.min(TOTAL_DURATION_SECONDS, time));
    setCurrentTime(target);
    soundEngine.syncAudioWithTimeline(target);
    voiceEngine.stop();
    lastSpokenBeatIdRef.current = null;
  };

  const handleTogglePlay = () => {
    if (currentTime >= TOTAL_DURATION_SECONDS) {
      setCurrentTime(0);
    }
    if (isPlaying) {
      voiceEngine.stop();
    }
    setIsPlaying((prev) => !prev);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSeek(currentTime - 5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSeek(currentTime + 5);
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      } else if (e.key === 'c' || e.key === 'C') {
        setShowCaptions((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, isPlaying, handleToggleMute]);

  const animationState = calculateAnimationState(currentTime);
  const currentScene = getSceneAtTime(currentTime);

  return (
    <div className={`min-h-screen text-slate-100 transition-colors duration-500 ${
      isTheaterMode ? 'bg-black' : 'bg-slate-950'
    } flex flex-col`}>
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-600/30 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Ghost className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base md:text-xl font-bold tracking-tight text-white font-comic leading-none">
                  Are Ghosts Real?
                </h1>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/50">
                  3-Min Animation
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-none">
                By <strong className="text-slate-300">Jade Senelier</strong> • Character: <strong className="text-purple-300">Kyady</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className={`p-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1 ${
                isTheaterMode
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white'
              }`}
              title="Toggle Theater Mode (Dim lights)"
            >
              <Moon className="w-4 h-4" />
              <span className="hidden md:inline">Theater</span>
            </button>

            <button
              onClick={() => setVoiceCastOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700/60 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Mic className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Character Voices</span>
              <span className="sm:hidden">Voices</span>
            </button>

            <button
              onClick={() => setSoundDesignOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Sound Design</span>
              <span className="sm:hidden">Audio</span>
            </button>

            <button
              onClick={() => setPlannerOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/30 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storyboard</span>
              <span className="sm:hidden">Plan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Movie Presentation */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-5">
        {/* Visual Movie Stage */}
        <section aria-label="Animated Movie Screen" className="w-full">
          <MovieStage
            state={animationState}
            showCaptions={showCaptions}
            onJumpToScene={(sId) => {
              const sc = SCENES.find((s) => s.id === sId);
              if (sc) handleSeek(sc.startTime);
            }}
          />
        </section>

        {/* Story Arc & Emotional Tension/Humor Meter */}
        <StoryArcMeter
          currentScene={currentScene}
          animationState={animationState}
          onSelectScene={handleSeek}
        />

        {/* Playback Controls & Timeline Scrubber */}
        <MovieControls
          currentTime={currentTime}
          isPlaying={isPlaying}
          isMuted={isMuted}
          voicesEnabled={voicesEnabled}
          showCaptions={showCaptions}
          playbackSpeed={playbackSpeed}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          onToggleMute={handleToggleMute}
          onToggleVoices={handleToggleVoices}
          onToggleCaptions={() => setShowCaptions(!showCaptions)}
          onChangeSpeed={setPlaybackSpeed}
          onOpenSoundDesign={() => setSoundDesignOpen(true)}
          onOpenVoiceCast={() => setVoiceCastOpen(true)}
          onOpenPlanner={() => setPlannerOpen(true)}
        />

        {/* The 4-Scene Story Arc Overview Cards */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-purple-400" />
              <span>3-Minute Story Arc: From Scary Beginning to Funny Ending</span>
            </h2>
            <span className="text-xs text-slate-400">
              Click any card to jump directly to that scene
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SCENES.map((scene) => {
              const isActive = currentTime >= scene.startTime && currentTime < scene.endTime;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleSeek(scene.startTime)}
                  className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 relative overflow-hidden group ${
                    isActive
                      ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-900/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 transition-colors ${
                      isActive ? 'bg-gradient-to-r from-purple-500 to-amber-400' : 'bg-transparent'
                    }`}
                  />

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                        Scene {scene.id}
                      </span>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-950/80 text-slate-300">
                        {formatTime(scene.startTime)} – {formatTime(scene.endTime)}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                      {scene.subtitle}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {scene.goal}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px]">
                    <span className="text-amber-300/90 italic">
                      {scene.feeling}
                    </span>
                    <span className="text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                      {isActive ? '▶ Playing' : 'Play →'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Detailed Sound Design Proposal Feature Card */}
        <section className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-slate-900 to-amber-950/20 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-amber-400" />
                Sound Design Proposal for the 3-Minute Animation
              </h2>
              <p className="text-xs text-slate-400">
                Acoustic architecture engineered to build psychological dread before unlocking a joyous comedic resolution.
              </p>
            </div>
            <button
              onClick={() => setSoundDesignOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shrink-0 flex items-center gap-2"
            >
              <span>Open Interactive Foley Board</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Ghost className="w-4 h-4" />
                <span>1. Creepy Dread (0:00 - 2:15)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Low-pass rain against glass, howling wind, and creaking timber create claustrophobia. In Scene 3, a high-frequency TV static buzz snaps into dead silence and an ominous 60Hz heartbeat drone to maximize panic before the loud book crash!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Laugh className="w-4 h-4" />
                <span>2. Comedic Payoff (2:15 - 3:00)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The tension pops with a playful slide whistle and brother Leo's mischievous staccato snickers. The dissonance is replaced by bright, acoustic marimba chords (C major) and friendly dialogue to trigger spontaneous audience laughter.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Utensils className="w-4 h-4" />
                <span>3. Character Emotional Arc</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kyady's sounds journey from comical hunger (cartoon FM gurgle) → curiosity (soup simmering) → biological terror (chattering teeth & jump gasp) → warm culinary fulfillment (spoon clinks and watermelon crunching with family).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-purple-500/40 bg-purple-950/20 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>4. Realistic Studio AI Voices</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Powered by Gemini 3.8 Flash Lite TTS: Kyady (Puck), Mom (Kore), Brother Leo (Zephyr), and Narrator (Fenrir) speak with natural human breath, authentic emotion, and zero robotic monotone!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <SoundDesignPanel
        isOpen={soundDesignOpen}
        onClose={() => setSoundDesignOpen(false)}
      />

      <StoryPlannerModal
        isOpen={plannerOpen}
        currentTime={currentTime}
        onClose={() => setPlannerOpen(false)}
        onJumpToScene={(t) => {
          handleSeek(t);
          setPlannerOpen(false);
        }}
      />

      <VoiceCastModal
        isOpen={voiceCastOpen}
        onClose={() => setVoiceCastOpen(false)}
        voicesEnabled={voicesEnabled}
        onToggleVoices={handleToggleVoices}
      />
    </div>
  );
}
