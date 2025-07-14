[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / isInMandelbrotSet

# Function: isInMandelbrotSet()

> **isInMandelbrotSet**(`cx`, `cy`, `maxIterations`): `boolean`

Defined in: [mandelbrot.ts:290](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/mandelbrot.ts#L290)

Quick check if a point belongs to the Mandelbrot set

This is a convenience function that returns a boolean result instead of iteration count.
Useful for set membership testing and creating binary visualizations.

## Parameters

### cx

`number`

Real part of the complex number

### cy

`number`

Imaginary part of the complex number

### maxIterations

`number` = `100`

Maximum iterations to test (default: 100)

## Returns

`boolean`

True if point is likely in the Mandelbrot set, false otherwise

## Example

```typescript
import { isInMandelbrotSet } from './mandelbrot.js';

// Test some known points
console.log(isInMandelbrotSet(0, 0));        // true - origin is in set
console.log(isInMandelbrotSet(-1, 0));       // true - on real axis
console.log(isInMandelbrotSet(1, 1));        // false - clearly outside
console.log(isInMandelbrotSet(-0.7269, 0.1889, 1000)); // depends on iterations

// Create binary visualization
const isInSet = isInMandelbrotSet(-0.5, 0.5, 256);
const color = isInSet ? 'black' : 'white';
```

## See

[mandelbrotIteration](mandelbrotIteration.md) for detailed iteration count

## Since

1.0.0
