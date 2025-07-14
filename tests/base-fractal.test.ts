/**
 * Unit tests for BaseFractal abstract class and core functionality
 */

import { BaseFractal } from '../src/core/base-fractal.js';
import type { FractalConfig, FractalResult, Complex, ParameterSchema } from '../src/core/types.js';

// Test implementation of BaseFractal for testing purposes
class TestFractal extends BaseFractal {
  readonly id = 'test';
  readonly name = 'Test Fractal';
  readonly description = 'Test fractal for unit testing';

  readonly defaultConfig: FractalConfig = {
    width: 100,
    height: 100,
    centerX: 0,
    centerY: 0,
    zoom: 1,
    maxIterations: 10,
    escapeRadius: 2,
    colorPalette: 'rainbow'
  };

  readonly parameterSchema: ParameterSchema[] = [
    {
      key: 'maxIterations',
      label: 'Max Iterations',
      type: 'number',
      min: 1,
      max: 100,
      default: 10,
      group: 'computation'
    }
  ];

  iterate(point: Complex, config: FractalConfig): FractalResult {
    // Simple test: return iterations based on distance from origin
    const distance = Math.sqrt(point.real * point.real + point.imag * point.imag);
    const iterations = Math.floor(distance * config.maxIterations);
    
    return {
      iterations: Math.min(iterations, config.maxIterations),
      escaped: distance > 1,
      convergenceType: distance > 1 ? 'escaped' : 'max_iterations'
    };
  }

  protected getColor(result: FractalResult, _config: FractalConfig): [number, number, number] {
    const intensity = result.iterations * 25;
    return [intensity, intensity, intensity];
  }
}

describe('BaseFractal', () => {
  let testFractal: TestFractal;

  beforeEach(() => {
    testFractal = new TestFractal();
  });

  describe('abstract properties', () => {
    test('should have required abstract properties', () => {
      expect(testFractal.id).toBe('test');
      expect(testFractal.name).toBe('Test Fractal');
      expect(testFractal.description).toBe('Test fractal for unit testing');
      expect(testFractal.defaultConfig).toBeDefined();
      expect(testFractal.parameterSchema).toBeDefined();
    });

    test('should have valid parameter schema', () => {
      expect(Array.isArray(testFractal.parameterSchema)).toBe(true);
      expect(testFractal.parameterSchema.length).toBeGreaterThan(0);
      
      const param = testFractal.parameterSchema[0];
      expect(param.key).toBe('maxIterations');
      expect(param.type).toBe('number');
      expect(param.min).toBeDefined();
      expect(param.max).toBeDefined();
    });
  });

  describe('generateData method', () => {
    test('should generate correct size image data', () => {
      const config = { ...testFractal.defaultConfig, width: 10, height: 10 };
      const imageData = testFractal.generateData(config);
      
      expect(imageData).toBeInstanceOf(Uint8ClampedArray);
      expect(imageData.length).toBe(10 * 10 * 4); // width * height * RGBA
    });

    test('should generate valid RGBA values', () => {
      const config = { ...testFractal.defaultConfig, width: 2, height: 2 };
      const imageData = testFractal.generateData(config);
      
      // Check that all values are in valid range (0-255)
      for (let i = 0; i < imageData.length; i++) {
        expect(imageData[i]).toBeGreaterThanOrEqual(0);
        expect(imageData[i]).toBeLessThanOrEqual(255);
      }
      
      // Check that alpha channel is 255
      for (let i = 3; i < imageData.length; i += 4) {
        expect(imageData[i]).toBe(255);
      }
    });

    test('should handle different image sizes', () => {
      const configs = [
        { width: 1, height: 1 },
        { width: 5, height: 3 },
        { width: 100, height: 50 }
      ];

      configs.forEach(({ width, height }) => {
        const config = { ...testFractal.defaultConfig, width, height };
        const imageData = testFractal.generateData(config);
        expect(imageData.length).toBe(width * height * 4);
      });
    });
  });

  describe('screenToComplex method', () => {
    test('should convert screen coordinates to complex plane', () => {
      const config = { ...testFractal.defaultConfig, width: 100, height: 100 };
      const bounds = {
        minX: -2, maxX: 2,
        minY: -2, maxY: 2
      };

      // Test center point
      const center = testFractal['screenToComplex'](50, 50, bounds, config);
      expect(center.real).toBeCloseTo(0, 5);
      expect(center.imag).toBeCloseTo(0, 5);

      // Test corners
      const topLeft = testFractal['screenToComplex'](0, 0, bounds, config);
      expect(topLeft.real).toBeCloseTo(-2, 5);
      expect(topLeft.imag).toBeCloseTo(-2, 5);

      const bottomRight = testFractal['screenToComplex'](99, 99, bounds, config);
      expect(bottomRight.real).toBeCloseTo(1.96, 2);
      expect(bottomRight.imag).toBeCloseTo(1.96, 2);
    });
  });

  describe('calculateBounds method', () => {
    test('should calculate correct bounds for default config', () => {
      const config = { 
        ...testFractal.defaultConfig, 
        centerX: 0, 
        centerY: 0, 
        zoom: 1,
        width: 100,
        height: 100
      };
      
      const bounds = testFractal['calculateBounds'](config);
      
      expect(bounds.minX).toBe(-2);
      expect(bounds.maxX).toBe(2);
      expect(bounds.minY).toBe(-2);
      expect(bounds.maxY).toBe(2);
    });

    test('should handle zoom correctly', () => {
      const config = { 
        ...testFractal.defaultConfig, 
        centerX: 0, 
        centerY: 0, 
        zoom: 2,
        width: 100,
        height: 100
      };
      
      const bounds = testFractal['calculateBounds'](config);
      
      expect(bounds.maxX - bounds.minX).toBe(2); // range = 4/zoom = 4/2 = 2
      expect(bounds.maxY - bounds.minY).toBe(2);
    });

    test('should handle aspect ratio', () => {
      const config = { 
        ...testFractal.defaultConfig, 
        centerX: 0, 
        centerY: 0, 
        zoom: 1,
        width: 200,  // 2:1 aspect ratio
        height: 100
      };
      
      const bounds = testFractal['calculateBounds'](config);
      
      const xRange = bounds.maxX - bounds.minX;
      const yRange = bounds.maxY - bounds.minY;
      
      expect(xRange / yRange).toBeCloseTo(2, 5); // Should match aspect ratio
    });

    test('should handle different center points', () => {
      const config = { 
        ...testFractal.defaultConfig, 
        centerX: 1, 
        centerY: -0.5, 
        zoom: 1,
        width: 100,
        height: 100
      };
      
      const bounds = testFractal['calculateBounds'](config);
      
      const centerX = (bounds.minX + bounds.maxX) / 2;
      const centerY = (bounds.minY + bounds.maxY) / 2;
      
      expect(centerX).toBeCloseTo(1, 5);
      expect(centerY).toBeCloseTo(-0.5, 5);
    });
  });

  describe('iterate method', () => {
    test('should call iterate method correctly', () => {
      const point: Complex = { real: 0, imag: 0 };
      const config = testFractal.defaultConfig;
      
      const result = testFractal.iterate(point, config);
      
      expect(result).toBeDefined();
      expect(typeof result.iterations).toBe('number');
      expect(typeof result.escaped).toBe('boolean');
      expect(result.convergenceType).toBeDefined();
    });

    test('should return different results for different points', () => {
      const config = testFractal.defaultConfig;
      
      const origin = testFractal.iterate({ real: 0, imag: 0 }, config);
      const farPoint = testFractal.iterate({ real: 10, imag: 10 }, config);
      
      expect(origin.iterations).not.toBe(farPoint.iterations);
      expect(origin.escaped).not.toBe(farPoint.escaped);
    });
  });

  describe('validateConfig method', () => {
    test('should validate config by default', () => {
      const result = testFractal.validateConfig(testFractal.defaultConfig);
      expect(result).toBe(true);
    });

    test('should be overrideable in subclasses', () => {
      // This is implicitly tested by the fact that TestFractal can override it
      expect(typeof testFractal.validateConfig).toBe('function');
    });
  });
});

describe('Core Types', () => {
  describe('FractalConfig', () => {
    test('should have required properties', () => {
      const config: FractalConfig = {
        width: 800,
        height: 600,
        centerX: 0,
        centerY: 0,
        zoom: 1,
        maxIterations: 100,
        colorPalette: 'rainbow'
      };

      expect(config.width).toBe(800);
      expect(config.height).toBe(600);
      expect(config.centerX).toBe(0);
      expect(config.centerY).toBe(0);
      expect(config.zoom).toBe(1);
      expect(config.maxIterations).toBe(100);
      expect(config.colorPalette).toBe('rainbow');
    });

    test('should allow additional properties', () => {
      const config: FractalConfig = {
        width: 800,
        height: 600,
        centerX: 0,
        centerY: 0,
        zoom: 1,
        maxIterations: 100,
        colorPalette: 'rainbow',
        customProperty: 'test', // Additional property
        anotherProp: 42
      };

      expect(config.customProperty).toBe('test');
      expect(config.anotherProp).toBe(42);
    });
  });

  describe('FractalResult', () => {
    test('should have required properties', () => {
      const result: FractalResult = {
        iterations: 50,
        escaped: true,
        convergenceType: 'escaped'
      };

      expect(result.iterations).toBe(50);
      expect(result.escaped).toBe(true);
      expect(result.convergenceType).toBe('escaped');
    });

    test('should allow optional properties', () => {
      const result: FractalResult = {
        iterations: 100,
        escaped: false,
        convergenceType: 'max_iterations',
        finalZ: { real: 1.5, imag: -0.3 },
        metadata: { additionalInfo: 'test' }
      };

      expect(result.finalZ).toBeDefined();
      expect(result.metadata).toBeDefined();
      expect(result.metadata?.additionalInfo).toBe('test');
    });
  });

  describe('Complex', () => {
    test('should represent complex numbers correctly', () => {
      const complex: Complex = { real: 1.5, imag: -2.3 };
      
      expect(complex.real).toBe(1.5);
      expect(complex.imag).toBe(-2.3);
    });
  });
});
