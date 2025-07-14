/**
 * Alternative image export formats for fractal generation
 */

import fs from 'fs';
import path from 'path';

/**
 * Save as PNG using Canvas (requires canvas package)
 */
export function saveAsPNG(imageData, width, height, filename) {
  // Requires: npm install canvas
  try {
    const { createCanvas } = require('canvas');
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    const imgData = ctx.createImageData(width, height);
    imgData.data.set(imageData);
    ctx.putImageData(imgData, 0, 0);
    
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
    console.log(`✓ Saved PNG: ${filename}`);
  } catch (error) {
    console.error('PNG export requires: npm install canvas');
    console.error(error.message);
  }
}

/**
 * Save as BMP (simple bitmap format)
 */
export function saveAsBMP(imageData, width, height, filename) {
  const fileSize = 54 + (width * height * 3);
  const buffer = Buffer.alloc(fileSize);
  
  // BMP Header
  buffer.write('BM', 0);
  buffer.writeUInt32LE(fileSize, 2);
  buffer.writeUInt32LE(54, 10); // Pixel data offset
  
  // DIB Header
  buffer.writeUInt32LE(40, 14); // Header size
  buffer.writeInt32LE(width, 18);
  buffer.writeInt32LE(-height, 22); // Negative = top-down
  buffer.writeUInt16LE(1, 26); // Planes
  buffer.writeUInt16LE(24, 28); // Bits per pixel
  
  // Pixel data
  let offset = 54;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      buffer[offset++] = imageData[i + 2]; // B
      buffer[offset++] = imageData[i + 1]; // G
      buffer[offset++] = imageData[i];     // R
    }
    // BMP rows must be 4-byte aligned
    while (offset % 4 !== 0) offset++;
  }
  
  fs.writeFileSync(filename, buffer);
  console.log(`✓ Saved BMP: ${filename}`);
}

/**
 * Save as raw binary data
 */
export function saveAsRAW(imageData, width, height, filename) {
  fs.writeFileSync(filename, imageData);
  console.log(`✓ Saved RAW: ${filename} (${width}x${height})`);
}

/**
 * Save as JSON data (for debugging)
 */
export function saveAsJSON(imageData, width, height, filename) {
  const data = {
    width,
    height,
    format: 'RGBA',
    pixels: Array.from(imageData)
  };
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`✓ Saved JSON: ${filename}`);
}
