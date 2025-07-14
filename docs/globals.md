[**@prachwal/mandelbrot-generator v1.1.0**](README.md)

***

# @prachwal/mandelbrot-generator v1.1.0

## Fileoverview

Command-line interface and Node.js entry point for Mandelbrot fractal generator

## Version

1.0.0

## Author

Prachwal

## Since

1.0.0

This module provides a complete command-line interface for generating Mandelbrot fractals
as SVG files. It supports various output formats, interesting point navigation,
and batch generation capabilities for Node.js environments.

## Examples

```bash
# Generate default fractal
npx mandelbrot-generator

# Generate with custom parameters
npx mandelbrot-generator --width 1920 --height 1080 --iterations 256

# Generate interesting locations
npx mandelbrot-generator --preset elephant --output elephant.svg
```

```typescript
// Use programmatically
import { generateMandelbrotSVG, main } from './index.js';

// Generate SVG string
const svg = generateMandelbrotSVG({
  width: 800,
  height: 600,
  maxIterations: 100,
  colorPalette: 'fire'
});

// Run CLI with custom args
await main(['--preset', 'seahorse', '--output', 'test.svg']);
```

## Classes

- [BurningShipFractal](classes/BurningShipFractal.md)
- [JuliaFractal](classes/JuliaFractal.md)
- [MandelbrotFractal](classes/MandelbrotFractal.md)
- [BaseFractal](classes/BaseFractal.md)
- [FractalEngine](classes/FractalEngine.md)

## Interfaces

- [MandelbrotConfig](interfaces/MandelbrotConfig.md)
- [FractalBounds](interfaces/FractalBounds.md)
- [InterestingPoint](interfaces/InterestingPoint.md)
- [InterestingPoints](interfaces/InterestingPoints.md)
- [BoundaryPoint](interfaces/BoundaryPoint.md)

## Type Aliases

- [RGBColor](type-aliases/RGBColor.md)
- [PaletteType](type-aliases/PaletteType.md)
- [ColorPalettes](type-aliases/ColorPalettes.md)

## Variables

- [colorPalettes](variables/colorPalettes.md)
- [defaultConfig](variables/defaultConfig.md)
- [interestingPoints](variables/interestingPoints.md)
- [fractalEngine](variables/fractalEngine.md)

## Functions

- [getColor](functions/getColor.md)
- [rgbToHex](functions/rgbToHex.md)
- [getColorHex](functions/getColorHex.md)
- [calculateBounds](functions/calculateBounds.md)
- [saveImageAsSVG](functions/saveImageAsSVG.md)
- [generateMandelbrotSVG](functions/generateMandelbrotSVG.md)
- [main](functions/main.md)
- [mandelbrotIteration](functions/mandelbrotIteration.md)
- [generateMandelbrotData](functions/generateMandelbrotData.md)
- [generateMandelbrotDataOptimized](functions/generateMandelbrotDataOptimized.md)
- [isInMandelbrotSet](functions/isInMandelbrotSet.md)
- [calculateSetBoundary](functions/calculateSetBoundary.md)
