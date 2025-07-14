[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / generateMandelbrotDataOptimized

# Function: generateMandelbrotDataOptimized()

> **generateMandelbrotDataOptimized**(`config`, `workerCount`): `Promise`\<`Uint8ClampedArray`\<`ArrayBufferLike`\>\>

Defined in: [mandelbrot.ts:210](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/mandelbrot.ts#L210)

Generates Mandelbrot fractal data using simulated multi-threading for improved performance

This function divides the fractal generation work among multiple simulated workers
to demonstrate parallel processing concepts. In a real implementation, this would
use actual worker threads or web workers for true parallelization.

## Parameters

### config

[`MandelbrotConfig`](../interfaces/MandelbrotConfig.md)

Complete configuration object for fractal generation

### workerCount

`number` = `4`

Number of simulated workers to use (default: 4)

## Returns

`Promise`\<`Uint8ClampedArray`\<`ArrayBufferLike`\>\>

Promise resolving to Uint8ClampedArray containing RGBA pixel data

## Example

```typescript
import { generateMandelbrotDataOptimized } from './mandelbrot.js';

const config: MandelbrotConfig = {
  width: 1920,
  height: 1080,
  centerX: -0.5,
  centerY: 0,
  zoom: 1,
  maxIterations: 256,
  escapeRadius: 2,
  colorPalette: 'hot'
};

// Generate with 8 workers for large images
const imageData = await generateMandelbrotDataOptimized(config, 8);
console.log('High-resolution fractal generated!');
```

## Performance

- Scales approximately linearly with worker count
- Best for large images (>1000x1000 pixels)
- Uses setTimeout to simulate non-blocking execution

## See

[generateMandelbrotData](generateMandelbrotData.md) for synchronous version

## Since

1.0.0
