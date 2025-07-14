[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / BaseFractal

# Class: `abstract` BaseFractal

Defined in: [core/base-fractal.ts:12](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L12)

Abstract base class for all fractal algorithms
Provides common interface and functionality for fractal generation

## Hierarchy

[View Summary](../hierarchy.md)

### Extended by

- [`MandelbrotFractal`](MandelbrotFractal.md)
- [`JuliaFractal`](JuliaFractal.md)
- [`BurningShipFractal`](BurningShipFractal.md)

## Constructors

### Constructor

> **new BaseFractal**(): `BaseFractal`

#### Returns

`BaseFractal`

## Properties

### id

> `abstract` `readonly` **id**: `string`

Defined in: [core/base-fractal.ts:14](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L14)

Unique identifier for this fractal type

***

### name

> `abstract` `readonly` **name**: `string`

Defined in: [core/base-fractal.ts:17](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L17)

Human-readable name

***

### description

> `abstract` `readonly` **description**: `string`

Defined in: [core/base-fractal.ts:20](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L20)

Description of the fractal

***

### defaultConfig

> `abstract` `readonly` **defaultConfig**: `FractalConfig`

Defined in: [core/base-fractal.ts:23](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L23)

Default configuration for this fractal

***

### parameterSchema

> `abstract` `readonly` **parameterSchema**: `ParameterSchema`[]

Defined in: [core/base-fractal.ts:26](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L26)

Parameter schema for UI generation

## Methods

### iterate()

> `abstract` **iterate**(`point`, `config`): `FractalResult`

Defined in: [core/base-fractal.ts:34](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/core/base-fractal.ts#L34)

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
