# 🛠️ HƯỚNG DẪN KHẮC PHỤC SOCIAL MEDIA SHARING

## 📋 **VẤN ĐỀ ĐÃ ĐƯỢC KHẮC PHỤC**

### ✅ **1. Sửa URL Images thành Absolute**
```typescript
// TRƯỚC (SAI):
url: '/social_media.png'

// SAU (ĐÚNG):
url: 'https://pleviacity.vn/social_media.png'
```

### ✅ **2. Loại bỏ Duplicate Meta Tags**
- Đã xóa các meta tags trùng lặp
- Chỉ giữ lại Next.js metadata API

### ✅ **3. Thống nhất Image Paths**
- Tất cả metadata dùng chung `social_media.png`
- Đã sửa trong `layout.tsx` và `metadata.ts`

---

## 🎯 **CÁC BƯỚC TIẾP THEO**

### **BƯỚC 1: Tạo Social Media Image**
**Yêu cầu:**
- Kích thước: **1200x630px**
- Format: **PNG hoặc JPG**
- Nội dung:
  - Logo Plevia City
  - Tagline "Nơi thể hiện đẳng cấp"
  - Background màu brand `#1A7A57`
  - Text màu trắng
  - Font size phù hợp

**Cách tạo:**
1. Dùng Canva, Figma hoặc Photoshop
2. Template size: 1200x630px
3. Export thành `social_media.png`
4. Upload vào thư mục `public/`

### **BƯỚC 2: Thêm Facebook App ID**
```typescript
// Thay thế trong src/app/layout.tsx dòng 118:
<meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />

// Cách lấy Facebook App ID:
// 1. Vào https://developers.facebook.com/
// 2. Tạo app mới
// 3. Copy App ID
```

### **BƯỚC 3: Test Social Media Sharing**

#### **Facebook Debugger:**
```
https://developers.facebook.com/tools/debug/?q=https://pleviacity.vn
```

#### **Twitter Card Validator:**
```
https://cards-dev.twitter.com/validator?url=https://pleviacity.vn
```

#### **LinkedIn Post Inspector:**
```
https://www.linkedin.com/post-inspector/inspect/https://pleviacity.vn
```

### **BƯỚC 4: Clear Cache**
**Nếu vẫn không hiển thị đúng:**

#### **Facebook:**
1. Vào Facebook Debugger
2. Click "Scrape Again"
3. Clear cache

#### **Twitter:**
1. Vào Twitter Card Validator
2. Click "Preview card"
3. Clear cache

#### **LinkedIn:**
1. Vào LinkedIn Post Inspector
2. Click "Inspect"
3. Clear cache

---

## 🔧 **COMPONENT DEBUG**

Đã tạo component `SocialMediaDebug.tsx` để test nhanh:

```typescript
import SocialMediaDebug from '@/components/shared/SocialMediaDebug';

// Sử dụng trong admin panel
<SocialMediaDebug />
```

---

## 📊 **KIỂM TRA KẾT QUẢ**

### **Sau khi khắc phục, social media sẽ hiển thị:**

#### **Facebook/Instagram:**
- ✅ Title: "Plevia City"
- ✅ Description: "Nơi thể hiện đẳng cấp"
- ✅ Image: 1200x630px social media image
- ✅ URL: https://pleviacity.vn

#### **Twitter:**
- ✅ Card Type: Summary Large Image
- ✅ Title: "Plevia City"
- ✅ Description: "Nơi thể hiện đẳng cấp"
- ✅ Image: 1200x630px social media image

#### **LinkedIn:**
- ✅ Title: "Plevia City"
- ✅ Description: "Nơi thể hiện đẳng cấp"
- ✅ Image: 1200x630px social media image

---

## ⚠️ **LƯU Ý QUAN TRỌNG**

### **1. Cache Issues:**
- Social media platforms cache metadata
- Cần clear cache sau khi thay đổi
- Có thể mất 24-48h để update

### **2. Image Requirements:**
- **Minimum size:** 600x315px
- **Optimal size:** 1200x630px
- **Maximum size:** 8MB
- **Format:** PNG, JPG, GIF

### **3. URL Requirements:**
- **Must be absolute:** `https://pleviacity.vn/social_media.png`
- **Must be accessible:** Không bị chặn bởi robots.txt
- **Must be public:** Không cần authentication

---

## 🚀 **KẾT QUẢ DỰ KIẾN**

Sau khi hoàn thành tất cả bước:
- ✅ **Facebook sharing:** Hiển thị đầy đủ thông tin
- ✅ **Twitter sharing:** Card đẹp với image
- ✅ **LinkedIn sharing:** Preview hoàn chỉnh
- ✅ **WhatsApp sharing:** Image và description
- ✅ **Instagram sharing:** Link preview đẹp

**Thời gian thực hiện:** 30 phút
**Độ khó:** Dễ
**Tác động:** Cao 