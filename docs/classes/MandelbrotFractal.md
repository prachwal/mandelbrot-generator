[**@prachwal/mandelbrot-generator v1.1.1**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / MandelbrotFractal

# Class: MandelbrotFractal

Defined in: [algorithms/mandelbrot.ts:14](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/algorithms/mandelbrot.ts#L14)

Classic Mandelbrot fractal implementation
Formula: z_{n+1} = z_n^2 + c, where z_0 = 0

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseFractal`](BaseFractal.md)

## Constructors

### Constructor

> **new MandelbrotFractal**(): `MandelbrotFractal`

#### Returns

`MandelbrotFractal`

#### Inherited from

[`BaseFractal`](BaseFractal.md).[`constructor`](BaseFractal.md#constructor)

## Properties

### id

> `readonly` **id**: `"mandelbrot"` = `'mandelbrot'`

Defined in: [algorithms/mandelbrot.ts:15](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/algorithms/mandelbrot.ts#L15)

Unique identifier for this fractal type

#### Overrides

[`BaseFractal`](BaseFractal.md).[`id`](BaseFractal.md#id)

***

### name

> `readonly` **name**: `"Mandelbrot Set"` = `'Mandelbrot Set'`

Defined in: [algorithms/mandelbrot.ts:16](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/algorithms/mandelbrot.ts#L16)

Human-readable name

#### Overrides

[`BaseFractal`](BaseFractal.md).[`name`](BaseFractal.md#name)

***

### description

> `readonly` **description**: `"Classic Mandelbrot fractal using the iteration z² + c"` = `'Classic Mandelbrot fractal using the iteration z² + c'`

Defined in: [algorithms/mandelbrot.ts:17](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/algorithms/mandelbrot.ts#L17)

Description of the fractal

#### Overrides

[`BaseFractal`](BaseFractal.md).[`description`](BaseFractal.md#description)

***

### defaultConfig

> `readonly` **defaultConfig**: `FractalConfig`

Defined in: [algorithms/mandelbrot.ts:19](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/algorithms/mandelbrot.ts#L19)

Default configuration for this fractal

#### Overrides

[`BaseFractal`](BaseFractal.md).[`defaultConfig`](BaseFractal.md#defaultconfig)

***

### parameterSchema

> `readonly` **parameterSchema**: `ParameterSchema`[]

Defined in: [algorithms/mandelbrot.ts:30](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/algorithms/mandelbrot.ts#L30)

Parameter schema for UI generation

#### Overrides

[`BaseFractal`](BaseFractal.md).[`parameterSchema`](BaseFractal.md#parameterschema)

## Methods

### iterate()

> **iterate**(`point`, `config`): `FractalResult`

Defined in: [algorithms/mandelbrot.ts:75](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/algorithms/mandelbrot.ts#L75)

Core Mandelbrot iteration

#### Parameters

##### point

`Complex`

Point c in complex plane

##### config

`FractalConfig`

Configuration parameters

#### Returns

`FractalResult`

Iteration result

#### Overrides

[`BaseFractal`](BaseFractal.md).[`iterate`](BaseFractal.md#iterate)

***

### validateConfig()

> **validateConfig**(`config`): `boolean`

Defined in: [algorithms/mandelbrot.ts:114](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/algorithms/mandelbrot.ts#L114)

Validate configuration for this fractal type

#### Parameters

##### config

`FractalConfig`

#### Returns

`boolean`

#### Overrides

[`BaseFractal`](BaseFractal.md).[`validateConfig`](BaseFractal.md#validateconfig)

***

### generateData()

> **generateData**(`config`): `Uint8ClampedArray`

Defined in: [core/base-fractal.ts:41](https://github.com/prachwal/mandelbrot-generator/blob/da157e1b866785501d38ccb7552859d4482dd1a8/src/core/base-fractal.ts#L41)

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
