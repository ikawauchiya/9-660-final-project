import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Headphones } from 'lucide-react';

interface ReadyScreenProps {
  onStart: () => void;
}

export function ReadyScreen({ onStart }: ReadyScreenProps) {
  return (
    <Card className="w-full p-8">
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        <Headphones className="w-16 h-16 mx-auto text-primary" />
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Auditory Time Perception Experiment</h1>
          
          <div className="space-y-2 text-muted-foreground">
            <p>Welcome to our experiment on time perception in auditory signals.</p>
            <p>You will hear pairs of tones with different pitches and durations.</p>
            <p>Your task is to indicate which tone in each pair seemed longer.</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <ul className="max-w-md mx-auto text-left space-y-2 text-muted-foreground">
            <li>1. Ensure you're in a quiet environment</li>
            <li>2. Put on your headphones</li>
            <li>3. Click "Play" to hear each pair of tones</li>
            <li>4. Select which interval seemed longer to you</li>
          </ul>
        </div>

        <Button size="lg" onClick={onStart} className="w-48">
          Continue
        </Button>
      </div>
    </Card>
  );
}