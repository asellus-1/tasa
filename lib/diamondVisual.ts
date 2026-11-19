import { DiamondShape } from './dimensions';
import { DiamondColor, DiamondClarity } from './diamonds';

export interface DiamondVisualProps {
  shape: DiamondShape;
  carat: number;
  color: DiamondColor;
  clarity: DiamondClarity;
}

export interface InclusionMark {
  id: string;
  type: 'pinpoint' | 'feather' | 'crystal';
  x: number; // percentage in diamond space (0-100)
  y: number; // percentage in diamond space (0-100)
  size: number;
  opacity: number;
  rotation?: number;
}

/**
 * Returns color tint for pure line drawing.
 * Subtle tint fill behind lines (max 4% opacity).
 */
export function getColorTint(color: DiamondColor): {
  tintColor: string;
  tintOpacity: number;
} {
  switch (color) {
    case 'D':
    case 'E':
    case 'F':
      return { tintColor: '#FFFFFF', tintOpacity: 0.0 };
    case 'G':
    case 'H':
      return { tintColor: '#FFF8E7', tintOpacity: 0.015 };
    case 'I':
    case 'J':
      return { tintColor: '#FFF3DB', tintOpacity: 0.025 };
    case 'K':
    case 'L':
      return { tintColor: '#FFE5BE', tintOpacity: 0.035 };
    case 'M':
      return { tintColor: '#FFD49A', tintOpacity: 0.04 };
    default:
      return { tintColor: '#FFFFFF', tintOpacity: 0.0 };
  }
}

/**
 * Procedural inclusions for 10x Loupe.
 */
export function getClarityInclusions(clarity: DiamondClarity): InclusionMark[] {
  switch (clarity) {
    case 'FL':
    case 'IF':
      return [];
    case 'VVS1':
      return [
        { id: 'inc-1', type: 'pinpoint', x: 48, y: 46, size: 0.8, opacity: 0.5 },
      ];
    case 'VVS2':
      return [
        { id: 'inc-1', type: 'pinpoint', x: 52, y: 44, size: 1.0, opacity: 0.55 },
        { id: 'inc-2', type: 'feather', x: 60, y: 40, size: 2.5, opacity: 0.4, rotation: 30 },
      ];
    case 'VS1':
      return [
        { id: 'inc-1', type: 'crystal', x: 46, y: 48, size: 1.4, opacity: 0.6 },
        { id: 'inc-2', type: 'pinpoint', x: 56, y: 52, size: 1.0, opacity: 0.5 },
        { id: 'inc-3', type: 'feather', x: 40, y: 38, size: 3.0, opacity: 0.45, rotation: -20 },
      ];
    case 'VS2':
      return [
        { id: 'inc-1', type: 'crystal', x: 50, y: 45, size: 1.8, opacity: 0.65 },
        { id: 'inc-2', type: 'crystal', x: 42, y: 54, size: 1.5, opacity: 0.55 },
        { id: 'inc-3', type: 'feather', x: 62, y: 58, size: 4.0, opacity: 0.5, rotation: 45 },
      ];
    case 'SI1':
      return [
        { id: 'inc-1', type: 'crystal', x: 48, y: 46, size: 2.2, opacity: 0.75 },
        { id: 'inc-2', type: 'crystal', x: 55, y: 52, size: 1.8, opacity: 0.7 },
        { id: 'inc-3', type: 'feather', x: 36, y: 40, size: 5.5, opacity: 0.6, rotation: -25 },
        { id: 'inc-4', type: 'pinpoint', x: 52, y: 60, size: 1.2, opacity: 0.6 },
      ];
    case 'SI2':
      return [
        { id: 'inc-1', type: 'crystal', x: 46, y: 45, size: 3.0, opacity: 0.8 },
        { id: 'inc-2', type: 'crystal', x: 56, y: 50, size: 2.5, opacity: 0.75 },
        { id: 'inc-3', type: 'feather', x: 34, y: 36, size: 7.0, opacity: 0.65, rotation: -30 },
        { id: 'inc-4', type: 'feather', x: 66, y: 60, size: 6.0, opacity: 0.6, rotation: 50 },
        { id: 'inc-5', type: 'pinpoint', x: 42, y: 58, size: 1.5, opacity: 0.65 },
      ];
    default:
      return [];
  }
}
