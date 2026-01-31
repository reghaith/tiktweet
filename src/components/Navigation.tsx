import { Search, Zap } from 'lucide-react';
import { ModeSwitcher } from './ModeSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavigationProps {
  mode: 'tweets' | 'shorts';
  onModeChange: (mode: 'tweets' | 'shorts') => void;
}

export function Navigation({ mode, onModeChange }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
        </div>

        <ModeSwitcher mode={mode} onModeChange={onModeChange} />

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="group">
            <Search className="w-5 h-5 group-hover:text-primary transition-colors" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
        </div>
      </div>
    </nav>
  );
}
