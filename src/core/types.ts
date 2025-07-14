/**
 * @fileoverview Core type definitions for extensible fractal system
 * @module CoreTypes
 */

/** Complex number representation */
export interface Complex {
  real: number;
  imag: number;
}

/** RGB color as tuple */
export type RGBColor = readonly [number, number, number];

/** Base configuration for all fractals */
export interface FractalConfig {
  // Image dimensions
  width: number;
  height: number;
  
  // Complex plane navigation
  centerX: number;
  centerY: number;
  zoom: number;
  
  // Rendering settings
  maxIterations: number;
  escapeRadius?: number;
  colorPalette: string;
  
  // Fractal-specific parameters (extended by implementations)
  [key: string]: any;
}

/** Result of fractal iteration */
export interface FractalResult {
  iterations: number;
  escaped: boolean;
  finalZ?: Complex;
  convergenceType?: 'escaped' | 'max_iterations' | 'converged';
  metadata?: Record<string, any>;
}

/** Fractal algorithm metadata */
export interface FractalInfo {
  id: string;
  name: string;
  description: string;
  category: 'escape_time' | 'newton' | 'ifs' | 'other';
  defaultConfig: FractalConfig;
  parameterSchema: ParameterSchema[];
}

/** Parameter definition for UI generation */
export interface ParameterSchema {
  key: string;
  label: string;
  type: 'number' | 'complex' | 'select' | 'boolean' | 'color';
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ value: string; label: string }>;
  default: any;
  description?: string;
  group?: string; // For organizing parameters in UI
}

/** Bounds in complex plane */
export interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/** Available color palettes */
export type PaletteType = 'rainbow' | 'fire' | 'cool' | 'classic' | 'hot' | 'electric' | 'ocean' | 'sunset';

/** Interesting predefined locations */
export interface InterestingPoint {
  name: string;
  centerX: number;
  centerY: number;
  zoom: number;
  description?: string;
  recommendedIterations?: number;
  recommendedPalette?: PaletteType;
}
