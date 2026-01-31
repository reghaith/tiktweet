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

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />

      <div className="relative z-10 h-full w-full flex justify-between items-end p-4">
        <div className="flex-1 max-w-[60%] mb-4">
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-0" />
            <div className="relative z-10 p-3">
              <h3 className="text-white font-bold text-lg mb-1 drop-shadow-lg">{short.creator}</h3>
              <p className="text-white text-sm line-clamp-2 mb-3 drop-shadow-md">{short.caption}</p>
              <div className="flex items-center gap-2 overflow-hidden bg-black/30 backdrop-blur-sm rounded-full px-3 py-2">
                <Music className="w-4 h-4 text-white flex-shrink-0" />
                <motion.div
                  animate={{ x: [0, -100] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="whitespace-nowrap"
                >
                  <span className="text-white text-sm drop-shadow-md">{short.audio}</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mb-4 mr-2">
          <Avatar className="h-12 w-12 border-2 border-white/20 shadow-lg">
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
              className="group relative"
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-all border border-white/10',
                  isLiked && 'bg-white/20'
                )}
              >
                <Heart
                  className={cn(
                    'w-7 h-7 transition-colors drop-shadow-lg',
                    isLiked ? 'text-secondary fill-secondary' : 'text-white'
                  )}
                />
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md mt-1">
                {isLiked ? short.likes + 1 : short.likes}
              </span>
            </Button>

            <Button variant="ghost" size="icon" className="group">
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md mt-1">{short.comments}</span>
            </Button>

            <Button variant="ghost" size="icon" className="group">
              <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                <Share2 className="w-7 h-7 text-white drop-shadow-lg" />
              </div>
              <span className="text-white text-xs font-medium drop-shadow-md mt-1">Share</span>
            </Button>

            <div className="mt-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-2 border-white/20 shadow-lg"
              >
                <Disc3 className="w-6 h-6 text-white drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {showHeart && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 1.5],
          }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-32 h-32 text-secondary fill-secondary drop-shadow-2xl" />
        </motion.div>
      )}
    </div>
  );
}
