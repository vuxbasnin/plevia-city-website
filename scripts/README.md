# Scripts Directory

## Upload Home Images to Cloudinary

Script này được sử dụng để upload tất cả ảnh trong thư mục `public/assets/home` lên Cloudinary mà không thay đổi tên file.

### Cách sử dụng

1. **Cài đặt dependencies (nếu chưa có):**
   ```bash
   npm install
   ```

2. **Đảm bảo cấu hình Cloudinary:**
   - Kiểm tra file `.env` hoặc `.env.local` có các biến môi trường:
     ```
     NEXT_PUBLIC_CLOUDINARY_NAME=your_cloud_name
     NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
     ```

3. **Test cấu hình (tùy chọn):**
   ```bash
   npm run test-cloudinary
   ```

4. **Chạy script upload:**
   ```bash
   npm run upload-home-images
   ```

   Hoặc chạy trực tiếp:
   ```bash
   node scripts/upload-home-images.js
   ```

### Tính năng

- ✅ Upload tất cả ảnh trong `public/assets/home`
- ✅ Giữ nguyên tên file gốc
- ✅ Hỗ trợ các định dạng: JPG, JPEG, PNG, GIF, WEBP, SVG
- ✅ Tạo folder `home-assets` trên Cloudinary
- ✅ Hiển thị tiến trình upload
- ✅ Báo cáo kết quả chi tiết
- ✅ Lưu kết quả vào file JSON
- ✅ Xử lý lỗi và retry
- ✅ Tự động load environment variables

### Kết quả

Script sẽ:
1. Hiển thị danh sách file được tìm thấy
2. Upload từng file với delay 500ms để tránh rate limiting
3. Hiển thị URL của từng file đã upload thành công
4. Tạo báo cáo tổng hợp
5. Lưu kết quả vào `scripts/upload-results.json`

### Cấu trúc file kết quả

```json
[
  {
    "filename": "banner_home.png",
    "success": true,
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v123/home-assets/banner_home.png"
  },
  {
    "filename": "failed_image.jpg",
    "success": false,
    "error": "Upload failed: File too large"
  }
]
```

### Files được tạo

- `scripts/uploadHomeImagesToCloudinary.js` - Script chính (JavaScript)
- `scripts/uploadHomeImagesToCloudinary.ts` - Script chính (TypeScript)
- `scripts/upload-home-images.js` - Script wrapper
- `scripts/test-cloudinary-config.js` - Script test cấu hình
- `scripts/upload-results.json` - Kết quả upload (được tạo sau khi chạy)

### Lưu ý

- Đảm bảo có đủ quyền truy cập vào Cloudinary
- Kiểm tra giới hạn kích thước file của Cloudinary
- Script sẽ tạo delay giữa các upload để tránh bị block
- Kết quả được lưu trong `scripts/upload-results.json` để tham khảo sau này
- Script sử dụng `form-data` và `node-fetch` để upload files 