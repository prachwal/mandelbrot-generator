import type { MandelbrotConfig, PaletteType, RGBColor } from './dist/types.js';
import { 
  generateMandelbrotSVG, 
  defaultConfig, 
  colorPalettes,
  mandelbrotIteration,
  getColor
} from './dist/index.js';

// Test type annotations
const config: MandelbrotConfig = {
  width: 400,
  height: 300,
  maxIterations: 50,
  escapeRadius: 2,
  centerX: -0.5,
  centerY: 0,
  zoom: 1,
  colorPalette: 'fire' as PaletteType,
  outputFile: 'test.svg'
};

// Test function with typed parameters
const rgb: RGBColor = getColor(25, 50, 'rainbow');
const iterations: number = mandelbrotIteration(-0.5, 0, 100);

// Test SVG generation with type checking
const svg: string = generateMandelbrotSVG(config);

console.log('✅ TypeScript type checking passed!');
console.log(`Config: ${config.width}x${config.height}`);
console.log(`RGB color: [${rgb.join(', ')}]`);
console.log(`Iterations: ${iterations}`);
console.log(`SVG length: ${svg.length} characters`);
