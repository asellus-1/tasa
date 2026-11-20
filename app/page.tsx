'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Header from '@/components/Header';
import Footer, { WHATSAPP_URL } from '@/components/Footer';
import Loader from '@/components/Loader';
import ConsultationModal from '@/components/ConsultationModal';
import { DiamondShape } from '@/lib/dimensions';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string };
  image: string;
  imageAlt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'vault',
    title: 'Certified Loose Diamonds.',
    subtitle: 'Sourced directly from primary cutting facilities in Surat and Mumbai. Graded by GIA and IGI with verified laser inscriptions.',
    primaryCta: { label: 'Explore', href: '/vault' },
    secondaryCta: { label: 'Get Assistance' },
    image: '/editorial/loose.jpg',
    imageAlt: 'Certified Loose Diamonds',
  },
  {
    id: 'atelier',
    title: 'Crafted Around Your Diamond.',
    subtitle: 'Solitaire engagement rings, eternity bands, and bespoke fine jewelry handcrafted to your exact specifications.',
    primaryCta: { label: 'Explore', href: '/custom-jewelry' },
    secondaryCta: { label: 'Get Assistance' },
    image: '/editorial/custom.jpg',
    imageAlt: 'Handcrafted Custom Jewelry Atelier',
  },
];

interface CutDetail {
  id: DiamondShape;
  numeral: string;
  name: string;
  quote: string;
  facets: string;
  description: string;
  bestFor: string;
  image: string;
}

const CUTS: CutDetail[] = [
  {
    id: 'round',
    numeral: 'I',
    name: 'Round Brilliant',
    quote: 'The universal benchmark for optical fire and light return.',
    facets: '57-58 facets',
    description: 'Cut with 57 or 58 facets to reflect the highest amount of white light. Standardized by GIA, it is the only diamond shape with an internationally certified cut grade.',
    bestFor: 'Classic solitaire rings, four-prong mountings, and stud earrings.',
    image: '/shapes/round.png',
  },
  {
    id: 'oval',
    numeral: 'II',
    name: 'Oval Cut',
    quote: 'Elongated fire with generous surface coverage on the finger.',
    facets: '56-58 facets',
    description: 'Shares the brilliant facet structure of a round diamond in an elongated silhouette. Its longer table covers greater surface area per carat on the hand.',
    bestFor: 'Solitaire rings, bezel mountings, and east-west or three-stone settings.',
    image: '/shapes/oval.png',
  },
  {
    id: 'emerald',
    numeral: 'III',
    name: 'Emerald Cut',
    quote: 'Architectural step facets with clean, geometric light flashes.',
    facets: 'Rectangular step cut',
    description: 'Features parallel rectangular step facets and cropped corners. Rather than scattered sparkle, it produces bold reflections with open optical transparency.',
    bestFor: 'Art deco solitaires, bezel pendants, and channel-set eternity bands.',
    image: '/shapes/emerald.png',
  },
  {
    id: 'pear',
    numeral: 'IV',
    name: 'Pear Cut',
    quote: 'An organic teardrop uniting round fire with a tapered tip.',
    facets: '58 facets',
    description: 'Combines a rounded brilliant base with a tapered marquise point. It lengthens the finger and looks distinctive in both north-south and east-west orientations.',
    bestFor: 'Pendants, drop earrings, and modern solitaire engagement rings.',
    image: '/shapes/pear.png',
  },
  {
    id: 'radiant',
    numeral: 'V',
    name: 'Radiant Cut',
    quote: 'An emerald silhouette electrified with 70 brilliant facets.',
    facets: '70 facets',
    description: 'Combines the beveled rectangle of an emerald cut with 70 brilliant-cut pavilion facets. It produces multi-directional sparkle and conceals minor natural inclusions.',
    bestFor: 'Solitaires, halo rings, and three-stone engagement settings.',
    image: '/shapes/radiant.png',
  },
];

interface FeaturedStone {
  id: string;
  shape: DiamondShape;
  shapeLabel: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  lab: 'GIA' | 'IGI';
  certNumber: string;
  price: string;
  image: string;
}

const FEATURED_STONES: FeaturedStone[] = [
  {
    id: 'TAS-1015',
    shape: 'round',
    shapeLabel: 'Round Brilliant',
    carat: 1.52,
    color: 'D',
    clarity: 'VVS1',
    cut: 'Ideal',
    lab: 'GIA',
    certNumber: '2498110482',
    price: '$8,900',
    image: '/shapes/round.png',
  },
  {
    id: 'TAS-2014',
    shape: 'oval',
    shapeLabel: 'Oval Cut',
    carat: 2.01,
    color: 'E',
    clarity: 'VS1',
    cut: 'Excellent',
    lab: 'IGI',
    certNumber: 'LG612984102',
    price: '$7,650',
    image: '/shapes/oval.png',
  },
  {
    id: 'TAS-3012',
    shape: 'emerald',
    shapeLabel: 'Emerald Cut',
    carat: 2.50,
    color: 'F',
    clarity: 'VVS2',
    cut: 'Excellent',
    lab: 'GIA',
    certNumber: '6481928019',
    price: '$11,200',
    image: '/shapes/emerald.png',
  },
  {
    id: 'TAS-5011',
    shape: 'radiant',
    shapeLabel: 'Radiant Cut',
    carat: 1.82,
    color: 'E',
    clarity: 'VS1',
    cut: 'Ideal',
    lab: 'IGI',
    certNumber: 'LG621094812',
    price: '$6,400',
    image: '/shapes/radiant.png',
  },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [activeCutIndex, setActiveCutIndex] = useState<number>(0);
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  // Auto-advance hero slides every 6.5 seconds
  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 6500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  const handleManualSlide = (index: number) => {
    setActiveSlide(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(nextSlide, 6500);
    }
  };

  // On desktop screens, full-page scroll progression drives the 5 diamond shapes
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const rawIndex = Math.floor(latest * CUTS.length);
      const clampedIndex = Math.min(CUTS.length - 1, Math.max(0, rawIndex));
      setActiveCutIndex(clampedIndex);
    }
  });

  const scrollToCut = (idx: number) => {
    setActiveCutIndex(idx);
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const container = showcaseRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const totalScrollableDistance = container.offsetHeight - window.innerHeight;
      if (totalScrollableDistance > 0) {
        const fraction = (idx + 0.35) / CUTS.length;
        window.scrollTo({
          top: containerTop + fraction * totalScrollableDistance,
          behavior: 'smooth',
        });
      }
    }
  };

  const currentSlide = HERO_SLIDES[activeSlide];
  const activeCut = CUTS[activeCutIndex];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111111] flex flex-col justify-between selection:bg-[#111111] selection:text-white font-sans antialiased">
      {/* Session-Aware Loader */}
      <Loader onComplete={() => { }} />

      {/* Main Navigation Header */}
      <Header onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="w-full flex-1">

        {/* ========================================================= */}
        {/* 1. CINEMATIC CAMPAIGN HERO                                */}
        {/* ========================================================= */}
        <section className="relative w-full h-[76vh] sm:h-[82vh] lg:h-[88vh] min-h-[560px] max-h-[920px] bg-[#0E0E0E] text-white overflow-hidden border-b border-[#222222]">

          {/* Animated Background Canvas */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentSlide.image}
                alt={currentSlide.imageAlt}
                fill
                priority
                className="object-cover object-center filter contrast-[1.05] brightness-[0.85]"
                sizes="100vw"
              />
              {/* Cinematic Vignette Overlay for Crisp Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent hidden sm:block" />
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Campaign"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Campaign"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Foreground Editorial Text & Actions */}
          <div className="relative z-10 w-full h-full max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="max-w-2xl text-left space-y-4"
              >
                {/* Main Headline */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-normal tracking-[-0.015em] leading-[1.1] text-white">
                  {currentSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-[14px] sm:text-[16px] text-white/80 font-light leading-relaxed max-w-lg">
                  {currentSlide.subtitle}
                </p>

                {/* Dual Campaign Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href={currentSlide.primaryCta.href}
                    className="min-h-[46px] px-8 bg-white text-[#111111] text-[12px] tracking-[0.1em] uppercase font-medium hover:bg-[#FAF9F6] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{currentSlide.primaryCta.label}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setConsultationOpen(true)}
                    className="min-h-[46px] px-8 bg-transparent border border-white text-white text-[12px] tracking-[0.1em] uppercase font-medium hover:bg-white/10 active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer"
                  >
                    {currentSlide.secondaryCta.label}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Progress Indicators */}
            <div className="flex items-center gap-2.5 pt-8">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => handleManualSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-[2px] transition-all cursor-pointer ${isActive ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
                      }`}
                  />
                );
              })}
            </div>
          </div>

        </section>

        {/* ========================================================= */}
        {/* VALUE BAR: Clean 3-Pillar Assurance Strip                 */}
        {/* ========================================================= */}
        <section className="w-full bg-[#FAF9F6] border-b border-[#EAEAE7] py-6 px-6 sm:px-10 lg:px-12">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div>
              <p className="font-serif text-base text-[#111111]">GIA &amp; IGI Certified</p>
              <p className="text-[12px] text-[#7A7A75] mt-0.5">Every diamond laser-inscribed &amp; verified</p>
            </div>
            <div>
              <p className="font-serif text-base text-[#111111]">Primary Source Value</p>
              <p className="text-[12px] text-[#7A7A75] mt-0.5">Zero distributor or showroom markup</p>
            </div>
            <div>
              <p className="font-serif text-base text-[#111111]">Insured Armored Delivery</p>
              <p className="text-[12px] text-[#7A7A75] mt-0.5">Full transit coverage directly to your door</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. STORE CATEGORIES: Clean 3-Column Grid                  */}
        {/* ========================================================= */}
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-12 border-b border-[#EAEAE7]">
          <div className="max-w-[1240px] mx-auto min-w-0">

            <div className="max-w-xl mb-10 text-left">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal">
                Loose Stones &amp; Settings.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

              {/* Category 1: Loose Diamonds */}
              <Link
                href="/vault"
                className="group block bg-[#FAF9F6] border border-[#EAEAE7] p-6 sm:p-7 space-y-4 hover:border-[#111111] transition-colors text-left"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border border-[#EAEAE7]">
                  <Image
                    src="/editorial/stone.jpg"
                    alt="Loose Certified Diamonds"
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl text-[#111111]">Loose Diamonds</h3>
                  <p className="text-[13px] text-[#555552] font-light leading-relaxed">
                    Filter over a thousand GIA and IGI certified stones by carat, color, clarity, and dimensions.
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-[#111111] border-b border-[#111111] pb-0.5 inline-flex items-center gap-1.5">
                    <span>Explore</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>

              {/* Category 2: Custom Rings */}
              <Link
                href="/custom-jewelry"
                className="group block bg-[#FAF9F6] border border-[#EAEAE7] p-6 sm:p-7 space-y-4 hover:border-[#111111] transition-colors text-left"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border border-[#EAEAE7]">
                  <Image
                    src="/editorial/ring.jpg"
                    alt="Custom Engagement Rings"
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl text-[#111111]">Custom Engagement Rings</h3>
                  <p className="text-[13px] text-[#555552] font-light leading-relaxed">
                    Solitaires, three-stone rings, and bands handcrafted in Platinum, 18K Yellow Gold, or Rose Gold.
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-[#111111] border-b border-[#111111] pb-0.5 inline-flex items-center gap-1.5">
                    <span>Explore</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>

              {/* Category 3: Fine Jewelry */}
              <Link
                href="/custom-jewelry"
                className="group block bg-[#FAF9F6] border border-[#EAEAE7] p-6 sm:p-7 space-y-4 hover:border-[#111111] transition-colors text-left"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border border-[#EAEAE7]">
                  <Image
                    src="/editorial/pendant.jpg"
                    alt="Custom Diamond Jewelry"
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg sm:text-xl text-[#111111]">Tennis Bracelets &amp; Pendants</h3>
                  <p className="text-[13px] text-[#555552] font-light leading-relaxed">
                    Diamond tennis bracelets, bezel pendants, and four-prong stud earrings handcrafted to order.
                  </p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-[0.08em] font-medium text-[#111111] border-b border-[#111111] pb-0.5 inline-flex items-center gap-1.5">
                    <span>Explore</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>

            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. ELEVATED STICKY SCROLLER: FIVE DIAMOND SHAPES          */}
        {/* ========================================================= */}
        <section ref={showcaseRef} className="relative w-full h-auto lg:h-[300vh] bg-[#FAF9F6] border-b border-[#EAEAE7]">

          {/* Pinned Stage on Desktop, Natural Fluid Flow on Mobile/Tablet */}
          <div className="relative lg:sticky lg:top-0 h-auto lg:h-screen w-full flex flex-col justify-center px-4 sm:px-8 lg:px-12 overflow-visible lg:overflow-hidden py-12 sm:py-16 lg:py-0">
            <div className="max-w-[1240px] w-full mx-auto min-w-0">

              {/* Header & Clickable Tab Strip */}
              <div className="mb-6 sm:mb-8 text-left min-w-0">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal">
                  Compare the Five Core Cuts.
                </h2>
                <p className="text-[13px] sm:text-[14px] text-[#555552] font-light max-w-xl mt-1.5 leading-relaxed">
                  Each shape has different facet arrangements and proportions. Select a shape or scroll down to compare them.
                </p>

                {/* Fluid Shape Jump Tabs - Edge-to-edge scrollable on mobile */}
                <div className="flex items-center gap-2 sm:gap-3 pt-4 sm:pt-6 border-b border-[#EAEAE7] pb-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap -mx-4 px-4 sm:mx-0 sm:px-0">
                  {CUTS.map((cut, idx) => {
                    const isActive = idx === activeCutIndex;
                    return (
                      <button
                        key={cut.id}
                        type="button"
                        onClick={() => scrollToCut(idx)}
                        className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[12px] tracking-[0.08em] uppercase transition-all rounded-full cursor-pointer shrink-0 ${isActive
                          ? 'bg-[#111111] text-white font-medium shadow-sm'
                          : 'bg-transparent text-[#7A7A75] hover:text-[#111111] hover:bg-[#EAEAE7]/50'
                          }`}
                      >
                        {cut.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Side-by-Side Matched Exhibition Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 items-stretch min-w-0">

                {/* LEFT COLUMN: Diamond Stage */}
                <div className="lg:col-span-6 min-w-0">
                  <div className="relative bg-white border border-[#EAEAE7] p-5 sm:p-7 lg:p-8 flex flex-col justify-between h-[300px] sm:h-[350px] lg:h-[390px]">

                    {/* Floating Diamond Canvas */}
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 flex items-center justify-center mx-auto my-auto">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeCut.id}
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="relative w-full h-full flex items-center justify-center"
                        >
                          <Image
                            src={activeCut.image}
                            alt={activeCut.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 150px, (max-width: 1024px) 190px, 230px"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Bottom Bar: Name & Button */}
                    <div className="w-full pt-3.5 sm:pt-4 border-t border-[#EAEAE7] flex items-center justify-between text-left">
                      <div>
                        <span className="font-serif text-lg sm:text-xl lg:text-2xl text-[#111111] block leading-tight">{activeCut.name}</span>
                        <span className="text-[11px] sm:text-[12px] text-[#7A7A75] font-light">{activeCut.facets}</span>
                      </div>

                      <Link
                        href={`/vault?shape=${activeCut.id}`}
                        className="px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#111111] text-white text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium hover:bg-black transition-colors inline-flex items-center gap-1.5 shrink-0"
                      >
                        <span>Explore {activeCut.name}</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>

                  </div>
                </div>

                {/* RIGHT COLUMN: Clean Branded Details Card */}
                <div className="lg:col-span-6 min-w-0">
                  <div className="relative bg-white border border-[#EAEAE7] p-5 sm:p-7 lg:p-8 flex flex-col justify-between h-auto min-h-[260px] sm:min-h-[300px] lg:h-[390px] text-left">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCut.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="h-full flex flex-col justify-between"
                      >
                        <div className="space-y-3 sm:space-y-3.5">
                          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#111111]">
                            {activeCut.name}
                          </h3>

                          <p className="text-[13px] sm:text-[14px] text-[#555552] font-light leading-relaxed">
                            {activeCut.description}
                          </p>

                          <p className="text-[12px] sm:text-[13px] text-[#555552] leading-relaxed pt-1">
                            <span className="font-medium text-[#111111]">Common Settings:</span>{' '}
                            <span className="font-light">{activeCut.bestFor}</span>
                          </p>
                        </div>

                        <div className="pt-4 mt-4 lg:mt-0 border-t border-[#EAEAE7]">
                          <Link
                            href={`/vault?shape=${activeCut.id}`}
                            className="inline-flex items-center gap-2 text-[11px] sm:text-[12px] font-medium text-[#111111] hover:text-[#555552] uppercase tracking-[0.08em] transition-colors"
                          >
                            <span>Search {activeCut.name} Diamonds in The Vault</span>
                            <span aria-hidden="true">&rarr;</span>
                          </Link>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. FEATURED STONES: Clean Product List                    */}
        {/* ========================================================= */}
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-12 border-b border-[#EAEAE7]">
          <div className="max-w-[1240px] mx-auto min-w-0">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 text-left">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal">
                  Featured Diamonds.
                </h2>
                <p className="text-[14px] text-[#555552] font-light mt-1.5">
                  Stones currently available in our vault with verified certificates and pricing.
                </p>
              </div>

              <Link
                href="/vault"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#111111] hover:text-[#555552] border-b border-[#111111] pb-0.5 tracking-wider transition-colors self-start sm:self-auto"
              >
                <span>Explore All</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {FEATURED_STONES.map((stone) => (
                <div
                  key={stone.id}
                  className="bg-[#FAF9F6] border border-[#EAEAE7] p-5 sm:p-6 flex flex-col justify-between hover:border-[#111111] transition-colors text-left"
                >
                  <div>
                    {/* Certification Badge */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#7A7A75] mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#7A7A75]">Certified Diamond</span>
                      <span className="px-2 py-0.5 bg-white border border-[#EAEAE7] text-[#111111]">
                        {stone.lab} {stone.certNumber}
                      </span>
                    </div>

                    {/* Stone Image */}
                    <div className="relative w-full h-28 flex items-center justify-center my-3">
                      <div className="relative w-20 h-20">
                        <Image
                          src={stone.image}
                          alt={stone.shapeLabel}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                    </div>

                    {/* Stone Specs */}
                    <div className="space-y-0.5 mb-4">
                      <p className="font-serif text-xl text-[#111111]">
                        {stone.carat.toFixed(2)} Carat {stone.shapeLabel}
                      </p>
                      <p className="text-[12px] text-[#555552]">
                        {stone.color} Color · {stone.clarity} Clarity · {stone.cut} Cut
                      </p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#EAEAE7] flex items-center justify-between">
                    <div>
                      <span className="text-[16px] font-serif font-normal text-[#111111]">{stone.price}</span>
                    </div>

                    <Link
                      href={`/vault?shape=${stone.shape}`}
                      className="min-h-[34px] px-3.5 bg-[#111111] text-white text-[11px] tracking-wider uppercase font-medium hover:bg-black transition-colors flex items-center justify-center"
                    >
                      View Stone
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CUSTOM JEWELRY: Clean, honest explanation              */}
        {/* ========================================================= */}
        <section className="w-full bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-12 border-b border-[#EAEAE7]">
          <div className="max-w-[1240px] mx-auto min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

              {/* Left Column: Workshop Photo */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border border-[#EAEAE7]">
                  <Image
                    src="/editorial/custom-orders.jpg"
                    alt="Custom jewelry design and craftsmanship"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Right Column: Custom Jewelry Information */}
              <div className="lg:col-span-6 space-y-5 text-left">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal leading-[1.15]">
                  How Custom Orders Work.
                </h2>

                <p className="text-[14px] sm:text-[15px] text-[#555552] font-light leading-relaxed">
                  If you want a finished piece of jewelry rather than a loose stone, our goldsmiths can set your diamond into a custom ring, pendant, or bracelet.
                </p>

                <div className="space-y-3 pt-1 text-[13px] text-[#555552] font-light">
                  <div className="flex items-start gap-2.5">
                    <span className="font-medium text-[#111111]">1.</span>
                    <p><strong className="font-medium text-[#111111]">Choose your diamond:</strong> Select a certified stone from our inventory or tell us what specifications you need.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-medium text-[#111111]">2.</span>
                    <p><strong className="font-medium text-[#111111]">Review the 3D CAD design:</strong> We share 3D digital renders with exact millimeter dimensions for your approval before casting.</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="font-medium text-[#111111]">3.</span>
                    <p><strong className="font-medium text-[#111111]">Casting and setting:</strong> Handcrafted in Platinum, 18K Yellow Gold, or Rose Gold in Mumbai or Surat, hallmarked, and delivered with full transit insurance.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/custom-jewelry"
                    className="inline-flex items-center justify-center min-h-[46px] px-7 bg-[#111111] text-white text-[12px] tracking-[0.08em] uppercase font-medium hover:bg-black transition-colors gap-2"
                  >
                    <span>Explore Custom Jewelry</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. THE 4CS GUIDE: Restrained, Informative Gemology         */}
        {/* ========================================================= */}
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-12 border-b border-[#EAEAE7]">
          <div className="max-w-[1240px] mx-auto min-w-0 text-left">

            <div className="max-w-xl mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal">
                Understanding the 4Cs.
              </h2>
              <p className="text-[14px] text-[#555552] font-light mt-1.5 leading-relaxed">
                Four criteria determine a diamond’s price and appearance. Here is what actually matters when choosing a stone:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-10">

              <div className="border-t border-[#111111] pt-5 space-y-1.5">
                <h3 className="font-serif text-xl text-[#111111]">Cut</h3>
                <p className="text-[13px] text-[#555552] font-light leading-relaxed">
                  Cut quality determines how much light the stone reflects back to your eye. Stones with an Ideal cut return the most brilliance, while stones cut too deep or shallow leak light.
                </p>
              </div>

              <div className="border-t border-[#111111] pt-5 space-y-1.5">
                <h3 className="font-serif text-xl text-[#111111]">Color</h3>
                <p className="text-[13px] text-[#555552] font-light leading-relaxed">
                  Diamonds are graded from D (colorless) to Z (light yellow or brown). Grades D, E, and F look completely icy white face up. G and H stones offer strong value with very little visible warmth.
                </p>
              </div>

              <div className="border-t border-[#111111] pt-5 space-y-1.5">
                <h3 className="font-serif text-xl text-[#111111]">Clarity</h3>
                <p className="text-[13px] text-[#555552] font-light leading-relaxed">
                  Clarity measures natural internal markings under 10x magnification. Most VS1 and VS2 diamonds are completely eye-clean, meaning no imperfections are visible to the naked eye.
                </p>
              </div>

              <div className="border-t border-[#111111] pt-5 space-y-1.5">
                <h3 className="font-serif text-xl text-[#111111]">Carat</h3>
                <p className="text-[13px] text-[#555552] font-light leading-relaxed">
                  Carat is a unit of weight (1 carat = 0.20 grams), not millimeter width. A properly cut stone will look larger than a poorly cut stone of the same carat weight.
                </p>
              </div>

            </div>

            <div>
              <Link
                href="/education"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#111111] hover:text-[#555552] border-b border-[#111111] pb-0.5 tracking-wider transition-colors"
              >
                <span>Read the Guide</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. ADVISORY & DIRECT CONTACT                              */}
        {/* ========================================================= */}
        <section className="w-full bg-[#FAF9F6] py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-12">
          <div className="max-w-[1240px] mx-auto min-w-0">
            <div className="border border-[#EAEAE7] bg-white p-8 sm:p-14 lg:p-16 text-center max-w-2xl mx-auto space-y-5">

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal leading-tight">
                Speak with Our Team.
              </h2>

              <p className="text-[14px] sm:text-[15px] text-[#555552] font-light leading-relaxed max-w-lg mx-auto">
                If you need help reviewing a GIA or IGI certificate, sourcing a specific diamond cut, or discussing a custom ring design, our team is available to assist you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[46px] px-7 bg-[#111111] text-white text-[12px] tracking-[0.08em] uppercase font-medium hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Chat on WhatsApp</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>

                <button
                  type="button"
                  onClick={() => setConsultationOpen(true)}
                  className="w-full sm:w-auto min-h-[46px] px-7 bg-transparent border border-[#111111] text-[#111111] text-[12px] tracking-[0.08em] uppercase font-medium hover:bg-[#FAF9F6] active:scale-[0.98] transition-all flex items-center justify-center cursor-pointer"
                >
                  Get Assistance
                </button>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Luxury Brand Footer */}
      <Footer onOpenConsultation={() => setConsultationOpen(true)} />

      {/* Free Consultation Modal */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
