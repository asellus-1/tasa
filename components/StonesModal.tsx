'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond } from '@/lib/diamonds';

interface StonesModalProps {
  isOpen: boolean;
  onClose: () => void;
  stones: Diamond[];
  onBuyNowStone: (stone: Diamond) => void;
  onAddToCartStone: (stone: Diamond) => void;
}

export default function StonesModal({
  isOpen,
  onClose,
  stones,
  onBuyNowStone,
  onAddToCartStone,
}: StonesModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-xs cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-white border border-[#EAEAE7] rounded-sm shadow-2xl flex flex-col z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#EAEAE7] flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#888884] font-medium block">
                TASA Vault &middot; Physical Inventory
              </span>
              <h3 className="text-xl font-serif-display text-[#111111]">
                Available Vault Stones ({stones.length})
              </h3>
              <p className="text-[12px] text-[#6E6E6A] mt-0.5">
                Every loose stone is certified by GIA or IGI with laser-inscribed girdle numerals.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#6E6E6A] hover:text-[#111111] transition-colors cursor-pointer text-lg"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Stones List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#EAEAE7]">
            {stones.length === 0 ? (
              <div className="p-12 text-center text-[#6E6E6A]">
                <p className="text-lg font-medium text-[#111111]">Vault Allocation In Progress</p>
                <p className="text-[13px] mt-1">Our master gemologists are verifying loose stones for this specification.</p>
              </div>
            ) : (
              stones.map((stone) => (
                <div
                  key={stone.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-serif-display text-[#111111]">
                        {stone.carat.toFixed(2)} Carat {stone.shape.charAt(0).toUpperCase() + stone.shape.slice(1)}
                      </span>
                      <span className="px-2 py-0.5 bg-[#F4F4F2] text-[#111111] text-[11px] font-medium tracking-wide">
                        {stone.color} &middot; {stone.clarity} &middot; {stone.cut}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#6E6E6A] tabular-nums">
                      <span>{stone.lab}: <strong>{stone.certNumber}</strong></span>
                      <span>&bull;</span>
                      <span>{stone.measurements}</span>
                      <span>&bull;</span>
                      <span>Table: {stone.tablePct}%</span>
                      <span>&bull;</span>
                      <span>Depth: {stone.depthPct}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EAEAE7]">
                    <div className="text-left sm:text-right">
                      <div className="text-xl font-serif-display text-[#111111] tabular-nums">
                        ${stone.price.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-[#888884]">
                        Vault status: Ready
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCartStone(stone);
                        }}
                        className="px-3.5 py-2 text-[12px] font-medium border border-[#EAEAE7] hover:border-[#111111] text-[#111111] transition-colors cursor-pointer"
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onBuyNowStone(stone);
                          onClose();
                        }}
                        className="px-4 py-2 text-[12px] font-medium bg-[#111111] hover:opacity-90 text-white transition-opacity cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
