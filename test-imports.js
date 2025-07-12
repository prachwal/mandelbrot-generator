/**
 * Test file to verify NPM import structure
 */

// Test importing specific modules
import * as mandelbrotLib from './dist/index.js';

// Test basic usage
console.log('🧪 Testing NPM imports...');

// List available exports
console.log('Available exports:', Object.keys(mandelbrotLib));

// Test config
const config = {
  ...mandelbrotLib.defaultConfig,
  width: 400,
  height: 300
};

// Test fractal generation
const iterations = mandelbrotLib.mandelbrotIteration(0, 0, 100);
console.log(`✓ mandelbrotIteration(0, 0, 100) = ${iterations}`);

// Test color function
const color = mandelbrotLib.getColor(50, 100, 'rainbow');
console.log(`✓ getColor(50, 100, 'rainbow') = [${color.join(', ')}]`);

// Test bounds calculation
const bounds = mandelbrotLib.calculateBounds(config);
console.log(`✓ calculateBounds() = real: [${bounds.minReal}, ${bounds.maxReal}]`);

// Test interesting points
const elephant = mandelbrotLib.interestingPoints.elephant;
console.log(`✓ interestingPoints.elephant = ${elephant.description}`);

// Test SVG generation (small test)
const svg = mandelbrotLib.generateMandelbrotSVG({
  ...config,
  width: 100,
  height: 100,
  maxIterations: 50
});
console.log(`✓ generateMandelbrotSVG() generated ${svg.length} characters`);

console.log('✅ All imports work correctly!');
