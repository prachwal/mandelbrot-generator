/**
 * @fileoverview Mandelbrot fractal implementation as plugin
 * @module MandelbrotFractal
 */

import { BaseFractal } from '../core/base-fractal.js';
import type { FractalConfig, FractalResult, Complex, ParameterSchema } from '../core/types.js';
import { getColor } from '../colors.js';

/**
 * Classic Mandelbrot fractal implementation
 * Formula: z_{n+1} = z_n^2 + c, where z_0 = 0
 */
export class MandelbrotFractal extends BaseFractal {
  readonly id = 'mandelbrot';
  readonly name = 'Mandelbrot Set';
  readonly description = 'Classic Mandelbrot fractal using the iteration z² + c';

  readonly defaultConfig: FractalConfig = {
    width: 800,
    height: 600,
    centerX: -0.5,
    centerY: 0,
    zoom: 1,
    maxIterations: 100,
    escapeRadius: 2,
    colorPalette: 'rainbow'
  };

  readonly parameterSchema: ParameterSchema[] = [
    {
      key: 'maxIterations',
      label: 'Max Iterations',
      type: 'number',
      min: 10,
      max: 2000,
      step: 10,
      default: 100,
      description: 'Maximum number of iterations to test',
      group: 'computation'
    },
    {
      key: 'escapeRadius',
      label: 'Escape Radius',
      type: 'number',
      min: 1,
      max: 10,
      step: 0.1,
      default: 2,
      description: 'Threshold for considering a point escaped',
      group: 'computation'
    },
    {
      key: 'colorPalette',
      label: 'Color Palette',
      type: 'select',
      options: [
        { value: 'rainbow', label: '🌈 Rainbow' },
        { value: 'fire', label: '🔥 Fire' },
        { value: 'cool', label: '❄️ Cool' },
        { value: 'classic', label: '⚫ Classic' }
      ],
      default: 'rainbow',
      description: 'Color scheme for visualization',
      group: 'appearance'
    }
  ];

  /**
   * Core Mandelbrot iteration
   * @param point - Point c in complex plane
   * @param config - Configuration parameters
   * @returns Iteration result
   */
  iterate(point: Complex, config: FractalConfig): FractalResult {
    const { maxIterations, escapeRadius = 2 } = config;
    let z = { real: 0, imag: 0 };
    let iterations = 0;

    while (iterations < maxIterations) {
      // Calculate |z|²
      const magnitudeSq = z.real * z.real + z.imag * z.imag;
      
      if (magnitudeSq > escapeRadius * escapeRadius) {
        return {
          iterations,
          escaped: true,
          finalZ: z,
          convergenceType: 'escaped'
        };
      }

      // z = z² + c
      const newReal = z.real * z.real - z.imag * z.imag + point.real;
      const newImag = 2 * z.real * z.imag + point.imag;
      
      z = { real: newReal, imag: newImag };
      iterations++;
    }

    return {
      iterations,
      escaped: false,
      finalZ: z,
      convergenceType: 'max_iterations'
    };
  }

  protected getColor(result: FractalResult, config: FractalConfig): [number, number, number] {
    const color = getColor(result.iterations, config.maxIterations, config.colorPalette as any);
    return [color[0], color[1], color[2]]; // Convert readonly to mutable
  }

  override validateConfig(config: FractalConfig): boolean {
    return (
      config.maxIterations > 0 &&
      (config.escapeRadius ?? 2) > 0 &&
      config.width > 0 &&
      config.height > 0 &&
      config.zoom > 0
    );
  }
}
