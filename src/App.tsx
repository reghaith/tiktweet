import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { TweetsFeed } from './components/TweetsFeed';
import { ShortsFeed } from './components/ShortsFeed';

function App() {
  const [mode, setMode] = useState<'tweets' | 'shorts'>('tweets');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mode]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation mode={mode} onModeChange={setMode} />

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: mode === 'tweets' ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: mode === 'tweets' ? -20 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {mode === 'tweets' ? <TweetsFeed /> : <ShortsFeed />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
