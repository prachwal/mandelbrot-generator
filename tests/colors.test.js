// Testy jednostkowe dla modułu colors.js

import {
    colorPalettes,
    getColor,
    rgbToHex,
    getColorHex
} from '../src/colors.js';

describe('colors.js', () => {
    describe('colorPalettes', () => {
        test('powinien zawierać wszystkie predefiniowane palety', () => {
            const expectedPalettes = ['rainbow', 'fire', 'blue', 'grayscale', 'purple', 'sunset'];
            
            expectedPalettes.forEach(paletteName => {
                expect(colorPalettes).toHaveProperty(paletteName);
                expect(Array.isArray(colorPalettes[paletteName])).toBe(true);
                expect(colorPalettes[paletteName].length).toBeGreaterThan(0);
            });
        });

        test('każda paleta powinna zawierać kolory RGB w poprawnym formacie', () => {
            Object.values(colorPalettes).forEach(palette => {
                palette.forEach(color => {
                    expect(Array.isArray(color)).toBe(true);
                    expect(color.length).toBe(3);
                    
                    // Sprawdź czy wszystkie wartości RGB są w zakresie 0-255
                    color.forEach(value => {
                        expect(value).toBeGreaterThanOrEqual(0);
                        expect(value).toBeLessThanOrEqual(255);
                        expect(Number.isInteger(value)).toBe(true);
                    });
                });
            });
        });
    });

    describe('getColor', () => {
        test('powinien zwrócić czarny kolor dla punktów w zbiorze', () => {
            const color = getColor(100, 100, 'rainbow');
            expect(color).toEqual([0, 0, 0]);
        });

        test('powinien zwrócić kolorowy piksel dla punktów poza zbiorem', () => {
            const color = getColor(50, 100, 'rainbow');
            expect(Array.isArray(color)).toBe(true);
            expect(color.length).toBe(3);
            
            // Sprawdź czy wartości RGB są w poprawnym zakresie
            color.forEach(value => {
                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(255);
            });
        });

        test('powinien działać z różnymi paletami', () => {
            const palettes = ['rainbow', 'fire', 'blue', 'grayscale', 'purple', 'sunset'];
            
            palettes.forEach(palette => {
                const color = getColor(25, 100, palette);
                expect(Array.isArray(color)).toBe(true);
                expect(color.length).toBe(3);
            });
        });

        test('powinien użyć domyślnej palety rainbow dla nieznanej palety', () => {
            const colorWithUnknown = getColor(25, 100, 'nonexistent');
            const colorWithRainbow = getColor(25, 100, 'rainbow');
            expect(colorWithUnknown).toEqual(colorWithRainbow);
        });

        test('powinien użyć domyślnej palety rainbow gdy nie podano palety', () => {
            const colorDefault = getColor(25, 100);
            const colorRainbow = getColor(25, 100, 'rainbow');
            expect(colorDefault).toEqual(colorRainbow);
        });

        test('powinien obsłużyć wartości graniczne', () => {
            // iterations = 0
            const color1 = getColor(0, 100, 'rainbow');
            expect(Array.isArray(color1)).toBe(true);
            
            // iterations = maxIterations - 1
            const color2 = getColor(99, 100, 'rainbow');
            expect(Array.isArray(color2)).toBe(true);
            
            // iterations >= maxIterations
            const color3 = getColor(100, 100, 'rainbow');
            expect(color3).toEqual([0, 0, 0]);
        });
    });

    describe('rgbToHex', () => {
        test('powinien konwertować RGB na hex poprawnie', () => {
            expect(rgbToHex(0, 0, 0)).toBe('#000000');
            expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
            expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
            expect(rgbToHex(0, 255, 0)).toBe('#00ff00');
            expect(rgbToHex(0, 0, 255)).toBe('#0000ff');
        });

        test('powinien obsłużyć wartości pośrednie', () => {
            expect(rgbToHex(128, 128, 128)).toBe('#808080');
            expect(rgbToHex(192, 192, 192)).toBe('#c0c0c0');
            expect(rgbToHex(64, 64, 64)).toBe('#404040');
        });

        test('powinien obsłużyć pojedyncze cyfry hex', () => {
            expect(rgbToHex(1, 2, 3)).toBe('#010203');
            expect(rgbToHex(15, 15, 15)).toBe('#0f0f0f');
        });

        test('powinien obsłużyć typowe kolory', () => {
            expect(rgbToHex(255, 165, 0)).toBe('#ffa500'); // Orange
            expect(rgbToHex(75, 0, 130)).toBe('#4b0082'); // Indigo
            expect(rgbToHex(220, 20, 60)).toBe('#dc143c'); // Crimson
        });
    });

    describe('getColorHex', () => {
        test('powinien zwrócić hex dla punktów w zbiorze', () => {
            const hexColor = getColorHex(100, 100, 'rainbow');
            expect(hexColor).toBe('#000000');
        });

        test('powinien zwrócić poprawny format hex dla punktów poza zbiorem', () => {
            const hexColor = getColorHex(50, 100, 'rainbow');
            expect(typeof hexColor).toBe('string');
            expect(hexColor).toMatch(/^#[0-9a-f]{6}$/);
        });

        test('powinien działać z różnymi paletami', () => {
            const palettes = ['rainbow', 'fire', 'blue', 'grayscale', 'purple', 'sunset'];
            
            palettes.forEach(palette => {
                const hexColor = getColorHex(25, 100, palette);
                expect(typeof hexColor).toBe('string');
                expect(hexColor).toMatch(/^#[0-9a-f]{6}$/);
            });
        });

        test('powinien użyć domyślnej palety rainbow', () => {
            const hexDefault = getColorHex(25, 100);
            const hexRainbow = getColorHex(25, 100, 'rainbow');
            expect(hexDefault).toBe(hexRainbow);
        });

        test('powinien być spójny z funkcją getColor', () => {
            const iterations = 30;
            const maxIterations = 100;
            const palette = 'fire';
            
            const [r, g, b] = getColor(iterations, maxIterations, palette);
            const expectedHex = rgbToHex(r, g, b);
            const actualHex = getColorHex(iterations, maxIterations, palette);
            
            expect(actualHex).toBe(expectedHex);
        });

        test('powinien obsłużyć różne wartości iteracji', () => {
            const testCases = [
                { iterations: 0, maxIterations: 100 },
                { iterations: 25, maxIterations: 100 },
                { iterations: 50, maxIterations: 100 },
                { iterations: 75, maxIterations: 100 },
                { iterations: 99, maxIterations: 100 },
                { iterations: 100, maxIterations: 100 }
            ];

            testCases.forEach(({ iterations, maxIterations }) => {
                const hexColor = getColorHex(iterations, maxIterations, 'rainbow');
                expect(typeof hexColor).toBe('string');
                expect(hexColor).toMatch(/^#[0-9a-f]{6}$/);
            });
        });

        test('powinien obsłużyć nieznaną paletę', () => {
            const hexColor = getColorHex(50, 100, 'unknown_palette');
            expect(typeof hexColor).toBe('string');
            expect(hexColor).toMatch(/^#[0-9a-f]{6}$/);
        });
    });
});
