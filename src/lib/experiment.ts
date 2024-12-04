import { nanoid } from 'nanoid';
import {
  TRIAL_COMBINATIONS,
  STANDARD_FREQUENCY,
  TONE_DURATION,
} from './constants';
import { supabase } from './supabase';
import type { Trial, Sequence } from './types';

function createSequence(secondFrequency: number, gapDuration: number): Sequence {
  return {
    firstTone: {
      frequency: STANDARD_FREQUENCY,
      duration: TONE_DURATION,
      startTime: 0,
    },
    secondTone: {
      frequency: secondFrequency,
      duration: TONE_DURATION,
      startTime: TONE_DURATION + gapDuration,
    },
    gapDuration,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateTrials(): Trial[] {
  // Shuffle all combinations
  const shuffledCombinations = shuffleArray(TRIAL_COMBINATIONS);

  return shuffledCombinations.map((combination, index) => ({
    trialNumber: index + 1,
    questionId: combination.questionId,
    sequenceA: createSequence(
      combination.sequenceA.secondTone,
      combination.sequenceA.gapDuration
    ),
    sequenceB: createSequence(
      combination.sequenceB.secondTone,
      combination.sequenceB.gapDuration
    ),
    timestamp: Date.now(),
  }));
}

export async function startExperiment() {
  const participantId = nanoid();
  
  const { data: experiment, error: experimentError } = await supabase
    .from('experiments')
    .insert({ participant_id: participantId })
    .select()
    .single();

  if (experimentError) {
    throw new Error('Failed to create experiment');
  }

  return experiment;
}

export async function finishExperiment(experimentId: number) {
  const { data: experiment, error: experimentError } = await supabase
    .from('experiments')
    .update({ completed: true })
    .eq('id', experimentId)
    .select()
    .single();

  if (experimentError) {
    throw new Error('Failed to mark experiment as completed');
  }

  return experiment;
}

export async function saveTrial(
  experimentId: number,
  trial: Trial,
  response: 'longer' | 'equal' | 'shorter'
) {
  const { error } = await supabase.from('trials').insert({
    experiment_id: experimentId,
    trial_number: trial.trialNumber,
    question_id: trial.questionId,
    sequence_a_first_tone: trial.sequenceA.firstTone.frequency,
    sequence_a_second_tone: trial.sequenceA.secondTone.frequency,
    sequence_a_gap_duration: trial.sequenceA.gapDuration,
    sequence_b_first_tone: trial.sequenceB.firstTone.frequency,
    sequence_b_second_tone: trial.sequenceB.secondTone.frequency,
    sequence_b_gap_duration: trial.sequenceB.gapDuration,
    response,
    created_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error('Failed to save trial');
  }
}