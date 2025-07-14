[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / MandelbrotConfig

# Interface: MandelbrotConfig

Defined in: [types.ts:47](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L47)

Configuration for Mandelbrot fractal generation

## Interface

MandelbrotConfig

## Example

```typescript
const config: MandelbrotConfig = {
  width: 800,
  height: 600,
  maxIterations: 100,
  escapeRadius: 2,
  centerX: -0.5,
  centerY: 0,
  zoom: 1,
  colorPalette: 'rainbow',
  outputFile: 'mandelbrot.svg'
};
```

## Properties

### width

> `readonly` **width**: `number`

Defined in: [types.ts:49](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L49)

Image width in pixels

***

### height

> `readonly` **height**: `number`

Defined in: [types.ts:51](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L51)

Image height in pixels

***

### maxIterations

> `readonly` **maxIterations**: `number`

Defined in: [types.ts:53](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L53)

Maximum number of iterations

***

### escapeRadius

> `readonly` **escapeRadius**: `number`

Defined in: [types.ts:55](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L55)

Escape radius for iteration

***

### zoom

> `readonly` **zoom**: `number`

Defined in: [types.ts:57](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L57)

Zoom level

***

### centerX

> `readonly` **centerX**: `number`

Defined in: [types.ts:59](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L59)

Center X coordinate

***

### centerY

> `readonly` **centerY**: `number`

Defined in: [types.ts:61](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L61)

Center Y coordinate

***

### colorPalette

> `readonly` **colorPalette**: [`PaletteType`](../type-aliases/PaletteType.md)

Defined in: [types.ts:63](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L63)

Color palette to use

***

### outputFile?

> `readonly` `optional` **outputFile**: `string`

Defined in: [types.ts:65](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/types.ts#L65)

Output filename (for Node.js)
