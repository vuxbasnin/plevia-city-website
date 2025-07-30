#!/usr/bin/env node

const path = require('path');
const { main } = require('./uploadHomeImagesToCloudinary.js');

console.log('🚀 Running home images upload script...');

// Load environment variables - try .env first, then .env.local
const envPath = path.join(__dirname, '..', '.env');
const envLocalPath = path.join(__dirname, '..', '.env.local');

if (require('fs').existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else if (require('fs').existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
} else {
  console.warn('⚠️  No .env or .env.local file found. Using system environment variables.');
}

main()
  .then(() => {
    console.log('✅ Upload script completed successfully!');
  })
  .catch((error) => {
    console.error('❌ Upload script failed:', error);
    process.exit(1);
  }); 