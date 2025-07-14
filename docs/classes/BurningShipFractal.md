[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / BurningShipFractal

# Class: BurningShipFractal

Defined in: [algorithms/burning-ship.ts:9](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/burning-ship.ts#L9)

Abstract base class for all fractal algorithms
Provides common interface and functionality for fractal generation

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseFractal`](BaseFractal.md)

## Constructors

### Constructor

> **new BurningShipFractal**(): `BurningShipFractal`

#### Returns

`BurningShipFractal`

#### Inherited from

[`BaseFractal`](BaseFractal.md).[`constructor`](BaseFractal.md#constructor)

## Properties

### id

> `readonly` **id**: `"burning-ship"` = `'burning-ship'`

Defined in: [algorithms/burning-ship.ts:10](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/burning-ship.ts#L10)

Unique identifier for this fractal type

#### Overrides

[`BaseFractal`](BaseFractal.md).[`id`](BaseFractal.md#id)

***

### name

> `readonly` **name**: `"Burning Ship"` = `'Burning Ship'`

Defined in: [algorithms/burning-ship.ts:11](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/burning-ship.ts#L11)

Human-readable name

#### Overrides

[`BaseFractal`](BaseFractal.md).[`name`](BaseFractal.md#name)

***

### description

> `readonly` **description**: `"Burning Ship fractal using abs(z)² + c"` = `'Burning Ship fractal using abs(z)² + c'`

Defined in: [algorithms/burning-ship.ts:12](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/burning-ship.ts#L12)

Description of the fractal

#### Overrides

[`BaseFractal`](BaseFractal.md).[`description`](BaseFractal.md#description)

***

### defaultConfig

> `readonly` **defaultConfig**: `FractalConfig`

Defined in: [algorithms/burning-ship.ts:14](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/burning-ship.ts#L14)

Default configuration for this fractal

#### Overrides

[`BaseFractal`](BaseFractal.md).[`defaultConfig`](BaseFractal.md#defaultconfig)

***

### parameterSchema

> `readonly` **parameterSchema**: `object`[]

Defined in: [algorithms/burning-ship.ts:25](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/burning-ship.ts#L25)

Parameter schema for UI generation

#### key

> **key**: `string` = `'maxIterations'`

#### label

> **label**: `string` = `'Max Iterations'`

#### type

> **type**: `"number"`

#### min

> **min**: `number` = `10`

#### max

> **max**: `number` = `2000`

#### step

> **step**: `number` = `10`

#### default

> **default**: `number` = `100`

#### group

> **group**: `string` = `'computation'`

#### Overrides

[`BaseFractal`](BaseFractal.md).[`parameterSchema`](BaseFractal.md#parameterschema)

## Methods

### iterate()

> **iterate**(`point`, `config`): `FractalResult`

Defined in: [algorithms/burning-ship.ts:39](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/burning-ship.ts#L39)

Core iteration function - must be implemented by each fractal

#### Parameters

##### point

`Complex`

Point in complex plane to test

##### config

`FractalConfig`

Fractal-specific configuration

#### Returns

`FractalResult`

Iteration result (escape time, convergence info, etc.)

#### Overrides

[`BaseFractal`](BaseFractal.md).[`iterate`](BaseFractal.md#iterate)

***

### generateData()

> **generateData**(`config`): `Uint8ClampedArray`

Defined in: [core/base-fractal.ts:41](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L41)

Generate fractal data for given configuration

#### Parameters

##### config

`FractalConfig`

Generation configuration

#### Returns

`Uint8ClampedArray`

Image data array

#### Inherited from

[`BaseFractal`](BaseFractal.md).[`generateData`](BaseFractal.md#generatedata)

***

### validateConfig()

> **validateConfig**(`_config`): `boolean`

Defined in: [core/base-fractal.ts:96](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L96)

Validate configuration for this fractal type

#### Parameters

##### \_config

`FractalConfig`

#### Returns

`boolean`

#### Inherited from

[`BaseFractal`](BaseFractal.md).[`validateConfig`](BaseFractal.md#validateconfig)
