[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / getColorHex

# Function: getColorHex()

> **getColorHex**(`iterations`, `maxIterations`, `paletteType`): `string`

Defined in: [colors.ts:370](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/colors.ts#L370)

Maps iteration count directly to hexadecimal color string

Convenience function that combines getColor() and rgbToHex() for direct
conversion from Mandelbrot iteration results to web-compatible hex colors.
Ideal for web applications, CSS generation, and HTML canvas operations.

## Parameters

### iterations

`number`

Number of iterations before the point escaped

### maxIterations

`number`

Maximum iterations used in fractal calculation

### paletteType

[`PaletteType`](../type-aliases/PaletteType.md) = `'rainbow'`

Name of the color palette to use (default: 'rainbow')

## Returns

`string`

Hexadecimal color string in format "#RRGGBB"

## Example

```typescript
import { getColorHex } from './colors.js';

// Get hex colors for fractal points
const setColor = getColorHex(1000, 1000, 'fire');    // "#000000" (black)
const escapeColor = getColorHex(50, 200, 'ocean');   // "#1e3f5c" (blue)

// Use directly in web contexts
canvas.style.backgroundColor = getColorHex(75, 100, 'sunset');

// Generate CSS color arrays
const cssColors = Array.from({length: 10}, (_, i) => 
  getColorHex(i * 10, 100, 'rainbow')
);
```

## Complexity

O(1) - constant time operation

## See

 - [getColor](getColor.md) for RGB color output
 - [rgbToHex](rgbToHex.md) for RGB to hex conversion details

## Since

1.0.0
