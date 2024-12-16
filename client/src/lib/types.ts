export interface Tone {
  frequency: number;
  duration: number;
  startTime: number;
}

export interface Sequence {
  firstTone: Tone;
  secondTone: Tone;
  gapDuration: number;
}

export type TrialOrder = 'N' | 'R'; // Normal or Reversed
export type PitchCondition = 'L' | 'S' | 'H'; // Low, Standard, High
export type IntervalCondition = 'S' | 'M' | 'L'; // Short, Medium, Long

export interface TrialCombination {
  questionId: string;
  sequenceA: {
    secondTone: number;
    gapDuration: number;
  };
  sequenceB: {
    secondTone: number;
    gapDuration: number;
  };
}

export interface Trial {
  trialNumber: number;
  questionId: string;
  sequenceA: Sequence;
  sequenceB: Sequence;
  response?: 'longer' | 'equal' | 'shorter';
  timestamp: number;
}

export interface ExperimentState {
  experimentId?: number;
  trials: Trial[];
  currentTrial: number;
  isPlaying: boolean;
  stage: 'ready' | 'playing' | 'completion';
}

export type ToneParameters = {
  frequency: number;
  duration: number;
  startTime: number;
}