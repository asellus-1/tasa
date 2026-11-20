'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer, { WHATSAPP_URL } from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';

const JEWELRY_TYPES = [
  { id: 'Engagement Ring', label: 'Engagement Ring' },
  { id: 'Diamond Pendant', label: 'Diamond Pendant' },
  { id: 'Ear Studs', label: 'Ear Studs' },
  { id: 'Tennis Bracelet', label: 'Tennis Bracelet' },
  { id: 'Eternity Band', label: 'Eternity Band' },
  { id: 'Custom Design', label: 'Custom Design' },
];

const METALS = ['Platinum 950', '18K Yellow Gold', '18K White Gold', '18K Rose Gold', 'Undecided'];

export default function CustomJewelryPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  // Form State
  const [jewelryType, setJewelryType] = useState('Engagement Ring');
  const [metal, setMetal] = useState('Platinum 950');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          notes: `[Category: ${jewelryType}] [Metal: ${metal}] ${details.trim()}`.trim(),
          type: 'custom_jewelry',
          sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between selection:bg-[#111111] selection:text-white">
      <Header onOpenConsultation={() => setConsultationOpen(true)} />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 lg:py-24">

        {/* Simple & Minimal Hero */}
        <header className="max-w-3xl space-y-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#888884] font-medium">
            Custom Settings
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-normal leading-[1.08]">
            Custom Diamond Jewelry
          </h1>
          <p className="text-base sm:text-lg text-[#6E6E6A] font-light leading-relaxed pt-2">
            Select a certified loose diamond from our vault and have it mounted into a ring, pendant, or tennis bracelet. Cast in solid Platinum 950 or 18 Karat Gold and crafted to your exact specifications.
          </p>
        </header>

        {/* 3-Step Process */}
        <section aria-labelledby="how-it-works-heading" className="mt-16 sm:mt-24 pt-12 border-t border-[#EAEAE7]">
          <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium mb-8">
            How It Works
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="space-y-2">
              <span className="font-mono text-[12px] text-[#888884]">01</span>
              <h2 id="how-it-works-heading" className="text-[15px] font-medium text-[#111111]">Choose your diamond</h2>
              <p className="text-[14px] text-[#6E6E6A] leading-relaxed font-light">
                Pick a certified stone from our live vault by carat, shape, and cut. Or tell us your target specifications and we will pull matching stones from our cutting inventory.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[12px] text-[#888884]">02</span>
              <h2 className="text-[15px] font-medium text-[#111111]">Review your 3D model</h2>
              <p className="text-[14px] text-[#6E6E6A] leading-relaxed font-light">
                Share a photo, reference link, or ring size. We build a millimeter-accurate 3D render around your specific diamond so you see exact proportions before casting.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[12px] text-[#888884]">03</span>
              <h2 className="text-[15px] font-medium text-[#111111]">Bench setting &amp; delivery</h2>
              <p className="text-[14px] text-[#6E6E6A] leading-relaxed font-light">
                Our bench jewelers cast, clean, and hand-set your stone under magnification. The completed piece is delivered in discreet, fully insured transit.
              </p>
            </div>
          </div>
        </section>

        {/* Re-designed, Elegant Custom Inquiry Form */}
        <section aria-labelledby="inquiry-heading" className="mt-20 sm:mt-28 pt-12 border-t border-[#EAEAE7]">
          <div className="max-w-2xl mb-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#888884] font-medium mb-1.5">
              Commission an Order
            </p>
            <h2 id="inquiry-heading" className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#111111] font-normal">
              Inquire about a custom piece
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#6E6E6A] font-light leading-relaxed mt-2">
              Select your specifications below. A diamond specialist will review your request and contact you with stone options and exact CAD pricing.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="w-full bg-[#FAF9F6] border border-[#EAEAE7] p-6 sm:p-10 lg:p-12 space-y-8 text-left">

              {/* 1. Piece Type */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A75] font-semibold">
                    1. Select Piece Type
                  </label>
                  <span className="text-[12px] text-[#111111] font-medium hidden sm:inline-block">
                    {jewelryType}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {JEWELRY_TYPES.map((item) => {
                    const isSelected = jewelryType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setJewelryType(item.id)}
                        className={`h-20 sm:h-24 p-3 flex flex-col items-center justify-center text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                            : 'border-[#EAEAE7] bg-white text-[#111111] hover:border-[#111111]'
                        }`}
                      >
                        <span className="text-[13px] sm:text-[14px] font-medium leading-snug">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Preferred Metal */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A75] font-semibold">
                    2. Preferred Metal
                  </label>
                  <span className="text-[12px] text-[#111111] font-medium hidden sm:inline-block">
                    {metal}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {METALS.map((m) => {
                    const isSelected = metal === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMetal(m)}
                        className={`h-11 px-3 flex items-center justify-center text-center text-[12px] sm:text-[13px] font-medium border transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                            : 'border-[#EAEAE7] bg-white text-[#555552] hover:border-[#111111] hover:text-[#111111]'
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Contact & Details */}
              <div className="space-y-4 pt-2 border-t border-[#EAEAE7]">
                <label className="text-[11px] uppercase tracking-[0.15em] text-[#7A7A75] font-semibold block pt-2">
                  3. Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[12px] text-[#555552] block mb-1">Your Name *</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Sharma"
                      className="w-full h-11 px-3.5 text-base sm:text-[14px] bg-white border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <span className="text-[12px] text-[#555552] block mb-1">Phone / WhatsApp *</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-3.5 text-base sm:text-[14px] bg-white border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[12px] text-[#555552] block mb-1">
                    Design Notes or Ring Size <span className="text-[#888884] font-light">(Optional)</span>
                  </span>
                  <input
                    type="text"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="e.g. Ring size 6, solitaire with a slim band, target carat or budget..."
                    className="w-full h-11 px-3.5 text-base sm:text-[14px] bg-white border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 4. Action Row */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#EAEAE7]">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="min-h-[46px] px-8 bg-[#111111] text-white text-[12px] tracking-[0.08em] uppercase font-medium hover:bg-black disabled:opacity-50 transition-colors cursor-pointer text-center"
                  >
                    {loading ? 'Submitting...' : 'Send Inquiry →'}
                  </button>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-[12px] text-[#555552] hover:text-[#111111] border-b border-[#111111] pb-0.5 tracking-wider transition-colors py-2 text-center"
                  >
                    <span>Chat on WhatsApp</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
                <p className="text-[12px] text-[#888884] font-light text-center sm:text-right">
                  Direct response within 24 hours &middot; No sales spam
                </p>
              </div>

            </form>
          ) : (
            <div className="w-full bg-[#FAF9F6] border border-[#111111] p-8 sm:p-14 text-center space-y-4">
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#111111]">
                Thank you, {name}.
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#6E6E6A] leading-relaxed font-light max-w-lg mx-auto">
                We received your inquiry for a <strong className="text-[#111111] font-medium">{jewelryType}</strong> in <strong className="text-[#111111] font-medium">{metal}</strong>. Our diamond specialists will review your details and reach out at <span className="text-[#111111] font-medium">{phone}</span> shortly.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setDetails('');
                  }}
                  className="px-6 py-2.5 bg-[#111111] text-white text-[12px] uppercase tracking-wider font-medium hover:bg-black transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Link back to Vault */}
        <section aria-label="Vault Navigation" className="mt-20 pt-12 border-t border-[#EAEAE7] flex flex-wrap items-center justify-between gap-4">
          <p className="text-[13px] text-[#6E6E6A]">
            Need to pick your center stone first?
          </p>
          <Link
            href="/vault"
            className="text-[13px] font-medium text-[#111111] hover:text-[#555552] border-b border-[#111111] pb-0.5 inline-flex items-center gap-1.5"
          >
            <span>Filter diamonds in The Vault</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
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
