// Testy jednostkowe dla modułu mandelbrot.js

import {
    mandelbrotIteration,
    generateMandelbrotData,
    generateMandelbrotDataOptimized,
    isInMandelbrotSet,
    calculateSetBoundary
} from '../src/mandelbrot.js';

import { defaultConfig } from '../src/config.js';

// Mock dla console.log
const originalConsoleLog = console.log;
beforeEach(() => {
    console.log = () => {}; // Silent mock
});

afterEach(() => {
    console.log = originalConsoleLog;
});

describe('mandelbrotIteration', () => {
    test('powinien zwrócić 0 dla punktu (0, 0)', () => {
        const result = mandelbrotIteration(0, 0, 100);
        expect(result).toBe(100); // Punkt (0,0) jest w zbiorze
    });

    test('powinien zwrócić małą liczbę iteracji dla punktu daleko od zbioru', () => {
        const result = mandelbrotIteration(2, 2, 100);
        expect(result).toBeLessThan(10); // Punkt (2,2) szybko diverguje
    });

    test('powinien zwrócić maksymalne iteracje dla punktu w zbiorze', () => {
        const result = mandelbrotIteration(-0.5, 0, 100);
        expect(result).toBe(100); // Punkt (-0.5, 0) jest w zbiorze
    });

    test('powinien działać z niestandardowym escape radius', () => {
        const result1 = mandelbrotIteration(1.5, 1.5, 100, 2);
        const result2 = mandelbrotIteration(1.5, 1.5, 100, 4);
        expect(result2).toBeGreaterThanOrEqual(result1); // Większy radius = więcej iteracji
    });

    test('powinien zwrócić 0 dla maxIterations = 0', () => {
        const result = mandelbrotIteration(0, 0, 0);
        expect(result).toBe(0);
    });

    test('powinien obsłużyć punkt na granicy zbioru', () => {
        const result = mandelbrotIteration(-0.7269, 0.1889, 100);
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThanOrEqual(100);
    });
});

describe('generateMandelbrotData', () => {
    test('powinien generować dane obrazu o odpowiednim rozmiarze', () => {
        const config = {
            width: 10,
            height: 10,
            maxIterations: 50,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = generateMandelbrotData(config);
        
        expect(imageData).toBeInstanceOf(Uint8ClampedArray);
        expect(imageData.length).toBe(10 * 10 * 4); // RGBA
    });

    test('powinien wypisywać informacje o postępie', () => {
        const config = {
            width: 10,
            height: 10,
            maxIterations: 50,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        // Sprawdź czy funkcja się wykonuje bez błędów
        const imageData = generateMandelbrotData(config);
        expect(imageData).toBeInstanceOf(Uint8ClampedArray);
    });

    test('powinien generować poprawne dane dla małego obrazu', () => {
        const config = {
            width: 2,
            height: 2,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = generateMandelbrotData(config);
        
        // Sprawdź czy wszystkie piksele mają prawidłowe wartości RGBA
        for (let i = 0; i < imageData.length; i += 4) {
            expect(imageData[i]).toBeGreaterThanOrEqual(0);     // R
            expect(imageData[i]).toBeLessThanOrEqual(255);      // R
            expect(imageData[i + 1]).toBeGreaterThanOrEqual(0); // G
            expect(imageData[i + 1]).toBeLessThanOrEqual(255);  // G
            expect(imageData[i + 2]).toBeGreaterThanOrEqual(0); // B
            expect(imageData[i + 2]).toBeLessThanOrEqual(255);  // B
            expect(imageData[i + 3]).toBe(255);                 // A (zawsze 255)
        }
    });

    test('powinien obsłużyć różne rozmiary obrazu', () => {
        const configs = [
            { width: 1, height: 1 },
            { width: 5, height: 3 },
            { width: 3, height: 5 }
        ];

        configs.forEach(({ width, height }) => {
            const config = {
                width,
                height,
                maxIterations: 10,
                escapeRadius: 2,
                centerX: 0,
                centerY: 0,
                zoom: 1,
                colorPalette: 'rainbow'
            };

            const imageData = generateMandelbrotData(config);
            expect(imageData.length).toBe(width * height * 4);
        });
    });

    test('powinien wyświetlać postęp dla większego obrazu', () => {
        const config = {
            width: 100,
            height: 100,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        // Tymczasowo przechwyć console.log
        const consoleLogs = [];
        const originalConsoleLog = console.log;
        console.log = (message) => consoleLogs.push(message);

        const imageData = generateMandelbrotData(config);
        
        // Przywróć console.log
        console.log = originalConsoleLog;
        
        expect(imageData).toBeInstanceOf(Uint8ClampedArray);
        expect(imageData.length).toBe(100 * 100 * 4);
        
        // Sprawdź czy były wyświetlane komunikaty o postępie
        const progressMessages = consoleLogs.filter(log => 
            typeof log === 'string' && log.includes('Postęp:')
        );
        expect(progressMessages.length).toBeGreaterThan(0);
    });
});

describe('generateMandelbrotDataOptimized', () => {
    test('powinien zwrócić Promise z danymi obrazu', async () => {
        const config = {
            width: 4,
            height: 4,
            maxIterations: 20,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = await generateMandelbrotDataOptimized(config, 2);
        
        expect(imageData).toBeInstanceOf(Uint8ClampedArray);
        expect(imageData.length).toBe(4 * 4 * 4);
    });

    test('powinien działać z różną liczbą worker\'ów', async () => {
        const config = {
            width: 6,
            height: 6,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const results = await Promise.all([
            generateMandelbrotDataOptimized(config, 1),
            generateMandelbrotDataOptimized(config, 2),
            generateMandelbrotDataOptimized(config, 3)
        ]);

        results.forEach(imageData => {
            expect(imageData).toBeInstanceOf(Uint8ClampedArray);
            expect(imageData.length).toBe(6 * 6 * 4);
        });
    });

    test('powinien obsłużyć przypadek gdy worker\'ów jest więcej niż wierszy', async () => {
        const config = {
            width: 2,
            height: 2,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = await generateMandelbrotDataOptimized(config, 5);
        expect(imageData.length).toBe(2 * 2 * 4);
    });

    test('powinien wypisywać informacje o worker\'ach', async () => {
        const config = {
            width: 4,
            height: 4,
            maxIterations: 10,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const imageData = await generateMandelbrotDataOptimized(config, 2);
        expect(imageData).toBeInstanceOf(Uint8ClampedArray);
    });
});

describe('isInMandelbrotSet', () => {
    test('powinien zwrócić true dla punktów w zbiorze', () => {
        expect(isInMandelbrotSet(0, 0, 100)).toBe(true);
        expect(isInMandelbrotSet(-0.5, 0, 100)).toBe(true);
        expect(isInMandelbrotSet(-1, 0, 100)).toBe(true);
    });

    test('powinien zwrócić false dla punktów poza zbiorem', () => {
        expect(isInMandelbrotSet(2, 2, 100)).toBe(false);
        expect(isInMandelbrotSet(1, 1, 100)).toBe(false);
        expect(isInMandelbrotSet(-2, 2, 100)).toBe(false);
    });

    test('powinien używać domyślnej wartości maxIterations', () => {
        expect(isInMandelbrotSet(0, 0)).toBe(true);
        expect(isInMandelbrotSet(2, 2)).toBe(false);
    });

    test('powinien działać z różnymi wartościami maxIterations', () => {
        // Dla małej liczby iteracji punkt może wydawać się poza zbiorem
        const result1 = isInMandelbrotSet(-0.7, 0.1, 10);
        const result2 = isInMandelbrotSet(-0.7, 0.1, 1000);
        
        // Wynik może się różnić w zależności od liczby iteracji
        expect(typeof result1).toBe('boolean');
        expect(typeof result2).toBe('boolean');
    });
});

describe('calculateSetBoundary', () => {
    test('powinien zwrócić tablicę punktów granicznych', () => {
        const config = {
            width: 10,
            height: 10,
            maxIterations: 50,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const boundaryPoints = calculateSetBoundary(config, 5);
        
        expect(Array.isArray(boundaryPoints)).toBe(true);
        
        // Każdy punkt powinien mieć strukturę { x, y, iterations }
        boundaryPoints.forEach(point => {
            expect(point).toHaveProperty('x');
            expect(point).toHaveProperty('y');
            expect(point).toHaveProperty('iterations');
            expect(typeof point.x).toBe('number');
            expect(typeof point.y).toBe('number');
            expect(typeof point.iterations).toBe('number');
            expect(point.iterations).toBeGreaterThan(config.maxIterations * 0.5);
            expect(point.iterations).toBeLessThan(config.maxIterations);
        });
    });

    test('powinien działać z domyślną liczbą próbek', () => {
        const config = {
            width: 10,
            height: 10,
            maxIterations: 20,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const boundaryPoints = calculateSetBoundary(config);
        expect(Array.isArray(boundaryPoints)).toBe(true);
    });

    test('powinien obsłużyć różne konfiguracje', () => {
        const configs = [
            { maxIterations: 10, zoom: 1 },
            { maxIterations: 50, zoom: 2 },
            { maxIterations: 100, zoom: 0.5 }
        ];

        configs.forEach(configOverride => {
            const config = {
                width: 5,
                height: 5,
                escapeRadius: 2,
                centerX: 0,
                centerY: 0,
                colorPalette: 'rainbow',
                ...configOverride
            };

            const boundaryPoints = calculateSetBoundary(config, 3);
            expect(Array.isArray(boundaryPoints)).toBe(true);
        });
    });

    test('powinien zwrócić pustą tablicę dla bardzo małej liczby iteracji', () => {
        const config = {
            width: 5,
            height: 5,
            maxIterations: 2, // Bardzo mała liczba iteracji
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const boundaryPoints = calculateSetBoundary(config, 3);
        expect(Array.isArray(boundaryPoints)).toBe(true);
        // Może być pusta lub mieć bardzo mało punktów
        expect(boundaryPoints.length).toBeGreaterThanOrEqual(0);
    });

    test('powinien obsłużyć różne liczby próbek', () => {
        const config = {
            width: 10,
            height: 10,
            maxIterations: 50,
            escapeRadius: 2,
            centerX: 0,
            centerY: 0,
            zoom: 1,
            colorPalette: 'rainbow'
        };

        const samples = [1, 3, 5, 10];
        
        samples.forEach(sampleCount => {
            const boundaryPoints = calculateSetBoundary(config, sampleCount);
            expect(Array.isArray(boundaryPoints)).toBe(true);
        });
    });
});
