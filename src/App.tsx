import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { TweetsFeed } from './components/TweetsFeed';
import { ShortsFeed } from './components/ShortsFeed';

function App() {
  const [mode, setMode] = useState<'tweets' | 'shorts'>('tweets');
  const feedRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-20 mb-16 md:mb-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            ref={feedRef}
            key={mode}
            initial={{ opacity: 0, x: mode === 'tweets' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'tweets' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {mode === 'tweets' ? (
              <TweetsFeed onModeChange={setMode} />
            ) : (
              <ShortsFeed onModeChange={setMode} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
