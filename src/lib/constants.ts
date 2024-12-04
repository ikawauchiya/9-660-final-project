// Tone frequencies (Hz)
export const STANDARD_FREQUENCY = 500;
export const LOW_FREQUENCY = 400;
export const HIGH_FREQUENCY = 600;

// Gap durations (ms)
export const SHORT_GAP = 540;
export const STANDARD_GAP = 600;
export const LONG_GAP = 660;

// Tone duration (ms)
export const TONE_DURATION = 200;

// Number of trials
export const TOTAL_TRIALS = 18; // 9 combinations × 2 orders

// All possible combinations including both normal and reversed orders
export const TRIAL_COMBINATIONS = [
  // Low frequency (400Hz) combinations - Normal order
  {
    questionId: 'LMN', // Low pitch, Medium gap, Normal order
    sequenceA: { secondTone: LOW_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'LSN', // Low pitch, Short gap, Normal order
    sequenceA: { secondTone: LOW_FREQUENCY, gapDuration: SHORT_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'LLN', // Low pitch, Long gap, Normal order
    sequenceA: { secondTone: LOW_FREQUENCY, gapDuration: LONG_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },

  // Low frequency (400Hz) combinations - Reversed order
  {
    questionId: 'LMR', // Low pitch, Medium gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: LOW_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'LSR', // Low pitch, Short gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: LOW_FREQUENCY, gapDuration: SHORT_GAP }
  },
  {
    questionId: 'LLR', // Low pitch, Long gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: LOW_FREQUENCY, gapDuration: LONG_GAP }
  },

  // High frequency (600Hz) combinations - Normal order
  {
    questionId: 'HMN', // High pitch, Medium gap, Normal order
    sequenceA: { secondTone: HIGH_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'HSN', // High pitch, Short gap, Normal order
    sequenceA: { secondTone: HIGH_FREQUENCY, gapDuration: SHORT_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'HLN', // High pitch, Long gap, Normal order
    sequenceA: { secondTone: HIGH_FREQUENCY, gapDuration: LONG_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },

  // High frequency (600Hz) combinations - Reversed order
  {
    questionId: 'HMR', // High pitch, Medium gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: HIGH_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'HSR', // High pitch, Short gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: HIGH_FREQUENCY, gapDuration: SHORT_GAP }
  },
  {
    questionId: 'HLR', // High pitch, Long gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: HIGH_FREQUENCY, gapDuration: LONG_GAP }
  },

  // Standard frequency (500Hz) combinations - Normal order
  {
    questionId: 'SMN', // Standard pitch, Medium gap, Normal order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'SSN', // Standard pitch, Short gap, Normal order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: SHORT_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'SLN', // Standard pitch, Long gap, Normal order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: LONG_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },

  // Standard frequency (500Hz) combinations - Reversed order
  {
    questionId: 'SMR', // Standard pitch, Medium gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP }
  },
  {
    questionId: 'SSR', // Standard pitch, Short gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: SHORT_GAP }
  },
  {
    questionId: 'SLR', // Standard pitch, Long gap, Reversed order
    sequenceA: { secondTone: STANDARD_FREQUENCY, gapDuration: STANDARD_GAP },
    sequenceB: { secondTone: STANDARD_FREQUENCY, gapDuration: LONG_GAP }
  }
];