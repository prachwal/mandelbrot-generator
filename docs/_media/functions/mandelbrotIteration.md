[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / mandelbrotIteration

# Function: mandelbrotIteration()

> **mandelbrotIteration**(`cx`, `cy`, `maxIterations`, `escapeRadius`): `number`

Defined in: [mandelbrot.ts:61](https://github.com/prachwal/mandelbrot-generator/blob/ef8898d44624381552c066d1ffd67c7f15ed1930/src/mandelbrot.ts#L61)

Computes the number of iterations for a point in the complex plane to escape the Mandelbrot set

Uses the standard iterative formula: z_{n+1} = z_n^2 + c, where z_0 = 0 and c = cx + i*cy
The function returns when either the maximum iterations are reached (point likely in set)
or when |z| exceeds the escape radius (point definitely not in set).

## Parameters

### cx

`number`

Real part of the complex number c

### cy

`number`

Imaginary part of the complex number c

### maxIterations

`number`

Maximum number of iterations to perform

### escapeRadius

`number` = `2`

Threshold radius for considering a point as escaped (default: 2)

## Returns

`number`

Number of iterations before escape, or maxIterations if point doesn't escape

## Example

```typescript
// Check if origin is in Mandelbrot set (it is)
const originIterations = mandelbrotIteration(0, 0, 100); // Returns 100

// Check a point outside the set
const outsideIterations = mandelbrotIteration(2, 2, 100); // Returns 1

// Check an interesting boundary point
const boundaryIterations = mandelbrotIteration(-0.7269, 0.1889, 1000);
```

## Complexity

O(maxIterations) in worst case

## See

[https://en.wikipedia.org/wiki/Mandelbrot\_set](https://en.wikipedia.org/wiki/Mandelbrot_set) for mathematical background
