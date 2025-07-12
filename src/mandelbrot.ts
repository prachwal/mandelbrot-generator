/**
 * Mandelbrot fractal generation algorithms
 */

import { getColor } from './colors.js';
import { calculateBounds } from './config.js';
import type { MandelbrotConfig, BoundaryPoint } from './types.js';

/**
 * Check if a point belongs to the Mandelbrot set
 * @param cx - Real part of complex number
 * @param cy - Imaginary part of complex number  
 * @param maxIterations - Maximum number of iterations
 * @param escapeRadius - Escape radius threshold
 * @returns Number of iterations before escape
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
 * Generate image data for Mandelbrot fractal
 * @param config - Fractal generation configuration
 * @returns RGBA image data array
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
 * Generate Mandelbrot fractal data with multi-threading simulation
 * @param config - Fractal generation configuration
 * @param workerCount - Number of workers to simulate
 * @returns Promise resolving to RGBA image data array
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
 * Check if a point is in the Mandelbrot set (quick version)
 * @param cx - Real part of complex number
 * @param cy - Imaginary part of complex number
 * @param maxIterations - Maximum number of iterations
 * @returns True if point is in the set
 */
export function isInMandelbrotSet(cx: number, cy: number, maxIterations: number = 100): boolean {
    return mandelbrotIteration(cx, cy, maxIterations) >= maxIterations;
}

/**
 * Calculate approximate boundary of the Mandelbrot set
 * @param config - Fractal generation configuration
 * @param samples - Number of sample points to check
 * @returns Array of boundary points
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
