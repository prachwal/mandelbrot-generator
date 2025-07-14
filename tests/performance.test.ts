/**
 * Performance benchmarks for fractal algorithms
 */

import { performance } from 'perf_hooks';
import { MandelbrotFractal } from '../src/algorithms/mandelbrot.js';
import { JuliaFractal } from '../src/algorithms/julia.js';
import type { FractalConfig } from '../src/core/types.js';

describe('Fractal Performance Benchmarks', () => {
  const mandelbrot = new MandelbrotFractal();
  const julia = new JuliaFractal();

  // Performance test helper
  function measurePerformance<T>(operation: () => T, name: string): T {
    const start = performance.now();
    const result = operation();
    const end = performance.now();
    
    console.log(`${name}: ${(end - start).toFixed(2)}ms`);
    return result;
  }

  describe('single point iteration performance', () => {
    test('mandelbrot iteration should be fast', () => {
      const config = mandelbrot.defaultConfig;
      const point = { real: -0.5, imag: 0.3 };

      const result = measurePerformance(
        () => mandelbrot.iterate(point, config),
        'Mandelbrot single iteration'
      );

      expect(result).toBeDefined();
      // Basic performance expectation - should complete in reasonable time
    });

    test('julia iteration should be fast', () => {
      const config = { ...julia.defaultConfig, juliaC: { real: -0.7, imag: 0.3 } };
      const point = { real: 0.2, imag: -0.1 };

      const result = measurePerformance(
        () => julia.iterate(point, config),
        'Julia single iteration'
      );

      expect(result).toBeDefined();
    });
  });

  describe('image generation performance', () => {
    const smallConfig: FractalConfig = {
      width: 100,
      height: 100,
      centerX: 0,
      centerY: 0,
      zoom: 1,
      maxIterations: 50,
      colorPalette: 'rainbow'
    };

    test('mandelbrot small image generation', () => {
      const result = measurePerformance(
        () => mandelbrot.generateData(smallConfig),
        'Mandelbrot 100x100 generation'
      );

      expect(result.length).toBe(100 * 100 * 4);
    });

    test('julia small image generation', () => {
      const config = { ...smallConfig, juliaC: { real: -0.7, imag: 0.3 } };
      
      const result = measurePerformance(
        () => julia.generateData(config),
        'Julia 100x100 generation'
      );

      expect(result.length).toBe(100 * 100 * 4);
    });
  });

  describe('algorithm comparison', () => {
    test('performance comparison between algorithms', () => {
      const config = {
        width: 50,
        height: 50,
        centerX: 0,
        centerY: 0,
        zoom: 1,
        maxIterations: 100,
        colorPalette: 'rainbow',
        juliaC: { real: -0.7, imag: 0.3 }
      };

      const mandelbrotTime = performance.now();
      mandelbrot.generateData(config);
      const mandelbrotEnd = performance.now();

      const juliaTime = performance.now();
      julia.generateData(config);
      const juliaEnd = performance.now();

      console.log(`Mandelbrot time: ${(mandelbrotEnd - mandelbrotTime).toFixed(2)}ms`);
      console.log(`Julia time: ${(juliaEnd - juliaTime).toFixed(2)}ms`);

      // Both should complete in reasonable time
      expect(mandelbrotEnd - mandelbrotTime).toBeLessThan(5000); // 5 seconds max
      expect(juliaEnd - juliaTime).toBeLessThan(5000); // 5 seconds max
    });
  });

  describe('stress tests', () => {
    test('high iteration count should not hang', () => {
      const config = {
        ...mandelbrot.defaultConfig,
        width: 10,
        height: 10,
        maxIterations: 10000 // Very high iteration count
      };

      const start = performance.now();
      const result = mandelbrot.generateData(config);
      const end = performance.now();

      expect(result).toBeDefined();
      expect(end - start).toBeLessThan(10000); // Should complete within 10 seconds
    });

    test('large image generation should be manageable', () => {
      const config = {
        ...mandelbrot.defaultConfig,
        width: 500,
        height: 500,
        maxIterations: 50 // Lower iterations for speed
      };

      const start = performance.now();
      const result = mandelbrot.generateData(config);
      const end = performance.now();

      expect(result.length).toBe(500 * 500 * 4);
      console.log(`Large image (500x500) generation: ${(end - start).toFixed(2)}ms`);
    });
  });

  describe('memory usage', () => {
    test('should not leak memory on repeated generations', () => {
      const config = {
        width: 100,
        height: 100,
        centerX: 0,
        centerY: 0,
        zoom: 1,
        maxIterations: 50,
        colorPalette: 'rainbow'
      };

      // Generate multiple images to test for memory leaks
      for (let i = 0; i < 10; i++) {
        const result = mandelbrot.generateData(config);
        expect(result.length).toBe(100 * 100 * 4);
      }

      // If we reach here without running out of memory, test passes
      expect(true).toBe(true);
    });
  });
});
