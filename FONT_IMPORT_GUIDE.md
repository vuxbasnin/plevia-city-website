# Hướng dẫn Import Font Tùy chỉnh

## Định dạng Font khuyến nghị

### 1. **OTF (OpenType Font) - Khuyến nghị chính**
- ✅ Chất lượng tốt nhất
- ✅ Kích thước nhỏ hơn TTF
- ✅ Hỗ trợ OpenType features (ligatures, alternates)
- ✅ Tương thích tốt với các trình duyệt hiện đại

### 2. **WOFF2 - Khuyến nghị phụ**
- ✅ Kích thước nhỏ nhất (nén tốt nhất)
- ✅ Tải nhanh nhất
- ✅ Hỗ trợ tốt trên các trình duyệt hiện đại

### 3. **TTF (TrueType Font)**
- ⚠️ Kích thước lớn hơn OTF
- ⚠️ Ít tính năng nâng cao hơn
- ✅ Tương thích rộng rãi

## Cách Import Font vào dự án

### Bước 1: Đặt file font vào thư mục
```
public/fonts/
├── your-font.otf          # Font chính
├── your-font-bold.otf     # Font đậm
├── your-font-italic.otf   # Font nghiêng
└── your-font.woff2        # Phiên bản WOFF2 (tùy chọn)
```

### Bước 2: Thêm @font-face vào globals.css

```css
/* Import font tùy chỉnh */
@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/your-font.otf') format('opentype'),
       url('/fonts/your-font.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* Tối ưu hiệu suất tải */
}

@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/your-font-bold.otf') format('opentype'),
       url('/fonts/your-font-bold.woff2') format('woff2');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourFontName';
  src: url('/fonts/your-font-italic.otf') format('opentype'),
       url('/fonts/your-font-italic.woff2') format('woff2');
  font-weight: normal;
  font-style: italic;
  font-display: swap;
}
```

### Bước 3: Sử dụng font trong CSS

```css
/* Sử dụng trực tiếp */
.your-custom-text {
  font-family: 'YourFontName', sans-serif;
}

/* Hoặc thêm vào Tailwind config */
```

### Bước 4: Cấu hình Tailwind (tùy chọn)

Thêm vào `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'custom': ['YourFontName', 'sans-serif'],
        'custom-bold': ['YourFontName', 'sans-serif'],
      },
    },
  },
}
```

Sau đó sử dụng: `className="font-custom"`

## Lưu ý quan trọng

### 1. **font-display: swap**
- Giúp trang web hiển thị ngay lập tức với font fallback
- Font tùy chỉnh sẽ được thay thế khi tải xong
- Cải thiện trải nghiệm người dùng

### 2. **Fallback fonts**
Luôn có font dự phòng:
```css
font-family: 'YourFontName', 'Arial', sans-serif;
```

### 3. **Tối ưu hiệu suất**
- Sử dụng WOFF2 khi có thể
- Chỉ import các weight/style cần thiết
- Cân nhắc preload cho font quan trọng

### 4. **Preload font quan trọng**
Thêm vào `<head>` trong layout.tsx:
```html
<link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossorigin>
```

## Ví dụ thực tế

Dự án hiện tại đã có:
- `Chillax-Light` (WOFF2)
- `Opaline` (WOFF2)
- `Opaline Original` (OTF) - Font gốc chất lượng cao
- `Chillax Light Original` (TTF) - Font gốc chất lượng cao

### Cách sử dụng font mới:

```css
/* Sử dụng trực tiếp */
.your-element {
    font-family: 'Opaline Original', 'Times New Roman', serif;
}

/* Hoặc sử dụng class có sẵn */
.your-element {
    font-family: 'Chillax Light Original', Arial, sans-serif;
}
```

### CSS Classes có sẵn:
- `.font-opaline-original` - Font Opaline Original
- `.font-chillax-light-original` - Font Chillax Light Original

Để thêm font mới, chỉ cần:
1. Copy file `.otf` vào `public/fonts/`
2. Thêm `@font-face` declaration
3. Sử dụng trong CSS hoặc Tailwind classes 