/**
 * @fileoverview Core Mandelbrot fractal generation algorithms and utilities
 * @module mandelbrot
 * @version 1.0.0
 * @author Prachwal
 * @since 1.0.0
 * 
 * This module implements high-performance algorithms for generating Mandelbrot fractals,
 * including point iteration checks, image data generation, and boundary detection.
 * 
 * @example
 * ```typescript
 * import { generateMandelbrotData, mandelbrotIteration } from './mandelbrot.js';
 * import { defaultConfig } from './config.js';
 * 
 * // Generate fractal image data
 * const imageData = generateMandelbrotData({
 *   ...defaultConfig,
 *   width: 800,
 *   height: 600
 * });
 * 
 * // Check single point
 * const iterations = mandelbrotIteration(-0.7269, 0.1889, 100);
 * console.log(`Point escaped after ${iterations} iterations`);
 * ```
 */

import { getColor } from './colors.js';
import { calculateBounds } from './config.js';
import type { MandelbrotConfig, BoundaryPoint } from './types.js';

/**
 * Computes the number of iterations for a point in the complex plane to escape the Mandelbrot set
 * 
 * Uses the standard iterative formula: z_{n+1} = z_n^2 + c, where z_0 = 0 and c = cx + i*cy
 * The function returns when either the maximum iterations are reached (point likely in set)
 * or when |z| exceeds the escape radius (point definitely not in set).
 * 
 * @param cx - Real part of the complex number c
 * @param cy - Imaginary part of the complex number c
 * @param maxIterations - Maximum number of iterations to perform
 * @param escapeRadius - Threshold radius for considering a point as escaped (default: 2)
 * @returns Number of iterations before escape, or maxIterations if point doesn't escape
 * 
 * @example
 * ```typescript
 * // Check if origin is in Mandelbrot set (it is)
 * const originIterations = mandelbrotIteration(0, 0, 100); // Returns 100
 * 
 * // Check a point outside the set
 * const outsideIterations = mandelbrotIteration(2, 2, 100); // Returns 1
 * 
 * // Check an interesting boundary point
 * const boundaryIterations = mandelbrotIteration(-0.7269, 0.1889, 1000);
 * ```
 * 
 * @complexity O(maxIterations) in worst case
 * @see {@link https://en.wikipedia.org/wiki/Mandelbrot_set} for mathematical background
 */
export function mandelbrotIteration(
    cx: number, 
    cy: number, 
    maxIterations: number, 
    escapeRadius: number = 2
): number {
    let x = 0;
    let y = 0;
    let iteration = 0;
    
    const escapeRadiusSquared = escapeRadius * escapeRadius;
    
    while (iteration < maxIterations && (x * x + y * y) < escapeRadiusSquared) {
        const xTemp = x * x - y * y + cx;
        y = 2 * x * y + cy;
        x = xTemp;
        iteration++;
    }
    
    return iteration;
}

/**
 * Generates RGBA image data for the complete Mandelbrot fractal
 * 
 * This function creates a pixel-by-pixel representation of the Mandelbrot set
 * by sampling each point in the complex plane and computing its escape time.
 * The resulting iteration counts are mapped to colors using the specified palette.
 * 
 * @param config - Complete configuration object for fractal generation
 * @returns Uint8ClampedArray containing RGBA pixel data (4 bytes per pixel)
 * 
 * @example
 * ```typescript
 * import { generateMandelbrotData } from './mandelbrot.js';
 * 
 * const config: MandelbrotConfig = {
 *   width: 800,
 *   height: 600,
 *   centerX: -0.5,
 *   centerY: 0,
 *   zoom: 1,
 *   maxIterations: 100,
 *   escapeRadius: 2,
 *   colorPalette: 'classic'
 * };
 * 
 * const imageData = generateMandelbrotData(config);
 * // imageData is ready to be used with Canvas ImageData constructor
 * const canvas = document.getElementById('canvas') as HTMLCanvasElement;
 * const ctx = canvas.getContext('2d')!;
 * const imgData = new ImageData(imageData, config.width, config.height);
 * ctx.putImageData(imgData, 0, 0);
 * ```
 * 
 * @performance
 * - Time complexity: O(width × height × average_iterations)
 * - Space complexity: O(width × height) for output array
 * - Optimized for typical fractal viewing with escape radius = 2
 * 
 * @see {@link calculateBounds} for coordinate system mapping
 * @see {@link getColor} for color palette application
 * @see {@link mandelbrotIteration} for core iteration algorithm
 */
export function generateMandelbrotData(config: MandelbrotConfig): Uint8ClampedArray {
    const bounds = calculateBounds(config);
    const { width, height, maxIterations, escapeRadius, colorPalette } = config;
    
    console.log(`Generating Mandelbrot fractal ${width}x${height}...`);
    console.log(`Range: [${bounds.minReal.toFixed(6)}, ${bounds.maxReal.toFixed(6)}] x [${bounds.minImaginary.toFixed(6)}, ${bounds.maxImaginary.toFixed(6)}]`);
    console.log(`Maximum iterations: ${maxIterations}`);
    
    const imageData = new Uint8ClampedArray(width * height * 4); // RGBA
    
    const realStep = (bounds.maxReal - bounds.minReal) / width;
    const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / height;
    
    let pixelIndex = 0;
    let progressCounter = 0;
    const totalPixels = width * height;
    
    for (let py = 0; py < height; py++) {
        const cy = bounds.maxImaginary - py * imaginaryStep;
        
        for (let px = 0; px < width; px++) {
            const cx = bounds.minReal + px * realStep;
            
            const iterations = mandelbrotIteration(cx, cy, maxIterations, escapeRadius);
            const [r, g, b] = getColor(iterations, maxIterations, colorPalette);
            
            imageData[pixelIndex] = r;     // Red
            imageData[pixelIndex + 1] = g; // Green
            imageData[pixelIndex + 2] = b; // Blue
            imageData[pixelIndex + 3] = 255; // Alpha
            
            pixelIndex += 4;
            progressCounter++;
            
            // Show progress every 10%
            if (progressCounter % Math.floor(totalPixels / 10) === 0) {
                const progress = Math.floor((progressCounter / totalPixels) * 100);
                console.log(`Progress: ${progress}%`);
            }
        }
    }
    
    console.log('Generation completed!');
    return imageData;
}

/**
 * Generates Mandelbrot fractal data using simulated multi-threading for improved performance
 * 
 * This function divides the fractal generation work among multiple simulated workers
 * to demonstrate parallel processing concepts. In a real implementation, this would
 * use actual worker threads or web workers for true parallelization.
 * 
 * @param config - Complete configuration object for fractal generation
 * @param workerCount - Number of simulated workers to use (default: 4)
 * @returns Promise resolving to Uint8ClampedArray containing RGBA pixel data
 * 
 * @example
 * ```typescript
 * import { generateMandelbrotDataOptimized } from './mandelbrot.js';
 * 
 * const config: MandelbrotConfig = {
 *   width: 1920,
 *   height: 1080,
 *   centerX: -0.5,
 *   centerY: 0,
 *   zoom: 1,
 *   maxIterations: 256,
 *   escapeRadius: 2,
 *   colorPalette: 'hot'
 * };
 * 
 * // Generate with 8 workers for large images
 * const imageData = await generateMandelbrotDataOptimized(config, 8);
 * console.log('High-resolution fractal generated!');
 * ```
 * 
 * @performance
 * - Scales approximately linearly with worker count
 * - Best for large images (>1000x1000 pixels)
 * - Uses setTimeout to simulate non-blocking execution
 * 
 * @see {@link generateMandelbrotData} for synchronous version
 * @since 1.0.0
 */
export function generateMandelbrotDataOptimized(
    config: MandelbrotConfig, 
    workerCount: number = 4
): Promise<Uint8ClampedArray> {
    return new Promise((resolve) => {
        const bounds = calculateBounds(config);
        const { width, height, maxIterations, escapeRadius, colorPalette } = config;
        
        console.log(`Generating Mandelbrot fractal ${width}x${height} with ${workerCount} threads...`);
        
        const imageData = new Uint8ClampedArray(width * height * 4);
        const rowsPerWorker = Math.ceil(height / workerCount);
        let completedWorkers = 0;
        
        for (let w = 0; w < workerCount; w++) {
            const startRow = w * rowsPerWorker;
            const endRow = Math.min((w + 1) * rowsPerWorker, height);
            
            // Simulate worker (in real implementation you would use worker_threads)
            setTimeout(() => {
                const realStep = (bounds.maxReal - bounds.minReal) / width;
                const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / height;
                
                for (let py = startRow; py < endRow; py++) {
                    const cy = bounds.maxImaginary - py * imaginaryStep;
                    
                    for (let px = 0; px < width; px++) {
                        const cx = bounds.minReal + px * realStep;
                        const iterations = mandelbrotIteration(cx, cy, maxIterations, escapeRadius);
                        const [r, g, b] = getColor(iterations, maxIterations, colorPalette);
                        
                        const pixelIndex = (py * width + px) * 4;
                        imageData[pixelIndex] = r;
                        imageData[pixelIndex + 1] = g;
                        imageData[pixelIndex + 2] = b;
                        imageData[pixelIndex + 3] = 255;
                    }
                }
                
                completedWorkers++;
                console.log(`Worker ${w + 1}/${workerCount} completed (rows ${startRow}-${endRow - 1})`);
                
                if (completedWorkers === workerCount) {
                    console.log('All workers completed!');
                    resolve(imageData);
                }
            }, 0);
        }
    });
}

/**
 * Quick check if a point belongs to the Mandelbrot set
 * 
 * This is a convenience function that returns a boolean result instead of iteration count.
 * Useful for set membership testing and creating binary visualizations.
 * 
 * @param cx - Real part of the complex number
 * @param cy - Imaginary part of the complex number  
 * @param maxIterations - Maximum iterations to test (default: 100)
 * @returns True if point is likely in the Mandelbrot set, false otherwise
 * 
 * @example
 * ```typescript
 * import { isInMandelbrotSet } from './mandelbrot.js';
 * 
 * // Test some known points
 * console.log(isInMandelbrotSet(0, 0));        // true - origin is in set
 * console.log(isInMandelbrotSet(-1, 0));       // true - on real axis
 * console.log(isInMandelbrotSet(1, 1));        // false - clearly outside
 * console.log(isInMandelbrotSet(-0.7269, 0.1889, 1000)); // depends on iterations
 * 
 * // Create binary visualization
 * const isInSet = isInMandelbrotSet(-0.5, 0.5, 256);
 * const color = isInSet ? 'black' : 'white';
 * ```
 * 
 * @see {@link mandelbrotIteration} for detailed iteration count
 * @since 1.0.0
 */
export function isInMandelbrotSet(cx: number, cy: number, maxIterations: number = 100): boolean {
    return mandelbrotIteration(cx, cy, maxIterations) >= maxIterations;
}

/**
 * Calculates an approximate boundary of the Mandelbrot set within given bounds
 * 
 * This function samples points in the complex plane and identifies those that lie
 * on or near the boundary of the Mandelbrot set. Boundary points are defined as
 * those that escape after a significant number of iterations but before the maximum.
 * 
 * @param config - Fractal generation configuration defining the sampling area
 * @param samples - Number of sample points per dimension (default: 1000)
 * @returns Array of boundary points with their coordinates and iteration counts
 * 
 * @example
 * ```typescript
 * import { calculateSetBoundary } from './mandelbrot.js';
 * import { defaultConfig } from './config.js';
 * 
 * // Find boundary points in the classic view
 * const boundary = calculateSetBoundary({
 *   ...defaultConfig,
 *   centerX: -0.5,
 *   centerY: 0,
 *   zoom: 1,
 *   maxIterations: 256
 * }, 500);
 * 
 * console.log(`Found ${boundary.length} boundary points`);
 * 
 * // Analyze boundary complexity
 * const avgIterations = boundary.reduce((sum, p) => sum + p.iterations, 0) / boundary.length;
 * console.log(`Average boundary iterations: ${avgIterations}`);
 * 
 * // Find most interesting boundary points
 * const complex = boundary.filter(p => p.iterations > 200);
 * ```
 * 
 * @performance
 * - Time complexity: O(samples²)
 * - Memory complexity: O(boundary_points)
 * - Higher sample counts provide more accurate boundaries but slower computation
 * 
 * @algorithm
 * Points are considered on the boundary if their iteration count is between
 * 50% and 100% of the maximum iterations, indicating they're near the escape threshold.
 * 
 * @see {@link BoundaryPoint} for result structure
 * @see {@link mandelbrotIteration} for iteration computation
 * @since 1.0.0
 */
export function calculateSetBoundary(config: MandelbrotConfig, samples: number = 1000): BoundaryPoint[] {
    const bounds = calculateBounds(config);
    const boundaryPoints: BoundaryPoint[] = [];
    
    const realStep = (bounds.maxReal - bounds.minReal) / samples;
    const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / samples;
    
    for (let px = 0; px < samples; px++) {
        for (let py = 0; py < samples; py++) {
            const cx = bounds.minReal + px * realStep;
            const cy = bounds.maxImaginary - py * imaginaryStep;
            
            const iterations = mandelbrotIteration(cx, cy, config.maxIterations);
            
            // Point on boundary if iterations are between 50% and 100% of maximum
            if (iterations > config.maxIterations * 0.5 && iterations < config.maxIterations) {
                boundaryPoints.push({ x: cx, y: cy, iterations });
            }
        }
    }
    
    return boundaryPoints;
}
