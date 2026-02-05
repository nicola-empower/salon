import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const envPath = path.join(rootDir, '.env.local');

// 1. Read .env.local manually
let UNSPLASH_ACCESS_KEY = '';
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/UNSPLASH_ACCESS_KEY=(.+)/);
    if (match) {
        UNSPLASH_ACCESS_KEY = match[1].trim();
    }
}

if (!UNSPLASH_ACCESS_KEY) {
    console.error('Error: UNSPLASH_ACCESS_KEY not found in .env.local');
    process.exit(1);
}

const CATEGORIES = [
    { name: 'hair', query: 'hair salon back view hairstyle balayage', count: 6 },
    { name: 'nails', query: 'manicure hands close up nail art', count: 6 },
    { name: 'spa', query: 'woman facial spa treatment skincare', count: 6 }
];

const OUTPUT_DIR = path.join(rootDir, 'src', 'assets', 'gallery');

async function downloadImage(url, filepath) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function main() {
    console.log('Starting image download from Unsplash...');

    for (const cat of CATEGORIES) {
        console.log(`Fetching ${cat.count} images for category: ${cat.name}`);
        const url = `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&query=${encodeURIComponent(cat.query)}&count=${cat.count}&orientation=portrait`;

        try {
            const res = await fetch(url);
            if (!res.ok) {
                console.error(`API Error for ${cat.name}: ${res.status} ${res.statusText}`);
                const text = await res.text();
                console.error(text);
                continue;
            }

            const photos = await res.json();
            const photoArray = Array.isArray(photos) ? photos : [photos];

            for (let i = 0; i < photoArray.length; i++) {
                const photo = photoArray[i];
                const imageUrl = photo.urls.regular; // Use 'regular' size (approx 1080px width)
                const filename = `${cat.name}_${i + 1}.jpg`;
                const filepath = path.join(OUTPUT_DIR, filename);

                console.log(`Downloading ${filename}...`);
                await downloadImage(imageUrl, filepath);
            }
        } catch (error) {
            console.error(`Error processing category ${cat.name}:`, error);
        }
    }

    console.log('Download complete!');
}

main();
