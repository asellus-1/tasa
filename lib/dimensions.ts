export type DiamondShape =
  | 'round'
  | 'princess'
  | 'oval'
  | 'emerald'
  | 'cushion'
  | 'pear'
  | 'marquise'
  | 'radiant';

export interface DiamondDimensions {
  length: number; // mm
  width: number;  // mm
  depth: number;  // mm
  ratio: number;
  depthPercent: number;
  tablePercent: number;
  formattedMm: string;
}

export function calculateDimensions(shape: DiamondShape, carat: number): DiamondDimensions {
  const cRoot = Math.cbrt(carat);

  let l = 6.5;
  let w = 6.5;
  let d = 4.0;
  let table = 57;
  let depthPct = 61.5;

  switch (shape) {
    case 'round':
      w = 6.50 * cRoot;
      l = w;
      d = w * 0.615;
      table = 57;
      depthPct = 61.5;
      break;
    case 'princess':
      w = 5.50 * cRoot;
      l = 5.50 * cRoot;
      d = w * 0.72;
      table = 70;
      depthPct = 72.0;
      break;
    case 'oval':
      w = 5.45 * cRoot;
      l = w * 1.42;
      d = w * 0.62;
      table = 59;
      depthPct = 62.8;
      break;
    case 'emerald':
      w = 4.95 * cRoot;
      l = w * 1.41;
      d = w * 0.66;
      table = 65;
      depthPct = 66.5;
      break;
    case 'cushion':
      w = 5.70 * cRoot;
      l = w * 1.05;
      d = w * 0.67;
      table = 62;
      depthPct = 67.2;
      break;
    case 'pear':
      w = 5.55 * cRoot;
      l = w * 1.52;
      d = w * 0.63;
      table = 58;
      depthPct = 63.4;
      break;
    case 'marquise':
      w = 5.10 * cRoot;
      l = w * 1.82;
      d = w * 0.61;
      table = 59;
      depthPct = 61.2;
      break;
    case 'radiant':
      w = 5.35 * cRoot;
      l = w * 1.25;
      d = w * 0.68;
      table = 66;
      depthPct = 68.1;
      break;
  }

  const length = Number(l.toFixed(2));
  const width = Number(w.toFixed(2));
  const depth = Number(d.toFixed(2));
  const ratio = Number((length / width).toFixed(2));

  return {
    length,
    width,
    depth,
    ratio,
    depthPercent: depthPct,
    tablePercent: table,
    formattedMm: `${length.toFixed(2)} × ${width.toFixed(2)} × ${depth.toFixed(2)} mm`,
  };
}
