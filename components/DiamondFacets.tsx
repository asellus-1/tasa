import React from 'react';
import { DiamondShape } from '@/lib/dimensions';

interface DiamondFacetsProps {
  shape: DiamondShape;
  colorTint?: string;
  tintOpacity?: number;
}

export default function DiamondFacets({
  shape,
  colorTint = '#FFFFFF',
  tintOpacity = 0,
}: DiamondFacetsProps) {
  const strokeMain = '#111111';
  const strokeFacet = 'rgba(17, 17, 17, 0.72)';
  const strokeSub = 'rgba(17, 17, 17, 0.48)';

  return (
    <g className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
      {renderShapeFacets(shape, strokeMain, strokeFacet, strokeSub, colorTint, tintOpacity)}
    </g>
  );
}

function renderShapeFacets(
  shape: DiamondShape,
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  switch (shape) {
    case 'round':
      return renderRound(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
    case 'oval':
      return renderOval(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
    case 'emerald':
      return renderEmerald(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
    case 'princess':
      return renderPrincess(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
    case 'cushion':
      return renderCushion(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
    case 'pear':
      return renderPear(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
    case 'marquise':
      return renderMarquise(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
    case 'radiant':
      return renderRadiant(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
    default:
      return renderRound(strokeMain, strokeFacet, strokeSub, tint, tintOpacity);
  }
}

// 1. ROUND BRILLIANT (57 Facets Top-Down Schematic)
function renderRound(
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  const cx = 150;
  const cy = 150;
  const r = 110;
  const rTable = 58;
  const rStar = 78;

  const angles8 = [0, 45, 90, 135, 180, 225, 270, 315].map((a) => (a * Math.PI) / 180);
  const angles16 = Array.from({ length: 16 }, (_, i) => (i * 22.5 * Math.PI) / 180);

  const tablePts = angles8.map((a) => [cx + rTable * Math.cos(a), cy + rTable * Math.sin(a)]);
  const starPts = angles16.filter((_, i) => i % 2 !== 0).map((a) => [cx + rStar * Math.cos(a), cy + rStar * Math.sin(a)]);
  const outerPts = angles16.map((a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]);

  return (
    <g>
      {/* Subtle tint backing if lower color grade */}
      {tintOpacity > 0 && <circle cx={cx} cy={cy} r={r} fill={tint} opacity={tintOpacity} />}

      {/* Outer Girdle Contour */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={strokeMain} strokeWidth="1.3" />

      {/* Central Octagonal Table */}
      <polygon
        points={tablePts.map((p) => p.join(',')).join(' ')}
        fill="none"
        stroke={strokeMain}
        strokeWidth="1.0"
      />

      {/* 8 Star Facet Triangles */}
      {tablePts.map(([tx, ty], i) => {
        const nextIdx = (i + 1) % 8;
        const [ntx, nty] = tablePts[nextIdx];
        const [sx, sy] = starPts[i];
        return (
          <polygon
            key={`star-${i}`}
            points={`${tx},${ty} ${sx},${sy} ${ntx},${nty}`}
            fill="none"
            stroke={strokeFacet}
            strokeWidth="0.8"
          />
        );
      })}

      {/* 8 Kite Bezel Facets */}
      {tablePts.map(([tx, ty], i) => {
        const nextIdx = (i + 1) % 8;
        const [ntx, nty] = tablePts[nextIdx];
        const [sx, sy] = starPts[i];
        const outIdx = (i * 2 + 1) % 16;
        const [ox, oy] = outerPts[outIdx];
        return (
          <g key={`bezel-${i}`}>
            <line x1={tx} y1={ty} x2={sx} y2={sy} stroke={strokeFacet} strokeWidth="0.8" />
            <line x1={ntx} y1={nty} x2={sx} y2={sy} stroke={strokeFacet} strokeWidth="0.8" />
            <line x1={sx} y1={sy} x2={ox} y2={oy} stroke={strokeFacet} strokeWidth="0.8" />
          </g>
        );
      })}

      {/* 16 Upper Girdle Triangles */}
      {outerPts.map(([ox, oy], i) => {
        const starIdx = Math.floor(i / 2);
        const [sx, sy] = starPts[starIdx];
        return (
          <line
            key={`ug-${i}`}
            x1={ox}
            y1={oy}
            x2={sx}
            y2={sy}
            stroke={strokeSub}
            strokeWidth="0.65"
          />
        );
      })}
    </g>
  );
}

// 2. OVAL BRILLIANT
function renderOval(
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  const cx = 150;
  const cy = 150;
  const rx = 86;
  const ry = 124;
  const rxT = 48;
  const ryT = 70;

  const angles12 = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);

  return (
    <g>
      {tintOpacity > 0 && <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={tint} opacity={tintOpacity} />}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={strokeMain} strokeWidth="1.3" />
      <ellipse cx={cx} cy={cy} rx={rxT} ry={ryT} fill="none" stroke={strokeMain} strokeWidth="1.0" />

      {angles12.map((rad, idx) => {
        const x1 = cx + rxT * Math.cos(rad);
        const y1 = cy + ryT * Math.sin(rad);
        const x2 = cx + rx * Math.cos(rad);
        const y2 = cy + ry * Math.sin(rad);
        return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeFacet} strokeWidth="0.8" />;
      })}

      {/* Mid star splits */}
      {angles12.map((rad, idx) => {
        const midRad = rad + (15 * Math.PI) / 180;
        const x2 = cx + rx * Math.cos(midRad);
        const y2 = cy + ry * Math.sin(midRad);
        const x1 = cx + (rxT + (rx - rxT) * 0.45) * Math.cos(midRad);
        const y1 = cy + (ryT + (ry - ryT) * 0.45) * Math.sin(midRad);
        return <line key={`m-${idx}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeSub} strokeWidth="0.65" />;
      })}
    </g>
  );
}

// 3. EMERALD CUT (Refined Step-Cut)
function renderEmerald(
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  const tier1 = '70,40 230,40 256,66 256,234 230,260 70,260 44,234 44,66';
  const tier2 = '82,56 218,56 240,78 240,222 218,244 82,244 60,222 60,78';
  const tier3 = '95,74 205,74 222,91 222,209 205,226 95,226 78,209 78,91';
  const table = '108,92 192,92 206,106 206,194 192,208 108,208 94,194 94,106';

  return (
    <g>
      {tintOpacity > 0 && <polygon points={tier1} fill={tint} opacity={tintOpacity} />}
      <polygon points={tier1} fill="none" stroke={strokeMain} strokeWidth="1.3" />
      <polygon points={tier2} fill="none" stroke={strokeFacet} strokeWidth="0.8" />
      <polygon points={tier3} fill="none" stroke={strokeSub} strokeWidth="0.65" />
      <polygon points={table} fill="none" stroke={strokeMain} strokeWidth="1.0" />

      {/* 4 Mitered Corner Lines */}
      <line x1={44} y1={66} x2={94} y2={106} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={256} y1={66} x2={206} y2={106} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={256} y1={234} x2={206} y2={194} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={44} y1={234} x2={94} y2={194} stroke={strokeFacet} strokeWidth="0.8" />
    </g>
  );
}

// 4. PRINCESS CUT
function renderPrincess(
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  const x = 46;
  const y = 46;
  const s = 208;
  const tx = 100;
  const ty = 100;
  const ts = 100;

  return (
    <g>
      {tintOpacity > 0 && <rect x={x} y={y} width={s} height={s} fill={tint} opacity={tintOpacity} />}
      <rect x={x} y={y} width={s} height={s} fill="none" stroke={strokeMain} strokeWidth="1.3" />
      <rect x={tx} y={ty} width={ts} height={ts} fill="none" stroke={strokeMain} strokeWidth="1.0" />

      {/* Diagonal Corner Lines */}
      <line x1={x} y1={y} x2={tx} y2={ty} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={x + s} y1={y} x2={tx + ts} y2={ty} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={x + s} y1={y + s} x2={tx + ts} y2={ty + ts} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={x} y1={y + s} x2={tx} y2={ty + ts} stroke={strokeFacet} strokeWidth="0.8" />

      {/* Chevrons radiating outwards */}
      <polygon
        points={`${x + s / 2},${y} ${tx + ts / 2},${ty} ${x + s / 2},${y + 24}`}
        fill="none"
        stroke={strokeSub}
        strokeWidth="0.65"
      />
      <polygon
        points={`${x + s},${y + s / 2} ${tx + ts},${ty + ts / 2} ${x + s - 24},${y + s / 2}`}
        fill="none"
        stroke={strokeSub}
        strokeWidth="0.65"
      />
      <polygon
        points={`${x + s / 2},${y + s} ${tx + ts / 2},${ty + ts} ${x + s / 2},${y + s - 24}`}
        fill="none"
        stroke={strokeSub}
        strokeWidth="0.65"
      />
      <polygon
        points={`${x},${y + s / 2} ${tx},${ty + ts / 2} ${x + 24},${y + s / 2}`}
        fill="none"
        stroke={strokeSub}
        strokeWidth="0.65"
      />

      {/* Inner cross in table */}
      <line x1={tx} y1={ty} x2={tx + ts} y2={ty + ts} stroke={strokeSub} strokeWidth="0.4" />
      <line x1={tx + ts} y1={ty} x2={tx} y2={ty + ts} stroke={strokeSub} strokeWidth="0.4" />
    </g>
  );
}

// 5. CUSHION
function renderCushion(
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  return (
    <g>
      {tintOpacity > 0 && <rect x={50} y={50} width={200} height={200} rx={52} ry={52} fill={tint} opacity={tintOpacity} />}
      <rect x={50} y={50} width={200} height={200} rx={52} ry={52} fill="none" stroke={strokeMain} strokeWidth="1.3" />
      <rect x={94} y={94} width={112} height={112} rx={24} ry={24} fill="none" stroke={strokeMain} strokeWidth="1.0" />

      {/* Radiating corner and edge star facets */}
      <line x1={50} y1={102} x2={94} y2={118} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={250} y1={102} x2={206} y2={118} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={250} y1={198} x2={206} y2={182} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={50} y1={198} x2={94} y2={182} stroke={strokeFacet} strokeWidth="0.8" />

      <line x1={102} y1={50} x2={118} y2={94} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={198} y1={50} x2={182} y2={94} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={198} y1={250} x2={182} y2={206} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={102} y1={250} x2={118} y2={206} stroke={strokeFacet} strokeWidth="0.8" />

      {/* 4 Corner diagonal break lines */}
      <line x1={65} y1={65} x2={102} y2={102} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={235} y1={65} x2={198} y2={102} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={235} y1={235} x2={198} y2={198} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={65} y1={235} x2={102} y2={198} stroke={strokeSub} strokeWidth="0.65" />
    </g>
  );
}

// 6. PEAR BRILLIANT (Architectural Pear Schematic)
function renderPear(
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  const outer = 'M 150 34 C 196 90 240 156 228 205 C 218 248 186 266 150 266 C 114 266 82 248 72 205 C 60 156 104 90 150 34 Z';
  const table = 'M 150 82 C 176 120 190 154 180 184 C 172 208 150 214 150 214 C 150 214 128 208 120 184 C 110 154 124 120 150 82 Z';

  return (
    <g>
      {tintOpacity > 0 && <path d={outer} fill={tint} opacity={tintOpacity} />}
      <path d={outer} fill="none" stroke={strokeMain} strokeWidth="1.3" />
      <path d={table} fill="none" stroke={strokeMain} strokeWidth="1.0" />

      {/* Apex point lines */}
      <line x1={150} y1={34} x2={150} y2={82} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={150} y1={34} x2={176} y2={120} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={150} y1={34} x2={124} y2={120} stroke={strokeSub} strokeWidth="0.65" />

      {/* Flank star facets */}
      <line x1={176} y1={120} x2={228} y2={148} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={124} y1={120} x2={72} y2={148} stroke={strokeFacet} strokeWidth="0.8" />

      {/* Base radial facets */}
      <line x1={180} y1={184} x2={228} y2={205} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={120} y1={184} x2={72} y2={205} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={162} y1={212} x2={196} y2={246} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={138} y1={212} x2={104} y2={246} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={150} y1={214} x2={150} y2={266} stroke={strokeFacet} strokeWidth="0.8" />
    </g>
  );
}

// 7. MARQUISE BRILLIANT
function renderMarquise(
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  const outer = 'M 150 24 C 220 92 242 176 150 276 C 58 176 80 92 150 24 Z';
  const table = 'M 150 78 C 188 118 194 162 150 222 C 106 162 112 118 150 78 Z';

  return (
    <g>
      {tintOpacity > 0 && <path d={outer} fill={tint} opacity={tintOpacity} />}
      <path d={outer} fill="none" stroke={strokeMain} strokeWidth="1.3" />
      <path d={table} fill="none" stroke={strokeMain} strokeWidth="1.0" />

      {/* Point spines */}
      <line x1={150} y1={24} x2={150} y2={78} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={150} y1={222} x2={150} y2={276} stroke={strokeFacet} strokeWidth="0.8" />

      {/* Side wings */}
      <line x1={188} y1={118} x2={228} y2={150} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={112} y1={118} x2={72} y2={150} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={188} y1={182} x2={228} y2={150} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={112} y1={182} x2={72} y2={150} stroke={strokeFacet} strokeWidth="0.8" />
    </g>
  );
}

// 8. RADIANT
function renderRadiant(
  strokeMain: string,
  strokeFacet: string,
  strokeSub: string,
  tint: string,
  tintOpacity: number
) {
  const outer = '76,48 224,48 248,72 248,228 224,252 76,252 52,228 52,72';
  const table = '100,96 200,96 200,204 100,204';

  return (
    <g>
      {tintOpacity > 0 && <polygon points={outer} fill={tint} opacity={tintOpacity} />}
      <polygon points={outer} fill="none" stroke={strokeMain} strokeWidth="1.3" />
      <polygon points={table} fill="none" stroke={strokeMain} strokeWidth="1.0" />

      {/* Corner cut-offs */}
      <line x1={52} y1={72} x2={100} y2={96} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={248} y1={72} x2={200} y2={96} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={248} y1={228} x2={200} y2={204} stroke={strokeFacet} strokeWidth="0.8" />
      <line x1={52} y1={228} x2={100} y2={204} stroke={strokeFacet} strokeWidth="0.8" />

      {/* Midpoint starburst */}
      <line x1={150} y1={48} x2={150} y2={96} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={150} y1={252} x2={150} y2={204} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={52} y1={150} x2={100} y2={150} stroke={strokeSub} strokeWidth="0.65" />
      <line x1={248} y1={150} x2={200} y2={150} stroke={strokeSub} strokeWidth="0.65" />
    </g>
  );
}
