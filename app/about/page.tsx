'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';

export default function AboutPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between selection:bg-[#111111] selection:text-white">
      <Header onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 lg:py-24">

        {/* Editorial Heading */}
        <header className="max-w-3xl space-y-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#888884] font-medium">
            About TASA
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-normal leading-[1.08]">
            Direct from cutting centers. Graded by GIA and IGI.
          </h1>
          <p className="text-base sm:text-lg text-[#6E6E6A] font-light leading-relaxed pt-2">
            Most retail diamond markups pay for prime retail rents, broker chains, and months of sitting in display cases. We source directly from certified cutters in Mumbai and Surat so you pay for the diamond, not the storefront.
          </p>
        </header>

        {/* Narrative Section: How Pricing Works */}
        <section aria-labelledby="pricing-heading" className="mt-16 sm:mt-24 pt-12 border-t border-[#EAEAE7] space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
              The Supply Chain
            </p>
            <h2 id="pricing-heading" className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal">
              Why traditional diamond prices are inflated
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 pt-2">
            <div className="space-y-3">
              <p className="text-[14px] font-medium text-[#111111]">The traditional chain</p>
              <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
                A rough diamond travels from the mine to the polisher, then through international brokers, regional distributors, and boutique retailers. Each tier finances inventory on credit and adds a margin to cover physical showroom overheads. By the time a stone reaches a display case, its price can be 40% to 100% higher than its wholesale valuation.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-[14px] font-medium text-[#111111]">The TASA model</p>
              <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
                We work directly with primary diamond polishers. When you select a diamond from our vault, you access current wholesale pricing. The stone is inspected, verified against its lab registry, and shipped directly to you with door-to-door transit insurance.
              </p>
            </div>
          </div>
        </section>

        {/* Core Standards - Clean, Uncluttered List */}
        <section aria-labelledby="standards-heading" className="mt-16 sm:mt-24 pt-12 border-t border-[#EAEAE7] space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
              Standards
            </p>
            <h2 id="standards-heading" className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal">
              How we inspect and verify each diamond
            </h2>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
              <div className="md:col-span-4">
                <span className="font-mono text-[12px] text-[#888884] block">01</span>
                <p className="text-[16px] font-medium text-[#111111] mt-1">Independent Laboratory Reports</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
                  We do not issue in-house certificates or use commercial labs with loose grading standards. Every diamond in the TASA vault is graded independently by the Gemological Institute of America (GIA) or International Gemological Institute (IGI). The certificate number is micro-laser inscribed on the stone&apos;s girdle and verifiable on the official registry.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start border-t border-[#EAEAE7] pt-8">
              <div className="md:col-span-4">
                <span className="font-mono text-[12px] text-[#888884] block">02</span>
                <p className="text-[16px] font-medium text-[#111111] mt-1">Physical 40x Gemological Review</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
                  A certificate lists technical numbers, but it does not tell you if a stone is eye-clean or cloudy. Our gemologists inspect every stone under 40x magnification for milky tint, surface-reaching inclusions, and facet symmetry before release. If a stone passes the cert on paper but looks lifeless in person, we reject it.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start border-t border-[#EAEAE7] pt-8">
              <div className="md:col-span-4">
                <span className="font-mono text-[12px] text-[#888884] block">03</span>
                <p className="text-[16px] font-medium text-[#111111] mt-1">Kimberley Process Compliance</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
                  All diamonds are guaranteed 100% conflict-free. We trade strictly with suppliers who participate in the Kimberley Process Certification Scheme and comply with the System of Warranties established by the World Diamond Council.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section aria-labelledby="contact-heading" className="mt-20 pt-12 border-t border-[#EAEAE7] space-y-4">
          <h3 id="contact-heading" className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal">
            Speak directly with a gemologist
          </h3>
          <p className="text-[14px] text-[#6E6E6A] font-light max-w-xl">
            Ask about a specific stone in our vault, request a 40x HD 360 video, or check availability on custom carats.
          </p>
          <div className="pt-4 flex flex-wrap items-center gap-6">
            <a
              href="https://api.whatsapp.com/send/?phone=918962630767&text=Hello%2C+I+need+consultation+regarding+loose+stone+diamonds.&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#111111] text-white py-3 px-7 text-[13px] font-medium tracking-wide hover:bg-[#2A2A28] transition-colors"
            >
              Chat on WhatsApp ;
            </a>
            <button
              type="button"
              onClick={() => setConsultationOpen(true)}
              className="text-[13px] font-medium text-[#111111] hover:text-[#555552] underline underline-offset-4 cursor-pointer"
            >
              Request a Consultation Call ;
            </button>
            <Link
              href="/"
              className="text-[13px] text-[#888884] hover:text-[#111111] transition-colors"
            >
              Back to The Vault
            </Link>
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
