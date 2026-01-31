import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { mockTweets } from '../data/mockTweets';
import { TweetCard } from './TweetCard';
import { TweetComposer } from './TweetComposer';
import { TrendingSidebar } from './TrendingSidebar';
import { ModeSwitcher } from './ModeSwitcher';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SkeletonTweet } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TweetsFeedProps {
  onModeChange?: (mode: 'tweets' | 'shorts') => void;
}

export function TweetsFeed({ onModeChange }: TweetsFeedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'tweets' | 'shorts'>('tweets');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleModeChange = (newMode: 'tweets' | 'shorts') => {
    setMode(newMode);
    onModeChange?.(newMode);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 max-w-full md:max-w-[600px] mx-auto min-w-0 border-r border-white/5 flex flex-col">
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-white/5 px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">Home</span>
            </div>
          </div>
          <ModeSwitcher mode={mode} onModeChange={handleModeChange} />
        </div>

        <div className="px-4 pb-3 border-b border-white/5">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="relative bg-black/20 rounded-full p-1 flex w-full">
              <TabsTrigger value="for-you" className="flex-1 rounded-full text-sm font-medium transition-all duration-200">
                For You
              </TabsTrigger>
              <TabsTrigger value="following" className="flex-1 rounded-full text-sm font-medium transition-all duration-200">
                Following
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TweetComposer />

        <ScrollArea className="flex-1">
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonTweet key={i} />
              ))}
            </>
          ) : (
            mockTweets.map((tweet, index) => (
              <TweetCard key={tweet.id} tweet={tweet} delay={index * 0.05} />
            ))
          )}
        </ScrollArea>
      </div>

      <TrendingSidebar />
    </div>
  );
}
