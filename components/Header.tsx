'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Persist the last active indicator position across page transitions
let prevNavIndicator = { x: 0, width: 0, set: false };

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const [indicator, setIndicator] = useState<{ x: number; width: number; ready: boolean }>({
    x: prevNavIndicator.x,
    width: prevNavIndicator.width,
    ready: prevNavIndicator.set,
  });

  const navLinks = [
    { label: 'The Vault', href: '/' },
    { label: 'The 4Cs Guide', href: '/education' },
    { label: 'Custom Jewelry', href: '/custom-jewelry' },
    { label: 'About', href: '/about' },
    { label: 'FAQ & Contact', href: '/contact' },
  ];

  useIsomorphicLayoutEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLElement>('[data-nav-active="true"]');
    if (activeEl) {
      const x = activeEl.offsetLeft;
      const width = activeEl.offsetWidth;
      setIndicator({ x, width, ready: true });
      prevNavIndicator = { x, width, set: true };
    } else {
      setIndicator((prev) => ({ ...prev, ready: false }));
    }
  }, [pathname]);

  return (
    <header className="h-16 sm:h-20 w-full bg-white/85 backdrop-blur-md border-b border-[#EAEAE7]/80 sticky top-0 z-40 transition-all">
      <div className="w-full max-w-[1440px] mx-auto h-full px-4 sm:px-8 md:px-12 flex items-center justify-between">
        
        {/* Left: Official TASA Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="TASA Loose Diamonds">
          <img
            src="/tasa-logo.webp"
            alt="TASA"
            className="h-7 sm:h-8 md:h-9 w-auto object-contain"
          />
        </Link>

        {/* Center: Desktop Navigation Links with horizontal-only Apple slide */}
        <nav
          ref={navRef}
          className="hidden lg:flex items-center gap-7 text-[13px] tracking-[0.04em] relative py-1"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-nav-active={isActive ? 'true' : 'false'}
                className={`transition-colors duration-200 py-1 ${
                  isActive
                    ? 'text-[#111111] font-medium'
                    : 'text-[#6E6E6A] hover:text-[#111111]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Sliding underline bar - strictly horizontal, impossible to jump from bottom of screen */}
          {indicator.ready && (
            <motion.div
              className="absolute -bottom-0.5 left-0 h-[1.5px] bg-[#111111] pointer-events-none"
              initial={
                prevNavIndicator.set
                  ? { x: prevNavIndicator.x, width: prevNavIndicator.width }
                  : false
              }
              animate={{
                x: indicator.x,
                width: indicator.width,
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="text-[12px] sm:text-[13px] font-medium text-[#111111] hover:text-[#555552] active:scale-[0.98] border-b border-[#111111] pb-0.5 transition-all cursor-pointer tracking-wide hidden sm:inline-block"
          >
            Get a Free Consultation
          </button>

          {/* Mobile Hamburger Toggle with 44px touch target */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-[#111111] hover:text-[#6E6E6A] active:scale-95 transition-transform"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white/98 backdrop-blur-md border-b border-[#EAEAE7] overflow-hidden shadow-lg"
          >
            <div className="px-5 py-5 space-y-4">
              <nav className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-3.5 text-[15.5px] tracking-wide transition-colors flex items-center justify-between border-b border-[#F4F4F0] last:border-b-0 ${
                        isActive
                          ? 'text-[#111111] font-semibold'
                          : 'text-[#6E6E6A] hover:text-[#111111]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsultation?.();
                  }}
                  className="w-full text-center py-3.5 px-4 bg-[#111111] text-white text-[13.5px] font-medium tracking-wide active:scale-[0.98] transition-transform"
                >
                  Get a Free Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
