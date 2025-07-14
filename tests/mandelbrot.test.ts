/**
 * Unit tests for Mandelbrot fractal generation modules
 */

import {
    mandelbrotIteration,
    generateMandelbrotData,
    generateMandelbrotDataOptimized,
    isInMandelbrotSet,
    calculateSetBoundary
} from '../src/mandelbrot.js';

import { getColor, rgbToHex, getColorHex } from '../src/colors.js';
import { defaultConfig } from '../src/config.js';
import type { MandelbrotConfig } from '../src/types.js';

describe('mandelbrotIteration', () => {
    test('should return maxIterations for point (0, 0)', () => {
        const result = mandelbrotIteration(0, 0, 100);
        expect(result).toBe(100); // Point (0,0) is in the set
    });

    test('should return small iteration count for point far from set', () => {
        const result = mandelbrotIteration(2, 2, 100);
        expect(result).toBeLessThan(10); // Point (2,2) diverges quickly
    });

    test('should return max iterations for point in set', () => {
        const result = mandelbrotIteration(-0.5, 0, 100);
        expect(result).toBe(100); // Point (-0.5, 0) is in the set
    });

    test('should work with custom escape radius', () => {
        const result1 = mandelbrotIteration(1.5, 1.5, 100, 2);
        const result2 = mandelbrotIteration(1.5, 1.5, 100, 4);
        expect(result2).toBeGreaterThanOrEqual(result1); // Larger radius = more iterations
    });

    test('should return 0 for maxIterations = 0', () => {
        const result = mandelbrotIteration(0, 0, 0);
        expect(result).toBe(0);
    });

    test('should handle point on set boundary', () => {
        const result = mandelbrotIteration(-0.7269, 0.1889, 100);
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(100);
    });
});

describe('generateMandelbrotData', () => {
    test('should generate image data of correct size', () => {
        const config: MandelbrotConfig = {
            width: 10,
            height: 10,
            maxIterations: 50,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = generateMandelbrotData(config);
        
        expect(imageData).toBeInstanceOf(Uint8ClampedArray);
        expect(imageData.length).toBe(10 * 10 * 4); // RGBA
    });

    test('should generate correct data for small image', () => {
        const config: MandelbrotConfig = {
            width: 2,
            height: 2,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = generateMandelbrotData(config);
        
        // Check that all pixels have valid RGBA values
        for (let i = 0; i < imageData.length; i += 4) {
            expect(imageData[i]).toBeGreaterThanOrEqual(0);     // R
            expect(imageData[i]).toBeLessThanOrEqual(255);      // R
            expect(imageData[i + 1]).toBeGreaterThanOrEqual(0); // G
            expect(imageData[i + 1]).toBeLessThanOrEqual(255);  // G
            expect(imageData[i + 2]).toBeGreaterThanOrEqual(0); // B
            expect(imageData[i + 2]).toBeLessThanOrEqual(255);  // B
            expect(imageData[i + 3]).toBe(255);                 // A (always 255)
        }
    });

    test('should handle different image sizes', () => {
        const configs = [
            { width: 1, height: 1 },
            { width: 5, height: 3 },
            { width: 3, height: 5 }
        ];

        configs.forEach(({ width, height }) => {
            const config: MandelbrotConfig = {
                width,
                height,
                maxIterations: 10,
                escapeRadius: 2,
                centerX: 0,
                centerY: 0,
                zoom: 1,
                colorPalette: 'rainbow'
            };

            const imageData = generateMandelbrotData(config);
            expect(imageData.length).toBe(width * height * 4);
        });
    });

    test('should show progress for larger image', () => {
        const config: MandelbrotConfig = {
            width: 100,
            height: 100,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        // Temporarily capture console.log
        const consoleLogs: string[] = [];
        const originalConsoleLog = console.log;
        console.log = (message: string) => consoleLogs.push(message);

        const imageData = generateMandelbrotData(config);
        
        // Restore console.log
        console.log = originalConsoleLog;
        
        expect(imageData).toBeInstanceOf(Uint8ClampedArray);
        expect(imageData.length).toBe(100 * 100 * 4);
        
        // Check if progress messages were displayed
        const progressMessages = consoleLogs.filter(log => 
            typeof log === 'string' && log.includes('Progress:')
        );
        expect(progressMessages.length).toBeGreaterThan(0);
    });
});

describe('generateMandelbrotDataOptimized', () => {
    test('should return Promise with image data', async () => {
        const config: MandelbrotConfig = {
            width: 4,
            height: 4,
            maxIterations: 20,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = await generateMandelbrotDataOptimized(config, 2);
        
        expect(imageData).toBeInstanceOf(Uint8ClampedArray);
        expect(imageData.length).toBe(4 * 4 * 4);
    });

    test('should work with different worker counts', async () => {
        const config: MandelbrotConfig = {
            width: 6,
            height: 6,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const results = await Promise.all([
            generateMandelbrotDataOptimized(config, 1),
            generateMandelbrotDataOptimized(config, 2),
            generateMandelbrotDataOptimized(config, 3)
        ]);

        results.forEach(imageData => {
            expect(imageData).toBeInstanceOf(Uint8ClampedArray);
            expect(imageData.length).toBe(6 * 6 * 4);
        });
    });

    test('should handle case when workers exceed rows', async () => {
        const config: MandelbrotConfig = {
            width: 2,
            height: 2,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = await generateMandelbrotDataOptimized(config, 5);
        expect(imageData.length).toBe(2 * 2 * 4);
    });
});

describe('isInMandelbrotSet', () => {
    test('should return true for points in set', () => {
        expect(isInMandelbrotSet(0, 0, 100)).toBe(true);
        expect(isInMandelbrotSet(-0.5, 0, 100)).toBe(true);
        expect(isInMandelbrotSet(-1, 0, 100)).toBe(true);
    });

    test('should return false for points outside set', () => {
        expect(isInMandelbrotSet(2, 2, 100)).toBe(false);
        expect(isInMandelbrotSet(1, 1, 100)).toBe(false);
        expect(isInMandelbrotSet(-2, 2, 100)).toBe(false);
    });

    test('should use default maxIterations', () => {
        expect(isInMandelbrotSet(0, 0)).toBe(true);
        expect(isInMandelbrotSet(2, 2)).toBe(false);
    });

    test('should work with different maxIterations values', () => {
        const result1 = isInMandelbrotSet(-0.7, 0.1, 10);
        const result2 = isInMandelbrotSet(-0.7, 0.1, 1000);
        
        expect(typeof result1).toBe('boolean');
        expect(typeof result2).toBe('boolean');
    });
});

describe('calculateSetBoundary', () => {
    test('should return array of boundary points', () => {
        const config: MandelbrotConfig = {
            width: 10,
            height: 10,
            maxIterations: 50,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const boundaryPoints = calculateSetBoundary(config, 5);
        
        expect(Array.isArray(boundaryPoints)).toBe(true);
        
        boundaryPoints.forEach(point => {
            expect(point).toHaveProperty('x');
            expect(point).toHaveProperty('y');
            expect(point).toHaveProperty('iterations');
            expect(typeof point.x).toBe('number');
            expect(typeof point.y).toBe('number');
            expect(typeof point.iterations).toBe('number');
            expect(point.iterations).toBeGreaterThan(config.maxIterations * 0.5);
            expect(point.iterations).toBeLessThan(config.maxIterations);
        });
    });

    test('should work with default sample count', () => {
        const config: MandelbrotConfig = {
            width: 10,
            height: 10,
            maxIterations: 20,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const boundaryPoints = calculateSetBoundary(config);
        expect(Array.isArray(boundaryPoints)).toBe(true);
    });

    test('should handle different configurations', () => {
        const configs = [
            { maxIterations: 10, zoom: 1 },
            { maxIterations: 50, zoom: 2 },
            { maxIterations: 100, zoom: 0.5 }
        ];

        configs.forEach(configOverride => {
            const config: MandelbrotConfig = {
                width: 5,
                height: 5,
                escapeRadius: 2,
                centerX: 0,
                centerY: 0,
                colorPalette: 'rainbow',
                ...configOverride
            };

            const boundaryPoints = calculateSetBoundary(config, 3);
            expect(Array.isArray(boundaryPoints)).toBe(true);
        });
    });

    test('should handle different sample counts', () => {
        const config: MandelbrotConfig = {
            width: 10,
            height: 10,
            maxIterations: 50,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const samples = [1, 3, 5, 10];
        
        samples.forEach(sampleCount => {
            const boundaryPoints = calculateSetBoundary(config, sampleCount);
            expect(Array.isArray(boundaryPoints)).toBe(true);
        });
    });
});

describe('color functions', () => {
    describe('getColor', () => {
        test('should return black for max iterations', () => {
            const color = getColor(100, 100, 'rainbow');
            expect(color).toEqual([0, 0, 0]);
        });

        test('should return colored values for partial iterations', () => {
            const color = getColor(50, 100, 'rainbow');
            expect(color).toHaveLength(3);
            expect(color[0]).toBeGreaterThanOrEqual(0);
            expect(color[0]).toBeLessThanOrEqual(255);
            expect(color[1]).toBeGreaterThanOrEqual(0);
            expect(color[1]).toBeLessThanOrEqual(255);
            expect(color[2]).toBeGreaterThanOrEqual(0);
            expect(color[2]).toBeLessThanOrEqual(255);
        });

        test('should work with different palettes', () => {
            const palettes = ['rainbow', 'fire', 'blue', 'grayscale', 'purple', 'sunset'] as const;
            
            palettes.forEach(palette => {
                const color = getColor(25, 100, palette);
                expect(color).toHaveLength(3);
                expect(Array.isArray(color)).toBe(true);
            });
        });

        test('should fallback to rainbow for unknown palette', () => {
            const color1 = getColor(25, 100, 'rainbow');
            const color2 = getColor(25, 100, 'unknown' as any);
            expect(color1).toEqual(color2);
        });
    });

    describe('rgbToHex', () => {
        test('should convert RGB to hex correctly', () => {
            expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
            expect(rgbToHex(0, 0, 0)).toBe('#000000');
            expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
            expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
            expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
        });

        test('should handle intermediate values', () => {
            expect(rgbToHex(128, 128, 128)).toBe('#808080');
            expect(rgbToHex(255, 128, 64)).toBe('#ff8040');
        });

        test('should pad single digit hex values', () => {
            expect(rgbToHex(1, 2, 3)).toBe('#010203');
            expect(rgbToHex(15, 15, 15)).toBe('#0f0f0f');
        });
    });

    describe('getColorHex', () => {
        test('should return hex color for iterations', () => {
            const hex = getColorHex(50, 100, 'rainbow');
            expect(hex).toMatch(/^#[0-9a-f]{6}$/);
        });

        test('should return black hex for max iterations', () => {
            const hex = getColorHex(100, 100, 'rainbow');
            expect(hex).toBe('#000000');
        });

        test('should work with different palettes', () => {
            const palettes = ['rainbow', 'fire', 'blue', 'grayscale', 'purple', 'sunset'] as const;
            
            palettes.forEach(palette => {
                const hex = getColorHex(25, 100, palette);
                expect(hex).toMatch(/^#[0-9a-f]{6}$/);
            });
        });

        test('should use default palette when none specified', () => {
            const hex = getColorHex(25, 100);
            expect(hex).toMatch(/^#[0-9a-f]{6}$/);
        });
    });
});
