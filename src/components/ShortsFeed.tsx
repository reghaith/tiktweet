import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { mockShorts } from '../data/mockShorts';
import { ShortItem } from './ShortItem';
import { Skeleton } from '@/components/ui/skeleton';
import { ModeSwitcher } from './ModeSwitcher';

interface ShortsFeedProps {
  onModeChange?: (mode: 'tweets' | 'shorts') => void;
}

export function ShortsFeed({ onModeChange }: ShortsFeedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'tweets' | 'shorts'>('shorts');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleModeChange = (newMode: 'tweets' | 'shorts') => {
    setMode(newMode);
    onModeChange?.(newMode);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 max-w-full md:max-w-[600px] mx-auto min-w-0 border-r-0 md:border-r border-white/5 flex flex-col">
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-white/5 px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">Shorts</span>
            </div>
          </div>
          <ModeSwitcher mode={mode} onModeChange={handleModeChange} />
        </div>

        <div className="flex-1 relative">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Skeleton className="h-[80vh] w-full max-w-[400px]" />
            </div>
          ) : (
            <>
              <div className="h-full w-full flex justify-center bg-black/50 hidden md:flex lg:flex">
                <div className="h-full w-full max-w-[400px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
                  {mockShorts.map((short) => (
                    <ShortItem key={short.id} short={short} />
                  ))}
                </div>
              </div>
              <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide md:hidden lg:hidden">
                {mockShorts.map((short) => (
                  <ShortItem key={short.id} short={short} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-[350px] pl-4 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="glass-card p-4 rounded-2xl">
          <h3 className="text-sm text-muted-foreground mb-2">Trending in Shorts</h3>
          <p className="text-sm font-medium">Discover trending short-form content from creators worldwide</p>
        </div>
      </div>
    </div>
  );
}
