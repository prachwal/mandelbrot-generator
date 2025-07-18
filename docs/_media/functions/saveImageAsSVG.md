[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / saveImageAsSVG

# Function: saveImageAsSVG()

> **saveImageAsSVG**(`config`, `filename`): `string`

Defined in: [index.ts:82](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/index.ts#L82)

Saves a Mandelbrot fractal as an SVG file to the output directory

This function generates the fractal and writes it directly to a file in the
project's output folder. It automatically creates the output directory if needed.

## Parameters

### config

[`MandelbrotConfig`](../interfaces/MandelbrotConfig.md)

Complete fractal generation configuration

### filename

`string`

Name of the output file (will be converted to .svg)

## Returns

`string`

Absolute path to the saved SVG file

## Example

```typescript
import { saveImageAsSVG, defaultConfig } from '@prachwal/mandelbrot-generator';

const filePath = saveImageAsSVG({
  ...defaultConfig,
  width: 1200,
  height: 800,
  maxIterations: 256
}, 'my-fractal.svg');

console.log(`Fractal saved to: ${filePath}`);
```

## See

[generateMandelbrotSVG](generateMandelbrotSVG.md) for generating SVG content without saving

## Since

1.0.0
