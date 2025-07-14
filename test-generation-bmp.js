/**
 * Test file for generating various fractal models with different parameters
 * Results are saved to output/ folder which is ignored in .gitignore
 */

import { MandelbrotFractal } from './dist/algorithms/mandelbrot.js';
import { JuliaFractal } from './dist/algorithms/julia.js';
import { FractalEngine } from './dist/core/fractal-engine.js';
import { saveAsBMP } from './image-formats.js';
import fs from 'fs';
import path from 'path';

// Ensure output directory exists
const outputDir = './output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Initialize fractal engine
const engine = new FractalEngine();
const mandelbrot = new MandelbrotFractal();
const julia = new JuliaFractal();

engine.register(mandelbrot);
engine.register(julia);

/**
 * Save image using BMP format (more compact and widely supported)
 */
function saveImage(imageData, width, height, filename) {
  const filepath = path.join(outputDir, filename);
  saveAsBMP(imageData, width, height, filepath);
}

/**
 * Generate test configurations for Mandelbrot set
 */
function generateMandelbrotTests() {
  console.log('\n🌀 Generating Mandelbrot Set variations...');
  
  const baseConfig = mandelbrot.defaultConfig;
  
  const testConfigs = [
    // Standard view
    {
      ...baseConfig,
      width: 400,
      height: 400,
      centerX: -0.5,
      centerY: 0,
      zoom: 1,
      maxIterations: 100,
      colorPalette: 'rainbow',
      filename: 'mandelbrot_standard.bmp'
    },
    
    // Zoomed into interesting area
    {
      ...baseConfig,
      width: 400,
      height: 400,
      centerX: -0.235125,
      centerY: 0.827215,
      zoom: 100,
      maxIterations: 200,
      colorPalette: 'fire',
      filename: 'mandelbrot_zoomed.bmp'
    },
    
    // High iteration detail
    {
      ...baseConfig,
      width: 300,
      height: 300,
      centerX: -0.8,
      centerY: 0.156,
      zoom: 50,
      maxIterations: 500,
      colorPalette: 'cool',
      filename: 'mandelbrot_detailed.bmp'
    },
    
    // Different color palette
    {
      ...baseConfig,
      width: 350,
      height: 350,
      centerX: -0.16,
      centerY: 1.0407,
      zoom: 200,
      maxIterations: 300,
      colorPalette: 'electric',
      filename: 'mandelbrot_electric.bmp'
    }
  ];
  
  testConfigs.forEach((config, index) => {
    try {
      console.log(`  Generating ${config.filename}...`);
      const imageData = engine.generateFractal('mandelbrot', config);
      saveImage(imageData, config.width, config.height, config.filename);
    } catch (error) {
      console.error(`  ❌ Error generating ${config.filename}:`, error.message);
    }
  });
}

/**
 * Generate test configurations for Julia sets
 */
function generateJuliaTests() {
  console.log('\n🌸 Generating Julia Set variations...');
  
  const baseConfig = julia.defaultConfig;
  const presets = JuliaFractal.getPresets();
  
  // Test with predefined presets
  const presetConfigs = Object.entries(presets).map(([name, juliaC]) => ({
    ...baseConfig,
    width: 350,
    height: 350,
    centerX: 0,
    centerY: 0,
    zoom: 1.5,
    maxIterations: 150,
    colorPalette: 'rainbow',
    juliaC,
    filename: `julia_${name}.bmp`
  }));
  
  // Additional custom Julia sets
  const customConfigs = [
    {
      ...baseConfig,
      width: 400,
      height: 400,
      centerX: 0,
      centerY: 0,
      zoom: 2,
      maxIterations: 200,
      colorPalette: 'fire',
      juliaC: { real: -0.4, imag: 0.6 },
      filename: 'julia_custom_1.bmp'
    },
    
    {
      ...baseConfig,
      width: 400,
      height: 400,
      centerX: 0,
      centerY: 0,
      zoom: 1.8,
      maxIterations: 250,
      colorPalette: 'cool',
      juliaC: { real: 0.285, imag: 0.01 },
      filename: 'julia_custom_2.bmp'
    },
    
    {
      ...baseConfig,
      width: 350,
      height: 350,
      centerX: 0,
      centerY: 0,
      zoom: 1.2,
      maxIterations: 180,
      colorPalette: 'electric',
      juliaC: { real: -0.8, imag: 0.156 },
      filename: 'julia_custom_3.bmp'
    }
  ];
  
  const allJuliaConfigs = [...presetConfigs, ...customConfigs];
  
  allJuliaConfigs.forEach((config) => {
    try {
      console.log(`  Generating ${config.filename}...`);
      const imageData = engine.generateFractal('julia', config);
      saveImage(imageData, config.width, config.height, config.filename);
    } catch (error) {
      console.error(`  ❌ Error generating ${config.filename}:`, error.message);
    }
  });
}

/**
 * Generate comparison images with different parameters
 */
function generateComparisonTests() {
  console.log('\n🔍 Generating parameter comparison tests...');
  
  // Test different iteration counts
  const iterationTests = [50, 100, 200, 500].map(iterations => ({
    ...mandelbrot.defaultConfig,
    width: 200,
    height: 200,
    centerX: -0.235125,
    centerY: 0.827215,
    zoom: 80,
    maxIterations: iterations,
    colorPalette: 'rainbow',
    filename: `comparison_iterations_${iterations}.bmp`
  }));
  
  // Test different zoom levels
  const zoomTests = [1, 10, 50, 200].map(zoom => ({
    ...mandelbrot.defaultConfig,
    width: 200,
    height: 200,
    centerX: -0.16,
    centerY: 1.0407,
    zoom: zoom,
    maxIterations: 150,
    colorPalette: 'fire',
    filename: `comparison_zoom_${zoom}x.bmp`
  }));
  
  // Test different color palettes
  const paletteTests = ['rainbow', 'fire', 'cool', 'electric'].map(palette => ({
    ...julia.defaultConfig,
    width: 200,
    height: 200,
    centerX: 0,
    centerY: 0,
    zoom: 1.5,
    maxIterations: 150,
    colorPalette: palette,
    juliaC: JuliaFractal.getPresets().dragon,
    filename: `comparison_palette_${palette}.bmp`
  }));
  
  const allComparisonConfigs = [...iterationTests, ...zoomTests, ...paletteTests];
  
  allComparisonConfigs.forEach((config) => {
    try {
      const algorithmId = config.juliaC ? 'julia' : 'mandelbrot';
      console.log(`  Generating ${config.filename}...`);
      const imageData = engine.generateFractal(algorithmId, config);
      saveImage(imageData, config.width, config.height, config.filename);
    } catch (error) {
      console.error(`  ❌ Error generating ${config.filename}:`, error.message);
    }
  });
}

/**
 * Generate performance test images (different sizes)
 */
function generatePerformanceTests() {
  console.log('\n⚡ Generating performance test images...');
  
  const sizes = [
    { width: 100, height: 100, name: 'small' },
    { width: 400, height: 400, name: 'medium' },
    { width: 800, height: 600, name: 'large' }
  ];
  
  sizes.forEach(({ width, height, name }) => {
    const startTime = Date.now();
    
    try {
      const config = {
        ...mandelbrot.defaultConfig,
        width,
        height,
        centerX: -0.5,
        centerY: 0,
        zoom: 1,
        maxIterations: 100,
        colorPalette: 'rainbow'
      };
      
      console.log(`  Generating ${name} (${width}x${height})...`);
      const imageData = engine.generateFractal('mandelbrot', config);
      saveImage(imageData, width, height, `performance_${name}_${width}x${height}.bmp`);
      
      const duration = Date.now() - startTime;
      console.log(`    ⏱️  Generated in ${duration}ms`);
    } catch (error) {
      console.error(`  ❌ Error generating ${name} image:`, error.message);
    }
  });
}

/**
 * Main execution function
 */
async function main() {
  console.log('🎨 Starting fractal generation test suite...');
  console.log(`📁 Output directory: ${path.resolve(outputDir)}`);
  
  try {
    generateMandelbrotTests();
    generateJuliaTests();
    generateComparisonTests();
    generatePerformanceTests();
    
    console.log('\n✅ All fractal generation tests completed!');
    console.log(`📊 Check the ${outputDir}/ folder for generated images.`);
    console.log('💡 You can view BMP files with any image viewer or web browser.');
    
  } catch (error) {
    console.error('❌ Fatal error during generation:', error);
    process.exit(1);
  }
}

// Run the tests
main();
