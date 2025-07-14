/**
 * Unit tests for FractalEngine registry system
 */

import { FractalEngine } from '../src/core/fractal-engine.js';
import { BaseFractal } from '../src/core/base-fractal.js';
import type { FractalConfig, FractalResult, Complex, ParameterSchema } from '../src/core/types.js';

// Mock fractal implementations for testing
class MockFractal1 extends BaseFractal {
  readonly id = 'mock1';
  readonly name = 'Mock Fractal 1';
  readonly description = 'First mock fractal';

  readonly defaultConfig: FractalConfig = {
    width: 100,
    height: 100,
    centerX: 0,
    centerY: 0,
    zoom: 1,
    maxIterations: 50,
    colorPalette: 'rainbow'
  };

  readonly parameterSchema: ParameterSchema[] = [
    {
      key: 'maxIterations',
      label: 'Iterations',
      type: 'number',
      default: 50,
      group: 'computation'
    }
  ];

  iterate(point: Complex, _config: FractalConfig): FractalResult {
    return {
      iterations: Math.floor(Math.random() * 50),
      escaped: point.real > 0,
      convergenceType: 'escaped'
    };
  }

  protected getColor(_result: FractalResult, _config: FractalConfig): [number, number, number] {
    return [255, 0, 0];
  }
}

class MockFractal2 extends BaseFractal {
  readonly id = 'mock2';
  readonly name = 'Mock Fractal 2';
  readonly description = 'Second mock fractal';

  readonly defaultConfig: FractalConfig = {
    width: 200,
    height: 150,
    centerX: -1,
    centerY: 0.5,
    zoom: 2,
    maxIterations: 100,
    colorPalette: 'fire'
  };

  readonly parameterSchema: ParameterSchema[] = [
    {
      key: 'maxIterations',
      label: 'Max Iterations',
      type: 'number',
      default: 100,
      group: 'computation'
    },
    {
      key: 'customParam',
      label: 'Custom Parameter',
      type: 'boolean',
      default: true,
      group: 'fractal'
    }
  ];

  iterate(_point: Complex, config: FractalConfig): FractalResult {
    return {
      iterations: config.maxIterations,
      escaped: false,
      convergenceType: 'max_iterations'
    };
  }

  protected getColor(_result: FractalResult, _config: FractalConfig): [number, number, number] {
    return [0, 255, 0];
  }
}

describe('FractalEngine', () => {
  let engine: FractalEngine;
  let mock1: MockFractal1;
  let mock2: MockFractal2;

  beforeEach(() => {
    engine = new FractalEngine();
    mock1 = new MockFractal1();
    mock2 = new MockFractal2();
  });

  describe('register method', () => {
    test('should register fractal algorithm', () => {
      engine.register(mock1);
      
      const retrieved = engine.getAlgorithm('mock1');
      expect(retrieved).toBe(mock1);
    });

    test('should set first registered algorithm as default', () => {
      engine.register(mock1);
      
      const defaultAlg = engine.getDefaultAlgorithm();
      expect(defaultAlg).toBe(mock1);
    });

    test('should not change default when registering additional algorithms', () => {
      engine.register(mock1);
      engine.register(mock2);
      
      const defaultAlg = engine.getDefaultAlgorithm();
      expect(defaultAlg).toBe(mock1); // Still the first one
    });

    test('should allow multiple algorithms', () => {
      engine.register(mock1);
      engine.register(mock2);
      
      expect(engine.getAlgorithm('mock1')).toBe(mock1);
      expect(engine.getAlgorithm('mock2')).toBe(mock2);
    });
  });

  describe('getAlgorithm method', () => {
    beforeEach(() => {
      engine.register(mock1);
      engine.register(mock2);
    });

    test('should return registered algorithm by id', () => {
      expect(engine.getAlgorithm('mock1')).toBe(mock1);
      expect(engine.getAlgorithm('mock2')).toBe(mock2);
    });

    test('should return undefined for unknown algorithm', () => {
      expect(engine.getAlgorithm('unknown')).toBeUndefined();
    });
  });

  describe('getDefaultAlgorithm method', () => {
    test('should return undefined when no algorithms registered', () => {
      const defaultAlg = engine.getDefaultAlgorithm();
      expect(defaultAlg).toBeUndefined();
    });

    test('should return first registered algorithm as default', () => {
      engine.register(mock1);
      
      const defaultAlg = engine.getDefaultAlgorithm();
      expect(defaultAlg).toBe(mock1);
    });
  });

  describe('getAllAlgorithms method', () => {
    test('should return empty array when no algorithms registered', () => {
      const algorithms = engine.getAllAlgorithms();
      expect(algorithms).toEqual([]);
    });

    test('should return all registered algorithms info', () => {
      engine.register(mock1);
      engine.register(mock2);
      
      const algorithms = engine.getAllAlgorithms();
      
      expect(algorithms).toHaveLength(2);
      expect(algorithms[0].id).toBe('mock1');
      expect(algorithms[0].name).toBe('Mock Fractal 1');
      expect(algorithms[1].id).toBe('mock2');
      expect(algorithms[1].name).toBe('Mock Fractal 2');
    });

    test('should include all required properties in algorithm info', () => {
      engine.register(mock1);
      
      const algorithms = engine.getAllAlgorithms();
      const alg = algorithms[0];
      
      expect(alg).toHaveProperty('id');
      expect(alg).toHaveProperty('name');
      expect(alg).toHaveProperty('description');
      expect(alg).toHaveProperty('category');
      expect(alg).toHaveProperty('defaultConfig');
      expect(alg).toHaveProperty('parameterSchema');
    });
  });

  describe('generateFractal method', () => {
    beforeEach(() => {
      engine.register(mock1);
    });

    test('should generate fractal using specified algorithm', () => {
      const config = { ...mock1.defaultConfig, width: 10, height: 10 };
      
      const imageData = engine.generateFractal('mock1', config);
      
      expect(imageData).toBeInstanceOf(Uint8ClampedArray);
      expect(imageData.length).toBe(10 * 10 * 4);
    });

    test('should throw error for unknown algorithm', () => {
      const config = mock1.defaultConfig;
      
      expect(() => {
        engine.generateFractal('unknown', config);
      }).toThrow('Unknown algorithm: unknown');
    });

    test('should validate config before generation', () => {
      // Mock validation to fail
      const originalValidate = mock1.validateConfig;
      mock1.validateConfig = () => false;
      
      const config = mock1.defaultConfig;
      
      expect(() => {
        engine.generateFractal('mock1', config);
      }).toThrow('Invalid configuration for algorithm: mock1');
      
      // Restore original method
      mock1.validateConfig = originalValidate;
    });
  });

  describe('iteratePoint method', () => {
    beforeEach(() => {
      engine.register(mock1);
    });

    test('should iterate single point using specified algorithm', () => {
      const point: Complex = { real: 1, imag: 0.5 };
      const config = mock1.defaultConfig;
      
      const result = engine.iteratePoint('mock1', point, config);
      
      expect(result).toBeDefined();
      expect(typeof result.iterations).toBe('number');
      expect(typeof result.escaped).toBe('boolean');
    });

    test('should throw error for unknown algorithm', () => {
      const point: Complex = { real: 0, imag: 0 };
      const config = mock1.defaultConfig;
      
      expect(() => {
        engine.iteratePoint('unknown', point, config);
      }).toThrow('Unknown algorithm: unknown');
    });
  });

  describe('getMergedConfig method', () => {
    beforeEach(() => {
      engine.register(mock1);
    });

    test('should merge user config with algorithm defaults', () => {
      const userConfig = { width: 500, maxIterations: 200 };
      
      const merged = engine.getMergedConfig('mock1', userConfig);
      
      expect(merged.width).toBe(500); // User override
      expect(merged.maxIterations).toBe(200); // User override
      expect(merged.height).toBe(100); // Default from algorithm
      expect(merged.centerX).toBe(0); // Default from algorithm
    });

    test('should throw error for unknown algorithm', () => {
      expect(() => {
        engine.getMergedConfig('unknown', {});
      }).toThrow('Unknown algorithm: unknown');
    });

    test('should return complete config even with empty user input', () => {
      const merged = engine.getMergedConfig('mock1', {});
      
      expect(merged).toEqual(mock1.defaultConfig);
    });
  });

  describe('algorithm categorization', () => {
    test('should categorize algorithms correctly', () => {
      engine.register(mock1);
      
      const algorithms = engine.getAllAlgorithms();
      const category = algorithms[0].category;
      
      expect(['escape_time', 'newton', 'ifs', 'other']).toContain(category);
    });

    test('should categorize newton algorithms', () => {
      // Create a mock newton fractal
      class MockNewtonFractal extends BaseFractal {
        readonly id = 'newton-raphson';
        readonly name = 'Mock Newton Fractal';
        readonly description = 'Newton fractal for testing';

        readonly defaultConfig: FractalConfig = {
          width: 100,
          height: 100,
          centerX: 0,
          centerY: 0,
          zoom: 1,
          maxIterations: 50,
          colorPalette: 'rainbow'
        };

        readonly parameterSchema: ParameterSchema[] = [];

        iterate(_point: Complex, _config: FractalConfig): FractalResult {
          return {
            iterations: 25,
            escaped: true,
            convergenceType: 'escaped'
          };
        }

        protected getColor(_result: FractalResult, _config: FractalConfig): [number, number, number] {
          return [255, 0, 0];
        }
      }
      const newton = new MockNewtonFractal();
      
      engine.register(newton);
      
      const algorithms = engine.getAllAlgorithms();
      const newtonAlg = algorithms.find(alg => alg.id === 'newton-raphson');
      
      expect(newtonAlg?.category).toBe('newton');
    });

    test('should categorize IFS algorithms', () => {
      // Create mock IFS fractals
      class MockIFSFractal extends BaseFractal {
        readonly id = 'ifs-fern';
        readonly name = 'Mock IFS Fractal';
        readonly description = 'IFS fractal for testing';

        readonly defaultConfig: FractalConfig = {
          width: 100,
          height: 100,
          centerX: 0,
          centerY: 0,
          zoom: 1,
          maxIterations: 50,
          colorPalette: 'rainbow'
        };

        readonly parameterSchema: ParameterSchema[] = [];

        iterate(_point: Complex, _config: FractalConfig): FractalResult {
          return {
            iterations: 25,
            escaped: true,
            convergenceType: 'escaped'
          };
        }

        protected getColor(_result: FractalResult, _config: FractalConfig): [number, number, number] {
          return [0, 255, 0];
        }
      }

      class MockBarnsleyFractal extends BaseFractal {
        readonly id = 'barnsley-fern';
        readonly name = 'Mock Barnsley Fractal';
        readonly description = 'Barnsley fractal for testing';

        readonly defaultConfig: FractalConfig = {
          width: 100,
          height: 100,
          centerX: 0,
          centerY: 0,
          zoom: 1,
          maxIterations: 50,
          colorPalette: 'rainbow'
        };

        readonly parameterSchema: ParameterSchema[] = [];

        iterate(_point: Complex, _config: FractalConfig): FractalResult {
          return {
            iterations: 25,
            escaped: true,
            convergenceType: 'escaped'
          };
        }

        protected getColor(_result: FractalResult, _config: FractalConfig): [number, number, number] {
          return [0, 0, 255];
        }
      }
      
      const ifs = new MockIFSFractal();
      const barnsley = new MockBarnsleyFractal();
      
      engine.register(ifs);
      engine.register(barnsley);
      
      const algorithms = engine.getAllAlgorithms();
      const ifsAlg = algorithms.find(alg => alg.id === 'ifs-fern');
      const barnsleyAlg = algorithms.find(alg => alg.id === 'barnsley-fern');
      
      expect(ifsAlg?.category).toBe('ifs');
      expect(barnsleyAlg?.category).toBe('ifs');
    });

    test('should categorize other algorithms as escape_time by default', () => {
      engine.register(mock1); // 'mock1' doesn't contain newton, ifs, or barnsley
      
      const algorithms = engine.getAllAlgorithms();
      const category = algorithms[0].category;
      
      expect(category).toBe('escape_time');
    });
  });
});

describe('FractalEngine integration', () => {
  test('should handle complete workflow', () => {
    const engine = new FractalEngine();
    const fractal = new MockFractal1();
    
    // Register algorithm
    engine.register(fractal);
    
    // Get available algorithms
    const algorithms = engine.getAllAlgorithms();
    expect(algorithms).toHaveLength(1);
    
    // Merge config
    const config = engine.getMergedConfig('mock1', { width: 50 });
    expect(config.width).toBe(50);
    
    // Generate fractal
    const imageData = engine.generateFractal('mock1', config);
    expect(imageData.length).toBe(50 * 100 * 4); // width * height * RGBA
    
    // Iterate single point
    const result = engine.iteratePoint('mock1', { real: 0, imag: 0 }, config);
    expect(result).toBeDefined();
  });
});
