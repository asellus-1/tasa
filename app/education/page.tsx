'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';

type FourCTab = 'cut' | 'color' | 'clarity' | 'carat';

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState<FourCTab>('cut');
  const [consultationOpen, setConsultationOpen] = useState(false);

  const tabs: { id: FourCTab; number: string; title: string; subtitle: string }[] = [
    { id: 'cut', number: '01', title: 'Cut', subtitle: 'Brilliance & Light Return' },
    { id: 'color', number: '02', title: 'Color', subtitle: 'Purity & Absence of Tint' },
    { id: 'clarity', number: '03', title: 'Clarity', subtitle: 'Natural Characteristics' },
    { id: 'carat', number: '04', title: 'Carat', subtitle: 'Weight & Physical Spread' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between selection:bg-[#111111] selection:text-white">
      <Header onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 lg:py-24">

        {/* Minimal Hero Header */}
        <header className="max-w-2xl space-y-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#888884] font-medium">
            Education
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-normal leading-[1.08]">
            The 4Cs of Diamond Brilliance
          </h1>
          <p className="text-base sm:text-lg text-[#6E6E6A] font-light leading-relaxed pt-1">
            The GIA grading system measures four distinct variables: Cut, Color, Clarity, and Carat. Here is how to navigate the technical criteria to find exceptional beauty.
          </p>
        </header>

        {/* Clean, Spacious Tab Navigation */}
        <nav aria-label="4Cs Navigation" className="mt-12 sm:mt-20 border-b border-[#EAEAE7]">
          <div className="flex gap-6 sm:gap-14 overflow-x-auto no-scrollbar -mb-px -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-5 text-left cursor-pointer relative shrink-0 transition-colors ${isActive
                      ? 'text-[#111111]'
                      : 'text-[#888884] hover:text-[#111111]'
                    }`}
                >
                  <span className="text-[11px] tracking-wider text-[#888884] block font-mono">
                    {tab.number}
                  </span>
                  <span className="text-base sm:text-lg font-medium block mt-1">
                    {tab.title}
                  </span>
                  <span className="text-[12px] text-[#888884] block mt-0.5 hidden sm:block">
                    {tab.subtitle}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeEducationTab"
                      className="absolute -bottom-px left-0 right-0 h-[2px] bg-[#111111]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Spacious Tab Content */}
        <div className="mt-14 sm:mt-20">

          {/* CUT */}
          {activeTab === 'cut' && (
            <div className="space-y-16 max-w-4xl">
              <div className="space-y-6">
                <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal leading-tight">
                  Cut controls light return, fire, and sparkle.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#555552] leading-relaxed font-light">
                  Cut measures how accurately each facet is angled and proportioned. Even a stone with pure colorless grading will appear dull if cut too shallow or too deep. When facets meet at precise angles, light enters the table, reflects internally off the pavilion walls, and bounces directly back to the eye.
                </p>
              </div>

              {/* Minimal Line Scale */}
              <div className="space-y-4 pt-2">
                <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
                  The GIA Cut Scale
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
                  <div className="border-t border-[#111111] pt-4 space-y-1">
                    <p className="font-medium text-[15px] text-[#111111]">Excellent / Ideal</p>
                    <p className="text-[13px] text-[#6E6E6A]">Maximum fire and brilliance. Reflects virtually all incoming light.</p>
                  </div>
                  <div className="border-t border-[#D0D0CE] pt-4 space-y-1">
                    <p className="font-medium text-[15px] text-[#111111]">Very Good</p>
                    <p className="text-[13px] text-[#6E6E6A]">High brilliance. Minor light escapes through the bottom.</p>
                  </div>
                  <div className="border-t border-[#EAEAE7] pt-4 space-y-1">
                    <p className="font-medium text-[15px] text-[#888884]">Good</p>
                    <p className="text-[13px] text-[#888884]">Noticeable light loss through sides and base.</p>
                  </div>
                  <div className="border-t border-[#EAEAE7] pt-4 space-y-1">
                    <p className="font-medium text-[15px] text-[#888884]">Fair &middot; Poor</p>
                    <p className="text-[13px] text-[#888884]">Dull or glassy appearance with minimal scintillation.</p>
                  </div>
                </div>
              </div>

              {/* Editorial Pull Quote / Insight */}
              <div className="border-l border-[#111111] pl-6 sm:pl-8 py-2 my-10 space-y-2">
                <p className="text-[11px] uppercase tracking-widest text-[#888884] font-medium">
                  TASA Guidance
                </p>
                <p className="font-serif-display text-2xl sm:text-3xl text-[#111111] leading-snug">
                  Never compromise on Cut. It is the only C directly controlled by human craftsmanship.
                </p>
                <p className="text-[14px] text-[#6E6E6A] pt-1 leading-relaxed max-w-2xl">
                  You can safely select F or G in Color, or VS2 in Clarity, and the stone will look completely pristine. But an inferior cut cannot be concealed. Every diamond in the TASA vault is curated strictly with Excellent or Ideal cut standards.
                </p>
              </div>

              {/* The Three Light Properties */}
              <div className="pt-6 space-y-6">
                <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
                  The Three Visual Components of Light
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
                  <div className="space-y-1.5">
                    <p className="text-[14px] font-medium text-[#111111]">Brilliance</p>
                    <p className="text-[13px] text-[#6E6E6A] leading-relaxed font-light">
                      The brightness created by the combination of all white light reflections from the surface and interior of a polished diamond.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[14px] font-medium text-[#111111]">Fire</p>
                    <p className="text-[13px] text-[#6E6E6A] leading-relaxed font-light">
                      The dispersion of light into flashes of rainbow colors visible when turning the diamond under ambient illumination.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[14px] font-medium text-[#111111]">Scintillation</p>
                    <p className="text-[13px] text-[#6E6E6A] leading-relaxed font-light">
                      The pattern of light and dark areas and the sparkle produced when the diamond, you, or the light source moves.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COLOR */}
          {activeTab === 'color' && (
            <div className="space-y-16 max-w-4xl">
              <div className="space-y-6">
                <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal leading-tight">
                  Color grading evaluates the complete absence of hue.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#555552] leading-relaxed font-light">
                  A structurally pure and chemically clean diamond has no hue, resembling a drop of pure water. The GIA color grading system measures the degree of colorlessness on a scale from D (colorless) to Z (light yellow or brown).
                </p>
              </div>

              {/* Minimal Line Scale */}
              <div className="space-y-4 pt-2">
                <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
                  The GIA Color Spectrum
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-2">
                  <div className="border-t border-[#111111] pt-4 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <p className="font-medium text-[16px] text-[#111111]">D, E, F</p>
                      <span className="text-[11px] text-[#888884] uppercase tracking-wider">Colorless</span>
                    </div>
                    <p className="text-[13px] text-[#6E6E6A] leading-relaxed">
                      The rarest chromatic tier. Stones display an icy, crystalline white appearance without the slightest hint of warmth.
                    </p>
                  </div>

                  <div className="border-t border-[#111111] pt-4 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <p className="font-medium text-[16px] text-[#111111]">G, H, I, J</p>
                      <span className="text-[11px] text-[#888884] uppercase tracking-wider">Near Colorless</span>
                    </div>
                    <p className="text-[13px] text-[#6E6E6A] leading-relaxed">
                      To the untrained eye, these stones appear completely colorless face-up, especially once mounted in platinum or white gold.
                    </p>
                  </div>

                  <div className="border-t border-[#EAEAE7] pt-4 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <p className="font-medium text-[16px] text-[#888884]">K &ndash; M</p>
                      <span className="text-[11px] text-[#888884] uppercase tracking-wider">Faint Warmth</span>
                    </div>
                    <p className="text-[13px] text-[#888884] leading-relaxed">
                      Exhibits a faint yellow or champagne warmth. Often paired with yellow gold settings for vintage aesthetics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Editorial Pull Quote */}
              <div className="border-l border-[#111111] pl-6 sm:pl-8 py-2 my-10 space-y-2">
                <p className="text-[11px] uppercase tracking-widest text-[#888884] font-medium">
                  TASA Guidance
                </p>
                <p className="font-serif-display text-2xl sm:text-3xl text-[#111111] leading-snug">
                  The smart collector&apos;s choice is F or G.
                </p>
                <p className="text-[14px] text-[#6E6E6A] pt-1 leading-relaxed max-w-2xl">
                  While D represents absolute technical perfection, an F or G diamond is visually indistinguishable to the naked eye once set into fine jewelry. Choosing F or G allows you to maximize carat weight without any visible compromise.
                </p>
              </div>
            </div>
          )}

          {/* CLARITY */}
          {activeTab === 'clarity' && (
            <div className="space-y-16 max-w-4xl">
              <div className="space-y-6">
                <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal leading-tight">
                  Clarity measures natural internal characteristics.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#555552] leading-relaxed font-light">
                  Natural diamonds form deep underground under extreme heat and pressure. Nearly all diamonds contain microscopic crystal inclusions. What matters most to the wearer is whether a stone is eye-clean (inclusions invisible without a 10x gemological loupe).
                </p>
              </div>

              {/* Minimal Line Scale */}
              <div className="space-y-4 pt-2">
                <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
                  The Clarity Scale
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 pt-2">
                  <div className="border-t border-[#111111] pt-4 space-y-1.5">
                    <p className="font-medium text-[15px] text-[#111111]">FL &middot; IF</p>
                    <p className="text-[11px] uppercase tracking-wider text-[#888884]">Flawless</p>
                    <p className="text-[13px] text-[#6E6E6A]">No inclusions visible under 10x magnification. Museum rarity.</p>
                  </div>

                  <div className="border-t border-[#111111] pt-4 space-y-1.5">
                    <p className="font-medium text-[15px] text-[#111111]">VVS1 &middot; VVS2</p>
                    <p className="text-[11px] uppercase tracking-wider text-[#888884]">Very Very Slightly Included</p>
                    <p className="text-[13px] text-[#6E6E6A]">Inclusions are difficult for even a skilled gemologist to see under 10x magnification.</p>
                  </div>

                  <div className="border-t border-[#111111] pt-4 space-y-1.5">
                    <p className="font-medium text-[15px] text-[#111111]">VS1 &middot; VS2</p>
                    <p className="text-[11px] uppercase tracking-wider text-[#111111] font-medium">100% Eye-Clean</p>
                    <p className="text-[13px] text-[#6E6E6A]">Inclusions are minor and invisible to the naked eye. The preferred collector grade.</p>
                  </div>

                  <div className="border-t border-[#EAEAE7] pt-4 space-y-1.5">
                    <p className="font-medium text-[15px] text-[#888884]">SI1 &middot; SI2</p>
                    <p className="text-[11px] uppercase tracking-wider text-[#888884]">Slightly Included</p>
                    <p className="text-[13px] text-[#888884]">Inclusions are noticeable under 10x magnification and may be eye-visible in certain shapes.</p>
                  </div>
                </div>
              </div>

              {/* Editorial Pull Quote */}
              <div className="border-l border-[#111111] pl-6 sm:pl-8 py-2 my-10 space-y-2">
                <p className="text-[11px] uppercase tracking-widest text-[#888884] font-medium">
                  TASA Guidance
                </p>
                <p className="font-serif-display text-2xl sm:text-3xl text-[#111111] leading-snug">
                  Do not pay for microscopic perfection you cannot see.
                </p>
                <p className="text-[14px] text-[#6E6E6A] pt-1 leading-relaxed max-w-2xl">
                  A VS1 or VS2 diamond looks identical to a Flawless diamond under normal daylight. The difference is only visible under a 10x laboratory microscope. Investing in VS clarity provides the best balance of aesthetic beauty and investment value.
                </p>
              </div>
            </div>
          )}

          {/* CARAT */}
          {activeTab === 'carat' && (
            <div className="space-y-16 max-w-4xl">
              <div className="space-y-6">
                <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal leading-tight">
                  Carat measures weight. Millimeter spread determines visible size.
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#555552] leading-relaxed font-light">
                  One carat equals exactly 0.20 grams. Two diamonds of identical carat weight can look noticeably different in size depending on shape. Elongated cuts like Ovals, Emeralds, and Pears distribute weight across a larger surface area, appearing roughly 10% larger face-up than a round cut of identical weight.
                </p>
              </div>

              {/* Minimal Line Scale */}
              <div className="space-y-4 pt-2">
                <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
                  Round Brilliant Face-Up Diameters
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
                  <div className="border-t border-[#111111] pt-4 space-y-1">
                    <p className="font-serif-display text-2xl text-[#111111]">1.00 ct</p>
                    <p className="text-[13px] text-[#6E6E6A] font-mono">&asymp; 6.5 mm</p>
                    <p className="text-[12px] text-[#888884]">Classic solitaire standard</p>
                  </div>

                  <div className="border-t border-[#111111] pt-4 space-y-1">
                    <p className="font-serif-display text-2xl text-[#111111]">1.50 ct</p>
                    <p className="text-[13px] text-[#6E6E6A] font-mono">&asymp; 7.3 mm</p>
                    <p className="text-[12px] text-[#888884]">Strong presence &amp; balance</p>
                  </div>

                  <div className="border-t border-[#111111] pt-4 space-y-1">
                    <p className="font-serif-display text-2xl text-[#111111]">2.00 ct</p>
                    <p className="text-[13px] text-[#6E6E6A] font-mono">&asymp; 8.1 mm</p>
                    <p className="text-[12px] text-[#888884]">Substantial statement</p>
                  </div>

                  <div className="border-t border-[#111111] pt-4 space-y-1">
                    <p className="font-serif-display text-2xl text-[#111111]">3.00 ct</p>
                    <p className="text-[13px] text-[#6E6E6A] font-mono">&asymp; 9.3 mm</p>
                    <p className="text-[12px] text-[#888884]">Exceptional rare tier</p>
                  </div>
                </div>
              </div>

              {/* Editorial Pull Quote */}
              <div className="border-l border-[#111111] pl-6 sm:pl-8 py-2 my-10 space-y-2">
                <p className="text-[11px] uppercase tracking-widest text-[#888884] font-medium">
                  TASA Guidance
                </p>
                <p className="font-serif-display text-2xl sm:text-3xl text-[#111111] leading-snug">
                  Look just below the whole carat benchmarks.
                </p>
                <p className="text-[14px] text-[#6E6E6A] pt-1 leading-relaxed max-w-2xl">
                  Diamond prices jump significantly at 1.00ct, 1.50ct, and 2.00ct. By choosing a 1.40ct or 1.90ct diamond, you achieve virtually identical millimeter spread while saving meaningful budget that can be reinvested into superior cut or color.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Minimal Anatomy Section */}
        <section aria-labelledby="anatomy-heading" className="mt-24 sm:mt-32 pt-16 border-t border-[#EAEAE7]">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#888884] font-medium">
              Anatomy
            </p>
            <h2 id="anatomy-heading" className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal">
              The Architecture of a Brilliant Cut
            </h2>
            <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
              A standard round brilliant diamond features 57 or 58 facets precisely angled to act as internal mirrors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mt-10 pt-4 text-[13px]">
            <div className="space-y-1">
              <p className="font-medium text-[#111111]">Table</p>
              <p className="text-[12px] text-[#6E6E6A] leading-relaxed">The flat upper surface that captures direct overhead light.</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-[#111111]">Crown</p>
              <p className="text-[12px] text-[#6E6E6A] leading-relaxed">The angled upper section between the table and girdle.</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-[#111111]">Girdle</p>
              <p className="text-[12px] text-[#6E6E6A] leading-relaxed">The perimeter boundary where the GIA laser report is inscribed.</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-[#111111]">Pavilion</p>
              <p className="text-[12px] text-[#6E6E6A] leading-relaxed">The lower cone that reflects light back upward to the crown.</p>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <p className="font-medium text-[#111111]">Culet</p>
              <p className="text-[12px] text-[#6E6E6A] leading-relaxed">The tiny facet at the bottom tip that prevents chipping.</p>
            </div>
          </div>
        </section>

        {/* Minimal Bottom CTA */}
        <section aria-labelledby="cta-heading" className="mt-24 pt-16 border-t border-[#EAEAE7] space-y-4">
          <h3 id="cta-heading" className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal">
            Explore Certified Diamonds in The Vault
          </h3>
          <p className="text-[14px] text-[#6E6E6A] font-light max-w-xl">
            Filter by your desired shape, carat, color, and clarity with real-time transparent pricing.
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-6">
            <Link
              href="/"
              className="bg-[#111111] text-white py-3 px-7 text-[13px] font-medium tracking-wide hover:bg-[#2A2A28] transition-colors"
            >
              Open Configurator ;
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=918962630767&text=Hello%2C+I+need+consultation+regarding+loose+stone+diamonds.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-[#111111] hover:text-[#555552] underline underline-offset-4"
            >
              Ask a Gemologist on WhatsApp ;
            </a>
          </div>
        </section>

      </main>

      <Footer onOpenConsultation={() => setConsultationOpen(true)} />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
