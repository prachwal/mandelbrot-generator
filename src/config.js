// Konfiguracja dla generatora Mandelbrota
export const defaultConfig = {
    // Rozmiar obrazu
    width: 800,
    height: 600,
    
    // Parametry fraktala
    maxIterations: 100,
    escapeRadius: 2,
    
    // Obszar do renderowania
    zoom: 1,
    centerX: -0.5,
    centerY: 0,
    
    // Zakres kompleksowy (będzie obliczony automatycznie na podstawie zoom i center)
    minReal: -2.5,
    maxReal: 1.5,
    minImaginary: -1.5,
    maxImaginary: 1.5,
    
    // Paleta kolorów
    colorPalette: 'rainbow', // 'rainbow', 'blue', 'fire', 'grayscale'
    
    // Nazwa pliku wyjściowego (dla Node.js)
    outputFile: 'mandelbrot.svg'
};

// Funkcja do obliczenia zakresu na podstawie zoom i centrum
export function calculateBounds(config) {
    const aspectRatio = config.width / config.height;
    const range = 4 / config.zoom; // Bazowy zakres to 4 (-2 do 2)
    
    const realRange = range * aspectRatio;
    const imaginaryRange = range;
    
    return {
        minReal: config.centerX - realRange / 2,
        maxReal: config.centerX + realRange / 2,
        minImaginary: config.centerY - imaginaryRange / 2,
        maxImaginary: config.centerY + imaginaryRange / 2
    };
}

// Predefiniowane ciekawe lokalizacje
export const interestingPoints = {
    classic: {
        centerX: -0.5,
        centerY: 0,
        zoom: 1,
        description: "Klasyczny widok całego zbioru Mandelbrota"
    },
    elephant: {
        centerX: -0.7269,
        centerY: 0.1889,
        zoom: 100,
        description: "Dolina słoni"
    },
    seahorse: {
        centerX: -0.7463,
        centerY: 0.1102,
        zoom: 1000,
        description: "Dolina koników morskich"
    },
    lightning: {
        centerX: -1.25066,
        centerY: 0.02012,
        zoom: 2000,
        description: "Błyskawice"
    },
    spiral: {
        centerX: -0.8,
        centerY: 0.156,
        zoom: 500,
        description: "Spiralne wzory"
    }
};
