[**@prachwal/mandelbrot-generator v1.0.0**](../README.md)

***

[@prachwal/mandelbrot-generator](../globals.md) / colorPalettes

# Variable: colorPalettes

> `const` **colorPalettes**: [`ColorPalettes`](../type-aliases/ColorPalettes.md)

Defined in: [colors.ts:170](https://github.com/prachwal/mandelbrot-generator/blob/774585aef1c1cbc7e412618ceaebc4d9e4774868/src/colors.ts#L170)

Collection of predefined color palettes optimized for Mandelbrot fractal visualization

Each palette is carefully crafted to highlight different aspects of the fractal structure:
- **rainbow**: Classic multi-color palette showing intricate details
- **fire**: Warm palette emphasizing heat-like patterns  
- **cool**: Cool blues and greens for serene visualization
- **classic**: Traditional black-to-white gradient
- **hot**: Intense reds, oranges, and yellows
- **electric**: High-contrast neon colors
- **ocean**: Deep blues with white highlights
- **sunset**: Warm oranges, pinks, and purples

## Example

```typescript
import { colorPalettes } from './colors.js';

// Access specific palettes
const rainbowColors = colorPalettes.rainbow;
const fireColors = colorPalettes.fire;

// Use in configuration
const config = {
  // ...other settings
  colorPalette: 'fire' as const
};

// Iterate through all available palettes
Object.keys(colorPalettes).forEach(paletteName => {
  console.log(`${paletteName}: ${colorPalettes[paletteName].length} colors`);
});
```

## See

 - [PaletteType](../type-aliases/PaletteType.md) for available palette names
 - [getColor](../functions/getColor.md) for using palettes in fractal generation

## Since

1.0.0
