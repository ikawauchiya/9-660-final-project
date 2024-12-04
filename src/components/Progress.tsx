import { Progress as ProgressBar } from '@/components/ui/progress';
import { TOTAL_TRIALS } from '@/lib/constants';

interface ProgressProps {
  currentTrial: number;
}

export function Progress({ currentTrial }: ProgressProps) {
  const progress = (currentTrial / TOTAL_TRIALS) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Trial {currentTrial + 1} of {TOTAL_TRIALS}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <ProgressBar value={progress} className="h-2" />
    </div>
  );
}