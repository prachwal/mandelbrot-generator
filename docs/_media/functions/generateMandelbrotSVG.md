[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / generateMandelbrotSVG

# Function: generateMandelbrotSVG()

> **generateMandelbrotSVG**(`config`): `string`

Defined in: [index.ts:148](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/index.ts#L148)

Generates SVG content for a Mandelbrot fractal

This function creates a complete SVG document as a string, containing
the visual representation of the Mandelbrot set. The SVG can be saved
to a file, embedded in HTML, or processed further.

## Parameters

### config

[`MandelbrotConfig`](../interfaces/MandelbrotConfig.md)

Complete fractal generation configuration

## Returns

`string`

Complete SVG document as a string

## Example

```typescript
import { generateMandelbrotSVG, interestingPoints } from '@prachwal/mandelbrot-generator';

// Generate classic view
const svg = generateMandelbrotSVG({
  width: 800,
  height: 600,
  maxIterations: 100,
  escapeRadius: 2,
  zoom: 1,
  centerX: -0.5,
  centerY: 0,
  colorPalette: 'rainbow'
});

// Use with predefined locations
const elephantSvg = generateMandelbrotSVG({
  width: 1200,
  height: 800,
  maxIterations: 256,
  escapeRadius: 2,
  colorPalette: 'fire',
  ...interestingPoints.elephant
});

// Save to file or use directly
document.getElementById('fractal').innerHTML = svg;
```

## Performance

- Uses 2x2 pixel rectangles for better SVG performance
- Skips black pixels (points in the Mandelbrot set) to reduce file size
- Progress reporting every 10% during generation

## See

 - [saveImageAsSVG](saveImageAsSVG.md) for direct file saving
 - [generateMandelbrotData](generateMandelbrotData.md) for raw pixel data generation

## Since

1.0.0
