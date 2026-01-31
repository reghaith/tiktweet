import { useState, useEffect } from 'react';
import { mockTweets } from '../data/mockTweets';
import { TweetCard } from './TweetCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

export function TweetsFeed() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16 max-w-2xl mx-auto min-h-screen bg-background">
      <ScrollArea className="h-full">
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card p-4 border-b border-subtle">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 bg-primary/10 rounded" />
                    <div className="h-4 w-1/2 bg-primary/10 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          mockTweets.map((tweet, index) => (
            <TweetCard key={tweet.id} tweet={tweet} delay={index * 0.05} />
          ))
        )}
      </ScrollArea>
    </div>
  );
}
