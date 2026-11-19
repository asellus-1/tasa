'use client';

import React from 'react';
import { DiamondShape } from '@/lib/dimensions';
import { DiamondColor, DiamondClarity, COLOR_BANDS } from '@/lib/diamonds';
import { MatchResult } from '@/lib/pricing';

interface ConfiguratorPanelProps {
  shape: DiamondShape;
  setShape: (shape: DiamondShape) => void;
  carat: number;
  setCarat: (carat: number) => void;
  color: DiamondColor;
  setColor: (color: DiamondColor) => void;
  clarity: DiamondClarity;
  setClarity: (clarity: DiamondClarity) => void;
  matchResult: MatchResult;
  onBuyNow: () => void;
}

// Exactly 5 cuts: Round, Oval, Emerald, Pear, Radiant
const SHAPES: { id: DiamondShape; name: string }[] = [
  { id: 'round', name: 'Round' },
  { id: 'oval', name: 'Oval' },
  { id: 'emerald', name: 'Emerald' },
  { id: 'pear', name: 'Pear' },
  { id: 'radiant', name: 'Radiant' },
];

// Discrete carat snap benchmarks
const SNAP_CARATS = [0.50, 1.00, 1.50, 2.00, 3.00];

const COLORS: DiamondColor[] = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

const CLARITIES: { id: DiamondClarity; desc: string }[] = [
  { id: 'FL', desc: 'Flawless' },
  { id: 'IF', desc: 'Internally Flawless' },
  { id: 'VVS1', desc: 'Very Very Slightly Included' },
  { id: 'VVS2', desc: 'Very Very Slightly Included' },
  { id: 'VS1', desc: 'Very Slightly Included' },
  { id: 'VS2', desc: 'Very Slightly Included' },
  { id: 'SI1', desc: 'Slightly Included' },
  { id: 'SI2', desc: 'Slightly Included' },
];

export default function ConfiguratorPanel({
  shape,
  setShape,
  carat,
  setCarat,
  color,
  setColor,
  clarity,
  setClarity,
  matchResult,
  onBuyNow,
}: ConfiguratorPanelProps) {
  const { count, formattedMinPrice } = matchResult;

  const colorGroupText = COLOR_BANDS.COLORLESS.includes(color)
    ? 'Colorless'
    : COLOR_BANDS.NEAR_COLORLESS.includes(color)
      ? 'Near Colorless'
      : 'Faint Warmth';

  const clarityDesc = CLARITIES.find((c) => c.id === clarity)?.desc || '';

  // Find index of current carat in snap list
  const currentSnapIndex = SNAP_CARATS.findIndex((c) => Math.abs(c - carat) < 0.05);
  const activeIndex = currentSnapIndex !== -1 ? currentSnapIndex : 2;
  const progressPercent = (activeIndex / (SNAP_CARATS.length - 1)) * 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    if (idx >= 0 && idx < SNAP_CARATS.length) {
      setCarat(SNAP_CARATS[idx]);
    }
  };

  const formattedShape = shape.charAt(0).toUpperCase() + shape.slice(1);

  return (
    <div className="w-full flex flex-col space-y-8 py-2 max-w-[540px]">

      {/* Title & Live Pricing Header */}
      <div className="space-y-2 border-b border-[#EAEAE7] pb-6">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#888884] font-medium block">
          Loose Diamond
        </span>

        <h1 className="font-serif-display text-3xl sm:text-4xl text-[#111111] leading-tight transition-all duration-300">
          {carat.toFixed(2)} Carat {formattedShape} Diamond
        </h1>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div className="text-2xl sm:text-3xl font-normal text-[#111111] tabular-nums font-serif-display">
            {formattedMinPrice}
          </div>
          <div className="text-[12px] sm:text-[13px] text-[#888884]">
            {count} available
          </div>
        </div>
      </div>

      {/* 1. SHAPE SELECTOR */}
      <div className="space-y-3">
        <span className="text-[12px] uppercase tracking-[0.16em] text-[#888884] block font-medium">
          Shape
        </span>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px]">
          {SHAPES.map((s) => {
            const isSelected = shape === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setShape(s.id)}
                className={`transition-colors cursor-pointer pb-1 ${isSelected
                  ? 'text-[#111111] font-medium border-b border-[#111111]'
                  : 'text-[#888884] hover:text-[#111111]'
                  }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CARAT WEIGHT */}
      <div className="space-y-4 border-t border-[#EAEAE7] pt-6">
        <span className="text-[12px] uppercase tracking-[0.16em] text-[#888884] block font-medium">
          Carat
        </span>

        <div className="relative py-4 select-none">
          <div className="relative h-[2px] w-full bg-[#EAEAE7]">
            <div
              className="absolute left-0 top-0 h-full bg-[#111111] transition-all duration-150 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="relative w-full flex justify-between mt-3">
            {SNAP_CARATS.map((sc, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={sc}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setCarat(sc)}
                >
                  <div
                    className={`w-[1px] h-2 mb-1.5 transition-colors ${isSelected ? 'bg-[#111111]' : 'bg-[#D6D6D2]'
                      }`}
                  />
                  <span
                    className={`text-[12px] tabular-nums transition-colors ${isSelected
                      ? 'text-[#111111] font-medium'
                      : 'text-[#888884]'
                      }`}
                  >
                    {sc.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <input
            type="range"
            min={0}
            max={SNAP_CARATS.length - 1}
            step={1}
            value={activeIndex}
            onChange={handleSliderChange}
            aria-label="Carat weight dragger"
            className="absolute inset-x-0 top-2 w-full opacity-0 cursor-ew-resize h-8"
          />

          <div
            className="absolute top-[11px] -ml-[7px] w-3.5 h-3.5 rounded-full bg-[#111111] border-2 border-white shadow-xs pointer-events-none transition-all duration-150 ease-out"
            style={{ left: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 3. COLOR GRADE */}
      <div className="space-y-3 border-t border-[#EAEAE7] pt-6">
        <div className="flex items-center justify-between text-[12px]">
          <span className="uppercase tracking-[0.16em] text-[#888884] font-medium">
            Color
          </span>
          <span className="text-[#888884] font-normal">
            {colorGroupText}
          </span>
        </div>

        <div className="grid grid-cols-10 text-center text-[13px] sm:text-[14px]">
          {COLORS.map((col) => {
            const isSelected = color === col;
            return (
              <button
                key={col}
                type="button"
                onClick={() => setColor(col)}
                className={`transition-colors cursor-pointer py-1.5 ${isSelected
                  ? 'text-[#111111] font-medium border-b border-[#111111]'
                  : 'text-[#888884] hover:text-[#111111]'
                  }`}
              >
                {col}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. CLARITY GRADE */}
      <div className="space-y-3 border-t border-[#EAEAE7] pt-6">
        <div className="flex items-center justify-between text-[12px]">
          <span className="uppercase tracking-[0.16em] text-[#888884] font-medium">
            Clarity
          </span>
          <span className="text-[#888884] font-normal">
            {clarityDesc}
          </span>
        </div>

        <div className="grid grid-cols-8 text-center text-[11.5px] sm:text-[13px]">
          {CLARITIES.map((c) => {
            const isSelected = clarity === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setClarity(c.id)}
                className={`transition-colors cursor-pointer py-1.5 ${isSelected
                  ? 'text-[#111111] font-medium border-b border-[#111111]'
                  : 'text-[#888884] hover:text-[#111111]'
                  }`}
              >
                {c.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. PRIMARY CTA: BUY NOW (OPENS INVENTORY TABLE BELOW) */}
      <div className="space-y-3 border-t border-[#EAEAE7] pt-8">
        <button
          type="button"
          onClick={onBuyNow}
          className="w-full bg-[#111111] text-white py-4 px-6 text-[13px] font-medium tracking-wide hover:opacity-90 transition-opacity cursor-pointer text-center"
        >
          Buy Now
        </button>

        <p className="text-[11px] text-[#888884] pt-1 text-center sm:text-left leading-relaxed">
          GIA &amp; IGI certified &middot; Conflict-free provenance &middot; Insured courier delivery
        </p>
      </div>

    </div>
  );
}
