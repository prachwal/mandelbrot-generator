/**
 * @fileoverview Color palette generation and management for Mandelbrot fractal visualization
 * @module colors
 * @version 1.0.0
 * @author Prachwal
 * @since 1.0.0
 * 
 * This module provides sophisticated color palette systems for visualizing Mandelbrot fractals.
 * It includes multiple predefined palettes, color interpolation algorithms, and utilities
 * for mapping iteration counts to visually appealing colors.
 * 
 * @example
 * ```typescript
 * import { getColor, COLOR_PALETTES } from './colors.js';
 * 
 * // Get color for a specific iteration count
 * const [r, g, b] = getColor(50, 100, 'classic');
 * 
 * // Use different palettes
 * const hotColor = getColor(75, 200, 'hot');
 * const coolColor = getColor(75, 200, 'cool');
 * 
 * // Access palette data directly
 * const classicPalette = COLOR_PALETTES.classic;
 * ```
 */

import type { RGBColor, PaletteType, ColorPalettes } from './types.js';

/**
 * Smoothly interpolates between two RGB colors using linear interpolation
 * 
 * This function blends two colors based on a factor value, creating smooth
 * color transitions essential for high-quality fractal visualization.
 * 
 * @param color1 - Starting RGB color as [red, green, blue] array
 * @param color2 - Ending RGB color as [red, green, blue] array  
 * @param factor - Interpolation factor between 0.0 and 1.0
 *                 - 0.0 returns color1 exactly
 *                 - 1.0 returns color2 exactly
 *                 - 0.5 returns the midpoint color
 * @returns Interpolated RGB color with values rounded to integers
 * 
 * @example
 * ```typescript
 * // Blend from red to blue
 * const red: RGBColor = [255, 0, 0];
 * const blue: RGBColor = [0, 0, 255];
 * 
 * const purple = interpolateColor(red, blue, 0.5);    // [128, 0, 128]
 * const nearRed = interpolateColor(red, blue, 0.1);   // [230, 0, 26]
 * const nearBlue = interpolateColor(red, blue, 0.9);  // [26, 0, 230]
 * ```
 * 
 * @algorithm Uses component-wise linear interpolation: result = color1 + (color2 - color1) * factor
 * @complexity O(1) - constant time operation
 * @internal Used internally by generatePalette function
 */
function interpolateColor(color1: RGBColor, color2: RGBColor, factor: number): RGBColor {
    const r = Math.round(color1[0] + (color2[0] - color1[0]) * factor);
    const g = Math.round(color1[1] + (color2[1] - color1[1]) * factor);
    const b = Math.round(color1[2] + (color2[2] - color1[2]) * factor);
    return [r, g, b];
}

/**
 * Generates a smooth color palette from a set of control point colors
 * 
 * This function creates a seamless color gradient by interpolating between
 * control points, producing palettes suitable for fractal visualization.
 * The resulting palette provides smooth color transitions across the iteration spectrum.
 * 
 * @param controlPoints - Array of key RGB colors that define the palette's character
 *                       - Must contain at least 2 colors
 *                       - Colors are distributed evenly across the palette range
 * @param size - Number of colors to generate in the final palette (default: 256)
 *              - Higher values provide smoother gradients
 *              - 256 is optimal for most fractal visualizations
 * @returns Read-only array of RGB colors forming a smooth gradient
 * 
 * @example
 * ```typescript
 * // Create a simple red-to-blue palette
 * const palette = generatePalette([
 *   [255, 0, 0],    // Red
 *   [0, 0, 255]     // Blue
 * ], 100);
 * 
 * // Create a fire-like palette
 * const firePalette = generatePalette([
 *   [0, 0, 0],      // Black
 *   [128, 0, 0],    // Dark red
 *   [255, 100, 0],  // Orange
 *   [255, 255, 0],  // Yellow
 *   [255, 255, 255] // White
 * ]);
 * ```
 * 
 * @algorithm
 * 1. Divides the palette into segments between control points
 * 2. For each output color, determines which segment it belongs to
 * 3. Interpolates between the segment's endpoints
 * 4. Handles edge cases at palette boundaries
 * 
 * @complexity O(size) - linear in output palette size
 * @see {@link interpolateColor} for the underlying interpolation algorithm
 * @internal Used internally to build predefined color palettes
 */
function generatePalette(controlPoints: readonly RGBColor[], size: number = 256): readonly RGBColor[] {
    const palette: RGBColor[] = [];
    const segments = controlPoints.length - 1;
    
    for (let i = 0; i < size; i++) {
        const position = (i / (size - 1)) * segments;
        const segmentIndex = Math.floor(position);
        const segmentPosition = position - segmentIndex;
        
        if (segmentIndex >= segments) {
            palette.push(controlPoints[controlPoints.length - 1]);
        } else {
            const color = interpolateColor(
                controlPoints[segmentIndex],
                controlPoints[segmentIndex + 1],
                segmentPosition
            );
            palette.push(color);
        }
    }
    
    return palette;
}

/**
 * Collection of predefined color palettes optimized for Mandelbrot fractal visualization
 * 
 * Each palette is carefully crafted to highlight different aspects of the fractal structure:
 * - **rainbow**: Classic multi-color palette showing intricate details
 * - **fire**: Warm palette emphasizing heat-like patterns  
 * - **cool**: Cool blues and greens for serene visualization
 * - **classic**: Traditional black-to-white gradient
 * - **hot**: Intense reds, oranges, and yellows
 * - **electric**: High-contrast neon colors
 * - **ocean**: Deep blues with white highlights
 * - **sunset**: Warm oranges, pinks, and purples
 * 
 * @example
 * ```typescript
 * import { colorPalettes } from './colors.js';
 * 
 * // Access specific palettes
 * const rainbowColors = colorPalettes.rainbow;
 * const fireColors = colorPalettes.fire;
 * 
 * // Use in configuration
 * const config = {
 *   // ...other settings
 *   colorPalette: 'fire' as const
 * };
 * 
 * // Iterate through all available palettes
 * Object.keys(colorPalettes).forEach(paletteName => {
 *   console.log(`${paletteName}: ${colorPalettes[paletteName].length} colors`);
 * });
 * ```
 * 
 * @see {@link PaletteType} for available palette names
 * @see {@link getColor} for using palettes in fractal generation
 * @since 1.0.0
 */
export const colorPalettes: ColorPalettes = {
    rainbow: generatePalette([
        [66, 30, 15],    // Dark brown
        [25, 7, 26],     // Dark purple
        [9, 1, 47],      // Dark blue
        [4, 4, 73],      // Blue
        [0, 7, 100],     // Light blue
        [12, 44, 138],   // Cyan
        [24, 82, 177],   // Light cyan
        [57, 125, 209],  // Light blue
        [134, 181, 229], // Very light blue
        [211, 236, 248], // White blue
        [241, 233, 191], // Light yellow
        [248, 201, 95],  // Yellow
        [255, 170, 0],   // Orange
        [204, 128, 0],   // Dark orange
        [153, 87, 0],    // Brown
        [106, 52, 3]     // Dark brown
    ]),
    
    fire: generatePalette([
        [0, 0, 0],       // Black
        [32, 0, 0],      // Dark red
        [64, 0, 0],      // Red
        [96, 32, 0],     // Red-orange
        [128, 64, 0],    // Orange
        [160, 96, 32],   // Light orange
        [192, 128, 64],  // Yellow-orange
        [255, 192, 128], // Light yellow
        [255, 255, 192], // Very light yellow
        [255, 255, 255]  // White
    ]),
    
    blue: generatePalette([
        [0, 0, 0],       // Black
        [0, 0, 64],      // Dark blue
        [0, 0, 128],     // Blue
        [0, 64, 192],    // Light blue
        [0, 128, 255],   // Cyan
        [64, 192, 255],  // Light cyan
        [128, 224, 255], // Very light cyan
        [192, 240, 255], // White blue
        [255, 255, 255]  // White
    ]),
    
    grayscale: generatePalette([
        [0, 0, 0],       // Black
        [64, 64, 64],    // Dark gray
        [128, 128, 128], // Gray
        [192, 192, 192], // Light gray
        [255, 255, 255]  // White
    ]),
    
    purple: generatePalette([
        [0, 0, 0],       // Black
        [32, 0, 32],     // Dark purple
        [64, 0, 64],     // Purple
        [96, 32, 96],    // Light purple
        [128, 64, 128],  // Pink-purple
        [160, 96, 160],  // Light pink-purple
        [192, 128, 192], // Pink
        [224, 160, 224], // Light pink
        [255, 192, 255], // Very light pink
        [255, 255, 255]  // White
    ]),
    
    sunset: generatePalette([
        [25, 25, 112],   // Dark blue (night)
        [70, 130, 180],  // Steel blue
        [135, 206, 235], // Light blue
        [255, 165, 0],   // Orange
        [255, 69, 0],    // Red-orange
        [220, 20, 60],   // Crimson
        [139, 0, 139],   // Dark magenta
        [75, 0, 130]     // Indigo
    ])
};

/**
 * Maps iteration count to RGB color using the specified palette
 * 
 * This is the primary function for converting Mandelbrot iteration results into
 * visual colors. It handles both set membership (black) and iteration-based coloring
 * with smooth palette transitions.
 * 
 * @param iterations - Number of iterations before the point escaped (0 to maxIterations)
 * @param maxIterations - Maximum iterations used in the fractal calculation
 * @param paletteType - Name of the color palette to use (default: 'rainbow')
 * @returns RGB color as [red, green, blue] array with values 0-255
 * 
 * @example
 * ```typescript
 * import { getColor } from './colors.js';
 * 
 * // Points in the set are black
 * const setColor = getColor(1000, 1000, 'rainbow'); // [0, 0, 0]
 * 
 * // Points outside get colored by iteration count
 * const escapeColor = getColor(50, 1000, 'fire');   // Warm color
 * const quickEscape = getColor(5, 1000, 'cool');    // Cool color
 * 
 * // Different palettes for same iteration
 * const rainbow = getColor(100, 500, 'rainbow');
 * const fire = getColor(100, 500, 'fire');
 * const ocean = getColor(100, 500, 'ocean');
 * ```
 * 
 * @algorithm
 * 1. If iterations >= maxIterations, return black (point in set)
 * 2. Calculate normalized position in palette (0.0 to 1.0)
 * 3. Map to palette index and return corresponding color
 * 4. Handle edge cases and palette boundaries
 * 
 * @performance O(1) - constant time color lookup
 * @see {@link colorPalettes} for available palette options
 * @see {@link getColorHex} for hexadecimal color output
 * @since 1.0.0
 */
export function getColor(iterations: number, maxIterations: number, paletteType: PaletteType = 'rainbow'): RGBColor {
    if (iterations >= maxIterations) {
        return [0, 0, 0]; // Black for points in the set
    }
    
    const palette = colorPalettes[paletteType] || colorPalettes.rainbow;
    const index = Math.floor((iterations / maxIterations) * (palette.length - 1));
    return palette[index];
}

/**
 * Converts RGB color values to hexadecimal color string format
 * 
 * This utility function transforms individual red, green, and blue components
 * into a standard web-compatible hex color string for use in CSS, HTML,
 * or other systems that expect hex color notation.
 * 
 * @param r - Red component value (0-255)
 * @param g - Green component value (0-255)  
 * @param b - Blue component value (0-255)
 * @returns Hexadecimal color string in format "#RRGGBB"
 * 
 * @example
 * ```typescript
 * import { rgbToHex } from './colors.js';
 * 
 * // Convert primary colors
 * const red = rgbToHex(255, 0, 0);     // "#ff0000"
 * const green = rgbToHex(0, 255, 0);   // "#00ff00"  
 * const blue = rgbToHex(0, 0, 255);    // "#0000ff"
 * 
 * // Convert custom colors
 * const purple = rgbToHex(128, 0, 128); // "#800080"
 * const orange = rgbToHex(255, 165, 0); // "#ffa500"
 * 
 * // Use in web contexts
 * element.style.backgroundColor = rgbToHex(200, 150, 100);
 * ```
 * 
 * @algorithm Uses bit shifting for efficient hex conversion
 * @complexity O(1) - constant time operation
 * @see {@link getColorHex} for direct fractal iteration to hex conversion
 * @since 1.0.0
 */
export function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Maps iteration count directly to hexadecimal color string
 * 
 * Convenience function that combines getColor() and rgbToHex() for direct
 * conversion from Mandelbrot iteration results to web-compatible hex colors.
 * Ideal for web applications, CSS generation, and HTML canvas operations.
 * 
 * @param iterations - Number of iterations before the point escaped
 * @param maxIterations - Maximum iterations used in fractal calculation
 * @param paletteType - Name of the color palette to use (default: 'rainbow')
 * @returns Hexadecimal color string in format "#RRGGBB"
 * 
 * @example
 * ```typescript
 * import { getColorHex } from './colors.js';
 * 
 * // Get hex colors for fractal points
 * const setColor = getColorHex(1000, 1000, 'fire');    // "#000000" (black)
 * const escapeColor = getColorHex(50, 200, 'ocean');   // "#1e3f5c" (blue)
 * 
 * // Use directly in web contexts
 * canvas.style.backgroundColor = getColorHex(75, 100, 'sunset');
 * 
 * // Generate CSS color arrays
 * const cssColors = Array.from({length: 10}, (_, i) => 
 *   getColorHex(i * 10, 100, 'rainbow')
 * );
 * ```
 * 
 * @complexity O(1) - constant time operation
 * @see {@link getColor} for RGB color output
 * @see {@link rgbToHex} for RGB to hex conversion details
 * @since 1.0.0
 */
export function getColorHex(iterations: number, maxIterations: number, paletteType: PaletteType = 'rainbow'): string {
    const [r, g, b] = getColor(iterations, maxIterations, paletteType);
    return rgbToHex(r, g, b);
}
