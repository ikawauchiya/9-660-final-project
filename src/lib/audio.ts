import type { Sequence, ToneParameters } from './types';

export function createTone(
  context: AudioContext,
  { frequency, duration, startTime }: ToneParameters
) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.frequency.value = frequency;
  
  // Add slight fade in/out to avoid clicks
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.005);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration / 1000 - 0.005);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration / 1000);

  return { oscillator, gainNode };
}

export function playSequence(
  context: AudioContext,
  sequence: Sequence,
  onComplete?: () => void
) {
  const { firstTone, secondTone } = sequence;
  
  // Play first tone
  createTone(context, {
    frequency: firstTone.frequency,
    duration: firstTone.duration,
    startTime: context.currentTime,
  });

  // Play second tone
  createTone(context, {
    frequency: secondTone.frequency,
    duration: secondTone.duration,
    startTime: context.currentTime + (firstTone.duration + sequence.gapDuration) / 1000,
  });

  // Calculate total duration and trigger completion callback
  const totalDuration = firstTone.duration + sequence.gapDuration + secondTone.duration + 100;
  if (onComplete) {
    setTimeout(onComplete, totalDuration);
  }
}