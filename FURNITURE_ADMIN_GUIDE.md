# Hướng Dẫn Quản Lý Các Mẫu Nội Thất

## Tổng Quan

Phần "Quản Lý Các Mẫu Nội Thất" đã được tái cấu trúc để có logic đơn giản giống như phần "Quản lý Mẫu nhà" (Gallery), tập trung vào CRUD ảnh đơn giản thay vì form phức tạp.

## Cấu Trúc Mới

### 1. Admin Page: `/admin/furniture`
- **File**: `src/app/admin/furniture/page.tsx`
- **Logic**: Clone hoàn toàn từ `src/app/admin/gallery/page.tsx`
- **Chức năng**:
  - Upload nhiều ảnh cùng lúc
  - Chỉnh sửa caption trực tiếp
  - Xóa ảnh
  - Hiển thị grid ảnh đơn giản

### 2. Service Functions
- **File**: `src/lib/firestoreService.ts`
- **Collection**: `furniture_images`
- **Functions**:
  - `addFurnitureImage()` - Thêm ảnh mới
  - `getFurnitureImages()` - Lấy danh sách ảnh
  - `deleteFurnitureImage()` - Xóa ảnh
  - `updateFurnitureImageCaption()` - Cập nhật caption

### 3. Frontend Display
- **File**: `src/components/sections/FurnitureSection.tsx`
- **Logic**: Hiển thị ảnh từ collection `furniture_images`
- **Layout**: Grid responsive với hover effects

## Cấu Trúc Dữ Liệu

### Collection: `furniture_images`
```typescript
{
  id: string;           // Auto-generated
  url: string;          // URL ảnh từ Cloudinary
  caption: string;      // Chú thích ảnh
  tags: string[];       // Tags (tùy chọn)
  uploadedAt: Timestamp; // Thời gian upload
  uploadedBy: string;   // Người upload
}
```

## Cách Sử Dụng

### 1. Upload Ảnh Mới
1. Vào `/admin/furniture`
2. Click "Upload mẫu nội thất mới"
3. Chọn một hoặc nhiều file ảnh
4. Nhập caption (tùy chọn)
5. Click "Upload mẫu nội thất"

### 2. Chỉnh Sửa Caption
1. Trong grid ảnh, click vào ô input caption
2. Nhập caption mới
3. Caption sẽ tự động lưu

### 3. Xóa Ảnh
1. Click nút "Xóa" dưới ảnh cần xóa
2. Ảnh sẽ bị xóa khỏi database (file vẫn còn trên Cloudinary)

## Tính Năng

### ✅ Đã Implement
- [x] Upload nhiều ảnh cùng lúc
- [x] Chỉnh sửa caption inline
- [x] Xóa ảnh
- [x] Hiển thị grid responsive
- [x] Error handling
- [x] Loading states
- [x] Toast notifications

### 🔄 Thay Đổi So Với Phiên Bản Cũ
- **Trước**: Form phức tạp với nhiều field (title, description, category, price, dimensions)
- **Sau**: Chỉ cần URL ảnh và caption
- **Trước**: Dialog-based editing
- **Sau**: Inline editing đơn giản
- **Trước**: Batch save với temporary files
- **Sau**: Upload và save ngay lập tức

## Technical Notes

### API Upload
- Sử dụng `/api/upload-image` endpoint
- Folder: `furniture_images`
- Hỗ trợ multiple file upload

### Database
- Collection: `furniture_images`
- Không sử dụng section data structure
- Mỗi ảnh là một document riêng biệt

### Frontend
- Responsive grid: 1-4 columns tùy screen size
- Hover effects với scale transform
- Error fallback images
- Loading và empty states

## Migration Notes

### Từ Phiên Bản Cũ
- Dữ liệu cũ trong `furniture` section vẫn được giữ lại (backward compatibility)
- Có thể migrate dữ liệu cũ sang collection mới nếu cần
- Component `ManageFurnitureAdmin.tsx` đã bị xóa

### Backward Compatibility
- Service functions cũ vẫn tồn tại:
  - `getFurnitureSectionData()`
  - `updateFurnitureSectionData()`
- Có thể sử dụng để migrate dữ liệu nếu cần

## Troubleshooting

### Lỗi Upload
- Kiểm tra cấu hình Cloudinary trong `.env.local`
- Kiểm tra quyền upload trong API route
- Xem console logs để debug

### Lỗi Hiển Thị
- Kiểm tra kết nối Firestore
- Verify collection `furniture_images` tồn tại
- Check image URLs có valid không

## Future Enhancements

### Có Thể Thêm
- [ ] Tags management
- [ ] Categories/filtering
- [ ] Bulk operations
- [ ] Image optimization
- [ ] Search functionality
- [ ] Pagination for large collections
