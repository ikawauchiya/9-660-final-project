import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CompletionScreenProps {
  onRestart: () => void;
}

export function CompletionScreen({ onRestart }: CompletionScreenProps) {
  return (
    <Card className="w-full p-8">
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Experiment Complete</h1>
        <p className="text-muted-foreground">Thank you for participating in the experiment.</p>
        <Button size="lg" onClick={onRestart} className="w-48">
          Restart
        </Button>
      </div>
    </Card>
  );
}