#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateMandelbrotData } from './mandelbrot.js';
import { defaultConfig, interestingPoints } from './config.js';
import { getColor } from './colors.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

// Funkcja do zapisania obrazu jako SVG
function saveImageAsSVG(config, filename) {
    const { width, height } = config;
    
    console.log(`Generowanie SVG ${width}x${height}...`);
    
    const svg = generateMandelbrotSVG(config);
    
    const outputDir = join(projectRoot, 'output');
    mkdirSync(outputDir, { recursive: true });
    
    const outputPath = join(outputDir, filename.replace('.png', '.svg'));
    writeFileSync(outputPath, svg);
    
    console.log(`Obraz zapisany jako: ${outputPath}`);
    return outputPath;
}

// Funkcja do generowania SVG
function generateMandelbrotSVG(config) {
    const { width, height, maxIterations, escapeRadius, colorPalette } = config;
    const bounds = calculateBounds(config);
    
    let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
<title>Fraktal Mandelbrota</title>
<desc>Centrum: (${config.centerX}, ${config.centerY}), Zoom: ${config.zoom}x, Iteracje: ${maxIterations}</desc>
`;

    const realStep = (bounds.maxReal - bounds.minReal) / width;
    const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / height;
    
    // Generuj prostokąty o rozmiarze 2x2 pikseli dla lepszej wydajności
    const pixelSize = 2;
    
    for (let py = 0; py < height; py += pixelSize) {
        const cy = bounds.maxImaginary - py * imaginaryStep;
        
        for (let px = 0; px < width; px += pixelSize) {
            const cx = bounds.minReal + px * realStep;
            
            const iterations = mandelbrotIteration(cx, cy, maxIterations, escapeRadius);
            const [r, g, b] = getColor(iterations, maxIterations, colorPalette);
            
            if (iterations < maxIterations) { // Nie rysuj czarnych pikseli (zbiór Mandelbrota)
                const color = `rgb(${r},${g},${b})`;
                svgContent += `<rect x="${px}" y="${py}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>
`;
            }
        }
        
        // Pokaż postęp
        if (py % Math.floor(height / 10) === 0) {
            const progress = Math.floor((py / height) * 100);
            console.log(`Postęp SVG: ${progress}%`);
        }
    }
    
    svgContent += '</svg>';
    return svgContent;
}

// Import funkcji z mandelbrot.js
function mandelbrotIteration(cx, cy, maxIterations, escapeRadius = 2) {
    let x = 0;
    let y = 0;
    let iteration = 0;
    
    const escapeRadiusSquared = escapeRadius * escapeRadius;
    
    while (iteration < maxIterations && (x * x + y * y) < escapeRadiusSquared) {
        const xTemp = x * x - y * y + cx;
        y = 2 * x * y + cy;
        x = xTemp;
        iteration++;
    }
    
    return iteration;
}

function calculateBounds(config) {
    const aspectRatio = config.width / config.height;
    const range = 4 / config.zoom;
    
    const realRange = range * aspectRatio;
    const imaginaryRange = range;
    
    return {
        minReal: config.centerX - realRange / 2,
        maxReal: config.centerX + realRange / 2,
        minImaginary: config.centerY - imaginaryRange / 2,
        maxImaginary: config.centerY + imaginaryRange / 2
    };
}

// Funkcja główna
async function main() {
    console.log('🎨 Generator Fraktala Mandelbrota');
    console.log('=================================\\n');
    
    // Parsowanie argumentów linii komend
    const args = process.argv.slice(2);
    let config = { ...defaultConfig };
    
    // Sprawdź czy użytkownik chce użyć predefiniowanego punktu
    if (args.length > 0) {
        const pointName = args[0];
        if (interestingPoints[pointName]) {
            console.log(`Używanie predefiniowanego punktu: ${pointName}`);
            console.log(`Opis: ${interestingPoints[pointName].description}\\n`);
            config = {
                ...config,
                ...interestingPoints[pointName]
            };
        } else {
            console.log(`Dostępne predefiniowane punkty:`);
            Object.keys(interestingPoints).forEach(key => {
                console.log(`  ${key}: ${interestingPoints[key].description}`);
            });
            console.log(`\\nUżycie: npm start [punkt]\\n`);
        }
    }
    
    // Parsowanie dodatkowych parametrów
    for (let i = 0; i < args.length; i += 2) {
        const param = args[i];
        const value = args[i + 1];
        
        switch (param) {
            case '--width':
                config.width = parseInt(value);
                break;
            case '--height':
                config.height = parseInt(value);
                break;
            case '--iterations':
                config.maxIterations = parseInt(value);
                break;
            case '--zoom':
                config.zoom = parseFloat(value);
                break;
            case '--centerX':
                config.centerX = parseFloat(value);
                break;
            case '--centerY':
                config.centerY = parseFloat(value);
                break;
            case '--palette':
                config.colorPalette = value;
                break;
            case '--output':
                config.outputFile = value;
                break;
        }
    }
    
    console.log('Konfiguracja:');
    console.log(`  Rozmiar: ${config.width}x${config.height}`);
    console.log(`  Centrum: (${config.centerX}, ${config.centerY})`);
    console.log(`  Zoom: ${config.zoom}x`);
    console.log(`  Iteracje: ${config.maxIterations}`);
    console.log(`  Paleta: ${config.colorPalette}`);
    console.log(`  Plik wyjściowy: ${config.outputFile}\\n`);
    
    try {
        const startTime = Date.now();
        
        // Generuj jako SVG
        const outputPath = saveImageAsSVG(config, config.outputFile);
        
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        
        console.log(`\\n✅ Gotowe! Czas generowania: ${duration.toFixed(2)}s`);
        console.log(`📁 Lokalizacja pliku: ${outputPath}`);
        
        // Pokaż statystyki
        const totalPixels = config.width * config.height;
        console.log(`📊 Format: SVG`);
        console.log(`🔢 Pikseli: ${totalPixels.toLocaleString()}`);
        console.log(`⚡ Pikseli/sekundę: ${Math.round(totalPixels / duration).toLocaleString()}`);
        
    } catch (error) {
        console.error('❌ Błąd podczas generowania:', error.message);
        process.exit(1);
    }
}

// Uruchom program
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export { main };
