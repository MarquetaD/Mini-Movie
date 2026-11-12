import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampTime,
  formatTime,
  getSceneAtTime,
  getActiveDialogue,
  getHorrorChecklistStatus,
  calculateAnimationState,
  SCENES,
  TOTAL_DURATION_SECONDS,
} from './timeline';

test('clampTime clamps within [0, 180]', () => {
  assert.equal(clampTime(-10), 0);
  assert.equal(clampTime(200), 180);
  assert.equal(clampTime(45), 45);
  assert.equal(clampTime(NaN), 0);
});

test('formatTime formats seconds to mm:ss', () => {
  assert.equal(formatTime(0), '0:00');
  assert.equal(formatTime(45), '0:45');
  assert.equal(formatTime(90), '1:30');
  assert.equal(formatTime(135), '2:15');
  assert.equal(formatTime(180), '3:00');
});

test('getSceneAtTime maps 4 key scenes correctly', () => {
  // Scene 1: 0 - 45
  const s1 = getSceneAtTime(10);
  assert.equal(s1.id, 1);
  assert.equal(s1.feeling, 'Calm, hungry, and entertained');

  // Scene 2: 45 - 90
  const s2 = getSceneAtTime(50);
  assert.equal(s2.id, 2);
  assert.equal(s2.title, 'Scene 2: The Rising Action');

  // Scene 3: 90 - 135
  const s3 = getSceneAtTime(115);
  assert.equal(s3.id, 3);
  assert.equal(s3.title, 'Scene 3: The Climax');
  assert.ok(s3.tension > 80);

  // Scene 4: 135 - 180
  const s4 = getSceneAtTime(150);
  assert.equal(s4.id, 4);
  assert.equal(s4.title, 'Scene 4: The Twist & Resolution');
  assert.ok(s4.humor > 80);
});

test('Horror Checklist triggers progressively', () => {
  const atStart = getHorrorChecklistStatus(0);
  assert.equal(atStart.filter(c => c.completed).length, 0);

  const atClimax = getHorrorChecklistStatus(120);
  // Setting, Foreshadowing, and Suspense should be completed
  assert.equal(atClimax[0].completed, true);
  assert.equal(atClimax[1].completed, true);
  assert.equal(atClimax[2].completed, true);
  assert.equal(atClimax[3].completed, false);

  const atEnd = getHorrorChecklistStatus(180);
  // All 4 horror elements should be completed
  assert.equal(atEnd.every(c => c.completed), true);
});

test('calculateAnimationState transitions character and emotional arc', () => {
  // Scene 1: Kyady is drawing watermelon then hungry
  const stateStart = calculateAnimationState(15);
  assert.equal(stateStart.kyady.pose, 'drawing');
  assert.equal(stateStart.kyady.emotion, 'calm');

  const stateHungry = calculateAnimationState(30);
  assert.equal(stateHungry.kyady.pose, 'stomach-rub');
  assert.equal(stateHungry.kyady.emotion, 'hungry');

  // Scene 3: Climax scare
  const stateScared = calculateAnimationState(120);
  assert.equal(stateScared.kyady.shivering, true);
  assert.ok(stateScared.tensionLevel >= 90);

  // Scene 4: Laughing and eating
  const stateLaugh = calculateAnimationState(150);
  assert.equal(stateLaugh.brother.visible, true);
  assert.equal(stateLaugh.kyady.pose, 'laughing');
  assert.ok(stateLaugh.humorLevel >= 80);
});
