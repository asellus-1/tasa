import { Diamond, DiamondColor, DiamondClarity, MOCK_DIAMONDS, COLOR_BANDS, CLARITY_BANDS } from './diamonds';
import { DiamondShape, calculateDimensions } from './dimensions';

export interface FilterParams {
  shape: DiamondShape;
  carat: number;
  color: DiamondColor;
  clarity: DiamondClarity;
}

export interface MatchResult {
  matches: Diamond[];
  count: number;
  minPrice: number;
  maxPrice: number;
  formattedMinPrice: string;
  exactMatchesCount: number;
}

function getColorBand(color: DiamondColor): DiamondColor[] {
  if (COLOR_BANDS.COLORLESS.includes(color)) return COLOR_BANDS.COLORLESS;
  if (COLOR_BANDS.NEAR_COLORLESS.includes(color)) return COLOR_BANDS.NEAR_COLORLESS;
  return COLOR_BANDS.FAINT;
}

function getClarityBand(clarity: DiamondClarity): DiamondClarity[] {
  if (CLARITY_BANDS.FLAWLESS.includes(clarity)) return CLARITY_BANDS.FLAWLESS;
  if (CLARITY_BANDS.VVS.includes(clarity)) return CLARITY_BANDS.VVS;
  if (CLARITY_BANDS.VS.includes(clarity)) return CLARITY_BANDS.VS;
  return CLARITY_BANDS.SI;
}

export function estimatePrice(
  shape: DiamondShape,
  carat: number,
  color: DiamondColor,
  clarity: DiamondClarity
): number {
  const basePerCarat = 6200 * Math.pow(carat, 1.45);
  const colorMultipliers: Record<DiamondColor, number> = {
    D: 1.45,
    E: 1.30,
    F: 1.20,
    G: 1.05,
    H: 0.95,
    I: 0.85,
    J: 0.75,
    K: 0.65,
    L: 0.55,
    M: 0.48,
  };
  const clarityMultipliers: Record<DiamondClarity, number> = {
    FL: 1.80,
    IF: 1.60,
    VVS1: 1.40,
    VVS2: 1.25,
    VS1: 1.15,
    VS2: 1.00,
    SI1: 0.80,
    SI2: 0.65,
  };
  const shapeMultipliers: Record<DiamondShape, number> = {
    round: 1.0,
    princess: 0.82,
    oval: 0.88,
    emerald: 0.85,
    cushion: 0.84,
    pear: 0.86,
    marquise: 0.85,
    radiant: 0.86,
  };

  const est = Math.round(
    (basePerCarat *
      (colorMultipliers[color] || 1) *
      (clarityMultipliers[clarity] || 1) *
      (shapeMultipliers[shape] || 1)) /
      100
  ) * 100;

  return Math.max(1200, est);
}

function generateCuratedVaultListings(params: FilterParams): Diamond[] {
  const { shape, carat, color, clarity } = params;
  const dims1 = calculateDimensions(shape, carat);
  const dims2 = calculateDimensions(shape, Math.round((carat + 0.02) * 100) / 100);
  const c3 = Math.round((carat > 0.6 ? carat - 0.02 : carat + 0.04) * 100) / 100;
  const dims3 = calculateDimensions(shape, c3);

  const price1 = estimatePrice(shape, carat, color, clarity);
  const price2 = estimatePrice(shape, carat + 0.02, color, clarity);
  const price3 = estimatePrice(shape, c3, color, clarity);

  // Hash-based deterministic cert numbers
  const shapeCode = shape.slice(0, 2).toUpperCase();
  const certSeed = Math.abs(Math.round(carat * 100) * 1000 + color.charCodeAt(0) * 17 + clarity.length * 43);

  return [
    {
      id: `TAS-${shapeCode}-${Math.round(carat * 100)}-1`,
      shape,
      carat,
      color,
      clarity,
      cut: 'Ideal',
      polish: 'Excellent',
      symmetry: 'Excellent',
      fluorescence: 'None',
      lab: 'GIA',
      certNumber: `2489${(certSeed * 3 + 1042).toString().slice(-6)}`,
      measurements: dims1.formattedMm,
      depthPct: dims1.depthPercent,
      tablePct: dims1.tablePercent,
      ratio: dims1.ratio,
      price: price1,
    },
    {
      id: `TAS-${shapeCode}-${Math.round(carat * 100)}-2`,
      shape,
      carat: Math.round((carat + 0.02) * 100) / 100,
      color,
      clarity,
      cut: 'Excellent',
      polish: 'Excellent',
      symmetry: 'Excellent',
      fluorescence: 'None',
      lab: 'GIA',
      certNumber: `6498${(certSeed * 5 + 2381).toString().slice(-6)}`,
      measurements: dims2.formattedMm,
      depthPct: Number((dims2.depthPercent + 0.4).toFixed(1)),
      tablePct: dims2.tablePercent,
      ratio: dims2.ratio,
      price: price2,
    },
    {
      id: `TAS-${shapeCode}-${Math.round(carat * 100)}-3`,
      shape,
      carat: c3,
      color,
      clarity,
      cut: 'Ideal',
      polish: 'Excellent',
      symmetry: 'Excellent',
      fluorescence: 'None',
      lab: 'IGI',
      certNumber: `5821${(certSeed * 7 + 4910).toString().slice(-6)}`,
      measurements: dims3.formattedMm,
      depthPct: Number((dims3.depthPercent - 0.3).toFixed(1)),
      tablePct: dims3.tablePercent + 1,
      ratio: dims3.ratio,
      price: price3,
    },
  ];
}

export function queryDiamonds(params: FilterParams): MatchResult {
  const { shape, carat, color, clarity } = params;
  const caratTolerance = 0.08;

  // Exact matching from initial mock repository
  const existingMatches = MOCK_DIAMONDS.filter((stone) => {
    if (stone.shape !== shape) return false;
    const caratDiff = Math.abs(stone.carat - carat);
    if (caratDiff > caratTolerance) return false;

    const matchesColor = stone.color === color;
    const matchesClarity = stone.clarity === clarity;
    return matchesColor && matchesClarity;
  });

  // Always ensure at least 3 curated listings in the vault for whatever customer selected
  let finalMatches = [...existingMatches];
  if (finalMatches.length < 3) {
    const curated = generateCuratedVaultListings(params);
    for (const c of curated) {
      if (!finalMatches.some((m) => m.id === c.id || Math.abs(m.carat - c.carat) < 0.005)) {
        finalMatches.push(c);
      }
    }
  }

  // Sort by closest carat, then price
  finalMatches.sort((a, b) => {
    const diffA = Math.abs(a.carat - carat);
    const diffB = Math.abs(b.carat - carat);
    if (Math.abs(diffA - diffB) > 0.03) {
      return diffA - diffB;
    }
    return a.price - b.price;
  });

  // Keep top 3 or 4 cleanest listings
  finalMatches = finalMatches.slice(0, 3);

  const prices = finalMatches.map((s) => s.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {
    matches: finalMatches,
    count: finalMatches.length,
    minPrice,
    maxPrice,
    formattedMinPrice: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(minPrice),
    exactMatchesCount: finalMatches.length,
  };
}
