import test from 'node:test';
import assert from 'node:assert/strict';
import { CHARACTER_VOICE_PROFILES, voiceEngine } from './voiceEngine';

test('Character Voice Profiles has studio voice configurations for all 4 story characters', () => {
  const characters = ['Kyady', 'Mom', 'Brother', 'Narrator'];
  characters.forEach((char) => {
    const profile = CHARACTER_VOICE_PROFILES[char];
    assert.ok(profile, `Profile exists for ${char}`);
    assert.ok(profile.geminiVoice, `Gemini voice exists for ${char}`);
    assert.ok(profile.vocalStyle.length > 20, `Vocal style guidance exists for ${char}`);
    assert.ok(profile.samplePhrase.length > 10);
  });
});

test('Character voice profiles map to distinct specialized Gemini TTS voices', () => {
  assert.equal(CHARACTER_VOICE_PROFILES['Kyady'].geminiVoice, 'Puck');
  assert.equal(CHARACTER_VOICE_PROFILES['Mom'].geminiVoice, 'Kore');
  assert.equal(CHARACTER_VOICE_PROFILES['Brother'].geminiVoice, 'Zephyr');
  assert.equal(CHARACTER_VOICE_PROFILES['Narrator'].geminiVoice, 'Fenrir');
});

test('VoiceEngine mode toggle and volume clamping work correctly', () => {
  voiceEngine.setVoiceMode('ai-gemini');
  assert.equal(voiceEngine.getVoiceMode(), 'ai-gemini');

  voiceEngine.setVoiceMode('browser-speech');
  assert.equal(voiceEngine.getVoiceMode(), 'browser-speech');

  voiceEngine.setVoiceMode('ai-gemini');

  voiceEngine.setVolume(0.8);
  assert.equal(voiceEngine.getVolume(), 0.8);

  voiceEngine.setVolume(2.5); // clamps to 1
  assert.equal(voiceEngine.getVolume(), 1.0);

  voiceEngine.setVolume(-0.5); // clamps to 0
  assert.equal(voiceEngine.getVolume(), 0.0);

  voiceEngine.setVolume(1.0);
});

test('Kyady and Brother Leo are configured with 8-year-old child voices', () => {
  const kyady = CHARACTER_VOICE_PROFILES['Kyady'];
  const brother = CHARACTER_VOICE_PROFILES['Brother'];
  const mom = CHARACTER_VOICE_PROFILES['Mom'];
  const narrator = CHARACTER_VOICE_PROFILES['Narrator'];

  assert.ok(kyady.role.includes('8-year-old'));
  assert.ok(brother.role.includes('8-year-old'));
  assert.ok(kyady.displayName.includes('8-Year-Old'));
  assert.ok(brother.displayName.includes('8-Year-Old'));

  // Both 8-year-old children have higher fundamental pitch than adults
  assert.ok(kyady.pitch >= 1.25, 'Kyady pitch should sound like an 8-year-old child');
  assert.ok(brother.pitch >= 1.25, 'Brother pitch should sound like an 8-year-old child');
  assert.ok(kyady.pitch > mom.pitch, 'Child pitch is higher than adult mother');
  assert.ok(brother.pitch > narrator.pitch, 'Child pitch is higher than narrator');
});
