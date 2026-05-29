import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, 'src', 'assets');

async function optimizeImages() {
  try {
    const files = await fs.readdir(assetsDir);
    const pngFiles = files.filter(f => f.endsWith('.png'));

    if (pngFiles.length === 0) {
      console.log('No PNG files found to convert.');
      return;
    }

    console.log(`Found ${pngFiles.length} PNG files. Converting to WebP...`);

    for (const file of pngFiles) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(assetsDir, file.replace('.png', '.webp'));

      await sharp(inputPath)
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      await fs.unlink(inputPath);
      console.log(`Converted and deleted original: ${file} -> ${path.basename(outputPath)}`);
    }

    console.log('All images successfully converted to WebP.');
  } catch (err) {
    console.error('Error optimizing images:', err);
  }
}

optimizeImages();
