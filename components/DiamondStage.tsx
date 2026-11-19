'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { DiamondShape } from '@/lib/dimensions';

interface DiamondStageProps {
  shape: DiamondShape;
  carat?: number;
}

interface ShapeVisualConfig {
  src: string;
  alt: string;
  shadowWidth: string;
  contactWidth: string;
}

const SHAPE_CONFIG: Record<DiamondShape, ShapeVisualConfig> = {
  round: {
    src: '/shapes/round.png',
    alt: 'Round Brilliant Cut Diamond',
    shadowWidth: '66%',
    contactWidth: '32%',
  },
  oval: {
    src: '/shapes/oval.png',
    alt: 'Oval Cut Diamond',
    shadowWidth: '54%',
    contactWidth: '26%',
  },
  emerald: {
    src: '/shapes/emerald.png',
    alt: 'Emerald Cut Diamond',
    shadowWidth: '52%',
    contactWidth: '26%',
  },
  pear: {
    src: '/shapes/pear.png',
    alt: 'Pear Cut Diamond',
    shadowWidth: '48%',
    contactWidth: '22%',
  },
  radiant: {
    src: '/shapes/radiant.png',
    alt: 'Radiant Cut Diamond',
    shadowWidth: '54%',
    contactWidth: '28%',
  },
  princess: {
    src: '/shapes/radiant.png',
    alt: 'Princess Cut Diamond',
    shadowWidth: '56%',
    contactWidth: '28%',
  },
  cushion: {
    src: '/shapes/radiant.png',
    alt: 'Cushion Cut Diamond',
    shadowWidth: '56%',
    contactWidth: '28%',
  },
  marquise: {
    src: '/shapes/oval.png',
    alt: 'Marquise Cut Diamond',
    shadowWidth: '50%',
    contactWidth: '22%',
  },
};

export default function DiamondStage({ shape, carat = 1.5 }: DiamondStageProps) {
  const config = SHAPE_CONFIG[shape] || SHAPE_CONFIG.round;

  // Gentle, realistic scale adjustment based on carat (0.5ct to 3.0ct)
  const caratScale = Math.min(Math.max(Math.pow(carat / 1.5, 0.2), 0.88), 1.1);

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-6 sm:py-10 lg:py-14">
      {/* Diamond Showcase Stage */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[440px] min-h-[360px] sm:min-h-[420px] lg:min-h-[460px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={shape}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: caratScale }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center justify-center"
          >
            {/* Diamond Image with alpha-following perimeter contrast shadow */}
            <div className="relative flex items-center justify-center h-[280px] sm:h-[340px] lg:h-[380px] w-full px-4">
              <Image
                src={config.src}
                alt={config.alt}
                width={740}
                height={740}
                priority
                className="w-auto h-full max-h-[280px] sm:max-h-[340px] lg:max-h-[380px] object-contain pointer-events-none select-none transition-all duration-300"
                style={{
                  filter:
                    'drop-shadow(0 20px 32px rgba(0, 0, 0, 0.09)) drop-shadow(0 6px 14px rgba(0, 0, 0, 0.05)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.07))',
                }}
              />
            </div>

            {/* Subtle Ground / Contact Cast Shadow Underneath the Stone */}
            <div
              className="w-full flex flex-col items-center justify-center pointer-events-none mt-2 sm:mt-3"
              aria-hidden="true"
            >
              {/* Soft ambient floor diffusion */}
              <div
                className="h-5 sm:h-7 rounded-[100%] transition-all duration-400 ease-out"
                style={{
                  width: config.shadowWidth,
                  background:
                    'radial-gradient(ellipse at center, rgba(17, 17, 17, 0.16) 0%, rgba(17, 17, 17, 0.05) 48%, transparent 72%)',
                  filter: 'blur(8px)',
                }}
              />
              {/* Tighter culet contact shadow directly underneath */}
              <div
                className="h-2 rounded-[100%] -mt-3 sm:-mt-4 transition-all duration-400 ease-out"
                style={{
                  width: config.contactWidth,
                  background:
                    'radial-gradient(ellipse at center, rgba(17, 17, 17, 0.25) 0%, rgba(17, 17, 17, 0.08) 50%, transparent 80%)',
                  filter: 'blur(3px)',
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
