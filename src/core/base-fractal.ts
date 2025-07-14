/**
 * @fileoverview Base abstract class for all fractal algorithms
 * @module BaseFractal
 */

import type { FractalConfig, FractalResult, Complex, ParameterSchema, Bounds } from './types';

/**
 * Abstract base class for all fractal algorithms
 * Provides common interface and functionality for fractal generation
 */
export abstract class BaseFractal {
  /** Unique identifier for this fractal type */
  abstract readonly id: string;
  
  /** Human-readable name */
  abstract readonly name: string;
  
  /** Description of the fractal */
  abstract readonly description: string;
  
  /** Default configuration for this fractal */
  abstract readonly defaultConfig: FractalConfig;
  
  /** Parameter schema for UI generation */
  abstract readonly parameterSchema: ParameterSchema[];

  /**
   * Core iteration function - must be implemented by each fractal
   * @param point - Point in complex plane to test
   * @param config - Fractal-specific configuration
   * @returns Iteration result (escape time, convergence info, etc.)
   */
  abstract iterate(point: Complex, config: FractalConfig): FractalResult;

  /**
   * Generate fractal data for given configuration
   * @param config - Generation configuration
   * @returns Image data array
   */
  generateData(config: FractalConfig): Uint8ClampedArray {
    const { width, height } = config;
    const imageData = new Uint8ClampedArray(width * height * 4);
    const bounds = this.calculateBounds(config);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const point = this.screenToComplex(x, y, bounds, config);
        const result = this.iterate(point, config);
        const color = this.getColor(result, config);
        
        const index = (y * width + x) * 4;
        imageData[index] = color[0];     // R
        imageData[index + 1] = color[1]; // G
        imageData[index + 2] = color[2]; // B
        imageData[index + 3] = 255;      // A
      }
    }
    
    return imageData;
  }

  /**
   * Convert screen coordinates to complex plane
   */
  protected screenToComplex(x: number, y: number, bounds: Bounds, config: FractalConfig): Complex {
    const real = bounds.minX + (x / config.width) * (bounds.maxX - bounds.minX);
    const imag = bounds.minY + (y / config.height) * (bounds.maxY - bounds.minY);
    return { real, imag };
  }

  /**
   * Calculate bounds of complex plane for given config
   */
  protected calculateBounds(config: FractalConfig): Bounds {
    const { centerX, centerY, zoom, width, height } = config;
    const aspectRatio = width / height;
    const range = 4 / zoom;
    
    return {
      minX: centerX - range * aspectRatio / 2,
      maxX: centerX + range * aspectRatio / 2,
      minY: centerY - range / 2,
      maxY: centerY + range / 2
    };
  }

  /**
   * Get color for fractal result
   */
  protected abstract getColor(result: FractalResult, config: FractalConfig): [number, number, number];

  /**
   * Validate configuration for this fractal type
   */
  validateConfig(_config: FractalConfig): boolean {
    return true; // Override in subclasses if needed
  }
}
