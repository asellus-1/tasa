'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || loading) return;
    setLoading(true);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          type: 'consultation',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Consultation lead submission error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/35 backdrop-blur-[4px] cursor-pointer"
        />

        {/* Minimal Dialog with Apple Critically-Damped Spring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-sm max-h-[92vh] overflow-y-auto bg-white border border-[#EAEAE7] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-10"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 text-[#888884] hover:text-[#111111] transition-colors cursor-pointer text-base p-1"
            aria-label="Close"
          >
            &times;
          </button>

          {!submitted ? (
            <div className="space-y-5">
              {/* Headline & description */}
              <div>
                <h3 className="font-serif-display text-2xl text-[#111111]">
                  Speak with a Specialist
                </h3>
                <p className="text-[13px] text-[#6E6E6A] mt-1.5 leading-relaxed">
                  One of our diamond advisors will reach out shortly. Just say hi when we connect.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 text-base sm:text-[13.5px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors placeholder:text-[#A0A09C]"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-3.5 py-2.5 text-base sm:text-[13.5px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors placeholder:text-[#A0A09C]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#111111] text-white py-3 px-4 text-[13px] font-medium tracking-wide hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer text-center"
                  >
                    {loading ? 'Submitting...' : 'Request Consultation →'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-4 space-y-3">
              <h3 className="font-serif-display text-xl text-[#111111]">
                Thank you, {name}.
              </h3>
              <p className="text-[13px] text-[#6E6E6A] leading-relaxed">
                An advisor will reach out to you shortly at <span className="text-[#111111] font-medium">{phone}</span> Just say hi when we connect!
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2 text-[12px] bg-[#111111] text-white hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
