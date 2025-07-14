/**
 * Burning Ship fractal implementation
 */

import { BaseFractal } from '../core/base-fractal.js';
import type { FractalConfig, FractalResult, Complex } from '../core/types.js';
import { getColor } from '../colors.js';

export class BurningShipFractal extends BaseFractal {
  readonly id = 'burning-ship';
  readonly name = 'Burning Ship';
  readonly description = 'Burning Ship fractal using abs(z)² + c';

  readonly defaultConfig: FractalConfig = {
    width: 800,
    height: 600,
    centerX: -0.5,
    centerY: -0.6,
    zoom: 1,
    maxIterations: 100,
    escapeRadius: 2,
    colorPalette: 'fire'
  };

  readonly parameterSchema = [
    {
      key: 'maxIterations',
      label: 'Max Iterations',
      type: 'number' as const,
      min: 10,
      max: 2000,
      step: 10,
      default: 100,
      group: 'computation'
    }
    // ... więcej parametrów
  ];

  iterate(point: Complex, config: FractalConfig): FractalResult {
    const { maxIterations, escapeRadius = 2 } = config;
    let z = { real: 0, imag: 0 };
    let iterations = 0;

    while (iterations < maxIterations) {
      const magnitudeSq = z.real * z.real + z.imag * z.imag;
      
      if (magnitudeSq > escapeRadius * escapeRadius) {
        return { iterations, escaped: true, convergenceType: 'escaped' };
      }

      // Kluczowa różnica: abs() przed kwadratem
      const newReal = Math.abs(z.real) * Math.abs(z.real) - 
                      Math.abs(z.imag) * Math.abs(z.imag) + point.real;
      const newImag = 2 * Math.abs(z.real) * Math.abs(z.imag) + point.imag;
      
      z = { real: newReal, imag: newImag };
      iterations++;
    }

    return { iterations, escaped: false, convergenceType: 'max_iterations' };
  }

  protected getColor(result: FractalResult, config: FractalConfig): [number, number, number] {
    const color = getColor(result.iterations, config.maxIterations, config.colorPalette as any);
    return [color[0], color[1], color[2]]; // Convert readonly to mutable
  }
}

// Rejestracja w index.ts:
// fractalEngine.register(new BurningShipFractal());
