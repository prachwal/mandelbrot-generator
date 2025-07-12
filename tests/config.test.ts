/**
 * Unit tests for configuration module
 */

import { defaultConfig, calculateBounds, interestingPoints } from '../src/config.js';
import type { MandelbrotConfig } from '../src/types.js';

describe('defaultConfig', () => {
    test('should have valid default values', () => {
        expect(defaultConfig.width).toBe(800);
        expect(defaultConfig.height).toBe(600);
        expect(defaultConfig.maxIterations).toBe(100);
        expect(defaultConfig.escapeRadius).toBe(2);
        expect(defaultConfig.centerX).toBe(-0.5);
        expect(defaultConfig.centerY).toBe(0);
        expect(defaultConfig.zoom).toBe(1);
        expect(defaultConfig.colorPalette).toBe('rainbow');
    });

    test('should be a valid MandelbrotConfig', () => {
        const config: MandelbrotConfig = defaultConfig;
        expect(config).toBeDefined();
        expect(typeof config.width).toBe('number');
        expect(typeof config.height).toBe('number');
        expect(typeof config.maxIterations).toBe('number');
        expect(typeof config.escapeRadius).toBe('number');
        expect(typeof config.centerX).toBe('number');
        expect(typeof config.centerY).toBe('number');
        expect(typeof config.zoom).toBe('number');
        expect(typeof config.colorPalette).toBe('string');
    });

    test('should have positive dimensions', () => {
        expect(defaultConfig.width).toBeGreaterThan(0);
        expect(defaultConfig.height).toBeGreaterThan(0);
    });

    test('should have reasonable iteration count', () => {
        expect(defaultConfig.maxIterations).toBeGreaterThan(0);
        expect(defaultConfig.maxIterations).toBeLessThanOrEqual(10000);
    });

    test('should have valid escape radius', () => {
        expect(defaultConfig.escapeRadius).toBeGreaterThan(0);
        expect(defaultConfig.escapeRadius).toBeLessThanOrEqual(10);
    });
});

describe('calculateBounds', () => {
    test('should calculate correct bounds for default config', () => {
        const bounds = calculateBounds(defaultConfig);
        
        expect(bounds).toHaveProperty('minReal');
        expect(bounds).toHaveProperty('maxReal');
        expect(bounds).toHaveProperty('minImaginary');
        expect(bounds).toHaveProperty('maxImaginary');
        
        expect(bounds.minReal).toBeLessThan(bounds.maxReal);
        expect(bounds.minImaginary).toBeLessThan(bounds.maxImaginary);
    });

    test('should handle different zoom levels', () => {
        const config1: MandelbrotConfig = { ...defaultConfig, zoom: 1 };
        const config2: MandelbrotConfig = { ...defaultConfig, zoom: 2 };
        
        const bounds1 = calculateBounds(config1);
        const bounds2 = calculateBounds(config2);
        
        const width1 = bounds1.maxReal - bounds1.minReal;
        const width2 = bounds2.maxReal - bounds2.minReal;
        
        expect(width2).toBeLessThan(width1); // Higher zoom = smaller bounds
    });

    test('should handle different center points', () => {
        const config1: MandelbrotConfig = { ...defaultConfig, centerX: 0, centerY: 0 };
        const config2: MandelbrotConfig = { ...defaultConfig, centerX: 1, centerY: 1 };
        
        const bounds1 = calculateBounds(config1);
        const bounds2 = calculateBounds(config2);
        
        expect(bounds2.minReal).toBeGreaterThan(bounds1.minReal);
        expect(bounds2.maxReal).toBeGreaterThan(bounds1.maxReal);
        expect(bounds2.minImaginary).toBeGreaterThan(bounds1.minImaginary);
        expect(bounds2.maxImaginary).toBeGreaterThan(bounds1.maxImaginary);
    });

    test('should handle different aspect ratios', () => {
        const config1: MandelbrotConfig = { ...defaultConfig, width: 800, height: 600 };
        const config2: MandelbrotConfig = { ...defaultConfig, width: 600, height: 800 };
        
        const bounds1 = calculateBounds(config1);
        const bounds2 = calculateBounds(config2);
        
        const width1 = bounds1.maxReal - bounds1.minReal;
        const height1 = bounds1.maxImaginary - bounds1.minImaginary;
        const width2 = bounds2.maxReal - bounds2.minReal;
        const height2 = bounds2.maxImaginary - bounds2.minImaginary;
        
        expect(width1 / height1).toBeGreaterThan(width2 / height2);
    });

    test('should preserve aspect ratio', () => {
        const configs = [
            { width: 400, height: 300 },
            { width: 800, height: 600 },
            { width: 1600, height: 1200 }
        ];

        configs.forEach(({ width, height }) => {
            const config: MandelbrotConfig = { ...defaultConfig, width, height };
            const bounds = calculateBounds(config);
            
            const boundsWidth = bounds.maxReal - bounds.minReal;
            const boundsHeight = bounds.maxImaginary - bounds.minImaginary;
            const boundsAspectRatio = boundsWidth / boundsHeight;
            const imageAspectRatio = width / height;
            
            expect(Math.abs(boundsAspectRatio - imageAspectRatio)).toBeLessThan(0.01);
        });
    });

    test('should work with extreme zoom values', () => {
        const config1: MandelbrotConfig = { ...defaultConfig, zoom: 0.1 };
        const config2: MandelbrotConfig = { ...defaultConfig, zoom: 100 };
        
        const bounds1 = calculateBounds(config1);
        const bounds2 = calculateBounds(config2);
        
        expect(bounds1.maxReal - bounds1.minReal).toBeGreaterThan(bounds2.maxReal - bounds2.minReal);
        expect(bounds1.maxImaginary - bounds1.minImaginary).toBeGreaterThan(bounds2.maxImaginary - bounds2.minImaginary);
    });
});

describe('interestingPoints', () => {
    test('should be an object with predefined points', () => {
        expect(typeof interestingPoints).toBe('object');
        expect(interestingPoints).not.toBeNull();
        
        const pointKeys = Object.keys(interestingPoints);
        expect(pointKeys.length).toBeGreaterThan(0);
        
        pointKeys.forEach(key => {
            const point = interestingPoints[key as keyof typeof interestingPoints];
            expect(point).toHaveProperty('centerX');
            expect(point).toHaveProperty('centerY');
            expect(point).toHaveProperty('zoom');
            expect(point).toHaveProperty('description');
            
            expect(typeof point.centerX).toBe('number');
            expect(typeof point.centerY).toBe('number');
            expect(typeof point.zoom).toBe('number');
            expect(typeof point.description).toBe('string');
        });
    });

    test('should have reasonable coordinate values', () => {
        const pointKeys = Object.keys(interestingPoints);
        pointKeys.forEach(key => {
            const point = interestingPoints[key as keyof typeof interestingPoints];
            expect(point.centerX).toBeGreaterThanOrEqual(-3);
            expect(point.centerX).toBeLessThanOrEqual(3);
            expect(point.centerY).toBeGreaterThanOrEqual(-3);
            expect(point.centerY).toBeLessThanOrEqual(3);
        });
    });

    test('should have positive zoom values', () => {
        const pointKeys = Object.keys(interestingPoints);
        pointKeys.forEach(key => {
            const point = interestingPoints[key as keyof typeof interestingPoints];
            expect(point.zoom).toBeGreaterThan(0);
        });
    });

    test('should have non-empty descriptions', () => {
        const pointKeys = Object.keys(interestingPoints);
        pointKeys.forEach(key => {
            const point = interestingPoints[key as keyof typeof interestingPoints];
            expect(point.description.length).toBeGreaterThan(0);
        });
    });

    test('should include classic interesting points', () => {
        expect(interestingPoints).toHaveProperty('classic');
        expect(interestingPoints).toHaveProperty('elephant');
        expect(interestingPoints).toHaveProperty('seahorse');
        expect(interestingPoints).toHaveProperty('spiral');
    });

    test('should have unique zoom levels', () => {
        const pointKeys = Object.keys(interestingPoints);
        const zooms = pointKeys.map(key => interestingPoints[key as keyof typeof interestingPoints].zoom);
        const uniqueZooms = [...new Set(zooms)];
        
        expect(uniqueZooms.length).toBeGreaterThan(1);
    });
});
