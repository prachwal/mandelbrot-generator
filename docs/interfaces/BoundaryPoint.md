[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / BoundaryPoint

# Interface: BoundaryPoint

Defined in: [types.ts:154](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L154)

A point on the boundary of the Mandelbrot set

## Interface

BoundaryPoint

## Example

```typescript
const boundaryPoint: BoundaryPoint = {
  x: -0.7269,
  y: 0.1889,
  iterations: 87
};
```

## Properties

### x

> `readonly` **x**: `number`

Defined in: [types.ts:156](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L156)

Real coordinate (x-axis)

***

### y

> `readonly` **y**: `number`

Defined in: [types.ts:158](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L158)

Imaginary coordinate (y-axis)

***

### iterations

> `readonly` **iterations**: `number`

Defined in: [types.ts:160](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L160)

Number of iterations before divergence
