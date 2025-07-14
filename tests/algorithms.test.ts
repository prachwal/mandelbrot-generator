/**
 * Unit tests for specific fractal algorithm implementations
 */

import { MandelbrotFractal } from '../src/algorithms/mandelbrot.js';
import { JuliaFractal } from '../src/algorithms/julia.js';
import type { Complex } from '../src/core/types.js';

describe('MandelbrotFractal', () => {
  let mandelbrot: MandelbrotFractal;

  beforeEach(() => {
    mandelbrot = new MandelbrotFractal();
  });

  describe('algorithm properties', () => {
    test('should have correct identification', () => {
      expect(mandelbrot.id).toBe('mandelbrot');
      expect(mandelbrot.name).toBe('Mandelbrot Set');
      expect(mandelbrot.description).toContain('Classic Mandelbrot');
    });

    test('should have valid default configuration', () => {
      const config = mandelbrot.defaultConfig;
      
      expect(config.width).toBe(800);
      expect(config.height).toBe(600);
      expect(config.centerX).toBe(-0.5);
      expect(config.centerY).toBe(0);
      expect(config.zoom).toBe(1);
      expect(config.maxIterations).toBe(100);
      expect(config.escapeRadius).toBe(2);
      expect(config.colorPalette).toBe('rainbow');
    });

    test('should have parameter schema for UI generation', () => {
      const schema = mandelbrot.parameterSchema;
      
      expect(Array.isArray(schema)).toBe(true);
      expect(schema.length).toBeGreaterThan(0);
      
      // Check for essential parameters
      const iterationsParam = schema.find(p => p.key === 'maxIterations');
      const escapeParam = schema.find(p => p.key === 'escapeRadius');
      const paletteParam = schema.find(p => p.key === 'colorPalette');
      
      expect(iterationsParam).toBeDefined();
      expect(escapeParam).toBeDefined();
      expect(paletteParam).toBeDefined();
    });
  });

  describe('iteration algorithm', () => {
    test('should return max iterations for points in set', () => {
      const config = mandelbrot.defaultConfig;
      
      // Test known points in Mandelbrot set
      const origin = mandelbrot.iterate({ real: 0, imag: 0 }, config);
      expect(origin.iterations).toBe(config.maxIterations);
      expect(origin.escaped).toBe(false);
      
      const cardoid = mandelbrot.iterate({ real: -0.5, imag: 0 }, config);
      expect(cardoid.iterations).toBe(config.maxIterations);
      expect(cardoid.escaped).toBe(false);
    });

    test('should return low iterations for points far from set', () => {
      const config = mandelbrot.defaultConfig;
      
      // Test points known to diverge quickly
      const farPoint = mandelbrot.iterate({ real: 2, imag: 2 }, config);
      expect(farPoint.iterations).toBeLessThan(10);
      expect(farPoint.escaped).toBe(true);
      
      const anotherFar = mandelbrot.iterate({ real: -2, imag: 1.5 }, config);
      expect(anotherFar.iterations).toBeLessThan(20);
      expect(anotherFar.escaped).toBe(true);
    });

    test('should handle different escape radii', () => {
      const baseConfig = mandelbrot.defaultConfig;
      const point: Complex = { real: 1.5, imag: 1.5 };
      
      const result1 = mandelbrot.iterate(point, { ...baseConfig, escapeRadius: 2 });
      const result2 = mandelbrot.iterate(point, { ...baseConfig, escapeRadius: 4 });
      
      // With larger escape radius, iterations should be >= smaller radius
      expect(result2.iterations).toBeGreaterThanOrEqual(result1.iterations);
    });

    test('should handle different max iterations', () => {
      const baseConfig = mandelbrot.defaultConfig;
      const point: Complex = { real: 0, imag: 0 }; // Point in set
      
      const result1 = mandelbrot.iterate(point, { ...baseConfig, maxIterations: 50 });
      const result2 = mandelbrot.iterate(point, { ...baseConfig, maxIterations: 200 });
      
      expect(result1.iterations).toBe(50);
      expect(result2.iterations).toBe(200);
    });

    test('should return proper convergence types', () => {
      const config = mandelbrot.defaultConfig;
      
      const inSet = mandelbrot.iterate({ real: 0, imag: 0 }, config);
      expect(inSet.convergenceType).toBe('max_iterations');
      
      const escaped = mandelbrot.iterate({ real: 2, imag: 2 }, config);
      expect(escaped.convergenceType).toBe('escaped');
    });
  });

  describe('configuration validation', () => {
    test('should validate correct configurations', () => {
      const validConfig = mandelbrot.defaultConfig;
      expect(mandelbrot.validateConfig(validConfig)).toBe(true);
    });

    test('should reject invalid configurations', () => {
      const invalidConfigs = [
        { ...mandelbrot.defaultConfig, maxIterations: 0 },
        { ...mandelbrot.defaultConfig, escapeRadius: -1 },
        { ...mandelbrot.defaultConfig, width: 0 },
        { ...mandelbrot.defaultConfig, height: -5 },
        { ...mandelbrot.defaultConfig, zoom: 0 }
      ];

      invalidConfigs.forEach(config => {
        expect(mandelbrot.validateConfig(config)).toBe(false);
      });
    });
  });
});

describe('JuliaFractal', () => {
  let julia: JuliaFractal;

  beforeEach(() => {
    julia = new JuliaFractal();
  });

  describe('algorithm properties', () => {
    test('should have correct identification', () => {
      expect(julia.id).toBe('julia');
      expect(julia.name).toBe('Julia Sets');
      expect(julia.description).toContain('Julia sets');
    });

    test('should have Julia-specific default configuration', () => {
      const config = julia.defaultConfig;
      
      expect(config.centerX).toBe(0);
      expect(config.centerY).toBe(0);
      expect(config.juliaC).toBeDefined();
      
      const juliaC = config.juliaC as Complex;
      expect(typeof juliaC.real).toBe('number');
      expect(typeof juliaC.imag).toBe('number');
    });

    test('should include Julia constant in parameter schema', () => {
      const schema = julia.parameterSchema;
      
      const juliaCParam = schema.find(p => p.key === 'juliaC');
      expect(juliaCParam).toBeDefined();
      expect(juliaCParam?.type).toBe('complex');
    });
  });

  describe('iteration algorithm', () => {
    test('should use Julia iteration formula', () => {
      const config = {
        ...julia.defaultConfig,
        juliaC: { real: -0.7269, imag: 0.1889 }
      };
      
      // Test with different starting points
      const point1 = julia.iterate({ real: 0, imag: 0 }, config);
      const point2 = julia.iterate({ real: 0.5, imag: 0.5 }, config);
      
      expect(point1).toBeDefined();
      expect(point2).toBeDefined();
      expect(point1.iterations).not.toBe(point2.iterations);
    });

    test('should include Julia constant in metadata', () => {
      const config = {
        ...julia.defaultConfig,
        juliaC: { real: -0.5, imag: 0.6 }
      };
      
      const result = julia.iterate({ real: 0, imag: 0 }, config);
      
      expect(result.metadata).toBeDefined();
      expect(result.metadata?.juliaC).toEqual({ real: -0.5, imag: 0.6 });
    });

    test('should handle different Julia constants', () => {
      const baseConfig = julia.defaultConfig;
      // Użyj punktu który da różne wyniki dla różnych stałych Julia
      const point: Complex = { real: 0.5, imag: 0.5 };
      
      const result1 = julia.iterate(point, {
        ...baseConfig,
        juliaC: { real: -0.5, imag: 0.5 }
      });
      
      const result2 = julia.iterate(point, {
        ...baseConfig,
        juliaC: { real: 0.3, imag: -0.4 }
      });
      
      // Different Julia constants should give different results
      expect(result1.iterations).not.toBe(result2.iterations);
    });
  });

  describe('configuration validation', () => {
    test('should validate Julia-specific configuration', () => {
      const validConfig = {
        ...julia.defaultConfig,
        juliaC: { real: -0.7, imag: 0.3 }
      };
      
      expect(julia.validateConfig(validConfig)).toBe(true);
    });

    test('should reject invalid Julia constants', () => {
      const invalidConfigs = [
        { ...julia.defaultConfig, juliaC: null },
        { ...julia.defaultConfig, juliaC: undefined },
        { ...julia.defaultConfig, juliaC: { real: 'invalid', imag: 0 } as any },
        { ...julia.defaultConfig, juliaC: { real: 0, imag: 'invalid' } as any }
      ];

      invalidConfigs.forEach(config => {
        expect(julia.validateConfig(config)).toBe(false);
      });
    });

    test('should reject Julia constants with infinite values', () => {
      const invalidConfigs = [
        { ...julia.defaultConfig, juliaC: { real: Infinity, imag: 0 } },
        { ...julia.defaultConfig, juliaC: { real: 0, imag: -Infinity } },
        { ...julia.defaultConfig, juliaC: { real: NaN, imag: 0 } },
        { ...julia.defaultConfig, juliaC: { real: 0, imag: NaN } }
      ];

      invalidConfigs.forEach(config => {
        expect(julia.validateConfig(config)).toBe(false);
      });
    });

    test('should handle Julia constant fallback when undefined', () => {
      const config = { ...julia.defaultConfig };
      delete config.juliaC;
      
      const result = julia.iterate({ real: 0, imag: 0 }, config);
      
      expect(result.metadata?.juliaC).toEqual({ real: -0.7269, imag: 0.1889 });
    });

    test('should handle explicit null juliaC', () => {
      const config = {
        ...julia.defaultConfig,
        juliaC: null as any
      };
      
      const result = julia.iterate({ real: 0, imag: 0 }, config);
      
      // Should use default Julia constant
      expect(result.metadata?.juliaC).toEqual({ real: -0.7269, imag: 0.1889 });
    });

    test('should handle explicit undefined juliaC', () => {
      const config = {
        ...julia.defaultConfig,
        juliaC: undefined as any
      };
      
      const result = julia.iterate({ real: 0, imag: 0 }, config);
      
      // Should use default Julia constant
      expect(result.metadata?.juliaC).toEqual({ real: -0.7269, imag: 0.1889 });
    });

    test('should test validation when base validation passes but Julia validation fails', () => {
      // Create a config that passes base validation but fails Julia validation
      const config = {
        ...julia.defaultConfig,
        juliaC: { real: Infinity, imag: 0 }
      };
      
      expect(julia.validateConfig(config)).toBe(false);
    });

    test('should handle case where Julia validation fails regardless of base validation', () => {
      // Create a config with missing juliaC which should fail Julia validation
      const config = {
        ...julia.defaultConfig,
        juliaC: null as any // This should fail Julia-specific validation
      };
      
      expect(julia.validateConfig(config)).toBe(false);
    });
  });

  describe('static presets', () => {
    test('should provide interesting Julia set presets', () => {
      const presets = JuliaFractal.getPresets();
      
      expect(typeof presets).toBe('object');
      expect(Object.keys(presets).length).toBeGreaterThan(0);
      
      // Check that presets contain valid complex numbers
      Object.values(presets).forEach(preset => {
        expect(typeof preset.real).toBe('number');
        expect(typeof preset.imag).toBe('number');
      });
    });

    test('should include well-known Julia sets', () => {
      const presets = JuliaFractal.getPresets();
      
      // Check for all expected presets
      expect(presets.dragon).toBeDefined();
      expect(presets.airplane).toBeDefined();
      expect(presets.spiral).toBeDefined();
      expect(presets.dendrite).toBeDefined();
      expect(presets.rabbit).toBeDefined();
      
      // Verify specific values to ensure they're accessed
      expect(presets.dragon).toEqual({ real: -0.7269, imag: 0.1889 });
      expect(presets.airplane).toEqual({ real: -0.75, imag: 0.11 });
      expect(presets.spiral).toEqual({ real: -0.4, imag: 0.6 });
      expect(presets.dendrite).toEqual({ real: 0, imag: 1 });
      expect(presets.rabbit).toEqual({ real: -0.123, imag: 0.745 });
    });

    test('should return preset values that can be used for Julia generation', () => {
      const presets = JuliaFractal.getPresets();
      
      // Test that preset values work with Julia algorithm
      const dragonConfig = { ...julia.defaultConfig, juliaC: presets.dragon };
      const result = julia.iterate({ real: 0, imag: 0 }, dragonConfig);
      
      expect(result).toBeDefined();
      expect(result.metadata?.juliaC).toEqual(presets.dragon);
    });

    test('should use all preset values for Julia generation', () => {
      const presets = JuliaFractal.getPresets();
      
      // Test all preset values to ensure full coverage
      Object.entries(presets).forEach(([name, preset]) => {
        const config = { ...julia.defaultConfig, juliaC: preset };
        const result = julia.iterate({ real: 0, imag: 0 }, config);
        
        expect(result).toBeDefined();
        expect(result.metadata?.juliaC).toEqual(preset);
      });
    });
  });
});

describe('Fractal Algorithms Integration', () => {
  test('should generate different results for same point', () => {
    const mandelbrot = new MandelbrotFractal();
    const julia = new JuliaFractal();
    
    const point: Complex = { real: 0.3, imag: 0.4 };
    const config = {
      width: 100,
      height: 100,
      centerX: 0,
      centerY: 0,
      zoom: 1,
      maxIterations: 100,
      colorPalette: 'rainbow',
      juliaC: { real: -0.7, imag: 0.3 }
    };
    
    const mandelbrotResult = mandelbrot.iterate(point, config);
    const juliaResult = julia.iterate(point, config);
    
    // Same point should give different results for different algorithms
    expect(mandelbrotResult.iterations).not.toBe(juliaResult.iterations);
  });

  test('should both implement BaseFractal interface correctly', () => {
    const algorithms = [new MandelbrotFractal(), new JuliaFractal()];
    
    algorithms.forEach(alg => {
      // Check required properties
      expect(typeof alg.id).toBe('string');
      expect(typeof alg.name).toBe('string');
      expect(typeof alg.description).toBe('string');
      expect(alg.defaultConfig).toBeDefined();
      expect(Array.isArray(alg.parameterSchema)).toBe(true);
      
      // Check required methods
      expect(typeof alg.iterate).toBe('function');
      expect(typeof alg.validateConfig).toBe('function');
      expect(typeof alg.generateData).toBe('function');
    });
  });
});
