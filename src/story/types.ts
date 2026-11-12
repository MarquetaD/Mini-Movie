export interface SceneInfo {
  id: number;
  title: string;
  subtitle: string;
  startTime: number;
  endTime: number;
  goal: string;
  feeling: string;
  tension: number; // 0 to 100
  humor: number; // 0 to 100
  bgTheme: 'stormy-night' | 'kitchen-cozy' | 'creepy-livingroom' | 'warm-dinner';
}

export interface DialogueBeat {
  startTime: number;
  endTime: number;
  speaker: 'Kyady' | 'Mom' | 'Brother' | 'Narrator';
  text: string;
  emotion: 'happy' | 'hungry' | 'curious' | 'reassuring' | 'terrified' | 'shocked' | 'laughing';
  soundFx?: string;
}

export interface HorrorChecklistItem {
  id: string;
  title: string;
  description: string;
  triggerTime: number;
  completed: boolean;
}

export interface AnimationKeyframeState {
  sceneId: number;
  sceneProgress: number; // 0 to 1 within the scene
  totalProgress: number; // 0 to 1 over the 180s
  tensionLevel: number; // 0 - 100
  humorLevel: number; // 0 - 100
  camera: {
    zoom: number;
    panX: number;
    panY: number;
    shake: number;
  };
  lighting: {
    ambientColor: string;
    ambientIntensity: number;
    stormFlicker: boolean;
    candleGlow: boolean;
  };
  kyady: {
    x: number;
    y: number;
    pose: 'drawing' | 'stomach-rub' | 'walking' | 'talking-mom' | 'watching-tv' | 'chills-scared' | 'jump-air' | 'laughing' | 'eating-soup';
    emotion: 'calm' | 'hungry' | 'wondering' | 'frightened' | 'shocked' | 'giggling';
    mouthState: 'neutral' | 'smile' | 'open' | 'o-gasp' | 'wide-laugh';
    eyeState: 'normal' | 'focused' | 'curious' | 'wide-scared' | 'happy-tear';
    shivering: boolean;
  };
  mom: {
    visible: boolean;
    stirring: boolean;
    talking: boolean;
  };
  brother: {
    visible: boolean;
    hiding: boolean;
    pranking: boolean;
    laughing: boolean;
  };
  props: {
    watermelonDrawingComplete: number; // 0 to 1
    soupSteamIntensity: number; // 0 to 1
    tvOn: boolean;
    tvStatic: boolean;
    bookFalling: boolean;
    bookFallProgress: number; // 0 to 1
    bookOnFloor: boolean;
    dinnerBowlsVisible: boolean;
  };
  activeDialogue: DialogueBeat | null;
  activeSoundEffects: string[];
}
