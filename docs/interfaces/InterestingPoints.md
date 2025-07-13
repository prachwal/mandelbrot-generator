[**@prachwal/mandelbrot-generator v1.0.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / InterestingPoints

# Interface: InterestingPoints

Defined in: [types.ts:127](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L127)

Collection of predefined interesting points in the Mandelbrot set

## Interface

InterestingPoints

## Example

```typescript
const points: InterestingPoints = {
  classic: { centerX: -0.5, centerY: 0, zoom: 1, description: "Full set view" },
  elephant: { centerX: -0.7269, centerY: 0.1889, zoom: 100, description: "Elephant Valley" }
};
```

## Indexable

\[`key`: `string`\]: [`InterestingPoint`](InterestingPoint.md)

Additional points can be added

## Properties

### classic

> `readonly` **classic**: [`InterestingPoint`](InterestingPoint.md)

Defined in: [types.ts:129](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L129)

Classic full view of the Mandelbrot set

***

### elephant

> `readonly` **elephant**: [`InterestingPoint`](InterestingPoint.md)

Defined in: [types.ts:131](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L131)

Elephant Valley detail

***

### seahorse

> `readonly` **seahorse**: [`InterestingPoint`](InterestingPoint.md)

Defined in: [types.ts:133](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L133)

Seahorse Valley detail

***

### lightning

> `readonly` **lightning**: [`InterestingPoint`](InterestingPoint.md)

Defined in: [types.ts:135](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L135)

Lightning-like patterns

***

### spiral

> `readonly` **spiral**: [`InterestingPoint`](InterestingPoint.md)

Defined in: [types.ts:137](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/types.ts#L137)

Spiral structures
