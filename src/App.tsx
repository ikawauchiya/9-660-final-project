import { useState, useCallback } from 'react';
import { ReadyScreen } from '@/components/ReadyScreen';
import { ExperimentScreen } from '@/components/ExperimentScreen';
import { generateTrials, startExperiment, saveTrial, finishExperiment } from '@/lib/experiment';
import { TOTAL_TRIALS } from '@/lib/constants';
import type { ExperimentState } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { CompletionScreen } from './components/CompletionScreen';

function App() {
  const { toast } = useToast();
  const [state, setState] = useState<ExperimentState>({
    trials: generateTrials(),
    currentTrial: 0,
    isPlaying: false,
    stage: 'ready',
  });

  const handleStart = useCallback(async () => {
    try {
      const experiment = await startExperiment();
      setState(prev => ({ 
        ...prev, 
        experimentId: experiment.id,
        stage: 'playing' 
      }));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start experiment. Please try again.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handlePlay = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
    setTimeout(() => {
      setState(prev => ({ ...prev, isPlaying: false }));
    }, 2000);
  }, []);

  const handleResponse = useCallback(async (response: 'longer' | 'equal' | 'shorter') => {
    if (!state.experimentId) return;

    try {
      await saveTrial(
        state.experimentId,
        state.trials[state.currentTrial],
        response
      );

      const nextTrial = state.currentTrial + 1;

      if (nextTrial >= TOTAL_TRIALS) {
        // If it's the last trial, finish the experiment
        await finishExperiment(state.experimentId);

        setState(prev => ({
          ...prev,
          currentTrial: nextTrial,
          stage: 'completion',
          isPlaying: false,
        }));
      } else {
        setState(prev => {
          const updatedTrials = [...prev.trials];
          if (updatedTrials[prev.currentTrial]) {
            updatedTrials[prev.currentTrial] = {
              ...updatedTrials[prev.currentTrial],
              response,
            };
          }

          return {
            ...prev,
            trials: updatedTrials,
            currentTrial: nextTrial,
            isPlaying: false,
            stage: 'playing',
          };
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save response. Please try again.',
        variant: 'destructive',
      });
    }
  }, [state.experimentId, state.currentTrial, state.trials, toast]);

  const handleRestart = useCallback(() => {
    setState({
      trials: generateTrials(),
      currentTrial: 0,
      isPlaying: false,
      stage: 'ready',
      experimentId: undefined,
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-4xl mx-auto">
        {state.stage === 'ready' && (
          <ReadyScreen onStart={handleStart} />
        )}

        {state.stage === 'playing' && (
          <ExperimentScreen
            trial={state.trials[state.currentTrial]}
            currentTrial={state.currentTrial}
            isPlaying={state.isPlaying}
            onPlay={handlePlay}
            onResponse={handleResponse}
          />
        )}

        {state.stage === 'completion' && (
          <CompletionScreen onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}

export default App;