[**@prachwal/mandelbrot-generator v1.1.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / JuliaFractal

# Class: JuliaFractal

Defined in: [algorithms/julia.ts:14](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L14)

Julia Sets fractal implementation
Formula: z_{n+1} = z_n^2 + c, where z_0 = point and c is constant

## Hierarchy

[View Summary](../hierarchy.md)

### Extends

- [`BaseFractal`](BaseFractal.md)

## Constructors

### Constructor

> **new JuliaFractal**(): `JuliaFractal`

#### Returns

`JuliaFractal`

#### Inherited from

[`BaseFractal`](BaseFractal.md).[`constructor`](BaseFractal.md#constructor)

## Properties

### id

> `readonly` **id**: `"julia"` = `'julia'`

Defined in: [algorithms/julia.ts:15](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L15)

Unique identifier for this fractal type

#### Overrides

[`BaseFractal`](BaseFractal.md).[`id`](BaseFractal.md#id)

***

### name

> `readonly` **name**: `"Julia Sets"` = `'Julia Sets'`

Defined in: [algorithms/julia.ts:16](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L16)

Human-readable name

#### Overrides

[`BaseFractal`](BaseFractal.md).[`name`](BaseFractal.md#name)

***

### description

> `readonly` **description**: `"Julia sets with customizable constant c parameter"` = `'Julia sets with customizable constant c parameter'`

Defined in: [algorithms/julia.ts:17](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L17)

Description of the fractal

#### Overrides

[`BaseFractal`](BaseFractal.md).[`description`](BaseFractal.md#description)

***

### defaultConfig

> `readonly` **defaultConfig**: `FractalConfig`

Defined in: [algorithms/julia.ts:19](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L19)

Default configuration for this fractal

#### Overrides

[`BaseFractal`](BaseFractal.md).[`defaultConfig`](BaseFractal.md#defaultconfig)

***

### parameterSchema

> `readonly` **parameterSchema**: `ParameterSchema`[]

Defined in: [algorithms/julia.ts:32](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L32)

Parameter schema for UI generation

#### Overrides

[`BaseFractal`](BaseFractal.md).[`parameterSchema`](BaseFractal.md#parameterschema)

## Methods

### getPresets()

> `static` **getPresets**(): `object`

Defined in: [algorithms/julia.ts:142](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L142)

Get predefined interesting Julia sets

#### Returns

`object`

##### dragon

> **dragon**: `object`

###### dragon.real

> **real**: `number` = `-0.7269`

###### dragon.imag

> **imag**: `number` = `0.1889`

##### airplane

> **airplane**: `object`

###### airplane.real

> **real**: `number` = `-0.75`

###### airplane.imag

> **imag**: `number` = `0.11`

##### spiral

> **spiral**: `object`

###### spiral.real

> **real**: `number` = `-0.4`

###### spiral.imag

> **imag**: `number` = `0.6`

##### dendrite

> **dendrite**: `object`

###### dendrite.real

> **real**: `number` = `0`

###### dendrite.imag

> **imag**: `number` = `1`

##### rabbit

> **rabbit**: `object`

###### rabbit.real

> **real**: `number` = `-0.123`

###### rabbit.imag

> **imag**: `number` = `0.745`

***

### iterate()

> **iterate**(`point`, `config`): `FractalResult`

Defined in: [algorithms/julia.ts:76](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L76)

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

### validateConfig()

> **validateConfig**(`config`): `boolean`

Defined in: [algorithms/julia.ts:119](https://github.com/prachwal/mandelbrot-generator/blob/5b5c3b49b15f9fe9f6b376b7b3d8c1d326229805/src/algorithms/julia.ts#L119)

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
