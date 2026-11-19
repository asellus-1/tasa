'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const LETTERS = [
  { id: 't', src: '/letters/t.png', alt: 'T', delay: 0.05 },
  { id: 'a1', src: '/letters/a1.png', alt: 'A', delay: 0.22 },
  { id: 's', src: '/letters/s.png', alt: 'S', delay: 0.39 },
  { id: 'a2', src: '/letters/a2.png', alt: 'A', delay: 0.56 },
];

export default function Loader({ onComplete }: LoaderProps) {
  // Phases: 'animating' (staggered entry) -> 'fading' (dissolve) -> 'done'
  const [phase, setPhase] = useState<'animating' | 'fading' | 'done'>(() => {
    if (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('skipLoader') === 'true'
    ) {
      return 'done';
    }
    return 'animating';
  });
  const [glintActive, setGlintActive] = useState(false);

  useEffect(() => {
    if (phase === 'done') {
      onComplete();
      return;
    }

    // Trigger the creative gold light sweep after letters land
    const tGlint = setTimeout(() => {
      setGlintActive(true);
    }, 950);

    // Begin luxury dissolve
    const tFade = setTimeout(() => {
      setPhase('fading');
    }, 1800);

    // Complete reveal
    const tDone = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2400);

    return () => {
      clearTimeout(tGlint);
      clearTimeout(tFade);
      clearTimeout(tDone);
    };
  }, [onComplete, phase]);

  if (phase === 'done') {
    return null;
  }

  const easeLuxury = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      <motion.div
        key="tasa-creative-loader"
        initial={{ opacity: 1 }}
        animate={phase === 'fading' ? { opacity: 0 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: easeLuxury }}
        className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center select-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          animate={phase === 'fading' ? { y: -8, scale: 0.98 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: easeLuxury }}
          className="flex flex-col items-center text-center px-6"
        >
          {/* Staggered 4-Letter Wordmark Container */}
          <div className="relative overflow-hidden py-2 px-3">
            <div className="flex items-end justify-center gap-1.5 sm:gap-2 h-14 sm:h-20">
              {LETTERS.map((letter) => (
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, y: 22, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: letter.delay,
                    duration: 0.65,
                    ease: easeLuxury,
                  }}
                  className="h-full flex items-end"
                >
                  <img
                    src={letter.src}
                    alt={letter.alt}
                    className="h-full w-auto object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(200,150,50,0.1)]"
                  />
                </motion.div>
              ))}
            </div>

            {/* Creative Specular Light Sweep (The Glint) across all 4 letters */}
            {glintActive && (
              <motion.div
                initial={{ x: '-120%' }}
                animate={{ x: '240%' }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 pointer-events-none w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-25 mix-blend-overlay"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
