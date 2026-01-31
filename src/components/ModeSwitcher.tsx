import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ModeSwitcherProps {
  mode: 'tweets' | 'shorts';
  onModeChange: (mode: 'tweets' | 'shorts') => void;
}

export function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  return (
    <Tabs value={mode} onValueChange={(value) => onModeChange(value as 'tweets' | 'shorts')}>
      <TabsList className="relative bg-black/40 rounded-full p-1 flex items-center">
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
        <TabsTrigger value="tweets" className="relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200">
          Tweets
        </TabsTrigger>
        <TabsTrigger value="shorts" className="relative z-10 px-4 py-1.5 text-sm font-medium transition-colors duration-200">
          Shorts
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
