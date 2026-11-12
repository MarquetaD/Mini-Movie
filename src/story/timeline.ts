import { AnimationKeyframeState, DialogueBeat, HorrorChecklistItem, SceneInfo } from './types';

export const TOTAL_DURATION_SECONDS = 180; // Exactly 3 minutes

export const SCENES: SceneInfo[] = [
  {
    id: 1,
    title: 'Scene 1: The Setup',
    subtitle: 'Drawing Watermelon & A Rumbling Tummy',
    startTime: 0,
    endTime: 45,
    goal: 'Introduce Kyady and set a creepy storm mood with sudden hunger',
    feeling: 'Calm, hungry, and entertained',
    tension: 25,
    humor: 35,
    bgTheme: 'stormy-night',
  },
  {
    id: 2,
    title: 'Scene 2: The Rising Action',
    subtitle: "Mom's Cooking & Spooky Ghost Talk",
    startTime: 45,
    endTime: 90,
    goal: 'Build suspense with clues & house history (foreshadowing)',
    feeling: 'Relaxing, cozy, yet mysterious',
    tension: 50,
    humor: 20,
    bgTheme: 'kitchen-cozy',
  },
  {
    id: 3,
    title: 'Scene 3: The Climax',
    subtitle: 'TV Goes Black & The Haunted Bookshelf Groans',
    startTime: 90,
    endTime: 135,
    goal: 'The big confrontation! Face the eerie bookshelf scare head-on',
    feeling: 'Eerieness, scared, uneasy, hair-raising chills',
    tension: 98,
    humor: 5,
    bgTheme: 'creepy-livingroom',
  },
  {
    id: 4,
    title: 'Scene 4: The Twist & Resolution',
    subtitle: "The Prankster Brother & Family Soup Feast",
    startTime: 135,
    endTime: 180,
    goal: 'Reveal the hilarious truth: a prank, laughing together, eating dinner',
    feeling: 'Happiness, silliness, relief, cozy happy ending',
    tension: 10,
    humor: 95,
    bgTheme: 'warm-dinner',
  },
];

export const DIALOGUE_BEATS: DialogueBeat[] = [
  // Scene 1 (0-45s)
  {
    startTime: 1,
    endTime: 12,
    speaker: 'Narrator',
    text: 'On a dark and stormy night, the wind howls around an old rusty house on the hill...',
    emotion: 'curious',
    soundFx: 'wind-howl',
  },
  {
    startTime: 13,
    endTime: 25,
    speaker: 'Kyady',
    text: '♪ Hmm-mmm-mm... Just a little more green rind for my juicy watermelon slice! Perfect!',
    emotion: 'happy',
    soundFx: 'pencil-scratch',
  },
  {
    startTime: 27,
    endTime: 36,
    speaker: 'Kyady',
    text: '*GRRRRRUMBLE!* Whoa! My stomach is roaring like a hungry lion! I need food right now!',
    emotion: 'hungry',
    soundFx: 'stomach-rumble',
  },
  {
    startTime: 37,
    endTime: 44,
    speaker: 'Kyady',
    text: 'Let me head to the kitchen... I hope Mom is cooking something warm...',
    emotion: 'curious',
    soundFx: 'footsteps-wood',
  },

  // Scene 2 (45-90s)
  {
    startTime: 47,
    endTime: 58,
    speaker: 'Mom',
    text: 'Mmm, fragrant hearty vegetable soup! Just simmering to perfection on this stormy night.',
    emotion: 'reassuring',
    soundFx: 'soup-boil',
  },
  {
    startTime: 59,
    endTime: 72,
    speaker: 'Kyady',
    text: 'Mom! Did you hear that eerie moan down the hall? Do you think this old house is... haunted by ghosts?!',
    emotion: 'curious',
    soundFx: 'creak-slow',
  },
  {
    startTime: 73,
    endTime: 83,
    speaker: 'Mom',
    text: 'Haha, oh Kyady! It’s just old floorboards and rusty pipes expanding in the rain. There are no ghosts!',
    emotion: 'reassuring',
    soundFx: 'mom-laugh',
  },
  {
    startTime: 84,
    endTime: 89,
    speaker: 'Mom',
    text: 'Why don’t you relax in the living room and watch TV while the soup cools off?',
    emotion: 'reassuring',
    soundFx: 'soup-ladle',
  },

  // Scene 3 (90-135s)
  {
    startTime: 92,
    endTime: 104,
    speaker: 'Kyady',
    text: 'Haha! Look at that silly cartoon dog trying to chase his own tail! Mom was right, nothing scary here.',
    emotion: 'happy',
    soundFx: 'tv-chatter',
  },
  {
    startTime: 106,
    endTime: 114,
    speaker: 'Narrator',
    text: 'Suddenly... BZZZZT! The old television flickers wildly with static, and snaps completely black!',
    emotion: 'terrified',
    soundFx: 'tv-zap-static',
  },
  {
    startTime: 115,
    endTime: 122,
    speaker: 'Kyady',
    text: '*Gasp* Wh-what happened to the lights?! Why is it so freezing cold all of a sudden...?',
    emotion: 'terrified',
    soundFx: 'heartbeat-thump',
  },
  {
    startTime: 123,
    endTime: 134,
    speaker: 'Kyady',
    text: 'CRRRREEEAAAK... *THUD!!* A heavy book just flew off the bookshelf! AHHH! ARE GHOSTS REAL?!',
    emotion: 'shocked',
    soundFx: 'book-thud',
  },

  // Scene 4 (135-180s)
  {
    startTime: 136,
    endTime: 147,
    speaker: 'Brother',
    text: 'PFFT—HAHAHAHA! Gotcha, Kyady! You should have seen your face, you jumped three feet in the air!',
    emotion: 'laughing',
    soundFx: 'kid-giggle',
  },
  {
    startTime: 148,
    endTime: 159,
    speaker: 'Kyady',
    text: 'LEO?! You pulled the book with fishing line from behind the shelf?! YOU SILLY PRANKSTER!',
    emotion: 'laughing',
    soundFx: 'pillow-toss',
  },
  {
    startTime: 160,
    endTime: 169,
    speaker: 'Mom',
    text: 'Soup is ready, you two comedians! Come sit down before it gets cold!',
    emotion: 'happy',
    soundFx: 'dinner-bell',
  },
  {
    startTime: 170,
    endTime: 179,
    speaker: 'Kyady',
    text: 'Warm soup and sweet watermelon! No ghosts in this house—just my goofy brother! Hahaha!',
    emotion: 'happy',
    soundFx: 'slurp-laugh',
  },
];

export const HORROR_CHECKLIST_CONFIG: HorrorChecklistItem[] = [
  {
    id: 'spooky-setting',
    title: 'Spooky Setting',
    description: 'Used lighting, rain weather, flickering shadows, and old rusty house atmosphere.',
    triggerTime: 5,
    completed: false,
  },
  {
    id: 'foreshadowing',
    title: 'Foreshadowing',
    description: 'Dropped subtle clues early: haunted house conversation and shadows moving near the bookshelf.',
    triggerTime: 65,
    completed: false,
  },
  {
    id: 'suspense',
    title: 'Suspense Building',
    description: 'Built high tension with TV shutting off, eerie silence, heartbeat rhythm, and slow camera zoom.',
    triggerTime: 110,
    completed: false,
  },
  {
    id: 'kid-friendly-twist',
    title: 'Kid-Friendly Twist',
    description: 'Ended with a hilarious laugh: brother’s prank revealed, hearty belly laughs, and a cozy family soup dinner!',
    triggerTime: 140,
    completed: false,
  },
];

export function clampTime(timeSec: number, max: number = TOTAL_DURATION_SECONDS): number {
  if (isNaN(timeSec) || timeSec < 0) return 0;
  if (timeSec > max) return max;
  return timeSec;
}

export function formatTime(seconds: number): string {
  const clamped = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getSceneAtTime(timeSec: number): SceneInfo {
  const t = clampTime(timeSec);
  const found = SCENES.find((s) => t >= s.startTime && (t < s.endTime || (s.id === 4 && t <= s.endTime)));
  return found || SCENES[0];
}

export function getActiveDialogue(timeSec: number): DialogueBeat | null {
  const t = clampTime(timeSec);
  return DIALOGUE_BEATS.find((d) => t >= d.startTime && t <= d.endTime) || null;
}

export function getHorrorChecklistStatus(timeSec: number): HorrorChecklistItem[] {
  const t = clampTime(timeSec);
  return HORROR_CHECKLIST_CONFIG.map((item) => ({
    ...item,
    completed: t >= item.triggerTime,
  }));
}

export function calculateAnimationState(timeSec: number): AnimationKeyframeState {
  const t = clampTime(timeSec);
  const scene = getSceneAtTime(t);
  const sceneDuration = scene.endTime - scene.startTime;
  const sceneProgress = Math.max(0, Math.min(1, (t - scene.startTime) / sceneDuration));
  const totalProgress = t / TOTAL_DURATION_SECONDS;

  // Active dialogue and sound effects
  const activeDialogue = getActiveDialogue(t);
  const activeSoundEffects: string[] = [];
  if (activeDialogue?.soundFx) {
    activeSoundEffects.push(activeDialogue.soundFx);
  }

  // Tension & humor curves
  let tensionLevel = 20;
  let humorLevel = 20;
  let camera = { zoom: 1, panX: 0, panY: 0, shake: 0 };
  let ambientColor = '#0f172a';
  let ambientIntensity = 0.5;
  let stormFlicker = false;
  let candleGlow = false;

  let kyadyPose: AnimationKeyframeState['kyady']['pose'] = 'drawing';
  let kyadyEmotion: AnimationKeyframeState['kyady']['emotion'] = 'calm';
  let kyadyMouth: AnimationKeyframeState['kyady']['mouthState'] = 'neutral';
  let kyadyEyes: AnimationKeyframeState['kyady']['eyeState'] = 'normal';
  let kyadyShivering = false;
  let kyadyX = 260;
  let kyadyY = 220;

  let momVisible = false;
  let momStirring = false;
  let momTalking = false;

  let brotherVisible = false;
  let brotherHiding = false;
  let brotherPranking = false;
  let brotherLaughing = false;

  let watermelonDrawingComplete = 0.2;
  let soupSteamIntensity = 0;
  let tvOn = false;
  let tvStatic = false;
  let bookFalling = false;
  let bookFallProgress = 0;
  let bookOnFloor = false;
  let dinnerBowlsVisible = false;

  // SCENE 1: The Setup (0 - 45s)
  if (t < 45) {
    tensionLevel = 20 + Math.sin(t * 0.5) * 5;
    humorLevel = t > 26 ? 60 : 30;
    stormFlicker = t < 12;

    if (t < 12) {
      // Exterior establishing shot transitioning into window
      const zoomIn = t / 12;
      camera = { zoom: 1 + zoomIn * 0.8, panX: zoomIn * 60, panY: zoomIn * -20, shake: t % 4 > 3.8 ? 3 : 0 };
      ambientColor = '#0b0f19';
      ambientIntensity = 0.35;
      kyadyPose = 'drawing';
      kyadyEmotion = 'calm';
      kyadyEyes = 'focused';
      watermelonDrawingComplete = 0.4;
    } else if (t < 26) {
      // Kyady drawing watermelon happily
      camera = { zoom: 1.15, panX: 0, panY: 0, shake: 0 };
      ambientColor = '#1e1b4b';
      ambientIntensity = 0.65;
      kyadyPose = 'drawing';
      kyadyEmotion = 'calm';
      kyadyMouth = 'smile';
      kyadyEyes = 'focused';
      watermelonDrawingComplete = Math.min(1, 0.4 + ((t - 12) / 14) * 0.6);
    } else if (t < 36) {
      // Stomach rumble! Comical shock
      camera = { zoom: 1.25, panX: 0, panY: 10, shake: (t * 20) % 2 === 0 ? 2 : 0 };
      kyadyPose = 'stomach-rub';
      kyadyEmotion = 'hungry';
      kyadyMouth = 'open';
      kyadyEyes = 'curious';
      watermelonDrawingComplete = 1;
    } else {
      // Walking to living room
      const walkProg = (t - 36) / 9;
      camera = { zoom: 1.05, panX: -walkProg * 80, panY: 0, shake: 0 };
      kyadyPose = 'walking';
      kyadyX = 260 + walkProg * 140;
      kyadyEmotion = 'hungry';
      kyadyMouth = 'neutral';
      kyadyEyes = 'normal';
    }
  }

  // SCENE 2: The Rising Action (45 - 90s)
  else if (t < 90) {
    momVisible = true;
    momStirring = true;
    soupSteamIntensity = 0.8;
    ambientColor = '#2e1065';
    ambientIntensity = 0.75;
    tvOn = true;

    if (t < 60) {
      // Kyady enters kitchen, mom stirring
      const walkIn = Math.min(1, (t - 45) / 10);
      kyadyX = 140 + walkIn * 100;
      kyadyPose = 'walking';
      kyadyEmotion = 'wondering';
      tensionLevel = 35;
      humorLevel = 25;
      momTalking = t > 47 && t < 58;
    } else if (t < 75) {
      // Kyady asks mom about ghosts
      kyadyPose = 'talking-mom';
      kyadyEmotion = 'wondering';
      kyadyMouth = 'open';
      kyadyEyes = 'curious';
      tensionLevel = 55;
      humorLevel = 20;
      camera = { zoom: 1.15, panX: -20, panY: 0, shake: 0 };
      // Hint of shadow movement behind bookshelf in adjacent room
      brotherHiding = true;
    } else {
      // Mom reassures Kyady, hints to watch TV
      kyadyPose = 'talking-mom';
      kyadyEmotion = 'calm';
      kyadyMouth = 'smile';
      momTalking = true;
      tensionLevel = 45;
      humorLevel = 35;
      camera = { zoom: 1.05, panX: 10, panY: 0, shake: 0 };
      brotherHiding = true;
    }
  }

  // SCENE 3: The Climax (90 - 135s)
  else if (t < 135) {
    if (t < 105) {
      // Kyady watching TV happily
      tvOn = true;
      kyadyPose = 'watching-tv';
      kyadyEmotion = 'giggling';
      kyadyMouth = 'wide-laugh';
      kyadyEyes = 'happy-tear';
      tensionLevel = 30;
      humorLevel = 50;
      camera = { zoom: 1.1, panX: 30, panY: 0, shake: 0 };
      brotherHiding = true;
    } else if (t < 114) {
      // Sudden lightning, TV static zap and shutoff!
      tvOn = false;
      tvStatic = true;
      stormFlicker = (t * 8) % 2 > 1;
      ambientColor = '#050a14';
      ambientIntensity = 0.3;
      kyadyPose = 'chills-scared';
      kyadyEmotion = 'frightened';
      kyadyMouth = 'o-gasp';
      kyadyEyes = 'wide-scared';
      kyadyShivering = true;
      tensionLevel = 85;
      humorLevel = 10;
      camera = { zoom: 1.25, panX: 20, panY: 10, shake: 3 };
    } else if (t < 124) {
      // Suspense creep: slow zoom to bookshelf, creepy heartbeat
      ambientColor = '#020617';
      ambientIntensity = 0.25;
      candleGlow = true;
      kyadyPose = 'chills-scared';
      kyadyEmotion = 'frightened';
      kyadyMouth = 'o-gasp';
      kyadyEyes = 'wide-scared';
      kyadyShivering = true;
      tensionLevel = 95;
      humorLevel = 5;
      const creepProg = (t - 114) / 10;
      camera = { zoom: 1.25 + creepProg * 0.35, panX: 80 * creepProg, panY: 15 * creepProg, shake: (t * 12) % 2 === 0 ? 1 : 0 };
      brotherHiding = true;
      brotherPranking = true;
    } else {
      // Book crashes down! Kyady jumps in the air screaming!
      bookFalling = t < 127;
      bookFallProgress = Math.min(1, (t - 124) / 1.5);
      bookOnFloor = t >= 126;
      tensionLevel = 98;
      humorLevel = 25;
      kyadyPose = 'jump-air';
      kyadyEmotion = 'shocked';
      kyadyMouth = 'open';
      kyadyEyes = 'wide-scared';
      camera = { zoom: 1.45, panX: 50, panY: -20, shake: t < 127 ? 8 : 2 };
      brotherHiding = true;
      brotherPranking = true;
    }
  }

  // SCENE 4: The Twist & Resolution (135 - 180s)
  else {
    bookOnFloor = true;
    candleGlow = false;
    ambientColor = '#1e1b4b';
    ambientIntensity = 0.85;

    if (t < 147) {
      // Brother pops out laughing with flashlight/string!
      brotherVisible = true;
      brotherLaughing = true;
      kyadyPose = 'chills-scared';
      kyadyEmotion = 'shocked';
      kyadyMouth = 'o-gasp';
      kyadyEyes = 'wide-scared';
      tensionLevel = 40;
      humorLevel = 85;
      camera = { zoom: 1.3, panX: 40, panY: 0, shake: 0 };
    } else if (t < 160) {
      // Kyady realizes it's a prank, bursts into laughter
      brotherVisible = true;
      brotherLaughing = true;
      kyadyPose = 'laughing';
      kyadyEmotion = 'giggling';
      kyadyMouth = 'wide-laugh';
      kyadyEyes = 'happy-tear';
      tensionLevel = 15;
      humorLevel = 98;
      camera = { zoom: 1.2, panX: 20, panY: 0, shake: (t * 5) % 2 === 0 ? 1 : 0 };
    } else {
      // Cozy family feast: warm dining table, hot soup & watermelon dessert
      momVisible = true;
      brotherVisible = true;
      dinnerBowlsVisible = true;
      ambientColor = '#431407';
      ambientIntensity = 1.0;
      kyadyPose = 'eating-soup';
      kyadyEmotion = 'giggling';
      kyadyMouth = 'smile';
      kyadyEyes = 'happy-tear';
      soupSteamIntensity = 1.0;
      tensionLevel = 5;
      humorLevel = 95;
      const finalZoomOut = (t - 160) / 20;
      camera = { zoom: 1.2 - finalZoomOut * 0.25, panX: 0, panY: 0, shake: 0 };
    }
  }

  return {
    sceneId: scene.id,
    sceneProgress,
    totalProgress,
    tensionLevel,
    humorLevel,
    camera,
    lighting: {
      ambientColor,
      ambientIntensity,
      stormFlicker,
      candleGlow,
    },
    kyady: {
      x: kyadyX,
      y: kyadyY,
      pose: kyadyPose,
      emotion: kyadyEmotion,
      mouthState: kyadyMouth,
      eyeState: kyadyEyes,
      shivering: kyadyShivering,
    },
    mom: {
      visible: momVisible,
      stirring: momStirring,
      talking: momTalking,
    },
    brother: {
      visible: brotherVisible,
      hiding: brotherHiding,
      pranking: brotherPranking,
      laughing: brotherLaughing,
    },
    props: {
      watermelonDrawingComplete,
      soupSteamIntensity,
      tvOn,
      tvStatic,
      bookFalling,
      bookFallProgress,
      bookOnFloor,
      dinnerBowlsVisible,
    },
    activeDialogue,
    activeSoundEffects,
  };
}
