import { Button } from '@/components/ui/button';
import { PlayCircle, CheckCircle2 } from 'lucide-react';
import type { Sequence } from '@/lib/types';
import { playSequence } from '@/lib/audio';
import { cn } from '@/lib/utils';

interface IntervalSetProps {
  label: string;
  sequence: Sequence;
  disabled?: boolean;
  onPlay: () => void;
  onComplete: () => void;
  isPlayed?: boolean;
}

export function IntervalSet({ 
  label, 
  sequence, 
  disabled, 
  onPlay,
  onComplete,
  isPlayed = false
}: IntervalSetProps) {
  const handlePlay = () => {
    const audioContext = new AudioContext();
    onPlay();
    playSequence(audioContext, sequence, onComplete);
  };

  return (
    <Button
      variant={isPlayed ? "secondary" : "outline"}
      size="lg"
      onClick={handlePlay}
      disabled={disabled}
      className={cn(
        "w-full h-32 flex flex-col items-center justify-center space-y-3 relative",
        isPlayed && "border-primary",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {isPlayed ? (
        <CheckCircle2 className="h-10 w-10 text-primary" />
      ) : (
        <PlayCircle className="h-10 w-10" />
      )}
      <span className="text-lg">
        {isPlayed ? `${label} (Played)` : `Play ${label}`}
      </span>
    </Button>
  );
}