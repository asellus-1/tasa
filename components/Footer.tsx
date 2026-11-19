'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=918962630767&text=Hello%2C+I+need+consultation+regarding+loose+stone+diamonds.&type=phone_number&app_absent=0';

interface FooterProps {
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const pathname = usePathname();
  const isProductPage = pathname === '/';
  return (
    <footer className="w-full border-t border-[#EAEAE7] bg-[#FAF9F6] text-[#111111]">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-[#EAEAE7] bg-white py-6 px-4 sm:px-8 md:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">

          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-8 h-8 rounded-full bg-[#F4F4F0] flex items-center justify-center shrink-0 text-[#111111]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-medium tracking-wide">GIA & IGI Certified</p>
              <p className="text-[11px] text-[#6E6E6A]">Every stone laser-inscribed & verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-8 h-8 rounded-full bg-[#F4F4F0] flex items-center justify-center shrink-0 text-[#111111]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75a1.125 1.125 0 00-1.125-1.125H5.625A1.125 1.125 0 004.5 3.75v10.5m9-6.75h-9" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-medium tracking-wide">Fully Insured Transit</p>
              <p className="text-[11px] text-[#6E6E6A]">Armored couriers with tamper seals</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-8 h-8 rounded-full bg-[#F4F4F0] flex items-center justify-center shrink-0 text-[#111111]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-medium tracking-wide">100% Conflict-Free</p>
              <p className="text-[11px] text-[#6E6E6A]">Kimberley Process guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center sm:justify-start">
            <div className="w-8 h-8 rounded-full bg-[#F4F4F0] flex items-center justify-center shrink-0 text-[#111111]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-medium tracking-wide">Direct Source Pricing</p>
              <p className="text-[11px] text-[#6E6E6A]">Zero retail overhead markups</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Navigation & Brand Story */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand Column (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/tasa-logo.webp"
                alt="TASA"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-[#6E6E6A] max-w-md pt-1">
              Certified loose diamonds graded by GIA and IGI, sourced directly from primary cutting centers. Inspected under magnification and delivered with full transit insurance.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 text-[12px] font-medium text-[#111111] hover:text-[#555552] border-b border-[#111111] pb-0.5 tracking-wider transition-colors"
              >
                <span>Speak with a Diamond Concierge</span>
                <span aria-hidden="true">;</span>
              </button>
            </div>
          </div>

          {/* Nav Column 1: The Collection (Col 6-7) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[12px] uppercase font-semibold tracking-[0.1em] text-[#111111]">The Vault</p>
            <ul className="space-y-2 text-[13px] text-[#6E6E6A]">
              <li>
                <Link href="/" className="hover:text-[#111111] transition-colors">
                  Interactive Configurator
                </Link>
              </li>
              <li>
                <Link href="/?shape=round" className="hover:text-[#111111] transition-colors">
                  Round Brilliant
                </Link>
              </li>
              <li>
                <Link href="/?shape=oval" className="hover:text-[#111111] transition-colors">
                  Oval Cut
                </Link>
              </li>
              <li>
                <Link href="/?shape=emerald" className="hover:text-[#111111] transition-colors">
                  Emerald Cut
                </Link>
              </li>
              <li>
                <Link href="/?shape=pear" className="hover:text-[#111111] transition-colors">
                  Pear &amp; Radiant
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 2: Guidance & Atelier (Col 8-9) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[12px] uppercase font-semibold tracking-[0.1em] text-[#111111]">Guidance &amp; Atelier</p>
            <ul className="space-y-2 text-[13px] text-[#6E6E6A]">
              <li>
                <Link href="/education" className="hover:text-[#111111] transition-colors">
                  The 4Cs Diamond Guide
                </Link>
              </li>
              <li>
                <Link href="/custom-jewelry" className="hover:text-[#111111] transition-colors">
                  Custom Jewelry (Coming Soon)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#111111] transition-colors">
                  About TASA Provenance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#111111] transition-colors">
                  FAQ &amp; Certification
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Concierge & Direct Contact (Col 10-12) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[12px] uppercase font-semibold tracking-[0.1em] text-[#111111]">Private Concierge</p>
            <div className="space-y-2 text-[13px] text-[#6E6E6A]">
              <p>Mon – Sat &middot; 10:00 – 19:00 IST</p>
              {!isProductPage && (
                <p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#111111] font-medium hover:text-[#555552] transition-colors underline underline-offset-2 inline-flex items-center gap-1"
                  >
                    <span>WhatsApp Concierge</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </p>
              )}
              <p>
                <Link href="/contact" className="hover:text-[#111111] transition-colors underline underline-offset-2">
                  Request Diamond Video (40x HD)
                </Link>
              </p>
              <p>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="hover:text-[#111111] transition-colors underline underline-offset-2 text-left"
                >
                  Schedule Private Call
                </button>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Protocol */}
      <div className="border-t border-[#EAEAE7] bg-[#F5F4F0] py-5 px-4 sm:px-8 md:px-12 text-[11px] text-[#888884]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© 2026 TASA &middot; Certified Loose Diamonds. All rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 text-[#6E6E6A]">
            <span>GIA &amp; IGI Registered Reports</span>
            <span>&middot;</span>
            <span>Kimberley Process Compliant</span>
            <span>&middot;</span>
            <span>Secured Armored Handover</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
