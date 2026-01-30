import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface AnimatedHeartProps {
  isVisible: boolean;
}

export function AnimatedHeart({ isVisible }: AnimatedHeartProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 1.5],
      }}
      transition={{ duration: 0.8 }}
    >
      <Heart className="w-32 h-32 text-secondary fill-secondary" />
    </motion.div>
  );
}
