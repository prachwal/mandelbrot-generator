// Palety kolorów dla wizualizacji fraktala Mandelbrota

// Funkcja do interpolacji kolorów
function interpolateColor(color1, color2, factor) {
    const r = Math.round(color1[0] + (color2[0] - color1[0]) * factor);
    const g = Math.round(color1[1] + (color2[1] - color1[1]) * factor);
    const b = Math.round(color1[2] + (color2[2] - color1[2]) * factor);
    return [r, g, b];
}

// Generowanie palety kolorów na podstawie punktów kontrolnych
function generatePalette(controlPoints, size = 256) {
    const palette = [];
    const segments = controlPoints.length - 1;
    
    for (let i = 0; i < size; i++) {
        const position = (i / (size - 1)) * segments;
        const segmentIndex = Math.floor(position);
        const segmentPosition = position - segmentIndex;
        
        if (segmentIndex >= segments) {
            palette.push(controlPoints[controlPoints.length - 1]);
        } else {
            const color = interpolateColor(
                controlPoints[segmentIndex],
                controlPoints[segmentIndex + 1],
                segmentPosition
            );
            palette.push(color);
        }
    }
    
    return palette;
}

// Predefiniowane palety kolorów
export const colorPalettes = {
    rainbow: generatePalette([
        [66, 30, 15],    // Ciemny brąz
        [25, 7, 26],     // Ciemny fiolet
        [9, 1, 47],      // Ciemny niebieski
        [4, 4, 73],      // Niebieski
        [0, 7, 100],     // Jasny niebieski
        [12, 44, 138],   // Cyan
        [24, 82, 177],   // Jasny cyan
        [57, 125, 209],  // Jasny błękitny
        [134, 181, 229], // Bardzo jasny błękitny
        [211, 236, 248], // Biały błękitny
        [241, 233, 191], // Jasny żółty
        [248, 201, 95],  // Żółty
        [255, 170, 0],   // Pomarańczowy
        [204, 128, 0],   // Ciemny pomarańczowy
        [153, 87, 0],    // Brązowy
        [106, 52, 3]     // Ciemny brąz
    ]),
    
    fire: generatePalette([
        [0, 0, 0],       // Czarny
        [32, 0, 0],      // Ciemny czerwony
        [64, 0, 0],      // Czerwony
        [96, 32, 0],     // Czerwono-pomarańczowy
        [128, 64, 0],    // Pomarańczowy
        [160, 96, 32],   // Jasny pomarańczowy
        [192, 128, 64],  // Żółto-pomarańczowy
        [255, 192, 128], // Jasny żółty
        [255, 255, 192], // Bardzo jasny żółty
        [255, 255, 255]  // Biały
    ]),
    
    blue: generatePalette([
        [0, 0, 0],       // Czarny
        [0, 0, 64],      // Ciemny niebieski
        [0, 0, 128],     // Niebieski
        [0, 64, 192],    // Jasny niebieski
        [0, 128, 255],   // Cyan
        [64, 192, 255],  // Jasny cyan
        [128, 224, 255], // Bardzo jasny cyan
        [192, 240, 255], // Biały niebieski
        [255, 255, 255]  // Biały
    ]),
    
    grayscale: generatePalette([
        [0, 0, 0],       // Czarny
        [64, 64, 64],    // Ciemny szary
        [128, 128, 128], // Szary
        [192, 192, 192], // Jasny szary
        [255, 255, 255]  // Biały
    ]),
    
    purple: generatePalette([
        [0, 0, 0],       // Czarny
        [32, 0, 32],     // Ciemny fiolet
        [64, 0, 64],     // Fiolet
        [96, 32, 96],    // Jasny fiolet
        [128, 64, 128],  // Róż-fiolet
        [160, 96, 160],  // Jasny róż-fiolet
        [192, 128, 192], // Różowy
        [224, 160, 224], // Jasny różowy
        [255, 192, 255], // Bardzo jasny różowy
        [255, 255, 255]  // Biały
    ]),
    
    sunset: generatePalette([
        [25, 25, 112],   // Ciemny niebieski (noc)
        [70, 130, 180],  // Stalowy niebieski
        [135, 206, 235], // Jasny niebieski
        [255, 165, 0],   // Pomarańczowy
        [255, 69, 0],    // Czerwono-pomarańczowy
        [220, 20, 60],   // Karmazynowy
        [139, 0, 139],   // Ciemny magenta
        [75, 0, 130]     // Indygo
    ])
};

// Funkcja do uzyskania koloru dla danej liczby iteracji
export function getColor(iterations, maxIterations, paletteType = 'rainbow') {
    if (iterations >= maxIterations) {
        return [0, 0, 0]; // Czarny dla punktów w zbiorze
    }
    
    const palette = colorPalettes[paletteType] || colorPalettes.rainbow;
    const index = Math.floor((iterations / maxIterations) * (palette.length - 1));
    return palette[index];
}

// Funkcja do konwersji RGB na hex
export function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Funkcja do uzyskania koloru w formacie hex
export function getColorHex(iterations, maxIterations, paletteType = 'rainbow') {
    const [r, g, b] = getColor(iterations, maxIterations, paletteType);
    return rgbToHex(r, g, b);
}
