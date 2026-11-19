'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CartItem {
  id: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  price: number;
  formattedPrice: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const formattedTotal = total > 0 ? `$${total.toLocaleString()}` : '$0';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#EAEAE7]">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#888884] block">
                  TASA Haute Joaillerie
                </span>
                <h2 className="text-xl font-serif-display text-[#111111]">
                  Cart ({items.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-[#888884] hover:text-[#111111] transition-colors cursor-pointer p-2"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Items Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#EAEAE7]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#888884]">
                  <p className="text-[14px] text-[#555552] mb-2">Your cart is currently empty</p>
                  <p className="text-[12px] max-w-xs mb-6">
                    Configure your loose diamond specification and add it to your selection.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-[13px] text-[#111111] border-b border-[#111111] pb-0.5 hover:opacity-70 transition-opacity cursor-pointer font-medium"
                  >
                    Configure a Diamond →
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-serif-display text-[#111111]">
                          {item.carat.toFixed(2)} ct {item.shape} Diamond
                        </h3>
                        <p className="text-[12px] text-[#888884] mt-0.5">
                          Color {item.color} &middot; Clarity {item.clarity} &middot; GIA / IGI Verified
                        </p>
                      </div>
                      <span className="text-sm font-serif-display text-[#111111] tabular-nums">
                        {item.formattedPrice}
                      </span>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[11px] text-[#888884] hover:text-[#111111] transition-colors cursor-pointer underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="border-t border-[#EAEAE7] px-6 py-6 bg-[#FAFAF8] flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-[#888884]">Estimated Total</span>
                  <span className="text-2xl font-serif-display text-[#111111] tabular-nums">
                    {formattedTotal}
                  </span>
                </div>

                <p className="text-[11px] text-[#888884] leading-relaxed">
                  Includes insured courier transit, master gemological certificate, and sovereign provenance documentation.
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onCheckout}
                    className="w-full bg-[#111111] text-white py-3.5 px-6 text-[13px] font-medium tracking-wide hover:opacity-90 transition-opacity cursor-pointer text-center"
                  >
                    Proceed to Reserve →
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-2.5 text-[12px] text-[#888884] hover:text-[#111111] transition-colors cursor-pointer text-center"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
