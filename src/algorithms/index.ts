/**
 * @fileoverview Central registry for all fractal algorithms
 * @module AlgorithmRegistry
 */

import { fractalEngine } from '../core/fractal-engine.js';
import { MandelbrotFractal } from './mandelbrot.js';
import { JuliaFractal } from './julia.js';
import { BurningShipFractal } from './burning-ship.js';

// Register all available algorithms
export function registerAllAlgorithms() {
  fractalEngine.register(new MandelbrotFractal());
  fractalEngine.register(new JuliaFractal());
  fractalEngine.register(new BurningShipFractal());
  
  // Future algorithms can be added here:
  // fractalEngine.register(new NewtonFractal());
  // fractalEngine.register(new TricornFractal());
}

// Export the configured engine
export { fractalEngine };

// Export individual algorithms for direct use
export { MandelbrotFractal, JuliaFractal, BurningShipFractal };

// Initialize algorithms when module is imported
registerAllAlgorithms();
