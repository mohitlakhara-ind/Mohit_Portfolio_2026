require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const fullPath = 'c:\\\\Users\\\\cosmo\\\\job-apply\\\\splitsmart\\\\screenshots\\\\web_03_dashboard.png';
cloudinary.uploader.upload(fullPath, {
  folder: 'portfolio_projects',
  use_filename: false,
  public_id: 'splitwiser_dashboard',
  unique_filename: false,
  overwrite: true,
  resource_type: 'auto'
}).then(result => {
  console.log("URL:", result.secure_url);
}).catch(err => {
  console.error(err);
});
