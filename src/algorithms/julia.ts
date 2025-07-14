/**
 * @fileoverview Julia Sets fractal implementation
 * @module JuliaFractal
 */

import { BaseFractal } from '../core/base-fractal.js';
import type { FractalConfig, FractalResult, Complex, ParameterSchema } from '../core/types.js';
import { getColor } from '../colors.js';

/**
 * Julia Sets fractal implementation
 * Formula: z_{n+1} = z_n^2 + c, where z_0 = point and c is constant
 */
export class JuliaFractal extends BaseFractal {
  readonly id = 'julia';
  readonly name = 'Julia Sets';
  readonly description = 'Julia sets with customizable constant c parameter';

  readonly defaultConfig: FractalConfig = {
    width: 800,
    height: 600,
    centerX: 0,
    centerY: 0,
    zoom: 1,
    maxIterations: 100,
    escapeRadius: 2,
    colorPalette: 'rainbow',
    // Julia-specific parameters
    juliaC: { real: -0.7269, imag: 0.1889 } // Famous Julia set
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
      group: 'computation'
    },
    {
      key: 'juliaC',
      label: 'Julia Constant (c)',
      type: 'complex',
      default: { real: -0.7269, imag: 0.1889 },
      description: 'Constant c value for Julia set generation',
      group: 'fractal'
    },
    {
      key: 'colorPalette',
      label: 'Color Palette',
      type: 'select',
      options: [
        { value: 'rainbow', label: '🌈 Rainbow' },
        { value: 'fire', label: '🔥 Fire' },
        { value: 'cool', label: '❄️ Cool' },
        { value: 'electric', label: '⚡ Electric' }
      ],
      default: 'rainbow',
      group: 'appearance'
    }
  ];

  iterate(point: Complex, config: FractalConfig): FractalResult {
    const { maxIterations, escapeRadius = 2 } = config;
    const juliaC = config['juliaC'] as Complex;
    const c = juliaC || { real: -0.7269, imag: 0.1889 };
    
    let z = { ...point }; // Start with the point itself
    let iterations = 0;

    while (iterations < maxIterations) {
      const magnitudeSq = z.real * z.real + z.imag * z.imag;
      
      if (magnitudeSq > escapeRadius * escapeRadius) {
        return {
          iterations,
          escaped: true,
          finalZ: z,
          convergenceType: 'escaped',
          metadata: { juliaC: c }
        };
      }

      // z = z² + c (where c is constant)
      const newReal = z.real * z.real - z.imag * z.imag + c.real;
      const newImag = 2 * z.real * z.imag + c.imag;
      
      z = { real: newReal, imag: newImag };
      iterations++;
    }

    return {
      iterations,
      escaped: false,
      finalZ: z,
      convergenceType: 'max_iterations',
      metadata: { juliaC: c }
    };
  }

  protected getColor(result: FractalResult, config: FractalConfig): [number, number, number] {
    const color = getColor(result.iterations, config.maxIterations, config.colorPalette as any);
    return [color[0], color[1], color[2]]; // Convert readonly to mutable
  }

  override validateConfig(config: FractalConfig): boolean {
    const juliaC = config['juliaC'] as Complex;
    
    // Najpierw sprawdź bazową konfigurację
    if (!super.validateConfig(config)) {
      return false;
    }
    
    // Sprawdź czy juliaC istnieje i ma poprawne wartości
    if (!juliaC || 
        typeof juliaC.real !== 'number' || 
        typeof juliaC.imag !== 'number' ||
        !isFinite(juliaC.real) ||
        !isFinite(juliaC.imag)) {
      return false;
    }
    
    return true;
  }

  /**
   * Get predefined interesting Julia sets
   */
  static getPresets() {
    return {
      dragon: { real: -0.7269, imag: 0.1889 },
      airplane: { real: -0.75, imag: 0.11 },
      spiral: { real: -0.4, imag: 0.6 },
      dendrite: { real: 0, imag: 1 },
      rabbit: { real: -0.123, imag: 0.745 }
    };
  }
}
