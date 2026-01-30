import { motion } from 'framer-motion';
import { MessageCircle, Repeat2, Heart, Share2 } from 'lucide-react';
import type { Tweet } from '../data/mockTweets';
import { useLikeAnimation } from '../hooks/useLikeAnimation';
import { cn } from '../lib/utils';

interface TweetCardProps {
  tweet: Tweet;
}

export function TweetCard({ tweet }: TweetCardProps) {
  const { isLiked, isAnimating, toggleLike } = useLikeAnimation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="flex gap-3">
        <img
          src={tweet.avatar}
          alt={tweet.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-card-foreground truncate">
                {tweet.name}
              </span>
              <span className="text-muted-foreground text-sm truncate">
                {tweet.handle}
              </span>
            </div>
            <span className="text-muted-foreground text-sm whitespace-nowrap">
              {tweet.timestamp}
            </span>
          </div>

          <p className="text-[15px] leading-relaxed text-card-foreground mt-2">
            {tweet.content}
          </p>

          {tweet.media && (
            <img
              src={tweet.media}
              alt="Tweet media"
              className="w-full rounded-xl mt-3 object-cover max-h-96"
            />
          )}

          <div className="flex justify-between pt-3 max-w-xs mt-2">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-card-foreground transition-colors group">
              <MessageCircle className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-sm">{tweet.comments}</span>
            </button>

            <button className="flex items-center gap-2 text-muted-foreground hover:text-card-foreground transition-colors group">
              <Repeat2 className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-sm">{tweet.reposts}</span>
            </button>

            <motion.button
              onClick={toggleLike}
              className="flex items-center gap-2 text-muted-foreground transition-colors group"
              animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={cn(
                  'w-5 h-5 transition-colors',
                  isLiked ? 'text-secondary fill-secondary' : 'group-hover:text-secondary'
                )}
              />
              <span className="text-sm">{isLiked ? tweet.likes + 1 : tweet.likes}</span>
            </motion.button>

            <button className="flex items-center gap-2 text-muted-foreground hover:text-card-foreground transition-colors group">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
