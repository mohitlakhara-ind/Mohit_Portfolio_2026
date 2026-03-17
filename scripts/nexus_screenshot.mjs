import puppeteer from 'puppeteer';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const NEXUS_URL = 'https://nexus-visuals.vercel.app/';
const VIEWPORT = { width: 1440, height: 900 };

async function uploadToCloudinary(filePath, publicId) {
    console.log(`  ☁  Uploading to Cloudinary (${publicId})...`);
    const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: true,
    });
    return result.secure_url;
}

async function capture() {
    console.log('\n🚀 Starting Nexus Real Screenshot Capture...\n');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
        const page = await browser.newPage();
        await page.setViewport(VIEWPORT);
        
        console.log(`📸 Navigating to ${NEXUS_URL}`);
        await page.goto(NEXUS_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // Wait for potential animations or heavy canvas loads
        console.log("⏳ Waiting for page to stabilize...");
        await new Promise(r => setTimeout(r, 8000));

        const outputPath = path.join(__dirname, '..', 'public', 'projects', 'Nexus.png');
        await page.screenshot({ path: outputPath });
        console.log(`  ✅ Screenshot saved: ${outputPath}`);

        // Upload to Cloudinary
        const cloudUrl = await uploadToCloudinary(outputPath, 'portfolio_projects/Nexus');
        console.log(`  🔗 Cloudinary URL: ${cloudUrl}\n`);
        
    } finally {
        await browser.close();
    }
}

capture().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
