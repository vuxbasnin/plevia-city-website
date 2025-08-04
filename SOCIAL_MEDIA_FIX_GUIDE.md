# Hướng dẫn khắc phục vấn đề Social Media Preview

## Vấn đề hiện tại
Khi chia sẻ link website qua social media (Facebook, Twitter, LinkedIn, etc.), không hiển thị bản xem trước (preview) của trang web.

## Nguyên nhân có thể
1. **Cache của social media platforms** - Các nền tảng social media cache preview trong vài giờ đến vài ngày
2. **Meta tags không đúng** - Open Graph và Twitter Card tags không được cấu hình đúng
3. **Image không đúng kích thước** - Social media yêu cầu image có kích thước cụ thể
4. **URL không phải absolute** - Social media cần absolute URL (bắt đầu bằng https://)

## Các thay đổi đã thực hiện

### 1. Cải thiện Open Graph Tags
```html
<meta property="og:title" content="Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai" />
<meta property="og:description" content="Dự án bất động sản cao cấp với ứng dụng trí tuệ nhân tạo, tạo nên môi trường sống hiện đại và tiện nghi tại Gia Lai" />
<meta property="og:url" content="https://pleviacity.vn" />
<meta property="og:site_name" content="Plevia City" />
<meta property="og:locale" content="vi_VN" />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://pleviacity.vn/social_media.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai" />
<meta property="og:image:type" content="image/png" />
```

### 2. Cải thiện Twitter Card Tags
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Plevia City - Khu đô thị thông minh đầu tiên tại Gia Lai" />
<meta name="twitter:description" content="Dự án bất động sản cao cấp với ứng dụng trí tuệ nhân tạo, tạo nên môi trường sống hiện đại và tiện nghi tại Gia Lai" />
<meta name="twitter:image" content="https://pleviacity.vn/social_media.png" />
<meta name="twitter:creator" content="@pleviacity" />
<meta name="twitter:site" content="@pleviacity" />
```

### 3. Thêm các meta tags bổ sung
```html
<meta name="author" content="Plevia City" />
<meta name="copyright" content="Plevia City" />
<meta name="coverage" content="Worldwide" />
<meta name="distribution" content="Global" />
<meta name="rating" content="General" />
<meta name="revisit-after" content="7 days" />
```

## Cách kiểm tra và khắc phục

### Bước 1: Deploy website với code mới
```bash
npm run build
# Deploy lên hosting
```

### Bước 2: Sử dụng các công cụ debug

#### Facebook Debugger
- Truy cập: https://developers.facebook.com/tools/debug/
- Nhập URL: https://pleviacity.vn
- Click "Debug"
- Nếu có cache cũ, click "Scrape Again"

#### Twitter Card Validator
- Truy cập: https://cards-dev.twitter.com/validator
- Nhập URL: https://pleviacity.vn
- Kiểm tra preview

#### LinkedIn Post Inspector
- Truy cập: https://www.linkedin.com/post-inspector/
- Nhập URL: https://pleviacity.vn
- Kiểm tra preview

#### Google Rich Results Test
- Truy cập: https://search.google.com/test/rich-results
- Nhập URL: https://pleviacity.vn
- Kiểm tra structured data

### Bước 3: Kiểm tra image
- Đảm bảo file `social_media.png` có kích thước 1200x630px
- File phải có thể truy cập tại: https://pleviacity.vn/social_media.png
- Format: PNG hoặc JPG

### Bước 4: Test trên các nền tảng
1. **Facebook**: Tạo post mới với link website
2. **Twitter**: Tweet với link website
3. **LinkedIn**: Tạo post với link website
4. **WhatsApp**: Gửi link qua chat
5. **Telegram**: Gửi link qua chat

## Lưu ý quan trọng

### Cache
- Social media platforms cache preview trong 24-48 giờ
- Sử dụng debug tools để force refresh cache
- Có thể mất vài giờ để thay đổi có hiệu lực

### Image requirements
- **Facebook**: 1200x630px (tỷ lệ 1.91:1)
- **Twitter**: 1200x600px (tỷ lệ 2:1)
- **LinkedIn**: 1200x627px (tỷ lệ 1.91:1)
- **File size**: Dưới 5MB
- **Format**: PNG, JPG, GIF

### URL requirements
- Phải là absolute URL (https://pleviacity.vn)
- Không được redirect
- Phải trả về HTTP 200
- Phải có valid SSL certificate

## Troubleshooting

### Nếu vẫn không hiển thị preview:
1. **Kiểm tra file image**: Đảm bảo `social_media.png` tồn tại và có thể truy cập
2. **Clear cache**: Sử dụng debug tools để clear cache
3. **Kiểm tra meta tags**: Sử dụng View Page Source để kiểm tra meta tags
4. **Test với URL khác**: Thử với một URL test khác để xác định vấn đề

### Debug component
Trong development mode, website có component debug ở góc phải dưới:
- Click "Debug Social Media" để xem tất cả meta tags
- Sử dụng các link debug tools có sẵn

## Kết quả mong đợi
Sau khi áp dụng các thay đổi và clear cache:
- Facebook: Hiển thị title, description, và image
- Twitter: Hiển thị card với image lớn
- LinkedIn: Hiển thị preview với image và description
- WhatsApp/Telegram: Hiển thị preview khi gửi link

## Liên hệ hỗ trợ
Nếu vẫn gặp vấn đề sau khi thực hiện các bước trên, hãy:
1. Kiểm tra console errors
2. Sử dụng debug tools để xem chi tiết lỗi
3. Kiểm tra network tab để đảm bảo image load được
4. Test với các URL khác để so sánh 