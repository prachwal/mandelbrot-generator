[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / calculateBounds

# Function: calculateBounds()

> **calculateBounds**(`config`): [`FractalBounds`](../interfaces/FractalBounds.md)

Defined in: [config.ts:148](https://github.com/prachwal/mandelbrot-generator/blob/ef8898d44624381552c066d1ffd67c7f15ed1930/src/config.ts#L148)

Calculates the complex plane bounds for fractal rendering based on configuration

This function performs the critical coordinate transformation from screen/image
coordinates to the complex plane coordinates needed for Mandelbrot calculations.
It handles aspect ratio correction and zoom level mapping.

## Parameters

### config

[`MandelbrotConfig`](../interfaces/MandelbrotConfig.md)

Complete fractal generation configuration

## Returns

[`FractalBounds`](../interfaces/FractalBounds.md)

Object containing the real and imaginary bounds of the viewing area

## Example

```typescript
import { calculateBounds, defaultConfig } from './config.js';

// Calculate bounds for default view
const bounds = calculateBounds(defaultConfig);
console.log(`Real: [${bounds.minReal}, ${bounds.maxReal}]`);
console.log(`Imag: [${bounds.minImaginary}, ${bounds.maxImaginary}]`);

// Calculate bounds for zoomed view
const zoomedConfig = {
  ...defaultConfig,
  centerX: -0.7269,
  centerY: 0.1889, 
  zoom: 100
};
const zoomedBounds = calculateBounds(zoomedConfig);

// Calculate pixel-to-complex mapping
const realStep = (bounds.maxReal - bounds.minReal) / config.width;
const imagStep = (bounds.maxImaginary - bounds.minImaginary) / config.height;
```

## Algorithm

1. Calculate base range (4 units) divided by zoom level
2. Adjust for aspect ratio to prevent distortion
3. Center the view around centerX, centerY coordinates
4. Return symmetric bounds around the center point

## Mathematics

- Base viewing window: [-2, 2] × [-2, 2] in complex plane
- Zoom factor directly affects viewing window size: range = 4 / zoom
- Aspect ratio correction: realRange = range × (width / height)

## See

 - [FractalBounds](../interfaces/FractalBounds.md) for return type definition
 - [MandelbrotConfig](../interfaces/MandelbrotConfig.md) for input parameter details

## Since

1.0.0
