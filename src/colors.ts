/**
 * Color utilities for Mandelbrot fractal visualization
 */

import type { RGBColor, PaletteType, ColorPalettes } from './types.js';

/**
 * Interpolate between two colors
 * @param color1 - First color
 * @param color2 - Second color
 * @param factor - Interpolation factor (0-1)
 * @returns Interpolated color
 */
function interpolateColor(color1: RGBColor, color2: RGBColor, factor: number): RGBColor {
    const r = Math.round(color1[0] + (color2[0] - color1[0]) * factor);
    const g = Math.round(color1[1] + (color2[1] - color1[1]) * factor);
    const b = Math.round(color1[2] + (color2[2] - color1[2]) * factor);
    return [r, g, b];
}

/**
 * Generate color palette from control points
 * @param controlPoints - Array of control point colors
 * @param size - Size of generated palette
 * @returns Generated color palette
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

/** Predefined color palettes for fractal visualization */
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
 * Get color for given iteration count
 * @param iterations - Number of iterations before escape
 * @param maxIterations - Maximum iterations allowed
 * @param paletteType - Color palette to use
 * @returns RGB color tuple
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
 * Convert RGB values to hex string
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Get color in hex format for given iteration count
 * @param iterations - Number of iterations before escape
 * @param maxIterations - Maximum iterations allowed
 * @param paletteType - Color palette to use
 * @returns Hex color string
 */
export function getColorHex(iterations: number, maxIterations: number, paletteType: PaletteType = 'rainbow'): string {
    const [r, g, b] = getColor(iterations, maxIterations, paletteType);
    return rgbToHex(r, g, b);
}
