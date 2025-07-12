#!/usr/bin/env node

// Przykłady użycia generatora Mandelbrota
import { main } from './src/index.js';
import { generateMandelbrotData } from './src/mandelbrot.js';
import { interestingPoints } from './src/config.js';

console.log('📚 Przykłady użycia Mandelbrot Generator');
console.log('=====================================\n');

console.log('🎯 Dostępne predefiniowane punkty:');
Object.entries(interestingPoints).forEach(([key, point]) => {
    console.log(`  ${key}: ${point.description}`);
    console.log(`    Centrum: (${point.centerX}, ${point.centerY})`);
    console.log(`    Zoom: ${point.zoom}x\n`);
});

console.log('💻 Przykłady komend:');
console.log('');

console.log('1. Podstawowe generowanie:');
console.log('   npm start');
console.log('');

console.log('2. Użycie predefiniowanego punktu:');
console.log('   npm start elephant');
console.log('   npm start seahorse');
console.log('');

console.log('3. Niestandardowe parametry:');
console.log('   npm start -- --width 1200 --height 900 --iterations 200');
console.log('');

console.log('4. Szczegółowa konfiguracja:');
console.log('   npm start -- --centerX -0.7 --centerY 0.1 --zoom 50 --palette fire');
console.log('');

console.log('5. Wysoka jakość:');
console.log('   npm start -- --width 1920 --height 1080 --iterations 500 --palette sunset');
console.log('');

console.log('🌐 Wersja przeglądarki:');
console.log('   npm run serve');
console.log('   Następnie otwórz: http://localhost:8080');
console.log('');

console.log('⚙️  Parametry wiersza poleceń:');
console.log('   --width N        Szerokość obrazu (px)');
console.log('   --height N       Wysokość obrazu (px)');
console.log('   --iterations N   Maksymalna liczba iteracji');
console.log('   --zoom N         Poziom powiększenia');
console.log('   --centerX N      Współrzędna X centrum');
console.log('   --centerY N      Współrzędna Y centrum');
console.log('   --palette NAME   Paleta kolorów (rainbow, fire, blue, purple, sunset, grayscale)');
console.log('   --output FILE    Nazwa pliku wyjściowego');
console.log('');
