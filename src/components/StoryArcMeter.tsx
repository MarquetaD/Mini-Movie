import React from 'react';
import { Ghost, Laugh, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AnimationKeyframeState, SceneInfo } from '../story/types';
import { SCENES } from '../story/timeline';

interface StoryArcMeterProps {
  currentScene: SceneInfo;
  animationState: AnimationKeyframeState;
  onSelectScene: (startTime: number) => void;
}

export const StoryArcMeter: React.FC<StoryArcMeterProps> = ({
  currentScene,
  animationState,
  onSelectScene,
}) => {
  const { tensionLevel, humorLevel, kyady } = animationState;

  const emotionBadge = {
    calm: { label: 'Calm & Creative', icon: '🎨', color: 'bg-indigo-900/40 text-indigo-300 border-indigo-700/50' },
    hungry: { label: 'Stomach Rumbling!', icon: '🍉', color: 'bg-amber-900/40 text-amber-300 border-amber-700/50' },
    wondering: { label: 'Wondering & Curious', icon: '🤔', color: 'bg-purple-900/40 text-purple-300 border-purple-700/50' },
    frightened: { label: 'Spooky Chills!', icon: '👻', color: 'bg-red-950/60 text-red-300 border-red-700/60 animate-pulse' },
    shocked: { label: 'Jump Scare Terror!', icon: '⚡', color: 'bg-rose-900/70 text-rose-200 border-rose-500 animate-bounce' },
    giggling: { label: 'Hysterical Laughter!', icon: '😂', color: 'bg-emerald-900/50 text-emerald-300 border-emerald-500/60' },
  }[kyady.emotion] || { label: 'Engaged', icon: '✨', color: 'bg-slate-800 text-slate-300 border-slate-700' };

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Current Scene & Mood */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="w-10 h-10 rounded-2xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-xl shrink-0">
          {emotionBadge.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-sm">{currentScene.title}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${emotionBadge.color}`}>
              {emotionBadge.label}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-comic">
            {currentScene.subtitle}
          </p>
        </div>
      </div>

      {/* Dual Gauges: Tension (Spooky) vs Humor (Funny) */}
      <div className="flex items-center gap-6 w-full md:w-auto justify-end">
        {/* Tension Gauge */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
              <Ghost className="w-3 h-3 text-rose-400" />
              Scare Factor
            </span>
            <span className="text-xs font-mono font-bold text-slate-200">{Math.round(tensionLevel)}%</span>
          </div>
          <div className="w-24 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/60 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-rose-500 to-red-500 transition-all duration-300 shadow-sm"
              style={{ width: `${Math.min(100, tensionLevel)}%` }}
            />
          </div>
        </div>

        {/* Humor Gauge */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
              <Laugh className="w-3 h-3 text-amber-400" />
              Comedy Level
            </span>
            <span className="text-xs font-mono font-bold text-slate-200">{Math.round(humorLevel)}%</span>
          </div>
          <div className="w-24 h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700/60 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-300 shadow-sm"
              style={{ width: `${Math.min(100, humorLevel)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
