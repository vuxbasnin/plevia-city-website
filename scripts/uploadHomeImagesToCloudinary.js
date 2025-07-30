const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Load environment variables - try .env first, then .env.local
const envPath = path.join(__dirname, '..', '.env');
const envLocalPath = path.join(__dirname, '..', '.env.local');

if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else if (fs.existsSync(envLocalPath)) {
  require('dotenv').config({ path: envLocalPath });
}

// Cấu hình Cloudinary từ environment variables
const CLOUDINARY = {
  CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
};



async function uploadFileToCloudinary(filePath, folder) {
  if (!CLOUDINARY.CLOUD_NAME || !CLOUDINARY.UPLOAD_PRESET) {
    throw new Error("Cloudinary configuration is missing. Please check .env or .env.local file.");
  }

  // Đọc file từ filesystem
  const fileBuffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);
  
  // Tạo FormData
  const formData = new FormData();
  formData.append("file", fileBuffer, {
    filename: filename,
    contentType: getContentType(filename)
  });
  formData.append("upload_preset", CLOUDINARY.UPLOAD_PRESET);
  formData.append("folder", folder);
  // Không sử dụng use_filename và unique_filename cho unsigned upload
  // Cloudinary sẽ tự động tạo tên file unique

  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY.CLOUD_NAME}/image/upload`;

  try {
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary upload failed:", errorData);
      throw new Error(errorData.error?.message || "Upload to Cloudinary failed.");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during Cloudinary upload process:", error);
    throw error;
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  return contentTypes[ext] || 'application/octet-stream';
}

async function uploadAllHomeImages() {
  const homeImagesDir = path.join(process.cwd(), 'public', 'assets', 'home');
  const results = [];

  try {
    // Kiểm tra thư mục có tồn tại không
    if (!fs.existsSync(homeImagesDir)) {
      throw new Error(`Directory not found: ${homeImagesDir}`);
    }

    // Đọc tất cả files trong thư mục
    const files = fs.readdirSync(homeImagesDir);
    
    // Lọc chỉ các file ảnh
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });

    console.log(`Found ${imageFiles.length} image files to upload...`);

    // Upload từng file
    for (const filename of imageFiles) {
      const filePath = path.join(homeImagesDir, filename);
      
      try {
        console.log(`Uploading: ${filename}...`);
        const result = await uploadFileToCloudinary(filePath, 'home-assets');
        
        results.push({
          filename,
          success: true,
          url: result.secure_url
        });
        
        console.log(`✅ Successfully uploaded: ${filename}`);
        console.log(`   URL: ${result.secure_url}`);
        
        // Delay nhỏ để tránh rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`❌ Failed to upload: ${filename}`, error);
        results.push({
          filename,
          success: false,
          error: error.message || 'Unknown error'
        });
      }
    }

    return results;

  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
}

// Hàm chính để chạy script
async function main() {
  console.log("🚀 Starting upload of all home images to Cloudinary...");
  console.log("📁 Source directory: public/assets/home");
  console.log("☁️  Destination folder: home-assets");
  console.log("");

  try {
    const results = await uploadAllHomeImages();
    
    console.log("");
    console.log("📊 Upload Summary:");
    console.log("==================");
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ Successful uploads: ${successful.length}`);
    console.log(`❌ Failed uploads: ${failed.length}`);
    
    if (successful.length > 0) {
      console.log("");
      console.log("✅ Successfully uploaded files:");
      successful.forEach(result => {
        console.log(`   - ${result.filename}: ${result.url}`);
      });
    }
    
    if (failed.length > 0) {
      console.log("");
      console.log("❌ Failed uploads:");
      failed.forEach(result => {
        console.log(`   - ${result.filename}: ${result.error}`);
      });
    }
    
    // Lưu kết quả vào file JSON
    const outputPath = path.join(process.cwd(), 'scripts', 'upload-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log("");
    console.log(`📄 Results saved to: ${outputPath}`);
    
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  }
}

// Chạy script nếu được gọi trực tiếp
if (require.main === module) {
  main();
}

module.exports = { uploadAllHomeImages, uploadFileToCloudinary, main }; 