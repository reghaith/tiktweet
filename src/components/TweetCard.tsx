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

const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 25,
};

export function TweetCard({ tweet, delay = 0 }: TweetCardProps) {
  const { isLiked, isAnimating, toggleLike } = useLikeAnimation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springTransition, delay: delay * 0.1 }}
    >
      <Card className="border-b border-subtle/50 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer rounded-none card-hover p-5">
        <div className="flex gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-11 w-11 cursor-pointer ring-2 ring-transparent hover:ring-primary/50 transition-all duration-300">
                <AvatarImage src={tweet.avatar} alt={tweet.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                  {tweet.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent 
              className="w-72 p-0 z-50 overflow-hidden glass-card" 
              sideOffset={8}
            >
              <div className="relative">
                <div className="h-20 bg-gradient-to-r from-primary/30 to-secondary/30" />
                <Avatar className="h-16 w-16 absolute -bottom-8 left-4 ring-4 ring-card">
                  <AvatarImage src={tweet.avatar} alt={tweet.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl">
                    {tweet.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="pt-10 pb-4 px-4 space-y-3">
                <div>
                  <div className="font-bold text-card-foreground text-lg">{tweet.name}</div>
                  <div className="text-sm text-muted-foreground">{tweet.handle}</div>
                </div>
                <p className="text-sm text-card-foreground/80 line-clamp-2">
                  Building awesome things with React & TypeScript. Follow for dev tips and insights.
                </p>
                <div className="flex gap-4 text-sm">
                  <span className="text-muted-foreground">
                    <strong className="text-card-foreground">1,234</strong> Following
                  </span>
                  <span className="text-muted-foreground">
                    <strong className="text-card-foreground">5,678</strong> Followers
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  Follow
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
          
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-card-foreground hover:underline cursor-pointer">
                {tweet.name}
              </span>
              <span className="text-muted-foreground text-sm">
                {tweet.handle}
              </span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm hover:underline cursor-pointer">
                {tweet.timestamp}
              </span>
            </div>

            <p className="text-[15px] leading-relaxed text-card-foreground whitespace-pre-wrap">
              {tweet.content}
            </p>

            {tweet.media && (
              <motion.div 
                className="relative overflow-hidden rounded-2xl mt-3 group cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={springTransition}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                  src={tweet.media}
                  alt="Tweet media"
                  className="w-full rounded-2xl object-cover max-h-[400px] media-hover"
                />
              </motion.div>
            )}

            <div className="flex items-center justify-between mt-3 max-w-md">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <MessageCircle className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">{tweet.comments}</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10 transition-all duration-300"
                >
                  <Repeat2 className="w-[18px] h-[18px] group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm">{tweet.reposts}</span>
                </Button>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
                transition={springTransition}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLike}
                  className={cn(
                    "group gap-2 transition-all duration-300",
                    isLiked 
                      ? "text-secondary hover:text-secondary hover:bg-secondary/10" 
                      : "text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                  )}
                >
                  <Heart
                    className={cn(
                      "w-[18px] h-[18px] transition-all duration-300",
                      isLiked 
                        ? "fill-secondary scale-110" 
                        : "group-hover:scale-110"
                    )}
                  />
                  <span className="text-sm">{isLiked ? tweet.likes + 1 : tweet.likes}</span>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Share2 className="w-[18px] h-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}
