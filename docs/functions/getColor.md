[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / getColor

# Function: getColor()

> **getColor**(`iterations`, `maxIterations`, `paletteType`): [`RGBColor`](../type-aliases/RGBColor.md)

Defined in: [colors.ts:288](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/colors.ts#L288)

Maps iteration count to RGB color using the specified palette

This is the primary function for converting Mandelbrot iteration results into
visual colors. It handles both set membership (black) and iteration-based coloring
with smooth palette transitions.

## Parameters

### iterations

`number`

Number of iterations before the point escaped (0 to maxIterations)

### maxIterations

`number`

Maximum iterations used in the fractal calculation

### paletteType

[`PaletteType`](../type-aliases/PaletteType.md) = `'rainbow'`

Name of the color palette to use (default: 'rainbow')

## Returns

[`RGBColor`](../type-aliases/RGBColor.md)

RGB color as [red, green, blue] array with values 0-255

## Example

```typescript
import { getColor } from './colors.js';

// Points in the set are black
const setColor = getColor(1000, 1000, 'rainbow'); // [0, 0, 0]

// Points outside get colored by iteration count
const escapeColor = getColor(50, 1000, 'fire');   // Warm color
const quickEscape = getColor(5, 1000, 'cool');    // Cool color

// Different palettes for same iteration
const rainbow = getColor(100, 500, 'rainbow');
const fire = getColor(100, 500, 'fire');
const ocean = getColor(100, 500, 'ocean');
```

## Algorithm

1. If iterations >= maxIterations, return black (point in set)
2. Calculate normalized position in palette (0.0 to 1.0)
3. Map to palette index and return corresponding color
4. Handle edge cases and palette boundaries

## Performance

O(1) - constant time color lookup

## See

 - [colorPalettes](../variables/colorPalettes.md) for available palette options
 - [getColorHex](getColorHex.md) for hexadecimal color output

## Since

1.0.0
