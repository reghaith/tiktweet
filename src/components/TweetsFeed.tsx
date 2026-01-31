/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { mockTweets } from '../data/mockTweets';
import { TweetCard } from './TweetCard';
import { TweetComposer } from './TweetComposer';
import { TrendingSidebar } from './TrendingSidebar';
import { ModeSwitcher } from './ModeSwitcher';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SkeletonTweet } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface TweetsFeedProps {
  onModeChange?: (mode: 'tweets' | 'shorts') => void;
}

export function TweetsFeed({ onModeChange }: TweetsFeedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('foryou');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-1 max-w-full md:max-w-[600px] mx-auto min-w-0 border-r border-border flex flex-col">
        <div className="sticky top-0 z-30 bg-card/70 backdrop-blur-xl border-b border-border px-5 py-5 flex justify-between items-center">
          <h2 className="text-xl font-bold">Home</h2>
          <div className="flex gap-5">
            <button
              className={`text-sm font-medium pb-1 relative transition-colors ${activeTab === 'foryou' ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('foryou')}
            >
              For You
              {activeTab === 'foryou' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-primary rounded-full" />
              )}
            </button>
            <button
              className={`text-sm font-medium pb-1 relative transition-colors ${activeTab === 'following' ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}
              onClick={() => setActiveTab('following')}
            >
              Following
              {activeTab === 'following' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-primary rounded-full" />
              )}
            </button>
          </div>
        </div>

        <TweetComposer />

        <ScrollArea className="flex-1 pb-20">
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
