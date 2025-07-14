[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / generateMandelbrotData

# Function: generateMandelbrotData()

> **generateMandelbrotData**(`config`): `Uint8ClampedArray`

Defined in: [mandelbrot.ts:125](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/mandelbrot.ts#L125)

Generates RGBA image data for the complete Mandelbrot fractal

This function creates a pixel-by-pixel representation of the Mandelbrot set
by sampling each point in the complex plane and computing its escape time.
The resulting iteration counts are mapped to colors using the specified palette.

## Parameters

### config

[`MandelbrotConfig`](../interfaces/MandelbrotConfig.md)

Complete configuration object for fractal generation

## Returns

`Uint8ClampedArray`

Uint8ClampedArray containing RGBA pixel data (4 bytes per pixel)

## Example

```typescript
import { generateMandelbrotData } from './mandelbrot.js';

const config: MandelbrotConfig = {
  width: 800,
  height: 600,
  centerX: -0.5,
  centerY: 0,
  zoom: 1,
  maxIterations: 100,
  escapeRadius: 2,
  colorPalette: 'classic'
};

const imageData = generateMandelbrotData(config);
// imageData is ready to be used with Canvas ImageData constructor
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const imgData = new ImageData(imageData, config.width, config.height);
ctx.putImageData(imgData, 0, 0);
```

## Performance

- Time complexity: O(width × height × average_iterations)
- Space complexity: O(width × height) for output array
- Optimized for typical fractal viewing with escape radius = 2

## See

 - [calculateBounds](calculateBounds.md) for coordinate system mapping
 - [getColor](getColor.md) for color palette application
 - [mandelbrotIteration](mandelbrotIteration.md) for core iteration algorithm
