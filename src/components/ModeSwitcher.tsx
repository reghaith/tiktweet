import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ModeSwitcherProps {
  mode: 'tweets' | 'shorts';
  onModeChange: (mode: 'tweets' | 'shorts') => void;
}

export function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  return (
    <div className="relative bg-black/40 rounded-full p-1 flex items-center">
      <motion.div
        className="absolute top-1 bottom-1 bg-primary rounded-full"
        initial={false}
        animate={{
          left: mode === 'tweets' ? '4px' : 'calc(50% - 4px)',
          width: 'calc(50% - 8px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
      />
      <button
        onClick={() => onModeChange('tweets')}
        className={cn(
          'relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200',
          mode === 'tweets' ? 'text-white' : 'text-muted-foreground'
        )}
      >
        Tweets
      </button>
      <button
        onClick={() => onModeChange('shorts')}
        className={cn(
          'relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200',
          mode === 'shorts' ? 'text-white' : 'text-muted-foreground'
        )}
      >
        Shorts
      </button>
    </div>
  );
}
