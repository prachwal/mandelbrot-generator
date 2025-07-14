[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / rgbToHex

# Function: rgbToHex()

> **rgbToHex**(`r`, `g`, `b`): `string`

Defined in: [colors.ts:332](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/colors.ts#L332)

Converts RGB color values to hexadecimal color string format

This utility function transforms individual red, green, and blue components
into a standard web-compatible hex color string for use in CSS, HTML,
or other systems that expect hex color notation.

## Parameters

### r

`number`

Red component value (0-255)

### g

`number`

Green component value (0-255)

### b

`number`

Blue component value (0-255)

## Returns

`string`

Hexadecimal color string in format "#RRGGBB"

## Example

```typescript
import { rgbToHex } from './colors.js';

// Convert primary colors
const red = rgbToHex(255, 0, 0);     // "#ff0000"
const green = rgbToHex(0, 255, 0);   // "#00ff00"  
const blue = rgbToHex(0, 0, 255);    // "#0000ff"

// Convert custom colors
const purple = rgbToHex(128, 0, 128); // "#800080"
const orange = rgbToHex(255, 165, 0); // "#ffa500"

// Use in web contexts
element.style.backgroundColor = rgbToHex(200, 150, 100);
```

## Algorithm

Uses bit shifting for efficient hex conversion

## Complexity

O(1) - constant time operation

## See

[getColorHex](getColorHex.md) for direct fractal iteration to hex conversion

## Since

1.0.0
