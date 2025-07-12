#!/usr/bin/env node

/**
 * Main entry point for Mandelbrot fractal generator (Node.js version)
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mandelbrotIteration } from './mandelbrot.js';
import { defaultConfig, interestingPoints } from './config.js';
import { getColor } from './colors.js';
import type { MandelbrotConfig, FractalBounds } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

/**
 * Calculate bounds for fractal rendering
 */
function calculateBounds(config: MandelbrotConfig): FractalBounds {
    const aspectRatio = config.width / config.height;
    const range = 4 / config.zoom;
    
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
 * Save fractal as SVG file
 * @param config - Fractal configuration
 * @param filename - Output filename
 * @returns Path to saved file
 */
function saveImageAsSVG(config: MandelbrotConfig, filename: string): string {
    const { width, height } = config;
    
    console.log(`Generating SVG ${width}x${height}...`);
    
    const svg = generateMandelbrotSVG(config);
    
    const outputDir = join(projectRoot, 'output');
    mkdirSync(outputDir, { recursive: true });
    
    const outputPath = join(outputDir, filename.replace('.png', '.svg'));
    writeFileSync(outputPath, svg);
    
    console.log(`Image saved as: ${outputPath}`);
    return outputPath;
}

/**
 * Generate SVG content for Mandelbrot fractal
 * @param config - Fractal configuration
 * @returns SVG string
 */
function generateMandelbrotSVG(config: MandelbrotConfig): string {
    const { width, height, maxIterations, escapeRadius, colorPalette } = config;
    const bounds = calculateBounds(config);
    
    let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
<title>Mandelbrot Fractal</title>
<desc>Center: (${config.centerX}, ${config.centerY}), Zoom: ${config.zoom}x, Iterations: ${maxIterations}</desc>
`;

    const realStep = (bounds.maxReal - bounds.minReal) / width;
    const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / height;
    
    // Generate 2x2 pixel rectangles for better performance
    const pixelSize = 2;
    
    for (let py = 0; py < height; py += pixelSize) {
        const cy = bounds.maxImaginary - py * imaginaryStep;
        
        for (let px = 0; px < width; px += pixelSize) {
            const cx = bounds.minReal + px * realStep;
            
            const iterations = mandelbrotIteration(cx, cy, maxIterations, escapeRadius);
            const [r, g, b] = getColor(iterations, maxIterations, colorPalette);
            
            if (iterations < maxIterations) { // Don't draw black pixels (Mandelbrot set)
                const color = `rgb(${r},${g},${b})`;
                svgContent += `<rect x="${px}" y="${py}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>
`;
            }
        }
        
        // Show progress
        if (py % Math.floor(height / 10) === 0) {
            const progress = Math.floor((py / height) * 100);
            console.log(`SVG Progress: ${progress}%`);
        }
    }
    
    svgContent += '</svg>';
    return svgContent;
}

/**
 * Main function
 */
async function main(): Promise<void> {
    console.log('🎨 Mandelbrot Fractal Generator');
    console.log('=================================\\n');
    
    // Parse command line arguments
    const args = process.argv.slice(2);
    let config: MandelbrotConfig = { ...defaultConfig };
    
    // Check if user wants to use predefined point
    if (args.length > 0) {
        const pointName = args[0];
        if (pointName in interestingPoints) {
            console.log(`Using predefined point: ${pointName}`);
            console.log(`Description: ${interestingPoints[pointName].description}\\n`);
            config = {
                ...config,
                ...interestingPoints[pointName]
            };
        } else {
            console.log(`Available predefined points:`);
            Object.keys(interestingPoints).forEach(key => {
                console.log(`  ${key}: ${interestingPoints[key].description}`);
            });
            console.log(`\\nUsage: npm start [point]\\n`);
        }
    }
    
    // Parse additional parameters
    for (let i = 0; i < args.length; i += 2) {
        const param = args[i];
        const value = args[i + 1];
        
        switch (param) {
            case '--width':
                config = { ...config, width: parseInt(value) };
                break;
            case '--height':
                config = { ...config, height: parseInt(value) };
                break;
            case '--iterations':
                config = { ...config, maxIterations: parseInt(value) };
                break;
            case '--zoom':
                config = { ...config, zoom: parseFloat(value) };
                break;
            case '--centerX':
                config = { ...config, centerX: parseFloat(value) };
                break;
            case '--centerY':
                config = { ...config, centerY: parseFloat(value) };
                break;
            case '--palette':
                config = { ...config, colorPalette: value as any };
                break;
            case '--output':
                config = { ...config, outputFile: value };
                break;
        }
    }
    
    console.log('Configuration:');
    console.log(`  Size: ${config.width}x${config.height}`);
    console.log(`  Center: (${config.centerX}, ${config.centerY})`);
    console.log(`  Zoom: ${config.zoom}x`);
    console.log(`  Iterations: ${config.maxIterations}`);
    console.log(`  Palette: ${config.colorPalette}`);
    console.log(`  Output file: ${config.outputFile}\\n`);
    
    try {
        const startTime = Date.now();
        
        // Generate as SVG
        const outputPath = saveImageAsSVG(config, config.outputFile || 'mandelbrot.svg');
        
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        
        console.log(`\\n✅ Done! Generation time: ${duration.toFixed(2)}s`);
        console.log(`📁 File location: ${outputPath}`);
        
        // Show statistics
        const totalPixels = config.width * config.height;
        console.log(`📊 Format: SVG`);
        console.log(`🔢 Pixels: ${totalPixels.toLocaleString()}`);
        console.log(`⚡ Pixels/second: ${Math.round(totalPixels / duration).toLocaleString()}`);
        
    } catch (error) {
        console.error('❌ Error during generation:', (error as Error).message);
        process.exit(1);
    }
}

// Export types and functions for library usage
export * from './types.js';
export * from './mandelbrot.js';
export * from './colors.js';
export * from './config.js';
export { main };

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}
