'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';

const JEWELRY_TYPES = [
  { id: 'Engagement Ring', label: 'Engagement Ring', desc: 'Solitaire, halo, or three-stone' },
  { id: 'Diamond Pendant', label: 'Diamond Pendant', desc: 'Bezel, prong, or floating mount' },
  { id: 'Ear Studs', label: 'Ear Studs', desc: 'Classic four-prong or bezel studs' },
  { id: 'Eternity Band', label: 'Eternity Band', desc: 'Continuous row of matched stones' },
  { id: 'Tennis Bracelet', label: 'Tennis Bracelet', desc: 'Four-prong or bezel link setting' },
  { id: 'Custom Idea', label: 'Custom Design', desc: 'Bring your own sketch or photo' },
];

const METALS = ['Platinum 950', '18K Yellow Gold', '18K White Gold', '18K Rose Gold', 'Undecided'];

export default function CustomJewelryPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  // Form State
  const [jewelryType, setJewelryType] = useState('Engagement Ring');
  const [metal, setMetal] = useState('Platinum 950');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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
          email: email.trim() || undefined,
          notes: `[Category: ${jewelryType}] [Metal: ${metal}] ${details.trim()}`,
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
          <div className="max-w-3xl space-y-3 mb-10">
            <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
              Commission an Order
            </p>
            <h2 id="inquiry-heading" className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal">
              Inquire about a custom piece
            </h2>
            <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
              Tell us what you want to create. A gemologist will review your notes and reach out with pricing and stone recommendations.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">

              {/* Category Grid - Clean 3x2 on desktop, 2x3 on mobile */}
              <div className="space-y-3">
                <label className="text-[12px] uppercase tracking-wider text-[#888884] font-medium block">
                  1. Select Piece Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {JEWELRY_TYPES.map((item) => {
                    const isSelected = jewelryType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setJewelryType(item.id)}
                        className={`text-left p-4 border active:scale-[0.98] transition-all cursor-pointer ${isSelected
                            ? 'border-[#111111] bg-[#111111] text-white shadow-sm'
                            : 'border-[#EAEAE7] bg-white text-[#111111] hover:border-[#888884]'
                          }`}
                      >
                        <p className="text-[14px] font-medium leading-tight">{item.label}</p>
                        <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-[#D0D0CE]' : 'text-[#888884]'}`}>
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Precious Metal Selector */}
              <div className="space-y-3">
                <label className="text-[12px] uppercase tracking-wider text-[#888884] font-medium block">
                  2. Preferred Metal
                </label>
                <div className="flex flex-wrap gap-2">
                  {METALS.map((m) => {
                    const isSelected = metal === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMetal(m)}
                        className={`px-3.5 py-2 text-[12px] transition-colors cursor-pointer border ${isSelected
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-[#EAEAE7] bg-white text-[#555552] hover:border-[#111111]'
                          }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-4 pt-2">
                <label className="text-[12px] uppercase tracking-wider text-[#888884] font-medium block">
                  3. Contact Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[12px] text-[#555552] block">Your Name *</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Sharma"
                      className="w-full px-3.5 py-2.5 text-base sm:text-[14px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[12px] text-[#555552] block">Phone / WhatsApp *</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-base sm:text-[14px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[12px] text-[#555552] block">Email Address (Optional)</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-base sm:text-[14px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[12px] text-[#555552] block">Design Preferences or Notes</span>
                  <textarea
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="e.g. Ring size 6, solitaire with a slim platinum band, target budget or carat weight..."
                    className="w-full px-3.5 py-2.5 text-base sm:text-[14px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#111111] text-white py-3.5 px-8 text-[13px] font-medium tracking-wide hover:bg-[#2A2A28] disabled:opacity-50 transition-opacity cursor-pointer text-center"
                >
                  {loading ? 'Submitting...' : 'Send Inquiry →'}
                </button>
                <a
                  href="https://api.whatsapp.com/send/?phone=918962630767&text=Hello%2C+I+need+consultation+regarding+loose+stone+diamonds.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center sm:text-left text-[13px] text-[#555552] hover:text-[#111111] underline underline-offset-4 py-2"
                >
                  Chat with us directly on WhatsApp ;
                </a>
              </div>
              <p className="text-[12px] text-[#888884] pt-1 font-light">
                We will message you on WhatsApp or call within 24 hours. No sales spam.
              </p>
            </form>
          ) : (
            <div className="max-w-2xl border border-[#111111] p-8 space-y-3">
              <h3 className="font-serif-display text-2xl text-[#111111]">
                Thank you, {name}.
              </h3>
              <p className="text-[14px] text-[#6E6E6A] leading-relaxed font-light">
                We received your inquiry for a <strong className="text-[#111111] font-medium">{jewelryType}</strong> in <strong className="text-[#111111] font-medium">{metal}</strong>. Our team will review your notes and reach out at <span className="text-[#111111] font-medium">{phone}</span> shortly.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setEmail('');
                    setDetails('');
                  }}
                  className="text-[12px] underline underline-offset-2 text-[#111111] cursor-pointer"
                >
                  Submit another custom inquiry
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
            href="/"
            className="text-[13px] font-medium text-[#111111] hover:text-[#555552] underline underline-offset-4"
          >
            Filter diamonds in The Vault ;
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
