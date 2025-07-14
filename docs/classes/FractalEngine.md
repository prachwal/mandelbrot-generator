[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / FractalEngine

# Class: FractalEngine

Defined in: [core/fractal-engine.ts:13](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/fractal-engine.ts#L13)

Central registry and manager for all fractal algorithms
Provides plugin-like architecture for adding new fractals

## Constructors

### Constructor

> **new FractalEngine**(): `FractalEngine`

#### Returns

`FractalEngine`

## Methods

### register()

> **register**(`algorithm`): `void`

Defined in: [core/fractal-engine.ts:21](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/fractal-engine.ts#L21)

Register a new fractal algorithm

#### Parameters

##### algorithm

[`BaseFractal`](BaseFractal.md)

Fractal algorithm instance

#### Returns

`void`

***

### getAlgorithm()

> **getAlgorithm**(`id`): `undefined` \| [`BaseFractal`](BaseFractal.md)

Defined in: [core/fractal-engine.ts:35](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/fractal-engine.ts#L35)

Get algorithm by ID

#### Parameters

##### id

`string`

Algorithm identifier

#### Returns

`undefined` \| [`BaseFractal`](BaseFractal.md)

Fractal algorithm instance

***

### getDefaultAlgorithm()

> **getDefaultAlgorithm**(): `undefined` \| [`BaseFractal`](BaseFractal.md)

Defined in: [core/fractal-engine.ts:42](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/fractal-engine.ts#L42)

Get default algorithm

#### Returns

`undefined` \| [`BaseFractal`](BaseFractal.md)

***

### getAllAlgorithms()

> **getAllAlgorithms**(): `FractalInfo`[]

Defined in: [core/fractal-engine.ts:50](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/fractal-engine.ts#L50)

Get all available algorithms

#### Returns

`FractalInfo`[]

Array of algorithm metadata

***

### generateFractal()

> **generateFractal**(`algorithmId`, `config`): `Uint8ClampedArray`

Defined in: [core/fractal-engine.ts:67](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/fractal-engine.ts#L67)

Generate fractal data using specified algorithm

#### Parameters

##### algorithmId

`string`

Algorithm to use

##### config

`FractalConfig`

Generation configuration

#### Returns

`Uint8ClampedArray`

Generated image data

***

### iteratePoint()

> **iteratePoint**(`algorithmId`, `point`, `config`): `FractalResult`

Defined in: [core/fractal-engine.ts:87](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/fractal-engine.ts#L87)

Get iteration result for single point

#### Parameters

##### algorithmId

`string`

Algorithm to use

##### point

`Complex`

Point in complex plane

##### config

`FractalConfig`

Algorithm configuration

#### Returns

`FractalResult`

***

### getMergedConfig()

> **getMergedConfig**(`algorithmId`, `userConfig`): `FractalConfig`

Defined in: [core/fractal-engine.ts:102](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/fractal-engine.ts#L102)

Get merged configuration with algorithm defaults

#### Parameters

##### algorithmId

`string`

Algorithm ID

##### userConfig

`Partial`\<`FractalConfig`\>

User-provided configuration

#### Returns

`FractalConfig`

Merged configuration
