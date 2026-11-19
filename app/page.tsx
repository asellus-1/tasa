'use client';

import React, { useState, useMemo, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import DiamondStage from '@/components/DiamondStage';
import ConfiguratorPanel from '@/components/ConfiguratorPanel';
import VaultTable from '@/components/VaultTable';
import InventoryUpdateModal, { SelectedStoneDetails } from '@/components/InventoryUpdateModal';
import ConsultationModal from '@/components/ConsultationModal';

import { DiamondShape } from '@/lib/dimensions';
import { DiamondColor, DiamondClarity, Diamond } from '@/lib/diamonds';
import { queryDiamonds } from '@/lib/pricing';

export default function ConfiguratorPage() {
  // Configurator state (defaults: Round, 1.50 ct, F, VS1)
  const [shape, setShape] = useState<DiamondShape>('round');
  const [carat, setCarat] = useState<number>(1.50);
  const [color, setColor] = useState<DiamondColor>('F');
  const [clarity, setClarity] = useState<DiamondClarity>('VS1');

  // In-page inventory table state
  const [tableOpen, setTableOpen] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // Simple Buy Now popup state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedStone, setSelectedStone] = useState<SelectedStoneDetails | null>(null);

  // Free consultation popup state
  const [consultationOpen, setConsultationOpen] = useState<boolean>(false);

  const matchResult = useMemo(
    () => queryDiamonds({ shape, carat, color, clarity }),
    [shape, carat, color, clarity]
  );

  // 1st CTA: "Buy Now" reveals the available diamonds table below
  const handleConfiguratorBuyNow = () => {
    setTableOpen(true);
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  // 2nd CTA: "Buy Now" on any specific stone in the table opens the simple popup
  const handleBuyNowSku = (stone: Diamond) => {
    const formattedShape = stone.shape.charAt(0).toUpperCase() + stone.shape.slice(1);
    setSelectedStone({
      id: stone.id,
      shape: formattedShape,
      carat: stone.carat,
      color: stone.color,
      clarity: stone.clarity,
      cut: stone.cut,
      price: stone.price,
      formattedPrice: `$${stone.price.toLocaleString()}`,
    });
    setModalOpen(true);
  };

  const currentStoneDetails: SelectedStoneDetails = selectedStone || {
    shape: shape.charAt(0).toUpperCase() + shape.slice(1),
    carat,
    color,
    clarity,
    price: matchResult.minPrice,
    formattedPrice: matchResult.formattedMinPrice,
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between overflow-x-hidden selection:bg-[#111111] selection:text-white">
      {/* Session-Aware Loader */}
      <Loader onComplete={() => {}} />

      {/* Minimal Header with Free Consultation CTA */}
      <Header onOpenConsultation={() => setConsultationOpen(true)} />

      {/* Main Configurator Experience */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-6 sm:py-8 lg:py-12 min-w-0">
        
        {/* Top 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start w-full min-w-0">
          
          {/* LEFT: Clean, generic diamond visual */}
          <div className="lg:col-span-7 flex justify-center lg:sticky lg:top-28 w-full min-w-0">
            <DiamondStage shape={shape} carat={carat} />
          </div>

          {/* RIGHT: Pure, unboxed configurator controls */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start w-full min-w-0">
            <ConfiguratorPanel
              shape={shape}
              setShape={setShape}
              carat={carat}
              setCarat={setCarat}
              color={color}
              setColor={setColor}
              clarity={clarity}
              setClarity={setClarity}
              matchResult={matchResult}
              onBuyNow={handleConfiguratorBuyNow}
            />
          </div>

        </div>

        {/* Animated Available Diamonds Table Right Below */}
        <div className="w-full mt-8 sm:mt-12">
          <VaultTable
            ref={tableRef}
            isOpen={tableOpen}
            onClose={() => setTableOpen(false)}
            stones={matchResult.matches}
            onBuyNowStone={handleBuyNowSku}
          />
        </div>

      </main>

      {/* Luxury Brand Footer */}
      <Footer onOpenConsultation={() => setConsultationOpen(true)} />

      {/* Super Simple Popup: Name & Phone Number only */}
      <InventoryUpdateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        stone={currentStoneDetails}
      />

      {/* Free Consultation Popup */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
}
