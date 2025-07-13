[**@prachwal/mandelbrot-generator v1.0.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / calculateSetBoundary

# Function: calculateSetBoundary()

> **calculateSetBoundary**(`config`, `samples`): [`BoundaryPoint`](../interfaces/BoundaryPoint.md)[]

Defined in: [mandelbrot.ts:342](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/mandelbrot.ts#L342)

Calculates an approximate boundary of the Mandelbrot set within given bounds

This function samples points in the complex plane and identifies those that lie
on or near the boundary of the Mandelbrot set. Boundary points are defined as
those that escape after a significant number of iterations but before the maximum.

## Parameters

### config

[`MandelbrotConfig`](../interfaces/MandelbrotConfig.md)

Fractal generation configuration defining the sampling area

### samples

`number` = `1000`

Number of sample points per dimension (default: 1000)

## Returns

[`BoundaryPoint`](../interfaces/BoundaryPoint.md)[]

Array of boundary points with their coordinates and iteration counts

## Example

```typescript
import { calculateSetBoundary } from './mandelbrot.js';
import { defaultConfig } from './config.js';

// Find boundary points in the classic view
const boundary = calculateSetBoundary({
  ...defaultConfig,
  centerX: -0.5,
  centerY: 0,
  zoom: 1,
  maxIterations: 256
}, 500);

console.log(`Found ${boundary.length} boundary points`);

// Analyze boundary complexity
const avgIterations = boundary.reduce((sum, p) => sum + p.iterations, 0) / boundary.length;
console.log(`Average boundary iterations: ${avgIterations}`);

// Find most interesting boundary points
const complex = boundary.filter(p => p.iterations > 200);
```

## Performance

- Time complexity: O(samples²)
- Memory complexity: O(boundary_points)
- Higher sample counts provide more accurate boundaries but slower computation

## Algorithm

Points are considered on the boundary if their iteration count is between
50% and 100% of the maximum iterations, indicating they're near the escape threshold.

## See

 - [BoundaryPoint](../interfaces/BoundaryPoint.md) for result structure
 - [mandelbrotIteration](mandelbrotIteration.md) for iteration computation

## Since

1.0.0
