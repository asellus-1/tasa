'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DiamondClarity } from '@/lib/diamonds';
import { DiamondShape } from '@/lib/dimensions';
import { getClarityInclusions } from '@/lib/diamondVisual';
import DiamondFacets from './DiamondFacets';

interface LoupeLensProps {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  active: boolean;
  clarity: DiamondClarity;
  shape: DiamondShape;
  colorTint: string;
  tintOpacity: number;
  onClose: () => void;
}

export default function LoupeLens({
  x,
  y,
  active,
  clarity,
  shape,
  colorTint,
  tintOpacity,
  onClose,
}: LoupeLensProps) {
  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, onClose]);

  if (!active) return null;

  const inclusions = getClarityInclusions(clarity);

  return (
    <motion.div
      className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 10x Optical Lens Circle in Light Mode */}
      <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-2 border-[#111111] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.15)] overflow-hidden">
        
        {/* Subtle glass reflection curvature */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/50 to-white/80 pointer-events-none z-20" />

        {/* 10x Magnified Diamond Lines */}
        <div className="absolute inset-0 flex items-center justify-center scale-[2.2] transform origin-center">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <DiamondFacets shape={shape} colorTint={colorTint} tintOpacity={tintOpacity} />
          </svg>
        </div>

        {/* Inclusions inside lens */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {inclusions.map((inc) => (
            <div
              key={inc.id}
              className="absolute"
              style={{
                left: `${inc.x}%`,
                top: `${inc.y}%`,
                transform: `translate(-50%, -50%) rotate(${inc.rotation || 0}deg)`,
              }}
            >
              {inc.type === 'pinpoint' && (
                <div
                  className="rounded-full bg-[#111111]"
                  style={{
                    width: `${inc.size * 2}px`,
                    height: `${inc.size * 2}px`,
                    opacity: inc.opacity,
                  }}
                />
              )}

              {inc.type === 'crystal' && (
                <div
                  className="rounded-[0.5px] bg-[#111111] border border-black/40"
                  style={{
                    width: `${inc.size * 2}px`,
                    height: `${inc.size * 1.5}px`,
                    opacity: inc.opacity,
                  }}
                />
              )}

              {inc.type === 'feather' && (
                <div
                  className="bg-[#111111]"
                  style={{
                    width: `${inc.size * 3}px`,
                    height: '1px',
                    opacity: inc.opacity,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Lens badge */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-white/90 border border-[#EAEAE7] px-2.5 py-0.5 rounded-full text-[10px] tracking-wider text-[#111111] shadow-sm font-medium">
          10× Loupe · {clarity}
        </div>
      </div>
    </motion.div>
  );
}
