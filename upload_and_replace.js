require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const filesToProcess = [
  'data/certificationsData.ts',
  'data/projectData.ts',
  'data/skillsData.tsx',
  'components/ToolChest.tsx',
  'components/Navbar.tsx'
];

const uploadImage = async (localPath) => {
  try {
    const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    const fullPath = path.join(__dirname, 'public', cleanPath);
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${fullPath}`);
      return null;
    }
    const result = await cloudinary.uploader.upload(fullPath, {
      folder: 'portfolio_assets',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: 'auto'
    });
    return result.secure_url;
  } catch (err) {
    console.error(`Error uploading ${localPath}:`, err.message);
    return null;
  }
};

(async () => {
    let urlCache = {};

    for (let file of filesToProcess) {
        let filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) {
          console.log(`Skipping ${file}, not found.`);
          continue;
        }
        let content = fs.readFileSync(filePath, 'utf-8');
        
        let regex = /['"](\/(images|projects|testimonials|textures)\/[^'"]+)['"]/g;
        let matches = [...content.matchAll(regex)];
        
        if (matches.length > 0) {
            let updatedContent = content;
            for (let match of matches) {
                let localPath = match[1];
                if (!urlCache[localPath]) {
                    console.log(`Uploading ${localPath}...`);
                    let url = await uploadImage(localPath);
                    if (url) {
                        urlCache[localPath] = url;
                    }
                }
                
                if (urlCache[localPath]) {
                    updatedContent = updatedContent.replace(new RegExp(`['"]${localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'), `"${urlCache[localPath]}"`);
                }
            }
            if (updatedContent !== content) {
                fs.writeFileSync(filePath, updatedContent, 'utf-8');
                console.log(`Updated ${file}`);
            }
        }
    }
    console.log("Done.");
})();
