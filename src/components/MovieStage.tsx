import React, { useMemo } from 'react';
import { AnimationKeyframeState } from '../story/types';

interface MovieStageProps {
  state: AnimationKeyframeState;
  showCaptions: boolean;
  onJumpToScene?: (sceneId: number) => void;
}

export const MovieStage: React.FC<MovieStageProps> = ({
  state,
  showCaptions,
}) => {
  const { sceneId, kyady, mom, brother, props, camera, lighting, activeDialogue } = state;

  // Camera transform styling
  const cameraTransform = useMemo(() => {
    const scale = camera.zoom;
    const x = camera.panX + (camera.shake !== 0 ? (Math.random() - 0.5) * camera.shake * 3 : 0);
    const y = camera.panY + (camera.shake !== 0 ? (Math.random() - 0.5) * camera.shake * 3 : 0);
    return `scale(${scale}) translate(${-x}px, ${-y}px)`;
  }, [camera]);

  return (
    <div className="relative w-full aspect-[16/9] max-h-[72vh] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl shadow-purple-950/40 select-none">
      {/* Dynamic Lighting & Ambient Filter Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700 z-20 mix-blend-multiply"
        style={{
          backgroundColor: lighting.ambientColor,
          opacity: 1 - lighting.ambientIntensity * 0.4,
        }}
      />

      {/* Lightning Flash Overlay */}
      {lighting.stormFlicker && (
        <div className="absolute inset-0 bg-indigo-100/30 pointer-events-none z-30 transition-opacity duration-75 animate-flicker" />
      )}

      {/* Candle / Cozy Hearth Glow Overlay */}
      {lighting.candleGlow && (
        <div className="absolute inset-0 bg-amber-500/10 pointer-events-none z-20 mix-blend-screen" />
      )}

      {/* Main SVG Animated World */}
      <div
        className="w-full h-full transition-transform duration-300 ease-out origin-center"
        style={{ transform: cameraTransform }}
      >
        <svg
          viewBox="0 0 1000 562.5"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="stormSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#050814" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            <linearGradient id="warmWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>

            <linearGradient id="creepyWall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="woodFloor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="50%" stopColor="#3f3f46" />
              <stop offset="100%" stopColor="#292524" />
            </linearGradient>

            <linearGradient id="leavittShirt" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#042f2e" />
            </linearGradient>

            <linearGradient id="watermelonFlesh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>

            <radialGradient id="tvGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="lampLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
            </radialGradient>

            <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
              <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"/>
              <feOffset dx="0" dy="4" />
              <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
            </filter>
          </defs>

          {/* ========================================================
              BACKGROUND LAYERS PER SCENE
          ======================================================== */}
          {sceneId === 1 && (
            <g id="scene-1-bg">
              {/* Stormy night sky */}
              <rect width="1000" height="562.5" fill="url(#stormSky)" />

              {/* Distant mountains and stormy clouds */}
              <path d="M0 320 Q 250 240, 500 300 T 1000 280 L 1000 562 L 0 562 Z" fill="#090d16" />

              {/* Rain Streaks */}
              <g stroke="#94a3b8" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round">
                {Array.from({ length: 40 }).map((_, i) => (
                  <line
                    key={i}
                    x1={(i * 27 + (Date.now() % 50)) % 1000}
                    y1={(i * 19 + (Date.now() % 80)) % 400}
                    x2={((i * 27 + (Date.now() % 50)) % 1000) - 20}
                    y2={((i * 19 + (Date.now() % 80)) % 400) + 55}
                  />
                ))}
              </g>

              {/* Old Rusty House Exterior (0 - 12s) */}
              {state.totalProgress < 12 / 180 && (
                <g id="exterior-house">
                  {/* House base */}
                  <polygon points="350,180 650,180 720,440 280,440" fill="#292524" stroke="#1c1917" strokeWidth="4" />
                  {/* Rusty roof */}
                  <polygon points="500,80 250,190 750,190" fill="#7f1d1d" stroke="#450a0a" strokeWidth="5" />
                  {/* Weather vane / chimney */}
                  <rect x="620" y="100" width="35" height="70" fill="#44403c" />
                  {/* Creepy crooked trees */}
                  <path d="M180 440 Q 150 320, 100 240 Q 140 230, 190 280 Q 220 220, 240 180 Q 220 280, 210 440 Z" fill="#09090b" />
                  <path d="M820 440 Q 850 310, 900 220 Q 860 210, 810 270 Q 780 200, 760 160 Q 780 280, 790 440 Z" fill="#09090b" />

                  {/* Glowing attic window (zoom target) */}
                  <rect x="460" y="220" width="80" height="90" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />
                  <line x1="500" y1="220" x2="500" y2="310" stroke="#ca8a04" strokeWidth="3" />
                  <line x1="460" y1="265" x2="540" y2="265" stroke="#ca8a04" strokeWidth="3" />
                  {/* Silhouette of Kyady drawing at desk inside window */}
                  <circle cx="500" cy="255" r="14" fill="#1e1b4b" />
                  <rect x="485" y="270" width="30" height="25" rx="4" fill="#0d9488" />
                </g>
              )}

              {/* Inside Kyady's Bedroom (12s - 45s) */}
              {state.totalProgress >= 12 / 180 && (
                <g id="interior-bedroom">
                  {/* Bedroom walls */}
                  <rect width="1000" height="380" fill="#1e1b4b" />
                  {/* Wooden floorboards */}
                  <rect y="380" width="1000" height="182.5" fill="url(#woodFloor)" />
                  {/* Floorboard plank lines */}
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <line key={idx} x1="0" y1={380 + idx * 23} x2="1000" y2={380 + idx * 23} stroke="#18181b" strokeWidth="2" />
                  ))}

                  {/* Stormy Attic Window with Rain */}
                  <rect x="80" y="80" width="160" height="220" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="8" />
                  <line x1="160" y1="80" x2="160" y2="300" stroke="#475569" strokeWidth="6" />
                  <line x1="80" y1="190" x2="240" y2="190" stroke="#475569" strokeWidth="6" />
                  {/* Rain trickles on window */}
                  <line x1="120" y1="110" x2="115" y2="160" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />
                  <line x1="200" y1="140" x2="195" y2="210" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6,4" />

                  {/* Kyady's Wooden Desk */}
                  <rect x="360" y="320" width="280" height="14" rx="4" fill="#78350f" stroke="#451a03" strokeWidth="3" />
                  <rect x="380" y="334" width="16" height="110" fill="#78350f" stroke="#451a03" strokeWidth="2" />
                  <rect x="600" y="334" width="16" height="110" fill="#78350f" stroke="#451a03" strokeWidth="2" />

                  {/* Desk Lamp Glowing */}
                  <path d="M380 320 L 400 250 L 430 250" stroke="#94a3b8" strokeWidth="4" fill="none" />
                  <polygon points="425,240 455,240 465,270 415,270" fill="#eab308" />
                  <circle cx="440" cy="270" r="100" fill="url(#lampLight)" pointerEvents="none" />

                  {/* Paper with Watermelon Drawing */}
                  <rect x="460" y="300" width="90" height="60" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" transform="rotate(-5 500 330)" />
                  {/* Watermelon slice on paper */}
                  <g transform="translate(485, 325) rotate(-5)">
                    {/* Green rind */}
                    <path d="M -25,0 A 25 25 0 0 0 25,0 Z" fill="#15803d" />
                    {/* White inner rind */}
                    <path d="M -22,0 A 22 22 0 0 0 22,0 Z" fill="#86efac" />
                    {/* Pink/Red juicy flesh */}
                    <path d="M -19,0 A 19 19 0 0 0 19,0 Z" fill="url(#watermelonFlesh)" />
                    {/* Seeds */}
                    <circle cx="-10" cy="6" r="1.5" fill="#0f172a" />
                    <circle cx="0" cy="11" r="1.5" fill="#0f172a" />
                    <circle cx="10" cy="6" r="1.5" fill="#0f172a" />
                  </g>

                  {/* Colored Pencils & Mug */}
                  <rect x="560" y="295" width="24" height="32" rx="4" fill="#a855f7" stroke="#6b21a8" strokeWidth="2" />
                  <line x1="565" y1="285" x2="568" y2="300" stroke="#ef4444" strokeWidth="3" />
                  <line x1="572" y1="280" x2="574" y2="300" stroke="#22c55e" strokeWidth="3" />
                  <line x1="578" y1="284" x2="578" y2="300" stroke="#3b82f6" strokeWidth="3" />

                  {/* Bedroom Chair */}
                  <rect x="420" y="340" width="70" height="12" rx="3" fill="#92400e" stroke="#713f12" strokeWidth="2" />
                  <rect x="430" y="352" width="10" height="90" fill="#92400e" />
                  <rect x="470" y="352" width="10" height="90" fill="#92400e" />
                  <rect x="430" y="270" width="12" height="75" fill="#92400e" />

                  {/* Poster on wall: "Are Ghosts Real?" or cute ghost drawing with question mark */}
                  <rect x="740" y="100" width="140" height="170" rx="6" fill="#312e81" stroke="#4338ca" strokeWidth="4" />
                  <text x="810" y="135" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">SPOOKY TALES</text>
                  <path d="M 810 150 Q 790 150 790 180 Q 790 210 800 205 Q 810 215 820 205 Q 830 215 830 180 Q 830 150 810 150 Z" fill="#ffffff" />
                  <circle cx="803" cy="170" r="3" fill="#0f172a" />
                  <circle cx="817" cy="170" r="3" fill="#0f172a" />
                  <text x="810" y="240" textAnchor="middle" fill="#c084fc" fontSize="18" fontWeight="800">???</text>
                </g>
              )}
            </g>
          )}

          {/* ========================================================
              SCENE 2: KITCHEN NOOK & GHOST TALK (45 - 90s)
          ======================================================== */}
          {sceneId === 2 && (
            <g id="scene-2-bg">
              {/* Cozy Kitchen Wall with warm brick wallpaper */}
              <rect width="1000" height="380" fill="url(#warmWall)" />
              {/* Kitchen tiled / rustic floor */}
              <rect y="380" width="1000" height="182.5" fill="#292524" />
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={i} x1={i * 85} y1="380" x2={i * 85} y2="562.5" stroke="#1c1917" strokeWidth="2" />
              ))}

              {/* Kitchen Counter & Stove */}
              <rect x="520" y="280" width="380" height="170" rx="8" fill="#475569" stroke="#334155" strokeWidth="5" />
              {/* Stove knobs */}
              <circle cx="560" cy="315" r="8" fill="#94a3b8" />
              <circle cx="600" cy="315" r="8" fill="#94a3b8" />
              <circle cx="640" cy="315" r="8" fill="#94a3b8" />
              <circle cx="680" cy="315" r="8" fill="#94a3b8" />

              {/* Boiling Soup Pot */}
              <path d="M 720 260 L 840 260 L 830 310 L 730 310 Z" fill="#b45309" stroke="#78350f" strokeWidth="4" />
              <rect x="710" y="270" width="12" height="6" rx="2" fill="#78350f" />
              <rect x="838" y="270" width="12" height="6" rx="2" fill="#78350f" />
              {/* Hot vegetable soup surface */}
              <ellipse cx="780" cy="260" rx="55" ry="12" fill="#ea580c" />
              <circle cx="760" cy="260" r="4" fill="#22c55e" />
              <circle cx="795" cy="258" r="5" fill="#facc15" />
              <circle cx="780" cy="262" r="3" fill="#ef4444" />

              {/* Rising Steam Particles */}
              <g stroke="#ffffff" strokeWidth="3" strokeOpacity="0.45" strokeLinecap="round" fill="none">
                <path d="M 760 245 Q 750 220 765 195 Q 780 170 765 150" />
                <path d="M 780 240 Q 795 210 780 185 Q 770 160 785 135" />
                <path d="M 800 245 Q 815 220 800 195 Q 790 170 805 145" />
              </g>

              {/* Kitchen Shelves with Spice Jars & Hanging Ladles */}
              <rect x="620" y="120" width="280" height="12" rx="3" fill="#78350f" />
              <rect x="640" y="90" width="24" height="30" rx="3" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
              <rect x="680" y="85" width="26" height="35" rx="3" fill="#fb923c" stroke="#c2410c" strokeWidth="2" />
              <rect x="720" y="92" width="22" height="28" rx="3" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
              <rect x="760" y="85" width="28" height="35" rx="3" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />

              {/* Doorway to dark hallway & creepy living room (Foreshadowing) */}
              <rect x="60" y="90" width="220" height="320" rx="6" fill="#020617" stroke="#1e293b" strokeWidth="6" />
              {/* Dim TV glow visible in doorway */}
              <rect x="100" y="240" width="90" height="65" rx="4" fill="#0891b2" opacity="0.6" />
              <ellipse cx="145" cy="272" rx="70" ry="50" fill="url(#tvGlow)" />

              {/* Creepy moving shadow / Brother hiding hint behind shelf in adjacent room */}
              {brother.hiding && (
                <g opacity="0.45">
                  <ellipse cx="230" cy="300" rx="20" ry="40" fill="#000000" />
                  {/* Two tiny mischievous glowing white eye-dots */}
                  <circle cx="225" cy="285" r="2.5" fill="#fef08a" />
                  <circle cx="235" cy="285" r="2.5" fill="#fef08a" />
                </g>
              )}
            </g>
          )}

          {/* ========================================================
              SCENE 3: THE CREEPY LIVING ROOM CLIMAX (90 - 135s)
          ======================================================== */}
          {sceneId === 3 && (
            <g id="scene-3-bg">
              {/* Eerie Wallpaper / Dim Living Room */}
              <rect width="1000" height="380" fill="url(#creepyWall)" />
              <rect y="380" width="1000" height="182.5" fill="#18181b" />

              {/* Creepy Tall Window with Thunder & Storm Rain */}
              <rect x="80" y="60" width="180" height="260" rx="8" fill="#050814" stroke="#334155" strokeWidth="6" />
              <line x1="170" y1="60" x2="170" y2="320" stroke="#334155" strokeWidth="5" />
              <line x1="80" y1="190" x2="260" y2="190" stroke="#334155" strokeWidth="5" />
              {/* Thunder flashes through window */}
              {lighting.stormFlicker && (
                <path d="M 170 65 L 150 140 L 180 160 L 140 250 L 160 210 L 130 310" stroke="#e0e7ff" strokeWidth="4" fill="none" />
              )}

              {/* Dusty Old Television on Stand */}
              <rect x="360" y="320" width="180" height="20" rx="4" fill="#3f3f46" stroke="#27272a" strokeWidth="3" />
              <rect x="390" y="340" width="12" height="70" fill="#27272a" />
              <rect x="498" y="340" width="12" height="70" fill="#27272a" />

              {/* CRT Television Box */}
              <rect x="375" y="190" width="150" height="130" rx="14" fill="#52525b" stroke="#27272a" strokeWidth="4" />
              {/* TV Screen */}
              <rect x="390" y="205" width="100" height="90" rx="10" fill={props.tvOn ? '#06b6d4' : props.tvStatic ? '#64748b' : '#09090b'} stroke="#18181b" strokeWidth="3" />
              {/* Antenna */}
              <line x1="435" y1="190" x2="395" y2="130" stroke="#71717a" strokeWidth="3" />
              <line x1="465" y1="190" x2="505" y2="130" stroke="#71717a" strokeWidth="3" />

              {/* TV Screen Content: Cartoon Dog vs Static Noise */}
              {props.tvOn && (
                <g id="tv-cartoon">
                  <ellipse cx="440" cy="250" rx="20" ry="15" fill="#facc15" />
                  <circle cx="430" cy="242" r="12" fill="#ca8a04" />
                  <circle cx="426" cy="240" r="3" fill="#ffffff" />
                  <circle cx="434" cy="240" r="3" fill="#ffffff" />
                  <path d="M 455 250 Q 470 240 465 260" stroke="#ca8a04" strokeWidth="4" fill="none" />
                  <ellipse cx="440" cy="250" rx="75" ry="60" fill="url(#tvGlow)" pointerEvents="none" />
                </g>
              )}

              {/* TV Static Noise Raster when glitching */}
              {props.tvStatic && (
                <g id="tv-static">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line
                      key={i}
                      x1="395"
                      y1={212 + i * 10}
                      x2="485"
                      y2={212 + i * 10}
                      stroke="#f1f5f9"
                      strokeWidth="3"
                      strokeDasharray="4,6,8,2"
                      strokeOpacity="0.8"
                    />
                  ))}
                </g>
              )}

              {/* TV Dials */}
              <circle cx="508" cy="225" r="7" fill="#27272a" />
              <circle cx="508" cy="248" r="7" fill="#27272a" />
              <rect x="500" y="268" width="16" height="18" rx="2" fill="#18181b" />

              {/* Cozy Patterned Living Room Rug */}
              <ellipse cx="480" cy="460" rx="240" ry="40" fill="#701a75" stroke="#4a044e" strokeWidth="4" />
              <ellipse cx="480" cy="460" rx="210" ry="32" fill="#86198f" stroke="#a21caf" strokeWidth="2" strokeDasharray="8,6" />

              {/* ====================================================
                  THE SPOOKY BOOKSHELF & THE MYSTERY EVENT
              ==================================================== */}
              <g id="spooky-bookshelf" transform="translate(720, 60)">
                {/* Main Heavy Dark Wood Bookshelf Frame */}
                <rect x="0" y="0" width="220" height="420" rx="6" fill="#1c1917" stroke="#0c0a09" strokeWidth="6" />

                {/* Shelves */}
                <rect x="10" y="80" width="200" height="12" fill="#292524" />
                <rect x="10" y="170" width="200" height="12" fill="#292524" />
                <rect x="10" y="260" width="200" height="12" fill="#292524" />
                <rect x="10" y="350" width="200" height="12" fill="#292524" />

                {/* Cobweb in corner of shelf */}
                <path d="M 12 12 Q 60 20 80 12 M 12 12 Q 20 60 12 80 M 35 15 Q 40 40 15 35" stroke="#94a3b8" strokeWidth="1" strokeOpacity="0.4" fill="none" />

                {/* Row of Ancient Books on Middle Shelves */}
                <rect x="30" y="95" width="22" height="75" rx="3" fill="#991b1b" />
                <rect x="55" y="105" width="18" height="65" rx="3" fill="#065f46" />
                <rect x="75" y="90" width="26" height="80" rx="3" fill="#1e3a8a" />
                <rect x="105" y="100" width="20" height="70" rx="3" fill="#713f12" />

                <rect x="40" y="185" width="24" height="75" rx="3" fill="#831843" />
                <rect x="66" y="195" width="20" height="65" rx="3" fill="#312e81" />
                <rect x="88" y="182" width="28" height="78" rx="3" fill="#14532d" />
                <rect x="120" y="190" width="22" height="70" rx="3" fill="#581c87" />

                {/* Bottom Shelf with skull decoration / antique jar */}
                <circle cx="160" cy="325" r="16" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="154" cy="322" r="3" fill="#0f172a" />
                <circle cx="166" cy="322" r="3" fill="#0f172a" />

                {/* Top Shelf: THE MYSTERIOUS FALLING BOOK */}
                {!props.bookOnFloor && (
                  <g
                    id="falling-book"
                    transform={`translate(${140 + (props.bookFalling ? props.bookFallProgress * 20 : 0)}, ${15 + (props.bookFalling ? props.bookFallProgress * 320 : 0)}) rotate(${props.bookFalling ? props.bookFallProgress * 65 : 0})`}
                  >
                    {/* The Spooky Ancient Spellbook */}
                    <rect x="0" y="0" width="30" height="65" rx="4" fill="#581c87" stroke="#3b0764" strokeWidth="3" />
                    <line x1="8" y1="0" x2="8" y2="65" stroke="#eab308" strokeWidth="2" />
                    {/* Gold Star / Mysterious Rune on cover */}
                    <circle cx="18" cy="32" r="5" fill="#facc15" />
                    {/* Subtle transparent fishing line leading behind shelf! */}
                    <line x1="15" y1="10" x2="-30" y2="50" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" opacity="0.65" />
                  </g>
                )}

                {/* Book Fallen Flat on Floor with Dust Puffs */}
                {props.bookOnFloor && (
                  <g id="book-on-floor" transform="translate(140, 360)">
                    <rect x="-10" y="15" width="65" height="15" rx="3" fill="#581c87" stroke="#3b0764" strokeWidth="3" />
                    {/* Dust impact rings */}
                    <ellipse cx="22" cy="22" rx="35" ry="8" fill="none" stroke="#94a3b8" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="4,4" />
                    <text x="22" y="5" textAnchor="middle" fill="#f87171" fontSize="16" fontWeight="bold">BAM!!</text>
                  </g>
                )}
              </g>

              {/* Shiver & Chill Lines radiating around room */}
              {kyady.shivering && (
                <g stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.75" fill="none">
                  <path d="M 440 330 Q 430 320 440 310" />
                  <path d="M 490 320 Q 500 310 490 300" />
                  <path d="M 430 280 Q 420 270 430 260" />
                  <path d="M 500 270 Q 510 260 500 250" />
                  {/* Floating spooky text */}
                  <text x="470" y="240" fill="#93c5fd" fontSize="18" fontWeight="bold" textAnchor="middle" fontStyle="italic">
                    *SHIVER... CHILLS!*
                  </text>
                </g>
              )}
            </g>
          )}

          {/* ========================================================
              SCENE 4: THE TWIST, LAUGHTER & DINNER (135 - 180s)
          ======================================================== */}
          {sceneId === 4 && (
            <g id="scene-4-bg">
              {/* Cozy, Warm Glowing Dining / Living Room */}
              <rect width="1000" height="380" fill="#431407" />
              <rect y="380" width="1000" height="182.5" fill="#78350f" />
              {/* Warm polished floor reflections */}
              <ellipse cx="500" cy="460" rx="400" ry="60" fill="#b45309" opacity="0.3" />

              {/* Large Picture Window showing Clear Starry Night Sky (Storm has passed!) */}
              <rect x="70" y="50" width="220" height="240" rx="10" fill="#0f172a" stroke="#ca8a04" strokeWidth="6" />
              <circle cx="210" cy="110" r="28" fill="#fef08a" />
              {/* Twinkling stars */}
              {[[110, 80], [140, 140], [180, 75], [95, 170], [240, 160], [160, 210]].map(([sx, sy], i) => (
                <polygon
                  key={i}
                  points={`${sx},${sy-4} ${sx+3},${sy-1} ${sx+6},${sy} ${sx+3},${sy+1} ${sx},${sy+4} ${sx-3},${sy+1} ${sx-6},${sy} ${sx-3},${sy-1}`}
                  fill="#ffffff"
                />
              ))}

              {/* If brother just emerged (135 - 160s): Living room background */}
              {state.totalProgress < 160 / 180 && (
                <g id="scene-4-prank-reveal">
                  {/* The Bookshelf in background */}
                  <rect x="680" y="60" width="200" height="380" rx="6" fill="#1c1917" stroke="#0c0a09" strokeWidth="6" />
                  <rect x="690" y="140" width="180" height="10" fill="#292524" />
                  <rect x="690" y="240" width="180" height="10" fill="#292524" />
                  <rect x="690" y="340" width="180" height="10" fill="#292524" />
                  {/* Book on floor */}
                  <rect x="630" y="380" width="60" height="14" rx="3" fill="#581c87" stroke="#3b0764" strokeWidth="2" />
                  {/* Fishing line held by brother */}
                  <line x1="640" y1="380" x2="720" y2="280" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />

                  {/* Comic sound effect balloons */}
                  <g transform="translate(560, 180)">
                    <ellipse cx="60" cy="30" rx="65" ry="26" fill="#facc15" stroke="#b45309" strokeWidth="3" />
                    <text x="60" y="36" textAnchor="middle" fill="#78350f" fontSize="16" fontWeight="bold">GOTCHA!!</text>
                  </g>
                  <g transform="translate(320, 160)">
                    <ellipse cx="60" cy="30" rx="75" ry="28" fill="#a855f7" stroke="#6b21a8" strokeWidth="3" />
                    <text x="60" y="37" textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">HAHAHAHA!!</text>
                  </g>
                </g>
              )}

              {/* Dinner Feast Celebration (160 - 180s) */}
              {props.dinnerBowlsVisible && (
                <g id="scene-4-dinner-table">
                  {/* Warm Family Dining Table */}
                  <ellipse cx="500" cy="420" rx="340" ry="70" fill="#9a3412" stroke="#7c2d12" strokeWidth="6" />
                  <ellipse cx="500" cy="415" rx="320" ry="60" fill="#c2410c" stroke="#ea580c" strokeWidth="2" />

                  {/* Steaming Tureen of Mom's Soup in Center */}
                  <ellipse cx="500" cy="405" rx="65" ry="24" fill="#fb923c" stroke="#9a3412" strokeWidth="3" />
                  <ellipse cx="500" cy="403" rx="55" ry="18" fill="#f97316" />
                  <circle cx="485" cy="402" r="5" fill="#22c55e" />
                  <circle cx="515" cy="404" r="5" fill="#eab308" />
                  {/* Soup Steam */}
                  <g stroke="#ffffff" strokeWidth="3" strokeOpacity="0.5" strokeLinecap="round" fill="none">
                    <path d="M 485 390 Q 475 365 490 340" />
                    <path d="M 515 390 Q 525 365 510 340" />
                  </g>

                  {/* Kyady's Bowl */}
                  <ellipse cx="360" cy="425" rx="35" ry="16" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
                  <ellipse cx="360" cy="423" rx="28" ry="12" fill="#f97316" />
                  {/* Brother's Bowl */}
                  <ellipse cx="640" cy="425" rx="35" ry="16" fill="#67e8f9" stroke="#0891b2" strokeWidth="2" />
                  <ellipse cx="640" cy="423" rx="28" ry="12" fill="#f97316" />

                  {/* Large Platter of Fresh Watermelon Slices (Callback to Kyady's drawing!) */}
                  <ellipse cx="500" cy="445" rx="75" ry="22" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                  {/* Slices of Watermelon */}
                  {[-30, 0, 30].map((offset, idx) => (
                    <g key={idx} transform={`translate(${500 + offset}, 440) scale(0.85)`}>
                      <path d="M -22,0 A 22 22 0 0 0 22,0 Z" fill="#15803d" />
                      <path d="M -19,0 A 19 19 0 0 0 19,0 Z" fill="#86efac" />
                      <path d="M -16,0 A 16 16 0 0 0 16,0 Z" fill="url(#watermelonFlesh)" />
                      <circle cx="-6" cy="5" r="1.5" fill="#0f172a" />
                      <circle cx="6" cy="5" r="1.5" fill="#0f172a" />
                    </g>
                  ))}
                </g>
              )}
            </g>
          )}

          {/* ========================================================
              CHARACTER RIGS: KYADY, MOM, BROTHER
          ======================================================== */}

          {/* MOM RIG (Visible in Scene 2 & Scene 4) */}
          {mom.visible && (
            <g
              id="char-mom"
              transform={sceneId === 2 ? 'translate(670, 190)' : 'translate(450, 170)'}
            >
              {/* Mom's Body & Apron */}
              <ellipse cx="50" cy="190" rx="38" ry="60" fill="#f43f5e" />
              {/* White Cooking Apron */}
              <path d="M 32 150 L 68 150 L 78 220 L 22 220 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
              <rect x="42" y="140" width="16" height="12" fill="#f8fafc" />

              {/* Mom's Arm & Wooden Ladle */}
              <g transform={mom.stirring ? `rotate(${Math.sin(Date.now() / 150) * 12} 70 170)` : undefined}>
                <path d="M 65 160 Q 85 175 105 170" stroke="#fecdd3" strokeWidth="12" strokeLinecap="round" fill="none" />
                {/* Ladle */}
                <line x1="100" y1="150" x2="115" y2="210" stroke="#b45309" strokeWidth="4" />
                <ellipse cx="115" cy="210" rx="8" ry="6" fill="#92400e" />
              </g>

              {/* Mom's Head */}
              <circle cx="50" cy="115" r="28" fill="#fecdd3" />
              {/* Mom's Hair Bun */}
              <path d="M 22 110 Q 50 70 78 110 Q 84 90 70 75 Q 50 65 30 75 Q 18 90 22 110 Z" fill="#713f12" />
              <circle cx="50" cy="68" r="14" fill="#713f12" />

              {/* Mom's Warm Face */}
              <circle cx="42" cy="112" r="3" fill="#1c1917" />
              <circle cx="58" cy="112" r="3" fill="#1c1917" />
              {/* Gentle smile or speaking mouth */}
              {activeDialogue?.speaker === 'Mom' ? (
                <ellipse
                  cx="50"
                  cy="126"
                  rx="6"
                  ry={3 + Math.sin(Date.now() / 80) * 2.5}
                  fill="#be123c"
                  stroke="#881337"
                  strokeWidth="1.5"
                />
              ) : (
                <path d="M 44 124 Q 50 132 56 124" stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              )}
              {/* Rosy cheeks */}
              <circle cx="36" cy="118" r="4" fill="#fda4af" opacity="0.6" />
              <circle cx="64" cy="118" r="4" fill="#fda4af" opacity="0.6" />
            </g>
          )}

          {/* BROTHER LEO RIG (Hidden prankster -> emerges laughing) */}
          {brother.visible && (
            <g
              id="char-brother"
              transform={
                sceneId === 4 && state.totalProgress >= 160 / 180
                  ? 'translate(660, 220)' // Sitting at dining table
                  : 'translate(680, 200)' // Popping from behind bookshelf
              }
            >
              {/* Brother's Body: Blue & White Striped Shirt */}
              <rect x="25" y="110" width="50" height="70" rx="12" fill="#0284c7" />
              <line x1="25" y1="125" x2="75" y2="125" stroke="#f0f9ff" strokeWidth="5" />
              <line x1="25" y1="145" x2="75" y2="145" stroke="#f0f9ff" strokeWidth="5" />
              <line x1="25" y1="165" x2="75" y2="165" stroke="#f0f9ff" strokeWidth="5" />
              {/* Khaki shorts */}
              <rect x="28" y="178" width="44" height="26" rx="4" fill="#d97706" />

              {/* Brother's Head */}
              <circle cx="50" cy="75" r="26" fill="#fed7aa" />
              {/* Messy Boyish Hair */}
              <path d="M 24 75 Q 35 40 50 42 Q 65 38 76 75 Q 70 50 50 48 Q 30 50 24 75 Z" fill="#451a03" />

              {/* Brother's Mischievous Laughing Face */}
              {/* Squinted happy eyes */}
              <path d="M 38 72 Q 44 66 50 72" stroke="#1c1917" strokeWidth="2.5" fill="none" />
              <path d="M 52 72 Q 58 66 64 72" stroke="#1c1917" strokeWidth="2.5" fill="none" />
              {/* Huge open laughing mouth */}
              <path d="M 42 82 Q 51 98 60 82 Z" fill="#be123c" stroke="#881337" strokeWidth="1.5" />
              <rect x="47" y="82" width="8" height="4" fill="#ffffff" rx="1" />

              {/* Arms holding flashlight / pointing at Kyady */}
              <g transform={brother.laughing ? `rotate(${Math.sin(Date.now() / 100) * 10} 25 120)` : undefined}>
                {/* Arm pointing finger */}
                <path d="M 30 120 L -10 115" stroke="#fed7aa" strokeWidth="9" strokeLinecap="round" />
                <circle cx="-12" cy="115" r="5" fill="#fed7aa" />
                {/* Flashlight in other hand */}
                <path d="M 70 120 L 95 135" stroke="#fed7aa" strokeWidth="9" strokeLinecap="round" />
                <rect x="92" y="130" width="18" height="9" rx="2" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
                {/* Yellow flashlight beam */}
                <polygon points="110,130 180,110 180,160 110,140" fill="#fef08a" opacity="0.35" pointerEvents="none" />
              </g>
            </g>
          )}

          {/* ========================================================
              MAIN CHARACTER: KYADY
              Appearance: Leavitt Liderazgo shirt, purple pants, afraid of ghosts
          ======================================================== */}
          {!(sceneId === 1 && state.totalProgress < 12 / 180) && (
            <g
              id="char-kyady"
              transform={`translate(${
                sceneId === 3 && kyady.pose === 'jump-air' ? 440 : kyady.x
              }, ${
                sceneId === 3 && kyady.pose === 'jump-air' ? 140 : kyady.y
              })`}
            >
              {/* Shivering vibration offset when scared */}
              <g transform={kyady.shivering ? `translate(${(Math.random() - 0.5) * 5}, ${(Math.random() - 0.5) * 4})` : undefined}>

              {/* Shadow underneath Kyady on the floor */}
              {kyady.pose !== 'jump-air' && (
                <ellipse cx="60" cy="245" rx="35" ry="9" fill="#000000" opacity="0.3" />
              )}
              {kyady.pose === 'jump-air' && (
                <ellipse cx="60" cy="310" rx="20" ry="5" fill="#000000" opacity="0.15" />
              )}

              {/* Purple Pants (as specified in planner) */}
              <g id="kyady-purple-pants">
                {kyady.pose === 'walking' ? (
                  <>
                    {/* Left Leg Walking */}
                    <rect x="42" y="165" width="15" height="60" rx="6" fill="#7e22ce" stroke="#581c87" strokeWidth="2" transform={`rotate(${Math.sin(Date.now() / 150) * 20} 50 165)`} />
                    {/* Right Leg Walking */}
                    <rect x="63" y="165" width="15" height="60" rx="6" fill="#6b21a8" stroke="#581c87" strokeWidth="2" transform={`rotate(${-Math.sin(Date.now() / 150) * 20} 70 165)`} />
                  </>
                ) : kyady.pose === 'jump-air' ? (
                  <>
                    {/* Legs splayed in terrified cartoon jump */}
                    <rect x="25" y="160" width="15" height="55" rx="6" fill="#7e22ce" stroke="#581c87" strokeWidth="2" transform="rotate(-30 35 160)" />
                    <rect x="80" y="160" width="15" height="55" rx="6" fill="#6b21a8" stroke="#581c87" strokeWidth="2" transform="rotate(30 85 160)" />
                  </>
                ) : (
                  <>
                    {/* Standing / sitting comfortably */}
                    <rect x="44" y="165" width="15" height="65" rx="6" fill="#7e22ce" stroke="#581c87" strokeWidth="2" />
                    <rect x="61" y="165" width="15" height="65" rx="6" fill="#6b21a8" stroke="#581c87" strokeWidth="2" />
                  </>
                )}

                {/* Cute Sneakers */}
                <ellipse cx="50" cy="232" rx="12" ry="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <ellipse cx="68" cy="232" rx="12" ry="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              </g>

              {/* Leavitt Liderazgo Shirt (Teal/Emerald shirt with bold logo emblem) */}
              <g id="kyady-leavitt-shirt">
                <rect x="35" y="105" width="50" height="65" rx="10" fill="url(#leavittShirt)" stroke="#042f2e" strokeWidth="2" />
                {/* Yellow/Golden Emblem & Text */}
                <ellipse cx="60" cy="130" rx="18" ry="12" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                <text x="60" y="129" textAnchor="middle" fill="#042f2e" fontSize="6.5" fontWeight="900" letterSpacing="-0.3">LEAVITT</text>
                <text x="60" y="137" textAnchor="middle" fill="#042f2e" fontSize="5.5" fontWeight="800" letterSpacing="-0.3">LIDERAZGO</text>

                {/* Collar */}
                <polygon points="50,105 70,105 60,114" fill="#f8fafc" />
              </g>

              {/* Kyady's Arms based on pose */}
              <g id="kyady-arms">
                {kyady.pose === 'drawing' && (
                  <g>
                    {/* Left arm resting on desk */}
                    <path d="M 38 115 Q 25 135 45 145" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                    {/* Right arm actively moving colored pencil */}
                    <path d="M 80 115 Q 95 130 85 148" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                    {/* Red pencil in hand */}
                    <line x1="85" y1="145" x2="92" y2="155" stroke="#ef4444" strokeWidth="3" />
                  </g>
                )}

                {kyady.pose === 'stomach-rub' && (
                  <g>
                    {/* Both hands holding rumbling stomach */}
                    <path d="M 38 115 Q 40 145 55 145" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                    <path d="M 82 115 Q 80 145 65 145" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />

                    {/* Comical Rumbling Waves & Sound Bubble */}
                    <g transform="translate(10, 110)">
                      <circle cx="50" cy="35" r="14" fill="#fbbf24" opacity="0.3" className="animate-ping" />
                      <path d="M 28 35 Q 20 25 28 15" stroke="#fbbf24" strokeWidth="3" fill="none" />
                      <path d="M 72 35 Q 80 25 72 15" stroke="#fbbf24" strokeWidth="3" fill="none" />
                      {/* Thought Bubble with Watermelon & Hot Soup */}
                      <g transform="translate(65, -40)">
                        <ellipse cx="30" cy="18" rx="35" ry="24" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
                        <circle cx="5" cy="36" r="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                        <circle cx="-3" cy="46" r="2.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
                        {/* Mini watermelon inside bubble */}
                        <path d="M 18,22 A 12 12 0 0 0 42,22 Z" fill="#15803d" />
                        <path d="M 20,22 A 10 10 0 0 0 40,22 Z" fill="#f43f5e" />
                        <text x="30" y="10" textAnchor="middle" fill="#ea580c" fontSize="9" fontWeight="bold">HUNGRY!</text>
                      </g>
                    </g>
                  </g>
                )}

                {kyady.pose === 'jump-air' && (
                  <g>
                    {/* Terrified arms thrown up high into the air */}
                    <path d="M 38 115 L 15 65" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" />
                    <path d="M 82 115 L 105 65" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" />
                    {/* Hands with splayed fingers */}
                    <circle cx="15" cy="62" r="7" fill="#fed7aa" />
                    <circle cx="105" cy="62" r="7" fill="#fed7aa" />
                  </g>
                )}

                {kyady.pose === 'chills-scared' && (
                  <g>
                    {/* Hugging shoulders with goosebumps */}
                    <path d="M 38 115 Q 60 120 75 135" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                    <path d="M 82 115 Q 60 120 45 135" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                  </g>
                )}

                {kyady.pose === 'laughing' && (
                  <g>
                    {/* Belly laughter holding sides */}
                    <path d="M 38 115 Q 30 135 48 140" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                    <path d="M 82 115 Q 90 135 72 140" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                  </g>
                )}

                {(kyady.pose === 'walking' || kyady.pose === 'talking-mom' || kyady.pose === 'watching-tv' || kyady.pose === 'eating-soup') && (
                  <g>
                    <path d="M 38 115 Q 30 135 45 150" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                    <path d="M 82 115 Q 90 135 75 150" stroke="#fed7aa" strokeWidth="10" strokeLinecap="round" fill="none" />
                  </g>
                )}
              </g>

              {/* Kyady's Head & Face */}
              <g id="kyady-head">
                {/* Hair Ponytail behind head */}
                <path d="M 30 55 Q 10 40 12 70 Q 15 90 28 80 Z" fill="#3b1d11" />
                <circle cx="30" cy="58" r="6" fill="#a855f7" />

                {/* Head circle */}
                <circle cx="60" cy="72" r="28" fill="#fed7aa" />

                {/* Front Hair Bangs */}
                <path d="M 32 68 Q 60 38 88 68 Q 80 48 60 45 Q 40 48 32 68 Z" fill="#3b1d11" />
                <path d="M 40 50 Q 55 60 50 70" stroke="#3b1d11" strokeWidth="3" fill="none" />

                {/* Eyes based on state */}
                {kyady.eyeState === 'wide-scared' && (
                  <g>
                    {/* Giant saucer eyes with tiny pupils for comedic terror */}
                    <circle cx="49" cy="70" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                    <circle cx="71" cy="70" r="10" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                    <circle cx="49" cy="70" r="3" fill="#0f172a" />
                    <circle cx="71" cy="70" r="3" fill="#0f172a" />
                    {/* Eyebrows raised high */}
                    <path d="M 41 54 Q 49 48 57 54" stroke="#3b1d11" strokeWidth="3" fill="none" />
                    <path d="M 63 54 Q 71 48 79 54" stroke="#3b1d11" strokeWidth="3" fill="none" />
                    {/* Chattering teeth line under mouth */}
                    <line x1="50" y1="92" x2="70" y2="92" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2,2" />
                  </g>
                )}

                {kyady.eyeState === 'happy-tear' && (
                  <g>
                    {/* Happy squinted laughing eyes with teardrops of joy */}
                    <path d="M 43 70 Q 50 63 57 70" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 63 70 Q 70 63 77 70" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                    {/* Tears of laughter */}
                    <circle cx="39" cy="72" r="3" fill="#38bdf8" />
                    <circle cx="81" cy="72" r="3" fill="#38bdf8" />
                  </g>
                )}

                {(kyady.eyeState === 'normal' || kyady.eyeState === 'focused' || kyady.eyeState === 'curious') && (
                  <g>
                    <ellipse cx="49" cy="70" rx="5" ry="6" fill="#1c1917" />
                    <ellipse cx="71" cy="70" rx="5" ry="6" fill="#1c1917" />
                    <circle cx="47" cy="68" r="2" fill="#ffffff" />
                    <circle cx="69" cy="68" r="2" fill="#ffffff" />
                    {/* Eyebrows */}
                    <path d="M 43 60 Q 49 57 55 60" stroke="#3b1d11" strokeWidth="2.5" fill="none" />
                    <path d="M 65 60 Q 71 57 77 60" stroke="#3b1d11" strokeWidth="2.5" fill="none" />
                  </g>
                )}

                {/* Mouth based on state with dialogue speech flapping */}
                {activeDialogue?.speaker === 'Kyady' ? (
                  <ellipse
                    cx="60"
                    cy="85"
                    rx="6.5"
                    ry={3.5 + Math.sin(Date.now() / 85) * 3}
                    fill="#be123c"
                    stroke="#881337"
                    strokeWidth="1.5"
                  />
                ) : (
                  <>
                    {kyady.mouthState === 'o-gasp' && (
                      <ellipse cx="60" cy="85" rx="6" ry="9" fill="#881337" stroke="#4c0519" strokeWidth="2" />
                    )}
                    {kyady.mouthState === 'wide-laugh' && (
                      <g>
                        <path d="M 48 80 Q 60 100 72 80 Z" fill="#be123c" stroke="#881337" strokeWidth="2" />
                        <rect x="54" y="80" width="12" height="4" fill="#ffffff" rx="1" />
                      </g>
                    )}
                    {kyady.mouthState === 'open' && (
                      <ellipse cx="60" cy="84" rx="7" ry="6" fill="#991b1b" />
                    )}
                    {kyady.mouthState === 'smile' && (
                      <path d="M 52 82 Q 60 90 68 82" stroke="#b91c1c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    )}
                    {kyady.mouthState === 'neutral' && (
                      <line x1="53" y1="83" x2="67" y2="83" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
                    )}
                  </>
                )}

                {/* Cute Rosy Cheeks */}
                <circle cx="40" cy="77" r="4.5" fill="#f43f5e" opacity="0.45" />
                <circle cx="80" cy="77" r="4.5" fill="#f43f5e" opacity="0.45" />
              </g>
            </g>
          </g>
          )}

          {/* ========================================================
              CINEMATIC TITLE OVERLAY / CREDITS (Start & End)
          ======================================================== */}
          {state.totalProgress < 6 / 180 && (
            <g id="opening-title-card" className="animate-pulse-subtle">
              <rect x="250" y="40" width="500" height="95" rx="12" fill="#090d16" fillOpacity="0.85" stroke="#7e22ce" strokeWidth="3" />
              <text x="500" y="80" textAnchor="middle" fill="#c084fc" fontSize="30" fontWeight="900" letterSpacing="2" className="font-movie-title">
                ARE GHOSTS REAL?
              </text>
              <text x="500" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="600" className="font-comic">
                Created by Jade Senelier • Starring Kyady
              </text>
            </g>
          )}

          {state.totalProgress >= 172 / 180 && (
            <g id="ending-credits-card">
              <rect x="200" y="60" width="600" height="150" rx="16" fill="#090d16" fillOpacity="0.92" stroke="#22c55e" strokeWidth="4" />
              <text x="500" y="105" textAnchor="middle" fill="#4ade80" fontSize="32" fontWeight="900" className="font-comic">
                THE END! 🍉👻✨
              </text>
              <text x="500" y="140" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="700">
                "No ghosts in this house... just a silly brother!"
              </text>
              <text x="500" y="175" textAnchor="middle" fill="#cbd5e1" fontSize="13" fontWeight="500">
                Directed by Jade Senelier • Animation Movie Planner Project
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Subtitles / Closed Captions Overlay */}
      {showCaptions && activeDialogue && (
        <div className="absolute bottom-4 left-6 right-6 z-40 flex justify-center pointer-events-none">
          <div className="bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-6 py-3 rounded-xl max-w-3xl shadow-xl flex items-center gap-3">
            <span
              className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider shrink-0 ${
                activeDialogue.speaker === 'Kyady'
                  ? 'bg-purple-600 text-white'
                  : activeDialogue.speaker === 'Mom'
                  ? 'bg-rose-600 text-white'
                  : activeDialogue.speaker === 'Brother'
                  ? 'bg-sky-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              {activeDialogue.speaker === 'Kyady'
                ? 'Kyady (8-Year-Old)'
                : activeDialogue.speaker === 'Brother'
                ? 'Brother Leo (8-Year-Old)'
                : activeDialogue.speaker}
            </span>
            <p className="text-slate-100 text-sm md:text-base font-comic leading-snug">
              {activeDialogue.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
