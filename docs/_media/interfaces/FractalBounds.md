[**@prachwal/mandelbrot-generator v1.0.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / FractalBounds

# Interface: FractalBounds

Defined in: [types.ts:81](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L81)

Fractal bounds in the complex plane

## Interface

FractalBounds

## Example

```typescript
const bounds: FractalBounds = {
  minReal: -2.5,
  maxReal: 1.5,
  minImaginary: -1.5,
  maxImaginary: 1.5
};
```

## Properties

### minReal

> `readonly` **minReal**: `number`

Defined in: [types.ts:83](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L83)

Minimum real value (left edge)

***

### maxReal

> `readonly` **maxReal**: `number`

Defined in: [types.ts:85](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L85)

Maximum real value (right edge)

***

### minImaginary

> `readonly` **minImaginary**: `number`

Defined in: [types.ts:87](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L87)

Minimum imaginary value (bottom edge)

***

### maxImaginary

> `readonly` **maxImaginary**: `number`

Defined in: [types.ts:89](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L89)

Maximum imaginary value (top edge)
