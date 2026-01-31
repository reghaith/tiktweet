import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Disc3, Music } from 'lucide-react';
import type { Short } from '../data/mockShorts';
import { useLikeAnimation } from '../hooks/useLikeAnimation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '../lib/utils';

interface ShortItemProps {
  short: Short;
}

export function ShortItem({ short }: ShortItemProps) {
  const { isLiked, isAnimating, toggleLike } = useLikeAnimation();
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleTap = () => {
    setShowHeart(true);
    if (!isLiked) {
      toggleLike();
    }
    setTimeout(() => setShowHeart(false), 800);
  };

  return (
    <div className="relative h-screen w-full snap-center bg-black">
      <video
        src={short.videoUrl}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        onDoubleClick={handleDoubleTap}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute right-4 bottom-20 flex flex-col gap-6 items-center">
        <Avatar className="h-12 w-12 border-2 border-subtle">
          <AvatarImage src={short.avatar} alt={short.creator} />
          <AvatarFallback>{short.creator.charAt(0)}</AvatarFallback>
        </Avatar>

        <motion.div
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-1"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLike}
            className="relative group"
          >
            <div
              className={cn(
                'w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all',
                isLiked && 'bg-white/20'
              )}
            >
              <Heart
                className={cn(
                  'w-7 h-7 transition-colors',
                  isLiked ? 'text-secondary fill-secondary' : 'text-white'
                )}
              />
            </div>
            <span className="text-white text-xs font-medium">
              {isLiked ? short.likes + 1 : short.likes}
            </span>
          </Button>

          <Button variant="ghost" size="icon" className="group">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-xs font-medium">{short.comments}</span>
          </Button>

          <Button variant="ghost" size="icon" className="group">
            <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Share2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-xs font-medium">Share</span>
          </Button>

          <div className="mt-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-subtle"
            >
              <Disc3 className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-4 right-20">
          <h3 className="text-white font-bold text-lg mb-1">{short.creator}</h3>
          <p className="text-white text-sm line-clamp-2 mb-2">{short.caption}</p>
          <div className="flex items-center gap-2 overflow-hidden">
            <Music className="w-4 h-4 text-white" />
            <motion.div
              animate={{ x: [0, -100] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="whitespace-nowrap"
            >
              <span className="text-white text-sm">{short.audio}</span>
            </motion.div>
          </div>
        </div>

        {showHeart && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 1.5],
            }}
            transition={{ duration: 0.8 }}
          >
            <Heart className="w-32 h-32 text-secondary fill-secondary" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
