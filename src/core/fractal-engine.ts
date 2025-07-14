/**
 * @fileoverview Central fractal engine and algorithm registry
 * @module FractalEngine
 */

import type { BaseFractal } from './base-fractal.js';
import type { FractalConfig, FractalInfo, Complex } from './types.js';

/**
 * Central registry and manager for all fractal algorithms
 * Provides plugin-like architecture for adding new fractals
 */
export class FractalEngine {
  private algorithms = new Map<string, BaseFractal>();
  private defaultAlgorithm: string | null = null;

  /**
   * Register a new fractal algorithm
   * @param algorithm - Fractal algorithm instance
   */
  register(algorithm: BaseFractal): void {
    this.algorithms.set(algorithm.id, algorithm);
    
    // Set first registered algorithm as default
    if (!this.defaultAlgorithm) {
      this.defaultAlgorithm = algorithm.id;
    }
  }

  /**
   * Get algorithm by ID
   * @param id - Algorithm identifier
   * @returns Fractal algorithm instance
   */
  getAlgorithm(id: string): BaseFractal | undefined {
    return this.algorithms.get(id);
  }

  /**
   * Get default algorithm
   */
  getDefaultAlgorithm(): BaseFractal | undefined {
    return this.defaultAlgorithm ? this.algorithms.get(this.defaultAlgorithm) : undefined;
  }

  /**
   * Get all available algorithms
   * @returns Array of algorithm metadata
   */
  getAllAlgorithms(): FractalInfo[] {
    return Array.from(this.algorithms.values()).map(alg => ({
      id: alg.id,
      name: alg.name,
      description: alg.description,
      category: this.categorizeAlgorithm(alg),
      defaultConfig: alg.defaultConfig,
      parameterSchema: alg.parameterSchema
    }));
  }

  /**
   * Generate fractal data using specified algorithm
   * @param algorithmId - Algorithm to use
   * @param config - Generation configuration
   * @returns Generated image data
   */
  generateFractal(algorithmId: string, config: FractalConfig): Uint8ClampedArray {
    const algorithm = this.algorithms.get(algorithmId);
    if (!algorithm) {
      throw new Error(`Unknown algorithm: ${algorithmId}`);
    }

    // Validate config
    if (!algorithm.validateConfig(config)) {
      throw new Error(`Invalid configuration for algorithm: ${algorithmId}`);
    }

    return algorithm.generateData(config);
  }

  /**
   * Get iteration result for single point
   * @param algorithmId - Algorithm to use
   * @param point - Point in complex plane
   * @param config - Algorithm configuration
   */
  iteratePoint(algorithmId: string, point: Complex, config: FractalConfig) {
    const algorithm = this.algorithms.get(algorithmId);
    if (!algorithm) {
      throw new Error(`Unknown algorithm: ${algorithmId}`);
    }
    
    return algorithm.iterate(point, config);
  }

  /**
   * Get merged configuration with algorithm defaults
   * @param algorithmId - Algorithm ID
   * @param userConfig - User-provided configuration
   * @returns Merged configuration
   */
  getMergedConfig(algorithmId: string, userConfig: Partial<FractalConfig>): FractalConfig {
    const algorithm = this.algorithms.get(algorithmId);
    if (!algorithm) {
      throw new Error(`Unknown algorithm: ${algorithmId}`);
    }

    return {
      ...algorithm.defaultConfig,
      ...userConfig
    };
  }

  private categorizeAlgorithm(algorithm: BaseFractal): FractalInfo['category'] {
    // Simple categorization based on algorithm name
    // Could be made more sophisticated with proper metadata
    if (algorithm.id.includes('newton')) return 'newton';
    if (algorithm.id.includes('ifs') || algorithm.id.includes('barnsley')) return 'ifs';
    return 'escape_time';
  }
}

// Global instance
export const fractalEngine = new FractalEngine();
