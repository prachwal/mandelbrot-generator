/**
 * Test named imports for TypeScript compatibility
 */
import {
  generateMandelbrotData,
  mandelbrotIteration,
  generateMandelbrotSVG,
  saveImageAsSVG,
  main,
  getColor,
  rgbToHex,
  getColorHex,
  colorPalettes,
  calculateBounds,
  defaultConfig,
  interestingPoints,
  isInMandelbrotSet,
  calculateSetBoundary,
  generateMandelbrotDataOptimized
} from './dist/index.js';

console.log('🧪 Testing named imports...');

// Test basic functionality
const testIteration = mandelbrotIteration(-0.5, 0, 100);
console.log(`✓ Named import mandelbrotIteration works: ${testIteration}`);

const testColor = getColor(50, 100, 'fire');
console.log(`✓ Named import getColor works: [${testColor.join(', ')}]`);

console.log(`✓ Named import defaultConfig works: ${defaultConfig.width}x${defaultConfig.height}`);

console.log('✅ All named imports work correctly!');
