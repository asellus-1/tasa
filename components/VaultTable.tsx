'use client';

import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Diamond } from '@/lib/diamonds';

interface VaultTableProps {
  isOpen: boolean;
  onClose?: () => void;
  stones: Diamond[];
  onBuyNowStone: (stone: Diamond) => void;
}

const VaultTable = forwardRef<HTMLDivElement, VaultTableProps>(
  ({ isOpen, onClose, stones, onBuyNowStone }, ref) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.section
            ref={ref}
            id="diamonds-table-section"
            initial={{ opacity: 0, height: 0, y: 12 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full border-t border-[#EAEAE7] pt-10 pb-16 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-[#111111]">
                  Available Diamonds ({stones.length})
                </h2>
                <p className="text-[13px] text-[#6E6E6A] mt-1">
                  Select a diamond to purchase.
                </p>
              </div>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[12px] text-[#888884] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  Close &times;
                </button>
              )}
            </div>

            {/* Desktop Table View - STRICTLY: Shape, Price, Carat, Color, Clarity, Cut */}
            <div className="hidden sm:block w-full overflow-x-auto border border-[#EAEAE7]">
              <table className="w-full text-left text-[13.5px] divide-y divide-[#EAEAE7]">
                <thead className="bg-[#FAFAF8] text-[#888884] text-[11px] uppercase tracking-[0.14em]">
                  <tr>
                    <th scope="col" className="py-3.5 px-5 font-medium">Shape</th>
                    <th scope="col" className="py-3.5 px-5 font-medium">Price</th>
                    <th scope="col" className="py-3.5 px-5 font-medium">Carat</th>
                    <th scope="col" className="py-3.5 px-5 font-medium">Color</th>
                    <th scope="col" className="py-3.5 px-5 font-medium">Clarity</th>
                    <th scope="col" className="py-3.5 px-5 font-medium">Cut</th>
                    <th scope="col" className="py-3.5 px-5 font-medium text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAE7] bg-white">
                  {stones.map((stone) => (
                    <tr
                      key={stone.id}
                      className="hover:bg-[#FAFAF8] transition-colors"
                    >
                      <td className="py-4 px-5 font-medium text-[#111111] capitalize">
                        {stone.shape}
                      </td>
                      <td className="py-4 px-5 tabular-nums font-serif-display text-base text-[#111111]">
                        ${stone.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-5 tabular-nums text-[#111111]">
                        {stone.carat.toFixed(2)} ct
                      </td>
                      <td className="py-4 px-5 text-[#111111]">
                        {stone.color}
                      </td>
                      <td className="py-4 px-5 text-[#111111]">
                        {stone.clarity}
                      </td>
                      <td className="py-4 px-5 text-[#111111]">
                        {stone.cut}
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onBuyNowStone(stone)}
                          className="bg-[#111111] text-white py-1.5 px-4 text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          Buy Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="sm:hidden space-y-3">
              {stones.map((stone) => (
                <div
                  key={stone.id}
                  className="p-4 border border-[#EAEAE7] bg-white flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-display text-lg text-[#111111] capitalize">
                        {stone.shape}
                      </span>
                      <span className="text-[13px] text-[#555552] tabular-nums">
                        {stone.carat.toFixed(2)} ct
                      </span>
                    </div>
                    <div className="text-[12px] text-[#888884]">
                      {stone.color} &middot; {stone.clarity} &middot; {stone.cut}
                    </div>
                    <div className="font-serif-display text-base text-[#111111] tabular-nums pt-0.5">
                      ${stone.price.toLocaleString()}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onBuyNowStone(stone)}
                    className="bg-[#111111] text-white py-2 px-4 text-[12px] font-medium hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>

          </motion.section>
        )}
      </AnimatePresence>
    );
  }
);

VaultTable.displayName = 'VaultTable';

export default VaultTable;
