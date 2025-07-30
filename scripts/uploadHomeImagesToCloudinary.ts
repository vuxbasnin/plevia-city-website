import { CLOUDINARY } from "@/lib/cloudinary";
import * as fs from 'fs';
import * as path from 'path';

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  original_filename: string;
}

interface UploadResult {
  filename: string;
  success: boolean;
  url?: string;
  error?: string;
}

async function uploadFileToCloudinary(filePath: string, folder: string): Promise<CloudinaryUploadResult> {
  if (!CLOUDINARY.CLOUD_NAME || CLOUDINARY.CLOUD_NAME === "YOUR_CLOUD_NAME_HERE_FROM_DOT_ENV" || !CLOUDINARY.UPLOAD_PRESET || CLOUDINARY.UPLOAD_PRESET === "YOUR_UPLOAD_PRESET_HERE_FROM_DOT_ENV") {
    throw new Error("Cloudinary configuration is missing or using placeholder values. Please check .env or .env.local and src/lib/cloudinary.ts");
  }

  // Đọc file từ filesystem
  const fileBuffer = fs.readFileSync(filePath);
  const filename = path.basename(filePath);
  
  // Tạo FormData
  const formData = new FormData();
  const blob = new Blob([fileBuffer]);
  formData.append("file", blob, filename);
  formData.append("upload_preset", CLOUDINARY.UPLOAD_PRESET);
  formData.append("folder", folder);
  formData.append("use_filename", "true"); // Giữ nguyên tên file
  formData.append("unique_filename", "false"); // Không thêm unique identifier

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

    const result: CloudinaryUploadResult = await response.json();
    return result;
  } catch (error) {
    console.error("Error during Cloudinary upload process:", error);
    throw error;
  }
}

async function uploadAllHomeImages(): Promise<UploadResult[]> {
  const homeImagesDir = path.join(process.cwd(), 'public', 'assets', 'home');
  const results: UploadResult[] = [];

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
          error: error instanceof Error ? error.message : 'Unknown error'
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

export { uploadAllHomeImages, uploadFileToCloudinary }; 