#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Load environment variables - try .env first, then .env.local
const envPath = path.join(__dirname, '..', '.env');
const envLocalPath = path.join(__dirname, '..', '.env.local');

if (require('fs').existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
  console.log('📄 Loaded environment from .env file');
} else if (require('fs').existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
  console.log('📄 Loaded environment from .env.local file');
} else {
  console.warn('⚠️  No .env or .env.local file found. Using system environment variables.');
}

console.log('🔍 Testing Cloudinary Configuration...');
console.log('=====================================');

// Kiểm tra environment variables
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

console.log(`Cloud Name: ${cloudName || '❌ NOT SET'}`);
console.log(`Upload Preset: ${uploadPreset || '❌ NOT SET'}`);

if (!cloudName || !uploadPreset) {
  console.log('\n❌ Configuration Error:');
  console.log('Please check your .env or .env.local file and ensure these variables are set:');
  console.log('NEXT_PUBLIC_CLOUDINARY_NAME=your_cloud_name');
  console.log('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset');
  process.exit(1);
}

// Kiểm tra thư mục home images
const homeImagesDir = path.join(process.cwd(), 'public', 'assets', 'home');

if (!fs.existsSync(homeImagesDir)) {
  console.log('\n❌ Directory Error:');
  console.log(`Directory not found: ${homeImagesDir}`);
  process.exit(1);
}

// Đếm số file ảnh
const files = fs.readdirSync(homeImagesDir);
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
const imageFiles = files.filter(file => {
  const ext = path.extname(file).toLowerCase();
  return imageExtensions.includes(ext);
});

console.log(`\n📁 Home Images Directory: ${homeImagesDir}`);
console.log(`📊 Found ${imageFiles.length} image files:`);
imageFiles.forEach(file => {
  const filePath = path.join(homeImagesDir, file);
  const stats = fs.statSync(filePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`   - ${file} (${sizeInMB} MB)`);
});

console.log('\n✅ Configuration looks good!');
console.log('You can now run: npm run upload-home-images'); 