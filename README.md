# Mandelbrot Generator

Generator fraktala Mandelbrota z wizualizacją na canvas w Node.js i przeglądarce.

## Funkcje

- 🎨 Renderowanie fraktala Mandelbrota na canvas
- 🔍 Konfigurowalne parametry (rozdzielczość, zakres, iteracje)
- 🌈 Kolorowa paleta dla wizualizacji
- 💻 Wersja dla Node.js (zapisuje do pliku PNG)
- 🌐 Wersja dla przeglądarki z interaktywnym interfejsem
- ⚡ Optymalizowane obliczenia

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

## Konfiguracja

Możesz dostosować parametry generowania w `src/config.js`:

- `width`, `height` - rozmiar obrazu
- `maxIterations` - maksymalna liczba iteracji
- `zoom` - poziom powiększenia
- `centerX`, `centerY` - punkt centralny
- `colorPalette` - paleta kolorów

## Przykłady

### Klasyczny widok
```javascript
const config = {
    width: 800,
    height: 600,
    maxIterations: 100,
    zoom: 1,
    centerX: -0.5,
    centerY: 0
};
```

### Powiększony obszar
```javascript
const config = {
    width: 1200,
    height: 900,
    maxIterations: 256,
    zoom: 100,
    centerX: -0.7269,
    centerY: 0.1889
};
```

## Struktura projektu

```
mandelbrot-generator/
├── src/
│   ├── index.js          # Główny plik dla Node.js
│   ├── mandelbrot.js     # Algorytm Mandelbrota
│   ├── config.js         # Konfiguracja
│   └── colors.js         # Palety kolorów
├── web/
│   ├── index.html        # Interfejs przeglądarki
│   ├── script.js         # JavaScript dla przeglądarki
│   └── style.css         # Stylowanie
├── output/               # Wygenerowane obrazy
└── package.json
```

## Licencja

MIT
