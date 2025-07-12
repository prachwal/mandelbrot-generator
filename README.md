# Mandelbrot Generator

Generator fraktala Mandelbrota z wizualizacją na canvas w Node.js i przeglądarce.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-29.7.0-green)](https://jestjs.io/)
[![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)](#testy)
[![Documentation](https://img.shields.io/badge/Docs-TypeDoc-blue)](./web/docs/index.html)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF)](https://vitejs.dev/)

## Funkcje

- 🎨 Renderowanie fraktala Mandelbrota na canvas
- 🔍 Konfigurowalne parametry (rozdzielczość, zakres, iteracje)
- 🌈 Kolorowa paleta dla wizualizacji
- 💻 Wersja dla Node.js (zapisuje do pliku SVG)
- 🌐 Wersja dla przeglądarki z interaktywnym interfejsem
- ⚡ Optymalizowane obliczenia
- 📚 Pełna dokumentacja TypeScript z JSDoc
- 🏗️ Nowoczesny stack: TypeScript + Vite + Jest

## Instalacja

```bash
npm install
```

## Użycie

### Node.js (generowanie SVG)

```bash
npm start
```

Wygeneruje plik `mandelbrot.svg` w folderze `output/`.

**Uwaga:** Wersja Node.js generuje pliki SVG zamiast PNG aby uniknąć problemów z zależnościami systemowymi. SVG oferuje skalowalne grafiki wektorowe idealnie nadające się do wizualizacji fraktali.

### Przeglądarka

```bash
npm run serve
```

Następnie otwórz http://localhost:8080 w przeglądarce.

### Dokumentacja

Pełna dokumentacja API jest dostępna w formacie TypeDoc:

```bash
# Wygeneruj dokumentację
npm run docs

# Uruchom serwer dokumentacji
npm run docs:serve
```

Dokumentacja obejmuje:
- **[API Reference](./web/docs/index.html)** - Kompletne API z przykładami
- **[Moduły TypeScript](./web/docs/modules.html)** - Szczegóły wszystkich modułów
- **[Typy i interfejsy](./web/docs/interfaces/)** - Definicje typów TypeScript
- **[Funkcje](./web/docs/functions/)** - Szczegółowe opisy funkcji z przykładami

**Online:** [📖 Zobacz dokumentację](./web/docs/index.html)

### Testy

```bash
# Uruchom wszystkie testy
npm test

# Uruchom testy z pokryciem kodu
npm run test:coverage

# Wygeneruj raport HTML pokrycia
npm run test:coverage-report
```

Projekt ma **100% pokrycie kodu** dla głównego modułu `mandelbrot.js`.

## Konfiguracja

Możesz dostosować parametry generowania z pełnym typowaniem TypeScript:

```typescript
import { MandelbrotConfig } from './src/types.js';
import { defaultConfig } from './src/config.js';

const config: MandelbrotConfig = {
    ...defaultConfig,
    width: 1920,           // Rozdzielczość X
    height: 1080,          // Rozdzielczość Y
    maxIterations: 256,    // Maksymalne iteracje
    zoom: 100,             // Poziom powiększenia
    centerX: -0.7269,      // Centrum X (rzeczywiste)
    centerY: 0.1889,       // Centrum Y (urojone)
    colorPalette: 'fire'   // Paleta kolorów
};
```

### Dostępne palety kolorów

- `rainbow` - 🌈 Kolorowa tęcza (domyślna)
- `fire` - 🔥 Ogień (czerwień, pomarańcz, żółć)
- `cool` - ❄️ Chłodne (niebieskie, zielone)
- `classic` - ⚫ Klasyczne (czarno-białe)
- `hot` - 🌋 Gorące (intensywne czerwienie)
- `electric` - ⚡ Elektryczne (neonowe)
- `ocean` - 🌊 Ocean (głębokie niebieskie)
- `sunset` - 🌅 Zachód słońca (ciepłe kolory)

## Przykłady

### Klasyczny widok
```typescript
import { generateMandelbrotData } from './src/mandelbrot.js';

const config: MandelbrotConfig = {
    width: 800,
    height: 600,
    maxIterations: 100,
    escapeRadius: 2,
    zoom: 1,
    centerX: -0.5,
    centerY: 0,
    colorPalette: 'rainbow'
};

const imageData = generateMandelbrotData(config);
```

### Eksploracja interesujących miejsc
```typescript
import { interestingPoints } from './src/config.js';

// Dolina słoni - słynne miejsce w zbiorze Mandelbrota
const elephantConfig: MandelbrotConfig = {
    ...defaultConfig,
    ...interestingPoints.elephant,
    maxIterations: 256,
    colorPalette: 'fire'
};

// Wzory koników morskich
const seahorseConfig: MandelbrotConfig = {
    ...defaultConfig,
    ...interestingPoints.seahorse,
    maxIterations: 512,
    colorPalette: 'ocean'
};
```

### Wysoka rozdzielczość z optymalizacją
```typescript
import { generateMandelbrotDataOptimized } from './src/mandelbrot.js';

const hiResConfig: MandelbrotConfig = {
    width: 3840,
    height: 2160,
    maxIterations: 1000,
    zoom: 1000,
    centerX: -0.7269,
    centerY: 0.1889,
    colorPalette: 'electric'
};

// Użyj wersji zoptymalizowanej dla dużych obrazów
const imageData = await generateMandelbrotDataOptimized(hiResConfig, 8);
```

## Struktura projektu

```
mandelbrot-generator/
├── src/                  # Kod źródłowy TypeScript
│   ├── index.ts          # Główny plik dla Node.js
│   ├── mandelbrot.ts     # Algorytmy Mandelbrota
│   ├── config.ts         # Konfiguracja i ciekawe punkty
│   ├── colors.ts         # Palety kolorów
│   └── types.ts          # Definicje typów TypeScript
├── web/                  # Interfejs webowy
│   ├── docs/             # Dokumentacja TypeDoc
│   ├── index.html        # Strona główna
│   ├── main.js           # Kod JavaScript dla przeglądarki
│   └── style.css         # Stylowanie
├── tests/                # Testy jednostkowe
│   └── mandelbrot.test.ts
├── dist/                 # Skompilowany kod TypeScript
├── coverage/             # Raporty pokrycia testów
├── output/               # Wygenerowane fraktale (SVG)
├── package.json          # Konfiguracja NPM
├── tsconfig.json         # Konfiguracja TypeScript
├── vite.config.js        # Konfiguracja Vite
├── typedoc.json          # Konfiguracja dokumentacji
└── README.md             # Ten plik
```

## Rozwój projektu

### Wymagania
- Node.js 18+ 
- TypeScript 5.2+
- Vite 7.0+

### Skrypty deweloperskie

```bash
# Budowanie
npm run build              # Kompiluj TypeScript
npm run build:watch        # Kompiluj z obserwowaniem
npm run build:web          # Buduj dla web

# Rozwój
npm run dev                # Serwer dev Vite
npm run dev:watch          # TypeScript + Vite równolegle

# Testowanie  
npm run test               # Uruchom testy
npm run test:watch         # Testy z obserwowaniem
npm run test:coverage      # Pokrycie kodu

# Dokumentacja
npm run docs               # Wygeneruj dokumentację
npm run docs:serve         # Serwuj dokumentację
npm run docs:watch         # Dokumentacja z obserwowaniem

# Inne
npm run clean              # Wyczyść wszystkie pliki build
npm run examples           # Uruchom przykłady
```

## Technologie

Ten projekt wykorzystuje nowoczesny stack technologiczny:

### Core
- **[TypeScript 5.2+](https://www.typescriptlang.org/)** - Typowanie statyczne i nowoczesny JavaScript
- **[Node.js 18+](https://nodejs.org/)** - Runtime JavaScript po stronie serwera
- **[ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)** - Nowoczesny system modułów

### Development
- **[Vite 7.0+](https://vitejs.dev/)** - Szybki bundler i dev server
- **[Jest 29.7+](https://jestjs.io/)** - Framework testowy
- **[c8](https://github.com/bcoe/c8)** - Pokrycie kodu dla Node.js
- **[Concurrently](https://npm.im/concurrently)** - Równoległe uruchamianie skryptów

### Documentation
- **[TypeDoc](https://typedoc.org/)** - Generator dokumentacji z TypeScript/JSDoc
- **[JSDoc](https://jsdoc.app/)** - Komentarze dokumentacyjne

### Quality
- **100% Test Coverage** - Kompletne pokrycie testami
- **Strict TypeScript** - Ścisłe typowanie
- **ESLint Ready** - Gotowe do lintingu kodu

## API Reference

### Główne funkcje

| Funkcja | Opis | Moduł |
|---------|------|-------|
| `generateMandelbrotData()` | Generuje dane obrazu fraktala | `mandelbrot.ts` |
| `mandelbrotIteration()` | Oblicza iteracje dla punktu | `mandelbrot.ts` |
| `getColor()` | Mapuje iteracje na kolor | `colors.ts` |
| `calculateBounds()` | Oblicza granice płaszczyzny | `config.ts` |

### Typy TypeScript

| Typ | Opis | Plik |
|-----|------|------|
| `MandelbrotConfig` | Konfiguracja generowania | `types.ts` |
| `RGBColor` | Kolor RGB jako tupla | `types.ts` |
| `PaletteType` | Typ palety kolorów | `types.ts` |
| `FractalBounds` | Granice płaszczyzny zespolonej | `types.ts` |

**📖 [Pełna dokumentacja API](./web/docs/index.html)**

## Licencja

MIT License - Zobacz [LICENSE](./LICENSE) dla szczegółów.

## Autor

Stworzony przez **Prachwal** - Generator fraktala Mandelbrota w TypeScript.

---

**[⬆️ Na górę](#mandelbrot-generator)** | **[📖 Dokumentacja](./web/docs/index.html)** | **[🧪 Testy](#testy)** | **[⚙️ Konfiguracja](#konfiguracja)**
