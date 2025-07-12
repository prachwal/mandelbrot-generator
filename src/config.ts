/**
 * Configuration module for Mandelbrot fractal generator
 */

import type { MandelbrotConfig, FractalBounds, InterestingPoints } from './types.js';

/** Default configuration for fractal generation */
export const defaultConfig: MandelbrotConfig = {
    // Image dimensions
    width: 800,
    height: 600,
    
    // Fractal parameters
    maxIterations: 100,
    escapeRadius: 2,
    
    // View area
    zoom: 1,
    centerX: -0.5,
    centerY: 0,
    
    // Color palette
    colorPalette: 'rainbow',
    
    // Output filename (for Node.js)
    outputFile: 'mandelbrot.svg'
} as const;

/**
 * Calculate bounds for fractal rendering based on configuration
 * @param config - Fractal configuration
 * @returns Calculated bounds
 */
export function calculateBounds(config: MandelbrotConfig): FractalBounds {
    const aspectRatio = config.width / config.height;
    const range = 4 / config.zoom; // Base range is 4 (-2 to 2)
    
    const realRange = range * aspectRatio;
    const imaginaryRange = range;
    
    return {
        minReal: config.centerX - realRange / 2,
        maxReal: config.centerX + realRange / 2,
        minImaginary: config.centerY - imaginaryRange / 2,
        maxImaginary: config.centerY + imaginaryRange / 2
    };
}

/** Predefined interesting locations in the Mandelbrot set */
export const interestingPoints: InterestingPoints = {
    classic: {
        centerX: -0.5,
        centerY: 0,
        zoom: 1,
        description: "Classic view of the entire Mandelbrot set"
    },
    elephant: {
        centerX: -0.7269,
        centerY: 0.1889,
        zoom: 100,
        description: "Elephant Valley"
    },
    seahorse: {
        centerX: -0.7463,
        centerY: 0.1102,
        zoom: 1000,
        description: "Seahorse Valley"
    },
    lightning: {
        centerX: -1.25066,
        centerY: 0.02012,
        zoom: 2000,
        description: "Lightning patterns"
    },
    spiral: {
        centerX: -0.8,
        centerY: 0.156,
        zoom: 500,
        description: "Spiral patterns"
    }
} as const;
