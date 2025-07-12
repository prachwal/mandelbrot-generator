// Import konfiguracji i funkcji (symulujemy import dla przeglądarki)
// W prawdziwej implementacji te pliki byłyby importowane jako moduły ES6

// Konfiguracja i predefiniowane punkty
const defaultConfig = {
    width: 800,
    height: 600,
    maxIterations: 100,
    escapeRadius: 2,
    zoom: 1,
    centerX: -0.5,
    centerY: 0,
    colorPalette: 'rainbow'
};

const interestingPoints = {
    classic: { centerX: -0.5, centerY: 0, zoom: 1, description: "Klasyczny widok" },
    elephant: { centerX: -0.7269, centerY: 0.1889, zoom: 100, description: "Dolina słoni" },
    seahorse: { centerX: -0.7463, centerY: 0.1102, zoom: 1000, description: "Konik morski" },
    lightning: { centerX: -1.25066, centerY: 0.02012, zoom: 2000, description: "Błyskawice" },
    spiral: { centerX: -0.8, centerY: 0.156, zoom: 500, description: "Spirala" }
};

// Palety kolorów
function interpolateColor(color1, color2, factor) {
    const r = Math.round(color1[0] + (color2[0] - color1[0]) * factor);
    const g = Math.round(color1[1] + (color2[1] - color1[1]) * factor);
    const b = Math.round(color1[2] + (color2[2] - color1[2]) * factor);
    return [r, g, b];
}

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

const colorPalettes = {
    rainbow: generatePalette([
        [66, 30, 15], [25, 7, 26], [9, 1, 47], [4, 4, 73], [0, 7, 100],
        [12, 44, 138], [24, 82, 177], [57, 125, 209], [134, 181, 229],
        [211, 236, 248], [241, 233, 191], [248, 201, 95], [255, 170, 0],
        [204, 128, 0], [153, 87, 0], [106, 52, 3]
    ]),
    fire: generatePalette([
        [0, 0, 0], [32, 0, 0], [64, 0, 0], [96, 32, 0], [128, 64, 0],
        [160, 96, 32], [192, 128, 64], [255, 192, 128], [255, 255, 192], [255, 255, 255]
    ]),
    blue: generatePalette([
        [0, 0, 0], [0, 0, 64], [0, 0, 128], [0, 64, 192], [0, 128, 255],
        [64, 192, 255], [128, 224, 255], [192, 240, 255], [255, 255, 255]
    ]),
    grayscale: generatePalette([
        [0, 0, 0], [64, 64, 64], [128, 128, 128], [192, 192, 192], [255, 255, 255]
    ]),
    purple: generatePalette([
        [0, 0, 0], [32, 0, 32], [64, 0, 64], [96, 32, 96], [128, 64, 128],
        [160, 96, 160], [192, 128, 192], [224, 160, 224], [255, 192, 255], [255, 255, 255]
    ]),
    sunset: generatePalette([
        [25, 25, 112], [70, 130, 180], [135, 206, 235], [255, 165, 0],
        [255, 69, 0], [220, 20, 60], [139, 0, 139], [75, 0, 130]
    ])
};

function getColor(iterations, maxIterations, paletteType = 'rainbow') {
    if (iterations >= maxIterations) {
        return [0, 0, 0];
    }
    
    const palette = colorPalettes[paletteType] || colorPalettes.rainbow;
    const index = Math.floor((iterations / maxIterations) * (palette.length - 1));
    return palette[index];
}

// Algorytm Mandelbrota
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

// Klasa główna aplikacji
class MandelbrotApp {
    constructor() {
        this.canvas = document.getElementById('mandelbrotCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.config = { ...defaultConfig };
        this.isGenerating = false;
        this.currentImageData = null;
        this.bounds = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.updateUI();
    }
    
    initializeElements() {
        this.elements = {
            width: document.getElementById('width'),
            height: document.getElementById('height'),
            iterations: document.getElementById('iterations'),
            centerX: document.getElementById('centerX'),
            centerY: document.getElementById('centerY'),
            zoom: document.getElementById('zoom'),
            palette: document.getElementById('palette'),
            generateBtn: document.getElementById('generateBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            resetBtn: document.getElementById('resetBtn'),
            progressBar: document.getElementById('progressBar'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            generationInfo: document.getElementById('generationInfo'),
            mouseCoords: document.getElementById('mouseCoords')
        };
    }
    
    setupEventListeners() {
        // Przyciski akcji
        this.elements.generateBtn.addEventListener('click', () => this.generate());
        this.elements.downloadBtn.addEventListener('click', () => this.download());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        
        // Predefiniowane punkty
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.loadPreset(preset);
            });
        });
        
        // Aktualizacja konfiguracji przy zmianie wartości
        Object.keys(this.elements).forEach(key => {
            if (this.elements[key] && this.elements[key].addEventListener) {
                this.elements[key].addEventListener('change', () => this.updateConfig());
                this.elements[key].addEventListener('input', () => this.updateConfig());
            }
        });
        
        // Kliknięcie na canvas do zmiany centrum
        this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));
        
        // Śledzenie pozycji myszy
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => {
            this.elements.mouseCoords.textContent = '-';
        });
    }
    
    updateConfig() {
        this.config = {
            width: parseInt(this.elements.width.value),
            height: parseInt(this.elements.height.value),
            maxIterations: parseInt(this.elements.iterations.value),
            escapeRadius: 2,
            centerX: parseFloat(this.elements.centerX.value),
            centerY: parseFloat(this.elements.centerY.value),
            zoom: parseFloat(this.elements.zoom.value),
            colorPalette: this.elements.palette.value
        };
        
        // Aktualizuj rozmiar canvas
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        this.bounds = calculateBounds(this.config);
    }
    
    updateUI() {
        this.elements.width.value = this.config.width;
        this.elements.height.value = this.config.height;
        this.elements.iterations.value = this.config.maxIterations;
        this.elements.centerX.value = this.config.centerX;
        this.elements.centerY.value = this.config.centerY;
        this.elements.zoom.value = this.config.zoom;
        this.elements.palette.value = this.config.colorPalette;
        
        this.updateConfig();
    }
    
    loadPreset(presetName) {
        if (interestingPoints[presetName]) {
            const preset = interestingPoints[presetName];
            this.config = { ...this.config, ...preset };
            this.updateUI();
            
            this.showInfo(`Załadowano preset: ${preset.description}`);
        }
    }
    
    reset() {
        this.config = { ...defaultConfig };
        this.updateUI();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.elements.downloadBtn.disabled = true;
        this.showInfo('Ustawienia zostały zresetowane');
    }
    
    async generate() {
        if (this.isGenerating) return;
        
        this.isGenerating = true;
        this.elements.generateBtn.disabled = true;
        this.elements.generateBtn.textContent = '⏳ Generowanie...';
        this.elements.downloadBtn.disabled = true;
        this.showProgress(true);
        
        this.updateConfig();
        
        const startTime = Date.now();
        
        try {
            await this.generateMandelbrot();
            
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000;
            
            this.showInfo(`✅ Wygenerowano w ${duration.toFixed(2)}s (${this.config.width}x${this.config.height}, ${this.config.maxIterations} iteracji)`);
            this.elements.downloadBtn.disabled = false;
            
        } catch (error) {
            this.showInfo(`❌ Błąd: ${error.message}`);
        } finally {
            this.isGenerating = false;
            this.elements.generateBtn.disabled = false;
            this.elements.generateBtn.textContent = '🚀 Generuj Fraktal';
            this.showProgress(false);
        }
    }
    
    async generateMandelbrot() {
        const { width, height, maxIterations, escapeRadius, colorPalette } = this.config;
        const bounds = calculateBounds(this.config);
        
        const imageData = this.ctx.createImageData(width, height);
        const data = imageData.data;
        
        const realStep = (bounds.maxReal - bounds.minReal) / width;
        const imaginaryStep = (bounds.maxImaginary - bounds.minImaginary) / height;
        
        const totalPixels = width * height;
        let pixelIndex = 0;
        let processedPixels = 0;
        
        // Renderuj w małych blokach aby nie blokować UI
        const batchSize = 1000;
        
        for (let py = 0; py < height; py++) {
            const cy = bounds.maxImaginary - py * imaginaryStep;
            
            for (let px = 0; px < width; px++) {
                const cx = bounds.minReal + px * realStep;
                
                const iterations = mandelbrotIteration(cx, cy, maxIterations, escapeRadius);
                const [r, g, b] = getColor(iterations, maxIterations, colorPalette);
                
                data[pixelIndex] = r;
                data[pixelIndex + 1] = g;
                data[pixelIndex + 2] = b;
                data[pixelIndex + 3] = 255;
                
                pixelIndex += 4;
                processedPixels++;
                
                // Aktualizuj postęp i pozwól przeglądarce na renderowanie
                if (processedPixels % batchSize === 0) {
                    const progress = (processedPixels / totalPixels) * 100;
                    this.updateProgress(progress);
                    
                    // Pozwól przeglądarce na renderowanie
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }
        }
        
        this.updateProgress(100);
        this.ctx.putImageData(imageData, 0, 0);
        this.currentImageData = imageData;
        this.bounds = bounds;
    }
    
    onCanvasClick(event) {
        if (!this.bounds || this.isGenerating) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Przelicz współrzędne ekranu na współrzędne zespolone
        const realRange = this.bounds.maxReal - this.bounds.minReal;
        const imaginaryRange = this.bounds.maxImaginary - this.bounds.minImaginary;
        
        const newCenterX = this.bounds.minReal + (x / this.canvas.width) * realRange;
        const newCenterY = this.bounds.maxImaginary - (y / this.canvas.height) * imaginaryRange;
        
        this.config.centerX = newCenterX;
        this.config.centerY = newCenterY;
        this.config.zoom *= 2; // Powiększ 2x przy kliknięciu
        
        this.updateUI();
        this.showInfo(`Wyśrodkowano na (${newCenterX.toFixed(6)}, ${newCenterY.toFixed(6)}) z zoom ${this.config.zoom}x`);
    }
    
    onMouseMove(event) {
        if (!this.bounds) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const realRange = this.bounds.maxReal - this.bounds.minReal;
        const imaginaryRange = this.bounds.maxImaginary - this.bounds.minImaginary;
        
        const complexX = this.bounds.minReal + (x / this.canvas.width) * realRange;
        const complexY = this.bounds.maxImaginary - (y / this.canvas.height) * imaginaryRange;
        
        this.elements.mouseCoords.textContent = `(${complexX.toFixed(6)}, ${complexY.toFixed(6)}i)`;
    }
    
    download() {
        if (!this.currentImageData) return;
        
        const link = document.createElement('a');
        link.download = `mandelbrot_${this.config.centerX}_${this.config.centerY}_${this.config.zoom}x.png`;
        link.href = this.canvas.toDataURL();
        link.click();
        
        this.showInfo(`Pobrano obraz: ${link.download}`);
    }
    
    showProgress(visible) {
        if (visible) {
            this.elements.progressBar.classList.add('visible');
        } else {
            this.elements.progressBar.classList.remove('visible');
        }
    }
    
    updateProgress(percent) {
        this.elements.progressFill.style.width = `${percent}%`;
        this.elements.progressText.textContent = `${Math.round(percent)}%`;
    }
    
    showInfo(message) {
        this.elements.generationInfo.textContent = message;
        
        // Automatycznie ukryj po 5 sekundach
        setTimeout(() => {
            if (this.elements.generationInfo.textContent === message) {
                this.elements.generationInfo.textContent = '';
            }
        }, 5000);
    }
}

// Uruchom aplikację gdy DOM jest gotowy
document.addEventListener('DOMContentLoaded', () => {
    new MandelbrotApp();
});
