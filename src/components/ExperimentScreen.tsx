import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { IntervalSet } from '@/components/IntervalSet';
import { Progress } from '@/components/Progress';
import type { Trial } from '@/lib/types';

interface ExperimentScreenProps {
  onResponse: (response: 'longer' | 'equal' | 'shorter') => void;
  trial: Trial;
  isPlaying: boolean;
  onPlay: () => void;
  currentTrial: number;
}

export function ExperimentScreen({ 
  onResponse, 
  trial, 
  isPlaying, 
  onPlay,
  currentTrial 
}: ExperimentScreenProps) {
  const [playedSets, setPlayedSets] = useState<Set<string>>(new Set());
  const [selectedResponse, setSelectedResponse] = useState<'longer' | 'equal' | 'shorter' | null>(null);

  const handlePlay = (set: string) => {
    onPlay();
  };

  const handleComplete = (set: string) => {
    setPlayedSets(prev => new Set([...prev, set]));
  };

  const hasPlayedBoth = playedSets.has('A') && playedSets.has('B');

  const handleSubmit = () => {
    if (selectedResponse) {
      onResponse(selectedResponse);
      setSelectedResponse(null);
      setPlayedSets(new Set());
    }
  };

  return (
    <Card className="w-full p-8">
      <div className="space-y-8">
        <Progress currentTrial={currentTrial} />

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Listen Carefully</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Listen to both sequences, then compare the final intervals of Sequence A relative to Sequence B.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div>
            <IntervalSet
              label="Sequence A"
              sequence={trial.sequenceA}
              disabled={isPlaying}
              onPlay={() => handlePlay('A')}
              onComplete={() => handleComplete('A')}
              isPlayed={playedSets.has('A')}
            />
          </div>

          <div>
            <IntervalSet
              label="Sequence B"
              sequence={trial.sequenceB}
              disabled={isPlaying}
              onPlay={() => handlePlay('B')}
              onComplete={() => handleComplete('B')}
              isPlayed={playedSets.has('B')}
            />
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          <RadioGroup
            disabled={!hasPlayedBoth}
            value={selectedResponse || ''}
            onValueChange={(value) => setSelectedResponse(value as typeof selectedResponse)}
            className={!hasPlayedBoth ? 'opacity-50' : ''}
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="longer" id="longer" />
                <Label htmlFor="longer">Sequence A interval is longer than B</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="equal" id="equal" />
                <Label htmlFor="equal">Sequence A interval is equal to B</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shorter" id="shorter" />
                <Label htmlFor="shorter">Sequence A interval is shorter than B</Label>
              </div>
            </div>
          </RadioGroup>

          <Button 
            className="w-full"
            disabled={!hasPlayedBoth || !selectedResponse}
            onClick={handleSubmit}
            variant={hasPlayedBoth && selectedResponse ? "default" : "secondary"}
          >
            Submit Response
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {!hasPlayedBoth 
            ? "Please listen to both sequences before making your choice"
            : !selectedResponse
            ? "Select your response about the relative duration of the intervals"
            : "Click submit to continue to the next trial"}
        </div>
      </div>
    </Card>
  );
}