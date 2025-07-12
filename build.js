#!/usr/bin/env node

import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🔨 Budowanie projektu Mandelbrot Generator...');

// Utwórz folder dist
const distDir = join(__dirname, 'dist');
if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
}

// Skopiuj pliki web do dist
const webFiles = ['index.html', 'script.js', 'style.css'];
const webDir = join(__dirname, 'web');

console.log('📁 Kopiowanie plików web...');
webFiles.forEach(file => {
    const srcPath = join(webDir, file);
    const destPath = join(distDir, file);
    
    if (existsSync(srcPath)) {
        copyFileSync(srcPath, destPath);
        console.log(`✅ Skopiowano: ${file}`);
    } else {
        console.log(`⚠️  Nie znaleziono: ${file}`);
    }
});

console.log('🎉 Budowanie zakończone!');
console.log(`📦 Pliki wyjściowe w: ${distDir}`);
console.log('🌐 Uruchom: npm run serve aby przetestować');

export default function build() {
    // Funkcja eksportowana dla innych skryptów
}
