import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Server-side Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// In-memory cache for synthesized voice clips to ensure instant sub-millisecond playback
const voiceAudioCache = new Map<string, string>();

// Character voice mapping for Gemini 3.8 Flash Lite TTS
// Prebuilt voices: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
interface CharacterVoiceSettings {
  voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
  stylePrompt: string;
}

const CHARACTER_VOICE_CONFIG: Record<string, CharacterVoiceSettings> = {
  Kyady: {
    voiceName: 'Puck', // Lively, expressive, youthful child
    stylePrompt: 'An adorable, sweet, highly expressive 8-year-old little girl. Cute, sweet child voice with authentic kid inflections, childlike wonder, and genuine breathy giggles.',
  },
  Mom: {
    voiceName: 'Kore', // Warm, soothing, maternal
    stylePrompt: 'A warm, loving, reassuring mother. Gentle tone, smooth pacing, comforting and cheerful.',
  },
  Brother: {
    voiceName: 'Zephyr', // Mischievous, bright, boyish child
    stylePrompt: 'A playful, mischievous 8-year-old little boy. Cheerful child voice with kid laughter, cheeky snickers, and youthful kid excitement.',
  },
  Narrator: {
    voiceName: 'Fenrir', // Deep, cinematic, atmospheric
    stylePrompt: 'A deep, dramatic, cinematic narrator for a spooky story. Deliberate cadence, suspenseful pauses, atmospheric mystery.',
  },
};

/**
 * Endpoint to generate realistic human-sounding AI voices using Gemini TTS
 */
app.post('/api/tts/generate', async (req: Request, res: Response) => {
  try {
    const { speaker, text, emotion } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Missing or invalid text parameter' });
      return;
    }

    const speakerName = speaker || 'Kyady';
    const cleanText = text
      .replace(/\*.*?\*/g, '') // remove stage directions like *GASP*
      .replace(/♪/g, '')
      .trim();

    if (!cleanText) {
      res.status(400).json({ error: 'Text was empty after cleaning' });
      return;
    }

    // Check cache first
    const cacheKey = `${speakerName}:${cleanText}`;
    if (voiceAudioCache.has(cacheKey)) {
      res.json({
        speaker: speakerName,
        audioBase64: voiceAudioCache.get(cacheKey),
        mimeType: 'audio/wav',
        cached: true,
      });
      return;
    }

    if (!ai) {
      res.status(503).json({
        error: 'Gemini API key is not configured on the server',
        fallback: true,
      });
      return;
    }

    const voiceConfig = CHARACTER_VOICE_CONFIG[speakerName] || CHARACTER_VOICE_CONFIG['Kyady'];
    const styledPrompt = `Perform this line with natural emotion (${emotion || 'expressive'}): ${cleanText}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: styledPrompt,
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceConfig.voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      res.status(502).json({ error: 'No audio returned from Gemini TTS', fallback: true });
      return;
    }

    // Store in cache
    voiceAudioCache.set(cacheKey, base64Audio);

    res.json({
      speaker: speakerName,
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
      cached: false,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown TTS generation error';
    console.error('Error generating Gemini speech:', message);
    res.status(500).json({ error: message, fallback: true });
  }
});

/**
 * Health check / API status endpoint
 */
app.get('/api/tts/status', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    aiConfigured: Boolean(ai),
    cachedClips: voiceAudioCache.size,
    characters: Object.keys(CHARACTER_VOICE_CONFIG),
  });
});

async function startServer() {
  const port = process.env.PORT || 3000;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.use('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Are Ghosts Real? Full-Stack Server running on http://localhost:${port}`);
  });
}

startServer();
