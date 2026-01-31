import { useState } from 'react';
import { MessageCircle, Repeat2, Heart, Share2, MoreHorizontal } from 'lucide-react';
import type { Tweet } from '../data/mockTweets';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface TweetCardProps {
  tweet: Tweet;
  delay?: number;
}

export function TweetCard({ tweet, delay = 0 }: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <article
      className="px-5 py-6 border-b border-border transition-colors duration-200 hover:bg-white/[0.02] flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
      style={{ animationDelay: `${delay * 50}ms` }}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={tweet.avatar} alt={tweet.name} />
        <AvatarFallback className="bg-gradient-to-br from-primary to-pink text-white font-semibold">
          {tweet.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <div className="flex gap-2 items-baseline">
            <span className="font-bold text-foreground">{tweet.name}</span>
            <span className="text-muted-foreground text-sm">{tweet.handle}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">{tweet.timestamp}</span>
          </div>
          <MoreHorizontal className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        </div>

        <p className="text-base leading-6 text-foreground whitespace-pre-wrap mb-3">
          {tweet.content}
        </p>

        {tweet.media && (
          <div className="overflow-hidden rounded-md mt-2 border border-border">
            <img
              src={tweet.media}
              alt="Tweet media"
              className="w-full transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="flex justify-between mt-4 max-w-[400px]">
          <button className="flex items-center gap-1 text-muted-foreground text-sm transition-all hover:text-primary">
            <MessageCircle className="w-5 h-5" />
            {tweet.comments}
          </button>

          <button className="flex items-center gap-1 text-muted-foreground text-sm transition-all hover:text-green">
            <Repeat2 className="w-5 h-5" />
            {tweet.reposts}
          </button>

          <button
            className={cn(
              "flex items-center gap-1 text-sm transition-all",
              isLiked ? "text-pink" : "text-muted-foreground hover:text-pink"
            )}
            onClick={toggleLike}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-all",
                isLiked ? "fill-pink" : ""
              )}
            />
            <span className="like-count">{isLiked ? tweet.likes + 1 : tweet.likes}</span>
          </button>

          <button className="flex items-center gap-1 text-muted-foreground text-sm transition-all hover:text-primary">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
