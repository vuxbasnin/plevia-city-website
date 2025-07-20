# Hướng Dẫn Routing và Cấu Trúc Project

## Tổng Quan

Project này sử dụng **Next.js 15 App Router** để quản lý routing. Đây là best practice hiện tại cho Next.js applications.

## Cấu Trúc Routing

### 1. File-based Routing
```
src/app/
├── page.tsx              # Trang chủ (/)
├── about/
│   └── page.tsx          # Trang về chúng tôi (/about)
├── projects/
│   └── page.tsx          # Trang dự án (/projects)
├── contact/
│   └── page.tsx          # Trang liên hệ (/contact)
├── admin/                # Admin panel (đã có sẵn)
└── not-found.tsx         # Trang 404
```

### 2. Components Chính

#### PageLayout Component
- **Vị trí**: `src/components/layout/PageLayout.tsx`
- **Chức năng**: Layout chung cho tất cả pages
- **Props**:
  - `children`: Nội dung page
  - `showFloatingButtons`: Hiển thị floating buttons (mặc định: true)
  - `showBackToTop`: Hiển thị back to top button (mặc định: true)
  - `className`: Custom CSS classes

#### Breadcrumb Component
- **Vị trí**: `src/components/shared/Breadcrumb.tsx`
- **Chức năng**: Hiển thị đường dẫn navigation
- **Tự động**: Tự động tạo breadcrumb dựa trên current path

### 3. Navigation Management

#### useNavigation Hook
- **Vị trí**: `src/hooks/useNavigation.ts`
- **Chức năng**: Quản lý navigation state và logic
- **API**:
  - `pathname`: Current path
  - `navigationItems`: Danh sách navigation items
  - `isActive(href)`: Kiểm tra link có active không
  - `getCurrentPage()`: Lấy thông tin trang hiện tại

#### Navigation Items
```typescript
export const navigationItems: NavigationItem[] = [
  { href: '/', label: 'Trang chủ' },
  { href: '/about', label: 'Về chúng tôi' },
  { href: '/projects', label: 'Dự án' },
  { href: '/contact', label: 'Liên hệ' }
];
```

## Cách Thêm Page Mới

### Bước 1: Tạo thư mục và file page
```bash
mkdir src/app/ten-page
touch src/app/ten-page/page.tsx
```

### Bước 2: Tạo component page
```tsx
"use client";

import PageLayout from '@/components/layout/PageLayout';
import Breadcrumb from '@/components/shared/Breadcrumb';

export default function TenPage() {
  return (
    <PageLayout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <Breadcrumb />
          <h1 className="text-4xl font-bold text-center mb-8">Tiêu Đề Trang</h1>
          {/* Nội dung trang */}
        </div>
      </div>
    </PageLayout>
  );
}
```

### Bước 3: Thêm vào navigation
Cập nhật `src/hooks/useNavigation.ts`:
```typescript
export const navigationItems: NavigationItem[] = [
  // ... existing items
  { 
    href: '/ten-page', 
    label: 'Tên Trang',
    hasDropdown: false 
  }
];
```

## Best Practices

### 1. Sử dụng PageLayout
- Luôn wrap page content trong `PageLayout`
- Điều này đảm bảo consistency về UI/UX

### 2. Thêm Breadcrumb
- Thêm `Breadcrumb` component vào tất cả pages (trừ homepage)
- Giúp user hiểu vị trí hiện tại trong website

### 3. SEO và Metadata
- Sử dụng Next.js metadata API cho SEO
- Có thể tạo `layout.tsx` trong mỗi thư mục page để custom metadata

### 4. Dynamic Routes
Để tạo dynamic routes (ví dụ: `/projects/[id]`):
```bash
mkdir src/app/projects/[id]
touch src/app/projects/[id]/page.tsx
```

```tsx
export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <PageLayout>
      <div>Project ID: {params.id}</div>
    </PageLayout>
  );
}
```

### 5. Loading và Error States
- Tạo `loading.tsx` cho loading states
- Tạo `error.tsx` cho error handling
- Tạo `not-found.tsx` cho 404 pages

## Lưu Ý Quan Trọng

1. **"use client"**: Sử dụng cho client-side components
2. **Server Components**: Mặc định Next.js 13+ sử dụng server components
3. **Metadata**: Sử dụng `generateMetadata` function cho SEO
4. **Performance**: Next.js tự động optimize routing và code splitting

## Ví Dụ Thực Tế

Xem các files đã tạo:
- `src/app/about/page.tsx` - Trang About
- `src/app/projects/page.tsx` - Trang Projects  
- `src/app/contact/page.tsx` - Trang Contact
- `src/app/not-found.tsx` - Trang 404 