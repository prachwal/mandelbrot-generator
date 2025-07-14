[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / InterestingPoint

# Interface: InterestingPoint

Defined in: [types.ts:105](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L105)

A point of interest in the Mandelbrot set with description

## Interface

InterestingPoint

## Example

```typescript
const elephantValley: InterestingPoint = {
  centerX: -0.7269,
  centerY: 0.1889,
  zoom: 100,
  description: "Elephant Valley - fascinating self-similar structures"
};
```

## Properties

### centerX

> `readonly` **centerX**: `number`

Defined in: [types.ts:107](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L107)

Real part of the center coordinate

***

### centerY

> `readonly` **centerY**: `number`

Defined in: [types.ts:109](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L109)

Imaginary part of the center coordinate

***

### zoom

> `readonly` **zoom**: `number`

Defined in: [types.ts:111](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L111)

Recommended zoom level for optimal viewing

***

### description

> `readonly` **description**: `string`

Defined in: [types.ts:113](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/types.ts#L113)

Human-readable description of this location
