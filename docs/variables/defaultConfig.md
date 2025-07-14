[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / defaultConfig

# Variable: defaultConfig

> `const` `readonly` **defaultConfig**: [`MandelbrotConfig`](../interfaces/MandelbrotConfig.md)

Defined in: [config.ts:79](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/config.ts#L79)

Default configuration object for Mandelbrot fractal generation

Provides sensible defaults for all fractal generation parameters.
These settings produce a classic view of the Mandelbrot set with good
performance and visual quality suitable for most applications.

## Example

```typescript
import { defaultConfig } from './config.js';

// Use as-is for quick generation
const imageData = generateMandelbrotData(defaultConfig);

// Customize specific properties
const highRes = {
  ...defaultConfig,
  width: 1920,
  height: 1080,
  maxIterations: 256
};

// Override color palette
const fireVersion = {
  ...defaultConfig,
  colorPalette: 'fire' as const
};
```

## See

[MandelbrotConfig](../interfaces/MandelbrotConfig.md) for complete type definition

## Since

1.0.0
