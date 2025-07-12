/**
 * Types for Mandelbrot fractal generator
 */

/** RGB color tuple */
export type RGBColor = readonly [number, number, number];

/** Color palette type */
export type PaletteType = 'rainbow' | 'fire' | 'blue' | 'grayscale' | 'purple' | 'sunset';

/** Configuration for fractal generation */
export interface MandelbrotConfig {
  /** Image width in pixels */
  readonly width: number;
  /** Image height in pixels */
  readonly height: number;
  /** Maximum number of iterations */
  readonly maxIterations: number;
  /** Escape radius for iteration */
  readonly escapeRadius: number;
  /** Zoom level */
  readonly zoom: number;
  /** Center X coordinate */
  readonly centerX: number;
  /** Center Y coordinate */
  readonly centerY: number;
  /** Color palette to use */
  readonly colorPalette: PaletteType;
  /** Output filename (for Node.js) */
  readonly outputFile?: string;
}

/** Calculated bounds for fractal rendering */
export interface FractalBounds {
  readonly minReal: number;
  readonly maxReal: number;
  readonly minImaginary: number;
  readonly maxImaginary: number;
}

/** Predefined interesting point */
export interface InterestingPoint {
  readonly centerX: number;
  readonly centerY: number;
  readonly zoom: number;
  readonly description: string;
}

/** Boundary point on fractal edge */
export interface BoundaryPoint {
  readonly x: number;
  readonly y: number;
  readonly iterations: number;
}

/** Collection of predefined points */
export type InterestingPoints = {
  readonly [key: string]: InterestingPoint;
};

/** Color palette collection */
export type ColorPalettes = {
  readonly [K in PaletteType]: readonly RGBColor[];
};
