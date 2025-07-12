/**
 * @fileoverview Configuration management and utilities for Mandelbrot fractal generation
 * @module config  
 * @version 1.0.0
 * @author Prachwal
 * @since 1.0.0
 * 
 * This module provides default configurations, coordinate system calculations,
 * and predefined interesting locations for exploring the Mandelbrot set.
 * It handles the mathematical mapping between screen coordinates and the complex plane.
 * 
 * @example
 * ```typescript
 * import { defaultConfig, calculateBounds, interestingPoints } from './config.js';
 * 
 * // Use default configuration
 * const config = { ...defaultConfig, maxIterations: 200 };
 * 
 * // Calculate coordinate bounds
 * const bounds = calculateBounds(config);
 * console.log(`Viewing: ${bounds.minReal} to ${bounds.maxReal}`);
 * 
 * // Jump to interesting location
 * const elephant = interestingPoints.elephant;
 * const elephantConfig = {
 *   ...defaultConfig,
 *   centerX: elephant.centerX,
 *   centerY: elephant.centerY,
 *   zoom: elephant.zoom
 * };
 * ```
 */

import type { MandelbrotConfig, FractalBounds, InterestingPoints } from './types.js';

/**
 * Default configuration object for Mandelbrot fractal generation
 * 
 * Provides sensible defaults for all fractal generation parameters.
 * These settings produce a classic view of the Mandelbrot set with good
 * performance and visual quality suitable for most applications.
 * 
 * @example
 * ```typescript
 * import { defaultConfig } from './config.js';
 * 
 * // Use as-is for quick generation
 * const imageData = generateMandelbrotData(defaultConfig);
 * 
 * // Customize specific properties
 * const highRes = {
 *   ...defaultConfig,
 *   width: 1920,
 *   height: 1080,
 *   maxIterations: 256
 * };
 * 
 * // Override color palette
 * const fireVersion = {
 *   ...defaultConfig,
 *   colorPalette: 'fire' as const
 * };
 * ```
 * 
 * @property width - Image width in pixels (800px - good balance of detail/speed)
 * @property height - Image height in pixels (600px - maintains 4:3 aspect ratio)
 * @property maxIterations - Iteration limit (100 - sufficient for overview)
 * @property escapeRadius - Escape threshold (2 - mathematical standard)
 * @property zoom - Magnification level (1 - full set visible)
 * @property centerX - Real axis center (-0.5 - classic centering)
 * @property centerY - Imaginary axis center (0 - symmetric view)
 * @property colorPalette - Visual theme ('rainbow' - shows fine detail)
 * @property outputFile - File output name for Node.js usage
 * 
 * @readonly This object is marked as readonly to prevent accidental mutation
 * @see {@link MandelbrotConfig} for complete type definition
 * @since 1.0.0
 */
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
 * Calculates the complex plane bounds for fractal rendering based on configuration
 * 
 * This function performs the critical coordinate transformation from screen/image
 * coordinates to the complex plane coordinates needed for Mandelbrot calculations.
 * It handles aspect ratio correction and zoom level mapping.
 * 
 * @param config - Complete fractal generation configuration
 * @returns Object containing the real and imaginary bounds of the viewing area
 * 
 * @example
 * ```typescript
 * import { calculateBounds, defaultConfig } from './config.js';
 * 
 * // Calculate bounds for default view
 * const bounds = calculateBounds(defaultConfig);
 * console.log(`Real: [${bounds.minReal}, ${bounds.maxReal}]`);
 * console.log(`Imag: [${bounds.minImaginary}, ${bounds.maxImaginary}]`);
 * 
 * // Calculate bounds for zoomed view
 * const zoomedConfig = {
 *   ...defaultConfig,
 *   centerX: -0.7269,
 *   centerY: 0.1889, 
 *   zoom: 100
 * };
 * const zoomedBounds = calculateBounds(zoomedConfig);
 * 
 * // Calculate pixel-to-complex mapping
 * const realStep = (bounds.maxReal - bounds.minReal) / config.width;
 * const imagStep = (bounds.maxImaginary - bounds.minImaginary) / config.height;
 * ```
 * 
 * @algorithm
 * 1. Calculate base range (4 units) divided by zoom level
 * 2. Adjust for aspect ratio to prevent distortion
 * 3. Center the view around centerX, centerY coordinates
 * 4. Return symmetric bounds around the center point
 * 
 * @mathematics
 * - Base viewing window: [-2, 2] × [-2, 2] in complex plane
 * - Zoom factor directly affects viewing window size: range = 4 / zoom
 * - Aspect ratio correction: realRange = range × (width / height)
 * 
 * @see {@link FractalBounds} for return type definition
 * @see {@link MandelbrotConfig} for input parameter details
 * @since 1.0.0
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

/**
 * Collection of mathematically and visually interesting locations within the Mandelbrot set
 * 
 * These predefined points showcase different aspects of the fractal's infinite complexity,
 * from the classic full view to intricate self-similar details at various zoom levels.
 * Each location is carefully chosen to demonstrate unique patterns and structures.
 * 
 * @example
 * ```typescript
 * import { interestingPoints, generateMandelbrotData } from './mandelbrot.js';
 * 
 * // Explore the elephant valley
 * const elephantConfig = {
 *   width: 800,
 *   height: 600,
 *   maxIterations: 256,
 *   escapeRadius: 2,
 *   colorPalette: 'fire' as const,
 *   ...interestingPoints.elephant
 * };
 * 
 * // Generate images for all interesting points
 * Object.entries(interestingPoints).forEach(([name, point]) => {
 *   console.log(`${name}: ${point.description}`);
 *   const config = { ...defaultConfig, ...point };
 *   const imageData = generateMandelbrotData(config);
 * });
 * 
 * // Create a zoom sequence
 * const zoomLevels = [1, 10, 100, 1000];
 * const sequence = zoomLevels.map(zoom => ({
 *   ...defaultConfig,
 *   ...interestingPoints.elephant,
 *   zoom
 * }));
 * ```
 * 
 * @property classic - Full view showing the entire main body and major bulbs
 * @property elephant - Famous "Elephant Valley" showing self-similar elephant-like shapes
 * @property seahorse - Delicate seahorse patterns in intricate detail
 * @property lightning - Branching lightning-like structures
 * @property spiral - Beautiful spiral formations and curves
 * 
 * @mathematics Each point represents a specific location in the complex plane:
 * - **Real axis (centerX)**: Horizontal position in complex plane
 * - **Imaginary axis (centerY)**: Vertical position in complex plane  
 * - **Zoom level**: Magnification factor (1 = full set, higher = more detail)
 * 
 * @see {@link InterestingPoints} for type definition
 * @see {@link InterestingPoint} for individual point structure
 * @since 1.0.0
 */
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
