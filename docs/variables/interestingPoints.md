[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / interestingPoints

# Variable: interestingPoints

> `const` **interestingPoints**: [`InterestingPoints`](../interfaces/InterestingPoints.md)

Defined in: [config.ts:215](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/config.ts#L215)

Collection of mathematically and visually interesting locations within the Mandelbrot set

These predefined points showcase different aspects of the fractal's infinite complexity,
from the classic full view to intricate self-similar details at various zoom levels.
Each location is carefully chosen to demonstrate unique patterns and structures.

## Example

```typescript
import { interestingPoints, generateMandelbrotData } from './mandelbrot.js';

// Explore the elephant valley
const elephantConfig = {
  width: 800,
  height: 600,
  maxIterations: 256,
  escapeRadius: 2,
  colorPalette: 'fire' as const,
  ...interestingPoints.elephant
};

// Generate images for all interesting points
Object.entries(interestingPoints).forEach(([name, point]) => {
  console.log(`${name}: ${point.description}`);
  const config = { ...defaultConfig, ...point };
  const imageData = generateMandelbrotData(config);
});

// Create a zoom sequence
const zoomLevels = [1, 10, 100, 1000];
const sequence = zoomLevels.map(zoom => ({
  ...defaultConfig,
  ...interestingPoints.elephant,
  zoom
}));
```

## Mathematics

Each point represents a specific location in the complex plane:
- **Real axis (centerX)**: Horizontal position in complex plane
- **Imaginary axis (centerY)**: Vertical position in complex plane  
- **Zoom level**: Magnification factor (1 = full set, higher = more detail)

## See

 - [InterestingPoints](../interfaces/InterestingPoints.md) for type definition
 - [InterestingPoint](../interfaces/InterestingPoint.md) for individual point structure

## Since

1.0.0
