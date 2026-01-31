import { useState, useEffect } from 'react';
import { mockTweets } from '../data/mockTweets';
import { TweetCard } from './TweetCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SkeletonTweet } from '@/components/ui/skeleton';

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
  );
}
