'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationModal from '@/components/ConsultationModal';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Are all diamonds certified by GIA or IGI?',
    answer: 'Yes. Every diamond in our vault is certified by either the Gemological Institute of America (GIA) or the International Gemological Institute (IGI). The certificate number is micro-laser inscribed on the stone\'s girdle. You can verify the report number directly on the official GIA or IGI online database.',
  },
  {
    question: 'Can I view the diamond before purchasing?',
    answer: 'Yes. Before any transaction, our team sends you a 40x magnification 360-degree video, high-resolution daylight photographs, and the official laboratory certificate PDF. You will see the exact facet structure, eye-cleanliness, and dimensions before making a decision.',
  },
  {
    question: 'How is delivery handled and is it insured?',
    answer: 'Every shipment is sent via armored couriers (Brink\'s or FedEx Priority Direct) with 100% transit insurance. Packages travel in discrete, unbranded, tamper-evident security boxes. An adult signature and government ID are required upon delivery.',
  },
  {
    question: 'What is your return policy?',
    answer: 'Because we operate on direct cutting-source margins without retail markups, all diamond sales are final once verified and dispatched. We provide uncompressed 40x magnification video scans and cert verification prior to payment so you have full clarity before the stone leaves our hands.',
  },
  {
    question: 'Can you set my loose stone into jewelry?',
    answer: 'Yes. Our bench jewelers craft custom rings, pendants, and eternity bands in solid Platinum 950 and 18 Karat Gold. We build a 3D digital model around your stone\'s exact millimeter dimensions before casting.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept certified bank wire transfers, escrow services, and verified payment cards. Wire transfers are the preferred standard for high-value diamond transactions.',
  },
  {
    question: 'Are your diamonds conflict-free?',
    answer: 'Yes. 100% of our diamonds are sourced strictly in compliance with the Kimberley Process Certification Scheme and the System of Warranties established by the World Diamond Council.',
  },
];

export default function ContactPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
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
          notes: notes.trim() || undefined,
          type: 'contact_inquiry',
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
        
        {/* Editorial Header */}
        <header className="max-w-3xl space-y-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#888884] font-medium">
            Contact &amp; FAQ
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#111111] font-normal leading-[1.08]">
            Questions &amp; Advisory
          </h1>
          <p className="text-base sm:text-lg text-[#6E6E6A] font-light leading-relaxed pt-2">
            Ask about specific inventory stones, certificate lookups, insured shipping, or bespoke settings.
          </p>
        </header>

        {/* Clean, Spacious FAQ Accordion */}
        <section aria-labelledby="faq-heading" className="mt-16 sm:mt-24 pt-12 border-t border-[#EAEAE7]">
          <div className="max-w-2xl space-y-3 mb-10">
            <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
              Common Questions
            </p>
            <h2 id="faq-heading" className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl divide-y divide-[#EAEAE7]">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="py-6 transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-baseline justify-between text-left gap-6 cursor-pointer group"
                  >
                    <span className="text-[16px] sm:text-[17px] font-medium text-[#111111] group-hover:text-[#555552] transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-xl font-light text-[#888884] group-hover:text-[#111111]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pr-6">
                          <p className="text-[14.5px] leading-relaxed text-[#555552] font-light">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact & WhatsApp Section */}
        <section aria-labelledby="contact-heading" className="mt-20 sm:mt-28 pt-12 border-t border-[#EAEAE7]">
          <div className="max-w-2xl space-y-3 mb-10">
            <p className="text-[12px] uppercase tracking-wider text-[#888884] font-medium">
              Get in Touch
            </p>
            <h2 id="contact-heading" className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-normal">
              Speak with a Diamond Advisor
            </h2>
            <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
              Message us directly on WhatsApp for immediate stone lookup, or drop a note below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* WhatsApp direct box */}
            <div className="md:col-span-5 border border-[#EAEAE7] p-6 sm:p-8 space-y-4">
              <span className="font-mono text-[12px] text-[#888884] block">Fastest Response</span>
              <p className="font-serif-display text-2xl text-[#111111]">WhatsApp Concierge</p>
              <p className="text-[13px] text-[#6E6E6A] font-light leading-relaxed">
                Send us a carat, shape, or certificate question. Our advisors respond directly with video links and certificate PDFs.
              </p>
              <div className="pt-2">
                <a
                  href="https://api.whatsapp.com/send/?phone=918962630767&text=Hello%2C+I+need+consultation+regarding+loose+stone+diamonds.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#111111] text-white text-[13px] font-medium tracking-wide hover:bg-[#2A2A28] transition-colors"
                >
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Direct Form */}
            <div className="md:col-span-7 border border-[#EAEAE7] p-6 sm:p-8 space-y-4">
              <span className="font-mono text-[12px] text-[#888884] block">Written Request</span>
              <p className="font-serif-display text-2xl text-[#111111]">Send an Inquiry</p>
              <p className="text-[13px] text-[#6E6E6A] font-light leading-relaxed">
                Leave your details and notes. An advisor will message or call you back.
              </p>

              {!submitted ? (
                <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[12px] text-[#555552] block">Name *</span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
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
                        placeholder="Phone number"
                        className="w-full px-3.5 py-2.5 text-base sm:text-[14px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[12px] text-[#555552] block">Email (Optional)</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full px-3.5 py-2.5 text-base sm:text-[14px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[12px] text-[#555552] block">Message or Stone Reference</span>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Inquiring about a 2ct Oval F VS1, or request certificate PDF..."
                      className="w-full px-3.5 py-2.5 text-base sm:text-[14px] border border-[#EAEAE7] focus:border-[#111111] outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 bg-[#111111] text-white text-[13px] font-medium tracking-wide hover:bg-[#2A2A28] disabled:opacity-50 transition-opacity cursor-pointer text-center"
                    >
                      {loading ? 'Submitting...' : 'Send Message →'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-6 space-y-2">
                  <h3 className="font-serif-display text-xl text-[#111111]">
                    Thank you, {name}.
                  </h3>
                  <p className="text-[14px] text-[#6E6E6A] font-light leading-relaxed">
                    Your inquiry has been received. An advisor will contact you at <span className="text-[#111111] font-medium">{phone}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setNotes('');
                    }}
                    className="text-[12px] text-[#111111] underline underline-offset-2 pt-2 cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              )}
            </div>

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
