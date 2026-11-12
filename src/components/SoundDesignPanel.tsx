import React from 'react';
import {
  Volume2,
  X,
  Play,
  Sparkles,
  Music,
  CloudRain,
  Flame,
  Zap,
  Smile,
  HeartCrack,
  Radio,
  FileText,
} from 'lucide-react';
import { soundEngine } from '../story/audioEngine';

interface SoundDesignPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SoundCueProposal {
  id: string;
  name: string;
  category: 'Atmospheric Ambience' | 'Foley & Physical FX' | 'Dramatic Musical Cue' | 'Comedic Foley';
  scene: string;
  timestamp: string;
  instrumentsOrMethod: string;
  storytellingImpact: string;
  audioAction: () => void;
  icon: React.ReactNode;
}

export const SoundDesignPanel: React.FC<SoundDesignPanelProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const soundProposals: SoundCueProposal[] = [
    {
      id: 'storm-ambience',
      name: 'Old House Storm & Window Rain',
      category: 'Atmospheric Ambience',
      scene: 'Scene 1: The Setup',
      timestamp: '0:00 – 0:45',
      instrumentsOrMethod: 'Low-pass filtered brown noise with sporadic distant thunder swells (40Hz sub-oscillator)',
      storytellingImpact: 'Establishes isolation and natural dread immediately. The howling exterior makes the rustic house feel vulnerable.',
      audioAction: () => {
        soundEngine.startStormAmbience(0.3);
        soundEngine.playThunder();
      },
      icon: <CloudRain className="w-5 h-5 text-sky-400" />,
    },
    {
      id: 'pencil-drawing',
      name: 'Rhythmic Colored Pencil Sketching',
      category: 'Foley & Physical FX',
      scene: 'Scene 1: The Setup',
      timestamp: '0:12 – 0:26',
      instrumentsOrMethod: 'Granular pink noise bursts bandpassed at 3.2kHz with high Q',
      storytellingImpact: 'Grounds Kyady in childlike innocence and joyful focus, contrasting with the stormy gloom outside.',
      audioAction: () => soundEngine.playPencilScratch(),
      icon: <FileText className="w-5 h-5 text-purple-400" />,
    },
    {
      id: 'stomach-rumble',
      name: 'The Comic Monster Belly Grumble',
      category: 'Comedic Foley',
      scene: 'Scene 1: The Setup',
      timestamp: '0:28 – 0:35',
      instrumentsOrMethod: 'Modulated FM triangle wave with an 8Hz LFO pitch-gurgle and slow downward slide',
      storytellingImpact: 'First comedic beat! Shatters the solemn spooky atmosphere with relatable childhood hunger, prompting her journey.',
      audioAction: () => soundEngine.playStomachRumble(),
      icon: <Smile className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'soup-simmer',
      name: 'Bubbling Vegetable Broth & Wood Ladle',
      category: 'Foley & Physical FX',
      scene: 'Scene 2: The Rising Action',
      timestamp: '0:45 – 1:15',
      instrumentsOrMethod: 'Randomized 300–500Hz sine bubble pops with upward chirp and wooden resonant clicks',
      storytellingImpact: 'Offers temporary comfort and warmth while Kyady voices her ghost fears, heightening the impending suspense.',
      audioAction: () => soundEngine.playSoupBubble(),
      icon: <Flame className="w-5 h-5 text-orange-400" />,
    },
    {
      id: 'tv-broadcast',
      name: 'Dusty CRT TV Cartoon Jingle',
      category: 'Dramatic Musical Cue',
      scene: 'Scene 2 & 3',
      timestamp: '1:18 – 1:44',
      instrumentsOrMethod: 'Vintage 8-bit square wave arpeggios (C5-E5-G5) with subtle lo-fi tape flutter',
      storytellingImpact: 'A false sense of security. Kyady laughs along with the cartoon before the supernatural illusion strikes.',
      audioAction: () => soundEngine.playTvTune(),
      icon: <Radio className="w-5 h-5 text-cyan-400" />,
    },
    {
      id: 'tv-zap-blackout',
      name: 'Sudden TV Static Zap & Dead Silence',
      category: 'Atmospheric Ambience',
      scene: 'Scene 3: The Climax',
      timestamp: '1:44 – 1:55',
      instrumentsOrMethod: 'Harsh high-pass noise burst followed by cathode ray downward frequency sweep to dead silence',
      storytellingImpact: 'The turning point into horror. The sudden death of the friendly TV sound creates instant acoustic vulnerability.',
      audioAction: () => soundEngine.playTvZapStatic(),
      icon: <Zap className="w-5 h-5 text-rose-500" />,
    },
    {
      id: 'heartbeat-drone',
      name: 'Tension Heartbeat & Wooden Groan',
      category: 'Atmospheric Ambience',
      scene: 'Scene 3: The Climax',
      timestamp: '1:55 – 2:10',
      instrumentsOrMethod: 'Low 60Hz double sub-bass thump (Lub-Dub) paired with slow wooden friction creaks',
      storytellingImpact: 'Directly mirrors Kyady’s biological panic. Chills, wide saucer eyes, and goosebumps synced to the pulse.',
      audioAction: () => soundEngine.playHeartbeat(),
      icon: <HeartCrack className="w-5 h-5 text-red-400" />,
    },
    {
      id: 'bookshelf-crash',
      name: 'The Haunted Bookshelf Book Thud',
      category: 'Foley & Physical FX',
      scene: 'Scene 3: The Climax',
      timestamp: '2:10 – 2:15',
      instrumentsOrMethod: 'Sub-bass impact (35Hz) layered with harsh wooden board slap and reverb burst',
      storytellingImpact: 'The peak jump scare! Forces Kyady to leap 3 feet into the air convinced a ghost is in the room.',
      audioAction: () => soundEngine.playBookThud(),
      icon: <Sparkles className="w-5 h-5 text-purple-300" />,
    },
    {
      id: 'brother-giggle',
      name: 'Prankster Snicker & Bouncy Giggles',
      category: 'Comedic Foley',
      scene: 'Scene 4: The Twist',
      timestamp: '2:15 – 2:38',
      instrumentsOrMethod: 'Staccato cheerful triangle wave arpeggio with comical slide whistle glissando',
      storytellingImpact: 'The emotional release! Instantly punctures the terrifying tension and turns horror into belly laughs.',
      audioAction: () => soundEngine.playKidGiggle(),
      icon: <Smile className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'cozy-fanfare',
      name: 'Warm Family Dinner Marimba Theme',
      category: 'Dramatic Musical Cue',
      scene: 'Scene 4: Resolution',
      timestamp: '2:40 – 3:00',
      instrumentsOrMethod: 'Lush major chords (C - G - Am - F - C) played on acoustic celesta/marimba over warm string pads',
      storytellingImpact: 'Provides total resolution, warmth, and nostalgic childhood comfort as the family feasts on soup and watermelon.',
      audioAction: () => soundEngine.playCozyEndingFanfare(),
      icon: <Music className="w-5 h-5 text-amber-300" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-950/40 via-slate-900 to-amber-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Sound Design Proposal & Interactive Foley Board
              </h2>
              <p className="text-xs text-slate-400">
                Crafting the acoustic arc: from storm dread and jump scares to comedic payoff and family warmth.
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

        {/* Modal Body: Sound Philosophy + Interactive Cues */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Audio Philosophy Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-900/40 space-y-2">
              <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                <HeartCrack className="w-4 h-4 text-indigo-400" />
                Building the Scary Beginning (0:00 – 2:15)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We craft psychological unease through acoustic isolation: deep sub-bass frequencies (35–60Hz thunder & heartbeat), high-frequency storm friction, and sudden cuts to dead silence. When the TV snaps off, eliminating the comfortable chatter creates an immediate visceral vacuum where every subtle floorboard creak sounds menacing.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <Smile className="w-4 h-4 text-emerald-400" />
                Engineering the Comedic Ending (2:15 – 3:00)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comedy relies on tension release! The jarring dissonance of the falling book is immediately punctured by the brother’s bubbly, staccato giggles. Transitioning into warm, resonant major chords (marimba, celesta) and the cozy sizzle of hot soup triggers instantaneous relief and shared laughter.
              </p>
            </div>
          </div>

          {/* List of Proposed Elements with Audition Buttons */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 tracking-wider uppercase flex items-center gap-2">
                <span>Sound Cues Timeline & Interactive Auditions</span>
                <span className="text-[11px] font-normal text-amber-400 normal-case bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-800/40">
                  Click 'Audition FX' to hear synthesized Web Audio
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {soundProposals.map((cue) => (
                <div
                  key={cue.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                      {cue.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-white">{cue.name}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md font-mono bg-slate-800 text-slate-300">
                          {cue.timestamp}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md font-medium bg-purple-950/60 text-purple-300 border border-purple-800/40">
                          {cue.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-slate-400">Design: </strong>
                        {cue.instrumentsOrMethod}
                      </p>
                      <p className="text-xs text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-300/80">Story Role: </strong>
                        {cue.storytellingImpact}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={cue.audioAction}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Audition FX</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Procedural Web Audio Engine active • Synchronized with 180s animation timeline
          </span>
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
