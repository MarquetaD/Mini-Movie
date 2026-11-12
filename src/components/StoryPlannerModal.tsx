import React from 'react';
import { X, CheckCircle2, Circle, Sparkles, BookOpen, User, Home, HelpCircle, Film } from 'lucide-react';
import { getHorrorChecklistStatus } from '../story/timeline';

interface StoryPlannerModalProps {
  isOpen: boolean;
  currentTime: number;
  onClose: () => void;
  onJumpToScene: (time: number) => void;
}

export const StoryPlannerModal: React.FC<StoryPlannerModalProps> = ({
  isOpen,
  currentTime,
  onClose,
  onJumpToScene,
}) => {
  if (!isOpen) return null;

  const horrorChecklist = getHorrorChecklistStatus(currentTime);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                My Animated Movie Planner 🎬👻
              </h2>
              <p className="text-xs text-slate-400">
                Original Production Guide by <strong className="text-purple-300">Jade Senelier</strong> • Title: <em className="text-amber-300">Are Ghosts Real?</em>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Part 1: Character & World Building */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              Part 1: Character & World Building
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs uppercase font-bold text-purple-400">Main Character</span>
                <p className="text-base font-bold text-white mt-1">Kyady</p>
                <p className="text-xs text-slate-300 mt-1">
                  <strong>Appearance:</strong> Leavitt Liderazgo shirt, purple pants
                </p>
                <p className="text-xs text-red-300 mt-1">
                  <strong>Fear:</strong> Ghosts!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs uppercase font-bold text-amber-400">The Creepy Setting</span>
                <p className="text-base font-bold text-white mt-1">Old Rusty House</p>
                <p className="text-xs text-slate-300 mt-1">
                  Flickering lights, dusty television, broken mirrors, creaking floorboards, howling wind.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs uppercase font-bold text-rose-400">The Spooky Mystery</span>
                <p className="text-base font-bold text-white mt-1">Haunted Bookshelf</p>
                <p className="text-xs text-slate-300 mt-1">
                  A heavy book flies off the shelf out of nowhere with an eerie groaning noise...
                </p>
              </div>
            </div>
          </div>

          {/* Part 2: 4-Scene Storyboard Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Film className="w-4 h-4 text-purple-400" />
              Part 2: The 3-Minute Story Arc & Storyboard
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  id: 1,
                  title: 'Scene 1: The Setup',
                  time: '0:00 – 0:45',
                  startTime: 0,
                  visuals: 'Outside of the old rusty house that zooms inside. Kyady drawing watermelon, stomach rumbles with hunger.',
                  audio: 'Stomach rumbling, storm and rain, drawing noises, and humming.',
                  feeling: 'Calm, hungry, and entertained',
                  color: 'border-indigo-800/50 bg-indigo-950/20',
                },
                {
                  id: 2,
                  title: 'Scene 2: The Rising Action',
                  time: '0:45 – 1:30',
                  startTime: 45,
                  visuals: "Kyady's mom is cooking soup for dinner. Kyady talks to her mom about how haunted the house is.",
                  audio: 'Stepping, creaks, talking, soup boiling, and TV in the background.',
                  feeling: 'Relaxing, and happy',
                  color: 'border-amber-800/50 bg-amber-950/20',
                },
                {
                  id: 3,
                  title: 'Scene 3: The Climax',
                  time: '1:30 – 2:15',
                  startTime: 90,
                  visuals: 'Kyady watching TV until a book from the bookshelf falls with a low groan. Kyady jumps and gets chills.',
                  audio: 'Eerie music, thud, TV turn off, low groaning noise, heartbeat and heavy breathing.',
                  feeling: 'Eerieness, scared, and uneasy',
                  color: 'border-purple-800/50 bg-purple-950/20',
                },
                {
                  id: 4,
                  title: 'Scene 4: The Twist & Resolution',
                  time: '2:15 – 3:00',
                  startTime: 135,
                  visuals: 'The brother comes out from behind the bookshelf giggling! Kyady is shocked then giggles with him. Both eat dinner together.',
                  audio: 'Giggling, gasp, walking, squeaking, and warm dinner music.',
                  feeling: 'Happiness, silliness, and cozy happy ending',
                  color: 'border-emerald-800/50 bg-emerald-950/20',
                },
              ].map((sc) => (
                <div
                  key={sc.id}
                  className={`p-4 rounded-2xl border ${sc.color} flex flex-col justify-between gap-3`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{sc.title}</h4>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                        {sc.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      <strong>Visuals:</strong> {sc.visuals}
                    </p>
                    <p className="text-xs text-slate-300">
                      <strong>Audio:</strong> {sc.audio}
                    </p>
                    <p className="text-xs text-amber-300">
                      <strong>Feeling:</strong> {sc.feeling}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onJumpToScene(sc.startTime);
                      onClose();
                    }}
                    className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    Jump to this Scene ({sc.time})
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Part 3: Horror Element Checklist */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Live Horror Element Checklist
              </span>
              <span className="text-xs text-slate-400 font-normal">
                Checkmarks update automatically as the animation plays!
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {horrorChecklist.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    item.completed
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                  }`}
                >
                  <div className="mt-0.5">
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 shrink-0" />
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-white text-xs flex items-center gap-2">
                      <span>{item.title}</span>
                      {item.completed && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">
                          Active in Film
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
          >
            Close Planner
          </button>
        </div>
      </div>
    </div>
  );
};
