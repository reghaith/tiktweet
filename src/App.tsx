import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { TweetsFeed } from './components/TweetsFeed';
import { ShortsFeed } from './components/ShortsFeed';
import { Command, Search } from 'lucide-react';

function App() {
  const [mode, setMode] = useState<'tweets' | 'shorts'>('tweets');
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mode]);

  const handleModeChange = (newMode: 'tweets' | 'shorts') => {
    setMode(newMode);
    setTimeout(() => {
      feedRef.current?.focus();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation mode={mode} onModeChange={handleModeChange} />

      <AnimatePresence mode="wait">
        <motion.div
          ref={feedRef}
          key={mode}
          initial={{ opacity: 0, y: mode === 'tweets' ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: mode === 'tweets' ? -20 : 20 }}
          transition={{ duration: 0.3 }}
          tabIndex={0}
        >
          {mode === 'tweets' ? <TweetsFeed /> : <ShortsFeed />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
