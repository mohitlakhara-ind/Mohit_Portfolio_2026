/**
 * scripts/upload-soloflow.js
 *
 * Uploads the key Soloflow desktop screenshots to Cloudinary and outputs
 * the resulting secure URLs so you can paste them into data files.
 *
 * Usage (from Mohit_Portfolio_2026 root):
 *   node scripts/upload-soloflow.js
 *
 * Requires a .env file in this directory with:
 *   CLOUDINARY_CLOUD_NAME=...
 *   CLOUDINARY_CLOUD_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 */

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs   = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Absolute path to the flowinvoice desktop screenshots folder
const SCREENSHOTS_DIR = path.resolve(
  __dirname,
  '../../flowinvoice/screenshots/desktop'
);

// The shots we want on Cloudinary (key = logical name, value = filename)
const SHOTS = {
  landing_dark:       'landing-dark.png',
  landing_light:      'landing-light.png',
  dashboard_dark:     'dashboard-home-dark.png',
  dashboard_light:    'dashboard-home-light.png',
  invoices_dark:      'dashboard-invoices-dark.png',
  invoices_light:     'dashboard-invoices-light.png',
  clients_dark:       'dashboard-clients-dark.png',
  clients_light:      'dashboard-clients-light.png',
  projects_dark:      'dashboard-projects-dark.png',
  projects_light:     'dashboard-projects-light.png',
  time_logs_dark:     'dashboard-time-logs-dark.png',
  ai_dark:            'dashboard-ai-dark.png',
};

async function upload(localFile, publicId) {
  const fullPath = path.join(SCREENSHOTS_DIR, localFile);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠  Not found: ${fullPath}`);
    return null;
  }
  const result = await cloudinary.uploader.upload(fullPath, {
    folder:          'portfolio_projects/soloflow',
    public_id:       publicId,
    use_filename:    false,
    unique_filename: false,
    overwrite:       true,
    resource_type:   'image',
  });
  return result.secure_url;
}

(async () => {
  console.log('☁️  Uploading Soloflow screenshots to Cloudinary…\n');

  const urls = {};

  for (const [key, file] of Object.entries(SHOTS)) {
    process.stdout.write(`  Uploading ${file}… `);
    const url = await upload(file, key);
    if (url) {
      urls[key] = url;
      console.log('✓');
    } else {
      console.log('skipped');
    }
  }

  console.log('\n✅ Upload complete! Copy the URLs below:\n');
  console.log(JSON.stringify(urls, null, 2));

  // Also write to a local file for convenience
  const outPath = path.join(__dirname, '../soloflow-cdn-urls.json');
  fs.writeFileSync(outPath, JSON.stringify(urls, null, 2));
  console.log(`\n📄 Saved to: ${outPath}`);
})();
