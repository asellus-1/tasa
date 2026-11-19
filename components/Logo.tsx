'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animate?: boolean;
  strokeColor?: string;
  fillColor?: string;
}

export default function Logo({
  className = 'w-auto h-6',
  animate = false,
  strokeColor = '#111111',
  fillColor = '#111111',
}: LogoProps) {
  const strokeTransition = {
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const pathProps = animate
    ? {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: strokeTransition,
      }
    : {};

  return (
    <svg
      viewBox="0 0 200 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TASA"
    >
      {/* T */}
      <motion.path
        d="M 12 12 L 40 12 M 26 12 L 26 36 M 20 36 L 32 36"
        stroke={animate ? strokeColor : fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
      {/* A */}
      <motion.path
        d="M 52 36 L 66 12 L 80 36 M 57 28 L 75 28 M 48 36 L 56 36 M 76 36 L 84 36"
        stroke={animate ? strokeColor : fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(animate ? { ...pathProps, transition: { ...strokeTransition, delay: 0.12 } } : {})}
      />
      {/* S */}
      <motion.path
        d="M 116 16 C 114 13 110 12 105 12 C 97 12 92 16 92 21 C 92 29 116 27 116 34 C 116 38 111 40 104 40 C 97 40 91 37 90 32"
        stroke={animate ? strokeColor : fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(animate ? { ...pathProps, transition: { ...strokeTransition, delay: 0.24 } } : {})}
      />
      {/* A */}
      <motion.path
        d="M 136 36 L 150 12 L 164 36 M 141 28 L 159 28 M 132 36 L 140 36 M 160 36 L 168 36"
        stroke={animate ? strokeColor : fillColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(animate ? { ...pathProps, transition: { ...strokeTransition, delay: 0.36 } } : {})}
      />
    </svg>
  );
}
