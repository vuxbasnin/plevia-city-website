
import { CLOUDINARY } from "@/lib/cloudinary";


interface CloudinaryUploadResult {
  secure_url: string;
  // Add other fields you might need from the Cloudinary response
}

export async function uploadFileToCloudinary(file: File, folder: string): Promise<string> {
  if (!CLOUDINARY.CLOUD_NAME || CLOUDINARY.CLOUD_NAME === "YOUR_CLOUD_NAME_HERE_FROM_DOT_ENV" || !CLOUDINARY.UPLOAD_PRESET || CLOUDINARY.UPLOAD_PRESET === "YOUR_UPLOAD_PRESET_HERE_FROM_DOT_ENV") {
    console.error("Cloudinary configuration is missing or using placeholder values. Please check .env.local and src/lib/cloudinary.ts");
    throw new Error("Cloudinary configuration is missing or invalid.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY.UPLOAD_PRESET);
  formData.append("folder", folder);

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
    return result.secure_url;
  } catch (error) {
    console.error("Error during Cloudinary upload process:", error);
    throw error; // Re-throw to be caught by the caller
  }
}

export async function deleteImageFromCloudinary(url: string): Promise<void> {
  // Lấy public_id từ url
  // Thực tế cần backend ký xác thực, ở đây chỉ mockup
  // Ví dụ: https://res.cloudinary.com/<cloud_name>/image/upload/v1718000000/gallery_images/abc123.jpg
  // public_id: gallery_images/abc123
  // Bạn nên triển khai API route riêng để xóa thực sự trên Cloudinary!
  return Promise.resolve();
}
