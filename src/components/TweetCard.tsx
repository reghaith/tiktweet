import { motion } from 'framer-motion';
import { MessageCircle, Repeat2, Heart, Share2 } from 'lucide-react';
import type { Tweet } from '../data/mockTweets';
import { useLikeAnimation } from '../hooks/useLikeAnimation';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface TweetCardProps {
  tweet: Tweet;
  delay?: number;
}

export function TweetCard({ tweet, delay = 0 }: TweetCardProps) {
  const { isLiked, isAnimating, toggleLike } = useLikeAnimation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ animationDelay: `${delay}s` }}
    >
      <Card className="border-b border-subtle hover:bg-white/5 transition-colors cursor-pointer rounded-tweet">
        <div className="flex gap-3">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage src={tweet.avatar} alt={tweet.name} />
                <AvatarFallback>{tweet.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 p-4 z-50" sideOffset={4}>
              <div className="space-y-2">
                <div className="font-semibold text-card-foreground">{tweet.name}</div>
                <div className="text-sm text-muted-foreground">{tweet.handle}</div>
                <div className="text-xs text-muted-foreground">{tweet.timestamp}</div>
              </div>
            </HoverCardContent>
          </HoverCard>
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
                {tweet.handle}
              </span>
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                ·
              </span>
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                {tweet.timestamp}
              </span>
            </div>

            <p className="text-[15px] leading-snug text-card-foreground mt-2 font-normal">
              {tweet.content}
            </p>

            {tweet.media && (
              <div className="group relative overflow-hidden rounded-xl mt-3">
                <img
                  src={tweet.media}
                  alt="Tweet media"
                  className="w-full rounded-xl object-cover max-h-96 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <div className="flex gap-2 ml-auto mt-2 max-w-xs">
              <Button variant="ghost" size="icon" className="group">
                <MessageCircle className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span className="text-sm">{tweet.comments}</span>
              </Button>

              <Button variant="ghost" size="icon" className="group">
                <Repeat2 className="w-5 h-5 group-hover:text-customrepost transition-colors" />
                <span className="text-sm">{tweet.reposts}</span>
              </Button>

              <motion.div
                animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="inline-flex"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleLike}
                  className="group"
                >
                  <motion.button
                    animate={{
                      scale: isAnimating ? [1, 1.3, 1] : [0],
                      transition: {
                        type: 'spring',
                        stiffness: 500,
                        damping: 20,
                      },
                    }}
                  >
                    <Heart
                      className={cn(
                        'w-5 h-5 transition-colors',
                        isLiked ? 'text-secondary fill-secondary' : 'group-hover:text-secondary'
                      )}
                    />
                  </motion.button>
                  <span className="text-sm">{isLiked ? tweet.likes + 1 : tweet.likes}</span>
                </Button>
              </motion.div>

              <Button variant="ghost" size="icon" className="group active:scale-95">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}
