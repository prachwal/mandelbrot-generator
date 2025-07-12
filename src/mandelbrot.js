// Algorytm generowania fraktala Mandelbrota

import { getColor } from './colors.js';
import { calculateBounds } from './config.js';

// Sprawdza czy punkt należy do zbioru Mandelbrota
export function mandelbrotIteration(cx, cy, maxIterations, escapeRadius = 2) {
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

// Generuje dane obrazu fraktala Mandelbrota
export function generateMandelbrotData(config) {
    const bounds = calculateBounds(config);
    const { width, height, maxIterations, escapeRadius, colorPalette } = config;
    
    console.log(`Generowanie fraktala Mandelbrota ${width}x${height}...`);
    console.log(`Zakres: [${bounds.minReal.toFixed(6)}, ${bounds.maxReal.toFixed(6)}] x [${bounds.minImaginary.toFixed(6)}, ${bounds.maxImaginary.toFixed(6)}]`);
    console.log(`Maksymalne iteracje: ${maxIterations}`);
    
    const imageData = new Uint8ClampedArray(width * height * 4); // RGBA
    
    const realStep = (bounds.maxReal - bounds.minReal) / width;
    const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / height;
    
    let pixelIndex = 0;
    let progressCounter = 0;
    const totalPixels = width * height;
    
    for (let py = 0; py < height; py++) {
        const cy = bounds.maxImaginary - py * imaginaryStep;
        
        for (let px = 0; px < width; px++) {
            const cx = bounds.minReal + px * realStep;
            
            const iterations = mandelbrotIteration(cx, cy, maxIterations, escapeRadius);
            const [r, g, b] = getColor(iterations, maxIterations, colorPalette);
            
            imageData[pixelIndex] = r;     // Red
            imageData[pixelIndex + 1] = g; // Green
            imageData[pixelIndex + 2] = b; // Blue
            imageData[pixelIndex + 3] = 255; // Alpha
            
            pixelIndex += 4;
            progressCounter++;
            
            // Wyświetl postęp co 10%
            if (progressCounter % Math.floor(totalPixels / 10) === 0) {
                const progress = Math.floor((progressCounter / totalPixels) * 100);
                console.log(`Postęp: ${progress}%`);
            }
        }
    }
    
    console.log('Generowanie zakończone!');
    return imageData;
}

// Wersja zoptymalizowana z wielowątkowością (dla Node.js)
export function generateMandelbrotDataOptimized(config, workerCount = 4) {
    return new Promise((resolve) => {
        const bounds = calculateBounds(config);
        const { width, height, maxIterations, escapeRadius, colorPalette } = config;
        
        console.log(`Generowanie fraktala Mandelbrota ${width}x${height} z ${workerCount} wątkami...`);
        
        const imageData = new Uint8ClampedArray(width * height * 4);
        const rowsPerWorker = Math.ceil(height / workerCount);
        let completedWorkers = 0;
        
        for (let w = 0; w < workerCount; w++) {
            const startRow = w * rowsPerWorker;
            const endRow = Math.min((w + 1) * rowsPerWorker, height);
            
            // Symulacja worker'a (w prawdziwej implementacji użyłbyś worker_threads)
            setTimeout(() => {
                const realStep = (bounds.maxReal - bounds.minReal) / width;
                const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / height;
                
                for (let py = startRow; py < endRow; py++) {
                    const cy = bounds.maxImaginary - py * imaginaryStep;
                    
                    for (let px = 0; px < width; px++) {
                        const cx = bounds.minReal + px * realStep;
                        const iterations = mandelbrotIteration(cx, cy, maxIterations, escapeRadius);
                        const [r, g, b] = getColor(iterations, maxIterations, colorPalette);
                        
                        const pixelIndex = (py * width + px) * 4;
                        imageData[pixelIndex] = r;
                        imageData[pixelIndex + 1] = g;
                        imageData[pixelIndex + 2] = b;
                        imageData[pixelIndex + 3] = 255;
                    }
                }
                
                completedWorkers++;
                console.log(`Worker ${w + 1}/${workerCount} zakończony (wiersze ${startRow}-${endRow - 1})`);
                
                if (completedWorkers === workerCount) {
                    console.log('Wszystkie worker\'y zakończone!');
                    resolve(imageData);
                }
            }, 0);
        }
    });
}

// Funkcja do sprawdzenia czy punkt jest w zbiorze (szybka wersja)
export function isInMandelbrotSet(cx, cy, maxIterations = 100) {
    return mandelbrotIteration(cx, cy, maxIterations) >= maxIterations;
}

// Funkcja do obliczenia przybliżonej granicy zbioru
export function calculateSetBoundary(config, samples = 1000) {
    const bounds = calculateBounds(config);
    const boundaryPoints = [];
    
    const realStep = (bounds.maxReal - bounds.minReal) / samples;
    const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / samples;
    
    for (let px = 0; px < samples; px++) {
        for (let py = 0; py < samples; py++) {
            const cx = bounds.minReal + px * realStep;
            const cy = bounds.maxImaginary - py * imaginaryStep;
            
            const iterations = mandelbrotIteration(cx, cy, config.maxIterations);
            
            // Punkt na granicy jeśli iteracje są między 50% a 100% maksimum
            if (iterations > config.maxIterations * 0.5 && iterations < config.maxIterations) {
                boundaryPoints.push({ x: cx, y: cy, iterations });
            }
        }
    }
    
    return boundaryPoints;
}
