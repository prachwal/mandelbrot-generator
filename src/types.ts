/**
 * @fileoverview Type definitions for Mandelbrot fractal generator
 * @module Types
 * @version 1.0.0
 * @author prachwal
 * @since 2024
 */

/**
 * RGB color representation as a tuple of three numbers (0-255)
 * @example
 * ```typescript
 * const red: RGBColor = [255, 0, 0];
 * const green: RGBColor = [0, 255, 0];
 * const blue: RGBColor = [0, 0, 255];
 * ```
 */
export type RGBColor = readonly [number, number, number];

/**
 * Available color palette types for fractal visualization
 * @example
 * ```typescript
 * const palette: PaletteType = 'rainbow';
 * ```
 */
export type PaletteType = 'rainbow' | 'fire' | 'blue' | 'grayscale' | 'purple' | 'sunset';

/**
 * Configuration for Mandelbrot fractal generation
 * @interface MandelbrotConfig
 * @example
 * ```typescript
 * const config: MandelbrotConfig = {
 *   width: 800,
 *   height: 600,
 *   maxIterations: 100,
 *   escapeRadius: 2,
 *   centerX: -0.5,
 *   centerY: 0,
 *   zoom: 1,
 *   colorPalette: 'rainbow',
 *   outputFile: 'mandelbrot.svg'
 * };
 * ```
 */
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

/**
 * Fractal bounds in the complex plane
 * @interface FractalBounds
 * @example
 * ```typescript
 * const bounds: FractalBounds = {
 *   minReal: -2.5,
 *   maxReal: 1.5,
 *   minImaginary: -1.5,
 *   maxImaginary: 1.5
 * };
 * ```
 */
export interface FractalBounds {
  /** Minimum real value (left edge) */
  readonly minReal: number;
  /** Maximum real value (right edge) */
  readonly maxReal: number;
  /** Minimum imaginary value (bottom edge) */
  readonly minImaginary: number;
  /** Maximum imaginary value (top edge) */
  readonly maxImaginary: number;
}

/**
 * A point of interest in the Mandelbrot set with description
 * @interface InterestingPoint
 * @example
 * ```typescript
 * const elephantValley: InterestingPoint = {
 *   centerX: -0.7269,
 *   centerY: 0.1889,
 *   zoom: 100,
 *   description: "Elephant Valley - fascinating self-similar structures"
 * };
 * ```
 */
export interface InterestingPoint {
  /** Real part of the center coordinate */
  readonly centerX: number;
  /** Imaginary part of the center coordinate */
  readonly centerY: number;
  /** Recommended zoom level for optimal viewing */
  readonly zoom: number;
  /** Human-readable description of this location */
  readonly description: string;
}

/**
 * Collection of predefined interesting points in the Mandelbrot set
 * @interface InterestingPoints
 * @example
 * ```typescript
 * const points: InterestingPoints = {
 *   classic: { centerX: -0.5, centerY: 0, zoom: 1, description: "Full set view" },
 *   elephant: { centerX: -0.7269, centerY: 0.1889, zoom: 100, description: "Elephant Valley" }
 * };
 * ```
 */
export interface InterestingPoints {
  /** Classic full view of the Mandelbrot set */
  readonly classic: InterestingPoint;
  /** Elephant Valley detail */
  readonly elephant: InterestingPoint;
  /** Seahorse Valley detail */
  readonly seahorse: InterestingPoint;
  /** Lightning-like patterns */
  readonly lightning: InterestingPoint;
  /** Spiral structures */
  readonly spiral: InterestingPoint;
  /** Additional points can be added */
  readonly [key: string]: InterestingPoint;
}

/**
 * A point on the boundary of the Mandelbrot set
 * @interface BoundaryPoint
 * @example
 * ```typescript
 * const boundaryPoint: BoundaryPoint = {
 *   x: -0.7269,
 *   y: 0.1889,
 *   iterations: 87
 * };
 * ```
 */
export interface BoundaryPoint {
  /** Real coordinate (x-axis) */
  readonly x: number;
  /** Imaginary coordinate (y-axis) */
  readonly y: number;
  /** Number of iterations before divergence */
  readonly iterations: number;
}

/** Color palette collection */
export type ColorPalettes = {
  readonly [K in PaletteType]: readonly RGBColor[];
};
